import { formatBookingDateTime } from "./formatBookingDateTime";

const NOW = new Date("2023-10-23");

describe("swedish", () => {
  it("should format today's date as text", () => {
    const got = formatBookingDateTime(
      { date: "2023-10-23", startTime: "19:30" },
      "se",
      NOW
    );

    expect(got).toBe("i dag 19:30");
  });

  it("should format tomorrow's date as text", () => {
    const got = formatBookingDateTime(
      { date: "2023-10-24", startTime: "19:30" },
      "se",
      NOW
    );

    expect(got).toBe("i morgon 19:30");
  });

  it("should format day after tomorrow as date", () => {
    const got = formatBookingDateTime(
      { date: "2023-10-25", startTime: "19:30" },
      "se",
      NOW
    );

    expect(got).toBe("2023-10-25 19:30");
  });
});

describe("norwegian", () => {
  it("should format day after tomorrow as date", () => {
    const got = formatBookingDateTime(
      { date: "2023-10-25", startTime: "19:30" },
      "no",
      NOW
    );

    expect(got).toBe("25.10.2023, 19:30");
  });
});
