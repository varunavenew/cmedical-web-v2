import { BookingClinicsQueryResult } from "@/sanity/lib/queries";
import { trackWithGTM } from "@/src/lib/tracking";
import { CHOOSE_CLINIC } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BookingButton } from "../BookingButton";
import { BookingButtonContainer } from "../BookingButtonContainer";
import { BookingStep } from "../BookingStep";
import { Loader } from "../Loader";

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  categorySlug: string;
  onSelect: (bookingData?: BookingClinicsQueryResult[number]) => void;
}

export const ClinicStep: FC<Props> = ({
  language,
  clinicLanguage,
  categorySlug,
  onSelect,
}) => {
  const [clinics, setClinics] = useState<BookingClinicsQueryResult>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = new URL("/api/booking/clinics", location.origin);
    url.searchParams.set("language", language);
    url.searchParams.set("clinicLanguage", clinicLanguage);
    url.searchParams.set("categorySlug", categorySlug);

    fetch(url)
      .then((res) => res.json())
      .then(setClinics)
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [language, clinicLanguage, categorySlug]);

  return (
    <BookingStep
      language={language}
      title={t(CHOOSE_CLINIC, language)}
      error={error}
    >
      {clinics ? (
        <BookingButtonContainer>
          {clinics.map((clinic) => {
            // Don't include closed clinics we haven't explicitly said should be included
            if (
              clinic.booking != null &&
              clinic.booking.method === "closed" &&
              clinic.booking.showDescriptionWhenClosed !== true
            ) {
              return null;
            }

            if (
              clinic.booking != null &&
              clinic.booking.externalBookingUrl != null &&
              clinic.booking.redirectToExternalBookingUrl === true
            ) {
              return (
                <Link
                  key={clinic.title}
                  className="bg-black/5 rounded-10 block p-25 hover:bg-yellow focus-visible:bg-yellow text-center"
                  href={clinic.booking.externalBookingUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {clinic.title}
                </Link>
              );
            }

            return (
              <BookingButton
                key={clinic.title}
                onClick={() => {
                  trackWithGTM("booking_select_clinic", {
                    booking_method: clinic.booking?.method ?? "",
                  });
                  onSelect(clinic);
                }}
              >
                {clinic.title}
              </BookingButton>
            );
          })}
        </BookingButtonContainer>
      ) : (
        <Loader />
      )}
    </BookingStep>
  );
};
