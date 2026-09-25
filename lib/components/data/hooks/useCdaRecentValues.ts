import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { TimeSeriesApi, UnitSystem } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

export interface CdaRecentValue {
  /** The requested TSID, echoed back by CDA. */
  tsid: string;
  officeId?: string;
  unitId?: string;
  /** Timestamp of the most recent value, epoch milliseconds. */
  dateTimeMs?: number;
  value?: number;
  qualityCode?: number;
}

interface UseCdaRecentValuesParams {
  /** TSIDs to look up. Duplicates and blanks are ignored. */
  tsIds: string[];
  office?: string;
  unitSystem?: UnitSystem;
  cdaUrl?: string;
  enabled?: boolean;
  staleTime?: number;
  /**
   * Max encoded characters of joined TSIDs per request. See `chunkTsIds`.
   */
  maxChunkChars?: number;
}

/**
 * Character budget for the encoded `ts-ids` query parameter of a single
 * request. CDA passes this list through as a bind list rather than a pattern,
 * so the only ceiling is URL length; 1500 leaves ample room for the rest of the
 * query string well inside every proxy's default limit.
 */
export const DEFAULT_TSID_CHUNK_CHARS = 1500;

/**
 * Split TSIDs into groups whose encoded, comma-joined length stays under
 * `maxChars`.
 *
 * A single TSID longer than the budget still gets its own request rather than
 * being dropped - a long name is better sent alone than not at all.
 */
export function chunkTsIds(
  tsIds: string[],
  maxChars: number = DEFAULT_TSID_CHUNK_CHARS,
): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let length = 0;

  for (const tsid of tsIds) {
    const encoded = encodeURIComponent(tsid).length;
    // Commas encode to %2C, so each separator costs three characters.
    if (current.length > 0 && length + 3 + encoded > maxChars) {
      chunks.push(current);
      current = [];
      length = 0;
    }
    length += current.length > 0 ? 3 + encoded : encoded;
    current.push(tsid);
  }

  if (current.length > 0) chunks.push(current);
  return chunks;
}

/**
 * Normalize one `/timeseries/recent` entry.
 *
 * cwmsjs models this endpoint as `Tsv`, which does not match what CDA actually
 * returns - the generated type expects a numeric `id.tsCode`, where the service
 * sends the TSID string plus a `dqu` payload. We read the response body
 * directly instead of running it through the generated deserializer.
 */
function normalizeRecentValue(raw: unknown): CdaRecentValue | null {
  if (!raw || typeof raw !== "object") return null;
  const entry = raw as Record<string, unknown>;
  const dqu = (entry.dqu ?? {}) as Record<string, unknown>;

  const tsid = (entry.id ?? dqu["cwms-ts-id"]) as string | undefined;
  if (typeof tsid !== "string" || !tsid) return null;

  const dateTime = dqu["date-time"];

  return {
    tsid,
    officeId: dqu["office-id"] as string | undefined,
    unitId: dqu["unit-id"] as string | undefined,
    dateTimeMs: typeof dateTime === "number" ? dateTime : undefined,
    value: typeof dqu.value === "number" ? dqu.value : undefined,
    qualityCode:
      typeof dqu["quality-code"] === "number"
        ? (dqu["quality-code"] as number)
        : undefined,
  };
}

/**
 * Fetch the most recent value of many time series in one request.
 *
 * CDA's `/timeseries/recent` takes an explicit list of TSIDs, so unlike a
 * catalog lookup it needs no pattern - there is no regular expression for the
 * database to compile, and therefore no ORA-12733 ceiling on how many series a
 * form can ask about. Long lists are split across requests purely to keep URLs
 * a sane length.
 *
 * Unknown TSIDs are omitted from the response rather than raising an error.
 *
 * @returns `data` keyed by TSID, plus aggregate request state.
 */
export default function useCdaRecentValues({
  tsIds,
  office,
  unitSystem,
  cdaUrl,
  enabled = true,
  staleTime,
  maxChunkChars = DEFAULT_TSID_CHUNK_CHARS,
}: UseCdaRecentValuesParams) {
  // This endpoint has no v2 representation - asking for one gets a formatting
  // error back rather than data.
  const config = useCdaConfig("v1", cdaUrl);
  const timeSeriesApi = useMemo(() => new TimeSeriesApi(config), [config]);

  const chunks = useMemo(() => {
    const unique = [...new Set((tsIds ?? []).filter(Boolean))];
    if (unique.length === 0) return [];
    return chunkTsIds(unique, maxChunkChars);
  }, [tsIds, maxChunkChars]);

  const shouldFetch = enabled && chunks.length > 0;

  const queries = useMemo(
    () =>
      chunks.map((chunk) => ({
        queryKey: [
          "cda",
          "timeseries",
          "recent",
          office ?? null,
          unitSystem ?? null,
          chunk.join(","),
        ],
        queryFn: async (): Promise<CdaRecentValue[]> => {
          const response = await timeSeriesApi.getTimeSeriesRecentRaw({
            ...(office ? { office } : {}),
            ...(unitSystem ? { unitSystem } : {}),
            tsIds: chunk.join(","),
          });
          const body = await response.raw.json();
          if (!Array.isArray(body)) return [];
          return body
            .map(normalizeRecentValue)
            .filter((entry): entry is CdaRecentValue => entry !== null);
        },
        enabled: shouldFetch,
        ...(staleTime === undefined ? {} : { staleTime }),
      })),
    [chunks, office, unitSystem, timeSeriesApi, shouldFetch, staleTime],
  );

  const results = useQueries({ queries });

  const data = useMemo(() => {
    const byTsid: Record<string, CdaRecentValue> = {};
    results.forEach((result) => {
      result.data?.forEach((entry) => {
        byTsid[entry.tsid] = entry;
      });
    });
    return byTsid;
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

export { useCdaRecentValues };
