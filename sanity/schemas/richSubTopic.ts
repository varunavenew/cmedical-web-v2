import { SchemaTypeDefinition } from "sanity";
import { linkWithOptions } from "./linkWithOptions";

export const richSubTopic: SchemaTypeDefinition = {
  name: "richSubTopic",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
            annotations: [linkWithOptions],
          },
        },
        { type: "imageNotLocalized" },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
