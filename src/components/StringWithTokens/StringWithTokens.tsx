import { parseStringWithTokens } from "@/src/lib/tokens";
import { Fragment } from "react";

type Props = {
  string: string;
  variables: Record<string, JSX.Element | undefined>;
};

// Accepts a string of the format "hello {{name}}" and replaces "name"
// with a variable from the variables object.
// Adds a new paragraph for each newline in the string.
export function StringWithTokens({ string, variables }: Props) {
  const paragraphs = string.split("\n");

  const children: JSX.Element[] = [];
  for (const [key, paragraph] of Object.entries(paragraphs)) {
    children.push(
      <ParagraphWithTokens key={key} string={paragraph} variables={variables} />
    );
  }

  return <>{children}</>;
}

// A single paragraph without any newlines.
function ParagraphWithTokens({ string, variables }: Props) {
  const parts = parseStringWithTokens(string);

  const children: JSX.Element[] = [];
  for (const [key, part] of Object.entries(parts)) {
    if (part.type === "string") {
      children.push(<Fragment key={key}>{part.value}</Fragment>);
    }

    if (part.type === "variable") {
      const variable = variables[part.value];
      if (variable != null) {
        children.push(<Fragment key={key}>{variable}</Fragment>);
      }
    }
  }

  return <p>{children}</p>;
}
