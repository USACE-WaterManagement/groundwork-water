import { useMemo, useEffect, useState } from "react";
import useCdaMultiTimeSeries from "../../hooks/useCdaMultiTimeSeries";
import useCdaRecentValues from "../../hooks/useCdaRecentValues";

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

// Shared empty objects so an unpinned render keeps referential identity and
// doesn't retrigger the memos that depend on it.
const EMPTY_DATES = {};
const EMPTY_PIN = { key: null, dates: EMPTY_DATES };

/**
 * Convert a `lookback` / `lookahead` setting to milliseconds.
 *
 * The public API is in days because that is how operators talk about it ("this
 * gage reports weekly"); everything below this line works in milliseconds.
 * Fractions are allowed, so 0.5 is twelve hours.
 *
 * @param {number} days
 * @param {number} fallbackMs - used when `days` is absent or not a usable number
 * @returns {number}
 */
export function daysToMs(days, fallbackMs = DAY_MS) {
  const value = typeof days === "string" ? Number(days) : days;
  if (!Number.isFinite(value) || value <= 0) return fallbackMs;
  return value * DAY_MS;
}

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
 * Combine two declarations of the same series into one fetch entry.
 *
 * Two components can name the same series with different lookbacks. They still
 * share a single request, so the window has to satisfy the most demanding of
 * them - the widest wins.
 */
export function mergeSeriesWindows(existing, incoming) {
  if (!existing) return incoming;
  return {
    ...existing,
    lookbackMs: Math.max(existing.lookbackMs ?? 0, incoming.lookbackMs ?? 0),
    lookaheadMs: Math.max(existing.lookaheadMs ?? 0, incoming.lookaheadMs ?? 0),
  };
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

  // The window each series would be fetched over before any pinning. Kept
  // per-series because lookback is a per-series setting: one slow-reporting
  // gate shouldn't widen the window for every other column in the form.
  const baseWindows = useMemo(() => {
    const map = {};
    if (!shouldFetch) return map;

    const minTs = Math.min(...targetsMs);
    const maxTs = Math.max(...targetsMs);

    series.forEach((entry) => {
      const back = Number.isFinite(entry.lookbackMs) ? entry.lookbackMs : lookbackMs;
      const forward = Number.isFinite(entry.lookaheadMs)
        ? entry.lookaheadMs
        : lookaheadMs;
      map[seriesKey(entry.tsid, entry.units)] = {
        beginMs: needsPast ? minTs - back : minTs,
        endMs: needsFuture ? maxTs + forward : maxTs,
        back,
      };
    });

    return map;
  }, [series, targetsMs, needsPast, needsFuture, lookbackMs, lookaheadMs, shouldFetch]);

  // A pin is only meaningful for the window it was derived from. Shifting the
  // form's calendar (or widening lookback) produces a different window, and the
  // old pin must not survive it - otherwise the fetch stops following the date
  // the operator picked and every later change is served from a frozen window.
  const windowKey = useMemo(() => JSON.stringify(baseWindows), [baseWindows]);
  const [pinned, setPinned] = useState(EMPTY_PIN);
  const latestDates = pinned.key === windowKey ? pinned.dates : EMPTY_DATES;

  const tsParams = useMemo(() => {
    if (!shouldFetch) return [];

    return series.map(({ tsid, units }) => {
      const key = seriesKey(tsid, units);
      const window = baseWindows[key];
      const pin = latestDates[key];
      return {
        name: tsid,
        office,
        units,
        begin: pin
          ? new Date(new Date(pin).getTime() - window.back).toISOString()
          : new Date(window.beginMs).toISOString(),
        end: pin || new Date(window.endMs).toISOString(),
        pageSize,
      };
    });
  }, [series, baseWindows, latestDates, office, pageSize, shouldFetch]);

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

  // Identify series that returned no data and haven't had their last-value
  // timestamp looked up yet.
  const seriesNeedingLatest = useMemo(() => {
    if (!tsDone) return [];
    return series.filter((entry, i) => {
      if (latestDates[seriesKey(entry.tsid, entry.units)]) return false;
      const result = tsResults[i];
      if (!result?.data?.values) return true;
      return result.data.values.filter((e) => e[1] !== null).length === 0;
    });
  }, [tsDone, tsResults, series, latestDates]);

  // Ask CDA for the most recent value of each empty series. `/timeseries/recent`
  // takes an explicit TSID list rather than a pattern, so there is no regex for
  // the database to compile - a form with dozens of series cannot trip
  // ORA-12733 the way a catalog `like` alternation could.
  const recentTsids = useMemo(
    () => [...new Set(seriesNeedingLatest.map((entry) => entry.tsid))],
    [seriesNeedingLatest],
  );

  const recentResult = useCdaRecentValues({
    tsIds: recentTsids,
    office,
    cdaUrl,
    enabled: shouldFetch && recentTsids.length > 0,
    staleTime,
  });

  // Pinning triggers tsParams to recompute with begin/end around the series'
  // last value, causing useCdaMultiTimeSeries to re-fetch it. Only the
  // timestamp is used - the value comes back from that fetch, so the selection
  // rules stay in one place.
  useEffect(() => {
    const recent = recentResult.data;
    if (!recent || Object.keys(recent).length === 0) return;

    const newDates = {};
    for (const entry of seriesNeedingLatest) {
      const key = seriesKey(entry.tsid, entry.units);
      const ms = recent[entry.tsid]?.dateTimeMs;
      if (typeof ms !== "number") continue;
      // Only reach back to a series that ends *before* the window we asked
      // about. A last value sitting inside or after an empty window means we
      // are looking at a gap, and that value says nothing about what sits next
      // to the target - jumping to it would hand back a value from the wrong
      // side of the operator's date. Crossing a gap is what `lookback` is for.
      const beginMs = baseWindows[key]?.beginMs;
      if (!Number.isFinite(beginMs) || ms >= beginMs) continue;
      newDates[key] = new Date(ms).toISOString();
    }

    if (Object.keys(newDates).length === 0) return;

    setPinned((prev) => {
      const base = prev.key === windowKey ? prev.dates : EMPTY_DATES;
      const merged = { ...base, ...newDates };
      if (prev.key === windowKey && JSON.stringify(merged) === JSON.stringify(base)) {
        return prev;
      }
      return { key: windowKey, dates: merged };
    });
  }, [recentResult.data, seriesNeedingLatest, baseWindows, windowKey]);

  const isPending = useMemo(() => {
    if (!shouldFetch) return false;
    if (!tsDone) return true;
    if (seriesNeedingLatest.length > 0 && recentResult.isPending) return true;
    return false;
  }, [shouldFetch, tsDone, seriesNeedingLatest, recentResult.isPending]);

  // Surface failures. Without this a 401 or a bad TSID is indistinguishable
  // from "no data exists" - the field just stays empty.
  const error = useMemo(() => {
    const failed = tsResults.find((r) => r.error);
    return failed?.error ?? recentResult.error ?? null;
  }, [tsResults, recentResult.error]);

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
  lookback,
  lookahead,
  enabled = true,
}) {
  const resolvedStrategy = resolveStrategy(strategy);

  const series = useMemo(() => {
    const seen = new Map();
    (columns ?? []).forEach((column) => {
      if (!column?.tsid) return;
      const units = column.units || defaultUnits;
      const key = seriesKey(column.tsid, units);
      const entry = {
        tsid: column.tsid,
        units,
        lookbackMs: daysToMs(column.lookback ?? lookback),
        lookaheadMs: daysToMs(column.lookahead ?? lookahead),
      };
      // A series named by two columns with different lookbacks is fetched once,
      // over the wider of the two windows.
      seen.set(key, mergeSeriesWindows(seen.get(key), entry));
    });
    return [...seen.values()];
  }, [columns, defaultUnits, lookback, lookahead]);

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

  const rows = normalizeRows(timeoffsets);

  columns.forEach((column) => {
    if (!column?.tsid) return;
    const units = column.units || defaultUnits;
    const data = seriesByKey[seriesKey(column.tsid, units)];

    rows.forEach((row) => {
      const key = cellKeyFor(column, row);
      const targetMs = targetMsByOffset[row.offset];
      if (!Number.isFinite(targetMs) || !data?.values) {
        values[key] = null;
        timestamps[key] = null;
        return;
      }
      // A column or row may pick its own strategy; the fetch is shared anyway.
      const cellStrategy = resolveStrategy(
        resolveCellSetting(column, row, "loadNearest", strategy),
      );
      const selected = selectNearestValue(data.values, targetMs, cellStrategy);
      values[key] = selected ? selected.value : null;
      timestamps[key] = selected ? selected.timestamp : null;
    });
  });

  return { values, timestamps };
}

/**
 * Identify a cell within a component.
 *
 * Defaults to tsid and the raw offset so existing callers are unaffected, but a
 * column or a row may set an `id` to claim its own identity. That is what lets
 * two of them reference the same series and instant - a read-only "previous
 * value" beside an editable entry field - without sharing one cell's state.
 */
export function cellKeyFor(column, row) {
  const rowPart =
    typeof row === "object" && row !== null ? (row.id ?? row.offset) : row;
  return `${column?.id ?? column?.tsid}_${rowPart}`;
}

/**
 * Accept `timeoffsets` as either plain numbers or row objects, and return row
 * specs. A row object may carry its own `id`, `loadNearest` and `disabled`,
 * mirroring what a column can override.
 */
export function normalizeRows(timeoffsets = []) {
  return timeoffsets.map((entry) =>
    typeof entry === "object" && entry !== null ? entry : { offset: entry },
  );
}

/**
 * Resolve a setting for one cell. Most specific wins: column, then row, then
 * the component-wide default.
 */
export function resolveCellSetting(column, row, key, fallback) {
  return column?.[key] ?? row?.[key] ?? fallback;
}

/**
 * Render a loaded value the way the input displays it, so comparisons are made
 * on what the operator actually sees rather than on the raw float.
 */
export function formatLoadedValue(raw, precision) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== "number") return String(raw);
  return parseFloat(raw.toFixed(precision)).toString();
}

/**
 * Describe one cell relative to the value it started with.
 *
 * Deliberately derived by comparison rather than by tracking edits: typing the
 * same number back is not a change, and a tracked flag would claim it was.
 *
 * The baseline is the caller-supplied default where there is one, otherwise the
 * fetched value - a default takes precedence over loading, so a defaulted cell
 * has never been touched by the operator even though its value differs from
 * what CDA returned. Without either there is no baseline and `changed` stays
 * false, since anything typed into an empty cell is simply its first value.
 *
 * @returns {{value: string, loadedValue: string|null, defaultValue: string|null,
 *   baseline: string|null, loaded: boolean, changed: boolean, prefilled: boolean}}
 */
export function getCellStatus({ value, loadedRaw, precision = 2, defaultValue }) {
  const loadedValue = formatLoadedValue(loadedRaw, precision);
  const hasDefault = defaultValue !== null && defaultValue !== undefined;
  const baseline = hasDefault ? String(defaultValue) : loadedValue;
  const current = value ?? "";
  const changed = baseline !== null ? current !== baseline : false;

  return {
    value: current,
    loadedValue,
    defaultValue: hasDefault ? String(defaultValue) : null,
    baseline,
    loaded: loadedValue !== null,
    changed,
    prefilled: baseline !== null && !changed,
  };
}
