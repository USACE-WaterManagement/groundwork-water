import { useQuery } from "@tanstack/react-query";
import { Configuration, LocationsApi } from "cwmsjs";

const useCdaLocation = ({ cdaParams, cdaUrl, queryOptions }) => {
  const configOptions = {
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
