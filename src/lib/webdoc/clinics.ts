import {
  BASE_URL,
  DEFAULT_REVALIDATE_TIME,
  AuthResponse,
  Booking,
  Clinic,
} from ".";
import { getHeaders } from "./auth";
import { throwOnNotOk } from "../throwOnNotOk";

export const getClinics = (auth: AuthResponse, orgno?: string) => {
  const url = new URL(`${BASE_URL}/v1/clinics`);
  if (orgno) {
    url.searchParams.set("organisationNumber", orgno);
  }
  return fetch(url, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }).then(throwOnNotOk<Clinic[]>);
};

export const getClinicBookings = (
  auth: AuthResponse,
  clinicId: string,
  fromDate?: Date,
  bookingTypeId?: string,
  booked?: boolean
) => {
  const url = new URL(`${BASE_URL}/v1/clinics/${clinicId}/bookings`);
  if (typeof booked === "boolean") {
    url.searchParams.set("booked", booked.toString());
  }
  if (typeof bookingTypeId !== "undefined") {
    url.searchParams.set("bookingTypeId", bookingTypeId);
  }
  if (fromDate instanceof Date) {
    url.searchParams.set("fromDate", fromDate.toISOString());
  }
  return fetch(url, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME, tags: ["bookings"] },
  }).then(throwOnNotOk<Booking[]>);
};
