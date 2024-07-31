import { useQuery } from "@tanstack/react-query";
import { Configuration, TimeSeriesApi } from "cwmsjs";

const useCdaTimeSeries = ({ cdaParams, cdaUrl, queryOptions }) => {
  const configOptions = {
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
