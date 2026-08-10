import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormContext } from "../FormContext";
import {
  resolveStrategy,
  seriesKey,
  selectValuesForCells,
  strategyNeedsFuture,
  strategyNeedsPast,
  useNearestSeriesData,
} from "./useLoadNearestValues";

/**
 * Build the registration payload for a set of cells.
 *
 * Serialized to a string so identical needs from different components collapse
 * to one registry entry, and so re-renders that produce an equal need don't
 * churn the fetch plan.
 */
function buildSpecKey({ columns, timeoffsets, strategy, defaultUnits }) {
  const seen = new Set();
  const series = [];
  (columns ?? []).forEach((column) => {
    if (!column?.tsid) return;
    const units = column.units || defaultUnits;
    const key = seriesKey(column.tsid, units);
    if (seen.has(key)) return;
    seen.add(key);
    series.push({ tsid: column.tsid, units });
  });

  const offsets = [...new Set(timeoffsets ?? [])].sort((a, b) => a - b);
  if (series.length === 0 || offsets.length === 0) return null;

  series.sort((a, b) =>
    seriesKey(a.tsid, a.units).localeCompare(seriesKey(b.tsid, b.units)),
  );
  return JSON.stringify({ series, offsets, strategy });
}

/**
 * Form-level orchestrator for nearest-value loading.
 *
 * Inputs declare what they need (`useNearestValues` below); this collects every
 * declaration, unions them into a single fetch plan, and issues one request per
 * distinct tsid+units - no matter how many components asked for it. Two tables
 * that overlap on a TSID share one request instead of racing two.
 *
 * Called by CWMSForm; the returned object goes on FormContext.
 */
export function useNearestValueStore({
  office,
  cdaUrl,
  getTimestampForInput,
  baseTimestamp,
}) {
  // specKey -> refcount. A ref (not state) so registering doesn't itself force a
  // render; `specVersion` is the render signal, bumped only when the set of
  // distinct needs actually changes.
  const needsRef = useRef(new Map());
  const [specVersion, setSpecVersion] = useState(0);

  const registerDataNeed = useCallback((specKey) => {
    if (!specKey) return undefined;
    const needs = needsRef.current;
    const next = (needs.get(specKey) ?? 0) + 1;
    needs.set(specKey, next);
    // Only a brand new need changes the plan; a second claimant of an identical
    // need is already covered by the request the first one triggered.
    if (next === 1) setSpecVersion((v) => v + 1);

    return () => {
      const current = needsRef.current.get(specKey) ?? 0;
      if (current <= 1) {
        needsRef.current.delete(specKey);
        setSpecVersion((v) => v + 1);
      } else {
        needsRef.current.set(specKey, current - 1);
      }
    };
  }, []);

  // Union every registered need into one plan. Reading a ref inside useMemo is
  // safe here because specVersion changes exactly when the ref's contents do.
  const plan = useMemo(() => {
    const seriesMap = new Map();
    const offsets = new Set();
    let needsPast = false;
    let needsFuture = false;

    for (const specKey of needsRef.current.keys()) {
      let spec;
      try {
        spec = JSON.parse(specKey);
      } catch {
        continue;
      }
      spec.series?.forEach((entry) => {
        seriesMap.set(seriesKey(entry.tsid, entry.units), entry);
      });
      spec.offsets?.forEach((offset) => offsets.add(offset));
      // The window must satisfy every registered strategy: if any field wants
      // "next" we need future data, even if the rest only want "prev".
      needsPast = needsPast || strategyNeedsPast(spec.strategy);
      needsFuture = needsFuture || strategyNeedsFuture(spec.strategy);
    }

    return {
      series: [...seriesMap.values()],
      offsets: [...offsets].sort((a, b) => a - b),
      needsPast,
      needsFuture,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specVersion]);

  // Target instants for every offset any input cares about. Keyed by offset so
  // consumers don't each have to call getTimestampForInput (which is not
  // referentially stable) inside their own memos.
  const targetMsByOffset = useMemo(() => {
    if (!getTimestampForInput) return {};
    const map = {};
    plan.offsets.forEach((offset) => {
      const ms = new Date(getTimestampForInput(offset)).getTime();
      if (Number.isFinite(ms)) map[offset] = ms;
    });
    return map;
    // baseTimestamp is what actually determines the output of
    // getTimestampForInput; depending on it keeps this stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, baseTimestamp, getTimestampForInput]);

  const targetsMs = useMemo(() => Object.values(targetMsByOffset), [targetMsByOffset]);

  const { seriesByKey, isPending, error } = useNearestSeriesData({
    series: plan.series,
    targetsMs,
    needsPast: plan.needsPast,
    needsFuture: plan.needsFuture,
    office,
    cdaUrl,
    enabled: plan.series.length > 0,
  });

  return useMemo(
    () => ({
      registerDataNeed,
      seriesByKey,
      targetMsByOffset,
      isPending,
      error,
    }),
    [registerDataNeed, seriesByKey, targetMsByOffset, isPending, error],
  );
}

/**
 * Declare that a component needs nearest values for a set of columns x offsets,
 * and read the resolved values back.
 *
 * The component does no fetching of its own: it registers the need with the
 * form-level store and reads its slice of the shared result. Returns the same
 * shape as the standalone `useLoadNearestValues` so components can swap between
 * them without changing how they consume the data.
 *
 * @returns {{values: Object, timestamps: Object, isPending: boolean, error: any}}
 *   values/timestamps are keyed `${tsid}_${offset}`.
 */
export function useNearestValues({
  columns = [],
  timeoffsets = [],
  strategy,
  defaultUnits = "EN",
  enabled = true,
}) {
  const context = useContext(FormContext) ?? {};
  const store = context.nearestValues;
  const resolvedStrategy = resolveStrategy(strategy);

  const specKey = useMemo(() => {
    if (!enabled) return null;
    return buildSpecKey({
      columns,
      timeoffsets,
      strategy: resolvedStrategy,
      defaultUnits,
    });
  }, [columns, timeoffsets, resolvedStrategy, defaultUnits, enabled]);

  const registerDataNeed = store?.registerDataNeed;

  useEffect(() => {
    if (!specKey || !registerDataNeed) return undefined;
    return registerDataNeed(specKey);
  }, [specKey, registerDataNeed]);

  const seriesByKey = store?.seriesByKey;
  const targetMsByOffset = store?.targetMsByOffset;

  const { values, timestamps } = useMemo(() => {
    if (!specKey || !seriesByKey) return { values: {}, timestamps: {} };
    return selectValuesForCells({
      columns,
      timeoffsets,
      defaultUnits,
      strategy: resolvedStrategy,
      seriesByKey,
      targetMsByOffset,
    });
  }, [
    specKey,
    seriesByKey,
    targetMsByOffset,
    columns,
    timeoffsets,
    defaultUnits,
    resolvedStrategy,
  ]);

  // Report pending only while *this* component's series are outstanding, so one
  // slow series elsewhere in the form doesn't leave every table pulsing.
  const isPending = useMemo(() => {
    if (!specKey || !store?.isPending) return false;
    if (!seriesByKey) return true;
    const spec = JSON.parse(specKey);
    return spec.series.some(
      (entry) => seriesByKey[seriesKey(entry.tsid, entry.units)] == null,
    );
  }, [specKey, store?.isPending, seriesByKey]);

  return { values, timestamps, isPending, error: store?.error ?? null };
}

export default useNearestValues;
