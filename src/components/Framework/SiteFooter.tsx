import { footerQuery, globalSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import Link from "next/link";
import { FC } from "react";
import { LanguagePicker } from "./LanguagePicker";
import { ContactInfo } from "./ContactInfo";
import { SocialMediaLink } from "../SocialMediaLink";
import { FaceBookIcon } from "../FacebookIcon";
import { InstagramIcon } from "../InstagramIcon";
import { LinkedInIcon } from "../LinkedInIcon";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import logoNegative from "../../../public/assets/logos/cm-wordmark-negative.png";
import Image from "next/image";
import { MapIcon } from "../MapIcon";
import { PhoneIcon } from "../PhoneIcon";
import { MailIcon } from "../MailIcon"
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
    // <footer className="bg-off-black text-white w-full pb-50">
    //   <div className="h-80 flex justify-center items-center py-20">
    //     {footerData.title}
    //   </div>
    //   <div className="flex flex-col justify-center md:justify-around gap-[24px] px-50 md:px-0 md:flex-row py-20 md:py-50">
    //     {footerData.phone && (
    //       <ContactInfo
    //         language={language}
    //         label={footerData.phone.label}
    //         text={footerData.phone.phoneNo}
    //       />
    //     )}
    //     {footerData.email && (
    //       <ContactInfo
    //         language={language}
    //         label={footerData.email.label}
    //         text={footerData.email.email}
    //       />
    //     )}
    //   </div>
    //   <div className="flex justify-center gap-10 flex-wrap ">
    //     <LanguagePicker
    //       current={language}
    //       selectedClassName="bg-white/10 text-white"
    //       direction="up"
    //     />
    //     <Link
    //       href={`/${language}/${footerData.clinics.slug}`}
    //       className="pill bg-white/10"
    //     >
    //       {footerData.clinics.menuTitle}
    //     </Link>
    //     <Link
    //       href={`/${language}/${footerData.specialists.slug}`}
    //       className="pill bg-white/10"
    //     >
    //       {footerData.specialists.menuTitle}
    //     </Link>
    //     {globalSettings.otherCategories.map((cat) => (
    //       <Link
    //         key={cat._id}
    //         href={`/${language}/${cat.slug}`}
    //         className="pill bg-white/10 hidden md:flex"
    //       >
    //         {cat.title}
    //       </Link>
    //     ))}
    //   </div>
    // </footer>
    <footer className="bg-[#180404] text-white pt-24 pb-12">
    <div className="container mx-auto px-6 md:px-16">
      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        {/* Logo and tagline */}
        <div className="flex items-center gap-15">
          <Image src={logoNegative} alt="C Medical" className="h-12 md:h-14 w-100" />
          <p className="text-sm text-white/50 font-normal leading-relaxed">
            Nordens ledende klinikk for livet og underlivet.
          </p>
        </div>

        {/* Contact info - horizontal on desktop */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm text-white/50">
          <div className="flex items-center gap-3">
            <MapIcon />
            <span>Oslo · Bergen · Trondheim</span>
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon />
            <a href="tel:+4722600050" className="hover:text-white transition-colors">+47 22 60 00 50</a>
          </div>
          <div className="flex items-center gap-3">
            <MailIcon/>
            <a href="mailto:info@cmedical.no" className="hover:text-white transition-colors">info@cmedical.no</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/40">© {new Date().getFullYear()} C Medical. Alle rettigheter reservert.</p>
        
        {/* Links and social */}
        <div className="flex items-center gap-8">
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Personvern</a>
            <a href="#" className="hover:text-white/70 transition-colors">Vilkår</a>
          </div>
          
          {/* Social icons */}
          <div className="flex justify-center w-full gap-10 py-3 bg-off-black text-white">
      <SocialMediaLink
        linkUrl={globalSettings.socialMedia.facebookUrl}
        className="justify-end"
      >
        <FaceBookIcon />
      </SocialMediaLink>
      <SocialMediaLink
        linkUrl={globalSettings.socialMedia.instagramUrl}
        className="justify-center"
      >
        <InstagramIcon />
      </SocialMediaLink>
      <SocialMediaLink
        linkUrl={globalSettings.socialMedia.linkedinUrl}
        className="justify-center"
      >
        <LinkedInIcon />
      </SocialMediaLink>
    </div>
        </div>
      </div>
    </div>
  </footer>
  );
};
