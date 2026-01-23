import { bookingClinicsForServiceQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const language = request.nextUrl.searchParams.get("language");
    const clinicLanguage = request.nextUrl.searchParams.get("clinicLanguage");
    const treatmentSlug = request.nextUrl.searchParams.get("treatmentSlug");

    if (!language || !clinicLanguage || !treatmentSlug) {
        notFound();
    }

    const clinics = await sanityFetch({
        query: bookingClinicsForServiceQuery,
        params: { language, clinicLanguage, treatmentSlug },
        tags: ["clinicPage", "treatmentPage"],
    });

    return NextResponse.json(clinics);
}

