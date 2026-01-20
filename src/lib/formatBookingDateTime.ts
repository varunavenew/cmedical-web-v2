import differenceInDays from "date-fns/differenceInDays";
import { Booking } from "./webdoc/types";

const LANG_MAP = {
  no: "nb",
  se: "sv",
  en: "en",
};
export const formatBookingDateTime = (
  value: Pick<Booking, "date" | "startTime">,
  language: string,
  now = new Date()
) => {
  const date = new Date(`${value.date} ${value.startTime}`);

  const diffInDays = differenceInDays(date, now);
  if (diffInDays >= 0 && diffInDays < 2) {
    const formatter = new Intl.RelativeTimeFormat(
      LANG_MAP[language as "no" | "se" | "en"],
      { localeMatcher: "best fit", numeric: "auto", style: "short" }
    );
    return `${formatter.format(diffInDays, "days")} ${value.startTime}`;
  } else {
    const formatter = new Intl.DateTimeFormat(
      LANG_MAP[language as "no" | "se" | "en"],
      { localeMatcher: "best fit", dateStyle: "short", timeStyle: "short" }
    );
    return formatter.format(date);
  }
};
