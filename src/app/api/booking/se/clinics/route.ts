import { NextRequest, NextResponse } from "next/server";
import * as webdoc from "@/src/lib/webdoc";

// Force the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  const auth = await webdoc.getAccessToken();
  const bookingTypes = await webdoc.getClinics(auth);
  return NextResponse.json(bookingTypes);
}
