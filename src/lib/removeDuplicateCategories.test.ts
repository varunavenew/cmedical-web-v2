import { removeDuplicateCategories } from "./removeDuplicateCategories";

it("should remove duplicate categories", () => {
  const categories = [
    { title: "A", slug: "a" },
    { title: "B", slug: "b" },
    { title: "C", slug: "c" },
    { title: "A", slug: "a" },
  ];
  const result = removeDuplicateCategories(categories);
  expect(result).toHaveLength(3);
  expect(result).toEqual([
    { title: "A", slug: "a" },
    { title: "B", slug: "b" },
    { title: "C", slug: "c" },
  ]);
});
