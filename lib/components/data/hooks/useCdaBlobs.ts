import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCdaConfig } from "../helpers/cda";
import { BlobApi, Blobs, GetBlobsWithBlobIdRequest } from "cwmsjs";

interface useCdaBlobsParams {
  cdaParams: GetBlobsWithBlobIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Blobs>>;
  initOverrides?: Partial<RequestInit>;
}

const useCdaBlobs = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: useCdaBlobsParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const blobApi = new BlobApi(config);

  return useQuery({
    queryKey: ["cda", "blob", "catalog", ...Object.values(cdaParams)],
    queryFn: async () => blobApi.getBlobs(cdaParams, initOverrides),
    ...queryOptions,
  });
};

export { useCdaBlobs };
export default useCdaBlobs;
