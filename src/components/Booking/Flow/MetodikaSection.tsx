"use client";

import {
  BOOK_TIMESLOT,
  BOOKING_METODIKA_DESCRIPTION,
} from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import { MetodikaIframe } from "./MetodikaIframe";

interface Props {
  language: string;
  metodikaCityId?: number;
  metodikaSpecialistId?: number;
}

export function MetodikaSection({
  language,
  metodikaCityId,
  metodikaSpecialistId,
}: Props) {
  return (
    <div className="max-w-[80ch] my-20 md:my-75 mx-auto">
      <h2 className="text-medium mt-40 md:mt-60 text-center">
        {t(BOOK_TIMESLOT, language)}
      </h2>

      <p className="max-w-[50ch] mt-4 mb-20 mx-auto text-center">
        {t(BOOKING_METODIKA_DESCRIPTION, language)}
      </p>

      <MetodikaIframe
        language={language}
        metodikaCityId={metodikaCityId}
        metodikaSpecialistId={metodikaSpecialistId}
      />
    </div>
  );
}
