"use client";
import { FC } from "react";
import type { SanityDocument } from "@sanity/client";

import { LinkList } from "../LinkList";
import { FilterList } from "../FilterList";

interface Props {
  filterCategories: Pick<CategoryPage, "title" | "slug">[];
  parentSlug: string;
  clinicList: SanityDocument<
    Pick<ClinicPage, "title" | "slug" | "location"> & {
      categories: CategoriesInClinicList[];
    }
  >[];
  language: string;
  categoryOrder: {
    title: string;
  }[];
}

export const FilterClinics: FC<Props> = ({
  filterCategories,
  parentSlug,
  clinicList,
  language,
  categoryOrder,
}) => (
  <FilterList categories={filterCategories} categoryOrder={categoryOrder}>
    {({ category }) => (
      <LinkList
        links={clinicList.filter(
          (clinic) =>
            clinic.categories?.some((el) => !category || el.title === category)
        )}
        baseUrl={`/${language}/${parentSlug}`}
      />
    )}
  </FilterList>
);
