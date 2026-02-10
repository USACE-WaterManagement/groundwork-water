import { createContext } from "react";
import { CdaUserProfile } from "./useCdaUserProfile";

export interface AuthContextValue {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  profile?: CdaUserProfile;
  token?: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
