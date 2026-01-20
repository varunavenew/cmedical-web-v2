"use client";
import { SanityDocument } from "next-sanity";
import { FC, useCallback, useState } from "react";
import { SubTopicsSection } from "../SubTopicsSection";
import { Hero } from "../Hero";
import { FilterSpecialists } from "./FilterSpecialists";
import { Grid } from "../Grid";
import { removeDuplicateCategories } from "@/src/lib/removeDuplicateCategories";

const SpecialistListContent: FC<{
  data: SanityDocument<SpecialistListPage>;
}> = ({ data }) => {
  const [image, setImage] = useState(data.primaryImage);

  const handleHoverSpecialist = useCallback(
    (specialist?: Pick<SpecialistPage, "primaryImage">) => {
      setImage(specialist?.primaryImage ?? data.primaryImage);
    },
    [data.primaryImage]
  );

  const categories = data.specialists.flatMap((s) => s.categories);

  const filterCategories = removeDuplicateCategories(categories);

  return (
    <main>
      <Grid>
        <Hero
          overlay={data.title}
          image={image.image}
          alt={image.alt}
          valueProposition={data.valueProposition}
          content={<div className="max-w-[50ch]">{data.body}</div>}
        />
        <Grid.SecondCol>
          <FilterSpecialists
            filterCategories={filterCategories}
            specialistList={data.specialists}
            language={data.language}
            parentSlug={data.slug}
            onMouseEnter={handleHoverSpecialist}
            onMouseLeave={handleHoverSpecialist}
            categoryOrder={data.categoryOrder}
          />
          {data.faq && <SubTopicsSection {...data.faq} />}
        </Grid.SecondCol>
      </Grid>
    </main>
  );
};

export default SpecialistListContent;
