import db from "../../config/db";
import { RippleEventInput, addEvent } from "../../model/events";

const eventStack: RippleEventInput[] = [];

// TODO: Eventually move to a pub/sub or topic subscription model

const EVENT_PROCESSING_INTERVAL = 1;
setInterval(async () => {
  const event = eventStack.pop();

  if (event) {
    if (!db.mongoDb) {
      throw new Error("Database connection not established");
    }

    console.log("processing:", event);

    const wasEventAdded = await addEvent(event);
    if (wasEventAdded) {
      // Do alerting?
      // TODO - This is where alerting would happen.
      // Flush daily events added to a table, which is processed at the end of the day
      // And summarized in an email/text alert?
      // Certain events that are "high profile" can also be alerted on immediately?
    }
  } else {
    // Do nothing, duplicate event
  }
}, EVENT_PROCESSING_INTERVAL);

async function processEvents(events: RippleEventInput[]) {
  // Insert if unique key doesn't have collision
  eventStack.push(...events);
}

export { processEvents };
