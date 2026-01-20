import { SchemaTypeDefinition } from "sanity";

export const imageNotLocalized: SchemaTypeDefinition = {
  name: "imageNotLocalized",
  title: "Image",
  type: "object",
  fields: [
    {
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "alt",
      type: "string",
    },
  ],
  options: {
    collapsible: true,
  },
};
