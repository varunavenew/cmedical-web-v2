import { urlForImage } from "@/sanity/lib/image";
import { LANGUAGES_ISO, LANGUAGE_CODES } from "@/sanity/lib/languages";
import {
  alternateLanguageSlugQuery,
  alternateLanguagesByDescriptionQuery,
  alternateLanguagesQuery,
  alternateParentLanguageSlugQuery,
  articlePageQuery,
  categoryPageQuery,
  clinicListPageQuery,
  clinicPageQuery,
  docTypeQuery,
  homePageQuery,
  privacyPolicyPageQuery,
  seoQuery,
  specialistListPageQuery,
  specialistPageQuery,
  teamPageQuery,
  treatmentPageQuery,
} from "@/sanity/lib/queries";
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";
import PreviewProvider from "@/src/components/Preview/PreviewProvider";
import { blocksToString } from "@/src/lib/blocksToString";
import { getAllPaths } from "@/src/lib/getAllPaths";
import { toCanonical } from "@/src/lib/toCanonical";
import { toPath } from "@/src/lib/toPath";
import { Metadata, ResolvingMetadata } from "next";
import { SanityDocument } from "next-sanity";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Image, Slug } from "sanity";

const HomeContent = dynamic(() => import("@/src/components/HomeContent"));
const PreviewHomeContent = dynamic(
  () => import("@/src/components/Preview/PreviewHomeContent")
);
const CategoryContent = dynamic(
  () => import("@/src/components/Category/CategoryContent")
);
const PreviewCategoryContent = dynamic(
  () => import("@/src/components/Preview/PreviewCategoryContent")
);
const TreatmentContent = dynamic(
  () => import("@/src/components/Treatment/TreatmentContent")
);
const PreviewTreatmentContent = dynamic(
  () => import("@/src/components/Preview/PreviewTreatmentContent")
);
const SpecialistContent = dynamic(
  () => import("@/src/components/Specialist/SpecialistContent")
);
const PreviewSpecialistContent = dynamic(
  () => import("@/src/components/Preview/PreviewSpecialistContent")
);
const SpecialistListContent = dynamic(
  () => import("@/src/components/Specialist/SpecialistListContent")
);
const PreviewSpecialistListContent = dynamic(
  () => import("@/src/components/Preview/PreviewSpecialistListContent")
);
const TeamContent = dynamic(() => import("@/src/components/Team/TeamContent"));
const PreviewTeamContent = dynamic(
  () => import("@/src/components/Preview/PreviewTeamContent")
);
const ClinicContent = dynamic(
  () => import("@/src/components/Clinic/ClinicContent")
);
const PreviewClinicContent = dynamic(
  () => import("@/src/components/Preview/PreviewClinicContent")
);
const ClinicListContent = dynamic(
  () => import("@/src/components/Clinic/ClinicListContent")
);
const PreviewClinicListContent = dynamic(
  () => import("@/src/components/Preview/PreviewClinicListContent")
);
const ArticleContent = dynamic(
  () => import("@/src/components/Article/ArticleContent")
);
const PreviewArticleContent = dynamic(
  () => import("@/src/components/Preview/PreviewArticleContent")
);
const PrivacyPolicyContent = dynamic(
  () => import("@/src/components/PrivacyPolicyContent")
);
const PreviewPrivacyPolicyContent = dynamic(
  () => import("@/src/components/Preview/PreviewPrivacyPolicyContent")
);

export const generateStaticParams = async () => {
  const docs = await getAllPaths();

  // transform docs into path array
  const paths = docs.flatMap(toPath).filter(Boolean);

  return paths;
};

interface MetadataProps {
  params: { language: string; path?: string[] };
  // searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const language = params.language;
  const parentSlug = params.path?.[0] ?? null;
  const subPageSlug = params.path?.[1] ?? null;

  const pageSeoData = await sanityFetch<SeoQueryData | null>({
    query: seoQuery,
    params: { language, slug: subPageSlug ?? parentSlug ?? null },
    tags: [
      "homePage",
      "categoryPage",
      "treatmentPage",
      "specialistPage",
      "specialistListPage",
      "teamPage",
      "clinicPage",
      "clinicListPage",
      "articlePage",
    ],
  });

  // now get alternate languages for this page
  const hreflangs: AlternateURLs = {};
  if (pageSeoData) {
    Object.assign(
      hreflangs,
      await getAlternateUrls(
        pageSeoData,
        language,
        subPageSlug ? parentSlug : null
      )
    );
  }

  const previousMetadata = await parent;

  const images = (
    [pageSeoData?.seo?.image, pageSeoData?.image].filter(Boolean) as Image[]
  )
    .map(urlForImage)
    .map((img) => img.url());
  const previousImages = previousMetadata.openGraph?.images || [];

  const description =
    pageSeoData?.seo?.description ??
    (pageSeoData?.description
      ? typeof pageSeoData.description === "string"
        ? pageSeoData.description
        : blocksToString(pageSeoData.description)
      : previousMetadata.description);

  return {
    title: pageSeoData?.seo?.title ?? pageSeoData?.title ?? "",
    description,
    alternates: {
      canonical: toCanonical({ language, path: params.path }),
      languages: hreflangs,
    },
    openGraph: {
      images: [...images, ...previousImages],
    },
  };
}

const getAlternateUrls = async (
  pageData: SeoQueryData,
  language: string,
  parentSlug: string | null
): Promise<Record<string, string>> => {
  // if the page is not a treatment page, we can get the alternate slug from the page but have to get the parent
  switch (pageData._type) {
    case "homePage":
      return LANGUAGE_CODES.reduce((arr, curr) => {
        if (curr !== language) {
          return {
            ...arr,
            [LANGUAGES_ISO[curr]]: `/${curr}`,
          };
        }
        return arr;
      }, {});
    case "treatmentPage": {
      const parentAlternativeSlugs = await sanityFetch<
        { _key: string; value: Slug }[]
      >({
        query: alternateParentLanguageSlugQuery,
        params: { slug: parentSlug, language },
        tags: ["categoryPage"],
      });
      const alternateSlugs =
        (
          await sanityFetch<{ language: string; slug: Slug }[]>({
            query: alternateLanguagesQuery,
            params: { id: pageData._id, language },
            tags: ["treatmentPage", "translation.metadata"],
          })
        )?.filter(Boolean) ?? [];
      const paths = alternateSlugs.map((slug) => ({
        language: slug.language,
        slug: slug.slug.current,
        parent: parentAlternativeSlugs.find((s) => s._key === slug.language)
          ?.value.current,
      }));

      return paths.reduce(
        (arr, curr) => ({
          ...arr,
          [LANGUAGES_ISO[curr.language]]:
            `/${curr.language}/${curr.parent}/${curr.slug}`,
        }),
        {}
      );
    }
    case "specialistPage":
    case "clinicPage": {
      const alternateLanguages = await sanityFetch<{
        slug: string;
        languages: string[];
        parents: { _key: string; slug: string }[];
      }>({
        query: alternateLanguagesByDescriptionQuery,
        params: { id: pageData._id, language },
        tags: [
          "specialistPage",
          "teamPage",
          "clinicPage",
          "specialistListPage",
          "clinicListPage",
        ],
      });
      return alternateLanguages.languages.reduce(
        (arr, curr) => ({
          ...arr,
          [LANGUAGES_ISO[curr]]: `/${curr}/${
            alternateLanguages.parents.find((p) => p._key === curr)?.slug
          }/${alternateLanguages.slug}`,
        }),
        {}
      );
    }
    case "teamPage":
    case "articlePage": {
      const alternateSlugs =
        (
          await sanityFetch<{ language: string; slug: Slug }[]>({
            query: alternateLanguagesQuery,
            params: { id: pageData._id, language },
            tags: ["articlePage"],
          })
        )?.filter(Boolean) ?? [];
      const paths = alternateSlugs.map((slug) => ({
        language: slug.language,
        slug: slug.slug.current,
      }));

      return paths.reduce(
        (arr, curr) => ({
          ...arr,
          [LANGUAGES_ISO[curr.language]]: `/${curr.language}/${curr.slug}`,
        }),
        {}
      );
    }
    default: {
      const alternateSlugs = await sanityFetch<{ _key: string; value: Slug }[]>(
        {
          query: alternateLanguageSlugQuery,
          params: { id: pageData._id, language },
          tags: ["categoryPage"],
        }
      );
      return (
        alternateSlugs?.reduce(
          (arr, curr) => ({
            ...arr,
            [LANGUAGES_ISO[curr._key]]: `/${curr._key}/${curr.value.current}`,
          }),
          {}
        ) ?? {}
      );
    }
  }
};

export default async function Page({ params }: { params: ParamsType }) {
  // get type of document
  const pageData = await getPageData(params.language, params.path);
  if (!pageData) notFound();
  const [docType, data] = pageData;
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        {docType._type === "homePage" && (
          <PreviewHomeContent data={data as SanityDocument<HomePage>} />
        )}
        {docType._type === "categoryPage" && (
          <PreviewCategoryContent data={data as SanityDocument<CategoryPage>} />
        )}
        {docType._type === "treatmentPage" && (
          <PreviewTreatmentContent
            data={data as SanityDocument<TreatmentPage>}
          />
        )}
        {docType._type === "specialistPage" && (
          <PreviewSpecialistContent
            data={data as SanityDocument<SpecialistPage>}
          />
        )}
        {docType._type === "specialistListPage" && (
          <PreviewSpecialistListContent
            data={data as SanityDocument<SpecialistListPage>}
          />
        )}
        {docType._type === "teamPage" && (
          <PreviewTeamContent data={data as SanityDocument<TeamPage>} />
        )}
        {docType._type === "clinicPage" && (
          <PreviewClinicContent data={data as SanityDocument<ClinicPage>} />
        )}
        {docType._type === "clinicListPage" && (
          <PreviewClinicListContent
            data={data as SanityDocument<ClinicListPage>}
          />
        )}
        {docType._type === "articlePage" && (
          <PreviewArticleContent data={data as SanityDocument<ArticlePage>} />
        )}
        {docType._type === "privacyPolicyPage" && (
          <PreviewPrivacyPolicyContent
            data={data as SanityDocument<PrivacyPolicyPage>}
          />
        )}
      </PreviewProvider>
    );
  }

  return (
    <>
      {docType._type === "homePage" && (
        <HomeContent data={data as SanityDocument<HomePage>} />
      )}
      {docType._type === "categoryPage" && (
        <CategoryContent
          data={data as SanityDocument<CategoryPage>}
          language={params.language}
        />
      )}
      {docType._type === "treatmentPage" && (
        <TreatmentContent data={data as SanityDocument<TreatmentPage>} />
      )}
      {docType._type === "specialistPage" && (
        <SpecialistContent
          data={data as SanityDocument<SpecialistPage>}
          language={params.language}
        />
      )}
      {docType._type === "specialistListPage" && (
        <SpecialistListContent
          data={data as SanityDocument<SpecialistListPage>}
        />
      )}
      {docType._type === "teamPage" && (
        <TeamContent
          data={data as SanityDocument<TeamPage>}
          language={params.language}
        />
      )}
      {docType._type === "clinicPage" && (
        <ClinicContent
          data={data as SanityDocument<ClinicPage>}
          language={params.language}
        />
      )}
      {docType._type === "clinicListPage" && (
        <ClinicListContent data={data as SanityDocument<ClinicListPage>} />
      )}
      {docType._type === "articlePage" && (
        <ArticleContent data={data as SanityDocument<ArticlePage>} />
      )}
      {docType._type === "privacyPolicyPage" && (
        <PrivacyPolicyContent
          data={data as SanityDocument<PrivacyPolicyPage>}
        />
      )}
    </>
  );
}
function fetchData(
  type: string,
  id: string,
  language: string,
  parent: string | false
) {
  switch (type) {
    case "homePage":
      return sanityFetch<SanityDocument<HomePage>>({
        query: homePageQuery,
        params: { id, language },
        tags: [
          "homePage",
          "categoryPage",
          "clinicListPage",
          "specialistListPage",
          "finance",
          "faq",
        ],
      });
    case "categoryPage":
      return sanityFetch<SanityDocument<CategoryPage>>({
        query: categoryPageQuery,
        params: { id, language },
        tags: [
          "categoryPage",
          "treatmentPage",
          "clinicListPage",
          "specialistListPage",
          "teamPage",
          "finance",
          "faq",
        ],
      });
    case "treatmentPage":
      return sanityFetch<SanityDocument<TreatmentPage>>({
        query: treatmentPageQuery,
        params: { id, language, parent },
        tags: [
          "treatmentPage",
          "categoryPage",
          "clinicListPage",
          "specialistListPage",
          "finance",
          "faq",
        ],
      });
    case "specialistPage":
      return sanityFetch<SanityDocument<SpecialistPage>>({
        query: specialistPageQuery,
        params: { id, language },
        tags: ["specialistPage", "clinicPage", "finance", "faq"],
      });
    case "specialistListPage":
      return sanityFetch<SanityDocument<SpecialistListPage>>({
        query: specialistListPageQuery,
        params: { id, language },
        tags: ["specialistListPage", "specialistPage", "categoryPage", "faq"],
      });
    case "teamPage":
      return sanityFetch<SanityDocument<SpecialistPage>>({
        query: teamPageQuery,
        params: { id, language },
        tags: [
          "teamPage",
          "specialistListPage",
          "specialistPage",
          "teamPage",
          "finance",
          "faq",
        ],
      });
    case "clinicPage":
      return sanityFetch<SanityDocument<ClinicPage>>({
        query: clinicPageQuery,
        params: { id, language },
        tags: ["clinicPage", "finance", "faq"],
      });
    case "clinicListPage":
      return sanityFetch<SanityDocument<ClinicListPage>>({
        query: clinicListPageQuery,
        params: { id, language },
        tags: ["clinicListPage", "clinicPage", "categoryPage", "faq"],
      });
    case "articlePage":
      return sanityFetch<SanityDocument<ArticlePage>>({
        query: articlePageQuery,
        params: { id, language },
        tags: [
          "articlePage",
          "clinicListPage",
          "specialistListPage",
          "faq",
          "finance",
        ],
      });
    case "privacyPolicyPage":
      return sanityFetch<SanityDocument<PrivacyPolicyPage>>({
        query: privacyPolicyPageQuery,
        params: { id, language },
        tags: ["privacyPolicyPage"],
      });
  }
}

async function getPageData(
  language: string,
  path?: string[]
): Promise<
  undefined | [{ _type: string; _id: string }, SanityDocument | undefined]
> {
  const slug = path && path.length > 0 ? path[path.length - 1] : false;
  const parent = path && path.length > 1 ? path[0] : false;
  const queryParams = {
    language,
    slug,
    parent,
  };
  const docType = await sanityFetch<{ _type: string; _id: string }>({
    query: docTypeQuery,
    params: queryParams,
    tags: [
      "homePage",
      "categoryPage",
      "treatmentPage",
      "specialistPage",
      "specialistListPage",
      "teamPage",
      "clinicPage",
      "clinicListPage",
      "articlePage",
      "privacyPolicyPage",
    ],
  });
  if (!docType) {
    return undefined;
  }

  const data = await fetchData(docType._type, docType._id, language, parent);
  return [docType, data];
}
