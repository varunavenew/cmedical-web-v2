import { at, defineMigration, set } from "sanity/migrate";

// Convert the privacy policy page from a single language to a document type
// that supports all languages supported by cmedical.no.
export default defineMigration({
  title: "internationalized-privacy-policy-page",
  documentTypes: ["privacyPolicyPage"],

  migrate: {
    document(privacyPolicyPage: any) {
      const title = privacyPolicyPage.title;
      const slug = privacyPolicyPage.slug.current;
      const body = privacyPolicyPage.body;

      // If title is not a string this migration has likely already run
      if (typeof title !== "string") {
        console.log(
          `${privacyPolicyPage._id}: "title" is not a string, skipping`
        );
        return;
      }

      if (typeof slug !== "string") {
        console.log(
          `${privacyPolicyPage._id}: "slug" is not a string, skipping`
        );
        return;
      }

      if (Array.isArray(body) === false) {
        console.log(
          `${privacyPolicyPage._id}: "body" is not an array, skipping`
        );
        return;
      }

      return [
        at(
          "title",
          set([
            {
              _type: "internationalizedArrayStringValue",
              _key: "no",
              value: title,
            },
            {
              _type: "internationalizedArrayStringValue",
              _key: "se",
              value: title,
            },
            {
              _type: "internationalizedArrayStringValue",
              _key: "en",
              value: title,
            },
          ])
        ),

        at(
          "slug",
          set([
            {
              _type: "internationalizedArraySlugValue",
              _key: "no",
              value: {
                _type: "slug",
                current: slug,
              },
            },
            {
              _type: "internationalizedArraySlugValue",
              _key: "se",
              value: {
                _type: "slug",
                current: slug,
              },
            },
            {
              _type: "internationalizedArraySlugValue",
              _key: "en",
              value: {
                _type: "slug",
                current: slug,
              },
            },
          ])
        ),

        at(
          "body",
          set([
            {
              _type: "internationalizedArrayModifiedFormattedTextValue",
              _key: "no",
              value: body,
            },
            {
              _type: "internationalizedArrayModifiedFormattedTextValue",
              _key: "se",
              value: body,
            },
            {
              _type: "internationalizedArrayModifiedFormattedTextValue",
              _key: "en",
              value: body,
            },
          ])
        ),
      ];
    },
  },
});
