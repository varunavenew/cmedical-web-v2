import { revalidateTag } from "next/cache";
import {
  BASE_URL,
  DEFAULT_REVALIDATE_TIME,
  getHeaders,
  AuthResponse,
  Booking,
  BookingType,
  USER_UUID,
} from ".";
import { throwOnNotOk } from "../throwOnNotOk";

export const getBookingTypes = (auth: AuthResponse) => {
  const url = new URL(`${BASE_URL}/v1/bookingTypes`);

  return fetch(url, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }).then(throwOnNotOk<BookingType[]>);
};

export const bookTimeslot = (
  auth: AuthResponse,
  patientId: string,
  bookingId: string
) => {
  const url = new URL(`${BASE_URL}/v1/bookings/${bookingId}`);

  return fetch(url, {
    headers: getHeaders(auth),
    method: "PATCH",
    body: JSON.stringify({
      patientId,
      requestedByUserId: USER_UUID,
    }),
  })
    .then(throwOnNotOk<Booking>)
    .finally(() => revalidateTag("bookings"));
};

export const getBookings = (auth: AuthResponse) => {
  return fetch(`${BASE_URL}/v1/bookings`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME, tags: ["bookings"] },
  }).then(throwOnNotOk<Booking[]>);
};
