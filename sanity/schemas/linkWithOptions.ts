import { FieldDefinition } from "sanity";

export const linkWithOptions: FieldDefinition = {
  name: "link",
  type: "object",
  fields: [
    {
      name: "href",
      type: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "tel", "mailto"],
          allowRelative: true,
        }),
    },
    {
      title: "Do not open in new tab",
      name: "notBlank",
      type: "boolean",
    },
  ],
};
