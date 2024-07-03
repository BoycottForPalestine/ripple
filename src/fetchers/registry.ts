import cron from "node-cron";
import fs from "fs";
import path from "path";

import {
  addFetcherIfNotExists,
  getFetcherBySourceName,
  updateCronExpression,
} from "../model/fetchers";

type FetcherCronJob = {
  fetcherFn: () => void;
  task: cron.ScheduledTask;
};

export const fetchersToCronRegistry: Record<string, FetcherCronJob> = {};

function initializeFetchers() {
  const directoryPath = path.join(__dirname);
  fs.readdirSync(directoryPath).forEach((file) => {
    const absolutePath = path.join(directoryPath, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      import(absolutePath).then(async (module) => {
        const sourceName = module.sourceName;
        const fetchData = module.fetchData.toString();
        const cronExpression = module.cronExpression;
        const description = module.description;
        const link = module.link;

        await addFetcherIfNotExists(
          sourceName,
          description,
          cronExpression,
          fetchData,
          link
        );

        const fetcher = await getFetcherBySourceName(sourceName);
        if (fetcher) {
          const task = cron.schedule(
            fetcher.cronExpression,
            () => {
              module.fetchData();
            },
            {
              runOnInit: true,
            }
          );
          fetchersToCronRegistry[sourceName] = {
            task,
            fetcherFn: module.fetchData,
          };
        }
      });
    }
  });
}

export const registry = {
  fetchersToCronRegistry,
  initializeFetchers,
  updateCronExpression: function (sourceName: string, cronExpression: string) {
    updateCronExpression(sourceName, cronExpression);

    const fetcher = fetchersToCronRegistry[sourceName];
    if (!fetcher) {
      // Do nothing silently if cron task for given sourcename does not exist
      return;
    }
    fetcher.task.stop();

    const newTask = cron.schedule(cronExpression, () => {
      fetcher.fetcherFn();
    });
    fetchersToCronRegistry[sourceName] = {
      task: newTask,
      fetcherFn: fetcher.fetcherFn,
    };
  },
};
