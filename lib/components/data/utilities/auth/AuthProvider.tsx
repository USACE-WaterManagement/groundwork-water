import { PropsWithChildren, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext, AuthContextValue } from "./AuthContext";
import useCdaUrl from "../useCdaUrl";
import { useCdaUserProfile } from "./useCdaUserProfile";
import { useRefreshToken } from "./useRefreshToken";

export interface AuthMethod {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: () => Promise<boolean>;
  refresh?: () => Promise<void>;
  refreshInterval?: number;
  statusPollInterval?: number;
  token?: string;
}

interface AuthProviderProps {
  method: AuthMethod;
  cdaUrl?: string;
  statusPollInterval?: number;
}

export const AuthProvider = ({
  method,
  cdaUrl: propCdaUrl,
  statusPollInterval,
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const queryClient = useQueryClient();
  const pollSeconds = statusPollInterval ?? method.statusPollInterval ?? 15;
  const refetchIntervalMs = pollSeconds > 0 ? pollSeconds * 1000 : false;

  const {
    data: isAuth = false,
    isLoading,
    refetch: refetchAuthStatus,
  } = useQuery({
    queryKey: ["auth", "status"],
    queryFn: method.isAuth,
    staleTime: 0,
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  const providedCdaUrl = useCdaUrl();
  const cdaUrl = propCdaUrl ?? providedCdaUrl;

  useRefreshToken(isAuth, method);
  const { data: profile, isLoading: profileLoading } = useCdaUserProfile(
    isAuth,
    cdaUrl,
    method.token,
  );

  const login = useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(["auth", "status"], true);
      await method.login();
    },
    onError: () => {
      queryClient.setQueryData(["auth", "status"], false);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(["auth", "status"], false);
      await method.logout();
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "status"] });
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["auth", "profile"] });
      await refetchAuthStatus();
    },
  });

  const isAnyLoading =
    isLoading || login.isPending || logout.isPending || profileLoading;

  const value = useMemo<AuthContextValue>(
    () => ({
      login: login.mutateAsync,
      logout: logout.mutateAsync,
      isAuth,
      isLoading: isAnyLoading,
      profile,
      token: method.token,
    }),
    [
      login.mutateAsync,
      logout.mutateAsync,
      isAuth,
      isAnyLoading,
      profile,
      method.token,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
