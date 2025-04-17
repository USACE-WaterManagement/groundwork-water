import { createContext, PropsWithChildren } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface AuthMethod {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: () => Promise<boolean>;
  refresh?: () => Promise<void>;
  refreshInterval?: number;
}

export interface AuthContextValue {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  method: AuthMethod;
  refreshInterval?: number;
}

export const AuthProvider = ({
  method,
  refreshInterval,
  children,
}: PropsWithChildren<AuthProviderProps>) => {
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

  useRefreshToken(isAuth, method, refreshInterval);

  const login = useMutation({
    mutationFn: method.login,
    onSuccess: () => {
      refetchAuthStatus();
    },
  });

  const logout = useMutation({
    mutationFn: method.logout,
    onSuccess: () => {
      refetchAuthStatus();
    },
  });

  const isAnyLoading = isLoading || login.isPending || logout.isPending;

  return (
    <AuthContext.Provider
      value={{
        login: login.mutateAsync,
        logout: logout.mutateAsync,
        isAuth,
        isLoading: isAnyLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
