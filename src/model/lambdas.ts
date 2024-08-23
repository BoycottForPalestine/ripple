import { ObjectId } from "mongodb";
import { getDb } from "../config/db";

export type Lambda = {
  _id: string;
  organizationId: string;
  sourceName: string;
  description: string;
  cronExpression: string;
  functionBody: string;
  link: string;
  lastRun: Date;
};

async function addLambdaIfNotExists(
  organizationId: string,
  sourceName: string,
  description: string,
  cronExpression: string,
  functionBody: string,
  link: string
): Promise<void> {
  try {
    const lambda = {
      organizationId,
      sourceName,
      description,
      cronExpression,
      functionBody,
      link,
    };

    const db = await getDb();

    const lambdaExists = await db
      .collection("lambdas")
      .findOne({ sourceName, organizationId });
    if (!lambdaExists) {
      await db.collection("lambdas").insertOne(lambda);
    } else {
      // TODO: throw error lambda already exists
      //
    }
  } catch (error) {
    console.error("Error inserting lambda:", error);
  }
}

async function getLambdas(): Promise<Lambda[] | undefined> {
  try {
    const db = await getDb();

    const lambdas = (await db
      .collection("lambdas")
      .find()
      .toArray()) as unknown as Lambda[];
    return lambdas;
  } catch (error) {
    console.error("Error getting lambdas:", error);
  }
}

async function getLambdaById(id: string): Promise<Lambda | undefined> {
  try {
    const db = await getDb();

    const lambda = await db
      .collection("lambdas")
      .findOne({ _id: new ObjectId(id) });
    return lambda as unknown as Lambda;
  } catch (error) {
    console.error("Error getting lambda by id:", error);
  }
}

async function getLambdaBySourceName(
  organizationId: string,
  sourceName: string
) {
  try {
    const db = await getDb();

    const lambda = await db
      .collection("lambdas")
      .findOne({ sourceName, organizationId });
    return lambda;
  } catch (error) {
    console.error("Error getting lambda by source name:", error);
  }
}

async function updateLastRun(organizationId: string, sourceName: string) {
  try {
    const db = await getDb();
    await db
      .collection("lambdas")
      .updateOne(
        { organizationId, sourceName },
        { $set: { lastRun: new Date() } }
      );
  } catch (error) {
    console.error("Error updating last fetched:", error);
  }
}

async function updateCronExpression(
  organizationId: string,
  sourceName: string,
  cronExpression: string
) {
  try {
    const db = await getDb();
    await db
      .collection("lambdas")
      .updateOne({ sourceName, organizationId }, { $set: { cronExpression } });
  } catch (error) {
    console.error("Error updating cron expression:", error);
  }
}

export {
  addLambdaIfNotExists,
  getLambdas,
  getLambdaById,
  getLambdaBySourceName,
  updateLastRun,
  updateCronExpression,
};
