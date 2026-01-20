import { PortableTextBlock } from "sanity";

export const blocksToString = (blocks: PortableTextBlock[], number = 1) => {
  return blocks
    .map((block) => {
      if (
        block._type !== "block" ||
        !block.children ||
        !(block.children instanceof Array)
      ) {
        return "";
      }

      return block.children.map((child) => child.text).join("");
    })
    .slice(0, number)
    .join("\n\n");
};
