import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSInputTable } from "../CWMSInputTable";
import useLoadNearestValues from "../../hooks/useLoadNearestValues";

vi.mock("../../hooks/useLoadNearestValues");

const COLUMNS = [
  { tsid: "LWG.Flow-In.Ave.1Hour.1Hour.CBT-REV", label: "Flow In", units: "EN" },
  { tsid: "LWG.Elev.Inst.1Hour.0.CBT-REV", label: "Elevation", units: "EN" },
];

const TIMEOFFSETS = [0, 3600];

function renderTable(props = {}, contextOverrides = {}) {
  const registerInput = vi.fn(() => vi.fn());
  const getTimestampForInput = vi.fn((offset) => {
    const base = new Date("2025-01-15T12:00:00Z");
    base.setTime(base.getTime() + offset * 1000);
    return base.toISOString();
  });

  const context = {
    registerInput,
    getTimestampForInput,
    office: "SWD",
    cdaUrl: "https://water.usace.army.mil/cwms-data",
    baseTimestamp: "2025-01-15T12:00",
    ...contextOverrides,
  };

  const result = render(
    <FormContext.Provider value={context}>
      <CWMSInputTable columns={COLUMNS} timeoffsets={TIMEOFFSETS} {...props} />
    </FormContext.Provider>,
  );

  return { ...result, registerInput, context };
}

function mockHook({ values = {}, timestamps = {}, isPending = false } = {}) {
  useLoadNearestValues.mockReturnValue({ values, timestamps, isPending });
}

describe("CWMSInputTable nearest value loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("populates cells with loaded values", () => {
    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 100.5,
        [`${COLUMNS[0].tsid}_3600`]: 105.2,
        [`${COLUMNS[1].tsid}_0`]: 735.1,
        [`${COLUMNS[1].tsid}_3600`]: 735.4,
      },
    });
    renderTable();

    expect(screen.getByDisplayValue("100.5")).toBeTruthy();
    expect(screen.getByDisplayValue("105.2")).toBeTruthy();
    expect(screen.getByDisplayValue("735.1")).toBeTruthy();
    expect(screen.getByDisplayValue("735.4")).toBeTruthy();
  });

  it("applies precision rounding to loaded values", () => {
    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 42.567,
        [`${COLUMNS[1].tsid}_0`]: 735.123,
      },
    });
    renderTable({ precision: 1 });

    expect(screen.getByDisplayValue("42.6")).toBeTruthy();
    expect(screen.getByDisplayValue("735.1")).toBeTruthy();
  });

  it("applies per-column precision", () => {
    const cols = [
      { ...COLUMNS[0], precision: 0 },
      { ...COLUMNS[1], precision: 3 },
    ];
    mockHook({
      values: {
        [`${cols[0].tsid}_0`]: 42.567,
        [`${cols[1].tsid}_0`]: 735.1234,
      },
    });
    renderTable({ columns: cols });

    expect(screen.getByDisplayValue("43")).toBeTruthy();
    expect(screen.getByDisplayValue("735.123")).toBeTruthy();
  });

  it("shows Loading... placeholder while pending", () => {
    mockHook({ isPending: true });
    renderTable();

    const loadingInputs = screen.getAllByPlaceholderText("Loading...");
    expect(loadingInputs.length).toBeGreaterThan(0);
  });

  it("does not overwrite user-edited cell", () => {
    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 100.5,
        [`${COLUMNS[1].tsid}_0`]: 735.1,
      },
    });
    const { rerender, registerInput } = renderTable();

    const input = screen.getByDisplayValue("100.5");
    fireEvent.change(input, { target: { value: "999" } });
    expect(screen.getByDisplayValue("999")).toBeTruthy();

    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 200.0,
        [`${COLUMNS[1].tsid}_0`]: 735.1,
      },
    });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn((offset) => {
            const base = new Date("2025-01-15T12:00:00Z");
            base.setTime(base.getTime() + offset * 1000);
            return base.toISOString();
          }),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T12:00",
        }}
      >
        <CWMSInputTable columns={COLUMNS} timeoffsets={TIMEOFFSETS} />
      </FormContext.Provider>,
    );

    expect(screen.getByDisplayValue("999")).toBeTruthy();
    expect(screen.queryByDisplayValue("200")).toBeNull();
  });

  it("registers all cells with FormContext", () => {
    mockHook();
    const { registerInput } = renderTable();

    const registrations = registerInput.mock.calls.map((c) => c[0]);
    const tsidOffsets = registrations.map((r) => `${r.tsid}_${r.timeOffset}`);
    expect(tsidOffsets).toContain(`${COLUMNS[0].tsid}_0`);
    expect(tsidOffsets).toContain(`${COLUMNS[0].tsid}_3600`);
    expect(tsidOffsets).toContain(`${COLUMNS[1].tsid}_0`);
    expect(tsidOffsets).toContain(`${COLUMNS[1].tsid}_3600`);
  });

  it("shows value timestamp tooltip when showValueTimestamp is true", () => {
    const ts = new Date("2025-01-15T10:30:00Z").getTime();
    mockHook({
      values: { [`${COLUMNS[0].tsid}_0`]: 100.5 },
      timestamps: { [`${COLUMNS[0].tsid}_0`]: ts },
    });
    renderTable({ showValueTimestamp: true });

    const input = screen.getByDisplayValue("100.5");
    expect(input.title).toContain("Value from:");
  });

  it("reset restores loaded value with precision", () => {
    mockHook({
      values: { [`${COLUMNS[0].tsid}_0`]: 42.567 },
    });
    const { registerInput } = renderTable({ precision: 1 });

    expect(screen.getByDisplayValue("42.6")).toBeTruthy();

    const input = screen.getByDisplayValue("42.6");
    fireEvent.change(input, { target: { value: "999" } });

    const registration = registerInput.mock.calls
      .map((c) => c[0])
      .find((r) => r.tsid === COLUMNS[0].tsid && r.timeOffset === 0);

    act(() => {
      registration.reset();
    });

    expect(screen.getByDisplayValue("42.6")).toBeTruthy();
  });

  it("passes strategy to hook", () => {
    mockHook();
    renderTable({ loadNearest: "nearest" });

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ strategy: "nearest" }),
    );
  });
});
