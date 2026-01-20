import { SchemaTypeDefinition } from "sanity";

export const socialMedia: SchemaTypeDefinition = {
  name: "socialMedia",
  type: "object",
  fields: [
    {
      name: "facebookUrl",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    },
    {
      name: "instagramUrl",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    },
    {
      name: "linkedinUrl",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    },
  ],
};
