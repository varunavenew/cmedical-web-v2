import { getAllTokens, parseStringWithTokens } from "./tokens";

describe("getAllTokens", () => {
  it.each([
    ["{{a}}", ["a"]],
    ["{{a}} b", ["a"]],
    ["a {{b}}", ["b"]],
    ["a {{b}} c", ["b"]],
    ["a {{b}} {{b}} c", ["b"]],
    ["a {{b}} {{c}}", ["b", "c"]],
    ["a {{b}} {{b}} {{c}}", ["b", "c"]],
  ])("should get correct result", (string, expected) => {
    const result = getAllTokens(string);
    expect(result).toEqual(expected);
  });
});

describe("parseStringWithTokens", () => {
  it.each([
    ["{{a}}", [{ type: "variable", value: "a" }]],
    [
      "{{a}} b",
      [
        { type: "variable", value: "a" },
        { type: "string", value: " b" },
      ],
    ],
    [
      "a {{b}}",
      [
        { type: "string", value: "a " },
        { type: "variable", value: "b" },
      ],
    ],
    [
      "a {{b}} c",
      [
        { type: "string", value: "a " },
        { type: "variable", value: "b" },
        { type: "string", value: " c" },
      ],
    ],
    [
      "a {{b}} {{b}} c",
      [
        { type: "string", value: "a " },
        { type: "variable", value: "b" },
        { type: "string", value: " " },
        { type: "variable", value: "b" },
        { type: "string", value: " c" },
      ],
    ],
    [
      "a {{b}} {{c}}",
      [
        { type: "string", value: "a " },
        { type: "variable", value: "b" },
        { type: "string", value: " " },
        { type: "variable", value: "c" },
      ],
    ],
    [
      "a {{b}} {{b}} {{c}}",
      [
        { type: "string", value: "a " },
        { type: "variable", value: "b" },
        { type: "string", value: " " },
        { type: "variable", value: "b" },
        { type: "string", value: " " },
        { type: "variable", value: "c" },
      ],
    ],
  ])("should get correct result", (string, expected) => {
    const result = parseStringWithTokens(string);
    expect(result).toEqual(expected);
  });
});
