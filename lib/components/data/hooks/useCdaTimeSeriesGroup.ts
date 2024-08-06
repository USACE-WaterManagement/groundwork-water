import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Configuration,
  ConfigurationParameters,
  GetCwmsDataTimeseriesGroupWithGroupIdRequest,
  TimeSeriesGroup,
  TimeseriesGroupsApi,
} from "cwmsjs";

interface useCdaTimeSeriesGroupParams {
  cdaParams: GetCwmsDataTimeseriesGroupWithGroupIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeriesGroup>>;
}

const useCdaTimeSeriesGroup = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaTimeSeriesGroupParams) => {
  const configOptions: ConfigurationParameters = {
    headers: {
      accept: "application/json",
    },
  };
  if (cdaUrl) configOptions.basePath = cdaUrl;
  const configV2 = new Configuration(configOptions);
  const timeseriesGroupsApi = new TimeseriesGroupsApi(configV2);

  return useQuery({
    queryKey: ["cda", "timeseries-group", cdaParams.groupId],
    queryFn: async () =>
      timeseriesGroupsApi.getCwmsDataTimeseriesGroupWithGroupId(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeriesGroup };
export default useCdaTimeSeriesGroup;
