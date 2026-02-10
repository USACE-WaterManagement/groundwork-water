import { createContext, PropsWithChildren, useMemo } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface AuthMethod {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: () => Promise<boolean>;
  refresh?: () => Promise<void>;
  refreshInterval?: number;
  statusPollInterval?: number;
  token?: string;
}

export interface AuthContextValue {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  token?: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  method: AuthMethod;
  refreshInterval?: number;
  // Override the status poll interval if provided (seconds)
  statusPollInterval?: number;
}

export const AuthProvider = ({
  method,
  statusPollInterval = 15, // in seconds
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const queryClient = useQueryClient();

  const pollSeconds = statusPollInterval ?? method.statusPollInterval ?? 0;

  const refetchIntervalMs = pollSeconds > 0 ? pollSeconds * 1000 : false;

  const statusQuery = useQuery({
    queryKey: ["auth", "status"],
    queryFn: method.isAuth,
    // Setup polling
    staleTime: 0, // always stale to ensure polling works correctly
    refetchInterval: refetchIntervalMs,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  const isAuth = statusQuery.data ?? false;

  useRefreshToken(isAuth, method);

  const login = useMutation({
    mutationFn: async () => {
      // Attempt a UI update, for things like rendering between clicks and redirects
      queryClient.setQueryData(["auth", "status"], true);
      await method.login();
    },
    onError: () => {
      queryClient.setQueryData(["auth", "status"], false);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      // Immediately show logged-out state
      queryClient.setQueryData(["auth", "status"], false);
      await method.logout();
    },
    onError: () => {
      // If we get an error logging out, re-check auth status so it's current
      queryClient.invalidateQueries({ queryKey: ["auth", "status"] });
    },
  });

  const isAnyLoading = statusQuery.isLoading || login.isPending || logout.isPending;

  const value = useMemo<AuthContextValue>(
    () => ({
      login: login.mutateAsync,
      logout: logout.mutateAsync,
      isAuth,
      isLoading: isAnyLoading,
      token: method.token,
    }),
    [login.mutateAsync, logout.mutateAsync, isAuth, isAnyLoading, method.token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
