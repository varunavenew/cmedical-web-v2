import { formatBookingDuration } from "./formatBookingDuration";

it.each([
  [{ startTime: "12:00", endTime: "13:00" }, "1 timme"],
  [{ startTime: "12:00", endTime: "14:00" }, "2 timmar"],
  [{ startTime: "12:30", endTime: "13:00" }, "30 minuter"],
])("should format duration correctly", (booking, expected) => {
  const result = formatBookingDuration("se", booking);

  expect(result).toBe(expected);
});
