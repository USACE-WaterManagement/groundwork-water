import { UserManager, UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";
import { normalizeKeycloakHost } from "./keycloakHost";

export interface KeycloakPkceConfig {
  host: string;
  realm: string;
  client: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  scope?: string;
  providerHint?: string;
}

const getDefaultRedirectUri = () => {
  if (typeof window === "undefined") return undefined;

  const url = new URL(window.location.href);
  url.search = "";
  return url.toString();
};

export const createKeycloakOidcClient = ({
  host,
  realm,
  client,
  redirectUri,
  postLogoutRedirectUri,
  scope = "openid profile",
  providerHint,
}: KeycloakPkceConfig) => {
  if (typeof window === "undefined") {
    throw new Error("Keycloak PKCE auth requires a browser environment");
  }

  const resolvedRedirectUri = redirectUri ?? getDefaultRedirectUri();
  if (!resolvedRedirectUri) {
    throw new Error("Keycloak PKCE auth requires a redirect URI");
  }

  const normalizedHost = normalizeKeycloakHost(host);

  const settings: UserManagerSettings = {
    authority: `${normalizedHost}/realms/${realm}`,
    client_id: client,
    redirect_uri: resolvedRedirectUri,
    post_logout_redirect_uri: postLogoutRedirectUri ?? resolvedRedirectUri,
    response_type: "code",
    scope,
    automaticSilentRenew: false,
    monitorSession: false,
    userStore: new WebStorageStateStore({
      prefix: `groundwork-water:keycloak:${realm}:${client}:`,
      store: window.localStorage,
    }),
    extraQueryParams: providerHint ? { kc_idp_hint: providerHint } : undefined,
  };

  return new UserManager(settings);
};
