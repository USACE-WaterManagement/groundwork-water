/* eslint-disable react-refresh/only-export-components */
import { Skeleton } from "@usace/groundwork";
import RadialFillChart from "./RadialFillChart";

const DEFAULT_LEVEL_ID_SUFFIXES = {
  topOfFlood: ".Stor.Inst.0.Top of Flood",
  topOfConservation: ".Stor.Inst.0.Top of Conservation",
  topOfInactive: ".Stor.Inst.0.Top of Inactive",
};

const DEFAULT_TIME_SERIES_ID_SUFFIXES = {
  flood: ".Stor-Flood Pool.Inst.1Hour.0.Ccp-Rev",
  conservation: ".Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev",
};

const MISSING_VALUE = -901;

const entryValue = (entry) => {
  const value = Array.isArray(entry) ? entry[1] : entry;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
};

const createBasinPieModel = ({
  projects,
  pool,
  levelData,
  timeSeriesData,
  levelIdSuffixes = DEFAULT_LEVEL_ID_SUFFIXES,
  timeSeriesIdSuffixes = DEFAULT_TIME_SERIES_ID_SUFFIXES,
  colors,
}) => {
  const segments = [];
  let totalCapacity = 0;
  let totalStorage = 0;

  projects.forEach((project, index) => {
    const topOfFlood = entryValue(
      levelData?.[`${project}${levelIdSuffixes.topOfFlood}`],
    );
    const topOfConservation = entryValue(
      levelData?.[`${project}${levelIdSuffixes.topOfConservation}`],
    );
    const topOfInactive = entryValue(
      levelData?.[`${project}${levelIdSuffixes.topOfInactive}`],
    );
    const capacity =
      pool === "flood"
        ? topOfFlood !== null && topOfConservation !== null
          ? topOfFlood - topOfConservation
          : null
        : topOfConservation !== null && topOfInactive !== null
          ? topOfConservation - topOfInactive
          : null;

    if (!Number.isFinite(capacity) || capacity <= 0) return;

    const storage = entryValue(
      timeSeriesData?.[
        `${project}${pool === "flood" ? timeSeriesIdSuffixes.flood : timeSeriesIdSuffixes.conservation}`
      ],
    );
    const missing = storage === null || storage === MISSING_VALUE;

    totalCapacity += capacity;
    if (!missing && storage > 0) totalStorage += storage;
    segments.push({
      id: project,
      label: project,
      weight: capacity,
      fillRatio: missing ? null : storage / capacity,
      color: colors?.[index % colors.length],
    });
  });

  const percentFull =
    totalCapacity > 0
      ? Math.min(100, Math.max(0, Math.round((totalStorage / totalCapacity) * 100)))
      : 0;

  return { segments, totalCapacity, totalStorage, percentFull };
};

const BasinPie = ({
  projects = [],
  pool = "conservation",
  levelData,
  timeSeriesData,
  levelIdSuffixes = DEFAULT_LEVEL_ID_SUFFIXES,
  timeSeriesIdSuffixes = DEFAULT_TIME_SERIES_ID_SUFFIXES,
  colors,
  isPending = false,
  error,
  progress = 0,
  asOf,
  title,
  caption,
  onProjectSelect,
  width = 480,
  height = 480,
  viewBoxHeight = height + 120,
  ariaLabel = `${pool === "flood" ? "Flood" : "Conservation"} pool storage by project`,
  ...chartProps
}) => {
  if (isPending) {
    return (
      <Skeleton
        type="card"
        style={{
          borderRadius: width,
          height: `${height}px`,
          width: `${viewBoxHeight}px`,
        }}
        className={chartProps.className}
      >
        <div role="status" aria-live="polite">
          {Math.min(
            100,
            Math.max(0, Number.isFinite(progress) ? Math.round(progress) : 0),
          )}
          %
        </div>
      </Skeleton>
    );
  }

  if (error) {
    return <div role="alert">Error: {error?.message || String(error)}</div>;
  }

  if (pool !== "conservation" && pool !== "flood") {
    return <div role="alert">Pool must be either conservation or flood.</div>;
  }

  const model = createBasinPieModel({
    projects,
    pool,
    levelData,
    timeSeriesData,
    levelIdSuffixes,
    timeSeriesIdSuffixes,
    colors,
  });
  const defaultTitle = `THE FULL PIE IS ${Math.trunc(model.totalStorage).toLocaleString()} ACRE-FEET OR ${model.percentFull}%`;
  const defaultCaption = asOf ? `IMAGE DATE: ${asOf}` : undefined;

  return (
    <RadialFillChart
      {...chartProps}
      width={width}
      height={height}
      viewBoxHeight={viewBoxHeight}
      segments={model.segments}
      title={title ?? defaultTitle}
      caption={caption ?? defaultCaption}
      ariaLabel={ariaLabel}
      emptyMessage="No usable basin storage capacity data is available."
      onSegmentSelect={
        typeof onProjectSelect === "function"
          ? (segment) => onProjectSelect(segment.id)
          : undefined
      }
    />
  );
};

export {
  BasinPie,
  DEFAULT_LEVEL_ID_SUFFIXES,
  DEFAULT_TIME_SERIES_ID_SUFFIXES,
  createBasinPieModel,
  entryValue,
};
export default BasinPie;
