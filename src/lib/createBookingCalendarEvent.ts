import { createEvent } from "ics";
import { Booking, Clinic } from "./webdoc";

export const createBookingCalendarEvent = (
  booking: Booking,
  clinic: Clinic
) => {
  const start = new Date(`${booking.date}T${booking.startTime}Z`);
  const end = new Date(`${booking.date}T${booking.endTime}Z`);
  return new Promise<string>((resolve, reject) =>
    createEvent(
      {
        start: [
          start.getFullYear(),
          start.getMonth() + 1,
          start.getDate(),
          start.getHours(),
          start.getMinutes(),
        ],
        startInputType: "local",
        end: [
          end.getFullYear(),
          end.getMonth() + 1,
          end.getDate(),
          end.getHours(),
          end.getMinutes(),
        ],
        endInputType: "local",
        location: clinic.address,
        description: `${booking.caregiver.title} ${booking.caregiver.firstName} ${booking.caregiver.lastName}`,
        title: booking.bookingType,
      },
      (err, val) => (err ? reject(err) : resolve(val))
    )
  );
};
