import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { cdaRequest } from "./request";

export interface CdaUser {
  "user-name": string;
  principal: string;
  email: string;
  "cac-auth"?: boolean;
  roles: Record<string, string[]>;
}

interface CdaUsersPage {
  users?: CdaUser[];
  "next-page"?: string | null;
  total?: number;
}

export interface CdaUsersResult {
  users: CdaUser[];
  total: number;
}

export interface UseCdaUsersParams {
  office: string;
  cdaUrl: string;
  token?: string;
  usernameLike?: string;
  pageSize?: number;
  queryOptions?: Omit<
    UseQueryOptions<CdaUsersResult, Error, CdaUsersResult, QueryKey>,
    "queryKey" | "queryFn"
  >;
}

export const fetchAllCdaUsers = async ({
  office,
  cdaUrl,
  token,
  usernameLike,
  pageSize = 500,
}: Omit<UseCdaUsersParams, "queryOptions">): Promise<CdaUsersResult> => {
  const users: CdaUser[] = [];
  let nextPage: string | null | undefined;
  let total = 0;

  do {
    const parameters = new URLSearchParams({
      office,
      "include-roles": "true",
      "page-size": String(pageSize),
    });
    if (usernameLike) parameters.set("username-like", usernameLike);
    if (nextPage) parameters.set("page", nextPage);

    const page = await cdaRequest<CdaUsersPage>(cdaUrl, `/users?${parameters}`, {
      token,
    });
    users.push(...(page.users ?? []));
    total = page.total ?? users.length;
    nextPage = page["next-page"];
  } while (nextPage);

  return { users, total };
};

export const useCdaUsers = ({
  office,
  cdaUrl,
  token,
  usernameLike,
  pageSize,
  queryOptions,
}: UseCdaUsersParams) =>
  useQuery({
    queryKey: ["cda", "users", cdaUrl, office, usernameLike, pageSize, token],
    queryFn: () => fetchAllCdaUsers({ office, cdaUrl, token, usernameLike, pageSize }),
    enabled: Boolean(office && cdaUrl) && queryOptions?.enabled !== false,
    ...queryOptions,
  });

export default useCdaUsers;
