import * as webdoc from "@/src/lib/webdoc";
import { NextRequest, NextResponse } from "next/server";

// Force the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await webdoc.getAccessToken();
  const bookingTypes = await webdoc.getBookingTypes(auth);
  return NextResponse.json(bookingTypes);
}
