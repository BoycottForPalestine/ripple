import {
  RippleEventInput,
  RippleEventInputWithOrg,
  addEvent,
} from "../../model/events";

const eventStack: RippleEventInputWithOrg[] = [];

// TODO: Eventually move to a pub/sub or topic subscription model

const EVENT_PROCESSING_INTERVAL = 1;
setInterval(async () => {
  const event = eventStack.pop();

  if (event) {
    const wasEventAdded = await addEvent(event);
  } else {
    // Do nothing, duplicate event
  }
}, EVENT_PROCESSING_INTERVAL);

async function processEvents(
  organizationId: string,
  events: RippleEventInput[]
) {
  // Insert if unique key doesn't have collision
  const eventsWithOrgId = events.map((event) => {
    return {
      ...event,
      organizationId: organizationId,
    };
  });
  eventStack.push(...eventsWithOrgId);
}

export { processEvents };
