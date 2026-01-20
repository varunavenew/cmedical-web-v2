import classNames from "classnames";
import { FC } from "react";
import { Grid } from "./Grid";
import { Image } from "./Image";
import { LinkList } from "./LinkList";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";

interface Props {
  language: string;
  className?: string;
  clinicList: CategoryPage["clinicList"];
  specialistList: CategoryPage["specialistList"];
}

export const ClinicsAndSpecialistsSection: FC<Props> = ({
  language,
  className,
  clinicList,
  specialistList,
}) => (
  <Grid>
    <Grid.StickyCol
      className={classNames(
        "relative grid md:bg-black md:h-screen aspect-square md:aspect-auto",
        className
      )}
    >
      <div className="md:text-white md:text-xlarge col-start-1 row-start-1 z-10 flex items-center justify-center text-center min-w-0 px-50">
        <h2 className="hyphens-auto text-center">{clinicList.title}</h2>
      </div>
      <Image
        image={clinicList.primaryImage.image}
        alt={clinicList.primaryImage.alt}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="hidden md:block overflow-hidden w-full object-cover col-start-1 row-start-1 opacity-80"
      />
    </Grid.StickyCol>
    <Grid.SecondCol
      className={classNames(
        "grid grid-cols-2 grid-rows-[1fr_auto] md:grid-rows-[100px_1fr_auto] justify-center items-center gap-y-40",
        className
      )}
    >
      <div className="p-20 hidden md:block text-center">
        <p>{clinicList.valueProposition.valueProposition1}</p>
      </div>
      <div className="p-20 hidden md:block text-center">
        <p>{clinicList.valueProposition.valueProposition2}</p>
      </div>
      <div className="prose col-span-2 px-50 py-25 max-w-[50ch] mx-auto">
        <PortableTextComponent value={clinicList.description} />
      </div>
      <div className="col-span-2">
        <LinkList
          links={[
            { ...specialistList, title: specialistList.menuTitle },
            { ...clinicList, title: clinicList.menuTitle },
          ]}
          baseUrl={`/${language}`}
        />
      </div>
    </Grid.SecondCol>
  </Grid>
);
