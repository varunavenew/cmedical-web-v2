import { SchemaTypeDefinition } from "sanity";
import { previewMultiLanguage } from "../desk/previewMultiLanguage";
import {
  internationalizedSlugValidator,
  requireAllInternationalizedObjectFields,
  requireAllInternationalizedValue,
} from "../lib/validation";
import { ClinicIcon } from "../components/icons";

export const clinicListPage: SchemaTypeDefinition = {
  name: "clinicListPage",
  title: "Clinic List Page",
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
        "Three taglines highlighting the benefits of our clinics (e.g Short wait, Without reference)",
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
      name: "description",
      type: "internationalizedArraySimpleFormattedText",
      description: "Teaser description",
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
  icon: ClinicIcon,
};
