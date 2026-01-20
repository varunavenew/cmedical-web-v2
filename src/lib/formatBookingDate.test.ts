import { formatBookingDate } from "./formatBookingDate";

it.each([["se", { date: "2023-11-24" }, "fredag 24 november 2023"]])(
  "should format booking dates correctly",
  (language, booking, expected) => {
    const result = formatBookingDate(language, booking);

    expect(result).toBe(expected);
  }
);
