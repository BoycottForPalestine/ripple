// @ts-ignore
import { getDb } from "../config/db";

export type RippleEvent = {
  _id: string;
  sourceName: string;
  link: string;
  datePulled: Date;
  customFields: object;
};

const EVENTS_PAGE_SIZE = 100;

export type RippleEventInput = {
  uniqueKey: string;
  sourceName: string;
  link: string;
  customFields: object;
};

export type EventSearchOptions = {
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, string>;
};

// async function getEventsByFilter(sourceName: string, filter: object) {

//   const findFilter: Record<string, string> = {
//     sourceName,
//   };

//   Object.entries(filter).forEach(([key, value]) => {
//     findFilter[`customFields.${key}`] = value;
//   });

//   const events = (await db
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
  const db = await getDb();

  const findFilter: Record<string, string> = {
    sourceName,
  };

  Object.entries(customFieldsFilter).forEach(([key, value]) => {
    findFilter[`customFields.${key}`] = value;
  });

  const events = (await db
    .collection("events")
    .find({
      findFilter,
      datePulled: { $gte: new Date(Date.now() - lookbackWindow) },
    })
    .toArray()) as unknown as RippleEvent[];
  return events;
}

async function getEventsBySourceName(
  organizationId: string,
  sourceName: string,
  options: EventSearchOptions
) {
  const db = await getDb();

  let sortOption: Record<string, 1 | -1> = {};

  console.log(options);

  if (options.sortBy) {
    sortOption[`customFields.${options.sortBy}`] =
      options.sortOrder === "asc" ? 1 : -1;
  } else {
    sortOption = { datePulled: -1 };
  }

  const page = options.page ?? 0;

  const findFilters: Record<string, string> = {
    sourceName,
  };

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      findFilters[`customFields.${key}`] = value;
    });
  }

  const events = (await db
    .collection("events")
    // TODO: Add organizationId to filter
    .find(findFilters)
    .sort(sortOption)
    // Page is 1-indexed so we have to do page - 1
    .skip(page * EVENTS_PAGE_SIZE)
    .limit(EVENTS_PAGE_SIZE)
    .toArray()) as unknown as RippleEvent[];

  const totalEventsCount = await db
    .collection("events")
    .countDocuments(findFilters);

  return {
    events,
    totalEventsCount,
  };
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

    const db = await getDb();
    // @ts-ignore mongodb typing doesn't know _id can be custom
    await db.collection("events").insertOne(event);
    eventAdded = true;
  } catch (error) {
    // console.error("Error inserting event:", error);
  } finally {
    return eventAdded;
  }
}

export { getEventsByFilterAndTimeWindow, getEventsBySourceName, addEvent };
