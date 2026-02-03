import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { FC } from "react";
import { ContactInfoStep } from "./ContactInfoStep";
import { ClosedForBookingStep } from "./ClosedForBookingStep";
import { CustomBookingFlow } from "./CustomBookingFlow";

interface ServiceData {
  name: string;
  slug: string;
  price?: string;
  duration?: string;
}

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  bookingData:
  | BookingSpecialistDataQueryResult
  | BookingClinicDataQueryResult
  | BookingClinicsQueryResult[number];
  selectedService?: ServiceData;
  customSubStep?: "time" | "confirm" | "success";
  onCustomSubStepChange?: (subStep: "time" | "confirm" | "success") => void;
}

// The final step where we either show a booking iframe, custom booking flow,
// information about how to book, or redirect to an external booking site.
export const FinalStep: FC<Props> = ({
  language,
  clinicLanguage,
  bookingData,
  selectedService,
  customSubStep = "time",
  onCustomSubStepChange,
}) => {
  if (bookingData.booking?.method == null) {
    return null;
  }

  const bookingMethod = bookingData.booking.method as string;

  // Custom booking flow using internal UI (no iframes)
  if (
    bookingMethod === "pasientsky" ||
    bookingMethod === "metodika" ||
    bookingMethod === "custom"
  ) {
    return (
      <CustomBookingFlow
        language={language}
        clinicLanguage={clinicLanguage}
        bookingData={bookingData}
        selectedService={selectedService}
        currentSubStep={customSubStep || "time"}
        onSubStepChange={onCustomSubStepChange}
      />
    );
  }

  // Existing: Contact info method
  if (bookingData.booking?.method === "info") {
    return (
      <ContactInfoStep
        language={language}
        clinicLanguage={clinicLanguage}
        externalBookingUrl={bookingData.booking.externalBookingUrl}
        contactInfo={bookingData.contactInfo}
      />
    );
  }

  // Existing: Closed for booking
  if (bookingData.booking?.method === "closed") {
    return (
      <ClosedForBookingStep
        language={language}
        descriptionDesktop={bookingData.booking.descriptionWhenClosedDesktop}
        descriptionMobile={bookingData.booking.descriptionWhenClosedMobile}
        contactInfo={bookingData.contactInfo}
      />
    );
  }

  return null;
};