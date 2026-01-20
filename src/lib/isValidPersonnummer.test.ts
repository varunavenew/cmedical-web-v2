import { isValidPersonnummer } from "./isValidPersonnummer";

it.each([
  ["20080617-2391", true],
  ["19910828-2394", true],
  ["18970724-9810", true],
  ["18981013-9817", true],
  ["19991008-2396", true],
  ["19991308-2396", false],
  ["19991008-2395", false],
  ["19991008-239", false],
])("should get correct result", (personnummer, expected) => {
  const result = isValidPersonnummer(personnummer);
  expect(result).toBe(expected);
});
