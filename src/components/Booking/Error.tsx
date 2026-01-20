import { BOOKING_ERROR } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import { FC } from "react";

export const Error: FC<{ language: string }> = ({ language }) => (
  <div className="prose text-center w-full max-w-450 mt-40 md:mt-60 mx-auto whitespace-pre-line">
    <p>{t(BOOKING_ERROR, language)}</p>
  </div>
);
