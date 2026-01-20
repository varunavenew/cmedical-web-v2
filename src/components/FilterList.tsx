import { sortBy } from "lodash";
import { ReactNode, useCallback, useState } from "react";
import { FilterButton } from "./FilterButton";

interface Props {
  categories: Pick<CategoryPage, "title" | "slug">[];
  children: ({ category }: { category?: string }) => ReactNode;
  categoryOrder: {
    title: string;
  }[];
}

export const FilterList = ({ categories, children, categoryOrder }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const filterItems = useCallback((category: string) => {
    setSelectedCategory((old) => (old === category ? undefined : category));
  }, []);

  const order = categoryOrder.map((item) => item.title);

  categories.sort((a, b) => {
    const indexA = order.indexOf(a.title);
    const indexB = order.indexOf(b.title);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <div className="flex flex-col">
      <div className="flex px-25 md:px-50 gap-9 pb-50 mt-40 md:pb-30 md:mt-20 flex-wrap ">
        {categories.map((cat) => {
          return (
            <div key={cat.slug}>
              <FilterButton
                filterFunction={filterItems}
                title={cat.title}
                selected={selectedCategory === cat.title}
              />
            </div>
          );
        })}
      </div>
      {children({ category: selectedCategory })}
    </div>
  );
};
