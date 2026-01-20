import { SchemaTypeDefinition } from "sanity";
import { CategoryIcon } from "../components/icons";
import { previewMultiLanguage } from "../desk/previewMultiLanguage";
import {
  internationalizedSlugValidator,
  noEmptyLanguagesValidator,
  requireOneInternationalizedObjectFields,
  requireOneInternationalizedValue,
  requireSameLanguages,
} from "../lib/validation";

export const categoryPage: SchemaTypeDefinition = {
  name: "categoryPage",
  title: "Category Page",
  type: "document",
  fields: [
    {
      name: "title",
      type: "internationalizedArrayString",
      title: "Category title",
      validation: requireSameLanguages("slug"),
    },
    {
      name: "slug",
      type: "internationalizedArraySlug",
      description:
        "The site is structured cmedical.no/<language>/<categorytitle>",
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
      type: "imageObject",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "about",
      type: "internationalizedArraySimpleFormattedText",
      validation: requireSameLanguages("slug"),
    },
    {
      name: "metodikaActivityGroupTitle",
      title: "Metodika activity group title",
      type: "internationalizedArrayString",
      description: (
        <>
          The activity group title (the dropdown name) in the Metodika form.
          <br />
          If this title is set, activity group dropdown will automatically be
          expanded in the booking flow. If this title is not set the main
          &quot;Velg tjeneste&quot; dropdown will still automatically be
          expanded.
          <br />
          If this category applies to more than one Metodika activity group,
          leave it empty.
          <br />
          Not relevant for Sweden.
        </>
      ),
    },
    {
      name: "valueProposition",
      type: "internationalizedArrayValueProposition",
      validation: (Rule) => [
        requireSameLanguages("slug")(Rule),
        requireOneInternationalizedObjectFields([
          "socialProof",
          "valueProposition1",
          "valueProposition2",
        ])(Rule),
      ],
    },
    {
      name: "expertise",
      type: "object",
      fields: [
        {
          name: "title",
          type: "internationalizedArrayString",
          validation: requireSameLanguages("slug"),
        },
        {
          name: "body",
          type: "internationalizedArrayText",
          validation: requireSameLanguages("slug"),
        },
      ],
      options: { collapsible: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hideFromMainMenu",
      type: "boolean",
      title: "Hide from the main menu",
      description:
        "Don't show this category in the floating menu at the bottom.",
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "internationalizedSeo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: previewMultiLanguage,
  icon: CategoryIcon,
};
