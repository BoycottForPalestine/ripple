import cron from "node-cron";
import fs from "fs";
import path from "path";
import {
  addLambdaIfNotExists,
  getLambdaBySourceName,
  updateCronExpression,
  updateLastRun,
} from "../model/lambdas";
import { RippleEventInput } from "../model/events";
import { processEvents } from "../lib/event-processor-service";

type LambdaCronJob = {
  lambdaFn: (eventProcessFn: (events: RippleEventInput[]) => void) => void;
  task: cron.ScheduledTask;
};

type OrganizationId = string;
type SourceName = string;

export const lambdasToCronRegistry: Record<
  OrganizationId,
  Record<SourceName, LambdaCronJob>
> = {};

function initializelambdas() {
  const directoryPath = path.join(__dirname);
  fs.readdirSync(directoryPath).forEach((fileOrDirectory) => {
    // Ignore this file, obviously
    if (fileOrDirectory === "registry.ts") {
      return;
    }

    const absolutePath = path.join(directoryPath, fileOrDirectory);

    if (fs.statSync(absolutePath).isDirectory()) {
      fs.readdirSync(absolutePath).forEach((file) => {
        import(path.join(absolutePath, file)).then(async (module) => {
          // Currently, lambdas are organized by directory for each organization
          const organizationId = fileOrDirectory;
          const sourceName = module.sourceName;
          const lambdaFn = module.lambdaFn.toString();
          const cronExpression = module.cronExpression;
          const description = module.description;
          const link = module.link;

          await addLambdaIfNotExists(
            organizationId,
            sourceName,
            description,
            cronExpression,
            lambdaFn,
            link
          );

          lambdasToCronRegistry[organizationId] = {};

          const lambda = await getLambdaBySourceName(
            organizationId,
            sourceName
          );
          if (lambda) {
            const task = cron.schedule(
              lambda.cronExpression,
              () => {
                module.lambdaFn((events: RippleEventInput[]) => {
                  processEvents(organizationId, events);
                });
                updateLastRun(organizationId, sourceName);
              },
              {
                runOnInit: true,
              }
            );
            lambdasToCronRegistry[organizationId][sourceName] = {
              task,
              lambdaFn: module.lambdaFn,
            };
          }
        });
      });
    }
  });
}

export const registry = {
  lambdasToCronRegistry,
  initializelambdas,
  updateCronExpression: function (
    organizationId: string,
    sourceName: string,
    cronExpression: string
  ) {
    updateCronExpression(organizationId, sourceName, cronExpression);
    const organizationLambdas = lambdasToCronRegistry[organizationId];
    if (!organizationLambdas) {
      // TODO: port over error behavior from seaport
      throw Error();
    }

    const lambda = organizationLambdas[sourceName];
    if (!lambda) {
      // Do nothing silently if cron task for given sourcename does not exist
      // TODO: examine if this is correct behavior
      return;
    }
    lambda.task.stop();

    const newTask = cron.schedule(cronExpression, () => {
      lambda.lambdaFn((events: RippleEventInput[]) => {
        processEvents(organizationId, events);
      });
      updateLastRun(organizationId, sourceName);
    });
    lambdasToCronRegistry[organizationId][sourceName] = {
      task: newTask,
      lambdaFn: lambda.lambdaFn,
    };
  },
};
