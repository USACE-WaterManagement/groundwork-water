import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetTimeSeriesGroupWithGroupIdRequest,
  TimeSeriesGroup,
  TimeSeriesGroupsApi,
} from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface useCdaTimeSeriesGroupParams {
  cdaParams: GetTimeSeriesGroupWithGroupIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeriesGroup>>;
}

const useCdaTimeSeriesGroup = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaTimeSeriesGroupParams) => {
  const config = useCdaConfig("v1", cdaUrl);
  const timeseriesGroupsApi = new TimeSeriesGroupsApi(config);

  return useQuery({
    queryKey: ["cda", "timeseries-group", ...Object.values(cdaParams)],
    queryFn: async () => timeseriesGroupsApi.getTimeSeriesGroupWithGroupId(cdaParams),
    ...queryOptions,
  });
};

export { useCdaTimeSeriesGroup };
export default useCdaTimeSeriesGroup;
