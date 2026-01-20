import { FC, ReactNode } from "react";
import { Image } from "./Image";
import classNames from "classnames";
import { ValuePropositionComponent } from "./ValueProposition";
import { Grid } from "./Grid";

interface Props {
  overlay?: ReactNode;
  content: ReactNode;
  image: SanityImage;
  alt: string | undefined;
  valueProposition: ValueProposition;
}

export const Hero: FC<Props> = ({
  overlay,
  content,
  image,
  alt,
  valueProposition,
}) => (
  <>
    <Grid.StickyCol className="h-fit grid items-center justify-stretch bg-black grid-cols-1 grid-rows-1">
      {overlay ? (
        <h1 className="text-large md:text-xlarge z-10 text-white text-center self-center col-start-1 row-start-1 order-1 relative hyphens-auto px-25 md:px-50 first-letter:uppercase">
          {overlay}
        </h1>
      ) : null}
      <Image
        key={image.asset.metadata.lqip}
        alt={alt}
        image={image}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={classNames(
          "w-full md:h-screen object-cover col-start-1 row-start-1 self-stretch justify-self-stretch",
          overlay ? "h-almost opacity-85" : "h-almosthalf"
        )}
      />
    </Grid.StickyCol>
    <ValuePropositionComponent
      className="md:col-start-2 mb-10 md:mb-80"
      valueProposition1={valueProposition.valueProposition1}
      valueProposition2={valueProposition.valueProposition2}
      socialProof={valueProposition.socialProof}
    >
      {content}
    </ValuePropositionComponent>
  </>
);
