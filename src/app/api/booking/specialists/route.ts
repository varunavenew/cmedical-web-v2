import { bookingSpecialistsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language");
  if (!language) {
    notFound();
  }

  const specialists = await sanityFetch({
    query: bookingSpecialistsQuery,
    params: { language },
    tags: ["specialistPage"],
  });

  return NextResponse.json(specialists);
}



