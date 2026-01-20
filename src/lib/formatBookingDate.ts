import { Booking } from "./webdoc";

const LANG_MAP = {
  no: "nb",
  se: "sv",
  en: "en",
};

export const formatBookingDate = (
  language: string,
  booking: Pick<Booking, "date">
) => {
  const date = new Date(`${booking.date}T00:00Z`);
  const formatter = new Intl.DateTimeFormat(
    LANG_MAP[language as "no" | "se" | "en"],
    {
      localeMatcher: "best fit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return formatter.format(date);
};
