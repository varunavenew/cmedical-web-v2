import { isKey } from "@/src/lib/isKey";
import {
  PortableText,
  PortableTextComponents,
  defaultComponents,
} from "@portabletext/react";
import { ComponentProps, useMemo } from "react";
import { PortableTextBlock } from "sanity";
import { YouTubeEmbed } from "../YouTubeEmbed";
import { LinkMarkComponent } from "./LinkMarkComponent";

interface Props {
  value: PortableTextBlock[];
  /**
   * Set a root heading level to adjust heading levels.
   * If the root heading level is set to 2, h1 turns into h2, h2 turns into h3, etc.
   * If you pass in a custom "components" object this root heading level is ignored.
   */
  rootHeadingLevel?: 1 | 2 | 3;
  components?: ComponentProps<typeof PortableText>["components"];
}

export function PortableTextComponent({
  value,
  rootHeadingLevel = 1,
  components: customComponents,
}: Props) {
  const components = useMemo(() => {
    if (customComponents) {
      return customComponents;
    }

    return createPortableTextComponents({ rootHeadingLevel });
  }, [rootHeadingLevel, customComponents]);

  return (
    <PortableText value={value} components={components ?? defaultComponents} />
  );
}

function createPortableTextComponents({
  rootHeadingLevel = 1,
}: {
  rootHeadingLevel?: 1 | 2 | 3;
}): PortableTextComponents {
  // The default block is an object, but its type claims it could be a React element so we need to check its type
  const defaultBlock =
    typeof defaultComponents.block === "object" ? defaultComponents.block : {};

  return {
    block: {
      ...defaultBlock,
      h1: ({ children }) => {
        const HeadingElement = getHeadingTagName(rootHeadingLevel + 0);

        return <HeadingElement>{children}</HeadingElement>;
      },
      h2: ({ children }) => {
        const Element = getHeadingTagName(rootHeadingLevel + 1);

        return <Element>{children}</Element>;
      },
      h3: ({ children }) => {
        const Element = getHeadingTagName(rootHeadingLevel + 2);

        return <Element>{children}</Element>;
      },
      h4: ({ children }) => {
        const Element = getHeadingTagName(rootHeadingLevel + 3);

        return <Element>{children}</Element>;
      },
      h5: ({ children }) => {
        const Element = getHeadingTagName(rootHeadingLevel + 4);

        return <Element>{children}</Element>;
      },
      h6: ({ children }) => {
        const Element = getHeadingTagName(rootHeadingLevel + 5);

        return <Element>{children}</Element>;
      },
    },
    marks: {
      link: LinkMarkComponent,
    },
    types: {
      youtubeEmbed: YouTubeEmbed,
    },
  };
}

function getHeadingTagName(level: number): keyof JSX.IntrinsicElements {
  // Helper map to make TypeScript understand what we want to do
  const headingElements: Record<number, keyof JSX.IntrinsicElements> = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

  return isKey(headingElements, level) ? headingElements[level] : "p";
}
