import { FC } from "react";
import { MetodikaSection } from "../Booking/Flow/MetodikaSection";
import { PatientskyIframe } from "../Booking/Flow/PatientskyIframe";
import { Grid } from "../Grid";
import { Hero } from "../Hero";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { SubTopicsSection } from "../SubTopicsSection";

interface Props {
  data: SpecialistPage;
  language: string;
}

const SpecialistContent: FC<Props> = ({ data, language }) => {
  return (
    <main>
      <Grid className="bg-skin5 text-white">
        <Hero
          image={data.primaryImage.image}
          alt={data.primaryImage.alt}
          content={
            <h1 className="text-center text-medium md:text-large">
              {data.name}
            </h1>
          }
          valueProposition={data.valueProposition}
        />
        <Grid.SecondCol className="md:min-h-screen flex flex-col bg-skin1 text-black">
          <h2 className="p-20 h-80 md:h-100 flex items-center justify-center">
            {data.descriptionHeading}
          </h2>
          <div className="max-w-[50ch] px-50 py-80 md:py-25 mx-auto flex items-center grow">
            <div className="prose">
              <PortableTextComponent value={data.description} />
            </div>
          </div>
        </Grid.SecondCol>
        {language === "no" &&
          data.booking?.method === "pasientsky" &&
          data.booking?.serviceProviderId &&
          data.booking?.pasientSkyCalendarId && (
            <Grid.SecondCol className="bg-white">
              <PatientskyIframe
                className="px-40"
                serviceProviderId={data.booking.serviceProviderId}
                calendarId={data.booking.pasientSkyCalendarId}
              />
            </Grid.SecondCol>
          )}
        {language === "no" && data.booking?.method === "metodika" && (
          <Grid.SecondCol className="bg-white text-black">
            <MetodikaSection
              language={language}
              metodikaCityId={data.booking.metodikaCityId}
              metodikaSpecialistId={data.booking.metodikaSpecialistId}
            />
          </Grid.SecondCol>
        )}
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

export default SpecialistContent;
