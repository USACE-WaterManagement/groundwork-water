import { useMemo, useEffect, useState } from "react";
import useCdaMultiTimeSeries from "../../hooks/useCdaMultiTimeSeries";
import useCdaCatalog from "../../hooks/useCdaCatalog";

const VALID_STRATEGIES = ["prev", "next", "nearest"];

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
  const shouldFetch =
    enabled && !!office && columns.length > 0 && timeoffsets.length > 0;

  // Callers overload `loadNearest` as both the enable flag and the strategy, so a
  // non-string value (e.g. `loadNearest={true}`) can arrive here. Fall back to "prev".
  const resolvedStrategy = VALID_STRATEGIES.includes(strategy) ? strategy : "prev";

  const targetTimestamps = useMemo(() => {
    if (!getTimestampForInput) return {};
    const map = {};
    timeoffsets.forEach((offset) => {
      map[offset] = getTimestampForInput(offset);
    });
    return map;
  }, [timeoffsets, getTimestampForInput]);

  const [latestDates, setLatestDates] = useState({});

  // Build a window around the user's selected datetime for the initial fetch.
  // If no data exists in this window, the catalog extent fallback kicks in.
  const tsParams = useMemo(() => {
    if (!shouldFetch) return [];

    const timestamps = timeoffsets.map((offset) => {
      const iso = targetTimestamps[offset];
      return iso ? new Date(iso).getTime() : Date.now();
    });
    const minTs = Math.min(...timestamps);
    const maxTs = Math.max(...timestamps);
    const DAY_MS = 24 * 60 * 60 * 1000;
    const defaultBegin = new Date(minTs - DAY_MS).toISOString();
    const defaultEnd = new Date(maxTs + DAY_MS).toISOString();

    return columns.map((column) => {
      const tsid = column.tsid;
      const unit = column.units || defaultUnits;
      const date = latestDates[tsid];
      return {
        name: tsid,
        office,
        units: unit,
        begin: date
          ? new Date(new Date(date).getTime() - DAY_MS).toISOString()
          : defaultBegin,
        end: date || defaultEnd,
      };
    });
  }, [
    columns,
    office,
    defaultUnits,
    shouldFetch,
    latestDates,
    timeoffsets,
    targetTimestamps,
  ]);

  const tsResults = useCdaMultiTimeSeries({
    cdaParams: tsParams,
    cdaUrl,
    queryOptions: { enabled: shouldFetch && tsParams.length > 0 },
  });

  const tsDone = tsResults.every((r) => !r.isPending);

  // Identify TSIDs that returned no data and haven't been looked up in the catalog yet
  const tsidsNeedingCatalog = useMemo(() => {
    if (!tsDone) return [];
    return columns
      .filter((column, i) => {
        if (latestDates[column.tsid]) return false;
        const result = tsResults[i];
        if (!result?.data?.values) return true;
        return result.data.values.filter((e) => e[1] !== null).length === 0;
      })
      .map((column) => column.tsid);
  }, [tsDone, tsResults, columns, latestDates]);

  const catalogLike = useMemo(() => {
    if (tsidsNeedingCatalog.length === 0) return null;
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (tsidsNeedingCatalog.length === 1) return escape(tsidsNeedingCatalog[0]);
    return tsidsNeedingCatalog.map(escape).join("|");
  }, [tsidsNeedingCatalog]);

  const catalogResult = useCdaCatalog({
    cdaParams: {
      dataset: "TIMESERIES",
      office,
      like: catalogLike || "",
    },
    cdaUrl,
    queryOptions: {
      enabled: shouldFetch && tsidsNeedingCatalog.length > 0 && !!catalogLike,
    },
  });

  // Extract latestTime from catalog extents, matching useCdaLatestValue's approach.
  // Setting latestDates triggers tsParams to recompute with begin/end pinned to
  // the extent timestamp, causing useCdaMultiTimeSeries to re-fetch those TSIDs.
  useEffect(() => {
    if (!catalogResult.data?.entries) return;

    const newDates = {};
    for (const entry of catalogResult.data.entries) {
      const name = entry.name;
      if (!name || !tsidsNeedingCatalog.includes(name)) continue;
      const latestTime = entry.extents?.[0]?.latestTime;
      if (!latestTime) continue;
      const latestTimeIso =
        typeof latestTime === "string" ? latestTime : latestTime.toISOString();
      newDates[name] = latestTimeIso;
    }

    if (Object.keys(newDates).length === 0) return;

    setLatestDates((prev) => {
      const merged = { ...prev, ...newDates };
      if (JSON.stringify(merged) === JSON.stringify(prev)) return prev;
      return merged;
    });
  }, [catalogResult.data, tsidsNeedingCatalog]);

  const isPending = useMemo(() => {
    if (!shouldFetch) return false;
    if (!tsDone) return true;
    if (tsidsNeedingCatalog.length > 0 && catalogResult.isPending) return true;
    return false;
  }, [shouldFetch, tsDone, tsidsNeedingCatalog, catalogResult.isPending]);

  const { values, timestamps } = useMemo(() => {
    if (!shouldFetch) return { values: {}, timestamps: {} };

    const vals = {};
    const ts = {};
    columns.forEach((column, colIndex) => {
      const tsData = tsResults[colIndex]?.data;

      timeoffsets.forEach((offset) => {
        const key = `${column.tsid}_${offset}`;
        const targetIso = targetTimestamps[offset];
        if (!targetIso || !tsData?.values) {
          vals[key] = null;
          ts[key] = null;
          return;
        }
        const targetMs = new Date(targetIso).getTime();
        const selected = selectNearestValue(tsData.values, targetMs, resolvedStrategy);
        vals[key] = selected ? selected.value : null;
        ts[key] = selected ? selected.timestamp : null;
      });
    });

    return { values: vals, timestamps: ts };
  }, [
    shouldFetch,
    columns,
    timeoffsets,
    targetTimestamps,
    resolvedStrategy,
    tsResults,
  ]);

  return { values, timestamps, isPending };
}
