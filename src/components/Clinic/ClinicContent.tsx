import { removeDuplicateCategories } from "@/src/lib/removeDuplicateCategories";
import { FC } from "react";
import { MetodikaSection } from "../Booking/Flow/MetodikaSection";
import { PatientskyIframe } from "../Booking/Flow/PatientskyIframe";
import { ClosedForBookingSection } from "../ClosedForBookingSection";
import { ContactSection } from "../ContactSection";
import { Grid } from "../Grid";
import { Hero } from "../Hero";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { SpecialistListSection } from "../Specialist/SpecialistListSection";
import { SubTopicsList } from "../SubTopicsList";
import { SubTopicsSection } from "../SubTopicsSection";
import { SubTopicsWithLinkButtons } from "../SubTopicsWithLinkButtons";

interface Props {
  data: ClinicPage;
  language: string;
}

const ClinicContent: FC<Props> = ({ data, language }) => {
  const treatmentCategories = data.treatments.flatMap((t) => t.categories);
  const categoriesAndTreatments = removeDuplicateCategories(
    treatmentCategories
  ).map((category) => ({
    category,
    treatments: data.treatments.filter((t) =>
      t.categories.some((c) => category.slug === c.slug)
    ),
  }));

  return (
    <main>
      <Grid className="bg-skin5 text-white">
        <Hero
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          valueProposition={data.valueProposition}
          content={
            <h1 className="text-center hyphens-auto text-medium md:text-xlarge">
              {data.title}
            </h1>
          }
        />
        <Grid.SecondCol className="bg-skin1 text-black min-h-almosthalf md:min-h-screen flex flex-col">
          <h2 className="p-20 flex items-center justify-center">
            CMedical {data.title}
          </h2>
          <div className="max-w-[50ch] px-50 py-80 md:py-25 mx-auto flex items-center grow">
            <div className="prose">
              <PortableTextComponent value={data.description} />
            </div>
          </div>
          {data.subTopics && <SubTopicsList subTopics={data.subTopics} />}
          {categoriesAndTreatments &&
            categoriesAndTreatments.map((c) => {
              return (
                <SubTopicsWithLinkButtons
                  key={c.category.slug}
                  category={c.category}
                  list={c.treatments}
                  language={data.language}
                />
              );
            })}
        </Grid.SecondCol>
      </Grid>
      <SpecialistListSection
        title={data.specialistData.title}
        language={data.language}
        baseUrl={data.specialistData.slug}
        defaultImage={data.specialistData.primaryImage}
        specialists={data.specialists}
      />
      <Grid>
        <ContactSection {...data} />
        {language === "no" &&
          data.booking?.method === "pasientsky" &&
          data.booking?.serviceProviderId && (
            <Grid.SecondCol className="bg-white">
              <PatientskyIframe
                className="px-40"
                serviceProviderId={data.booking.serviceProviderId}
              />
            </Grid.SecondCol>
          )}
        {language === "no" &&
          data.booking?.method === "metodika" &&
          data.booking?.metodikaCityId != null && (
            <Grid.SecondCol className="bg-white">
              <MetodikaSection
                language={language}
                metodikaCityId={data.booking.metodikaCityId}
              />
            </Grid.SecondCol>
          )}
        {data.booking?.method === "closed" &&
          data.booking?.showDescriptionWhenClosed === true && (
            <Grid.SecondCol>
              <ClosedForBookingSection
                descriptionDesktop={data.booking?.descriptionWhenClosedDesktop}
                descriptionMobile={data.booking?.descriptionWhenClosedMobile}
              />
            </Grid.SecondCol>
          )}
        <Grid.SecondCol>
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

export default ClinicContent;
