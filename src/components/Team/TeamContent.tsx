import { FC } from "react";
import { Grid } from "../Grid";
import { Hero } from "../Hero";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { SubTopicsSection } from "../SubTopicsSection";
import { SpecialistList } from "../Specialist/SpecialistList";

interface Props {
  data: TeamPage;
  language: string;
}

const TeamContent: FC<Props> = ({ data, language }) => {
  return (
    <main>
      <Grid className="bg-skin5 text-white">
        <Hero
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          content={
            <h1 className="text-center text-medium md:text-large">
              {data.title}
            </h1>
          }
          valueProposition={{
            socialProof: data.tagline,
          }}
        />
        <Grid.SecondCol className="md:min-h-screen flex flex-col bg-skin1 text-black">
          <div className="max-w-[50ch] px-50 py-80 md:py-100 mx-auto flex items-center grow">
            <div className="prose">
              <PortableTextComponent value={data.description} />
            </div>
          </div>

          <div className="pt-80 md:pt-25">
            <SpecialistList
              links={data.specialists}
              baseUrl={`/${language}/${data.specalistListPageSlug}`}
            />
          </div>
        </Grid.SecondCol>
        <Grid.SecondCol className="bg-skin1 text-black">
          <SubTopicsSection
            className="bg-white"
            title={data.finance.title}
            ingress={data.finance.ingress}
            subTopics={data.finance.subTopics}
          />
          <SubTopicsSection
            title={data.faq.title}
            ingress={data.faq.ingress}
            subTopics={data.faq.subTopics}
          />
        </Grid.SecondCol>
      </Grid>
    </main>
  );
};

export default TeamContent;
