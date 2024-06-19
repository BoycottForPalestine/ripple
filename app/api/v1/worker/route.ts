import { worker } from "@/lib/server/workers/registry";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new NextResponse(String(worker("tefdsast")));
}
