import { SchemaTypeDefinition, defineField } from "sanity";
import {
  noEmptyLanguagesValidator,
  requireOneInternationalizedValue,
  requireSameLanguages,
  slugValidator,
} from "../lib/validation";
import { ClinicIcon } from "../components/icons";

export const clinicPage: SchemaTypeDefinition = {
  name: "clinicPage",
  title: "Clinic Page",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      validation: (Rule) => [Rule.required(), slugValidator(Rule)],
      options: { source: "title" },
    },
    {
      name: "primaryImage",
      type: "imageObject",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "internationalizedArrayModifiedFormattedText",
      validation: (Rule) => [
        requireOneInternationalizedValue(Rule),
        (Rule) => Rule.custom(noEmptyLanguagesValidator<unknown>),
      ],
      description:
        "This field controls the visibility of the clinic on the site when viewed in different languages. Leaving it empty for a specific language will result in the clinic being hidden when the site is displayed in that language. English is required.",
    },
    {
      name: "valueProposition",
      type: "object",
      fields: [
        {
          name: "valueProposition1",
          type: "internationalizedArrayString",
          validation: (Rule) => requireSameLanguages("description"),
        },
        {
          title: "Hours",
          name: "valueProposition2",
          type: "string",
          placeholder: "08-16:00",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "socialProof",
          type: "internationalizedArrayString",
          validation: requireSameLanguages("description"),
        },
      ],
      options: {
        collapsible: true,
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "subTopics", type: "subTopicsLocalized" },
    {
      name: "contactDescription",
      type: "internationalizedArrayText",
      validation: requireSameLanguages("description"),
    },
    {
      name: "locationSearch",
      type: "locationSearch",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "contactInfo",
      type: "contactInfo",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "treatments",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "treatmentPage" }],
        },
      ],
    },
    {
      name: "specialists",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "specialistPage" }],
          options: {
            filter: async ({ getClient }) => {
              const client = getClient({ apiVersion: "2023-12-13" });
              const referencedPeopleIds = await client.fetch(
                '*[_type == "clinicPage"][].specialists[]._ref'
              );
              return {
                filter: "!(_id in $ids)",
                params: { ids: referencedPeopleIds },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
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
        defineField({
          name: "method",
          type: "string",
          options: {
            layout: "radio",
            default: "info",
            list: [
              { title: "Show screen with contact info", value: "info" },
              { title: "Show Pasientsky form", value: "pasientsky" },
              { title: "Show Metodika form", value: "metodika" },
              { title: "Closed for booking", value: "closed" },
            ],
          },
        }),

        // Pasientsky options
        {
          name: "serviceProviderId",
          type: "string",
          description: "Pasientsky Service Provider ID",
          hidden: ({ parent }) => parent?.method !== "pasientsky",
          validation: (Rule) =>
            Rule.regex(/^[-0-9a-f]+$/i).error(
              "Please verify that the value is a valid Service Provider ID"
            ),
        },

        // Metodika options
        {
          name: "metodikaCityId",
          type: "number",
          title: "Metodika city ID",
          hidden: ({ parent }) => parent?.method !== "metodika",
        },

        // Info options
        {
          name: "externalBookingUrl",
          type: "url",
          title: "External booking link",
          description:
            "Link to clinic on external site for Swedish booking flow",
          hidden: ({ parent }) => parent?.method !== "info",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["https"],
              allowRelative: false,
              allowCredentials: false,
            }),
        },
        {
          name: "redirectToExternalBookingUrl",
          type: "boolean",
          title: "Go directly to external booking URL",
          description:
            "Open the external booking site directly when visitor selects this clinic.",
          hidden: ({ parent }) => parent?.method !== "info",
          readOnly: ({ parent }) => !Boolean(parent?.externalBookingUrl),
        },

        // Closed options
        {
          name: "showDescriptionWhenClosed",
          type: "boolean",
          description:
            "Show a description in the booking flow and on the clinic page when this clinic is closed for booking.",
          hidden: ({ parent }) => parent?.method !== "closed",
        },
        {
          name: "descriptionWhenClosedDesktop",
          description: "Description on desktop",
          type: "internationalizedArrayModifiedFormattedText",
          hidden: ({ parent }) => {
            if (
              parent?.method === "closed" &&
              parent?.showDescriptionWhenClosed === true
            ) {
              return false;
            }

            return true;
          },
        },
        {
          name: "descriptionWhenClosedMobile",
          description: "Shorter description to show on mobile",
          type: "internationalizedArrayModifiedFormattedText",
          hidden: ({ parent }) => {
            if (
              parent?.method === "closed" &&
              parent?.showDescriptionWhenClosed === true
            ) {
              return false;
            }

            return true;
          },
        },
      ],
      options: { collapsible: true },
    },
  ],
  icon: ClinicIcon,
};
