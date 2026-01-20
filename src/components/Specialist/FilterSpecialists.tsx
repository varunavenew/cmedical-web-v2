"use client";
import { FC } from "react";
import type { SanityDocument } from "@sanity/client";

import { SpecialistList } from "./SpecialistList";
import { FilterList } from "../FilterList";

interface Props {
  filterCategories: Pick<CategoryPage, "title" | "slug">[];
  parentSlug: string;
  specialistList: SanityDocument<
    Pick<
      SpecialistPage,
      "name" | "slug" | "categories" | "valueProposition" | "primaryImage"
    >
  >[];
  language: string;
  onMouseEnter: (specialist: Pick<SpecialistPage, "primaryImage">) => void;
  onMouseLeave: () => void;
  categoryOrder: {
    title: string;
  }[];
}

export const FilterSpecialists: FC<Props> = ({
  filterCategories,
  parentSlug,
  specialistList,
  language,
  onMouseEnter,
  onMouseLeave,
  categoryOrder,
}) => (
  <FilterList categories={filterCategories} categoryOrder={categoryOrder}>
    {({ category }) => (
      <SpecialistList
        links={specialistList.filter(
          (specialist) =>
            specialist.categories?.some(
              (el) => !category || el.title === category
            )
        )}
        baseUrl={`/${language}/${parentSlug}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )}
  </FilterList>
);
