import { defineType, defineField } from "sanity";

export const heroVideoCard = defineType({
  name: "heroVideoCard",
  title: "Hero Video Card",
  type: "object",
  fields: [
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Small Top Text",
      description: "e.g. NORGES STØRSTE PRIVATE SENTER",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cta",
      title: "Call To Action",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "Button Link",
          type: "url",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "headline",
    },
  },
});
