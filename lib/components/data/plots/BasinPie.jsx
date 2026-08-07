/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useState } from "react";
import { Configuration, LevelsApi, TimeSeriesApi } from "cwmsjs";
import { Skeleton } from "@usace/groundwork";
import { getLatestEntry } from "../helpers/cda";
import { fetchCdaLevelValues } from "../helpers/levels";
import useCdaUrl from "../utilities/useCdaUrl";
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

const entryValue = (entry) => {
  const value = Array.isArray(entry) ? entry[1] : entry;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
};

const normalizeIds = (ids) => {
  if (!ids) return [];
  return (Array.isArray(ids) ? ids : [ids])
    .map((id) => String(id).trim())
    .filter(Boolean);
};

/**
 * @param {object} options
 * @param {string|string[]} [options.levelIds]
 * @param {string|string[]} [options.tsids]
 * @param {string} [options.office]
 * @param {string} [options.begin]
 * @param {string} [options.end]
 * @param {string} [options.unit]
 * @param {string} [options.interval]
 * @param {string} [options.timezone]
 * @param {boolean} [options.trim]
 * @param {number} [options.pageSize]
 * @param {string} [options.cdaUrl]
 * @param {*} [options.levelsApi]
 * @param {*} [options.timeSeriesApi]
 * @param {(completed: number, total: number) => void} [options.onProgress]
 */
const loadBasinPieData = async ({
  levelIds = [],
  tsids = [],
  office = undefined,
  begin = undefined,
  end = undefined,
  unit = "ac-ft",
  interval = "1Hour",
  timezone = "UTC",
  trim = true,
  pageSize = undefined,
  cdaUrl = undefined,
  levelsApi = undefined,
  timeSeriesApi = undefined,
  onProgress = undefined,
}) => {
  const normalizedLevelIds = normalizeIds(levelIds);
  const normalizedTsids = normalizeIds(tsids);
  const total = normalizedLevelIds.length + normalizedTsids.length;

  if (total > 0 && !office) {
    throw new Error("You must specify a 3 letter ID for the office");
  }

  const requestEnd = end ?? new Date().toISOString();
  const parsedEnd = new Date(requestEnd).getTime();
  const requestBegin =
    begin ??
    new Date(
      (Number.isFinite(parsedEnd) ? parsedEnd : Date.now()) - 3 * 60 * 60 * 1000,
    ).toISOString();
  const configuration = new Configuration({
    ...(cdaUrl ? { basePath: cdaUrl } : {}),
    headers: { accept: "application/json;version=2" },
  });
  const resolvedLevelsApi = levelsApi ?? new LevelsApi(configuration);
  const resolvedTimeSeriesApi = timeSeriesApi ?? new TimeSeriesApi(configuration);
  let levelCompleted = 0;
  let timeSeriesCompleted = 0;
  const reportProgress = () =>
    onProgress?.(levelCompleted + timeSeriesCompleted, total);

  const levelDataPromise = fetchCdaLevelValues({
    levelIds: normalizedLevelIds,
    cdaParams: {
      office,
      unit,
      interval,
      begin: requestBegin,
      end: requestEnd,
      timezone,
    },
    levelsApi: resolvedLevelsApi,
    onProgress: (completed) => {
      levelCompleted = completed;
      reportProgress();
    },
  });
  const tsDataPromise = Promise.all(
    normalizedTsids.map(async (name) => {
      try {
        const result = await resolvedTimeSeriesApi.getTimeSeries({
          name,
          office,
          unit,
          begin: requestBegin,
          end: requestEnd,
          timezone,
          trim,
          pageSize,
        });
        return [name, getLatestEntry(result)];
      } finally {
        timeSeriesCompleted += 1;
        reportProgress();
      }
    }),
  ).then((entries) =>
    Object.fromEntries(entries.filter((entry) => entry[1] !== undefined)),
  );

  const [levelData, tsData] = await Promise.all([levelDataPromise, tsDataPromise]);
  return { levelData, tsData };
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
    const missing = storage === null;

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

/**
 * @typedef {Object} BasinPieProps
 * @property {string[]} [projects]
 * @property {"conservation"|"flood"} [pool]
 * @property {Record<string, number|Array<unknown>|null>} [levelData]
 * @property {Record<string, number|Array<unknown>|null>} [tsData]
 * @property {Record<string, number|Array<unknown>|null>} [timeSeriesData]
 * @property {string|string[]} [levelIds]
 * @property {string|string[]} [tsids]
 * @property {string} [office]
 * @property {string} [begin]
 * @property {string} [end]
 * @property {string} [unit]
 * @property {string} [interval]
 * @property {string} [timezone]
 * @property {boolean} [trim]
 * @property {number} [pageSize]
 * @property {string} [cdaUrl]
 * @property {{topOfFlood: string, topOfConservation: string, topOfInactive: string}} [levelIdSuffixes]
 * @property {{flood: string, conservation: string}} [timeSeriesIdSuffixes]
 * @property {string[]} [colors]
 * @property {boolean} [isPending]
 * @property {Error|string} [error]
 * @property {number} [progress]
 * @property {string} [asOf]
 * @property {string} [title]
 * @property {string} [caption]
 * @property {(projectId: string) => void} [onProjectSelect]
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [viewBoxWidth]
 * @property {number} [viewBoxHeight]
 * @property {number} [centerX]
 * @property {number} [centerY]
 * @property {number} [fontSize]
 * @property {number} [strokeWidth]
 * @property {number} [hoverOffset]
 * @property {string} [ariaLabel]
 * @property {string} [id]
 * @property {string} [className]
 * @property {import("react").CSSProperties} [style]
 */

/** @param {BasinPieProps} props */
const BasinPie = ({
  projects = [],
  pool = "conservation",
  levelData,
  tsData,
  timeSeriesData,
  levelIds,
  tsids,
  office,
  begin,
  end,
  unit = "ac-ft",
  interval = "1Hour",
  timezone = "UTC",
  trim = true,
  pageSize,
  cdaUrl,
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
  const providedCdaUrl = useCdaUrl();
  const resolvedCdaUrl = cdaUrl ?? providedCdaUrl;
  const levelIdsKey = JSON.stringify(normalizeIds(levelIds));
  const tsidsKey = JSON.stringify(normalizeIds(tsids));
  const normalizedLevelIds = useMemo(() => JSON.parse(levelIdsKey), [levelIdsKey]);
  const normalizedTsids = useMemo(() => JSON.parse(tsidsKey), [tsidsKey]);
  const directTsData = tsData !== undefined ? tsData : timeSeriesData;
  const needsLevelFetch = levelData === undefined && normalizedLevelIds.length > 0;
  const needsTimeSeriesFetch = directTsData === undefined && normalizedTsids.length > 0;
  const requiresOffice = needsLevelFetch || needsTimeSeriesFetch;
  const isOfficeMissing = requiresOffice && !office;
  const [fetchedLevelData, setFetchedLevelData] = useState();
  const [fetchedTsData, setFetchedTsData] = useState();
  const [fetchError, setFetchError] = useState(null);
  const [fetchProgress, setFetchProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!requiresOffice || isOfficeMissing) {
      setIsFetching(false);
      return;
    }

    let cancelled = false;
    setIsFetching(true);
    setFetchError(null);
    setFetchProgress(0);
    if (needsLevelFetch) setFetchedLevelData(undefined);
    if (needsTimeSeriesFetch) setFetchedTsData(undefined);

    loadBasinPieData({
      levelIds: needsLevelFetch ? normalizedLevelIds : [],
      tsids: needsTimeSeriesFetch ? normalizedTsids : [],
      office,
      begin,
      end,
      unit,
      interval,
      timezone,
      trim,
      pageSize,
      cdaUrl: resolvedCdaUrl,
      onProgress: (completed, total) => {
        if (!cancelled && total > 0) {
          setFetchProgress(Math.round((completed / total) * 100));
        }
      },
    })
      .then((result) => {
        if (cancelled) return;
        if (needsLevelFetch) setFetchedLevelData(result.levelData);
        if (needsTimeSeriesFetch) setFetchedTsData(result.tsData);
      })
      .catch((caughtError) => {
        if (!cancelled) setFetchError(caughtError);
      })
      .finally(() => {
        if (!cancelled) setIsFetching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    begin,
    end,
    interval,
    needsLevelFetch,
    needsTimeSeriesFetch,
    normalizedLevelIds,
    normalizedTsids,
    office,
    isOfficeMissing,
    pageSize,
    requiresOffice,
    resolvedCdaUrl,
    timezone,
    trim,
    unit,
  ]);

  const resolvedLevelData = levelData !== undefined ? levelData : fetchedLevelData;
  const resolvedTsData = directTsData !== undefined ? directTsData : fetchedTsData;
  const resolvedError =
    error ||
    (isOfficeMissing
      ? new Error("You must specify a 3 letter ID for the office")
      : null) ||
    fetchError;
  const resolvedPending =
    isPending ||
    isFetching ||
    (needsLevelFetch && fetchedLevelData === undefined && !resolvedError) ||
    (needsTimeSeriesFetch && fetchedTsData === undefined && !resolvedError);
  const resolvedProgress = requiresOffice ? fetchProgress : progress;

  if (resolvedError) {
    return (
      <div role="alert">Error: {resolvedError?.message || String(resolvedError)}</div>
    );
  }

  if (resolvedPending) {
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
            Math.max(
              0,
              Number.isFinite(resolvedProgress) ? Math.round(resolvedProgress) : 0,
            ),
          )}
          %
        </div>
      </Skeleton>
    );
  }

  if (pool !== "conservation" && pool !== "flood") {
    return <div role="alert">Pool must be either conservation or flood.</div>;
  }

  const model = createBasinPieModel({
    projects,
    pool,
    levelData: resolvedLevelData,
    timeSeriesData: resolvedTsData,
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
  loadBasinPieData,
  normalizeIds,
};
export default BasinPie;
