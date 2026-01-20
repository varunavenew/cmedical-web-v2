import { SchemaTypeDefinition } from "sanity";
import {
  internationalizedSlugValidator,
  noEmptyLanguagesValidator,
  requireOneInternationalizedValue,
  requireSameLanguages,
} from "../lib/validation";
import { previewMultiLanguage } from "@/sanity/desk/previewMultiLanguage";

export const privacyPolicy: SchemaTypeDefinition = {
  name: "privacyPolicyPage",
  type: "document",
  fields: [
    {
      name: "title",
      type: "internationalizedArrayString",
      validation: requireSameLanguages("slug"),
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
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "body",
      type: "internationalizedArrayModifiedFormattedText",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
    },
    { name: "cookiebotKey", type: "string" },
  ],
  preview: previewMultiLanguage,
};
