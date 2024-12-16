import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Catalog, CatalogApi, GetCatalogWithDatasetRequest } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface UseCdaCatalogParams {
  cdaParams: GetCatalogWithDatasetRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Catalog>>;
}

const useCdaCatalog = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: UseCdaCatalogParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const catalogApi = new CatalogApi(config);

  return useQuery({
    queryKey: ["cda", "catalog", ...Object.values(cdaParams)],
    queryFn: async () => catalogApi.getCatalogWithDataset(cdaParams),
    ...queryOptions,
  });
};

export { useCdaCatalog };
export default useCdaCatalog;
