"use client";
import { FC, useCallback, useState } from "react";
import { Grid } from "../Grid";
import { SpecialistList } from "./SpecialistList";
import { Image } from "../Image";

export const SpecialistListSection: FC<{
  title: string;
  language: string;
  baseUrl: string;
  defaultImage: ImageWithAlt;
  specialists: SpecilistsInClinic[];
}> = ({ title, specialists, language, baseUrl, defaultImage }) => {
  const [image, setImage] = useState(defaultImage);

  const handleHoverSpecialist = useCallback(
    (specialist?: Pick<SpecilistsInClinic, "primaryImage">) =>
      setImage(specialist?.primaryImage ?? defaultImage),

    [defaultImage]
  );

  return (
    <Grid>
      <Grid.StickyCol className="h-almost md:h-screen hidden md:block">
        <Image
          image={(image ?? defaultImage).image}
          alt={(image ?? defaultImage).alt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full h-almost md:h-screen overflow-hidden object-cover"
        />
      </Grid.StickyCol>
      <Grid.SecondCol className="h-fit">
        <div className="md:h-[50vh] h-[45vh] flex justify-center items-center">
          <h2>{title}</h2>
        </div>
        <SpecialistList
          links={specialists}
          baseUrl={`/${language}/${baseUrl}`}
          onMouseEnter={handleHoverSpecialist}
          onMouseLeave={handleHoverSpecialist}
        />
      </Grid.SecondCol>
    </Grid>
  );
};
