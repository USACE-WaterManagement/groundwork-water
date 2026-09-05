import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSInputTable } from "../CWMSInputTable";
import { useNearestValues } from "../../hooks/useNearestValueStore";

vi.mock("../../hooks/useNearestValueStore");

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
      <CWMSInputTable
        columns={COLUMNS}
        timeoffsets={TIMEOFFSETS}
        loadNearest="prev"
        {...props}
      />
    </FormContext.Provider>,
  );

  return { ...result, registerInput, context };
}

function mockHook({ values = {}, timestamps = {}, isPending = false } = {}) {
  useNearestValues.mockReturnValue({ values, timestamps, isPending });
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

  describe("changed vs prefilled styling", () => {
    const KEY = `${COLUMNS[0].tsid}_0`;

    function renderOne(props = {}) {
      mockHook({ values: { [KEY]: 100.5 } });
      return renderTable({ columns: [COLUMNS[0]], timeoffsets: [0], ...props });
    }

    // Asserted on inline style, not className: the Groundwork Input applies
    // className to its wrapping control, so only style reaches the input.
    it("dims a prefilled cell and does not embolden it", () => {
      renderOne();
      const input = screen.getByRole("spinbutton");
      expect(input.value).toBe("100.5");
      expect(input.style.opacity).toBe("0.7");
      expect(input.style.fontWeight).toBe("");
    });

    it("emboldens a cell the operator changed", () => {
      renderOne();
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "108" } });

      expect(input.style.fontWeight).toBe("600");
      expect(input.style.opacity).toBe("");
    });

    // The reason status is derived by comparison rather than tracked as a flag:
    // typing the loaded value back is not a change.
    it("treats a cell typed back to the loaded value as unchanged", () => {
      renderOne();
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "108" } });
      fireEvent.change(input, { target: { value: "100.5" } });

      expect(input.style.opacity).toBe("0.7");
      expect(input.style.fontWeight).toBe("");
    });

    it("leaves cells alone when nothing was loaded for them", () => {
      mockHook({ values: {} });
      renderTable({ columns: [COLUMNS[0]], timeoffsets: [0] });
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "5" } });

      // No baseline to compare against, so no changed/prefilled styling.
      expect(input.style.opacity).toBe("");
      expect(input.style.fontWeight).toBe("");
    });

    // A caller-supplied default takes precedence over the fetched value, so the
    // default is what the cell started at - it must not read as an edit.
    it("treats a hard-coded default as the baseline, not as a change", () => {
      mockHook({ values: { [KEY]: 100.5 } });
      renderTable({
        columns: [{ ...COLUMNS[0], defaultValues: { 0: "50" } }],
        timeoffsets: [0],
      });

      const input = screen.getByRole("spinbutton");
      expect(input.value).toBe("50");
      expect(input.style.fontWeight).toBe("");
      expect(input.style.opacity).toBe("0.7");
    });

    it("marks a defaulted cell changed once it is edited away from the default", () => {
      mockHook({ values: { [KEY]: 100.5 } });
      renderTable({
        columns: [{ ...COLUMNS[0], defaultValues: { 0: "50" } }],
        timeoffsets: [0],
      });

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "51" } });
      expect(input.style.fontWeight).toBe("600");

      // ...and back to the default is unchanged again.
      fireEvent.change(input, { target: { value: "50" } });
      expect(input.style.opacity).toBe("0.7");
      expect(input.style.fontWeight).toBe("");
    });

    it("reports the default as the baseline to cellClassName", () => {
      const seen = [];
      mockHook({ values: { [KEY]: 100.5 } });
      renderTable({
        columns: [{ ...COLUMNS[0], defaultValues: { 0: "50" } }],
        timeoffsets: [0],
        cellClassName: (status) => {
          seen.push(status);
          return "";
        },
      });

      expect(seen.at(-1)).toMatchObject({
        value: "50",
        defaultValue: "50",
        baseline: "50",
        loadedValue: "100.5",
        loaded: true,
        changed: false,
        prefilled: true,
      });
    });

    it("can be turned off with highlightChanged", () => {
      renderOne({ highlightChanged: false });
      expect(screen.getByRole("spinbutton").style.opacity).toBe("");
    });

    it("passes cell status to cellClassName and applies it to the cell", () => {
      const seen = [];
      renderOne({
        cellClassName: (status) => {
          seen.push(status);
          return status.changed ? "ring-2 ring-amber-400" : "gw-unchanged";
        },
      });

      const input = screen.getByRole("spinbutton");
      const cell = input.closest("td");
      expect(cell.className).toContain("gw-unchanged");
      expect(seen.at(-1)).toMatchObject({
        tsid: COLUMNS[0].tsid,
        offset: 0,
        key: KEY,
        loadedValue: "100.5",
        loaded: true,
        changed: false,
        prefilled: true,
      });

      fireEvent.change(input, { target: { value: "108" } });
      expect(cell.className).toContain("ring-2");
      expect(seen.at(-1)).toMatchObject({ changed: true, prefilled: false });
    });

    it("keeps default styling when cellClassName returns nothing", () => {
      renderOne({ cellClassName: () => undefined });
      expect(screen.getByRole("spinbutton").style.opacity).toBe("0.7");
    });
  });

  describe("per-column overrides", () => {
    // A read-only "previous value" column beside an editable entry column, both
    // pointing at the same series. The id is what keeps their cells distinct.
    const REFERENCE_PAIR = [
      {
        tsid: COLUMNS[0].tsid,
        id: "previous",
        label: "Previous",
        loadNearest: "prev",
        disabled: true,
      },
      { tsid: COLUMNS[0].tsid, id: "entry", label: "New" },
    ];

    it("loads only the columns that opted in", () => {
      mockHook({ values: { previous_0: 100.5, entry_0: 100.5 } });
      renderTable({
        columns: REFERENCE_PAIR,
        timeoffsets: [0],
        loadNearest: undefined,
      });

      // Reference column shows the previous value; the entry column stays empty
      // even though it points at the same time series.
      expect(screen.getByDisplayValue("100.5")).toBeTruthy();
      expect(screen.queryAllByDisplayValue("100.5")).toHaveLength(1);
    });

    it("keeps two columns on one series from sharing cell state", () => {
      mockHook({ values: { previous_0: 100.5 } });
      renderTable({
        columns: REFERENCE_PAIR,
        timeoffsets: [0],
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[1], { target: { value: "42" } });

      // Editing the entry column must not disturb the reference column.
      expect(inputs[0].value).toBe("100.5");
      expect(inputs[1].value).toBe("42");
    });

    it("registers only the column that is not disabled", () => {
      mockHook({ values: { previous_0: 100.5 } });
      const { registerInput } = renderTable({
        columns: REFERENCE_PAIR,
        timeoffsets: [0],
        loadNearest: undefined,
      });

      // Registration re-runs as matrixData changes, so check the distinct set.
      const names = new Set(registerInput.mock.calls.map((c) => c[0].name));
      expect([...names]).toEqual(["entry_0"]);
    });

    it("renders a disabled column as disabled and leaves siblings editable", () => {
      mockHook({ values: { previous_0: 100.5 } });
      renderTable({
        columns: REFERENCE_PAIR,
        timeoffsets: [0],
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs[0].disabled).toBe(true);
      expect(inputs[1].disabled).toBe(false);
    });

    it("ignores a change event on a disabled cell", () => {
      mockHook({ values: { previous_0: 100.5 } });
      renderTable({
        columns: REFERENCE_PAIR,
        timeoffsets: [0],
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      // The DOM attribute stops a real user, but the component must not record
      // an edit either if a change event reaches it anyway.
      fireEvent.change(inputs[0], { target: { value: "777" } });
      expect(inputs[0].value).toBe("100.5");
    });

    it("lets a column override the table strategy", () => {
      mockHook();
      renderTable({
        columns: [{ tsid: COLUMNS[0].tsid, loadNearest: "next" }],
        loadNearest: "prev",
      });

      const spec = useNearestValues.mock.calls.at(-1)[0];
      expect(spec.columns).toHaveLength(1);
      expect(spec.columns[0].loadNearest).toBe("next");
    });
  });

  describe("per-row overrides", () => {
    // The transposed shape of the same idea: one row shows the last recorded
    // value, the row beside it is for entry.
    const REFERENCE_ROWS = [
      { offset: 0, id: "last", label: "Last", loadNearest: "prev", disabled: true },
      { offset: 0, id: "new", label: "New" },
    ];

    it("accepts row objects alongside plain offsets", () => {
      mockHook({ values: { [`${COLUMNS[0].tsid}_last`]: 100.5 } });
      renderTable({
        columns: [COLUMNS[0]],
        timeoffsets: REFERENCE_ROWS,
        loadNearest: undefined,
      });

      expect(screen.queryAllByDisplayValue("100.5")).toHaveLength(1);
    });

    it("registers only the row that is not disabled", () => {
      mockHook({ values: { [`${COLUMNS[0].tsid}_last`]: 100.5 } });
      const { registerInput } = renderTable({
        columns: [COLUMNS[0]],
        timeoffsets: REFERENCE_ROWS,
        loadNearest: undefined,
      });

      const names = new Set(registerInput.mock.calls.map((c) => c[0].name));
      expect([...names]).toEqual([`${COLUMNS[0].tsid}_new`]);
    });

    it("keeps two rows on one instant from sharing cell state", () => {
      mockHook({ values: { [`${COLUMNS[0].tsid}_last`]: 100.5 } });
      renderTable({
        columns: [COLUMNS[0]],
        timeoffsets: REFERENCE_ROWS,
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[1], { target: { value: "42" } });
      expect(inputs[0].value).toBe("100.5");
      expect(inputs[1].value).toBe("42");
    });

    // Mirrors the transposed docs example exactly: rows become the visual
    // columns, so the disabled row must still render disabled cells.
    it("disables the right cells when transposed", () => {
      mockHook({
        values: {
          "Gate 1_last": 12.3,
          "Gate 2_last": 4.5,
        },
      });
      renderTable({
        transpose: true,
        columns: [
          { tsid: "Gate 1", label: "Gate 1" },
          { tsid: "Gate 2", label: "Gate 2" },
        ],
        timeoffsets: [
          {
            offset: 0,
            id: "last",
            label: "Last recorded",
            loadNearest: "prev",
            disabled: true,
          },
          { offset: 0, id: "new", label: "New setting" },
        ],
        showTimestamps: false,
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      const state = inputs.map((el) => ({ name: el.name, disabled: el.disabled }));
      expect(state).toEqual([
        { name: "Gate 1_last", disabled: true },
        { name: "Gate 1_new", disabled: false },
        { name: "Gate 2_last", disabled: true },
        { name: "Gate 2_new", disabled: false },
      ]);

      // And the disabled cell rejects an edit that reaches it anyway.
      fireEvent.change(inputs[0], { target: { value: "999" } });
      expect(inputs[0].value).toBe("12.3");
    });

    it("applies readonly from a row", () => {
      mockHook({ values: { [`${COLUMNS[0].tsid}_ref`]: 100.5 } });
      renderTable({
        columns: [COLUMNS[0]],
        timeoffsets: [
          { offset: 0, id: "ref", loadNearest: "prev", readonly: true },
          { offset: 0, id: "entry" },
        ],
        loadNearest: undefined,
      });

      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs[0].readOnly).toBe(true);
      expect(inputs[1].readOnly).toBe(false);
      // readonly is not disabled - the cell stays focusable and submittable.
      expect(inputs[0].disabled).toBe(false);
    });

    // Documents why the reference pattern must use disabled, not readonly:
    // readonly cells still register, and two cells on the same tsid+offset
    // collide on the form's registration id.
    it("readonly rows still register and collide on the same tsid+offset", () => {
      mockHook({ values: { [`${COLUMNS[0].tsid}_ref`]: 100.5 } });
      const { registerInput } = renderTable({
        columns: [COLUMNS[0]],
        timeoffsets: [
          { offset: 0, id: "ref", loadNearest: "prev", readonly: true },
          { offset: 0, id: "entry" },
        ],
        loadNearest: undefined,
      });

      const registered = registerInput.mock.calls.map((c) => c[0]);
      // Both cells register...
      expect(new Set(registered.map((r) => r.name))).toEqual(
        new Set([`${COLUMNS[0].tsid}_ref`, `${COLUMNS[0].tsid}_entry`]),
      );
      // ...under the same tsid and timeOffset, which is what CWMSForm keys its
      // registry by, so one silently replaces the other.
      const ids = registered.map((r) => `${r.tsid}_${r.timeOffset}`);
      expect(new Set(ids).size).toBe(1);
    });

    // Renders the transposed docs example verbatim and checks the three things
    // that break when timeoffsets row objects are not normalized: headers
    // stringify the object, both rows collapse onto one cell key, and the
    // reference cell is editable.
    it("renders the transposed docs example correctly", () => {
      mockHook({ values: { "Gate 1_last": 12.3, "Gate 2_last": 4.5 } });
      renderTable({
        transpose: true,
        columns: [
          { tsid: "Gate 1", label: "Gate 1" },
          { tsid: "Gate 2", label: "Gate 2" },
        ],
        timeoffsets: [
          {
            offset: 0,
            id: "last",
            label: "Last recorded",
            loadNearest: "prev",
            readonly: true,
          },
          { offset: 0, id: "new", label: "New setting" },
        ],
        showTimestamps: false,
        loadNearest: undefined,
      });

      // 1. Row labels, not "Offset [object Object]s"
      expect(screen.getByText("Last recorded")).toBeTruthy();
      expect(screen.getByText("New setting")).toBeTruthy();
      expect(screen.queryByText(/\[object Object\]/)).toBeNull();

      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs.map((el) => el.name)).toEqual([
        "Gate 1_last",
        "Gate 1_new",
        "Gate 2_last",
        "Gate 2_new",
      ]);

      // 2. readonly is applied to the reference cells only
      expect(inputs[0].readOnly).toBe(true);
      expect(inputs[1].readOnly).toBe(false);

      // 3. Typing in the entry cell does not leak into the reference cell
      fireEvent.change(inputs[1], { target: { value: "77" } });
      expect(inputs[1].value).toBe("77");
      expect(inputs[0].value).toBe("12.3");

      // ...and the read-only cell rejects an edit that reaches it
      fireEvent.change(inputs[0], { target: { value: "999" } });
      expect(inputs[0].value).toBe("12.3");
    });

    it("lets a column override a row", () => {
      mockHook();
      renderTable({
        columns: [{ tsid: COLUMNS[0].tsid, loadNearest: "next" }],
        timeoffsets: [{ offset: 0, loadNearest: "prev" }],
        loadNearest: undefined,
      });

      // Most specific wins: column over row over table.
      const spec = useNearestValues.mock.calls.at(-1)[0];
      expect(spec.columns[0].loadNearest).toBe("next");
    });
  });

  // Reference-column pattern: a disabled table alongside an editable one shows
  // the operator what the value was without competing to submit it. Relies on
  // disable gating registration but not loading.
  it("still loads values when disabled so it can act as a reference column", () => {
    mockHook({ values: { [`${COLUMNS[0].tsid}_0`]: 100.5 } });
    renderTable({ disable: true });

    expect(screen.getByDisplayValue("100.5")).toBeTruthy();
  });

  it("does not register cells when disabled, leaving the entry table to submit", () => {
    mockHook({ values: { [`${COLUMNS[0].tsid}_0`]: 100.5 } });
    const { registerInput } = renderTable({ disable: true });

    expect(registerInput).not.toHaveBeenCalled();
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

    expect(useNearestValues).toHaveBeenCalledWith(
      expect.objectContaining({ strategy: "nearest" }),
    );
  });
});
