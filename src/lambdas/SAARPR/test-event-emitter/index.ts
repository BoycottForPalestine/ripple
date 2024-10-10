import { RippleEventInput } from "../../../model/events";
import axios from "axios";

export const sourceName = "TestEventEmitter";
export const cronExpression = "*/15 * * * * *"; // This is a default and can be changed in the database
export const description = "Seattle Police Department Use of Force Dataset";
export const link =
  "https://data.seattle.gov/Public-Safety/Use-Of-Force/ppi5-g2bj";

export function getUniqueKey(event: any) {
  return `SPD_Use_Of_Force_${event.uniqueid}`;
}

const LIMIT = 100;

const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function lambdaFn(
  processEventsFn: (events: RippleEventInput[]) => void
) {
  const generateRandomEvents = () => {
    const events = [];
    for (let i = 0; i < 10; i++) {
      events.push({
        uniqueKey: genRanHex(24),
        sourceName,
        link: "https://google.com",
        customFields: {
          value: randomIntFromInterval(1, 10),
        },
      });
    }
    return events;
  };

  const eventsToProcess = generateRandomEvents();
  processEventsFn(eventsToProcess);
}
