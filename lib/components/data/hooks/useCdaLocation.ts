import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetCwmsDataLocationsWithLocationIdRequest,
  Location,
  LocationsApi,
} from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

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
  const config = useCdaConfig("v2", cdaUrl);
  const locationsApi = new LocationsApi(config);

  return useQuery({
    queryKey: ["cda", "location", cdaParams.locationId],
    queryFn: async () =>
      locationsApi.getCwmsDataLocationsWithLocationId(cdaParams),
    ...queryOptions,
  });
};

export { useCdaLocation };
export default useCdaLocation;
