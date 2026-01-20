import { Template, type SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { categoryPage } from "./categoryPage";
import { finance } from "./finance";
import { subTopic } from "./subTopic";
import { treatmentPage } from "./treatmentPage";
import { specialistPage } from "./specialistPage";
import { teamPage } from "./teamPage";
import { clinicPage } from "./clinicPage";
import { clinicListPage } from "./clinicListPage";
import { specialistListPage } from "./specialistListPage";
import { faq } from "./faq";
import { valueProposition } from "./valueProposition";
import { globalSettings } from "./globalSettings";
import { redirect } from "./redirect";
import { footer } from "./footer";
import { internationalizedSeo, seo } from "./seo";
import { cannotBeCreated } from "../desk/actions";
import { imageObject } from "./imageObject";
import { locationSearch } from "./locationSearch";
import { imageNotLocalized } from "./imageNotLocalized";
import { subTopicsLocalized } from "./subTopicsLocalized";
import { contactInfo } from "./contactInfo";
import { socialMedia } from "./socialMedia";
import { articlePage } from "./articlePage";
import { richSubTopic } from "./richSubTopic";
import { privacyPolicy } from "./privacyPolicyPage";
import { youtubeEmbed } from "./youtubeEmbed";

export { schema as default };

export const schema: {
  types: SchemaTypeDefinition[];
  templates: (prev: Template<any, any>[]) => Template<any, any>[];
} = {
  types: [
    homePage,
    categoryPage,
    finance,
    faq,
    subTopic,
    treatmentPage,
    specialistPage,
    teamPage,
    clinicPage,
    clinicListPage,
    specialistListPage,
    valueProposition,
    globalSettings,
    redirect,
    footer,
    seo,
    internationalizedSeo,
    imageObject,
    locationSearch,
    imageNotLocalized,
    subTopicsLocalized,
    contactInfo,
    socialMedia,
    richSubTopic,
    articlePage,
    privacyPolicy,
    youtubeEmbed,
  ],
  templates: (prev) => {
    return [
      ...prev.filter(({ schemaType }) => !cannotBeCreated.has(schemaType)),
      {
        id: "treatment-template",
        title: "Treatment template",
        schemaType: "treatmentPage",
        parameters: [{ name: "categoryId", type: "string" }],
        value: (params: { categoryId: string }) => ({
          categories: [{ _type: "reference", _ref: params.categoryId }],
        }),
      },
    ];
  },
};
