import { useQuery } from "@tanstack/react-query";
import { AuthMethod } from "../auth/AuthProvider";

export function useRefreshToken(enabled: boolean, method: AuthMethod) {
  const intervalSeconds = method.refreshInterval ?? 300;
  return useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: async () => {
      if (!method.refresh) throw new Error("refresh() not implemented");
      await method.refresh();
      return true;
    },
    enabled: enabled && !!method.refresh,
    refetchInterval: intervalSeconds * 1000,
    refetchIntervalInBackground: true,
    retry: 2,
    staleTime: Infinity,
  });
}
