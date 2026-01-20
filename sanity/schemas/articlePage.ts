import { SchemaTypeDefinition } from "sanity";
import { isUniqueOtherThanLanguage, slugValidator } from "../lib/validation";
import { ArticleIcon } from "../components/icons";
import { linkWithOptions } from "./linkWithOptions";

export const articlePage: SchemaTypeDefinition = {
  name: "articlePage",
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
      validation: (Rule) => [Rule.required(), (Rule) => slugValidator(Rule)],
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
          ],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
            annotations: [linkWithOptions],
          },
        },
        { type: "imageNotLocalized" },
        { type: "youtubeEmbed" },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subTopics",
      type: "array",
      of: [{ type: "richSubTopic" }],
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
  preview: {
    select: {
      title: "title",
      media: "primaryImage.image",
    },
  },
  icon: ArticleIcon,
};
