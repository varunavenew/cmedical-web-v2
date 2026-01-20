import { DefaultDocumentNodeResolver } from "sanity/structure";
import Iframe from "sanity-plugin-iframe-pane";
import { previews } from "./views";
import { TreatmentsPane } from "../components/TreatmentsPane";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  switch (schemaType) {
    case "treatmentPage":
    case "articlePage":
      return S.document().views([
        S.view
          .form()
          .icon(<>✏️</>)
          .title("About"),
        S.view
          .component(Iframe)
          .options({
            url: `${document.location.origin}/api/preview?id=${documentId}`,
          })
          .title("View"),
      ]);
    case "homePage":
    case "specialistPage":
    case "teamPage":
    case "clinicPage":
      return S.document().views([
        S.view
          .form()
          .icon(<>✏️</>)
          .title("About"),
        ...previews(S, documentId),
      ]);
    case "categoryPage":
      return S.document().views([
        S.view
          .form()
          .icon(<>✏️</>)
          .title("About"),
        S.view
          .component(TreatmentsPane)
          .title("Themes")
          .icon(<>🔠</>),
        ...previews(S, documentId),
      ]);
    default:
      return S.document().views([
        S.view
          .form()
          .icon(<>✏️</>)
          .title("About"),
      ]);
  }
};
