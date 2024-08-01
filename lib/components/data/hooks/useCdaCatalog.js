import { useQuery } from "@tanstack/react-query";
import { CatalogApi, Configuration } from "cwmsjs";

const useCdaCatalog = ({ cdaParams, cdaUrl, queryOptions }) => {
  const configOptions = {
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
