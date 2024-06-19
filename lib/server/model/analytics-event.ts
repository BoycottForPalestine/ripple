import db from "@/lib/server/db/mongo";
import { ObjectId } from "mongodb";

async function insertAnalyticsEvent(
  eventType: string,
  data: any
): Promise<void> {
  try {
    const timestamp = new Date();

    const analyticsEvent = {
      eventType,
      data,
      timestamp,
    };

    await db.collection("analyticsEvents").insertOne(analyticsEvent);
  } catch (error) {
    console.error("Error inserting analytics event:", error);
  }
}

export { insertAnalyticsEvent };
