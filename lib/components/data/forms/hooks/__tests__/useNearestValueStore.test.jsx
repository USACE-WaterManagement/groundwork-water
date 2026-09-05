import { render, act } from "@testing-library/react";
import { useCallback, useContext } from "react";
import { FormContext } from "../../FormContext";
import { useNearestValueStore, useNearestValues } from "../useNearestValueStore";
import { selectNearestValue } from "../useLoadNearestValues";
import useCdaMultiTimeSeries from "../../../hooks/useCdaMultiTimeSeries";
import useCdaRecentValues from "../../../hooks/useCdaRecentValues";

vi.mock("../../../hooks/useCdaMultiTimeSeries", () => ({ default: vi.fn(() => []) }));
vi.mock("../../../hooks/useCdaRecentValues", () => ({ default: vi.fn() }));

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

function Harness({
  children,
  office = "SWD",
  onStore = () => {},
  baseMs = BASE_MS,
  lookback,
  lookahead,
}) {
  const getTimestampForInput = useCallback(
    (offset = 0) => {
      // Mirrors CWMSForm: offsets >= 60 are seconds.
      const ms = Math.abs(offset) >= 60 ? offset * 1000 : offset * 60 * 1000;
      return new Date(baseMs + ms).toISOString();
    },
    [baseMs],
  );

  const nearestValues = useNearestValueStore({
    office,
    cdaUrl: "http://cda.test",
    getTimestampForInput,
    baseTimestamp: new Date(baseMs).toISOString(),
  });

  onStore(nearestValues);

  return (
    <FormContext.Provider
      value={{
        registerInput: () => () => {},
        getTimestampForInput,
        office,
        cdaUrl: "http://cda.test",
        baseTimestamp: new Date(baseMs).toISOString(),
        lookback,
        lookahead,
        nearestValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

function Consumer({
  columns,
  timeoffsets,
  strategy,
  lookback,
  lookahead,
  onResult = () => {},
}) {
  const result = useNearestValues({
    columns,
    timeoffsets,
    strategy,
    lookback,
    lookahead,
  });
  onResult(result);
  return null;
}

describe("useNearestValueStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lastParams = [];
    useCdaRecentValues.mockReturnValue({ data: {}, isPending: false, error: null });
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

describe("recent-value fallback", () => {
  const OLD_MS = BASE_MS - 5 * DAY_MS;
  const OLD_ISO = new Date(OLD_MS).toISOString();

  beforeEach(() => {
    vi.clearAllMocks();
    lastParams = [];
    useCdaRecentValues.mockReturnValue({ data: {}, isPending: false, error: null });
  });

  // The default window is a day wide; a series whose last value is older than
  // that comes back empty and has to be found by its last-value timestamp.
  function mockEmptyUntilPinned() {
    useCdaMultiTimeSeries.mockImplementation(({ cdaParams }) => {
      lastParams = cdaParams;
      return cdaParams.map((param) => ({
        isPending: false,
        data: param.end === OLD_ISO ? { values: [[OLD_MS, 42.5, 0]] } : { values: [] },
        error: null,
      }));
    });
  }

  it("looks up only the series whose window came back empty", () => {
    useCdaMultiTimeSeries.mockImplementation(({ cdaParams }) => {
      lastParams = cdaParams;
      return cdaParams.map((param) => ({
        isPending: false,
        data: param.name === FLOW ? { values: [] } : SERIES[param.name],
        error: null,
      }));
    });

    render(
      <Harness>
        <Consumer
          columns={[
            { tsid: FLOW, units: "EN" },
            { tsid: ELEV, units: "EN" },
          ]}
          timeoffsets={[0]}
        />
      </Harness>,
    );

    expect(useCdaRecentValues).toHaveBeenCalledWith(
      expect.objectContaining({ tsIds: [FLOW], enabled: true }),
    );
  });

  it("asks by TSID list rather than by pattern", () => {
    mockEmptyUntilPinned();

    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    const { tsIds } = useCdaRecentValues.mock.calls.at(-1)[0];
    expect(tsIds).toEqual([FLOW]);
    // Regression guard for ORA-12733: nothing here may be a regular expression.
    tsIds.forEach((tsid) => expect(tsid).not.toMatch(/[\^$|()\\]/));
  });

  it("re-fetches pinned to the last value and resolves it", () => {
    mockEmptyUntilPinned();
    useCdaRecentValues.mockReturnValue({
      data: { [FLOW]: { tsid: FLOW, dateTimeMs: OLD_MS } },
      isPending: false,
      error: null,
    });

    let latest;
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(lastParams[0].end).toBe(OLD_ISO);
    expect(latest.values[`${FLOW}_0`]).toBe(42.5);
  });

  it("skips the lookup entirely when every window returned data", () => {
    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(useCdaRecentValues).toHaveBeenCalledWith(
      expect.objectContaining({ tsIds: [], enabled: false }),
    );
  });

  // The consumer-level flag deliberately reports only on *its* series, and an
  // empty first response counts as resolved, so the store is what to assert on.
  it("keeps the store pending while the lookup is in flight", () => {
    mockEmptyUntilPinned();
    useCdaRecentValues.mockReturnValue({ data: {}, isPending: true, error: null });

    let store;
    render(
      <Harness
        onStore={(value) => {
          store = value;
        }}
      >
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(store.isPending).toBe(true);
  });

  it("surfaces a lookup failure", () => {
    mockEmptyUntilPinned();
    const error = new Error("Unauthorized");
    useCdaRecentValues.mockReturnValue({ data: {}, isPending: false, error });

    let latest;
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(latest.error).toBe(error);
  });
});

describe("lookback window", () => {
  const DAYS = (n) => n * DAY_MS;
  // A gage that only reports weekly: its last value is 5 days before the form's
  // calendar time, so a one-day window finds nothing.
  const LAST_MS = BASE_MS - DAYS(5);

  function mockWindowedSeries() {
    useCdaMultiTimeSeries.mockImplementation(({ cdaParams }) => {
      lastParams = cdaParams;
      return cdaParams.map((param) => {
        const beginMs = Date.parse(param.begin);
        const endMs = Date.parse(param.end);
        const inWindow = LAST_MS >= beginMs && LAST_MS <= endMs;
        return {
          isPending: false,
          data: { values: inWindow ? [[LAST_MS, 42.5, 0]] : [] },
          error: null,
        };
      });
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    lastParams = [];
    useCdaRecentValues.mockReturnValue({ data: {}, isPending: false, error: null });
    mockWindowedSeries();
  });

  function windowSpan() {
    return Date.parse(lastParams[0].end) - Date.parse(lastParams[0].begin);
  }

  it("defaults to a one-day lookback", () => {
    render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(windowSpan()).toBe(DAY_MS);
  });

  it("widens the window from the form-level setting", () => {
    let latest;
    render(
      <Harness lookback={7}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(windowSpan()).toBe(DAYS(7));
    // The five-day-old value is now inside the window, with no fallback needed.
    expect(latest.values[`${FLOW}_0`]).toBe(42.5);
    expect(useCdaRecentValues).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });

  it("lets a component override the form-level setting", () => {
    render(
      <Harness lookback={7}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          lookback={30}
        />
      </Harness>,
    );

    expect(windowSpan()).toBe(DAYS(30));
  });

  it("lets a column override everything above it", () => {
    render(
      <Harness lookback={7}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN", lookback: 14 }]}
          timeoffsets={[0]}
          lookback={2}
        />
      </Harness>,
    );

    expect(windowSpan()).toBe(DAYS(14));
  });

  it("keeps each series on its own window", () => {
    render(
      <Harness>
        <Consumer
          columns={[
            { tsid: FLOW, units: "EN", lookback: 10 },
            { tsid: ELEV, units: "EN" },
          ]}
          timeoffsets={[0]}
        />
      </Harness>,
    );

    const spans = Object.fromEntries(
      lastParams.map((p) => [p.name, Date.parse(p.end) - Date.parse(p.begin)]),
    );
    expect(spans[FLOW]).toBe(DAYS(10));
    expect(spans[ELEV]).toBe(DAY_MS);
  });

  it("covers the wider window when two components disagree about one series", () => {
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN", lookback: 3 }]}
          timeoffsets={[0]}
        />
        <Consumer
          columns={[{ tsid: FLOW, units: "EN", lookback: 12 }]}
          timeoffsets={[0]}
        />
      </Harness>,
    );

    // Still one request - the shared window just has to satisfy both.
    expect(lastParams).toHaveLength(1);
    expect(windowSpan()).toBe(DAYS(12));
  });

  it("extends the lookahead for a next lookup", () => {
    render(
      <Harness lookahead={4}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          strategy="next"
        />
      </Harness>,
    );

    expect(Date.parse(lastParams[0].end) - BASE_MS).toBe(DAYS(4));
  });
});

describe("following the form calendar", () => {
  const DAYS = (n) => n * DAY_MS;
  // Only value in the series, five days before the default calendar time.
  const LAST_MS = BASE_MS - DAYS(5);

  beforeEach(() => {
    vi.clearAllMocks();
    lastParams = [];
    useCdaMultiTimeSeries.mockImplementation(({ cdaParams }) => {
      lastParams = cdaParams;
      return cdaParams.map((param) => {
        const beginMs = Date.parse(param.begin);
        const endMs = Date.parse(param.end);
        const inWindow = LAST_MS >= beginMs && LAST_MS <= endMs;
        return {
          isPending: false,
          data: { values: inWindow ? [[LAST_MS, 42.5, 0]] : [] },
          error: null,
        };
      });
    });
    useCdaRecentValues.mockReturnValue({
      data: { [FLOW]: { tsid: FLOW, dateTimeMs: LAST_MS } },
      isPending: false,
      error: null,
    });
  });

  it("reaches back to a series that ended before the window", () => {
    let latest;
    render(
      <Harness>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(lastParams[0].end).toBe(new Date(LAST_MS).toISOString());
    expect(latest.values[`${FLOW}_0`]).toBe(42.5);
  });

  // Regression: a pin used to be keyed by series alone and survived forever, so
  // once the fallback fired the fetch stopped following the calendar and every
  // later date change was served from a frozen window.
  it("re-aims the window when the operator shifts the calendar", () => {
    const { rerender } = render(
      <Harness>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );
    expect(lastParams[0].end).toBe(new Date(LAST_MS).toISOString());

    const shifted = BASE_MS - DAYS(10);
    rerender(
      <Harness baseMs={shifted}>
        <Consumer columns={[{ tsid: FLOW, units: "EN" }]} timeoffsets={[0]} />
      </Harness>,
    );

    expect(lastParams[0].end).toBe(new Date(shifted).toISOString());
    expect(Date.parse(lastParams[0].begin)).toBe(shifted - DAY_MS);
  });

  // The last value is *after* a shifted-back target, so it is not a "prev"
  // answer for it. Pinning to it would show the operator a value from the
  // wrong side of the date they picked.
  it("does not reach forward to a value newer than the target", () => {
    const shifted = BASE_MS - DAYS(10);
    let latest;
    render(
      <Harness baseMs={shifted}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(lastParams[0].end).toBe(new Date(shifted).toISOString());
    // No previous value exists within lookback, which is the honest answer.
    expect(latest.values[`${FLOW}_0`]).toBeNull();
  });

  // ...and widening the lookback is what actually reaches it.
  it("finds the value once lookback covers the gap", () => {
    const shifted = BASE_MS - DAYS(3);
    let latest;
    render(
      <Harness baseMs={shifted} lookback={7}>
        <Consumer
          columns={[{ tsid: FLOW, units: "EN" }]}
          timeoffsets={[0]}
          onResult={(result) => {
            latest = result;
          }}
        />
      </Harness>,
    );

    expect(latest.values[`${FLOW}_0`]).toBe(42.5);
  });
});
