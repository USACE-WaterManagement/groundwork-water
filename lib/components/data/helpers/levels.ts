import {
  Configuration,
  GetLevelsWithLevelIdTimeSeriesRequest,
  LevelsApi,
  TimeSeries,
} from "cwmsjs";
import { getLatestEntry } from "./cda";

interface LevelTimeSeriesApi {
  getLevelsWithLevelIdTimeSeries(
    request: GetLevelsWithLevelIdTimeSeriesRequest,
  ): Promise<TimeSeries>;
}

interface FetchCdaLevelTimeSeriesParams {
  cdaParams: GetLevelsWithLevelIdTimeSeriesRequest;
  cdaUrl?: string;
  levelsApi?: LevelTimeSeriesApi;
}

interface FetchCdaLevelValuesParams {
  levelIds: string[];
  cdaParams: Omit<GetLevelsWithLevelIdTimeSeriesRequest, "levelId">;
  cdaUrl?: string;
  levelsApi?: LevelTimeSeriesApi;
  onProgress?: (completed: number, total: number) => void;
}

const createLevelsApi = (cdaUrl?: string) =>
  new LevelsApi(
    new Configuration({
      basePath: cdaUrl,
      headers: { accept: "application/json;version=2" },
    }),
  );

const fetchCdaLevelTimeSeries = ({
  cdaParams,
  cdaUrl,
  levelsApi,
}: FetchCdaLevelTimeSeriesParams) =>
  (levelsApi ?? createLevelsApi(cdaUrl)).getLevelsWithLevelIdTimeSeries(cdaParams);

const fetchCdaLevelValues = async ({
  levelIds,
  cdaParams,
  cdaUrl,
  levelsApi,
  onProgress,
}: FetchCdaLevelValuesParams) => {
  const api = levelsApi ?? createLevelsApi(cdaUrl);
  let completed = 0;
  const entries = await Promise.all(
    levelIds.map(async (levelId) => {
      const timeSeries = await fetchCdaLevelTimeSeries({
        cdaParams: { ...cdaParams, levelId },
        levelsApi: api,
      });
      completed += 1;
      onProgress?.(completed, levelIds.length);
      return [levelId, getLatestEntry(timeSeries)] as const;
    }),
  );

  return entries.reduce<Record<string, (typeof entries)[number][1]>>(
    (values, [levelId, entry]) => {
      if (entry !== undefined) values[levelId] = entry;
      return values;
    },
    {},
  );
};

export { fetchCdaLevelTimeSeries, fetchCdaLevelValues };
export type { FetchCdaLevelTimeSeriesParams, FetchCdaLevelValuesParams };
