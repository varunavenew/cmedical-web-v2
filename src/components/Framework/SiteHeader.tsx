import { globalSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { FC, Suspense } from "react";
import { Menu } from "./Menu";

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
    <header className="sticky top-[95%] left-0 right-0 flex items-center justify-center z-50 transition-[top] duration-slow">
      <Suspense>
        <Menu {...globalSettings} language={language} />
      </Suspense>
    </header>
  );
};
