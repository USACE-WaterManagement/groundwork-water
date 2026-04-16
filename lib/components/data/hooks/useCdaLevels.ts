import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { LevelsApi, GetLevelsWithLevelIdTimeSeriesRequest, TimeSeries } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface UseCdaLevelsParams {
  cdaParams: GetLevelsWithLevelIdTimeSeriesRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeries>>;
}

const useCdaLevels = ({ cdaParams, cdaUrl, queryOptions }: UseCdaLevelsParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const levelsApi = new LevelsApi(config);

  return useQuery({
    queryKey: ["cda", "levels", ...Object.values(cdaParams)],
    queryFn: async () => levelsApi.getLevelsWithLevelIdTimeSeries(cdaParams),
    ...queryOptions,
  });
};

export { useCdaLevels };
export default useCdaLevels;
