import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetCwmsDataTimeseriesRequest,
  TimeSeries,
  TimeSeriesApi,
} from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

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
  const config = useCdaConfig("v2", cdaUrl);
  const timeseriesApi = new TimeSeriesApi(config);

  return useQuery({
    queryKey: ["cda", "timeseries", cdaParams.name],
    queryFn: async () => timeseriesApi.getCwmsDataTimeseries(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeries };
export default useCdaTimeSeries;
