import { Grid } from "./Grid";
import { AddressSection } from "./AddressSection";
import { MapSection } from "./MapSection";

export const ContactSection = ({ ...data }: ClinicPage) => {
  return (
    <>
      <Grid.StickyCol>
        <MapSection
          title={data.title}
          language={data.language}
          location={data.location}
        />
      </Grid.StickyCol>
      <Grid.SecondCol>
        <AddressSection {...data} />
      </Grid.SecondCol>
    </>
  );
};
