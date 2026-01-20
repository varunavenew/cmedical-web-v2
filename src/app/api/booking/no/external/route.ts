import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = (request.nextUrl.searchParams.get("id") ?? "").replace(
    /^drafts\./,
    ""
  );
  if (!id) notFound();
  if (!process.env.NEXT_PUBLIC_PATIENTSKY_API_URL)
    throw new Error(
      "Missing environment variable: NEXT_PUBLIC_PATIENTSKY_API_URL"
    );
  // get serviceproviderid for clinic connected to this person
  const serviceProviderId = await sanityFetch<string | undefined>({
    query: groq`*[_type == "clinicPage" && $id in specialists[]._ref][0].booking.serviceProviderId`,
    params: { id },
    tags: ["clinicPage"],
  });
  if (!serviceProviderId) notFound();

  const now = new Date();
  const later = new Date();
  later.setMonth(now.getMonth() + 1);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATIENTSKY_API_URL}/open-api/service-providers/${serviceProviderId}/external-booking-flow`,
    {
      method: "PUT",
      body: JSON.stringify({
        calendarIds: [],
        timeslotTypeIds: [],
        dateRange: { from: now.toISOString(), to: later.toISOString() },
      }),
    }
  );
  return NextResponse.json(await response.json(), { status: response.status });
}
