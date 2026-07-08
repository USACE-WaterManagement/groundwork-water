import { describe, it, expect } from "vitest";
import { selectNearestValue } from "../useLoadNearestValues";

const ts = (minutes) => minutes * 60 * 1000;

const values = [
  [ts(0), 10.0, 0],
  [ts(60), 20.0, 0],
  [ts(120), 30.0, 0],
  [ts(180), 40.0, 0],
  [ts(240), 50.0, 0],
];

describe("selectNearestValue", () => {
  describe("prev strategy", () => {
    it("selects the last value at or before the target", () => {
      const result = selectNearestValue(values, ts(150), "prev");
      expect(result).toEqual({ value: 30.0, timestamp: ts(120), qualityCode: 0 });
    });

    it("selects exact match", () => {
      const result = selectNearestValue(values, ts(120), "prev");
      expect(result).toEqual({ value: 30.0, timestamp: ts(120), qualityCode: 0 });
    });

    it("returns null when no value is at or before the target", () => {
      const result = selectNearestValue(values, ts(-10), "prev");
      expect(result).toBeNull();
    });
  });

  describe("next strategy", () => {
    it("selects the first value at or after the target", () => {
      const result = selectNearestValue(values, ts(90), "next");
      expect(result).toEqual({ value: 30.0, timestamp: ts(120), qualityCode: 0 });
    });

    it("selects exact match", () => {
      const result = selectNearestValue(values, ts(60), "next");
      expect(result).toEqual({ value: 20.0, timestamp: ts(60), qualityCode: 0 });
    });

    it("returns null when no value is at or after the target", () => {
      const result = selectNearestValue(values, ts(300), "next");
      expect(result).toBeNull();
    });
  });

  describe("nearest strategy", () => {
    it("selects the closest value by time", () => {
      const result = selectNearestValue(values, ts(110), "nearest");
      expect(result).toEqual({ value: 30.0, timestamp: ts(120), qualityCode: 0 });
    });

    it("selects exact match", () => {
      const result = selectNearestValue(values, ts(180), "nearest");
      expect(result).toEqual({ value: 40.0, timestamp: ts(180), qualityCode: 0 });
    });

    it("selects the closer of two equidistant values", () => {
      const result = selectNearestValue(values, ts(90), "nearest");
      expect(result.value).toBeDefined();
      expect([ts(60), ts(120)]).toContain(result.timestamp);
    });
  });

  describe("null handling", () => {
    it("skips null values", () => {
      const withNulls = [
        [ts(0), 10.0, 0],
        [ts(60), null, 0],
        [ts(120), 30.0, 0],
      ];
      const result = selectNearestValue(withNulls, ts(60), "prev");
      expect(result).toEqual({ value: 10.0, timestamp: ts(0), qualityCode: 0 });
    });

    it("returns null for all-null values", () => {
      const allNull = [
        [ts(0), null, 0],
        [ts(60), null, 0],
      ];
      expect(selectNearestValue(allNull, ts(30), "prev")).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("returns null for empty array", () => {
      expect(selectNearestValue([], ts(0), "prev")).toBeNull();
    });

    it("returns null for undefined values", () => {
      expect(selectNearestValue(undefined, ts(0), "prev")).toBeNull();
    });

    it("returns null for null values", () => {
      expect(selectNearestValue(null, ts(0), "prev")).toBeNull();
    });
  });
});
