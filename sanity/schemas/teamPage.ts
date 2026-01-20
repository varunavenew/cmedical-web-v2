import { SchemaTypeDefinition } from "sanity";
import { previewMultiLanguage } from "../desk/previewMultiLanguage";
import {
  internationalizedSlugValidator,
  noEmptyLanguagesValidator,
  requireOneInternationalizedValue,
  requireSameLanguages,
} from "../lib/validation";

export const teamPage: SchemaTypeDefinition = {
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "internationalizedArrayString",
      validation: requireSameLanguages("slug"),
    },
    {
      title: "Tagline",
      name: "tagline",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "internationalizedArraySlug",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        internationalizedSlugValidator(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
      options: {
        maxLength: 96,
      },
    },
    {
      name: "primaryImage",
      type: "internationalizedArrayImageNotLocalized",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
    },
    {
      name: "description",
      type: "internationalizedArrayModifiedFormattedText",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
      description:
        "This field controls the visibility of the team page on the site when viewed in different languages. Leaving it empty for a specific language will result in the team page being hidden when the site is displayed in that language.",
    },
    {
      name: "category",
      type: "reference",
      to: [{ type: "categoryPage" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "internationalizedSeo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: previewMultiLanguage,
};
