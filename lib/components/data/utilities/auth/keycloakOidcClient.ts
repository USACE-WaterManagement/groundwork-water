import { UserManager, UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";

export interface KeycloakPkceConfig {
  host: string;
  realm: string;
  client: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  scope?: string;
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
}: KeycloakPkceConfig) => {
  if (typeof window === "undefined") {
    throw new Error("Keycloak PKCE auth requires a browser environment");
  }

  const resolvedRedirectUri = redirectUri ?? getDefaultRedirectUri();
  if (!resolvedRedirectUri) {
    throw new Error("Keycloak PKCE auth requires a redirect URI");
  }

  const settings: UserManagerSettings = {
    authority: `${host.replace(/\/$/, "")}/realms/${realm}`,
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
  };

  return new UserManager(settings);
};
