import { fetchTrackingIds } from "@/src/lib/trackingIds";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import { createMetodikaHtml } from "./html";

export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language");
  if (!language) {
    notFound();
  }

  const city = request.nextUrl.searchParams.get("city");

  const { tagManagerCode } = await fetchTrackingIds();

  const locationGroup = language === "no" ? "nor" : "eng";

  const html = createMetodikaHtml({
    language,
    locationGroup,
    tagManagerCode: tagManagerCode ?? "",
    hasPreselectedCity: city != null,
  });

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
