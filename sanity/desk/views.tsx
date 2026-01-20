import { StructureBuilder } from "sanity/structure";
import { IframeEn, IframeNo, IframeSe } from "../components/Iframe";

export const previews = (S: StructureBuilder, documentId?: string) => [
  S.view
    .component(IframeEn)
    .options({
      url: `${document.location.origin}/api/preview?id=${documentId}&language=en`,
    })
    .icon(<>🇬🇧</>)
    .id("en-preview")
    .title("View"),
  S.view
    .component(IframeNo)
    .options({
      url: `${document.location.origin}/api/preview?id=${documentId}&language=no`,
    })
    .icon(<>🇳🇴</>)
    .id("no-preview")
    .title("View"),
  S.view
    .component(IframeSe)
    .options({
      url: `${document.location.origin}/api/preview?id=${documentId}&language=se`,
    })
    .icon(<>🇸🇪</>)
    .id("se-preview")
    .title("View"),
];
