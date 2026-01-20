import { DocumentActionComponent, DocumentActionsContext } from "sanity";

interface Props {
  prev: DocumentActionComponent[];
  context: DocumentActionsContext;
}

export const OnlyPublish = ({ prev, context }: Props) => {
  return singletons.has(context.schemaType)
    ? prev.filter((p) => !filterActions.includes(p.name))
    : prev;
};

export const filterActions = [
  "DeleteAction",
  "DuplicateAction",
  "UnpublishAction",
];

const singletons = new Set([
  "homePage",
  "clinicListPage",
  "specialistListPage",
  "globalSettings",
  "footer",
  "finance",
  "faq",
]);

export const cannotBeCreated = new Set([
  ...singletons.values(),
  "treatmentPage",
]);
