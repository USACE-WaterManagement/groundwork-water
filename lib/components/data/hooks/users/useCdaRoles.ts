import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { cdaRequest } from "./request";

export interface UseCdaRolesParams {
  cdaUrl: string;
  token?: string;
  queryOptions?: Omit<
    UseQueryOptions<string[], Error, string[], QueryKey>,
    "queryKey" | "queryFn"
  >;
}

export const useCdaRoles = ({ cdaUrl, token, queryOptions }: UseCdaRolesParams) =>
  useQuery({
    queryKey: ["cda", "roles", cdaUrl, token],
    queryFn: () => cdaRequest<string[]>(cdaUrl, "/roles", { token }),
    enabled: Boolean(cdaUrl) && queryOptions?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });

export default useCdaRoles;
