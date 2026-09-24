import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  RadialFillChart,
  clampedTextX,
  estimatedTextWidth,
  fittedFontSize,
  layoutSegmentLabels,
  normalizeSegments,
  radialSegmentPath,
} from "../RadialFillChart";

const segments = [
  { id: "one", label: "One", weight: 3, fillRatio: 1.5, color: "red" },
  { id: "two", label: "Two", weight: 1, fillRatio: null, color: "blue" },
];

describe("RadialFillChart", () => {
  it("normalizes ratios and rejects unusable weights", () => {
    expect(
      normalizeSegments([
        ...segments,
        { id: "zero", label: "Zero", weight: 0, fillRatio: 0.5 },
        { id: "invalid", label: "Invalid", weight: Number.NaN, fillRatio: 0.5 },
      ]),
    ).toEqual([{ ...segments[0], fillRatio: 1 }, segments[1]]);
  });

  it("creates finite paths, including a full-circle segment", () => {
    expect(radialSegmentPath(100, 100, 80, 0, 360)).toMatch(/A 80 80 0 1 1/);
    expect(radialSegmentPath(100, 100, 0, 0, 90)).toBe("");
  });

  it("keeps labels inside the view box and fits long text", () => {
    const text = "KEYS 75%";
    const fontSize = 16;
    const x = clampedTextX(5, text, fontSize, 600);
    const halfWidth = estimatedTextWidth(text, fontSize) / 2;

    expect(x - halfWidth).toBeGreaterThanOrEqual(fontSize / 2);
    expect(clampedTextX(595, text, fontSize, 600) + halfWidth).toBeLessThanOrEqual(
      600 - fontSize / 2,
    );
    expect(fittedFontSize("A very long chart caption", 16, 80)).toBeLessThan(16);
  });

  it("separates labels clustered at the top of a large chart", () => {
    const layouts = layoutSegmentLabels(
      [
        { label: "A", fillRatio: 0.01, startAngle: 0, endAngle: 4 },
        { label: "B", fillRatio: 0.02, startAngle: 4, endAngle: 10 },
        { label: "C", fillRatio: 0.03, startAngle: 10, endAngle: 18 },
      ],
      {
        centerX: 300,
        centerY: 300,
        radius: 240,
        fontSize: 16,
        viewBoxWidth: 600,
        viewBoxHeight: 600,
        title: "Storage",
        caption: "Updated now",
      },
    );

    expect(layouts[0].labelY).toBeGreaterThanOrEqual(48);
    expect(layouts[1].labelY - layouts[0].labelY).toBeGreaterThanOrEqual(20);
    expect(layouts[2].labelY - layouts[1].labelY).toBeGreaterThanOrEqual(20);
  });

  it("renders percentages, missing data, and escaped text", () => {
    const unsafeLabel = '<script>alert("x")</script>';
    const { container } = render(
      <RadialFillChart
        segments={[
          ...segments,
          { id: "safe", label: unsafeLabel, weight: 1, fillRatio: 0.5 },
        ]}
      />,
    );

    expect(screen.getByText("One 100%")).toBeTruthy();
    expect(screen.getByText("Two Missing ⚠")).toBeTruthy();
    expect(screen.getByText(`${unsafeLabel} 50%`)).toBeTruthy();
    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).not.toContain("NaN");
  });

  it("renders reference marks above filled segments", () => {
    const { container } = render(<RadialFillChart segments={segments} />);
    const layers = container.querySelectorAll("[data-chart-layer]");

    expect(Array.from(layers, (layer) => layer.dataset.chartLayer)).toEqual([
      "segments",
      "reference-marks",
    ]);
    expect(
      container
        .querySelector('[data-chart-layer="reference-marks"] text')
        ?.getAttribute("paint-order"),
    ).toBe("stroke");
  });

  it("supports pointer and keyboard selection", () => {
    const onSegmentSelect = vi.fn();
    render(<RadialFillChart segments={segments} onSegmentSelect={onSegmentSelect} />);

    const first = screen.getByRole("button", { name: "One: 100% full" });
    fireEvent.click(first);
    fireEvent.keyDown(first, { key: "Enter" });
    fireEvent.keyDown(first, { key: " " });

    expect(onSegmentSelect).toHaveBeenCalledTimes(3);
    expect(onSegmentSelect).toHaveBeenLastCalledWith(
      expect.objectContaining({ id: "one" }),
    );
  });

  it("updates data, reports an empty state, and supports static markup", () => {
    const { rerender } = render(<RadialFillChart segments={segments} />);
    rerender(
      <RadialFillChart
        segments={[{ id: "new", label: "New", weight: 2, fillRatio: 0.25 }]}
      />,
    );
    expect(screen.getByText("New 25%")).toBeTruthy();
    rerender(<RadialFillChart segments={[]} />);
    expect(screen.getByRole("status").textContent).toBe("No chart data is available.");

    const markup = renderToStaticMarkup(
      <RadialFillChart segments={segments} title="Storage" caption="Updated now" />,
    );
    expect(markup).toContain("<svg");
    expect(markup).toContain("Updated now");
  });
});
