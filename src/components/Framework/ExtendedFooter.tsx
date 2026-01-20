import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { FaceBookIcon } from "../FacebookIcon";
import { InstagramIcon } from "../InstagramIcon";
import { LinkedInIcon } from "../LinkedInIcon";
import { SocialMediaLink } from "../SocialMediaLink";
import { globalSettingsQuery } from "@/sanity/lib/queries";
import { FC } from "react";

export const ExtendedFooter: FC<{ language: string }> = async ({
  language,
}) => {
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
    <div className="flex justify-center w-full gap-10 py-115 bg-off-black text-white">
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
  );
};
