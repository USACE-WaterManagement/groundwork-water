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
});
