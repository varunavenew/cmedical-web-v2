import { uniq } from "lodash";

export function getAllTokens(string: string) {
  const allMatches = string.match(/\{\{.+?\}\}/g);
  const uniqueMatches = uniq(allMatches);

  return uniqueMatches.map((match) => {
    let token = match;
    token = token.replace(/^\{\{/, "");
    token = token.replace(/\}\}/g, "");

    return token;
  });
}

export function parseStringWithTokens(string: string) {
  let parts = string.split(/(\{\{.+?\}\})/g);
  parts = parts.filter((part) => part.length > 0);

  const tokens = getAllTokens(string);

  return parts.map((part) => {
    for (const token of tokens) {
      if (part === `{{${token}}}`) {
        return {
          type: "variable",
          value: token,
        };
      }
    }

    return {
      type: "string",
      value: part,
    };
  });
}
