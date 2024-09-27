import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Catalog,
  CatalogApi,
  GetCwmsDataCatalogWithDatasetRequest,
} from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

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
  const config = useCdaConfig("v2", cdaUrl);
  const catalogApi = new CatalogApi(config);

  return useQuery({
    queryKey: ["cda", "catalog", cdaParams.like],
    queryFn: async () => catalogApi.getCwmsDataCatalogWithDataset(cdaParams),
    ...queryOptions,
  });
};

export { useCdaCatalog };
export default useCdaCatalog;
