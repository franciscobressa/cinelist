import { formatDate } from "@/utils/date";

describe("formatDate", () => {
  it("should format valid ISO date string", () => {
    expect(formatDate("2024-01-15")).toBe("15/01/2024");
  });

  it("should return 'N/A' for invalid dates", () => {
    expect(formatDate("invalid")).toBe("N/A");
  });

  it("should return 'N/A' when value is null or undefined", () => {
    expect(formatDate(null)).toBe("N/A");
    expect(formatDate(undefined)).toBe("N/A");
  });
});
