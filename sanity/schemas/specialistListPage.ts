import { SchemaTypeDefinition } from "sanity";
import { previewMultiLanguage } from "../desk/previewMultiLanguage";
import {
  internationalizedSlugValidator,
  requireAllInternationalizedObjectFields,
  requireAllInternationalizedValue,
} from "../lib/validation";
import { SpecialistIcon } from "../components/icons";

export const specialistListPage: SchemaTypeDefinition = {
  name: "specialistListPage",
  title: "Specialist List Page",
  type: "document",
  fields: [
    {
      name: "title",
      type: "internationalizedArrayString",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "slug",
      type: "internationalizedArraySlug",
      validation: (Rule) => [
        requireAllInternationalizedValue(Rule),
        internationalizedSlugValidator(Rule),
      ],
      options: {
        maxLength: 96,
      },
      hidden: true,
    },
    {
      name: "menuTitle",
      type: "internationalizedArrayString",
      description: "Title in lists and menu items",
      validation: requireAllInternationalizedValue,
      hidden: true,
    },
    {
      name: "valueProposition",
      type: "internationalizedArrayValueProposition",
      description:
        "Three taglines highlighting the benefits of our specialists (e.g Short wait, Without reference)",
      validation: requireAllInternationalizedObjectFields([
        "socialProof",
        "valueProposition1",
        "valueProposition2",
      ]),
    },
    {
      name: "primaryImage",
      type: "imageObject",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      type: "internationalizedArrayText",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "internationalizedSeo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: previewMultiLanguage,
  icon: SpecialistIcon,
};
