import { render, screen, waitFor } from "@testing-library/react";
import { useEffect, useState } from "react";

vi.mock("cwmsjs", () => {
  const getTimeSeries = vi.fn();
  return {
    Configuration: class Configuration {},
    TimeSeriesApi: class TimeSeriesApi {
      getTimeSeries = getTimeSeries;
    },
  };
});

import { TimeSeriesApi } from "cwmsjs";
import CWMSTable from "../CWMSTable";

const { getTimeSeries } = new TimeSeriesApi();

const TSID = "KEYS.Elev.Inst.1Hour.0.Ccp-Rev";
const PARAMS = [{ tsid: TSID, header: "Elev" }];

// Note for anyone adding row-content assertions: @tanstack/react-virtual measures the
// scroll element with offsetWidth/offsetHeight, which jsdom reports as 0, so no rows
// render. Stub those plus getBoundingClientRect and ResizeObserver first.
const loaded = () => waitFor(() => expect(screen.queryByText(/Loading/)).toBeNull());

// Proving the absence of further requests needs a real pause, not a waitFor.
const settle = () => new Promise((resolve) => setTimeout(resolve, 250));

beforeEach(() => {
  getTimeSeries.mockReset();
  getTimeSeries.mockImplementation(async ({ name }) => ({
    name,
    units: "ft",
    values: [
      [60_000, 1.111],
      [120_000, 2.222],
    ],
  }));
});

describe("CWMSTable fetch effect", () => {
  it("fetches once per mount when props are inline literals", async () => {
    render(<CWMSTable office="NAE" timeseriesParams={PARAMS} />);
    await loaded();
    await settle();

    expect(getTimeSeries).toHaveBeenCalledTimes(1);
  });

  it("converges instead of looping when the parent re-renders", async () => {
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

    // Pre-fix this ran into the hundreds: useCdaConfig returns a new Configuration
    // every render and ts_api was an effect dependency.
    expect(getTimeSeries.mock.calls.length).toBeLessThanOrEqual(4);
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

    expect(container.querySelector(".gww-overflow-auto").style.maxHeight).toBe("45vh");
    expect(container.firstChild.className).toContain("gw-mt-4");
  });

  it("falls back to the default max height when omitted", async () => {
    const { container } = render(<CWMSTable office="NAE" timeseriesParams={PARAMS} />);
    await loaded();

    expect(container.querySelector(".gww-overflow-auto").style.maxHeight).toBe("65vh");
  });

  it("keeps the default max height when only className is supplied", async () => {
    const { container } = render(
      <CWMSTable
        office="NAE"
        timeseriesParams={PARAMS}
        tableOptions={{ className: "my-class" }}
      />,
    );
    await loaded();

    expect(container.querySelector(".gww-overflow-auto").style.maxHeight).toBe("65vh");
  });
});
