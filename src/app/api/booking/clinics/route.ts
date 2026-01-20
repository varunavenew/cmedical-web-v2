import { bookingClinicsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language");
  if (!language) {
    notFound();
  }

  const clinicLanguage = request.nextUrl.searchParams.get("clinicLanguage");
  if (!clinicLanguage) {
    notFound();
  }

  const categorySlug = request.nextUrl.searchParams.get("categorySlug");
  if (!categorySlug) {
    notFound();
  }

  const clinics = await sanityFetch<Pick<ClinicPage, "title" | "booking">>({
    query: bookingClinicsQuery,
    params: { language, clinicLanguage, categorySlug },
    tags: ["clinicPage", "categoryPage"],
  });
  return NextResponse.json(clinics);
}
