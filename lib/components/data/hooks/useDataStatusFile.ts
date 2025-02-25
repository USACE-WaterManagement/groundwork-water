import { useQuery, UseQueryOptions } from "@tanstack/react-query";


interface useDataStatusFileParams {
  fileUrl: string;
  queryOptions?: Partial<UseQueryOptions<string[]>>;
}

const useDataStatusFile = ({
  fileUrl,
  queryOptions,
}: useDataStatusFileParams) => {

    return useQuery({
      queryKey: ["dataStatus", fileUrl],
      queryFn: async () => {
        return fetch(fileUrl)
          .then((response) => response.text())
          .then((text) => {
            // Split by new lines and filter out lines starting with ":" (commented)
            return text.split("\n").filter((line) => !line.startsWith(":"));
          });
      },
      refetchOnWindowFocus: false,
      ...queryOptions,
    });

};

export { useDataStatusFile };
export default useDataStatusFile;
