import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSSpreadsheet } from "../CWMSSpreadsheet";
import useLoadNearestValues from "../../hooks/useLoadNearestValues";

vi.mock("../../hooks/useLoadNearestValues");

const COLUMNS = [
  { tsid: "LWG.Flow-In.Ave.1Hour.1Hour.CBT-REV", label: "Flow In" },
  { tsid: "LWG.Elev.Inst.1Hour.0.CBT-REV", label: "Elevation" },
];

const TIMEOFFSETS = [0, 60];

function renderSpreadsheet(props = {}, contextOverrides = {}) {
  const registerInput = vi.fn(() => vi.fn());
  const getTimestampForInput = vi.fn((offset) => {
    const base = new Date("2025-01-15T12:00:00Z");
    base.setTime(base.getTime() + offset * 60 * 1000);
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
      <CWMSSpreadsheet
        columns={COLUMNS}
        rows={2}
        timeoffsets={TIMEOFFSETS}
        showRowNumbers={false}
        showColumnHeaders={false}
        {...props}
      />
    </FormContext.Provider>,
  );

  return { ...result, registerInput, context };
}

function mockHook({ values = {}, timestamps = {}, isPending = false } = {}) {
  useLoadNearestValues.mockReturnValue({ values, timestamps, isPending });
}

describe("CWMSSpreadsheet nearest value loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("populates cells with loaded values", () => {
    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 100.5,
        [`${COLUMNS[0].tsid}_60`]: 105.2,
        [`${COLUMNS[1].tsid}_0`]: 735.1,
        [`${COLUMNS[1].tsid}_60`]: 735.4,
      },
    });
    renderSpreadsheet();

    expect(screen.getByDisplayValue("100.5")).toBeTruthy();
    expect(screen.getByDisplayValue("105.2")).toBeTruthy();
    expect(screen.getByDisplayValue("735.1")).toBeTruthy();
    expect(screen.getByDisplayValue("735.4")).toBeTruthy();
  });

  it("shows Loading... placeholder while pending", () => {
    mockHook({ isPending: true });
    renderSpreadsheet();

    const loadingInputs = screen.getAllByPlaceholderText("Loading...");
    expect(loadingInputs.length).toBeGreaterThan(0);
  });

  it("does not overwrite user-edited cell", () => {
    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 100.5,
      },
    });
    const { rerender, registerInput } = renderSpreadsheet();

    const input = screen.getByDisplayValue("100.5");
    fireEvent.change(input, { target: { value: "999" } });
    expect(screen.getByDisplayValue("999")).toBeTruthy();

    mockHook({
      values: {
        [`${COLUMNS[0].tsid}_0`]: 200.0,
      },
    });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn((offset) => {
            const base = new Date("2025-01-15T12:00:00Z");
            base.setTime(base.getTime() + offset * 60 * 1000);
            return base.toISOString();
          }),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T12:00",
        }}
      >
        <CWMSSpreadsheet
          columns={COLUMNS}
          rows={2}
          timeoffsets={TIMEOFFSETS}
          showRowNumbers={false}
          showColumnHeaders={false}
        />
      </FormContext.Provider>,
    );

    expect(screen.getByDisplayValue("999")).toBeTruthy();
    expect(screen.queryByDisplayValue("200")).toBeNull();
  });

  it("shows value timestamp tooltip when showValueTimestamp is true", () => {
    const ts = new Date("2025-01-15T10:30:00Z").getTime();
    mockHook({
      values: { [`${COLUMNS[0].tsid}_0`]: 100.5 },
      timestamps: { [`${COLUMNS[0].tsid}_0`]: ts },
    });
    renderSpreadsheet({ showValueTimestamp: true });

    const input = screen.getByDisplayValue("100.5");
    expect(input.title).toContain("Value from:");
  });

  it("reset restores loaded value", () => {
    mockHook({
      values: { [`${COLUMNS[0].tsid}_0`]: 42.5 },
    });
    const { registerInput } = renderSpreadsheet();

    expect(screen.getByDisplayValue("42.5")).toBeTruthy();

    const input = screen.getByDisplayValue("42.5");
    fireEvent.change(input, { target: { value: "999" } });
    expect(screen.getByDisplayValue("999")).toBeTruthy();

    // The spreadsheet registers cells with name like "rowIdx_colIdx"
    // Column 0 with timeoffsets has a time column prepended, so data col 0 is at col index 1
    const registrations = registerInput.mock.calls.map((c) => c[0]);
    const cellReg = registrations.find(
      (r) => r.tsid === COLUMNS[0].tsid && r.timeOffset === 0,
    );

    act(() => {
      cellReg.reset();
    });

    expect(screen.getByDisplayValue("42.5")).toBeTruthy();
  });

  it("passes strategy to hook", () => {
    mockHook();
    renderSpreadsheet({ loadNearest: "next" });

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ strategy: "next" }),
    );
  });

  it("disables loading when no office is set", () => {
    mockHook();
    renderSpreadsheet({}, { office: undefined });

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });
});
