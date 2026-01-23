import { defineType, defineField } from "sanity";

export const serviceCard = defineType({
  name: "serviceCard",
  title: "Service Card",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "Page or URL this card links to",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
