import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { trackWithGTM } from "@/src/lib/tracking";
import { FC, useCallback, useState } from "react";
import { CategoryStep } from "../CategoryStep";
import { FlowContainer } from "../FlowContainer";
import { Loader } from "../Loader";
import { ClinicStep } from "./ClinicStep";
import { FinalStep } from "./FinalStep";

const BG_COLORS = ["bg-skin2", "bg-skin3", "bg-white"];
const BG_COLORS_INFO = ["bg-skin2", "bg-skin3", "bg-yellow"];

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  initialBookingData?:
    | BookingSpecialistDataQueryResult
    | BookingClinicDataQueryResult
    | BookingClinicsQueryResult[number];
  onClose: () => void;
  onBack?: () => void;
}

export const BookingFlow: FC<Props> = ({
  language,
  clinicLanguage,
  initialBookingData,
  onClose,
  onBack,
}) => {
  const [step, setStep] = useState(initialBookingData ? 2 : 0);
  const [categorySlug, setCategorySlug] = useState<string>();
  const [bookingData, setBookingData] = useState(initialBookingData);

  const handleBack = useCallback(() => {
    trackWithGTM("booking_back");
    setStep((old) => Math.max(0, old - 1));
  }, []);

  // When this is a shortcut from a clinic or specialist page, do not show the back button
  const backHandler = initialBookingData
    ? undefined
    : step === 0
      ? onBack
      : handleBack;

  const backgroundColor = getBackgroundColor({
    bookingMethod: bookingData?.booking?.method,
    step,
  });

  return (
    <FlowContainer
      language={language}
      progress={step + 1}
      maxProgress={BG_COLORS.length}
      onClose={onClose}
      onBack={backHandler}
      className={backgroundColor}
    >
      {step === 0 ? (
        <CategoryStep
          language={language}
          clinicLanguage={clinicLanguage}
          onSelect={(value) => {
            setCategorySlug(value);
            setStep(1);
          }}
        />
      ) : step === 1 && categorySlug ? (
        <ClinicStep
          language={language}
          clinicLanguage={clinicLanguage}
          categorySlug={categorySlug}
          onSelect={(bookingData) => {
            setBookingData(bookingData);
            setStep(2);
          }}
        />
      ) : step === 2 && bookingData ? (
        <FinalStep
          language={language}
          clinicLanguage={clinicLanguage}
          bookingData={bookingData}
        />
      ) : (
        <Loader />
      )}
    </FlowContainer>
  );
};

function getBackgroundColor({
  bookingMethod,
  step,
}: {
  bookingMethod?: ClinicBooking["method"];
  step: number;
}) {
  if (bookingMethod === "info" || bookingMethod === "closed") {
    return BG_COLORS_INFO[step];
  }

  return BG_COLORS[step];
}
