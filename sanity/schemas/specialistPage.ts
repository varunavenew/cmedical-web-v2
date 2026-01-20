import { Reference, SchemaTypeDefinition } from "sanity";
import {
  noEmptyLanguagesValidator,
  requireOneInternationalizedValue,
  requireSameLanguages,
  slugValidator,
} from "../lib/validation";
import { SpecialistIcon } from "../components/icons";
import { urlForImage } from "../lib/image";
import { PatientskyCalendarSearch } from "../components/PatientskyCalendarSearch";
import { groq } from "next-sanity";

export const specialistPage: SchemaTypeDefinition = {
  name: "specialistPage",
  title: "Specialist Page",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      validation: (Rule) => [Rule.required(), slugValidator(Rule)],
      options: { source: "name" },
    },
    {
      name: "primaryImage",
      type: "imageObject",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "descriptionHeading",
      type: "internationalizedArrayString",
      validation: requireSameLanguages("description"),
    },
    {
      name: "description",
      type: "internationalizedArrayModifiedFormattedText",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
      description:
        "This field controls the visibility of the specialist on the site when viewed in different languages. Leaving it empty for a specific language will result in the specialist being hidden when the site is displayed in that language. English is required.",
    },
    {
      title: "Expertise and social proof",
      name: "valueProposition",
      type: "object",
      fields: [
        {
          name: "socialProof",
          type: "internationalizedArrayString",
          validation: requireSameLanguages("description"),
        },
        {
          title: "Expertise1",
          name: "valueProposition1",
          type: "internationalizedArrayString",
          validation: requireSameLanguages("description"),
        },
        {
          title: "Expertise2",
          name: "valueProposition2",
          type: "internationalizedArrayString",
          validation: requireSameLanguages("description"),
        },
      ],
      options: {
        collapsible: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "categoryPage" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Themes",
      name: "treatments",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "treatmentPage" }],
          options: {
            filter: async ({ document }) => {
              const categories = (document.categories as Reference[])?.map(
                (cat) => cat._ref
              );

              // only find treatments connected to categories this specialist is connected to
              return {
                filter: groq`count((categories[]->_id)[@ in $categories]) > 0 && !(_id in path("drafts.**"))`,
                params: { categories },
              };
            },
          },
        },
      ],
    },
    {
      name: "seo",
      title: "SEO & Sharing",
      type: "internationalizedSeo",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "booking",
      type: "object",
      fields: [
        // {
        //   name: "caregiverId",
        //   type: "string",
        //   title: "Webdoc caregiver ID 🇸🇪",
        //   description: "The specialist's ID in Webdoc",
        // },
        {
          name: "calendarId",
          type: "string",
          description: "The specialist's Pasientsky Calendar ID",
          validation: (Rule) =>
            Rule.regex(/^[-0-9a-f]+$/i).error(
              "Please verify that the value is a valid Calendar ID"
            ),
          components: {
            input: PatientskyCalendarSearch,
          },
        },
        {
          name: "metodikaSpecialistId",
          type: "number",
          description: "The specialist's Metodika ID",
        },
      ],
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      image: "primaryImage.image",
      title: "name",
    },
    prepare({ image, title }) {
      return {
        title,
        imageUrl: urlForImage(image).width(35).height(35).url(),
      };
    },
  },
  icon: SpecialistIcon,
};
