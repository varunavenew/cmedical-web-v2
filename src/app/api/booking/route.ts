import {
  bookingClinicDataQuery,
  bookingSpecialistDataQuery,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language");
  const clinicSlug = request.nextUrl.searchParams.get("clinic");
  const specialistSlug = request.nextUrl.searchParams.get("specialist");

  if (!(clinicSlug || specialistSlug)) notFound();

  const bookingData = await sanityFetch({
    query: specialistSlug ? bookingSpecialistDataQuery : bookingClinicDataQuery,
    params: { language, clinicSlug, specialistSlug },
    tags: specialistSlug ? ["specialistPage", "clinicPage"] : ["clinicPage"],
  });

  return NextResponse.json(bookingData);
}
