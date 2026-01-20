import Link from "next/link";
import { FC } from "react";
import { BookingButton } from "../BookingButton";
import { BookingStep } from "../BookingStep";

interface Props {
  language: string;
  onSetBookingType: (type: string) => void;
}

export const BookingTypeStep: FC<Props> = ({ language, onSetBookingType }) => (
  <BookingStep
    language={language}
    className="max-w-400"
    title="Velg type bestilling"
  >
    <BookingButton onClick={() => onSetBookingType("private")}>
      <p className="mb-40 text-center">Privat</p>
      <p className="text-left">
        For deg som ønsker å bestille time som privatperson. Finn behandlingen
        du ønsker å bestille her.
      </p>
    </BookingButton>
    <div className="px-40">
      <p className="mb-40 text-center">Offentlig vård</p>
      <p className="text-left">
        For att beställa en timme igennom offentlig vard måste du først få en
        henvisnig fra din fastlakare.{" "}
        <Link href="/" className="underline">
          Mer info
        </Link>
      </p>
    </div>
    <div className="px-40">
      <p className="mb-40 text-center">Försäkring</p>
      <p className="text-left">
        For deg som ønsker å bestille time som privatperson. Finn behandlingen
        du ønsker å bestille her.
      </p>
    </div>
  </BookingStep>
);
