import { beforeEach, describe, expect, it, vi } from "vitest";
import { createKeycloakAuthMethod } from "../keycloakAuthMethod";
import { createKeycloakOidcClient } from "../keycloakOidcClient";

const mockOidcClient = {
  getUser: vi.fn(),
  removeUser: vi.fn(),
  signinCallback: vi.fn(),
  signinRedirect: vi.fn(),
  signinSilent: vi.fn(),
  signoutCallback: vi.fn(),
  signoutRedirect: vi.fn(),
};

const tokenResponse = (accessToken: string, refreshToken: string, expiresIn = 300) => ({
  access_token: accessToken,
  expires_in: expiresIn,
  refresh_token: refreshToken,
  refresh_expires_in: 1800,
  id_token: "id-token",
  token_type: "Bearer",
  not_before_policy: 0,
  session_state: "session",
  scope: "openid profile",
});

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
      expires_at: Date.now() / 1000 + 300,
      expires_in: 300,
    });
  });

  it("targets the CWBI production Keycloak host by default", () => {
    createKeycloakAuthMethod({
      realm: "cwbi",
      client: "cwms",
    });

    expect(createKeycloakOidcClient).toHaveBeenCalledWith(
      expect.objectContaining({ host: "https://identity.cwbi.mil/auth" }),
    );
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

  it("returns a current PKCE token without refreshing it", async () => {
    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
    });

    await expect(method.getValidToken?.()).resolves.toBe("token");
    expect(mockOidcClient.signinSilent).not.toHaveBeenCalled();
  });

  it("refreshes an expiring PKCE token before returning it", async () => {
    mockOidcClient.getUser
      .mockResolvedValueOnce({
        access_token: "old-token",
        refresh_token: "old-refresh",
        expired: false,
        expires_at: Date.now() / 1000 + 30,
        expires_in: 30,
      })
      .mockResolvedValue({
        access_token: "new-token",
        refresh_token: "new-refresh",
        expired: false,
        expires_at: Date.now() / 1000 + 300,
        expires_in: 300,
      });

    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
    });

    await expect(method.getValidToken?.(60)).resolves.toBe("new-token");
    expect(mockOidcClient.signinSilent).toHaveBeenCalledTimes(1);
  });

  it("coalesces concurrent PKCE refresh requests", async () => {
    let finishRefresh: (() => void) | undefined;
    mockOidcClient.getUser.mockResolvedValue({
      access_token: "old-token",
      refresh_token: "old-refresh",
      expired: false,
      expires_at: Date.now() / 1000 + 30,
      expires_in: 30,
    });
    mockOidcClient.signinSilent.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finishRefresh = resolve;
        }),
    );

    const method = createKeycloakAuthMethod({
      host: "https://identity.example.test/auth",
      realm: "cwbi",
      client: "cwms",
    });

    const firstToken = method.getValidToken?.(60);
    const secondToken = method.getValidToken?.(60);
    await vi.waitFor(() =>
      expect(mockOidcClient.signinSilent).toHaveBeenCalledTimes(1),
    );

    mockOidcClient.getUser.mockResolvedValue({
      access_token: "new-token",
      refresh_token: "new-refresh",
      expired: false,
      expires_at: Date.now() / 1000 + 300,
      expires_in: 300,
    });
    finishRefresh?.();

    await expect(Promise.all([firstToken, secondToken])).resolves.toEqual([
      "new-token",
      "new-token",
    ]);
  });

  it("refreshes a direct-grant token when used after five minutes", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-31T12:00:00Z"));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(tokenResponse("old-token", "old-refresh")),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(tokenResponse("new-token", "new-refresh")),
      });
    vi.stubGlobal("fetch", fetchMock);

    try {
      const method = createKeycloakAuthMethod({
        host: "https://identity.example.test/auth",
        realm: "cwbi",
        client: "cwms",
        flow: "direct-grant",
        username: "user",
        password: "password",
      });

      await method.login();
      vi.advanceTimersByTime(5 * 60 * 1000);

      await expect(method.getValidToken?.(60)).resolves.toBe("new-token");
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls[1][1]?.body.toString()).toContain(
        "grant_type=refresh_token",
      );
      expect(fetchMock.mock.calls[1][1]?.body.toString()).toContain(
        "refresh_token=old-refresh",
      );
    } finally {
      vi.unstubAllGlobals();
      vi.useRealTimers();
    }
  });
});
