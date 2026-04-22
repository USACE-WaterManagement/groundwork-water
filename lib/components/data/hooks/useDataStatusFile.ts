import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface useDataStatusFileParams {
  fileUrl: string;
  queryOptions?: Partial<UseQueryOptions<string[]>>;
}

const useDataStatusFile = ({ fileUrl, queryOptions }: useDataStatusFileParams) => {
  return useQuery({
    queryKey: ["dataStatus", fileUrl],
    queryFn: async () => {
      return fetch(fileUrl)
        .then((response) => response.text())
        .then((text) => {
          // Normalize line endings and strip whitespace so only clean TSIDs are returned.
          return text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0 && !line.startsWith(":"));
        });
    },
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};

export { useDataStatusFile };
export default useDataStatusFile;
