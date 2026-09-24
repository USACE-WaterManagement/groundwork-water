import { render, screen, waitFor } from "@testing-library/react";
import { useEffect, useState } from "react";
import CWMSTable from "../CWMSTable";
import CdaUrlProvider from "../../utilities/CdaUrlProvider";

// cwmsjs is exercised for real — only the network is stubbed — so these tests cover the
// Configuration that useCdaConfig builds (base path, accept header) rather than a fake.
let fetchMock;

const DEFAULT_CDA = "https://cwms-data.usace.army.mil/cwms-data";
const TSID = "KEYS.Elev.Inst.1Hour.0.Ccp-Rev";
const PARAMS = [{ tsid: TSID, header: "Elev" }];

const requestedUrl = (call) => new URL(fetchMock.mock.calls[call][0]);
const requestedHeaders = (call) => fetchMock.mock.calls[call][1].headers;

// Tailwind emits this one because it is written here, inside the package.
const DEFAULT_HEIGHT_CLASS = "gww-max-h-[65vh]";
const scrollBox = (container) => container.querySelector(".gww-overflow-auto");

// Note for anyone adding row-content assertions: @tanstack/react-virtual measures the
// scroll element with offsetWidth/offsetHeight, which jsdom reports as 0, so no rows
// render. Stub those plus getBoundingClientRect and ResizeObserver first.
const loaded = () => waitFor(() => expect(screen.queryByText(/Loading/)).toBeNull());

// Proving the absence of further requests needs a real pause, not a waitFor.
const settle = () => new Promise((resolve) => setTimeout(resolve, 250));

beforeEach(() => {
  fetchMock = vi.fn(
    async (url) =>
      new Response(
        JSON.stringify({
          name: new URL(url).searchParams.get("name"),
          units: "ft",
          values: [
            [60_000, 1.111],
            [120_000, 2.222],
          ],
        }),
        { status: 200, headers: { "content-type": "application/json;version=2" } },
      ),
  );
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CWMSTable fetch effect", () => {
  it("fetches once per mount when props are inline literals", async () => {
    render(<CWMSTable office="NAE" timeseriesParams={PARAMS} />);
    await loaded();
    await settle();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(requestedUrl(0).origin + requestedUrl(0).pathname).toBe(
      `${DEFAULT_CDA}/timeseries`,
    );
    expect(requestedUrl(0).searchParams.get("name")).toBe(TSID);
    expect(requestedUrl(0).searchParams.get("office")).toBe("NAE");
    expect(requestedHeaders(0).accept).toBe("application/json;version=2");
  });

  it("does not refetch when the parent re-renders", async () => {
    function Parent() {
      const [tick, setTick] = useState(0);
      useEffect(() => {
        if (tick < 3) setTick((t) => t + 1);
      }, [tick]);
      // Inline array: identity changes on every parent render.
      return (
        <CWMSTable office="NAE" timeseriesParams={[{ tsid: TSID, header: "E" }]} />
      );
    }

    render(<Parent />);
    await loaded();
    await settle();

    // Pre-fix this ran into the hundreds: useCdaConfig returned a new Configuration
    // every render and ts_api was an effect dependency. The tsid list is keyed on its
    // contents, so a fresh array holding the same tsids is not a new fetch either.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("refetches against the new host when the CdaUrlProvider url changes", async () => {
    const table = <CWMSTable office="NAE" timeseriesParams={PARAMS} />;
    const { rerender } = render(
      <CdaUrlProvider url="https://one.example/cwms-data">{table}</CdaUrlProvider>,
    );
    await loaded();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(requestedUrl(0).origin).toBe("https://one.example");

    rerender(
      <CdaUrlProvider url="https://two.example/cwms-data">{table}</CdaUrlProvider>,
    );

    // The URL reaches the component only through context, so a Configuration parked in
    // a ref would leave this at one request against the old host.
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(requestedUrl(1).origin).toBe("https://two.example");
  });

  it("does not refetch when the provider url is unchanged", async () => {
    const table = <CWMSTable office="NAE" timeseriesParams={PARAMS} />;
    const { rerender } = render(
      <CdaUrlProvider url="https://one.example/cwms-data">{table}</CdaUrlProvider>,
    );
    await loaded();

    rerender(
      <CdaUrlProvider url="https://one.example/cwms-data">{table}</CdaUrlProvider>,
    );
    await settle();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("prefers the cdaUrl prop over the provider url", async () => {
    render(
      <CdaUrlProvider url="https://one.example/cwms-data">
        <CWMSTable
          office="NAE"
          timeseriesParams={PARAMS}
          cdaUrl="https://prop.example/cwms-data"
        />
      </CdaUrlProvider>,
    );
    await loaded();

    expect(requestedUrl(0).origin).toBe("https://prop.example");
  });

  it("renders supplied time-series values without an office or a CDA request", async () => {
    render(
      <CWMSTable
        timeseriesParams={PARAMS}
        inputTSValues={[
          {
            name: TSID,
            units: "ft",
            values: [[60_000, 1.111]],
          },
        ]}
      />,
    );

    await loaded();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getAllByRole("table")).toHaveLength(2);
  });
});

describe("CWMSTable tableOptions", () => {
  it("keeps the scroll box when given a legacy v3 options object", async () => {
    const { container } = render(
      <CWMSTable
        office="NAE"
        timeseriesParams={PARAMS}
        tableOptions={{
          overflow: true,
          stickyHeader: true,
          overflowHeight: "h-[45vh]",
          bleed: true,
          dense: true,
          className: "gw-mt-4",
          grid: true,
          striped: true,
        }}
      />,
    );
    await loaded();

    // A consumer height can only be applied inline — Tailwind cannot emit a class it
    // never scanned — so the packaged default class steps aside.
    expect(scrollBox(container).style.maxHeight).toBe("45vh");
    expect(scrollBox(container).classList.contains(DEFAULT_HEIGHT_CLASS)).toBe(false);
    expect(container.firstChild.className).toContain("gw-mt-4");
  });

  it("falls back to the default max height class when omitted", async () => {
    const { container } = render(<CWMSTable office="NAE" timeseriesParams={PARAMS} />);
    await loaded();

    expect(scrollBox(container).classList.contains(DEFAULT_HEIGHT_CLASS)).toBe(true);
    expect(scrollBox(container).className).toContain("gww-w-full");
    expect(scrollBox(container).className).toContain("gww-max-w-full");
    expect(container.firstChild.className).toContain("gww-min-w-0");
    expect(container.firstChild.className).toContain("gww-max-w-full");
    expect(scrollBox(container).style.maxHeight).toBe("");
  });

  it("keeps the default max height class when only className is supplied", async () => {
    const { container } = render(
      <CWMSTable
        office="NAE"
        timeseriesParams={PARAMS}
        tableOptions={{ className: "my-class" }}
      />,
    );
    await loaded();

    expect(scrollBox(container).classList.contains(DEFAULT_HEIGHT_CLASS)).toBe(true);
    expect(scrollBox(container).style.maxHeight).toBe("");
  });
});
