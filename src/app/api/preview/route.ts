import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { previewDocumentQuery } from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/sanityFetch";

/**
 * Contains all fields required to build the URLs for all pages on the site.
 * Fields applicable to a subset of the document types are nullable.
 */
interface DocumentPathType {
  _type: string;
  language: string;
  slug?: string;
  parent?: string | { _key: string; value: { current: string } }[];
}

function getUrl(document: DocumentPathType) {
  // TODO: how to handle language for multilanguage pages? can we get it from sanity studio somehow? or add a language picker that sends a query param?
  switch (document._type) {
    case "homePage":
      return `/${document.language}`;

    case "categoryPage":
    case "clinicListPage":
    case "specialistListPage":
    case "articlePage":
    case "teamPage":
    case "privacyPolicyPage":
      return `/${document.language}/${document.slug}`;

    case "treatmentPage":
    case "clinicPage":
    case "specialistPage":
      return `/${document.language}/${document.parent}/${document.slug}`;

    default:
      throw new Error("Unknown document type");
  }
}

export async function GET(request: NextRequest) {
  // get id from query string
  const id = request.nextUrl.searchParams.get("id")?.replace(/^drafts./, "");
  const language = request.nextUrl.searchParams.get("language") ?? "en";
  const parent = request.nextUrl.searchParams.get("parent") ?? "";

  // fetch document
  const document = await client
    .withConfig({
      token,
      useCdn: false, // Must be false when using 'drafts' (aka 'previewDrafts')
      perspective: "previewDrafts",
    })
    .fetch<DocumentPathType>(previewDocumentQuery, {
      id,
      language,
      parent,
    });
  // build url from document depending on type and language and stuff
  let url = getUrl(document);

  draftMode().enable();
  redirect(url);
}
