import { SchemaTypeDefinition } from "sanity";

export const seo: SchemaTypeDefinition = {
  name: "seo",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      description: "Meta title",
    },
    {
      name: "description",
      type: "text",
      description: "Meta description",
    },
    {
      name: "image",
      type: "image",
    },
  ],
};

export const internationalizedSeo: SchemaTypeDefinition = {
  name: "internationalizedSeo",
  type: "object",
  fields: [
    {
      name: "title",
      type: "internationalizedArrayString",
      description: "Meta title",
    },
    {
      name: "description",
      type: "internationalizedArrayText",
      description: "Meta description",
    },
    {
      name: "image",
      type: "image",
    },
  ],
};
