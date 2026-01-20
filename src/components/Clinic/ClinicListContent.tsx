"use client";

import { SanityDocument } from "next-sanity";
import { FC, useEffect, useState } from "react";
import { Hero } from "../Hero";
import { PortableText } from "@portabletext/react";
import { SubTopicsSection } from "../SubTopicsSection";
import { FilterClinics } from "./FilterClinics";
import { htmlEncodeString } from "@/src/lib/htmlEncodeString";
import { Grid } from "../Grid";
import { sortByDistance } from "@/src/lib/calculateDistance";
import { removeDuplicateCategories } from "@/src/lib/removeDuplicateCategories";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";

const ClinicListContent: FC<{ data: SanityDocument<ClinicListPage> }> = ({
  data,
}) => {
  const [sortedClinics, setSortedClinics] = useState<
    SanityDocument<
      Pick<ClinicPage, "title" | "slug" | "location"> & {
        categories: CategoriesInClinicList[];
      }
    >[]
  >(data.clinics);

  useEffect(() => {
    fetch(`/api/coordinates`)
      .then((r) => r.json())
      .then((r) => setSortedClinics(sortByDistance(r, data.clinics)))
      .catch(console.warn);
  }, []);

  const filterOutClinicsThatHaveCategories = data.clinics.filter(
    (c) => c.categories !== null
  );

  const treatmentCategories = filterOutClinicsThatHaveCategories.flatMap(
    (t) => t.categories
  );

  const categoryList = removeDuplicateCategories(treatmentCategories);

  return (
    <main>
      <Grid>
        <Hero
          overlay={
            <span
              dangerouslySetInnerHTML={{
                __html: htmlEncodeString(data.title).replaceAll(/\s+/g, "<br>"),
              }}
            />
          }
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          valueProposition={data.valueProposition}
          content={
            <div className="prose max-w-[50ch]">
              <PortableTextComponent value={data.description} />
            </div>
          }
        />
        <Grid.SecondCol>
          <FilterClinics
            filterCategories={categoryList}
            clinicList={sortedClinics}
            language={data.language}
            parentSlug={data.slug}
            categoryOrder={data.categoryOrder}
          />
          <SubTopicsSection {...data.faq} className="md:col-start-2" />
        </Grid.SecondCol>
      </Grid>
    </main>
  );
};

export default ClinicListContent;
