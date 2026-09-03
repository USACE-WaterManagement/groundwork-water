import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TimeSeriesApi } from "cwmsjs";
import useCdaRecentValues, { chunkTsIds } from "../useCdaRecentValues";

vi.mock("cwmsjs", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, TimeSeriesApi: vi.fn() };
});

const TSID = "KEYS.Elev-Tailwater.Inst.1Hour.0.Ccp-Rev";

// The shape CDA actually returns from /timeseries/recent, which is *not* the
// `Tsv` model cwmsjs generates for it.
function recentEntry(tsid, dateTimeMs, value) {
  return {
    id: tsid,
    dqu: {
      "office-id": "SWT",
      "cwms-ts-id": tsid,
      "unit-id": "ft",
      "date-time": dateTimeMs,
      value,
      "quality-code": 0,
    },
  };
}

let getTimeSeriesRecentRaw;

function mockApi(responder) {
  getTimeSeriesRecentRaw = vi.fn(async (params) => ({
    raw: { json: async () => responder(params) },
  }));
  TimeSeriesApi.mockImplementation(function () {
    return { getTimeSeriesRecentRaw };
  });
}

function renderHook(props) {
  const result = {};
  function Probe() {
    Object.assign(result, useCdaRecentValues(props));
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

describe("chunkTsIds", () => {
  it("keeps everything in one chunk when it fits", () => {
    expect(chunkTsIds(["a", "b", "c"], 100)).toEqual([["a", "b", "c"]]);
  });

  it("splits once the encoded joined length exceeds the budget", () => {
    // Each id is 10 chars; separators cost 3. Budget 25 fits two (10+3+10=23)
    // but not three (23+3+10=36).
    const ids = ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccc", "dddddddddd"];
    expect(chunkTsIds(ids, 25)).toEqual([
      ["aaaaaaaaaa", "bbbbbbbbbb"],
      ["cccccccccc", "dddddddddd"],
    ]);
  });

  it("counts encoded length, not raw length", () => {
    // A space encodes to %20, tripling its cost.
    expect(chunkTsIds(["a a a", "b"], 7)).toEqual([["a a a"], ["b"]]);
  });

  it("still emits an over-budget id rather than dropping it", () => {
    const long = "x".repeat(50);
    expect(chunkTsIds([long, "y"], 10)).toEqual([[long], ["y"]]);
  });

  it("returns no chunks for an empty list", () => {
    expect(chunkTsIds([], 100)).toEqual([]);
  });
});

describe("useCdaRecentValues", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sends one comma-joined request and keys results by tsid", async () => {
    const other = "KEYS.Stor.Inst.1Hour.0.Ccp-Rev";
    mockApi(() => [
      recentEntry(TSID, 1788390000000, 641.15),
      recentEntry(other, 1788386400000, 12),
    ]);

    const result = renderHook({ tsIds: [TSID, other], office: "SWT" });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(getTimeSeriesRecentRaw).toHaveBeenCalledTimes(1);
    expect(getTimeSeriesRecentRaw).toHaveBeenCalledWith({
      office: "SWT",
      tsIds: `${TSID},${other}`,
    });
    expect(result.data[TSID]).toMatchObject({
      tsid: TSID,
      unitId: "ft",
      dateTimeMs: 1788390000000,
      value: 641.15,
    });
    expect(result.data[other].dateTimeMs).toBe(1788386400000);
  });

  it("de-duplicates tsids", async () => {
    mockApi(() => [recentEntry(TSID, 1, 2)]);
    const result = renderHook({ tsIds: [TSID, TSID], office: "SWT" });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(getTimeSeriesRecentRaw).toHaveBeenCalledWith({ office: "SWT", tsIds: TSID });
  });

  it("splits long lists across requests instead of building one pattern", async () => {
    const ids = Array.from(
      { length: 40 },
      (_, i) => `PROJ.Opening-Gate${i}.Inst.15Minutes.0.Ccp-Rev`,
    );
    mockApi((params) =>
      params.tsIds.split(",").map((tsid, i) => recentEntry(tsid, 1000 + i, i)),
    );

    const result = renderHook({ tsIds: ids, office: "SWT" });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(getTimeSeriesRecentRaw.mock.calls.length).toBeGreaterThan(1);
    // Every id still comes back, and no request ever carries a regex.
    expect(Object.keys(result.data).sort()).toEqual([...ids].sort());
    for (const [params] of getTimeSeriesRecentRaw.mock.calls) {
      expect(params.tsIds).not.toMatch(/[\^$|()\\]/);
    }
  });

  it("ignores entries CDA omits rather than erroring", async () => {
    mockApi(() => []);
    const result = renderHook({
      tsIds: ["NOPE.Elev.Inst.1Hour.0.Bogus"],
      office: "SWT",
    });

    await waitFor(() => expect(result.isPending).toBe(false));
    expect(result.data).toEqual({});
    expect(result.isError).toBe(false);
  });

  it("does not fetch when disabled or given no tsids", () => {
    mockApi(() => []);
    renderHook({ tsIds: [TSID], office: "SWT", enabled: false });
    renderHook({ tsIds: [], office: "SWT" });

    expect(getTimeSeriesRecentRaw).not.toHaveBeenCalled();
  });

  it("surfaces a request failure", async () => {
    getTimeSeriesRecentRaw = vi.fn(async () => {
      throw new Error("Unauthorized");
    });
    TimeSeriesApi.mockImplementation(function () {
      return { getTimeSeriesRecentRaw };
    });

    const result = renderHook({ tsIds: [TSID], office: "SWT" });

    await waitFor(() => expect(result.isError).toBe(true));
    expect(result.error.message).toBe("Unauthorized");
  });
});
