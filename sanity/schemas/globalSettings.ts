import { SchemaTypeDefinition } from "sanity";
import { requireAllInternationalizedValue } from "../lib/validation";
import { SettingsIcon } from "../components/icons";

export const globalSettings: SchemaTypeDefinition = {
  name: "globalSettings",
  type: "document",
  fieldsets: [
    { name: "mainMenu", options: { collapsible: true } },
    {
      name: "metadata",
      title: "SEO & Sharing",
      options: { collapsible: true },
    },
    { name: "analytics", options: { collapsible: true } },
  ],
  fields: [
    {
      name: "siteTitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      fieldset: "metadata",
    },
    {
      name: "siteImage",
      description: "Default image when sharing a page if the page has no image",
      type: "image",
      validation: (Rule) => Rule.required(),
      fieldset: "metadata",
    },
    {
      name: "tagManagerCode",
      type: "string",
      title: "Google Tag Manager code",
      placeholder: "GTM-XXXXXX",
      validation: (Rule) =>
        Rule.regex(/^GTM-.+$/).error(
          "Please enter a Google Tag manager code in the format GTM-XXXXXX"
        ),
      fieldset: "analytics",
    },
    {
      name: "menuCategories",
      type: "internationalizedArrayCategories",
      description: "Categories shown as sticky in the main menu",
      validation: requireAllInternationalizedValue,
      fieldset: "mainMenu",
    },
    {
      name: "socialMedia",
      type: "internationalizedArraySocialMedia",
      validation: requireAllInternationalizedValue,
    },
    {
      name: "notFound",
      type: "object",
      fields: [
        {
          name: "primaryImage",
          type: "imageObject",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          type: "internationalizedArrayModifiedFormattedText",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],

  icon: SettingsIcon,
};
