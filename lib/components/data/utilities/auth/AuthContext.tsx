import { createContext } from "react";

export interface AuthContextValue {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  token?: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
