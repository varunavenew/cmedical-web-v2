import { SchemaTypeDefinition } from "sanity";
import { previewWithFlag } from "../desk/previewWithFlag";
import { subTopicsWithIntro } from "./subTopicsWithIntro";
import { GenericIcon } from "../components/icons";

export const faq: SchemaTypeDefinition = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: subTopicsWithIntro,
  preview: previewWithFlag,
  icon: GenericIcon,
};
