import { tagManagerCodeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";

export async function fetchTrackingIds() {
  let { tagManagerCode } =
    process.env.NODE_ENV === "production"
      ? await sanityFetch<{ tagManagerCode?: string | null }>({
          query: tagManagerCodeQuery,
          tags: ["globalSettings"],
        })
      : { tagManagerCode: undefined };

  // Make it possible to overwrite the Google Tag Manager ID via an environment variable
  // which can be set in Vercel on in .env.local.
  if (process.env.GOOGLE_TAG_MANAGER_ID) {
    tagManagerCode = process.env.GOOGLE_TAG_MANAGER_ID;
  }

  return {
    tagManagerCode,
  };
}
