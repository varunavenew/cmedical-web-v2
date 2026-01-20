import { defineField, defineType } from "sanity";
import { slugValidator } from "../lib/validation";
import { ForwardIcon } from "../components/icons";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  description: "Redirect for next.config.js",
  fields: [
    {
      name: "source",
      type: "slug",
      validation: (rule) => [rule.required(), slugValidator(rule)],
    },
    defineField({
      name: "type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Redirect to another page on cmedical.no", value: "slug" },
          { title: "Redirect to an external page", value: "url" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    {
      name: "destinationSlug",
      type: "slug",
      hidden: ({ parent }) => parent?.type !== "slug",
      validation: (rule) => [
        // Required if type === "slug"
        rule.custom((field, context) =>
          context?.document?.type === "slug" && field === undefined
            ? "Required"
            : true
        ),
        slugValidator(rule),
      ],
      options: {
        isUnique: () => true,
      },
    },
    defineField({
      name: "destinationUrl",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "url",
      validation: (rule) => [
        // Required if type === "url"
        rule.custom((field, context) =>
          context?.document?.type === "url" && field === undefined
            ? "Required"
            : true
        ),
        rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
      ],
    }),
    defineField({
      name: "permanent",
      type: "boolean",
    }),
  ],
  initialValue: {
    type: "slug",
    permanent: true,
  },
  preview: {
    select: {
      source: "source",
      type: "type",
      destinationSlug: "destinationSlug",
      destinationUrl: "destinationUrl",
    },
    prepare({ source, type, destinationSlug, destinationUrl }) {
      let typeLabel = "Unknown";
      if (type === "slug") {
        typeLabel = "Slug";
      } else if (type === "url") {
        typeLabel = "URL";
      }

      let destinationLabel = "Missing";
      if (type === "slug" && destinationSlug) {
        destinationLabel = destinationSlug.current;
      } else if (type === "url" && destinationUrl) {
        destinationLabel = destinationUrl;
      }

      return {
        title: source?.current || "Missing",
        subtitle: `${typeLabel}: ${destinationLabel}`,
      };
    },
  },
  icon: ForwardIcon,
});
