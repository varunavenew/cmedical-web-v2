import { Booking } from "./webdoc";

const LANG_MAP = {
  no: "nb",
  se: "sv",
  en: "en",
};
export const formatBookingDuration = (
  language: string,
  booking: Pick<Booking, "startTime" | "endTime">
) => {
  // HACK: a slightly hacky way to calculate the duration
  const startTime = new Date(`2000-01-01T${booking.startTime}Z`);
  const endTime = new Date(`2000-01-01T${booking.endTime}Z`);
  const diffMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  if (diffMinutes >= 60) {
    const formatter = new Intl.NumberFormat(
      LANG_MAP[language as "no" | "se" | "en"],
      {
        localeMatcher: "best fit",
        unitDisplay: "long",
        style: "unit",
        unit: "hour",
      }
    );
    return formatter.format(diffMinutes / 60);
  } else {
    const formatter = new Intl.NumberFormat(
      LANG_MAP[language as "no" | "se" | "en"],
      {
        localeMatcher: "best fit",
        unitDisplay: "long",
        style: "unit",
        unit: "minute",
      }
    );
    return formatter.format(diffMinutes);
  }
};
