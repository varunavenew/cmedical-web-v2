import { TEAM_ABOUT_US } from "../../translations/category-page";
import { t } from "../../translations/get-translation";
import { ClinicsAndSpecialistsSection } from "../ClinicsAndSpecialistsSection";
import { ExpertiseSection } from "../ExpertiseSection";
import { Grid } from "../Grid";
import { Hero } from "../Hero";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { SubTopicsSection } from "../SubTopicsSection";

type Props = {
  data: CategoryPage;
  language: string;
};

function CategoryContent({ data, language }: Props) {
  return (
    <main>
      <Grid>
        <Hero
          overlay={data.title}
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          valueProposition={data.valueProposition}
          content={
            <div className="prose max-w-[50ch]">
              <PortableTextComponent value={data.about} />
            </div>
          }
        />
        <ExpertiseSection
          className="md:col-start-2 min-h-almost md:min-h-screen flex flex-col justify-between"
          title={data.expertise.title}
          body={data.expertise.body}
          treatments={data.treatments}
          teams={data.teams.map((team) => ({
            ...team,
            title: `${t(TEAM_ABOUT_US, language)} / ${team.title}`,
            baseUrl: `/${data.language}`,
          }))}
          baseUrl={`/${data.language}/${data.slug}`}
        />
      </Grid>
      <ClinicsAndSpecialistsSection
        className="bg-white"
        language={data.language}
        clinicList={data.clinicList}
        specialistList={data.specialistList}
      />
      {data.finance && <SubTopicsSection {...data.finance} />}
      {data.faq && <SubTopicsSection {...data.faq} className="bg-white" />}
    </main>
  );
}

export default CategoryContent;
