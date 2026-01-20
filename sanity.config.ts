/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, isKeySegment } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { defaultDocumentNode } from "./sanity/desk/defaultDocumentNode";
import { documentInternationalization } from "@sanity/document-internationalization";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { media } from "sanity-plugin-media";
import { deskStructure } from "./sanity/desk/deskStructure";
import { OnlyPublish } from "./sanity/desk/actions";
import { LANGUAGES } from "./sanity/lib/languages";
import { languageFilter } from "@sanity/language-filter";
import { linkWithOptions } from "./sanity/schemas/linkWithOptions";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  document: {
    actions: (prev, context) => {
      return OnlyPublish({ prev, context });
    },
  },

  plugins: [
    structureTool({
      structure: deskStructure,
      defaultDocumentNode: defaultDocumentNode,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      schemaTypes: ["finance", "faq", "treatmentPage", "footer", "articlePage"],
      supportedLanguages: LANGUAGES,
    }),
    internationalizedArray({
      languages: LANGUAGES,
      fieldTypes: [
        "string",
        "slug",
        "text",
        "url",
        "valueProposition",
        "socialMedia",
        "imageNotLocalized",
        "seo",
        {
          name: "formattedText",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "simpleFormattedText",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "Heading", value: "h2" },
                { title: "Subheading", value: "h3" },
              ],
              lists: [],
              marks: {
                decorators: [{ title: "Emphasis", value: "em" }],
                annotations: [linkWithOptions],
              },
            },
            { type: "youtubeEmbed" },
          ],
        },
        {
          name: "modifiedFormattedText",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              marks: {
                decorators: [
                  { title: "Emphasis", value: "em" },
                  { title: "Bold", value: "strong" },
                ],
                annotations: [linkWithOptions],
              },
            },
          ],
        },
        {
          name: "restrictedFormattedText",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [],
                annotations: [],
              },
            },
          ],
        },
        {
          name: "categories",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "categoryPage" }],
              options: { disableNew: true },
            },
          ],
        },
      ],
    }),
    languageFilter({
      // Use the same languages as the internationalized array plugin
      supportedLanguages: LANGUAGES,
      defaultLanguages: [],
      documentTypes: [
        "homePage",
        "categoryPage",
        "clinicPage",
        "clinicListPage",
        "specialistPage",
        "specialistListPage",
        "globalSettings",
      ],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("internationalizedArray") &&
          "kind" in member
        ) {
          // Get last two segments of the field's path
          const pathEnd = member.field.path.slice(-2);
          // If the second-last segment is a _key, and the last segment is `value`,
          // It's an internationalized array value
          // And the array _key is the language of the field
          const language =
            pathEnd[1] === "value" && isKeySegment(pathEnd[0])
              ? pathEnd[0]._key
              : null;

          return language ? selectedLanguageIds.includes(language) : false;
        }

        // Filter internationalized objects if you have them
        // `localeString` must be registered as a custom schema type
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("locale")
        ) {
          return selectedLanguageIds.includes(member.name);
        }

        return true;
      },
    }),
    media(),
  ],
});
