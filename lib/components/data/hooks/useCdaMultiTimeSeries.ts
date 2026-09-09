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
  defaults?: Omit<GetTimeSeriesRequest, "name">;
  cdaUrl?: string;
  // Ensure all generics are present to avoid errors related to `unknown` types
  queryOptions?: Partial<UseQueryOptions<TimeSeries, Error, TimeSeries, QueryKey>>;
}

type BaseReq = Omit<GetTimeSeriesRequest, "name">;

async function getTimeSeriesPages(
  timeSeriesApi: TimeSeriesApi,
  request: GetTimeSeriesRequest,
  signal?: AbortSignal,
): Promise<TimeSeries> {
  const firstPage = await timeSeriesApi.getTimeSeries(request, { signal });
  let currentPage = firstPage;
  const values = [...(firstPage.values ?? [])];
  const seenPages = new Set<string>();

  while (currentPage.nextPage) {
    const page = currentPage.nextPage;
    if (seenPages.has(page)) {
      throw new Error(`CDA returned a repeated time-series page token: ${page}`);
    }
    seenPages.add(page);

    currentPage = await timeSeriesApi.getTimeSeries({ ...request, page }, { signal });
    values.push(...(currentPage.values ?? []));
  }

  return { ...firstPage, values, nextPage: undefined };
}

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
  defaults,
  cdaUrl,
  queryOptions,
}: UseCdaTimeSeriesParams): UseQueryResult<TimeSeries, Error>[] {
  const config = useCdaConfig("v2", cdaUrl);

  if (!Array.isArray(cdaParams)) {
    cdaParams = [cdaParams];
  }
  // Stable API client across renders unless config changes
  const timeSeriesApi = useMemo(() => new TimeSeriesApi(config), [config]);

  // Normalize the names to an array of TSIDs
  const timeSeriesIds = useMemo(() => {
    return (cdaParams ?? []).reduce<Array<{ baseReq: BaseReq; tsid: string }>>(
      (requests, request) => {
        const { name, ...rest } = request;
        const baseReq: BaseReq = { ...(defaults ?? {}), ...rest };
        const tsids = normalizeTsids(name);
        tsids.forEach((tsid) => {
          requests.push({ baseReq, tsid });
        });
        return requests;
      },
      [],
    );
  }, [cdaParams, defaults]);

  // Prevent unnecessary queries if no TSIDs are provided
  const enabled = timeSeriesIds.length > 0;
  const queries = useMemo(
    () =>
      timeSeriesIds.map(({ baseReq, tsid }) => ({
        ...(queryOptions || {}),
        queryKey: ["cda", "timeseries", JSON.stringify(baseReq), tsid],
        queryFn: ({ signal }: { signal: AbortSignal }) =>
          getTimeSeriesPages(timeSeriesApi, { ...baseReq, name: tsid }, signal),
        enabled,
      })),
    [enabled, queryOptions, timeSeriesApi, timeSeriesIds],
  );

  return useQueries({ queries });
}

export { useCdaMultiTimeSeries };
