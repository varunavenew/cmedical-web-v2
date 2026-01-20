import { FC } from "react";
import { CategoryList } from "./Category/CategoryList";
import { SubTopicsSection } from "./SubTopicsSection";
import { ClinicsAndSpecialistsSection } from "./ClinicsAndSpecialistsSection";
import { Image } from "./Image";
import { About } from "./About";
import { Grid } from "./Grid";

interface Props {
  data: HomePage;
}

const HomeContent: FC<Props> = ({ data }) => {
  return (
    <main>
      <Grid>
        <Grid.FirstCol className="bg-black md:h-screen h-almosthalf">
          <Image
            className="object-cover w-full h-full opacity-85"
            image={data.primaryImage.image}
            alt={data.primaryImage.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Grid.FirstCol>
        <Grid.SecondCol className="grid grid-cols-1 grid-rows-1 bg-black md:h-screen h-almosthalf">
          <h1 className="text-white z-10 md:text-medium w-2/3 text-center order-1 self-center justify-self-center col-start-1 row-start-1 relative">
            {data.payoff}
          </h1>
          <Image
            className="object-cover w-full h-full col-start-1 row-start-1 opacity-85"
            image={data.secondaryImage.image}
            alt={data.secondaryImage.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Grid.SecondCol>
      </Grid>
      <About
        title={data.aboutTitle}
        body={data.aboutBody}
        valueProposition={data.valueProposition}
      />
      {data.promotedCategories && (
        <CategoryList categories={data.promotedCategories} />
      )}
      {data.finance && <SubTopicsSection {...data.finance} />}
      <ClinicsAndSpecialistsSection
        language={data.language}
        clinicList={data.clinicList}
        specialistList={data.specialistList}
        className="bg-white"
      />
      {data.faq && <SubTopicsSection {...data.faq} />}
    </main>
  );
};

export default HomeContent;
