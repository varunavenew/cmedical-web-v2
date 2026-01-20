import { trackWithGTM } from "@/src/lib/tracking";
import {
  BOOK_TIMESLOT,
  BOOKING_METODIKA_DESCRIPTION,
  BOOKING_PHONE_ALTERNATIVE_DESKTOP,
  BOOKING_PHONE_ALTERNATIVE_MOBILE,
} from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import Link from "next/link";
import { FC } from "react";
import { StringWithTokens } from "../../StringWithTokens/StringWithTokens";
import { BookingStep } from "../BookingStep";
import { MetodikaIframe } from "./MetodikaIframe";
import { PatientskyIframe } from "./PatientskyIframe";

type Props = {
  language: string;
  method: ClinicBooking["method"];
  pasientskyCalendarId?: string;
  serviceProviderId?: string;
  metodikaCityId?: number;
  metodikaSpecialistId?: number;
  metodikaActivityGroupTitle?: string;
  contactInfo?: {
    streetAddress?: string;
    phoneOpeningHours?: string;
    phoneNumber?: string;
  };
};

export const IframeStep: FC<Props> = ({
  language,
  method,
  serviceProviderId,
  metodikaCityId,
  metodikaSpecialistId,
  metodikaActivityGroupTitle,
  pasientskyCalendarId,
  contactInfo,
}) => {
  if (method === "metodika") {
    return (
      <BookingStep language={language} title={t(BOOK_TIMESLOT, language)}>
        <p className="max-w-[50ch] mt-4 mx-auto text-center">
          {t(BOOKING_METODIKA_DESCRIPTION, language)}
        </p>

        <div className="w-full max-w-[80ch] min-w-0 mt-10 md:mt-30 mx-auto">
          <MetodikaIframe
            language={language}
            metodikaCityId={metodikaCityId}
            metodikaSpecialistId={metodikaSpecialistId}
            metodikaActivityGroup={
              metodikaActivityGroupTitle
                ? { type: "title", title: metodikaActivityGroupTitle }
                : { type: "all" }
            }
          />
        </div>

        <PhoneAlternative language={language} contactInfo={contactInfo} />
      </BookingStep>
    );
  }

  if (method === "pasientsky" && serviceProviderId != null) {
    return (
      <BookingStep language={language} title={t(BOOK_TIMESLOT, language)}>
        <div className="md:w-full md:mx-auto min-w-0 mt-10 md:mt-30">
          <PatientskyIframe
            serviceProviderId={serviceProviderId}
            calendarId={pasientskyCalendarId}
          />
        </div>

        <PhoneAlternative language={language} contactInfo={contactInfo} />
      </BookingStep>
    );
  }

  return null;
};

function PhoneAlternative({
  language,
  contactInfo,
}: {
  language: string;
  contactInfo?: {
    streetAddress?: string;
    phoneOpeningHours?: string;
    phoneNumber?: string;
  };
}) {
  if (contactInfo == null) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[50ch] mt-30 md:mt-50 text-center">
      <div className="hidden md:block space-y-20">
        <StringWithTokens
          string={t(BOOKING_PHONE_ALTERNATIVE_DESKTOP, language)}
          variables={{
            phoneNumber:
              contactInfo.phoneNumber != null ? (
                <PhoneLink phoneNumber={contactInfo.phoneNumber} />
              ) : undefined,
          }}
        />
      </div>

      <div className="md:hidden space-y-20">
        <StringWithTokens
          string={t(BOOKING_PHONE_ALTERNATIVE_MOBILE, language)}
          variables={{
            phoneNumber:
              contactInfo.phoneNumber != null ? (
                <PhoneLink phoneNumber={contactInfo.phoneNumber} />
              ) : undefined,
          }}
        />
      </div>
    </div>
  );
}

function PhoneLink({ phoneNumber }: { phoneNumber: string }) {
  return (
    <Link
      href={`tel:${phoneNumber}`}
      onClick={() => {
        trackWithGTM("booking_phone_click");
      }}
    >
      {phoneNumber}
    </Link>
  );
}
