import { ObjectId } from "mongodb";
import db from "../config/db";

export type Activity = {
  _id: string;
  sourceName: string;
  description: string;
  cronExpression: string;
  functionBody: string;
  link: string;
  lastRun?: Date;
};

async function addActivityIfNotExists(
  sourceName: string,
  description: string,
  cronExpression: string,
  functionBody: string,
  link: string
): Promise<void> {
  try {
    const activity = {
      sourceName,
      description,
      cronExpression,
      functionBody,
      link,
    };

    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const activityExists = await db.mongoDb
      .collection("activities")
      .findOne({ sourceName });
    if (!activityExists) {
      await db.mongoDb.collection("activities").insertOne(activity);
    } else {
      // Do nothing
    }
  } catch (error) {
    console.error("Error inserting activity:", error);
  }
}

async function getActivities(): Promise<Activity[] | undefined> {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const activities = (await db.mongoDb
      .collection("activities")
      .find()
      .toArray()) as unknown as Activity[];
    return activities;
  } catch (error) {
    console.error("Error getting activities:", error);
  }
}

async function getActivityBySourceName(sourceName: string) {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const activity = await db.mongoDb
      .collection("activities")
      .findOne({ sourceName });
    return activity;
  } catch (error) {
    console.error("Error getting activity by source name:", error);
  }
}

async function updateLastRun(sourceName: string) {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    await db.mongoDb
      .collection("activities")
      .updateOne({ sourceName }, { $set: { lastRun: new Date() } });
  } catch (error) {
    console.error("Error updating last fetched:", error);
  }
}

async function updateCronExpression(
  sourceName: string,
  cronExpression: string
) {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    await db.mongoDb
      .collection("activities")
      .updateOne({ sourceName }, { $set: { cronExpression } });
  } catch (error) {
    console.error("Error updating cron expression:", error);
  }
}

export {
  addActivityIfNotExists,
  getActivities,
  getActivityBySourceName,
  updateLastRun,
  updateCronExpression,
};
