import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetCwmsDataTimeseriesGroupWithGroupIdRequest,
  TimeSeriesGroup,
  TimeseriesGroupsApi,
} from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

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
  const config = useCdaConfig("v1", cdaUrl);
  const timeseriesGroupsApi = new TimeseriesGroupsApi(config);

  return useQuery({
    queryKey: ["cda", "timeseries-group", cdaParams.groupId],
    queryFn: async () =>
      timeseriesGroupsApi.getCwmsDataTimeseriesGroupWithGroupId(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeriesGroup };
export default useCdaTimeSeriesGroup;
