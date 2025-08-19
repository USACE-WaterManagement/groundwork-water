import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCdaConfig } from "../helpers/cda";
import { BlobApi, Blobs, GetBlobsWithBlobIdRequest } from "cwmsjs";

interface useCdaBlobParams {
  cdaParams: GetBlobsWithBlobIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Blobs>>;
  initOverrides?: Partial<RequestInit>;
}

const useCdaBlobCatalog = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: useCdaBlobParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const blobApi = new BlobApi(config);

  return useQuery({
    queryKey: ["cda", "file", "catalog", ...Object.values(cdaParams)],
    queryFn: async () => blobApi.getBlobs(cdaParams, initOverrides),
    ...queryOptions,
  });
};

export { useCdaBlobCatalog };
export default useCdaBlobCatalog;
