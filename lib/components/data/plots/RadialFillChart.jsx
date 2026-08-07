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
          fontSize={fontSize}
          fontWeight="bold"
        >
          {title}
        </text>
      ) : null}

      <g data-chart-layer="segments">
        {chartSegments.map((segment, index) => {
          const active = activeIndex === index;
          const middleAngle =
            segment.startAngle + (segment.endAngle - segment.startAngle) / 2;
          const middleRadians = (middleAngle * Math.PI) / 180;
          const offsetX = active ? hoverOffset * Math.sin(middleRadians) : 0;
          const offsetY = active ? -hoverOffset * Math.cos(middleRadians) : 0;
          const labelRadius =
            segment.endAngle - segment.startAngle < 10 ? radius * 1.135 : radius * 1.12;
          const labelPoint = polarPoint(centerX, centerY, labelRadius, middleAngle);
          const percentage =
            segment.fillRatio === null ? null : Math.round(segment.fillRatio * 100);
          const accessibleLabel =
            percentage === null
              ? `${segment.label}: data missing`
              : `${segment.label}: ${percentage}% full`;
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
                x={labelPoint.x}
                y={labelPoint.y}
                dy="0.35em"
                textAnchor="middle"
                fill={percentage === null ? "#b91c1c" : "black"}
                fontFamily="Arial, sans-serif"
                fontSize={fontSize}
                opacity={activeIndex !== null && !active ? 0.1 : 1}
                aria-hidden="true"
              >
                {percentage === null
                  ? `${segment.label} Missing ⚠`
                  : `${segment.label} ${percentage}%`}
              </text>
            </g>
          );
        })}
      </g>

      <g data-chart-layer="reference-marks" aria-hidden="true">
        {[1, 0.75, 0.5, 0.25].map((percentage) => (
          <g key={percentage}>
            <text
              x={centerX - 15}
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
          fontSize={fontSize}
          fontWeight="bold"
        >
          {caption}
        </text>
      ) : null}
    </svg>
  );
};

export { RadialFillChart, normalizeSegments, radialSegmentPath };
export default RadialFillChart;
