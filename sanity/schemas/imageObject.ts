import { SchemaTypeDefinition } from "sanity";

export const imageObject: SchemaTypeDefinition = {
  name: "imageObject",
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
      type: "internationalizedArrayString",
    },
  ],
  options: {
    collapsible: true,
  },
};
