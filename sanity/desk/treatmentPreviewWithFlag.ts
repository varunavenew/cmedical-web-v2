import { PreviewConfig } from "sanity";
import * as icons from "@sanity/icons";

export const treatmentPreviewWithFlag: PreviewConfig<
  Record<string, string>,
  Record<string, any>
> = {
  select: {
    title: "title",
    language: "language",
    media: "primaryImage.image",
    id: "_id",
  },
  prepare(selection) {
    const { id, title, language, media } = selection;
    const isDraft = id.startsWith("draft");
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
      subtitle: isDraft ? "DRAFT" : undefined,
      media: isDraft ? icons.EditIcon : media,
    };
  },
};
