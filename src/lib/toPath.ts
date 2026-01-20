import { LANGUAGE_CODES } from "@/sanity/lib/languages";

export const toPath = (
  doc: PathQuery
): { language: string; path: string[]; updatedAt?: string }[] | undefined => {
  try {
    switch (doc._type) {
      case "homePage":
        return LANGUAGE_CODES.map((language) => ({
          language,
          path: [],
        }));

      case "articlePage":
        return [
          {
            language: doc.language,
            path: [doc.slug.current],
          },
        ];

      case "categoryPage":
      case "clinicListPage":
      case "specialistListPage":
      case "teamPage":
        return doc.slug.map((s) => ({
          language: s._key,
          path: [s.value.current],
        }));

      case "treatmentPage":
        // HACK: for some reason, the validation of the language field does not work as expected. exclude page when language is missing
        return doc.language && doc.parents.length > 0
          ? doc.parents
              .filter((p) => p != null)
              .map((p) => ({
                language: doc.language,
                path: [p, doc.slug],
              }))
          : undefined;

      case "specialistPage":
      case "clinicPage":
        const langs = doc.languages.filter((language) =>
          doc.parent.some((p) => p._key === language)
        );
        return langs.map((language) => ({
          language,
          path: [
            doc.parent.find((p) => p._key === language)!.value.current,
            doc.slug,
          ],
        }));

      default:
        return undefined;
    }
  } catch {
    return undefined;
  }
};
