import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BasinPie, {
  DEFAULT_LEVEL_ID_SUFFIXES,
  DEFAULT_TIME_SERIES_ID_SUFFIXES,
  createBasinPieModel,
} from "../BasinPie";

const levelData = {
  [`A${DEFAULT_LEVEL_ID_SUFFIXES.topOfFlood}`]: [0, 200],
  [`A${DEFAULT_LEVEL_ID_SUFFIXES.topOfConservation}`]: [0, 150],
  [`A${DEFAULT_LEVEL_ID_SUFFIXES.topOfInactive}`]: [0, 50],
  [`B${DEFAULT_LEVEL_ID_SUFFIXES.topOfFlood}`]: [0, 160],
  [`B${DEFAULT_LEVEL_ID_SUFFIXES.topOfConservation}`]: [0, 120],
  [`B${DEFAULT_LEVEL_ID_SUFFIXES.topOfInactive}`]: [0, 20],
};

describe("BasinPie", () => {
  it("builds conservation and flood models", () => {
    const conservation = createBasinPieModel({
      projects: ["A", "B"],
      pool: "conservation",
      levelData,
      timeSeriesData: {
        [`A${DEFAULT_TIME_SERIES_ID_SUFFIXES.conservation}`]: [0, 50],
        [`B${DEFAULT_TIME_SERIES_ID_SUFFIXES.conservation}`]: [0, 100],
      },
    });
    expect(
      conservation.segments.map(({ weight, fillRatio }) => ({ weight, fillRatio })),
    ).toEqual([
      { weight: 100, fillRatio: 0.5 },
      { weight: 100, fillRatio: 1 },
    ]);
    expect(conservation.percentFull).toBe(75);

    const flood = createBasinPieModel({
      projects: ["A", "B"],
      pool: "flood",
      levelData,
      timeSeriesData: {
        [`A${DEFAULT_TIME_SERIES_ID_SUFFIXES.flood}`]: [0, 25],
        [`B${DEFAULT_TIME_SERIES_ID_SUFFIXES.flood}`]: [0, 10],
      },
    });
    expect(
      flood.segments.map(({ weight, fillRatio }) => ({ weight, fillRatio })),
    ).toEqual([
      { weight: 50, fillRatio: 0.5 },
      { weight: 40, fillRatio: 0.25 },
    ]);
  });

  it("marks missing storage and skips missing capacity without throwing", () => {
    const model = createBasinPieModel({
      projects: ["A", "B", "MISSING"],
      pool: "conservation",
      levelData,
      timeSeriesData: {
        [`A${DEFAULT_TIME_SERIES_ID_SUFFIXES.conservation}`]: [0, -901],
      },
    });
    expect(model.segments).toHaveLength(2);
    expect(model.segments.every((segment) => segment.fillRatio === null)).toBe(true);
  });

  it("supports suffix overrides, loading, errors, and project selection", () => {
    const suffixes = {
      topOfFlood: ".tf",
      topOfConservation: ".tc",
      topOfInactive: ".ti",
    };
    const series = { flood: ".f", conservation: ".c" };
    const onProjectSelect = vi.fn();
    const { rerender } = render(
      <BasinPie
        projects={["X"]}
        levelData={{ "X.tc": [0, 100], "X.ti": [0, 0], "X.tf": [0, 200] }}
        timeSeriesData={{ "X.c": [0, 40] }}
        levelIdSuffixes={suffixes}
        timeSeriesIdSuffixes={series}
        onProjectSelect={onProjectSelect}
        asOf="2026-08-07T12"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "X: 40% full" }));
    expect(onProjectSelect).toHaveBeenCalledWith("X");
    expect(screen.getByText("IMAGE DATE: 2026-08-07T12")).toBeTruthy();

    rerender(<BasinPie projects={["X"]} isPending progress={42.4} />);
    expect(screen.getByRole("status").textContent).toBe("42%");
    rerender(<BasinPie projects={["X"]} error={new Error("failed")} />);
    expect(screen.getByRole("alert").textContent).toContain("failed");
  });
});
