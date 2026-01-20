import { NextResponse, URLPattern } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/edge";
import { LANGUAGE_CODES } from "@/sanity/lib/languages";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { RedirectsDataQueryResult, redirectsQuery } from "@/sanity/lib/queries";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

function getDefaultLanguage(request: NextRequest) {
  const { country } = geolocation(request);
  switch (country) {
    case "NO":
      return "no";
    case "SE":
      return "se";
    default:
      return "en";
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirect = await getRedirect(request);
  if (redirect) {
    return NextResponse.redirect(redirect.url, {
      status: redirect.permanent ? 308 : 307,
    });
  }

  const language = LANGUAGE_CODES.find((locale) =>
    new RegExp(`^/${locale}(?:/|$)`).test(pathname)
  );
  if (language) {
    // make sure this is not a next server action before adding language header
    if (request.headers.get("next-action")) {
      return;
    } else {
      const headers = new Headers(request.headers);
      headers.set("x-lang", language);
      return NextResponse.next({ headers });
    }
  }

  const defaultLanguage = getDefaultLanguage(request);

  return NextResponse.redirect(
    new URL(`/${defaultLanguage}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next
     * - favicon.ico, .well-known, sitemap (metadata files)
     * - @iframe-resizer
     * - files (static files from public/files)
     */
    "/((?!api|_next|favicon.ico|robots.txt|studio|.well-known|sitemap|@iframe-resizer|files).*)",
  ],
  runtime: "experimental-edge",
};

// Check if we should redirect the current request based on redirects from Sanity
async function getRedirect(request: NextRequest) {
  const redirects = await sanityFetch<RedirectsDataQueryResult>({
    query: redirectsQuery,
    tags: ["redirect"],
  });

  if (redirects == null || redirects.length === 0) {
    return;
  }

  const redirect = redirects.find((redirect) => {
    if (redirect.source == null) {
      return false;
    }

    const pattern = new URLPattern({ pathname: redirect.source });
    return pattern.exec({ pathname: request.nextUrl.pathname });
  });
  if (redirect == null) {
    return;
  }

  if (redirect.type == "slug" && redirect.destinationSlug) {
    const url = request.nextUrl.clone();

    // `nextUrl` does not include the correct domain when using custom domains.
    // We can set a `NEXT_PUBLIC_HOST` environment variable in production
    // and prefer that if it is set.
    // See https://github.com/vercel/next.js/discussions/16429
    if (NEXT_PUBLIC_HOST != null) {
      url.host = NEXT_PUBLIC_HOST;
    }

    url.pathname = redirect.destinationSlug;

    return {
      url,
      permanent: redirect.permanent,
    };
  }

  if (redirect.type === "url" && redirect.destinationUrl) {
    return {
      url: redirect.destinationUrl,
      permanent: redirect.permanent,
    };
  }
}
