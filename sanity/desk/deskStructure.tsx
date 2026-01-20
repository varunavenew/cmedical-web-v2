import { DocumentTextIcon } from "@sanity/icons";
import Iframe from "sanity-plugin-iframe-pane";
import { StructureResolver } from "sanity/structure";
import {
  ArticleIcon,
  CategoryIcon,
  ClinicIcon,
  HomeIcon,
  SettingsIcon,
  SpecialistIcon,
  TeamIcon,
} from "../components/icons";
import { previews } from "./views";

const exceptionPages = [
  "homePage",
  "clinicListPage",
  "specialistListPage",
  "treatmentPage",
  "globalSettings",
  "translation.metadata",
  "clinicPage",
  "specialistPage",
  "teamPage",
  "categoryPage",
  "media.tag",
  "articlePage",
  "privacyPolicyPage",
];

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .views([
              S.view
                .form()
                .icon(<>✏️</>)
                .title("About"),
              ...previews(S, "homePage"),
            ])
        ),
      S.listItem()
        .title("Categories")
        .icon(CategoryIcon)
        .child(S.documentTypeList("categoryPage")),

      S.listItem()
        .title("Clinics")
        .icon(ClinicIcon)
        .child(
          S.list()
            .title("Clinics")
            .items([
              S.listItem()
                .title("About our clinics")
                .icon(ClinicIcon)
                .child(
                  S.document()
                    .schemaType("clinicListPage")
                    .documentId("clinicListPage")
                    .views([
                      S.view
                        .form()
                        .icon(<>✏️</>)
                        .title("About"),
                      ...previews(S, "clinicListPage"),
                    ])
                ),
              S.listItem()
                .title("Our clinics")
                .child(S.documentTypeList("clinicPage")),
            ])
        ),
      S.listItem()
        .title("Specialists")
        .icon(SpecialistIcon)
        .child(
          S.list()
            .title("Specialists")
            .items([
              S.listItem()
                .title("About our specialists")
                .icon(SpecialistIcon)
                .child(
                  S.document()
                    .schemaType("specialistListPage")
                    .documentId("specialistListPage")
                    .views([
                      S.view
                        .form()
                        .icon(<>✏️</>)
                        .title("About"),
                      ...previews(S, "specialistListPage"),
                    ])
                ),
              S.listItem()
                .title("Our specialists")
                .child(S.documentTypeList("specialistPage")),
            ])
        ),
      S.listItem()
        .title("Teams")
        .icon(TeamIcon)
        .child(S.documentTypeList("teamPage")),
      S.listItem()
        .title("Articles")
        .icon(ArticleIcon)
        .child(S.documentTypeList("articlePage")),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !exceptionPages.includes(listItem.getId() as string)
      ),

      S.listItem()
        .title("Privacy policy")
        .id("privacyPolicies")
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType("privacyPolicyPage")
            .documentId("privacyPolicy")
            .views([
              S.view
                .form()
                .icon(<>✏️</>)
                .title("About"),
              S.view
                .component(Iframe)
                .options({
                  url: `${document.location.origin}/api/preview?id=privacyPolicy`,
                })
                .title("View"),
            ])
        ),
      S.listItem()
        .title("Menu and metadata")
        .icon(SettingsIcon)
        .child(
          S.document().schemaType("globalSettings").documentId("globalSettings")
        ),
    ]);
