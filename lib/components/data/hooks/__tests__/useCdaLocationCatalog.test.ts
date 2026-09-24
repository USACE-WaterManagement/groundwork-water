import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchLocationCatalog } from "../useCdaLocationCatalog";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchLocationCatalog", () => {
  it("maps catalog parameters and follows CDA pagination", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => ({ entries: [{ name: "ONE" }], "next-page": "next" }),
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ entries: [{ name: "TWO" }] }),
        ok: true,
      });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchLocationCatalog({
      basePath: "https://example.test/cwms-data/",
      params: {
        includeAliases: true,
        locationKindLike: "PROJECT",
        office: "SWT",
        pageSize: 100,
      },
    });

    expect(result.entries?.map((entry) => entry.name)).toEqual(["ONE", "TWO"]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const firstUrl = new URL(fetchMock.mock.calls[0][0]);
    expect(firstUrl.pathname).toBe("/cwms-data/catalog/LOCATIONS");
    expect(firstUrl.searchParams.get("include-aliases")).toBe("true");
    expect(firstUrl.searchParams.get("location-kind-like")).toBe("PROJECT");
    expect(firstUrl.searchParams.get("page-size")).toBe("100");
    const secondUrl = new URL(fetchMock.mock.calls[1][0]);
    expect(secondUrl.searchParams.get("page")).toBe("next");
  });

  it("reports a failed catalog response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(
      fetchLocationCatalog({
        basePath: "https://example.test/cwms-data",
        params: { office: "SWT" },
      }),
    ).rejects.toThrow("Unable to fetch CDA location catalog: 503");
  });
});
