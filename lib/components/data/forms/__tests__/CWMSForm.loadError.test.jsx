import { render } from "@testing-library/react";
import { CWMSForm } from "../CWMSForm";
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

function mockStore({ error = null } = {}) {
  useNearestValueStore.mockReturnValue({
    registerDataNeed: () => () => {},
    seedSubmittedValues: vi.fn(),
    seriesByKey: {},
    targetMsByOffset: {},
    isPending: false,
    error,
  });
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
