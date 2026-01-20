import { SchemaTypeDefinition } from "sanity";
import {
  requireAllInternationalizedValue,
  requireAllInternationalizedObjectFields,
} from "../lib/validation";
import { HomeIcon } from "../components/icons";

export const homePage: SchemaTypeDefinition = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    {
      name: "aboutUs",
      description: "A description of what we do and what makes us special.",
      options: { collapsible: true },
    },
  ],
  fields: [
    {
      name: "primaryImage",
      type: "imageObject",
      title: "Macro image",
      description: "Should be an image that is zoomed out on a situation.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "secondaryImage",
      type: "imageObject",
      title: "Micro image",
      description:
        "Should be an image that is focused and zoomed in on a part of the body (e.g Strechmark, cell or an armpit)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "payoff",
      type: "internationalizedArrayString",
      description:
        "A short and precise description of what our unique offering is",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "aboutTitle",
      title: "Title",
      type: "internationalizedArrayString",
      fieldset: "aboutUs",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "aboutBody",
      title: "Content",
      type: "internationalizedArrayRestrictedFormattedText",
      fieldset: "aboutUs",
      validation: requireAllInternationalizedValue,
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
      name: "promotedCategoriesOld",
      type: "array",
      description: "Three categories shown as teasers on the home page",
      of: [
        {
          type: "reference",
          to: [{ type: "categoryPage" }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
      hidden: true,
    },
    {
      name: "promotedCategories",
      type: "internationalizedArrayCategories",
      description: "Three categories shown as teasers on the home page",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "internationalizedSeo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
  icon: HomeIcon,
};
