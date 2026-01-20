"use client";
import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "../Image";
import { Grid } from "../Grid";
import { Slug } from "sanity";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { useRouter } from "next/navigation";
import { SanityDocument } from "next-sanity";

const LABELS: Record<string, string> = {
  se: "Boka tid",
  no: "Bestill time",
  en: "Book appointment",
};

export const SpecialistSection: FC<{
  treatment: string;
  language: string;
  className?: string;
}> = ({ treatment, language }) => {
  const router = useRouter();
  const [specialist, setSpecialist] = useState<
    SanityDocument<SpecialistPage> & { parent: Slug }
  >();
  useEffect(() => {
    fetch(`/api/specialists/random?theme=${treatment}&lang=${language}`)
      .then((r) => r.json())
      .then(setSpecialist)
      .catch(console.warn);
  }, [treatment, language]);

  const handleClickBook: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      const href = e.currentTarget.href;
      if (href) {
        router.replace(href);
      }
    },
    []
  );

  return specialist ? (
    <Grid>
      <Grid.StickyCol className="grid relative bg-black">
        <Image
          image={specialist.primaryImage.image}
          alt={specialist.primaryImage.alt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full h-full overflow-hidden object-cover aspect-square md:aspect-auto md:h-screen"
        />
      </Grid.StickyCol>
      <Grid.SecondCol className="grid grid-cols-2 grid-rows-[80px_1fr_80px] md:grid-rows-[100px_1fr_115px] place-items-center gap-y-40">
        <div className="p-20">
          <p>{specialist.valueProposition.valueProposition1}</p>
        </div>
        <div className="p-20">
          <p>{specialist.valueProposition.socialProof}</p>
        </div>
        <div className="prose col-span-2 px-50 py-25 max-w-[50ch] mx-auto">
          <PortableTextComponent value={specialist.description} />
        </div>
        <div className="col-span-2 p-20">
          <Link
            href={`?book&specialist=${
              specialist.booking?.clinicSlug ? specialist.slug ?? "" : ""
            }&clinic=${specialist.booking?.clinicSlug ?? ""}`}
            className="mx-auto flex justify-center items-center w-fit px-15 h-40 bg-yellow rounded-[15px] border-half border-black/10"
            onClick={handleClickBook}
          >
            {LABELS[language] ?? LABELS.en}
          </Link>
        </div>
      </Grid.SecondCol>
    </Grid>
  ) : null;
};
