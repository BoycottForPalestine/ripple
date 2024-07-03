import cron from "node-cron";
import {
  Alert,
  createAlert,
  deleteAlert,
  getAlerts,
  updateAlert,
} from "../../model/alerts";
import {
  RippleEvent,
  getEventsByFilterAndTimeWindow,
} from "../../model/events";
import FlareService from "../flare-service";

type AlertCronJob = {
  alertFn: () => void;
  task: cron.ScheduledTask;
};

export const alertIdToCron: Record<string, AlertCronJob> = {};

function generateAlertFunction(alert: Omit<Alert, "_id">) {
  return async () => {
    if (alert.alertType === "conditionMatch") {
      const events = await getEventsByFilterAndTimeWindow(
        alert.eventSourceName,
        alert.matchConditions,
        alert.timeWindow
      );
      if (events.length >= alert.thresholdCount) {
        FlareService.dispatchEmails(
          ["shikev@umich.edu"],
          `Alert with name ${alert.label} triggered!`
        );
      }
    } else if (alert.alertType === "groupingMatch") {
      const events = await getEventsByFilterAndTimeWindow(
        alert.eventSourceName,
        {},
        alert.timeWindow
      );
      const groupingMatchField = alert.groupingMatchField;
      if (!groupingMatchField) {
        console.log(
          "Grouping match field not provided for groupingMatch alert type"
        );
        return;
      }
      const groupedEvents: Record<string, RippleEvent[]> = events.reduce(
        (acc, event) => {
          // @ts-ignore typescript bug with inferring reducer type
          if (acc[event.customFields[groupingMatchField]]) {
            // @ts-ignore typescript bug with inferring reducer type
            acc[event.customFields[groupingMatchField]].push(event);
          } else {
            // @ts-ignore typescript bug with inferring reducer type
            acc[event.customFields[groupingMatchField]] = [event];
          }
          return acc;
        },
        {}
      );

      let thresholdExceeded = false;

      Object.entries(groupedEvents).forEach(([groupingField, events]) => {
        if (events.length >= alert.thresholdCount) {
          thresholdExceeded = true;
        }
      });

      if (thresholdExceeded) {
        FlareService.dispatchEmails(
          ["shikev@umich.edu"],
          `Alert with name ${alert.label} triggered!`
        );
      }
    } else {
      // do nothing
    }
  };
}

function scheduleAlert(
  alertId: string,
  alertFn: () => void,
  measurementCadence: number
) {
  const task = cron.schedule(`*/${measurementCadence} * * * * *`, alertFn);
  alertIdToCron[alertId] = {
    task,
    alertFn,
  };
}

export const alertService = {
  createAlert: async (alert: Omit<Alert, "_id">) => {
    const createdAlertId = await createAlert(alert); // Creates alert in database
    const alertFn = generateAlertFunction(alert);
    scheduleAlert(createdAlertId.toString(), alertFn, alert.measurementCadence); // Schedules the task
    return;
  },
  updateAlert: async (alert: Alert) => {
    await updateAlert(alert); // Updates alert in database
    alertIdToCron[alert._id].task.stop(); // Stops the old task
    const alertFn = generateAlertFunction(alert);
    scheduleAlert(alert._id, alertFn, alert.measurementCadence); // Schedules the new task
    return;
  },
  deleteAlert: async (alertId: string) => {
    await deleteAlert(alertId); // Deletes alert from database
  },
  initialize: async () => {
    const alerts = await getAlerts();
    alerts.forEach((alert) => {
      const alertFn = generateAlertFunction(alert);
      scheduleAlert(alert._id, alertFn, alert.measurementCadence);
    });
  },
};
