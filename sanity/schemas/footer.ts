import { SchemaTypeDefinition } from "sanity";
import { previewWithFlag } from "../desk/previewWithFlag";
import { GenericIcon } from "../components/icons";

export const footer: SchemaTypeDefinition = {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      type: "object",
      fields: [
        {
          name: "label",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "phoneNo",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "email1",
      title: "Other enquiries",
      type: "object",
      fields: [
        {
          name: "label",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: previewWithFlag,
  icon: GenericIcon,
};
