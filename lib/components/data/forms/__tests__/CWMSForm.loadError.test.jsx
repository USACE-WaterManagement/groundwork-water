import { act, render } from "@testing-library/react";
import { CWMSForm, shouldSeedSubmittedValue } from "../CWMSForm";
import { useNearestValueStore } from "../hooks/useNearestValueStore";
import { useCwmsFormSubmit } from "../hooks/useCwmsFormSubmit";

vi.mock("../hooks/useNearestValueStore", () => ({
  useNearestValueStore: vi.fn(),
  useNearestValues: () => ({ values: {}, timestamps: {}, isPending: false }),
}));

vi.mock("../hooks/useCwmsFormSubmit", () => ({
  useCwmsFormSubmit: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useFormValidation: () => ({ validateInputs: () => ({ isValid: true, errors: [] }) }),
}));

vi.mock("../helpers/toastHelpers.jsx", () => ({
  showSuccessToast: vi.fn(),
  showWarningToast: vi.fn(),
  formatSubmissionMessage: vi.fn(() => "Submitted"),
  showDetailedError: vi.fn(),
}));

function mockStore({ error = null } = {}) {
  const store = {
    registerDataNeed: () => () => {},
    seedSubmittedValues: vi.fn(),
    seriesByKey: {},
    targetMsByOffset: {},
    isPending: false,
    error,
  };
  useNearestValueStore.mockReturnValue(store);
  return store;
}

describe("CWMSForm nearest-value load errors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useCwmsFormSubmit.mockReturnValue({ mutate: vi.fn(), isPending: false });
  });

  it("calls onLoadError when the shared fetch fails", () => {
    const onLoadError = vi.fn();
    const error = new Error("Request timed out");
    mockStore({ error });

    render(
      <CWMSForm office="SWD" onLoadError={onLoadError}>
        <div />
      </CWMSForm>,
    );

    expect(onLoadError).toHaveBeenCalledWith(error);
  });

  it("does not call onLoadError when the fetch succeeds", () => {
    const onLoadError = vi.fn();
    mockStore({ error: null });

    render(
      <CWMSForm office="SWD" onLoadError={onLoadError}>
        <div />
      </CWMSForm>,
    );

    expect(onLoadError).not.toHaveBeenCalled();
  });

  it("fires once per failure rather than on every render", () => {
    const onLoadError = vi.fn();
    const error = new Error("Unauthorized");
    mockStore({ error });

    const { rerender } = render(
      <CWMSForm office="SWD" onLoadError={onLoadError}>
        <div />
      </CWMSForm>,
    );
    rerender(
      <CWMSForm office="SWD" onLoadError={onLoadError}>
        <div />
      </CWMSForm>,
    );

    expect(onLoadError).toHaveBeenCalledTimes(1);
  });

  it("renders without an onLoadError handler", () => {
    mockStore({ error: new Error("boom") });

    expect(() =>
      render(
        <CWMSForm office="SWD">
          <div />
        </CWMSForm>,
      ),
    ).not.toThrow();
  });
});

describe("CWMSForm submitted-value seeding", () => {
  const numericResult = {
    tsid: "KEYS.Flow.Inst.1Hour.0.Test",
    type: "numeric",
    units: "cms",
    timestamp: "2026-09-09T12:00:00Z",
    value: 99,
  };

  it.each(["REPLACE_ALL", "REPLACE ALL", "DELETE_INSERT", "REPLACE_WITH_NON_MISSING"])(
    "recognizes %s as safe to seed",
    (storeRule) => {
      expect(shouldSeedSubmittedValue(storeRule, numericResult)).toBe(true);
    },
  );

  it.each(["DO_NOT_REPLACE", "REPLACE_MISSING_VALUES_ONLY"])(
    "does not seed conditional rule %s",
    (storeRule) => {
      expect(shouldSeedSubmittedValue(storeRule, numericResult)).toBe(false);
    },
  );

  it("seeds only numeric results for a replacement rule", () => {
    const store = mockStore();
    render(
      <CWMSForm office="SWD" storeRule="REPLACE_ALL" resetOnSubmit={false}>
        <div />
      </CWMSForm>,
    );

    const { onSuccess } = useCwmsFormSubmit.mock.calls.at(-1)[0];
    act(() => {
      onSuccess({
        results: [
          numericResult,
          { ...numericResult, tsid: "KEYS.Text.None.1Hour.0.Test", type: "text" },
        ],
      });
    });

    expect(store.seedSubmittedValues).toHaveBeenCalledWith([numericResult]);
  });

  it("does not seed a successful DO_NOT_REPLACE attempt", () => {
    const store = mockStore();
    render(
      <CWMSForm office="SWD" storeRule="DO_NOT_REPLACE" resetOnSubmit={false}>
        <div />
      </CWMSForm>,
    );

    const { onSuccess } = useCwmsFormSubmit.mock.calls.at(-1)[0];
    act(() => {
      onSuccess({ results: [numericResult] });
    });

    expect(store.seedSubmittedValues).not.toHaveBeenCalled();
  });
});
