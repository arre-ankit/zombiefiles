import { describe, expect, it } from "vitest";
import { formatMonths } from "../display.js";

describe("formatMonths", () => {
	it("returns singular for 1 month", () => {
		expect(formatMonths({ months: 1 })).toBe("1 month");
	});

	it("returns plural for multiple months", () => {
		expect(formatMonths({ months: 5 })).toBe("5 months");
	});

	it("returns plural for 0 months", () => {
		expect(formatMonths({ months: 0 })).toBe("0 months");
	});
});
