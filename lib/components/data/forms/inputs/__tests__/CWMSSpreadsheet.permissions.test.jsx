import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSSpreadsheet } from "../CWMSSpreadsheet";

// Permission tests should not need network access or real CDA data.
vi.mock("../../hooks/useNearestValueStore", () => ({
  useNearestValues: () => ({
    values: null,
    timestamps: null,
    isPending: false,
  }),
}));

const COLUMNS = [
  { tsid: "TEST.Elev.Inst.15Minutes.0.Raw", type: "number", label: "Elevation" },
];
const TIMEOFFSETS = [{ offset: 0 }, { offset: 15 }];
const DEFAULT_DATA = [["10"], ["20"]];

afterEach(cleanup);

function renderSpreadsheet(props = {}) {
  const registrations = new Map();
  const registerInput = vi.fn((input) => {
    registrations.set(input.name, input);
    return () => registrations.delete(input.name);
  });

  const view = render(
    <FormContext.Provider
      value={{
        registerInput,
        baseTimestamp: "2026-11-06T08:00",
        getTimestampForInput: () => "2026-11-06T08:00:00.000Z",
      }}
    >
      <CWMSSpreadsheet
        rows={2}
        columns={COLUMNS}
        timeoffsets={TIMEOFFSETS}
        defaultData={DEFAULT_DATA}
        showCopyAllDataButton={false}
        showSelectAllButton={false}
        {...props}
      />
    </FormContext.Provider>,
  );

  const cell = (row, col) =>
    view.container.querySelector(`tbody input[name="${row}_${col}"]`);

  return { ...view, registrations, registerInput, cell };
}

describe("CWMSSpreadsheet disabled / readOnly overrides (#382)", () => {
  it("disables the whole sheet except one cell, registering only enabled cells", () => {
    const { cell, registrations } = renderSpreadsheet({
      disabled: true,
      cellOverrides: { "1_1": { disabled: false } },
    });

    expect(cell(0, 0).disabled).toBe(true); // timestamp
    expect(cell(1, 0).disabled).toBe(true); // timestamp
    expect(cell(0, 1).disabled).toBe(true);
    expect(cell(1, 1).disabled).toBe(false);
    expect(registrations.has("0_1")).toBe(false);
    expect(registrations.has("1_1")).toBe(true);

    fireEvent.change(cell(1, 1), { target: { value: "99" } });
    expect(cell(1, 1).value).toBe("99");
    expect(cell(0, 1).value).toBe("10");
  });

  it("preserves legacy disable and allows a cell to override a disabled column", () => {
    const { cell, registrations } = renderSpreadsheet({
      disable: true,
      columns: [{ ...COLUMNS[0], disabled: true }],
      cellOverrides: { "1_1": { disabled: false } },
    });

    expect(cell(0, 1).disabled).toBe(true);
    expect(cell(1, 1).disabled).toBe(false);
    expect(registrations.has("0_1")).toBe(false);
    expect(registrations.has("1_1")).toBe(true);
  });

  it("applies readOnly overrides but keeps read-only cells registered", () => {
    const { cell, registrations } = renderSpreadsheet({
      readOnly: true,
      cellOverrides: { "1_1": { readOnly: false } },
    });

    expect(cell(0, 1).readOnly).toBe(true);
    expect(cell(1, 1).readOnly).toBe(false);
    expect(registrations.get("0_1").readonly).toBe(true);
    expect(registrations.get("1_1").readonly).toBe(false);
    expect(cell(0, 1).disabled).toBe(false);
  });

  it("preserves legacy readonly and can override it using a cell", () => {
    const { cell } = renderSpreadsheet({
      readonly: true,
      cellOverrides: { "1_1": { readonly: false } },
    });

    expect(cell(0, 1).readOnly).toBe(true);
    expect(cell(1, 1).readOnly).toBe(false);
  });

  it("skips disabled targets during multi-cell paste in transposed mode", () => {
    const { cell } = renderSpreadsheet({
      transpose: true,
      disabled: true,
      cellOverrides: { "0_1": { disabled: false } },
    });

    fireEvent.paste(cell(0, 1), {
      clipboardData: { getData: () => "33\t44" },
    });

    expect(cell(0, 1).value).toBe("33");
    expect(cell(1, 1).value).toBe("20");
  });

  it("preserves disabled cells during range Delete in transposed mode", () => {
    const { cell } = renderSpreadsheet({
      transpose: true,
      disabled: true,
      cellOverrides: { "1_1": { disabled: false } },
    });

    // Select both elevation cells, starting from the editable one.
    fireEvent.mouseDown(cell(1, 1).closest("td"));
    fireEvent.mouseEnter(cell(0, 1).closest("td"));
    fireEvent.mouseUp(cell(0, 1).closest("td"));
    fireEvent.keyDown(cell(1, 1), { key: "Delete", code: "Delete" });

    expect(cell(0, 1).value).toBe("10");
    expect(cell(1, 1).value).toBe("");
  });
});
