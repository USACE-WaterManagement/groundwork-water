import { render, act } from "@testing-library/react";
import { useCallback, useContext } from "react";
import { FormContext } from "../../FormContext";
import { useNearestValueStore, useNearestValues } from "../useNearestValueStore";
import { selectNearestValue } from "../useLoadNearestValues";
import useCdaMultiTimeSeries from "../../../hooks/useCdaMultiTimeSeries";
import useCdaCatalog from "../../../hooks/useCdaCatalog";

vi.mock("../../../hooks/useCdaMultiTimeSeries", () => ({ default: vi.fn(() => []) }));
vi.mock("../../../hooks/useCdaCatalog", () => ({ default: vi.fn() }));

const FLOW = "LWG.Flow-In.Ave.1Hour.1Hour.CBT-REV";
const ELEV = "LWG.Elev.Inst.1Hour.0.CBT-REV";

const BASE_MS = Date.parse("2025-01-15T12:00:00Z");
const DAY_MS = 24 * 60 * 60 * 1000;

// Two points per series: one an hour before the base time, one at base time.
const SERIES = {
  [FLOW]: {
    values: [
      [BASE_MS - 3600 * 1000, 100.5, 0],
      [BASE_MS, 101.5, 0],
    ],
  },
  [ELEV]: {
    values: [
      [BASE_MS - 3600 * 1000, 735.1, 0],
      [BASE_MS, 735.4, 0],
    ],
  },
};

let lastParams = [];

// Resolve what a "prev" lookup at `targetMs` sees in a (possibly seeded) series.
function selectAt(series, targetMs) {
  return selectNearestValue(series?.values, targetMs, "prev")?.value;
}

function Harness({ children, office = "SWD" }) {
  const getTimestampForInput = useCallback((offset = 0) => {
    // Mirrors CWMSForm: offsets >= 60 are seconds.
    const ms = Math.abs(offset) >= 60 ? offset * 1000 : offset * 60 * 1000;
    return new Date(BASE_MS + ms).toISOString();
  }, []);

  const nearestValues = useNearestValueStore({
    office,
    cdaUrl: "http://cda.test",
    getTimestampForInput,
    baseTimestamp: "2025-01-15T12:00",
  });

  return (
    <FormContext.Provider
      value={{
        registerInput: () => () => {},
        getTimestampForInput,
        office,
        cdaUrl: "http://cda.test",
        baseTimestamp: "2025-01-15T12:00",
        nearestValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

function Consumer({ columns, timeoffsets, strategy, onResult = () => {} }) {
  const result = useNearestValues({ columns, timeoffsets, strategy });
  onResult(result);
  return null;
}

describe("useNearestValueStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lastParams = [];
    useCdaCatalog.mockReturnValue({ data: undefined, isPending: false, error: null });
    useCdaMultiTimeSeries.mockImplementation(({ cdaParams }) => {
      lastParams = cdaParams;
      return cdaParams.map((param) => ({
        isPending: false,
        data: SERIES[param.name],
        error: null,
      }));
    });
  });

  it("issues one request per distinct tsid even when components overlap", () => {
    render(
      <Harness>
        {/* Both tables want FLOW; only the second wants ELEV. */}
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
        <Consumer
          columns={[
            { tsid: FLOW, units: "EN" },
            { tsid: ELEV, units: "EN" },
          ]}
          timeoffsets={[0]}
        />
      </Harness>,
    );

    expect(lastParams.map((p) => p.name).sort()).toEqual([ELEV, FLOW].sort());
  });

  it("covers the union of every registered offset in one window", () => {
    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[7200]} />
      </Harness>,
    );

    expect(lastParams).toHaveLength(1);
    // "prev" for both, so the window ends at the latest target (base + 2h) and
    // reaches a lookback window behind the earliest.
    expect(Date.parse(lastParams[0].end)).toBe(BASE_MS + 7200 * 1000);
    expect(Date.parse(lastParams[0].begin)).toBe(BASE_MS - DAY_MS);
  });

  it("does not fetch future data for the prev strategy", () => {
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          strategy="prev"
        />
      </Harness>,
    );

    expect(Date.parse(lastParams[0].end)).toBe(BASE_MS);
  });

  it("extends the window forward when any consumer needs next", () => {
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          strategy="prev"
        />
        <Consumer
          columns={[{ tsid: ELEV, units: "EN" }]}
          timeoffsets={[0]}
          strategy="next"
        />
      </Harness>,
    );

    // A single shared window has to satisfy both strategies.
    expect(Date.parse(lastParams[0].end)).toBe(BASE_MS + DAY_MS);
    expect(Date.parse(lastParams[0].begin)).toBe(BASE_MS - DAY_MS);
  });

  it("requests an explicit page size so the window is not truncated", () => {
    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(lastParams[0].pageSize).toBeGreaterThan(0);
  });

  it("keeps the same tsid in different units as separate series", () => {
    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
        <Consumer columns={[{ tsid: FLOW, units: "SI" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(lastParams).toHaveLength(2);
    expect(lastParams.map((p) => p.units).sort()).toEqual(["EN", "SI"]);
  });

  it("resolves each consumer's own strategy from the shared fetch", () => {
    const prevResult = vi.fn();
    const nextResult = vi.fn();

    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[-3600]}
          strategy="prev"
          onResult={prevResult}
        />
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[-3600]}
          strategy="next"
          onResult={nextResult}
        />
      </Harness>,
    );

    // Target is base - 1h, which is an exact sample, so prev and next agree
    // there; what matters is each consumer gets values back off one fetch.
    const prev = prevResult.mock.calls.at(-1)[0];
    const next = nextResult.mock.calls.at(-1)[0];
    expect(prev.values[`${FLOW}_-3600`]).toBe(100.5);
    expect(next.values[`${FLOW}_-3600`]).toBe(100.5);
    expect(lastParams).toHaveLength(1);
  });

  describe("submitted-value seeding", () => {
    // Simulates CDA's response cache: the fetch keeps returning pre-submit data
    // for a few minutes after a write.
    function renderWithSeeder() {
      const seen = { store: null, result: null };

      function Seeder() {
        seen.store = useContext(FormContext).nearestValues;
        return null;
      }

      render(
        <Harness>
          <Seeder />
          <Consumer
            columns={[{ tsid: FLOW, units: "EN" }]}
            timeoffsets={[0]}
            onResult={(r) => {
              seen.result = r;
            }}
          />
        </Harness>,
      );

      return seen;
    }

    // The case this exists for: submitting over an existing value. CDA's cached
    // response still reports the old number at that instant.
    it("shows the submitted value while the cached fetch still reports the old one", () => {
      const seen = renderWithSeeder();
      expect(seen.result.values[`${FLOW}_0`]).toBe(101.5);

      act(() => {
        seen.store.seedSubmittedValues([
          {
            tsid: FLOW,
            units: "EN",
            value: 999.9,
            timestamp: new Date(BASE_MS).toISOString(),
          },
        ]);
      });

      expect(seen.result.values[`${FLOW}_0`]).toBe(999.9);
    });

    it("shows a submitted value at an instant the series had no point for", () => {
      const seen = renderWithSeeder();

      act(() => {
        seen.store.seedSubmittedValues([
          {
            tsid: FLOW,
            units: "EN",
            value: 42.5,
            timestamp: new Date(BASE_MS - 1800 * 1000).toISOString(),
          },
        ]);
      });

      // Between the two fetched samples, so a "prev" lookup just after it finds
      // the submitted value rather than the older sample.
      expect(selectAt(seen.store.seriesByKey[`${FLOW}|EN`], BASE_MS - 60_000)).toBe(
        42.5,
      );
    });

    it("drops the seed once the fetch reports the same value", () => {
      const seen = renderWithSeeder();

      act(() => {
        // Seeding what CDA already reports means its cache has caught up.
        seen.store.seedSubmittedValues([
          {
            tsid: FLOW,
            units: "EN",
            value: 101.5,
            timestamp: new Date(BASE_MS).toISOString(),
          },
        ]);
      });

      // Series is back to exactly what was fetched - no lingering seeded point.
      expect(seen.store.seriesByKey[`${FLOW}|EN`].values).toEqual(SERIES[FLOW].values);
    });

    it("ignores entries without a usable timestamp or value", () => {
      const seen = renderWithSeeder();

      act(() => {
        seen.store.seedSubmittedValues([
          { tsid: FLOW, units: "EN", value: null, timestamp: "2025-01-15T12:00:00Z" },
          { tsid: FLOW, units: "EN", value: 5, timestamp: "not-a-date" },
        ]);
      });

      expect(seen.result.values[`${FLOW}_0`]).toBe(101.5);
    });
  });

  it("does not fetch without an office", () => {
    render(
      <Harness office={null}>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(lastParams).toEqual([]);
  });

  it("drops a series from the plan once its last consumer unmounts", () => {
    const { rerender } = render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
        <Consumer columns={[{ tsid: ELEV, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );
    expect(lastParams).toHaveLength(2);

    rerender(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );
    expect(lastParams.map((p) => p.name)).toEqual([FLOW]);
  });

  it("keeps a shared series while another consumer still needs it", () => {
    const { rerender } = render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );
    expect(lastParams).toHaveLength(1);

    rerender(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );
    // Refcounted: the identical need is still registered once.
    expect(lastParams.map((p) => p.name)).toEqual([FLOW]);
  });
});
