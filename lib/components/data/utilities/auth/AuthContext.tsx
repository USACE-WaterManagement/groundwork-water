import { createContext } from "react";
import { CdaUserProfile } from "./useCdaUserProfile";

export interface AuthLoginOptions {
  redirectUri?: string;
}

export interface AuthContextValue {
  login: (options?: AuthLoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  profile?: CdaUserProfile;
  token?: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
