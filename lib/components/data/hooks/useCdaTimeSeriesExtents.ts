import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { CatalogApi, CatalogableEndpoint } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface UseCdaTimeSeriesExtentsParams {
  /** Exact TSIDs to look up. Duplicates and blanks are ignored. */
  tsIds: string[];
  office?: string;
  cdaUrl?: string;
  enabled?: boolean;
  staleTime?: number;
  maxPatternBytes?: number;
}

/**
 * Oracle limits regular-expression patterns to 512 bytes. Leave room for the
 * anchors and grouping syntax as well as any server-side pattern wrapping.
 */
export const DEFAULT_CATALOG_PATTERN_BYTES = 400;

const byteLength = (value: string) => new TextEncoder().encode(value).length;

export function escapeCatalogPattern(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build anchored catalog patterns without allowing a large form to exceed
 * Oracle's regex limit. A single unusually long TSID is still emitted so it is
 * not silently dropped.
 */
export function chunkCatalogPatterns(
  tsIds: string[],
  maxBytes: number = DEFAULT_CATALOG_PATTERN_BYTES,
): string[] {
  const patterns: string[] = [];
  let current: string[] = [];

  const finish = () => {
    if (current.length === 0) return;
    patterns.push(`^(${current.join("|")})$`);
    current = [];
  };

  for (const tsId of [...new Set(tsIds.filter(Boolean))]) {
    const escaped = escapeCatalogPattern(tsId);
    const candidate = `^(${[...current, escaped].join("|")})$`;
    if (current.length > 0 && byteLength(candidate) > maxBytes) finish();
    current.push(escaped);
  }

  finish();
  return patterns;
}

/**
 * Fetch all-time latest timestamps from catalog extents for an explicit TSID
 * list. Catalog only accepts a pattern, so requests are split into bounded,
 * anchored alternations to avoid ORA-12733 while retaining batching.
 */
export default function useCdaTimeSeriesExtents({
  tsIds,
  office,
  cdaUrl,
  enabled = true,
  staleTime,
  maxPatternBytes = DEFAULT_CATALOG_PATTERN_BYTES,
}: UseCdaTimeSeriesExtentsParams) {
  const config = useCdaConfig("v2", cdaUrl);
  const catalogApi = useMemo(() => new CatalogApi(config), [config]);
  const patterns = useMemo(
    () => chunkCatalogPatterns(tsIds ?? [], maxPatternBytes),
    [tsIds, maxPatternBytes],
  );
  const shouldFetch = enabled && !!office && patterns.length > 0;

  const queries = useMemo(
    () =>
      patterns.map((like) => ({
        queryKey: ["cda", "catalog", "timeseries-extents", office, like],
        queryFn: () =>
          catalogApi.getCatalogWithDataset({
            dataset: CatalogableEndpoint.Timeseries,
            office,
            like,
            includeExtents: true,
            excludeEmpty: true,
            pageSize: 5000,
          }),
        enabled: shouldFetch,
        ...(staleTime === undefined ? {} : { staleTime }),
      })),
    [catalogApi, office, patterns, shouldFetch, staleTime],
  );

  const results = useQueries({ queries });

  const data = useMemo(() => {
    const latestByTsid: Record<string, string> = {};
    results.forEach((result) => {
      result.data?.entries?.forEach((entry) => {
        if (!entry.name || !("extents" in entry)) return;
        const latestMs = Math.max(
          ...(entry.extents ?? []).map((extent) => {
            const latestTime = extent.latestTime;
            if (!latestTime) return Number.NEGATIVE_INFINITY;
            return latestTime instanceof Date
              ? latestTime.getTime()
              : Date.parse(latestTime as unknown as string);
          }),
        );
        if (!Number.isFinite(latestMs)) return;
        latestByTsid[entry.name] = new Date(latestMs).toISOString();
      });
    });
    return latestByTsid;
  }, [results]);

  const error = useMemo(
    () => results.find((result) => result.error)?.error ?? null,
    [results],
  );

  return {
    data,
    isPending: shouldFetch && results.some((result) => result.isPending),
    isFetching: results.some((result) => result.isFetching),
    isError: !!error,
    error,
  };
}

export { useCdaTimeSeriesExtents };
