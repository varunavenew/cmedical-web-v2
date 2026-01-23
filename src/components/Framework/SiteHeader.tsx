import { globalSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { FC, Suspense } from "react";
import { Header } from "./Header";

export const SiteHeader: FC<{ language: string }> = async ({ language }) => {
  const globalSettings = await sanityFetch<GlobalSettings>({
    query: globalSettingsQuery,
    params: { language },
    tags: [
      "globalSettings",
      "categoryPage",
      "clinicListPage",
      "specialistListPage",
    ],
  });

  return (
    <Suspense>
      <Header {...globalSettings} language={language} />
    </Suspense>
  );
};
