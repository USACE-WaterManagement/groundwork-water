import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CatalogApi, CatalogableEndpoint } from "cwmsjs";
import useCdaTimeSeriesExtents, {
  chunkCatalogPatterns,
} from "../useCdaTimeSeriesExtents";

vi.mock("cwmsjs", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, CatalogApi: vi.fn() };
});

const TSID = "KEYS.Elev-Tailwater.Inst.1Hour.0.Ccp-Rev";
let getCatalogWithDataset;

function mockApi(responder) {
  getCatalogWithDataset = vi.fn(async (params) => responder(params));
  CatalogApi.mockImplementation(function () {
    return { getCatalogWithDataset };
  });
}

function renderHook(props) {
  const result = {};
  function Probe() {
    Object.assign(result, useCdaTimeSeriesExtents(props));
    return null;
  }
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <Probe />
    </QueryClientProvider>,
  );
  return result;
}

describe("chunkCatalogPatterns", () => {
  it("escapes and anchors exact TSIDs", () => {
    expect(chunkCatalogPatterns(["A.B(C)"], 100)).toEqual([String.raw`^(A\.B\(C\))$`]);
  });

  it("splits patterns below the configured byte limit", () => {
    const patterns = chunkCatalogPatterns(
      ["ONE.Elev.Inst.1Hour.0.Test", "TWO.Elev.Inst.1Hour.0.Test"],
      40,
    );

    expect(patterns).toHaveLength(2);
    patterns.forEach((pattern) => {
      expect(new TextEncoder().encode(pattern).length).toBeLessThanOrEqual(40);
    });
  });

  it("de-duplicates TSIDs", () => {
    expect(chunkCatalogPatterns([TSID, TSID], 500)).toHaveLength(1);
  });
});

describe("useCdaTimeSeriesExtents", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns all-time latest timestamps keyed by TSID", async () => {
    const latest = "2026-08-01T12:00:00.000Z";
    mockApi(() => ({
      entries: [
        {
          name: TSID,
          extents: [
            { latestTime: new Date("2026-07-01T12:00:00.000Z") },
            { latestTime: new Date(latest) },
          ],
        },
      ],
    }));

    const result = renderHook({ tsIds: [TSID], office: "SWT" });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(getCatalogWithDataset).toHaveBeenCalledWith({
      dataset: CatalogableEndpoint.Timeseries,
      office: "SWT",
      like: String.raw`^(KEYS\.Elev-Tailwater\.Inst\.1Hour\.0\.Ccp-Rev)$`,
      includeExtents: true,
      excludeEmpty: true,
      pageSize: 5000,
    });
    expect(result.data[TSID]).toBe(latest);
  });

  it("batches long TSID lists into bounded catalog requests", async () => {
    const ids = Array.from(
      { length: 20 },
      (_, i) => `PROJ.Opening-Gate${i}.Inst.15Minutes.0.Ccp-Rev`,
    );
    mockApi(() => ({ entries: [] }));

    const result = renderHook({ tsIds: ids, office: "SWT" });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(getCatalogWithDataset.mock.calls.length).toBeGreaterThan(1);
    for (const [params] of getCatalogWithDataset.mock.calls) {
      expect(new TextEncoder().encode(params.like).length).toBeLessThanOrEqual(400);
    }
  });

  it("does not fetch when disabled or given no TSIDs", () => {
    mockApi(() => ({ entries: [] }));
    renderHook({ tsIds: [TSID], office: "SWT", enabled: false });
    renderHook({ tsIds: [], office: "SWT" });

    expect(getCatalogWithDataset).not.toHaveBeenCalled();
  });

  it("surfaces a catalog failure", async () => {
    getCatalogWithDataset = vi.fn(async () => {
      throw new Error("Unauthorized");
    });
    CatalogApi.mockImplementation(function () {
      return { getCatalogWithDataset };
    });

    const result = renderHook({ tsIds: [TSID], office: "SWT" });

    await waitFor(() => expect(result.isError).toBe(true));
    expect(result.error.message).toBe("Unauthorized");
  });
});
