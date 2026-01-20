import { FieldDefinition, SchemaTypeDefinition } from "sanity";
import { linkWithOptions } from "./linkWithOptions";

export const subTopicsWithIntro: FieldDefinition[] = [
  {
    name: "title",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "ingress",
    type: "array",
    of: [
      {
        type: "block",
        styles: [],
        lists: [],
        marks: {
          decorators: [{ title: "Italic", value: "em" }],
          annotations: [linkWithOptions],
        },
      },
    ],
    validation: (Rule) => Rule.required(),
  },
  {
    name: "subTopics",
    type: "array",
    of: [
      {
        type: "subTopic",
      },
    ],
    validation: (Rule) => Rule.required(),
  },
  {
    name: "language",
    type: "string",
    readOnly: true,
    hidden: true,
  },
];
