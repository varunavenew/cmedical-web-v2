import {
  CALL_US_AT,
  NORWEGIAN_CLINIC_BOOK_ONLINE,
  SWEDISH_CLINIC_BOOK_ONLINE,
  SWEDISH_CLINIC_BOOK_ONLINE_DESCRIPTION,
} from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import Link from "next/link";
import { FC } from "react";
import { BookingStep } from "../BookingStep";

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  externalBookingUrl?: string;
  contactInfo?: {
    streetAddress?: string;
    phoneOpeningHours?: string;
    phoneNumber?: string;
  };
}

export const ContactInfoStep: FC<Props> = ({
  language,
  clinicLanguage,
  externalBookingUrl,
  contactInfo,
}) => {
  return (
    <BookingStep language={language}>
      <div className="grid grid-rows-[1fr_auto] gap-40 place-content-center flex-grow max-w-450 mx-auto mt-40 md:mt-60">
        <div className="text-center flex flex-col items-center justify-center">
          {contactInfo?.phoneNumber && (
            <div className="text-medium">
              <p>{t(CALL_US_AT, language)}</p>
              <p>
                <Link href={`tel:${contactInfo.phoneNumber}`}>
                  {contactInfo.phoneNumber}
                </Link>
              </p>
            </div>
          )}

          {externalBookingUrl && (
            <ExternalBooking
              language={language}
              clinicLanguage={clinicLanguage}
              url={externalBookingUrl}
            />
          )}
        </div>

        {contactInfo && (
          <div className="text-center py-50">
            <address>
              {contactInfo.streetAddress && <p>{contactInfo.streetAddress}</p>}
              {contactInfo.phoneOpeningHours && (
                <p>{contactInfo.phoneOpeningHours}</p>
              )}
            </address>
          </div>
        )}
      </div>
    </BookingStep>
  );
};

// Norwegian and Swedish clinics have a slightly different design for the
// external booking text because the Swedish clinics wanted a larger link text
// and a description.
// We could use the same styling for Norwegian clinics but the larger link text
// looks a little odd without the description underneath.
function ExternalBooking({
  language,
  clinicLanguage,
  url,
}: {
  language: string;
  clinicLanguage: "no" | "se";
  url: string;
}) {
  if (clinicLanguage === "se") {
    return (
      <div className="mt-60">
        <p>
          <Link
            className="text-medium hover:underline"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t(SWEDISH_CLINIC_BOOK_ONLINE, language)}
          </Link>
        </p>

        <p className="mt-15 opacity-60 max-w-[28ch]">
          {t(SWEDISH_CLINIC_BOOK_ONLINE_DESCRIPTION, language)}
        </p>
      </div>
    );
  }

  return (
    <div className="opacity-50 mt-60">
      <p>
        <Link
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          {t(NORWEGIAN_CLINIC_BOOK_ONLINE, language)}
        </Link>
      </p>
    </div>
  );
}
