import { treatmentSpecialistsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // get random specialist for specific treatment
  const treatment = request.nextUrl.searchParams.get("theme");
  const language = request.nextUrl.searchParams.get("lang");
  if (!treatment || !language) notFound();
  const specialists = await sanityFetch<SpecialistPage[] | null>({
    query: treatmentSpecialistsQuery,
    params: { language, treatment },
    tags: ["specialistPage", "clinicPage"],
  });
  if (!specialists) notFound();
  // pick a random specialist
  const randomSpecialist =
    specialists[Math.trunc(Math.random() * specialists.length)];
  return NextResponse.json(randomSpecialist);
}
