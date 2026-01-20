import { NextRequest, NextResponse } from "next/server";
import * as webdoc from "@/src/lib/webdoc";

export async function POST(request: NextRequest) {
  // get personal information and lookup patient or create a new one
  const personalNumber = request.headers.get("pnr");
  if (!personalNumber)
    return NextResponse.json(
      { error: "Personal number argument missing" },
      { status: 400 }
    );
  try {
    const body = (await request.json()) as {
      clinic: webdoc.Clinic;
      person: { name: string; email: string; phone: string };
      bookingId: string;
    };
    // TODO: validate body
    const auth = await webdoc.getAccessToken();
    const patient = await webdoc.getOrCreatePatient(
      auth,
      personalNumber,
      "Private",
      { hsaId: body.clinic.hsaId },
      body.person.email,
      body.person.phone
    );
    const booking = await webdoc.bookTimeslot(auth, patient.id, body.bookingId);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error booking timeslot");
    console.error(error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
