import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Catalog,
  CatalogApi,
  Configuration,
  ConfigurationParameters,
  GetCwmsDataCatalogWithDatasetRequest,
} from "cwmsjs";

interface UseCdaCatalogParams {
  cdaParams: GetCwmsDataCatalogWithDatasetRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Catalog>>;
}

const useCdaCatalog = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: UseCdaCatalogParams) => {
  const configOptions: ConfigurationParameters = {
    headers: {
      accept: "application/json;version=2",
    },
  };
  if (cdaUrl) configOptions.basePath = cdaUrl;
  const configV2 = new Configuration(configOptions);
  const catalogApi = new CatalogApi(configV2);

  return useQuery({
    queryKey: ["cda", "catalog", cdaParams.like],
    queryFn: async () => catalogApi.getCwmsDataCatalogWithDataset(cdaParams),
    ...queryOptions,
  });
};

export { useCdaCatalog };
export default useCdaCatalog;
