import { useLanguageFilterStudioContext } from "@sanity/language-filter";
import { SanityDocument, groq } from "next-sanity";
import DocumentsPane from "sanity-plugin-documents-pane";

const query = groq`*[_type == "treatmentPage" && $id in categories[]._ref && (length($languages) == 0 || language in $languages)] | order(title asc)`;

interface DocumentVersionsCollection {
  displayed: SanityDocument;
  published: SanityDocument;
  draft: SanityDocument;
  historical: SanityDocument;
}

export const TreatmentsPane = ({
  document,
}: {
  document: DocumentVersionsCollection;
}) => {
  const { selectedLanguageIds } = useLanguageFilterStudioContext();
  return (
    <DocumentsPane
      document={document}
      options={{
        query,
        // @ts-ignore The return type for params specify only string, but we want an array of strings for languages
        params: ({ document }: { document: DocumentVersionsCollection }) => {
          // references will never point to a draft ID, so extract the regular ID
          const id = document?.displayed?._id?.replace("drafts.", "");

          // we don't have to worry about undefined parameters,
          // as the plugin will handle them and show an appropriate message
          return { id, languages: selectedLanguageIds };
        },
        initialValueTemplates: ({
          document,
        }: {
          document: DocumentVersionsCollection;
        }) => {
          const templates = [];

          // references must point to a non-draft ID, so if using the ID in the template,
          // be sure it doesn't start with `drafts.`
          const id = document?.displayed?._id.replace("drafts.", "");

          if (id) {
            templates.push({
              // the name of the schema type that should be created (required)
              schemaType: "treatmentPage",
              // the title that should appear on the button - we can customize it (required)
              title: `Create new`,
              // the name of the template that should be used (optional)
              template: "treatment-template",
              // values for parameters that can be passed to the template referenced above (optional)
              parameters: {
                categoryId: id,
              },
            });

            // we could push more templates if needed.
          }

          // must always return a list, even if empty
          return templates;
        },
        debug: true,
      }}
    />
  );
};
