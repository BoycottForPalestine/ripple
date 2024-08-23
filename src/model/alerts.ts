import { ObjectId } from "mongodb";
import { getDb } from "../config/db";

export type Alert = {
  _id: string;
  label: string;
  alertType: string;
  thresholdCount: number;
  timeWindow: number;
  measurementCadence: number;
  eventSourceName: string;
  matchConditions: object;
  groupingMatchField?: string;
};

async function getAlerts(): Promise<Alert[]> {
  const db = await getDb();
  const alerts = (await db
    .collection("alerts")
    .find()
    .toArray()) as unknown as Alert[];
  return alerts;
}

async function createAlert(alert: Omit<Alert, "_id">) {
  const db = await getDb();
  const result = await db.collection("alerts").insertOne(alert);

  return result.insertedId;
}

async function updateAlert(alert: Alert) {
  const db = await getDb();
  await db.collection("alerts").updateOne(
    { _id: new ObjectId(alert._id) },
    {
      label: alert.label,
      timeWindow: alert.timeWindow,
      eventSourceName: alert.eventSourceName,
      matchConditions: alert.matchConditions,
      groupingMatchField: alert.groupingMatchField,
      alertType: alert.alertType,
      thresholdCount: alert.thresholdCount,
    }
  );
}

async function deleteAlert(alertId: string) {
  const db = await getDb();
  await db.collection("alerts").deleteOne({ _id: new ObjectId(alertId) });
}

export { getAlerts, createAlert, updateAlert, deleteAlert };
