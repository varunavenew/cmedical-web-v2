import { SchemaTypeDefinition } from "sanity";

export const valueProposition: SchemaTypeDefinition = {
  name: "valueProposition",
  type: "object",
  fields: [
    {
      name: "valueProposition1",
      type: "string",
      title: "First benefit",
    },
    {
      name: "valueProposition2",
      type: "string",
      title: "Second benefit",
    },
    {
      name: "socialProof",
      type: "string",
    },
  ],
  options: {
    collapsible: true,
  },
};
