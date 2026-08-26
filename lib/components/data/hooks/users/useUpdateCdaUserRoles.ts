import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cdaRequest } from "./request";

interface UpdateCdaUserRolesInput {
  userName: string;
  office: string;
  previousRoles: string[];
  roles: string[];
}

interface UseUpdateCdaUserRolesParams {
  cdaUrl: string;
  token?: string;
}

export const useUpdateCdaUserRoles = ({
  cdaUrl,
  token,
}: UseUpdateCdaUserRolesParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userName,
      office,
      previousRoles,
      roles,
    }: UpdateCdaUserRolesInput) => {
      const previous = new Set(previousRoles);
      const next = new Set(roles);
      const additions = roles.filter((role) => !previous.has(role));
      const removals = previousRoles.filter((role) => !next.has(role));
      const path = `/user/${encodeURIComponent(userName)}/roles/${encodeURIComponent(office)}`;

      if (additions.length) {
        await cdaRequest<void>(cdaUrl, path, {
          token,
          method: "POST",
          body: JSON.stringify(additions),
        });
      }
      if (removals.length) {
        await cdaRequest<void>(cdaUrl, path, {
          token,
          method: "DELETE",
          body: JSON.stringify(removals),
        });
      }

      return { additions, removals };
    },
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["cda", "users", cdaUrl, variables.office],
      });
    },
  });
};

export default useUpdateCdaUserRoles;
