import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Configuration,
  ConfigurationParameters,
  GetCwmsDataLocationsWithLocationIdRequest,
  Location,
  LocationsApi,
} from "cwmsjs";

interface useCdaLocationParams {
  cdaParams: GetCwmsDataLocationsWithLocationIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Location>>;
}

const useCdaLocation = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: useCdaLocationParams) => {
  const configOptions: ConfigurationParameters = {
    headers: {
      accept: "application/json;version=2",
    },
  };
  if (cdaUrl) configOptions.basePath = cdaUrl;
  const configV2 = new Configuration(configOptions);
  const locationsApi = new LocationsApi(configV2);

  return useQuery({
    queryKey: ["cda", "location", cdaParams.locationId],
    queryFn: async () =>
      locationsApi.getCwmsDataLocationsWithLocationId(cdaParams),
    ...queryOptions,
  });
};

export { useCdaLocation };
export default useCdaLocation;
