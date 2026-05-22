import { beforeEach, describe, expect, it, vi } from "vitest";
import { createKeycloakAuthMethod } from "../keycloakAuthMethod";

const mockOidcClient = {
  getUser: vi.fn(),
  removeUser: vi.fn(),
  signinCallback: vi.fn(),
  signinRedirect: vi.fn(),
  signinSilent: vi.fn(),
  signoutCallback: vi.fn(),
  signoutRedirect: vi.fn(),
};

vi.mock("../keycloakOidcClient", () => ({
  createKeycloakOidcClient: vi.fn(() => mockOidcClient),
}));

describe("createKeycloakAuthMethod", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/app/");
    mockOidcClient.getUser.mockResolvedValue({
      access_token: "token",
      refresh_token: "refresh",
      expired: false,
    });
  });

  it("stores the requested return URL and keeps the configured callback URI for PKCE login", async () => {
    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
    });

    await method.login({
      redirectUri: `${window.location.origin}/app/#/timeseries?office=SWT`,
    });

    expect(mockOidcClient.signinRedirect).toHaveBeenCalledWith();
    expect(
      window.sessionStorage.getItem("groundwork-water:keycloak:return-to:cwbi:cwms"),
    ).toBe(`${window.location.origin}/app/#/timeseries?office=SWT`);
  });

  it("restores the stored return URL after handling the PKCE callback", async () => {
    window.sessionStorage.setItem(
      "groundwork-water:keycloak:return-to:cwbi:cwms",
      `${window.location.origin}/app/#/timeseries?office=SWT`,
    );
    window.history.replaceState({}, "", "/app/callback?code=abc&state=xyz");

    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
      redirectUri: `${window.location.origin}/app/callback`,
    });

    await expect(method.isAuth()).resolves.toBe(true);

    expect(mockOidcClient.signinCallback).toHaveBeenCalledWith();
    expect(window.location.href).toBe(
      `${window.location.origin}/app/#/timeseries?office=SWT`,
    );
    expect(
      window.sessionStorage.getItem("groundwork-water:keycloak:return-to:cwbi:cwms"),
    ).toBeNull();
  });

  it("removes auth response params when there is no stored return URL", async () => {
    window.history.replaceState(
      {},
      "",
      "/app/callback?code=abc&state=xyz&office=SWT#/docs/auth",
    );

    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
      redirectUri: `${window.location.origin}/app/callback`,
    });

    await expect(method.isAuth()).resolves.toBe(true);

    expect(mockOidcClient.signinCallback).toHaveBeenCalledWith();
    expect(window.location.href).toBe(
      `${window.location.origin}/app/callback?office=SWT#/docs/auth`,
    );
  });
});
