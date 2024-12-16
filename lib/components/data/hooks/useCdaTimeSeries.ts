import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetTimeSeriesRequest, TimeSeries, TimeSeriesApi } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface useCdaTimeSeriesParams {
  cdaParams: GetTimeSeriesRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeries>>;
}

const useCdaTimeSeries = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaTimeSeriesParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const timeseriesApi = new TimeSeriesApi(config);

  return useQuery({
    queryKey: ["cda", "timeseries", ...Object.values(cdaParams)],
    queryFn: async () => timeseriesApi.getTimeSeries(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeries };
export default useCdaTimeSeries;
