import { describe, expect, it } from "vitest";
import { calculateMonthsAgo } from "../git.js";

describe("calculateMonthsAgo", () => {
	it("returns 0 for a date less than 30 days ago", () => {
		const recent = new Date();
		recent.setDate(recent.getDate() - 10);
		expect(calculateMonthsAgo({ date: recent })).toBe(0);
	});

	it("returns 1 for a date about 35 days ago", () => {
		const oneMonthAgo = new Date();
		oneMonthAgo.setDate(oneMonthAgo.getDate() - 35);
		expect(calculateMonthsAgo({ date: oneMonthAgo })).toBe(1);
	});

	it("returns 6 for a date about 6 months ago", () => {
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 185);
		expect(calculateMonthsAgo({ date: sixMonthsAgo })).toBe(6);
	});

	it("returns 12 for a date about a year ago", () => {
		const oneYearAgo = new Date();
		oneYearAgo.setDate(oneYearAgo.getDate() - 370);
		expect(calculateMonthsAgo({ date: oneYearAgo })).toBe(12);
	});
});
