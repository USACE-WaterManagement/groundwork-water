import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCdaConfig } from "../helpers/cda";
import { BlobApi, Blobs, GetBlobsWithBlobIdRequest } from "cwmsjs";

interface UseCdaFileParams {
  cdaParams: GetBlobsWithBlobIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Blobs>>;
  initOverrides?: Partial<RequestInit>;
}

const useCdaFileCatalog = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: UseCdaFileParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const blobApi = new BlobApi(config);

  return useQuery({
    queryKey: ["cda", "file", "catalog", ...Object.values(cdaParams)],
    queryFn: async () => blobApi.getBlobs(cdaParams, initOverrides),
    ...queryOptions,
  });
};

export { useCdaFileCatalog };
export default useCdaFileCatalog;
