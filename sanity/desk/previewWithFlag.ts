import { PreviewConfig } from "sanity";
import * as icons from "@sanity/icons";

export const previewWithFlag: PreviewConfig<
  Record<string, string>,
  Record<string, any>
> = {
  select: {
    title: "title",
    language: "language",
    media: "primaryImage.image",
  },
  prepare(selection) {
    const { title, language, media } = selection;
    return {
      title: `${title} ${
        language === "no"
          ? "🇳🇴"
          : language === "se"
            ? "🇸🇪"
            : language === "en"
              ? "🇬🇧"
              : "🏳️"
      }`,
      media,
    };
  },
};
