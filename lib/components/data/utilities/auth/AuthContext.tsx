import { createContext } from "react";
import { CdaUserProfile } from "./useCdaUserProfile";

export interface AuthLoginOptions {
  /**
   * In-app URL to return the user to after sign-in. Stored locally and
   * restored after the callback. It is not sent to the identity provider.
   * The registered OIDC callback stays whatever is set as `redirectUri`
   * on createKeycloakAuthMethod().
   */
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
