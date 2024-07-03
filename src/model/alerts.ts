import { ObjectId } from "mongodb";
import db from "../config/db";

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
  if (!db.mongoDb) {
    throw new Error("Database connection not established");
  }
  const alerts = (await db.mongoDb
    .collection("alerts")
    .find()
    .toArray()) as unknown as Alert[];
  return alerts;
}

async function createAlert(alert: Omit<Alert, "_id">) {
  if (!db.mongoDb) {
    throw new Error("Database connection not established");
  }
  const result = await db.mongoDb.collection("alerts").insertOne(alert);

  return result.insertedId;
}

async function updateAlert(alert: Alert) {
  if (!db.mongoDb) {
    throw new Error("Database connection not established");
  }
  await db.mongoDb.collection("alerts").updateOne(
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
  if (!db.mongoDb) {
    throw new Error("Database connection not established");
  }
  await db.mongoDb
    .collection("alerts")
    .deleteOne({ _id: new ObjectId(alertId) });
}

export { getAlerts, createAlert, updateAlert, deleteAlert };
