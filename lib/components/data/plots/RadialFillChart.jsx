/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";

const DEFAULT_COLORS = [
  "rgb(197, 92, 230)",
  "rgb(244, 217, 102)",
  "rgb(38, 192, 163)",
  "rgb(77, 237, 69)",
  "rgb(66, 91, 214)",
  "rgb(11, 170, 227)",
  "rgb(255, 192, 0)",
  "rgb(29, 131, 151)",
];

const polarPoint = (centerX, centerY, radius, angle) => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: centerX + radius * Math.sin(radians),
    y: centerY - radius * Math.cos(radians),
  };
};

const TEXT_WIDTH_FACTOR = 0.62;

const estimatedTextWidth = (text, fontSize) =>
  String(text).length * fontSize * TEXT_WIDTH_FACTOR;

const fittedFontSize = (text, preferredFontSize, availableWidth) => {
  const estimatedWidth = estimatedTextWidth(text, preferredFontSize);
  return estimatedWidth > availableWidth && estimatedWidth > 0
    ? (preferredFontSize * availableWidth) / estimatedWidth
    : preferredFontSize;
};

const clampedTextX = (x, text, fontSize, viewBoxWidth, padding = fontSize / 2) => {
  const halfWidth = estimatedTextWidth(text, fontSize) / 2;
  const minimum = padding + halfWidth;
  const maximum = viewBoxWidth - padding - halfWidth;
  return minimum > maximum ? viewBoxWidth / 2 : Math.min(maximum, Math.max(minimum, x));
};

const radialSegmentPath = (centerX, centerY, radius, startAngle, endAngle) => {
  if (!Number.isFinite(radius) || radius <= 0) return "";

  const sweep = Math.max(0, endAngle - startAngle);
  const start = polarPoint(centerX, centerY, radius, startAngle);
  const end = polarPoint(centerX, centerY, radius, endAngle);

  if (sweep >= 359.999) {
    const opposite = polarPoint(centerX, centerY, radius, startAngle + 180);
    return [
      `M ${centerX} ${centerY}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 1 1 ${opposite.x} ${opposite.y}`,
      `A ${radius} ${radius} 0 1 1 ${start.x} ${start.y}`,
      "Z",
    ].join(" ");
  }

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${sweep > 180 ? 1 : 0} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

const normalizeSegments = (segments) =>
  segments
    .filter((segment) => Number.isFinite(segment?.weight) && segment.weight > 0)
    .map((segment, index) => ({
      ...segment,
      id: String(segment.id),
      label: String(segment.label ?? segment.id),
      color: segment.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      fillRatio:
        segment.fillRatio === null || !Number.isFinite(segment.fillRatio)
          ? null
          : Math.min(1, Math.max(0, segment.fillRatio)),
    }));

const layoutSegmentLabels = (
  segments,
  { centerX, centerY, radius, fontSize, viewBoxWidth, viewBoxHeight, title, caption },
) => {
  const labels = segments.map((segment, index) => {
    const middleAngle =
      segment.startAngle + (segment.endAngle - segment.startAngle) / 2;
    const middleRadians = (middleAngle * Math.PI) / 180;
    const labelRadius =
      segment.endAngle - segment.startAngle < 10 ? radius * 1.135 : radius * 1.12;
    const labelPoint = polarPoint(centerX, centerY, labelRadius, middleAngle);
    const percentage =
      segment.fillRatio === null ? null : Math.round(segment.fillRatio * 100);
    const visibleLabel =
      percentage === null
        ? `${segment.label} Missing ⚠`
        : `${segment.label} ${percentage}%`;
    const labelFontSize = fittedFontSize(visibleLabel, fontSize, viewBoxWidth * 0.4);

    return {
      index,
      segment,
      middleRadians,
      percentage,
      visibleLabel,
      labelFontSize,
      labelX: clampedTextX(labelPoint.x, visibleLabel, labelFontSize, viewBoxWidth),
      labelY: labelPoint.y,
      side: Math.sin(middleRadians) < 0 ? "left" : "right",
    };
  });

  const topLimit = title ? fontSize * 3 : fontSize;
  const bottomLimit = caption
    ? viewBoxHeight - fontSize * 2.25
    : viewBoxHeight - fontSize;

  ["left", "right"].forEach((side) => {
    const sideLabels = labels
      .filter((label) => label.side === side)
      .sort((a, b) => a.labelY - b.labelY);

    sideLabels.forEach((label, index) => {
      if (index === 0) {
        label.labelY = Math.max(topLimit, label.labelY);
        return;
      }
      const previous = sideLabels[index - 1];
      const gap = Math.max(previous.labelFontSize, label.labelFontSize) * 1.25;
      label.labelY = Math.max(label.labelY, previous.labelY + gap);
    });

    if (sideLabels.at(-1)?.labelY > bottomLimit) {
      sideLabels.at(-1).labelY = bottomLimit;
      for (let index = sideLabels.length - 2; index >= 0; index -= 1) {
        const label = sideLabels[index];
        const next = sideLabels[index + 1];
        const gap = Math.max(label.labelFontSize, next.labelFontSize) * 1.25;
        label.labelY = Math.min(label.labelY, next.labelY - gap);
      }
    }
  });

  return labels.sort((a, b) => a.index - b.index);
};

const RadialFillChart = ({
  segments = [],
  title,
  caption,
  id,
  className = "",
  width = 480,
  height = 480,
  viewBoxWidth = width + 120,
  viewBoxHeight = height + 120,
  centerX = viewBoxWidth / 2,
  centerY = viewBoxHeight / 2,
  radius = Math.min(width, height) / 2,
  fontSize = 16,
  strokeWidth = 1,
  hoverOffset = 20,
  ariaLabel = "Radial fill chart",
  emptyMessage = "No chart data is available.",
  onSegmentSelect,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const normalizedSegments = normalizeSegments(segments);
  const totalWeight = normalizedSegments.reduce(
    (total, segment) => total + segment.weight,
    0,
  );

  if (normalizedSegments.length === 0 || totalWeight <= 0) {
    return (
      <div id={id} className={className} style={style} role="status">
        {emptyMessage}
      </div>
    );
  }

  const chartSegments = normalizedSegments.reduce((laidOut, segment) => {
    const angle = (segment.weight / totalWeight) * 360;
    const startAngle = laidOut.at(-1)?.endAngle ?? 0;
    return [...laidOut, { ...segment, startAngle, endAngle: startAngle + angle }];
  }, []);
  const labelLayouts = layoutSegmentLabels(chartSegments, {
    centerX,
    centerY,
    radius,
    fontSize,
    viewBoxWidth,
    viewBoxHeight,
    title,
    caption,
  });
  const interactive = typeof onSegmentSelect === "function";

  return (
    <svg
      id={id}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={ariaLabel}
      style={{ maxWidth: "100%", height: "auto", ...style }}
    >
      <title>{ariaLabel}</title>
      {title ? (
        <text
          x={viewBoxWidth / 2}
          y={fontSize * 1.5}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={fittedFontSize(title, fontSize, viewBoxWidth - fontSize * 2)}
          fontWeight="bold"
        >
          {title}
        </text>
      ) : null}

      <g data-chart-layer="segments">
        {labelLayouts.map((layout, index) => {
          const { segment } = layout;
          const active = activeIndex === index;
          const offsetX = active ? hoverOffset * Math.sin(layout.middleRadians) : 0;
          const offsetY = active ? -hoverOffset * Math.cos(layout.middleRadians) : 0;
          const accessibleLabel =
            layout.percentage === null
              ? `${segment.label}: data missing`
              : `${segment.label}: ${layout.percentage}% full`;
          const selectSegment = () => {
            if (interactive) onSegmentSelect(segment);
          };

          return (
            <g
              key={`${segment.id}-${index}`}
              data-segment-id={segment.id}
              role={interactive ? "button" : "img"}
              tabIndex={interactive ? 0 : undefined}
              aria-label={accessibleLabel}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={selectSegment}
              onKeyDown={(event) => {
                if (interactive && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  selectSegment();
                }
              }}
              style={interactive ? { cursor: "pointer", outline: "none" } : undefined}
            >
              <g transform={`translate(${offsetX} ${offsetY})`}>
                <path
                  d={radialSegmentPath(
                    centerX,
                    centerY,
                    radius - strokeWidth * 2,
                    segment.startAngle,
                    segment.endAngle,
                  )}
                  fill="none"
                  stroke="black"
                  strokeWidth={active ? Math.max(3, strokeWidth) : strokeWidth}
                />
                {segment.fillRatio !== null && segment.fillRatio > 0 ? (
                  <path
                    d={radialSegmentPath(
                      centerX,
                      centerY,
                      (radius - strokeWidth * 2) * segment.fillRatio,
                      segment.startAngle,
                      segment.endAngle,
                    )}
                    fill={segment.color}
                    stroke="black"
                    strokeWidth={strokeWidth}
                  />
                ) : null}
              </g>
              <text
                x={layout.labelX}
                y={layout.labelY}
                dy="0.35em"
                textAnchor="middle"
                fill={layout.percentage === null ? "#b91c1c" : "black"}
                fontFamily="Arial, sans-serif"
                fontSize={layout.labelFontSize}
                opacity={activeIndex !== null && !active ? 0.1 : 1}
                aria-hidden="true"
              >
                {layout.visibleLabel}
              </text>
            </g>
          );
        })}
      </g>

      <g data-chart-layer="reference-marks" aria-hidden="true">
        {[1, 0.75, 0.5, 0.25].map((percentage) => (
          <g key={percentage}>
            <text
              x={centerX - Math.max(15, fontSize * 3.25)}
              y={centerY - radius * percentage - strokeWidth * 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Arial, sans-serif"
              fontSize={fontSize}
              stroke="white"
              strokeWidth={Math.max(3, fontSize / 4)}
              paintOrder="stroke"
            >
              {percentage * 100}%
            </text>
            {percentage !== 1 ? (
              <>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius * percentage}
                  stroke="white"
                  strokeWidth={Math.max(3, strokeWidth + 2)}
                  strokeDasharray="16 16"
                  fill="none"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius * percentage}
                  stroke="black"
                  strokeWidth={strokeWidth}
                  strokeDasharray="16 16"
                  fill="none"
                />
              </>
            ) : null}
          </g>
        ))}
      </g>

      {caption ? (
        <text
          x={viewBoxWidth / 2}
          y={viewBoxHeight - fontSize / 2}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={fittedFontSize(caption, fontSize, viewBoxWidth - fontSize * 2)}
          fontWeight="bold"
        >
          {caption}
        </text>
      ) : null}
    </svg>
  );
};

export {
  RadialFillChart,
  clampedTextX,
  estimatedTextWidth,
  fittedFontSize,
  layoutSegmentLabels,
  normalizeSegments,
  radialSegmentPath,
};
export default RadialFillChart;
