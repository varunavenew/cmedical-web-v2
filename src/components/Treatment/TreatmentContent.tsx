import { FC } from "react";
import { SubTopicsSection } from "../SubTopicsSection";
import { PortableText } from "@portabletext/react";
import { Hero } from "../Hero";
import { SubTopicsList } from "../SubTopicsList";
import { Testimonial } from "../Testimonial";
import { SpecialistSection } from "../Specialist/SpecialistSection";
import { ClinicsAndSpecialistsSection } from "../ClinicsAndSpecialistsSection";
import { Grid } from "../Grid";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";

interface Props {
  data: TreatmentPage;
}

const TreatmentContent: FC<Props> = ({ data }) => {
  return (
    <main>
      <Grid>
        <Hero
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          content={
            <h1 className="text-medium md:text-xlarge hyphens-auto text-center max-w-full">
              {data.title}
            </h1>
          }
          valueProposition={data.valueProposition}
        />
        <Grid.SecondCol className="min-h-almost md:min-h-screen flex flex-col">
          <div className="max-w-[50ch] px-50 py-25 mx-auto flex items-center flex-grow">
            <div className="prose">
              <PortableTextComponent value={data.body} />
            </div>
          </div>
          {data.subTopics && <SubTopicsList subTopics={data.subTopics} />}
        </Grid.SecondCol>
        {data.testimonial && (
          <Grid.SecondCol>
            <Testimonial {...data.testimonial} />
          </Grid.SecondCol>
        )}
      </Grid>
      <SpecialistSection language={data.language} treatment={data.slug} />
      <ClinicsAndSpecialistsSection
        className="bg-white"
        language={data.language}
        clinicList={data.clinicList}
        specialistList={data.specialistList}
      />
      {data.finance && <SubTopicsSection {...data.finance} />}
      {data.faq && <SubTopicsSection className="bg-white" {...data.faq} />}
    </main>
  );
};

export default TreatmentContent;
