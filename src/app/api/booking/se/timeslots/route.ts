import { NextRequest, NextResponse } from "next/server";
import * as webdoc from "@/src/lib/webdoc";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { caregiversSpecialistQuery } from "@/sanity/lib/queries";

export async function GET(request: NextRequest) {
  const clinicId = request.nextUrl.searchParams.get("clinic");
  const bookingTypeId =
    request.nextUrl.searchParams.get("bookingType") ?? undefined;
  const language = request.nextUrl.searchParams.get("lang") ?? "en";
  if (!clinicId) notFound();
  const auth = await webdoc.getAccessToken();
  const timeslots = await webdoc.getClinicBookings(
    auth,
    clinicId,
    new Date(),
    bookingTypeId,
    false
  );
  // query sanity for specialists matching caregivers in timeslots
  const caregiverIds = Array.from(
    new Set(timeslots.flatMap((ts) => ts.caregiver.id))
  );
  const specialists = await sanityFetch<CaregiverSpecialist[]>({
    query: caregiversSpecialistQuery,
    params: {
      language,
      caregiverIds,
    },
  });
  // now attach all timeslots to the correct specialist
  for (const specialist of specialists) {
    specialist.timeslots = timeslots.filter(
      (ts) => ts.caregiver.id === specialist.caregiverId
    );
  }
  return NextResponse.json(specialists);
}
