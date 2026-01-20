import { footerQuery, globalSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import Link from "next/link";
import { FC } from "react";
import { LanguagePicker } from "./LanguagePicker";
import { ContactInfo } from "./ContactInfo";

export const SiteFooter: FC<{ language: string }> = async ({ language }) => {
  const footerData = await sanityFetch<FooterSettings>({
    query: footerQuery,
    params: { language },
    tags: ["footer", "clinicListPage", "specialistListPage"],
  });
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
    <footer className="bg-off-black text-white w-full pb-50">
      <div className="h-80 flex justify-center items-center py-20">
        {footerData.title}
      </div>
      <div className="flex flex-col justify-center md:justify-around gap-[24px] px-50 md:px-0 md:flex-row py-20 md:py-50">
        {footerData.phone && (
          <ContactInfo
            language={language}
            label={footerData.phone.label}
            text={footerData.phone.phoneNo}
          />
        )}
        {footerData.email && (
          <ContactInfo
            language={language}
            label={footerData.email.label}
            text={footerData.email.email}
          />
        )}
      </div>
      <div className="flex justify-center gap-10 flex-wrap ">
        <LanguagePicker
          current={language}
          selectedClassName="bg-white/10 text-white"
          direction="up"
        />
        <Link
          href={`/${language}/${footerData.clinics.slug}`}
          className="pill bg-white/10"
        >
          {footerData.clinics.menuTitle}
        </Link>
        <Link
          href={`/${language}/${footerData.specialists.slug}`}
          className="pill bg-white/10"
        >
          {footerData.specialists.menuTitle}
        </Link>
        {globalSettings.otherCategories.map((cat) => (
          <Link
            key={cat._id}
            href={`/${language}/${cat.slug}`}
            className="pill bg-white/10 hidden md:flex"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};
