import { SchemaTypeDefinition } from "sanity";
import { previewWithFlag } from "../desk/previewWithFlag";
import { subTopicsWithIntro } from "./subTopicsWithIntro";
import { GenericIcon } from "../components/icons";

export const finance: SchemaTypeDefinition = {
  name: "finance",
  title: "Finance",
  type: "document",
  fields: subTopicsWithIntro,
  preview: previewWithFlag,
  icon: GenericIcon,
};
