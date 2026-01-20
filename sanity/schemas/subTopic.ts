import { SchemaTypeDefinition } from "sanity";
import { linkWithOptions } from "./linkWithOptions";
import { StringInputWithSlugPreview } from "../components/StringInputWithSlugPreview";

export const subTopic: SchemaTypeDefinition = {
  name: "subTopic",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      components: {
        input: StringInputWithSlugPreview,
      },
    },
    {
      name: "description",
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
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
