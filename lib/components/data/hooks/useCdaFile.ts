import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCdaConfig } from "../helpers/cda";
import { BlobApi, GetBlobsWithBlobIdRequest } from "cwmsjs";

interface UseCdaFileParams {
  cdaParams: GetBlobsWithBlobIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<void, Error>>;
  initOverrides?: Partial<RequestInit>;
}

const useCdaFile = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: UseCdaFileParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const blobApi = new BlobApi(config);

  return useQuery({
    queryKey: ["cda", "file", ...Object.values(cdaParams)],
    queryFn: async () => blobApi.getBlobsWithBlobId(cdaParams, initOverrides),
    ...queryOptions,
  });
};

export { useCdaFile };
export default useCdaFile;
