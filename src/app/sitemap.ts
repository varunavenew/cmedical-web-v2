import { MetadataRoute } from "next";
import { getAllPaths } from "../lib/getAllPaths";
import { toPath } from "../lib/toPath";
import { toCanonical } from "../lib/toCanonical";

// Don't cache the sitemap, which is the default behaviour
export const dynamic = "force-dynamic";

// Cache for 3 hours, 3*60*60.
// This must be a static pre-calculated number, in seconds.
export const revalidate = 10_800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllPaths();
  const pathsWithDate = docs
    .map((doc) => ({
      paths: toPath(doc),
      updatedAt: doc._updatedAt,
    }))
    .filter((p) => p.paths) as {
    paths: { language: string; path: string[] }[];
    updatedAt: string;
  }[];

  return pathsWithDate.flatMap((p) =>
    p.paths.map((inner) => ({
      url: toCanonical({ language: inner.language, path: inner.path }),
      lastModified: p.updatedAt,
    }))
  );
}
