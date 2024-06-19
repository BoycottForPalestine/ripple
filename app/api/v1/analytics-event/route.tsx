import { BadRequestResponse } from "@/lib/server/error";
import { insertAnalyticsEvent } from "@/lib/server/model/analytics-event";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.eventType) {
    return BadRequestResponse("Missing eventType");
  }

  await insertAnalyticsEvent(body.eventType, body.data);
  return Response.json({ success: true });
}
