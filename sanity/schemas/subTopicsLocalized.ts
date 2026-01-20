import { SchemaTypeDefinition } from "sanity";
import { requireOneInternationalizedValue } from "../lib/validation";
import { InternationalArrayStringSlugPreview } from "../components/InternationalArrayStringSlugPreview";

export const subTopicsLocalized: SchemaTypeDefinition = {
  title: "Sub Topics",
  name: "subTopicsLocalized",
  type: "array",
  of: [
    {
      type: "object",
      name: "subTopic",

      fields: [
        {
          name: "title",
          type: "internationalizedArrayString",
          validation: requireOneInternationalizedValue,
        },
        {
          name: "slug",
          type: "string",
          components: { field: InternationalArrayStringSlugPreview },
        },
        {
          name: "description",
          type: "internationalizedArrayModifiedFormattedText",
          validation: requireOneInternationalizedValue,
        },
      ],
      preview: {
        select: { title: "title" },
        prepare: ({ title }) => {
          const titleAllLang = title
            ?.map((item: { value: string }) => item.value)
            .join(" / ");
          return {
            title: titleAllLang,
          };
        },
      },
    },
  ],
};
