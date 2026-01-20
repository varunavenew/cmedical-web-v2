import { FC, useEffect, useState } from "react";
import { BookingStep } from "../BookingStep";
import { Booking, Clinic } from "@/src/lib/webdoc";
import { formatBookingDuration } from "@/src/lib/formatBookingDuration";
import { formatBookingDate } from "@/src/lib/formatBookingDate";
import { createBookingCalendarEvent } from "@/src/lib/createBookingCalendarEvent";

interface Props {
  language: string;
  booking: Booking;
  clinic: Clinic;
}

export const ConfirmationStep: FC<Props> = ({ language, booking, clinic }) => {
  const [icalUrl, setIcalUrl] = useState<string>();
  useEffect(() => {
    createBookingCalendarEvent(booking, clinic)
      .then(
        (event) => new File([event], "event.ics", { type: "text/calendar" })
      )
      .then((file) => URL.createObjectURL(file))
      .then(setIcalUrl)
      .catch(console.error); // TODO: handle error
  }, [booking, clinic]);

  return (
    <BookingStep
      language={language}
      className="max-w-400"
      title="Din time er bekreftet"
    >
      <p>
        {booking.caregiver.title} {booking.caregiver.firstName}{" "}
        {booking.caregiver.lastName}
      </p>
      <p>{clinic.name}</p>
      <p>
        {booking.bookingType}, {formatBookingDuration(language, booking)}
      </p>
      <p>
        <span className="first-letter:uppercase">
          {formatBookingDate(language, booking)}
        </span>{" "}
        {icalUrl && (
          <>
            (
            <a href={icalUrl} download="event.ics" className="underline">
              lägg till i kalender
            </a>
            )
          </>
        )}
      </p>
      <p>
        {clinic.name}
        TODO: fixa så att vi har klinikens location från sanity här (
        <a href="https://www.google.maps" className="underline">
          visa på karta
        </a>
        )
      </p>
      <details>
        <summary>booking</summary>

        <pre>{JSON.stringify(booking, null, 2)}</pre>
      </details>
      <details>
        <summary>clinic</summary>

        <pre>{JSON.stringify(clinic, null, 2)}</pre>
      </details>
    </BookingStep>
  );
};
