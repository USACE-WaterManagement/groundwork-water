import { useMemo } from "react";
import {
  useQueries,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import { GetTimeSeriesRequest, TimeSeries, TimeSeriesApi } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface UseCdaTimeSeriesParams {
  cdaParams: GetTimeSeriesRequest[];
  cdaUrl?: string;
  // Ensure all generics are present to avoid errors related to `unknown` types
  queryOptions?: Partial<UseQueryOptions<TimeSeries, Error, TimeSeries, QueryKey>>;
}

// Explicitly type the query options to ensure compatibility
type QOpts = UseQueryOptions<TimeSeries, Error, TimeSeries, QueryKey>;
type BaseReq = Omit<GetTimeSeriesRequest, "name">;

function normalizeTsids(name?: string | string[]): string[] {
  if (!name) return [];
  if (Array.isArray(name)) return name.map((s) => s.trim()).filter(Boolean);
  return name
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Fetch multiple time series in parallel with TanStack's useQueries.
 * Returns the array of per-query results directly.
 */
export default function useCdaMultiTimeSeries({
  cdaParams,
  cdaUrl,
  queryOptions,
}: UseCdaTimeSeriesParams): UseQueryResult<TimeSeries, Error>[] {
  const config = useCdaConfig("v2", cdaUrl);

  if (!Array.isArray(cdaParams)) {
    cdaParams = [cdaParams];
  }
  // Stable API client across renders unless config changes
  const TIME_SERIES_API = useMemo(() => new TimeSeriesApi(config), [config]);

  // Normalize the names to an array of TSIDs
  const TIME_SERIES_IDS = useMemo(() => {
    return (cdaParams ?? []).flatMap(({ name, ...rest }) => {
      const baseReq: BaseReq = rest;
      const tsids = normalizeTsids(name);
      return tsids.map((tsid) => ({ baseReq, tsid }));
    });
  }, [cdaParams]);

  // Prevent unnecessary queries if no TSIDs are provided
  const enabled = TIME_SERIES_IDS.length > 0;

  const queries = useQueries({
    queries: TIME_SERIES_IDS.map<QOpts>(({ baseReq, tsid }) => ({
      queryKey: ["cda", "timeseries", JSON.stringify(baseReq), tsid],
      queryFn: () => TIME_SERIES_API.getTimeSeries({ ...baseReq, name: tsid }),
      enabled,
      ...(queryOptions || {}),
    })),
  });

  return queries;
}

export { useCdaMultiTimeSeries };
