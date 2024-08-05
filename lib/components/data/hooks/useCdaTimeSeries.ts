import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Configuration,
  ConfigurationParameters,
  GetCwmsDataTimeseriesRequest,
  TimeSeries,
  TimeSeriesApi,
} from "cwmsjs";

interface useCdaTimeSeriesParams {
  cdaParams: GetCwmsDataTimeseriesRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeries>>;
}

const useCdaTimeSeries = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaTimeSeriesParams) => {
  const configOptions: ConfigurationParameters = {
    headers: {
      accept: "application/json;version=2",
    },
  };
  if (cdaUrl) configOptions.basePath = cdaUrl;
  const configV2 = new Configuration(configOptions);
  const timeseriesApi = new TimeSeriesApi(configV2);

  return useQuery({
    queryKey: ["cda", "timeseries", cdaParams.name],
    queryFn: async () => timeseriesApi.getCwmsDataTimeseries(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeries };
export default useCdaTimeSeries;
