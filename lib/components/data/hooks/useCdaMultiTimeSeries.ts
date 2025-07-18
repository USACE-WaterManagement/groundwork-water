import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetTimeSeriesRequest, TimeSeries, TimeSeriesApi } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface useCdaTimeSeriesParams {
  cdaParams: GetTimeSeriesRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeries[], Error>>;
}

const useCdaMultiTimeSeries = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaTimeSeriesParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const timeseriesApi = new TimeSeriesApi(config);

  return useQuery<TimeSeries[], Error>({
    queryKey: ["cda", "timeseries", ...Object.values(cdaParams)],
    queryFn: async () => {
      const timeseriesIds = cdaParams.name?.includes(",")
        ? cdaParams.name.split(",")
        : [cdaParams.name];

      return Promise.all(
        timeseriesIds.map(async (tsid) => {
          try {
            const result = await timeseriesApi.getTimeSeries({
              ...cdaParams,
              name: tsid,
            });
            return result;
          } catch (error: any) {
            if (error.response?.status === 404) {
              console.warn(`[404] Could not find: ${tsid}`);
              return {
                name: tsid,
                values: [],
              } as unknown as TimeSeries;
            }
            throw error;
          }
        })
      );
    },
    enabled: !!cdaParams.name,
    ...queryOptions,
  });
};

export { useCdaMultiTimeSeries };
export default useCdaMultiTimeSeries;
