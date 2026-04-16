import { useMemo } from "react";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { GetOfficesRequest, Office, OfficesApi, InitOverrideFunction } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

interface UseCdaOfficesParams {
  cdaParams: GetOfficesRequest;
  cdaUrl?: string;
  queryOptions?: Omit<
    UseQueryOptions<Office[], Error, Office[], QueryKey>,
    "queryKey" | "queryFn"
  >;
  initOverrides?: RequestInit | InitOverrideFunction;
}

const useCdaOffices = ({
  cdaParams,
  cdaUrl,
  queryOptions,
  initOverrides,
}: UseCdaOfficesParams) => {
  const config = useCdaConfig("v1", cdaUrl);
  const officesApi = useMemo(() => new OfficesApi(config), [config]);

  return useQuery<Office[], Error>({
    queryKey: ["cda", "offices", cdaParams],
    queryFn: () => officesApi.getOffices(cdaParams, initOverrides),
    ...queryOptions,
  });
};

export { useCdaOffices };
export default useCdaOffices;
