import { useMemo, useEffect, useState } from "react";
import useCdaMultiTimeSeries from "../../hooks/useCdaMultiTimeSeries";
import useCdaCatalog from "../../hooks/useCdaCatalog";

const VALID_STRATEGIES = ["prev", "next", "nearest"];
const DAY_MS = 24 * 60 * 60 * 1000;

// CDA applies its own default page size when none is given, and pagination
// truncates from `begin` forward. For the "prev" strategy the value we want is
// the *last* one in the window, so a truncated page would silently hand back a
// stale value. Ask for a page large enough that a realistic window fits.
const DEFAULT_PAGE_SIZE = 5000;

// Values for a given instant do not change minute to minute. Without this the
// host app's QueryClient defaults decide, and an app that leaves
// refetchOnWindowFocus on re-fetches every series each time the operator
// alt-tabs back.
const DEFAULT_STALE_TIME = 60 * 1000;

/**
 * Normalize a caller-supplied strategy.
 *
 * Callers overload `loadNearest` as both the enable flag and the strategy, so a
 * non-string value (e.g. `loadNearest={true}`) can arrive here. Fall back to "prev".
 */
export function resolveStrategy(strategy) {
  return VALID_STRATEGIES.includes(strategy) ? strategy : "prev";
}

/**
 * Key a fetched series by TSID *and* units. The same TSID requested in
 * different unit systems is a different series - merging them would hand back
 * values in the wrong unit.
 */
export function seriesKey(tsid, units) {
  return `${tsid}|${units}`;
}

/**
 * Does this strategy need data before / after the target time? Used to trim the
 * fetch window: "prev" never looks at future values, so fetching a day of them
 * is pure waste.
 */
export function strategyNeedsPast(strategy) {
  return strategy === "prev" || strategy === "nearest";
}

export function strategyNeedsFuture(strategy) {
  return strategy === "next" || strategy === "nearest";
}

/**
 * Select the nearest value from a timeseries values array based on strategy.
 * @param {Array<[number, number|null, number]>} values - CDA timeseries values [timestamp_ms, value, qualityCode]
 * @param {number} targetMs - Target timestamp in milliseconds
 * @param {string} strategy - "prev", "next", or "nearest"
 * @returns {{ value: number, timestamp: number, qualityCode: number } | null}
 */
export function selectNearestValue(values, targetMs, strategy) {
  if (!values || values.length === 0) return null;

  const nonNull = values.filter((entry) => entry[1] !== null);
  if (nonNull.length === 0) return null;

  let best = null;

  if (strategy === "prev") {
    for (let i = nonNull.length - 1; i >= 0; i--) {
      if (nonNull[i][0] <= targetMs) {
        best = nonNull[i];
        break;
      }
    }
  } else if (strategy === "next") {
    for (let i = 0; i < nonNull.length; i++) {
      if (nonNull[i][0] >= targetMs) {
        best = nonNull[i];
        break;
      }
    }
  } else {
    let bestDiff = Infinity;
    for (const entry of nonNull) {
      const diff = Math.abs(entry[0] - targetMs);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = entry;
      }
    }
  }

  if (!best) return null;
  return { value: best[1], timestamp: best[0], qualityCode: best[2] };
}

/**
 * Merge locally-known points (e.g. values this form just submitted) into a
 * fetched series.
 *
 * CDA caches time series responses for several minutes, so a read issued right
 * after a write can hand back the pre-submit value. Seeding what we know we
 * wrote means the operator sees their own submission immediately.
 *
 * A seed wins over a fetched point at the same instant. That case is precisely
 * the one this exists for: submitting over an existing value leaves the cached
 * response still reporting the old number at that timestamp. Once CDA reports
 * the seeded value back, the caller is expected to drop the seed.
 *
 * @param {Array<[number, number|null, number]>} values - fetched values, ascending
 * @param {Map<number, number|string>} seeds - timestamp_ms -> value
 */
export function mergeSeededValues(values = [], seeds) {
  if (!seeds || seeds.size === 0) return values;

  const kept = values.filter((entry) => !seeds.has(entry[0]));
  const seeded = [];
  seeds.forEach((value, ms) => seeded.push([ms, value, 0]));

  // selectNearestValue walks the array in order, so keep it ascending.
  return [...kept, ...seeded].sort((a, b) => a[0] - b[0]);
}

/**
 * Fetch the raw series needed to resolve nearest values.
 *
 * This is the shared data layer: it knows nothing about form fields, columns or
 * cells. Callers hand it a de-duplicated list of series plus the target times
 * that need covering, and get back the fetched series keyed by tsid+units.
 * Picking a value out of a series is `selectNearestValue`'s job, which keeps
 * per-field strategies independent of the (shared) fetch.
 *
 * @param {Object} params
 * @param {Array<{tsid: string, units: string}>} params.series - de-duplicated series to fetch
 * @param {number[]} params.targetsMs - every target instant that must be covered
 * @param {boolean} params.needsPast - include a lookback window before the earliest target
 * @param {boolean} params.needsFuture - include a lookahead window after the latest target
 */
export function useNearestSeriesData({
  series = [],
  targetsMs = [],
  needsPast = true,
  needsFuture = false,
  office,
  cdaUrl,
  lookbackMs = DAY_MS,
  lookaheadMs = DAY_MS,
  pageSize = DEFAULT_PAGE_SIZE,
  staleTime = DEFAULT_STALE_TIME,
  enabled = true,
}) {
  const shouldFetch = enabled && !!office && series.length > 0 && targetsMs.length > 0;

  const [latestDates, setLatestDates] = useState({});

  // Build a window around the caller's target instants. If no data exists in
  // this window, the catalog extent fallback below kicks in.
  const tsParams = useMemo(() => {
    if (!shouldFetch) return [];

    const minTs = Math.min(...targetsMs);
    const maxTs = Math.max(...targetsMs);
    const defaultBegin = new Date(needsPast ? minTs - lookbackMs : minTs).toISOString();
    const defaultEnd = new Date(
      needsFuture ? maxTs + lookaheadMs : maxTs,
    ).toISOString();

    return series.map(({ tsid, units }) => {
      const date = latestDates[seriesKey(tsid, units)];
      return {
        name: tsid,
        office,
        units,
        begin: date
          ? new Date(new Date(date).getTime() - lookbackMs).toISOString()
          : defaultBegin,
        end: date || defaultEnd,
        pageSize,
      };
    });
  }, [
    series,
    targetsMs,
    needsPast,
    needsFuture,
    lookbackMs,
    lookaheadMs,
    office,
    pageSize,
    shouldFetch,
    latestDates,
  ]);

  const queryOptions = useMemo(
    () => ({ enabled: shouldFetch && tsParams.length > 0, staleTime }),
    [shouldFetch, tsParams.length, staleTime],
  );

  const tsResults = useCdaMultiTimeSeries({
    cdaParams: tsParams,
    cdaUrl,
    queryOptions,
  });

  const tsDone = tsResults.every((r) => !r.isPending);

  // Identify series that returned no data and haven't been looked up in the
  // catalog yet.
  const seriesNeedingCatalog = useMemo(() => {
    if (!tsDone) return [];
    return series.filter((entry, i) => {
      if (latestDates[seriesKey(entry.tsid, entry.units)]) return false;
      const result = tsResults[i];
      if (!result?.data?.values) return true;
      return result.data.values.filter((e) => e[1] !== null).length === 0;
    });
  }, [tsDone, tsResults, series, latestDates]);

  const catalogLike = useMemo(() => {
    if (seriesNeedingCatalog.length === 0) return null;
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tsids = [...new Set(seriesNeedingCatalog.map((s) => s.tsid))];
    // Anchor the alternation so the catalog returns the requested names rather
    // than everything they happen to be a substring of.
    return `^(${tsids.map(escape).join("|")})$`;
  }, [seriesNeedingCatalog]);

  const catalogResult = useCdaCatalog({
    cdaParams: {
      dataset: "TIMESERIES",
      office,
      like: catalogLike || "",
      pageSize: DEFAULT_PAGE_SIZE,
    },
    cdaUrl,
    queryOptions: {
      enabled: shouldFetch && seriesNeedingCatalog.length > 0 && !!catalogLike,
      staleTime,
    },
  });

  // Extract latestTime from catalog extents, matching useCdaLatestValue's approach.
  // Setting latestDates triggers tsParams to recompute with begin/end pinned to
  // the extent timestamp, causing useCdaMultiTimeSeries to re-fetch those series.
  useEffect(() => {
    if (!catalogResult.data?.entries) return;

    const latestByTsid = {};
    for (const entry of catalogResult.data.entries) {
      const name = entry.name;
      if (!name) continue;
      const latestTime = entry.extents?.[0]?.latestTime;
      if (!latestTime) continue;
      // Need to check if latestTime is already a string because React Query's
      // persister returns Date types as strings upon retrieval
      latestByTsid[name] =
        typeof latestTime === "string" ? latestTime : latestTime.toISOString();
    }

    const newDates = {};
    for (const entry of seriesNeedingCatalog) {
      const iso = latestByTsid[entry.tsid];
      if (iso) newDates[seriesKey(entry.tsid, entry.units)] = iso;
    }

    if (Object.keys(newDates).length === 0) return;

    setLatestDates((prev) => {
      const merged = { ...prev, ...newDates };
      if (JSON.stringify(merged) === JSON.stringify(prev)) return prev;
      return merged;
    });
  }, [catalogResult.data, seriesNeedingCatalog]);

  const isPending = useMemo(() => {
    if (!shouldFetch) return false;
    if (!tsDone) return true;
    if (seriesNeedingCatalog.length > 0 && catalogResult.isPending) return true;
    return false;
  }, [shouldFetch, tsDone, seriesNeedingCatalog, catalogResult.isPending]);

  // Surface failures. Without this a 401 or a bad TSID is indistinguishable
  // from "no data exists" - the field just stays empty.
  const error = useMemo(() => {
    const failed = tsResults.find((r) => r.error);
    return failed?.error ?? catalogResult.error ?? null;
  }, [tsResults, catalogResult.error]);

  const seriesByKey = useMemo(() => {
    const map = {};
    series.forEach((entry, i) => {
      map[seriesKey(entry.tsid, entry.units)] = tsResults[i]?.data ?? null;
    });
    return map;
  }, [series, tsResults]);

  return { seriesByKey, isPending, isError: !!error, error };
}

/**
 * Resolve nearest values for a set of columns x time offsets.
 *
 * Standalone form of the feature: it fetches only what this caller asked for.
 * Inside a CWMSForm prefer `useNearestValues`, which routes the same request
 * through the form-level orchestrator so overlapping components share one fetch.
 */
export default function useLoadNearestValues({
  columns,
  timeoffsets,
  strategy = "prev",
  getTimestampForInput,
  office,
  cdaUrl,
  defaultUnits = "EN",
  enabled = true,
}) {
  const resolvedStrategy = resolveStrategy(strategy);

  const series = useMemo(() => {
    const seen = new Set();
    const out = [];
    (columns ?? []).forEach((column) => {
      if (!column?.tsid) return;
      const units = column.units || defaultUnits;
      const key = seriesKey(column.tsid, units);
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ tsid: column.tsid, units });
    });
    return out;
  }, [columns, defaultUnits]);

  const targetTimestamps = useMemo(() => {
    if (!getTimestampForInput) return {};
    const map = {};
    (timeoffsets ?? []).forEach((offset) => {
      map[offset] = getTimestampForInput(offset);
    });
    return map;
  }, [timeoffsets, getTimestampForInput]);

  const targetsMs = useMemo(
    () =>
      Object.values(targetTimestamps)
        .map((iso) => new Date(iso).getTime())
        .filter((ms) => Number.isFinite(ms)),
    [targetTimestamps],
  );

  const { seriesByKey, isPending, error } = useNearestSeriesData({
    series,
    targetsMs,
    needsPast: strategyNeedsPast(resolvedStrategy),
    needsFuture: strategyNeedsFuture(resolvedStrategy),
    office,
    cdaUrl,
    enabled,
  });

  const { values, timestamps } = useMemo(
    () =>
      selectValuesForCells({
        columns,
        timeoffsets,
        defaultUnits,
        strategy: resolvedStrategy,
        seriesByKey,
        targetMsByOffset: Object.fromEntries(
          Object.entries(targetTimestamps).map(([offset, iso]) => [
            offset,
            new Date(iso).getTime(),
          ]),
        ),
      }),
    [
      columns,
      timeoffsets,
      defaultUnits,
      resolvedStrategy,
      seriesByKey,
      targetTimestamps,
    ],
  );

  return { values, timestamps, isPending, error };
}

/**
 * Project fetched series onto `${tsid}_${offset}` cell keys.
 *
 * Shared by the standalone hook and the orchestrator-backed one so both produce
 * identical output for the same inputs.
 */
export function selectValuesForCells({
  columns = [],
  timeoffsets = [],
  defaultUnits = "EN",
  strategy = "prev",
  seriesByKey = {},
  targetMsByOffset = {},
}) {
  const values = {};
  const timestamps = {};

  columns.forEach((column) => {
    if (!column?.tsid) return;
    const units = column.units || defaultUnits;
    const data = seriesByKey[seriesKey(column.tsid, units)];

    timeoffsets.forEach((offset) => {
      const key = `${column.tsid}_${offset}`;
      const targetMs = targetMsByOffset[offset];
      if (!Number.isFinite(targetMs) || !data?.values) {
        values[key] = null;
        timestamps[key] = null;
        return;
      }
      const selected = selectNearestValue(data.values, targetMs, strategy);
      values[key] = selected ? selected.value : null;
      timestamps[key] = selected ? selected.timestamp : null;
    });
  });

  return { values, timestamps };
}
