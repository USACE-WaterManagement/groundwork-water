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
  cdaParams: GetTimeSeriesRequest;
  cdaUrl?: string;
  // Ensure all generics are present to avoid errors related to `unknown` types
  queryOptions?: Partial<
    UseQueryOptions<TimeSeries, Error, TimeSeries, QueryKey>
  >;
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

  // Stable API client across renders unless config changes
  const timeseriesApi = useMemo(() => new TimeSeriesApi(config), [config]);

  // Normalize the names to an array of TSIDs
  // This handles both single and multiple TSIDs (array) in the `name` field
  const tsids = useMemo(() => {
    const raw = cdaParams?.name;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map((s) => s.trim()).filter(Boolean);
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [cdaParams?.name]);

  // Stable base key: exclude "name" so each query varies only by TSID
  const baseKey = useMemo(() => {
    const { name, ...rest } = cdaParams || {};
    return ["cda", "timeseries", JSON.stringify(rest)];
  }, [cdaParams]);

  // Prevent unnecessary queries if no TSIDs are provided
  const enabled = tsids.length > 0;

  // Explicitly type the query options to ensure compatibility
  type QOpts = UseQueryOptions<TimeSeries, Error, TimeSeries, QueryKey>;

  const queries = useQueries({
    queries: tsids.map<QOpts>((tsid) => ({
      queryKey: [...baseKey, tsid] as QueryKey,
      queryFn: () =>
        timeseriesApi.getTimeSeries({
          ...cdaParams,
          name: tsid,
        }),
      enabled,
      ...(queryOptions || {}),
    })),
  }) as UseQueryResult<TimeSeries, Error>[];

  return queries;
}

export { useCdaMultiTimeSeries };
