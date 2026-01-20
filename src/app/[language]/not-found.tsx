import { notFoundQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { Grid } from "@/src/components/Grid";
import { Hero } from "@/src/components/Hero";
import { PortableTextComponent } from "@/src/components/PortableText/PortableTextComponent";
import { headers } from "next/headers";

export default async function NotFound() {
  // HACK: because we don't get any params we set the language in a custom header
  const language = headers().get("x-lang") ?? "en";
  const data = await sanityFetch<NotFoundData>({
    query: notFoundQuery,
    params: { language },
    tags: ["globalSettings", "homePage"],
  });

  return (
    <main>
      <Grid className="bg-yellow">
        <Hero
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          valueProposition={data.valueProposition}
          content={
            <div className="prose">
              <PortableTextComponent value={data.content} />
            </div>
          }
        />
      </Grid>
    </main>
  );
}
