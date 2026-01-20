import { bookingCategoriesQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// The slugs for the "other" category in English and Norwegian.
// This category does not have a slug in Swedish and is not shown.
const OTHER_SLUGS = ["other", "ovrige"];

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language");
  const clinicLanguage = request.nextUrl.searchParams.get("clinicLanguage");
  if (!language || !clinicLanguage) {
    notFound();
  }

  const categories = await sanityFetch<BookingCategory[]>({
    query: bookingCategoriesQuery,
    params: { language, clinicLanguage },
    tags: ["categoryPage", "clinicPage", "treatmentPage"],
  });

  categories.filter((category) => category.bookable);
  categories.sort((a, b) => a.title.localeCompare(b.title));

  // Move the "Other" category to the end. This is a bit hacky.
  // A better solution would be to add a "sortIndex" to each category if we
  // want to allow full control of the sort order.
  // If we want the categories to be sorted alphabetically but show "other"
  // last we could add an "other" boolean or similar so we don't need to
  // hardcode the slugs here.
  const otherIndex = categories.findIndex((category) =>
    OTHER_SLUGS.includes(category.slug)
  );
  if (otherIndex !== -1) {
    const other = categories[otherIndex];
    categories.splice(otherIndex, 1);
    categories.push(other);
  }

  return NextResponse.json(categories);
}
