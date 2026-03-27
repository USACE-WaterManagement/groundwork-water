import { AuthMethod } from "./AuthProvider";
import { createKeycloakOidcClient } from "./keycloakOidcClient";

interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  id_token: string;
  token_type: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}

interface KeycloakOptions {
  client_id: string;
  grant_type?: "password" | "refresh_token";
  scope?: string;
  username?: string;
  password?: string;
  refresh_token?: string;
}

type KeycloakRequest = KeycloakOptions & Record<string, string>;
type KeycloakFlow = "authorization-code-pkce" | "direct-grant";

interface KeycloakAuthConfig {
  host: string;
  realm: string;
  client: string;
  flow: KeycloakFlow;
  username?: string;
  password?: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  scope?: string;
  refreshInterval?: number;
}

/**
 * Generates a Keycloak authentation method from the provided configuration.
 *
 * The host should point to the root of the Keycloak provider, e.g.
 * 'https://localhost:8080/auth'.
 *
 * @param {object} config - An object containing configuration details.
 * @param {string} config.host - The root URL of the Keycloak auth provider.
 * @param {string} config.realm - The Keycloak realm to use for authentication.
 * @param {string} config.client - The Keycloak client to use for authentication.
 * @param {string} config.flow - The Keycloak flow type to use for authentication.
 * @param {string} config.username - The username to use for authentication, if required.
 * @param {string} config.password - The password to use for authentication, if required.
 * @param {string} config.redirectUri - The redirect URI to use for PKCE callback handling.
 * @param {string} config.postLogoutRedirectUri - The redirect URI to use after PKCE logout.
 * @param {string} config.scope - The OIDC scope to request for PKCE authentication.
 * @param {number} config.refreshInterval - Time between each token refresh, in seconds.
 */
export const createKeycloakAuthMethod = ({
  host,
  realm,
  client,
  flow,
  username = "",
  password = "",
  redirectUri,
  postLogoutRedirectUri,
  scope,
  refreshInterval = 300,
}: KeycloakAuthConfig) => {
  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  let pkceCallbackHandled = false;
  const baseUrl = `${host}/realms/${realm}/protocol/openid-connect`;
  const oidcClient =
    flow === "authorization-code-pkce"
      ? createKeycloakOidcClient({
          host,
          realm,
          client,
          redirectUri,
          postLogoutRedirectUri,
          scope,
        })
      : undefined;

  const syncTokensFromOidcUser = async () => {
    if (!oidcClient) return false;

    const user = await oidcClient.getUser();
    accessToken = user?.access_token;
    refreshToken = user?.refresh_token;
    return !!user?.access_token;
  };

  const hasPkceCallbackParams = () => {
    if (typeof window === "undefined") return false;

    const params = new URLSearchParams(window.location.search);
    return params.has("code") && params.has("state");
  };

  const fetchKeycloakRequest = async (
    endpoint: "token" | "logout",
    formData: KeycloakRequest,
  ) => {
    const fullUrl = `${baseUrl}/${endpoint}`;

    const data = new URLSearchParams(formData);
    const response = await fetch(fullUrl, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.ok) {
      throw new Error(`Keycloak request error: HTTP ${response.status}`);
    }
    return response;
  };

  const login = async () => {
    if (flow === "authorization-code-pkce") {
      if (!oidcClient) throw new Error("Invalid PKCE auth client configuration");
      await oidcClient.signinRedirect();
      return;
    }

    const loginData: KeycloakRequest | undefined =
      flow === "direct-grant"
        ? {
            grant_type: "password",
            client_id: client,
            scope: "openid profile",
            username,
            password,
          }
        : undefined;
    if (!loginData) throw new Error("Invalid flow provided for keycloak auth config");
    const tokenResponse = await fetchKeycloakRequest("token", loginData);
    const tokenJson: KeycloakTokenResponse = await tokenResponse.json();
    accessToken = tokenJson.access_token;
    refreshToken = tokenJson.refresh_token;
  };

  const logout = async () => {
    if (flow === "authorization-code-pkce") {
      accessToken = undefined;
      refreshToken = undefined;
      pkceCallbackHandled = false;

      if (!oidcClient) throw new Error("Invalid PKCE auth client configuration");
      await oidcClient.signoutRedirect();
      return;
    }

    if (refreshToken) {
      const logoutData: KeycloakRequest = {
        client_id: client,
        refresh_token: refreshToken,
      };
      const logoutResponse = await fetchKeycloakRequest("logout", logoutData);
      if (logoutResponse.ok) console.log("Successfully logged out of keycloak");
      else console.error("Bad response from keycloak logout request");
    }
    accessToken = undefined;
    refreshToken = undefined;
  };

  const isAuth = async () => {
    if (flow === "authorization-code-pkce") {
      if (!oidcClient) return false;

      if (!pkceCallbackHandled && hasPkceCallbackParams()) {
        await oidcClient.signinCallback();
        pkceCallbackHandled = true;
      }

      return syncTokensFromOidcUser();
    }

    return !!accessToken;
  };

  const refresh = async () => {
    if (!refreshToken)
      throw new Error("Cannot refresh token; no existing refresh token found");
    const refreshData: KeycloakRequest = {
      client_id: client,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    };
    const refreshResponse = await fetchKeycloakRequest("token", refreshData);
    const tokenJson: KeycloakTokenResponse = await refreshResponse.json();
    accessToken = tokenJson.access_token;
    refreshToken = tokenJson.refresh_token;
  };

  const keycloakAuthMethod: AuthMethod = {
    login,
    logout,
    isAuth,
    refresh,
    refreshInterval,
    get token() {
      return accessToken;
    },
  };

  return keycloakAuthMethod;
};
