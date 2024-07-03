import { ObjectId } from "mongodb";
import db from "../config/db";

export type Fetcher = {
  _id: string;
  sourceName: string;
  description: string;
  cronExpression: string;
  functionBody: string;
  link: string;
  lastFetched?: Date;
};

async function addFetcherIfNotExists(
  sourceName: string,
  description: string,
  cronExpression: string,
  functionBody: string,
  link: string
): Promise<void> {
  try {
    const fetcher = {
      sourceName,
      description,
      cronExpression,
      functionBody,
      link,
    };

    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const fetcherExists = await db.mongoDb
      .collection("fetchers")
      .findOne({ sourceName });
    if (!fetcherExists) {
      await db.mongoDb.collection("fetchers").insertOne(fetcher);
    } else {
      // Do nothing
    }
  } catch (error) {
    console.error("Error inserting fetcher:", error);
  }
}

async function getFetchers(): Promise<Fetcher[] | undefined> {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const fetchers = (await db.mongoDb
      .collection("fetchers")
      .find()
      .toArray()) as unknown as Fetcher[];
    return fetchers;
  } catch (error) {
    console.error("Error getting fetchers:", error);
  }
}

async function getFetcherBySourceName(sourceName: string) {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    const fetcher = await db.mongoDb
      .collection("fetchers")
      .findOne({ sourceName });
    return fetcher;
  } catch (error) {
    console.error("Error getting fetcher by source name:", error);
  }
}

async function updateLastFetched(sourceName: string) {
  try {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    await db.mongoDb
      .collection("fetchers")
      .updateOne({ sourceName }, { $set: { lastFetched: new Date() } });
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
      .collection("fetchers")
      .updateOne({ sourceName }, { $set: { cronExpression } });
  } catch (error) {
    console.error("Error updating cron expression:", error);
  }
}

export {
  addFetcherIfNotExists,
  getFetchers,
  getFetcherBySourceName,
  updateLastFetched,
  updateCronExpression,
};
