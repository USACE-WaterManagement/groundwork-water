import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCdaMultiTimeSeries from "../useCdaMultiTimeSeries";

const TSID = "KEYS.Elev-Tailwater.Inst.1Hour.0.Ccp-Rev";

function Probe({ onResult }) {
  const result = useCdaMultiTimeSeries({
    cdaParams: [{ name: TSID, office: "SWT", units: "m" }],
    cdaUrl: "https://example.test/cwms-data",
  });
  onResult(result);
  return null;
}

describe("useCdaMultiTimeSeries", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses cwmsjs's canonical units query parameter", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          name: TSID,
          units: "m",
          values: [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    let result;
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <Probe
          onResult={(value) => {
            result = value;
          }}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(result[0].isSuccess).toBe(true));

    const requestUrl = new URL(fetchMock.mock.calls[0][0]);
    expect(requestUrl.searchParams.get("units")).toBe("m");
    expect(requestUrl.searchParams.has("unit")).toBe(false);
  });

  it("follows next-page cursors and returns the combined values", async () => {
    const fetchMock = vi.fn(async (request) => {
      const page = new URL(request).searchParams.get("page");
      const body =
        page === "cursor-2"
          ? {
              name: TSID,
              units: "m",
              values: [[3, 30, 0]],
            }
          : {
              name: TSID,
              units: "m",
              values: [
                [1, 10, 0],
                [2, 20, 0],
              ],
              "next-page": "cursor-2",
            };

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    let result;
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <Probe
          onResult={(value) => {
            result = value;
          }}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(result[0].isSuccess).toBe(true));

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(new URL(fetchMock.mock.calls[0][0]).searchParams.has("page")).toBe(false);
    expect(new URL(fetchMock.mock.calls[1][0]).searchParams.get("page")).toBe(
      "cursor-2",
    );
    expect(result[0].data.values).toEqual([
      [1, 10, 0],
      [2, 20, 0],
      [3, 30, 0],
    ]);
    expect(result[0].data.nextPage).toBeUndefined();
  });

  it("fails instead of looping on a repeated next-page cursor", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          name: TSID,
          units: "m",
          values: [[1, 10, 0]],
          "next-page": "repeated-cursor",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    let result;
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <Probe
          onResult={(value) => {
            result = value;
          }}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(result[0].isError).toBe(true));

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result[0].error.message).toContain("repeated time-series page token");
  });
});
