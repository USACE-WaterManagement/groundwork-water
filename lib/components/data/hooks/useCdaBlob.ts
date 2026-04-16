import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCdaConfig } from "../helpers/cda";
import { BlobApi, GetBlobsWithBlobIdRequest } from "cwmsjs";

interface useCdaBlobParams {
  cdaParams: GetBlobsWithBlobIdRequest;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<void, Error>>;
  initOverrides?: Partial<RequestInit>;
}

// confusing to call it file vs blob (what if someone wants blob?)
const useCdaBlob = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: useCdaBlobParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const blobApi = new BlobApi(config);

  return useQuery({
    queryKey: ["cda", "blob", ...Object.values(cdaParams)],
    queryFn: async () =>
      blobApi.getBlobsWithBlobIdRaw(cdaParams, initOverrides).then(async (response) => {
        const contentType = response.raw.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return await response.raw.json();
        } else {
          return await response.raw.text();
        }
      }),
    ...queryOptions,
  });
};

export { useCdaBlob };
export default useCdaBlob;
