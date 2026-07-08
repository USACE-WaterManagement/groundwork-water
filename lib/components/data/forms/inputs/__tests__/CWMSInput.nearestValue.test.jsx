import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSInput } from "../CWMSInput";
import useLoadNearestValues from "../../hooks/useLoadNearestValues";

vi.mock("../../hooks/useLoadNearestValues");

const TSID = "LWG.Flow-In.Ave.1Hour.1Hour.CBT-REV";

function renderInput(props = {}, contextOverrides = {}) {
  const registerInput = vi.fn(() => vi.fn());
  const getTimestampForInput = vi.fn(() => "2025-01-15T12:00:00.000Z");

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
      <CWMSInput name="flow-in" label="Flow In" tsid={TSID} timeOffset={0} {...props} />
    </FormContext.Provider>,
  );

  return { ...result, registerInput, context };
}

function mockHook({ values = {}, timestamps = {}, isPending = false } = {}) {
  useLoadNearestValues.mockReturnValue({ values, timestamps, isPending });
}

describe("CWMSInput nearest value loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("populates input with loaded value", () => {
    mockHook({ values: { [`${TSID}_0`]: 42.5 } });
    renderInput();
    expect(screen.getByDisplayValue("42.5")).toBeTruthy();
  });

  it("shows Loading... placeholder while pending", () => {
    mockHook({ isPending: true });
    renderInput();
    expect(screen.getByPlaceholderText("Loading...")).toBeTruthy();
  });

  it("does not overwrite user-edited value", () => {
    mockHook({ values: { [`${TSID}_0`]: 42.5 } });
    const { rerender, registerInput } = renderInput();

    const input = screen.getByDisplayValue("42.5");
    fireEvent.change(input, { target: { value: "99" } });
    expect(screen.getByDisplayValue("99")).toBeTruthy();

    mockHook({ values: { [`${TSID}_0`]: 55.0 } });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn(() => "2025-01-15T12:00:00.000Z"),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T12:00",
        }}
      >
        <CWMSInput name="flow-in" label="Flow In" tsid={TSID} timeOffset={0} />
      </FormContext.Provider>,
    );

    expect(screen.getByDisplayValue("99")).toBeTruthy();
    expect(screen.queryByDisplayValue("55")).toBeNull();
  });

  it("resets userEdited flag when baseTimestamp changes", () => {
    mockHook({ values: { [`${TSID}_0`]: 42.5 } });
    const { rerender, registerInput } = renderInput();

    fireEvent.change(screen.getByDisplayValue("42.5"), {
      target: { value: "99" },
    });

    // Phase 1: baseTimestamp changes, hook is pending (resets userEdited ref)
    mockHook({ isPending: true });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn(() => "2025-01-15T13:00:00.000Z"),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T13:00",
        }}
      >
        <CWMSInput name="flow-in" label="Flow In" tsid={TSID} timeOffset={0} />
      </FormContext.Provider>,
    );

    // Phase 2: new values arrive after userEdited was reset
    mockHook({ values: { [`${TSID}_0`]: 77.0 } });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn(() => "2025-01-15T13:00:00.000Z"),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T13:00",
        }}
      >
        <CWMSInput name="flow-in" label="Flow In" tsid={TSID} timeOffset={0} />
      </FormContext.Provider>,
    );

    expect(screen.getByDisplayValue("77")).toBeTruthy();
  });

  it("shows value timestamp tooltip when showValueTimestamp is true", () => {
    const ts = new Date("2025-01-15T10:30:00Z").getTime();
    mockHook({
      values: { [`${TSID}_0`]: 42.5 },
      timestamps: { [`${TSID}_0`]: ts },
    });
    renderInput({ showValueTimestamp: true });

    const input = screen.getByDisplayValue("42.5");
    expect(input.title).toContain("Value from:");
  });

  it("removes tooltip after user edit", () => {
    const ts = new Date("2025-01-15T10:30:00Z").getTime();
    mockHook({
      values: { [`${TSID}_0`]: 42.5 },
      timestamps: { [`${TSID}_0`]: ts },
    });
    const { rerender, registerInput } = renderInput({ showValueTimestamp: true });

    const input = screen.getByDisplayValue("42.5");
    expect(input.title).toContain("Value from:");

    fireEvent.change(input, { target: { value: "99" } });

    mockHook({
      values: { [`${TSID}_0`]: 42.5 },
      timestamps: { [`${TSID}_0`]: ts },
    });
    rerender(
      <FormContext.Provider
        value={{
          registerInput,
          getTimestampForInput: vi.fn(() => "2025-01-15T12:00:00.000Z"),
          office: "SWD",
          cdaUrl: "https://water.usace.army.mil/cwms-data",
          baseTimestamp: "2025-01-15T12:00",
        }}
      >
        <CWMSInput
          name="flow-in"
          label="Flow In"
          tsid={TSID}
          timeOffset={0}
          showValueTimestamp
        />
      </FormContext.Provider>,
    );

    const edited = screen.getByDisplayValue("99");
    expect(edited.title).toBeFalsy();
  });

  it("does not overwrite caller-provided defaultValue", () => {
    mockHook({ values: { [`${TSID}_0`]: 42.5 } });
    renderInput({ defaultValue: "0" });
    expect(screen.getByDisplayValue("0")).toBeTruthy();
  });

  it("reset restores to defaultValue and allows reload", () => {
    mockHook({ values: { [`${TSID}_0`]: 42.5 } });
    const { registerInput } = renderInput();

    const input = screen.getByDisplayValue("42.5");
    fireEvent.change(input, { target: { value: "99" } });
    expect(screen.getByDisplayValue("99")).toBeTruthy();

    const registration = registerInput.mock.calls.at(-1)?.[0];
    act(() => {
      registration.reset();
    });

    // After reset, userEdited is cleared and the loadedValues effect
    // repopulates the input with the nearest value
    expect(screen.getByDisplayValue("42.5")).toBeTruthy();
  });

  it("passes the loadNearest strategy to the hook", () => {
    mockHook();
    renderInput({ loadNearest: "next" });

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ strategy: "next" }),
    );
  });

  it("defaults loadNearest strategy to prev", () => {
    mockHook();
    renderInput();

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ strategy: "prev" }),
    );
  });

  it("does not load when tsid is missing", () => {
    mockHook();
    renderInput({ tsid: undefined });

    expect(useLoadNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });
});
