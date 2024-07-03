// @ts-ignore
import db from "../config/db";

export type RippleEvent = {
  _id: string;
  sourceName: string;
  link: string;
  datePulled: Date;
  customFields: object;
};

export type RippleEventInput = {
  uniqueKey: string;
  sourceName: string;
  link: string;
  customFields: object;
};

// async function getEventsByFilter(sourceName: string, filter: object) {
//   if (!db.mongoDb) {
//     throw new Error("Database connection not established");
//   }

//   const findFilter: Record<string, string> = {
//     sourceName,
//   };

//   Object.entries(filter).forEach(([key, value]) => {
//     findFilter[`customFields.${key}`] = value;
//   });

//   const events = (await db.mongoDb
//     .collection("events")
//     .find({ findFilter })
//     .toArray()) as unknown as RippleEvent[];
//   return events;
// }

// lookbackWindow should be in MS
async function getEventsByFilterAndTimeWindow(
  sourceName: string,
  customFieldsFilter: object,
  lookbackWindow: number
) {
  if (!db.mongoDb) {
    throw new Error("Database connection not established");
  }

  const findFilter: Record<string, string> = {
    sourceName,
  };

  Object.entries(customFieldsFilter).forEach(([key, value]) => {
    findFilter[`customFields.${key}`] = value;
  });

  const events = (await db.mongoDb
    .collection("events")
    .find({
      findFilter,
      datePulled: { $gte: new Date(Date.now() - lookbackWindow) },
    })
    .toArray()) as unknown as RippleEvent[];
  return events;
}

async function addEvent(eventToAdd: RippleEventInput): Promise<boolean> {
  let eventAdded: boolean = false;
  try {
    const timestamp = new Date();

    const event = {
      _id: eventToAdd.uniqueKey,
      sourceName: eventToAdd.sourceName,
      link: eventToAdd.link,
      datePulled: timestamp,
      customFields: eventToAdd.customFields,
    };

    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }
    // @ts-ignore mongodb typing doesn't know _id can be custom
    await db.mongoDb.collection("events").insertOne(event);
    eventAdded = true;
  } catch (error) {
    // console.error("Error inserting event:", error);
  } finally {
    return eventAdded;
  }
}

export { getEventsByFilterAndTimeWindow, addEvent };
