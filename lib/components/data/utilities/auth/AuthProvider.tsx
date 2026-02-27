import { PropsWithChildren } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import useCdaUrl from "../useCdaUrl";
import { useCdaUserProfile } from "./useCdaUserProfile";

export interface AuthMethod {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: () => Promise<boolean>;
  refresh?: () => Promise<void>;
  refreshInterval?: number;
  token?: string;
}

interface AuthProviderProps {
  method: AuthMethod;
  cdaUrl?: string;
  refreshInterval?: number;
}

export const AuthProvider = ({
  method,
  cdaUrl: propCdaUrl,
  refreshInterval,
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const queryClient = useQueryClient();

  const {
    data: isAuth = false,
    isLoading,
    refetch: refetchAuthStatus,
  } = useQuery({
    queryKey: ["auth", "status"],
    queryFn: method.isAuth,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const providedCdaUrl = useCdaUrl();
  const cdaUrl = propCdaUrl ?? providedCdaUrl;

  useRefreshToken(isAuth, method, refreshInterval);
  const { data: profile, isLoading: profileLoading } = useCdaUserProfile(
    isAuth,
    cdaUrl,
    method.token,
  );

  const login = useMutation({
    mutationFn: method.login,
    onSuccess: async () => {
      await refetchAuthStatus();
    },
  });

  const logout = useMutation({
    mutationFn: method.logout,
    onSuccess: async () => {
      await refetchAuthStatus();
      queryClient.removeQueries({ queryKey: ["auth", "profile"] });
    },
  });

  const isAnyLoading =
    isLoading || login.isPending || logout.isPending || profileLoading;

  return (
    <AuthContext.Provider
      value={{
        login: login.mutateAsync,
        logout: logout.mutateAsync,
        isAuth,
        isLoading: isAnyLoading,
        profile,
        token: method.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
