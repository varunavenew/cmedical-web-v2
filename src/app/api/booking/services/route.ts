import { bookingServicesByCategoryQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const language = request.nextUrl.searchParams.get("language");
    if (!language) {
        notFound();
    }

    const services = await sanityFetch({
        query: bookingServicesByCategoryQuery,
        params: { language },
        tags: ["categoryPage", "treatmentPage"],
    });

    // Filter out categories with no services
    const filteredServices = services.filter(
        (category: any) => category.services && category.services.length > 0
    );

    return NextResponse.json(filteredServices);
}

