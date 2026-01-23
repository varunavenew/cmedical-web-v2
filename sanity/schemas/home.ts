import { defineType, defineField } from "sanity";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",

  fields: [
    defineField({
      name: "heroSections",
      title: "Hero Video Sections",
      type: "array",
      validation: (Rule) => Rule.min(2).max(2),
      of: [
        {
          type: "heroVideoCard",
        },
      ],
    }),

    defineField({
        name: "servicesSection",
        title: "Services Section",
        type: "object",
        fields: [
          defineField({
            name: "services",
            title: "Service Cards",
            type: "array",
            validation: (Rule) => Rule.min(3).max(6),
            of: [{ type: "serviceCard" }],
          }),
        ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Home" };
    },
  },
});
