import { SchemaTypeDefinition } from "sanity";
import { requireSameLanguages } from "../lib/validation";

export const contactInfo: SchemaTypeDefinition = {
  name: "contactInfo",
  type: "object",
  fields: [
    {
      name: "streetAddress",
      placeholder: "Stockholmsgatan 4",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "openingHours",
      type: "internationalizedArrayString",
      validation: requireSameLanguages("description"),
    },
    {
      name: "phoneOpeningHours",
      type: "internationalizedArrayString",
    },
    {
      name: "phoneNumber",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).error(
          "Please enter a valid email address"
        ),
    },
  ],
};
