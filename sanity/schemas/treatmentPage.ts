import { SchemaTypeDefinition } from "sanity";
import { isUniqueOtherThanLanguage, slugValidator } from "../lib/validation";
import { ThemeIcon } from "../components/icons";
import { linkWithOptions } from "./linkWithOptions";
import { treatmentPreviewWithFlag } from "../desk/treatmentPreviewWithFlag";

export const treatmentPage: SchemaTypeDefinition = {
  name: "treatmentPage",
  title: "Theme Page",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      validation: (Rule) => [Rule.required(), slugValidator(Rule)],
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
    },
    {
      name: "primaryImage",
      type: "imageNotLocalized",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
            annotations: [linkWithOptions],
          },
        },
        { type: "youtubeEmbed" },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subTopics",
      type: "array",
      of: [{ type: "subTopic" }],
    },
    {
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "categoryPage" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "testimonial",
      type: "object",
      fields: [
        { name: "age", type: "string" },
        { name: "name", type: "string" },
        { name: "text", type: "text" },
        { name: "title", type: "string" },
      ],
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "sortOrder",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "language",
      type: "string",
      readOnly: true,
      description: "Please select a language in the Translations menu",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "seo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: treatmentPreviewWithFlag,
  icon: ThemeIcon,
  initialValue: {
    sortOrder: 10,
  },
};
