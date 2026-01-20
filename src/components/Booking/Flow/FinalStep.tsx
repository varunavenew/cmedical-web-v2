import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { FC } from "react";
import { ContactInfoStep } from "./ContactInfoStep";
import { IframeStep } from "./IframeStep";
import { ClosedForBookingStep } from "./ClosedForBookingStep";

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  bookingData:
    | BookingSpecialistDataQueryResult
    | BookingClinicDataQueryResult
    | BookingClinicsQueryResult[number];
}

// The final step where we either show a booking iframe, information about how to book,
// or redirect to an external booking site.
export const FinalStep: FC<Props> = ({
  language,
  clinicLanguage,
  bookingData,
}) => {
  if (bookingData.booking?.method == null) {
    return;
  }

  if (
    bookingData.booking?.method === "pasientsky" ||
    bookingData.booking?.method === "metodika"
  ) {
    return (
      <IframeStep
        language={language}
        method={bookingData.booking.method}
        serviceProviderId={bookingData.booking.serviceProviderId}
        metodikaCityId={bookingData.booking.metodikaCityId}
        metodikaSpecialistId={
          "metodikaSpecialistId" in bookingData.booking
            ? bookingData.booking.metodikaSpecialistId
            : undefined
        }
        metodikaActivityGroupTitle={
          "category" in bookingData &&
          bookingData.category?.metodikaActivityGroupTitle
            ? bookingData.category.metodikaActivityGroupTitle
            : undefined
        }
        pasientskyCalendarId={
          "pasientSkyCalendarId" in bookingData.booking
            ? bookingData.booking.pasientSkyCalendarId
            : undefined
        }
        contactInfo={bookingData.contactInfo}
      />
    );
  }

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
