import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CWMSForm } from "../CWMSForm";
import { CWMSInput } from "../inputs/CWMSInput";

const { mutate, warning, errorToast } = vi.hoisted(() => ({
  mutate: vi.fn(),
  warning: vi.fn(),
  errorToast: vi.fn(),
}));
vi.mock("../hooks/useCwmsFormSubmit", async (importOriginal) => ({
  ...(await importOriginal()),
  useCwmsFormSubmit: () => ({ mutate, isPending: false }),
}));
vi.mock("../helpers/toastHelpers.jsx", async (importOriginal) => ({
  ...(await importOriginal()),
  showWarningToast: warning,
  showDetailedError: errorToast,
}));

function setup(props = {}) {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <CWMSForm showCalendar={false} {...props}>
        <CWMSInput
          name="condition"
          tsid="TEST.Status.Inst.0.0.Test"
          defaultValue="1"
          required
        />
      </CWMSForm>
    </QueryClientProvider>,
  );
}

describe("CWMSForm custom submission", () => {
  beforeEach(() => vi.clearAllMocks());
  it("awaits named field data, blocks duplicate submissions and never writes to CWMS", async () => {
    let resolve;
    const onSubmit = vi.fn(
      () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    const onSuccess = vi.fn();
    const onReset = vi.fn();
    const { container } = setup({
      submissionMode: "custom",
      onSubmit,
      onSuccess,
      onReset,
    });
    fireEvent.submit(container.querySelector("form"));
    fireEvent.submit(container.querySelector("form"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0][0]).toMatchObject({
      name: "condition",
      values: ["1"],
    });
    expect(screen.getByText("Submitting...").closest("button").disabled).toBe(true);
    expect(onSuccess).not.toHaveBeenCalled();
    resolve({ saved: true });
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ saved: true }));
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(mutate).not.toHaveBeenCalled();
    expect(warning).not.toHaveBeenCalled();
  });
  it("retains inputs on failure and reports errors", async () => {
    const error = new Error("Save failed");
    const onError = vi.fn();
    const onReset = vi.fn();
    setup({
      submissionMode: "custom",
      onSubmit: async () => {
        throw error;
      },
      onError,
      onReset,
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
    expect(screen.getByDisplayValue("1")).toBeTruthy();
    expect(onReset).not.toHaveBeenCalled();
    expect(mutate).not.toHaveBeenCalled();
  });
  it("requires a handler in custom mode", async () => {
    const onError = vi.fn();
    setup({ submissionMode: "custom", onError });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(mutate).not.toHaveBeenCalled();
  });
  it("preserves default CWMS submission", () => {
    const onSubmit = vi.fn();
    setup({ onSubmit });
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
  it("validates required fields before calling a custom handler", () => {
    const onSubmit = vi.fn();
    const { container } = setup({ submissionMode: "custom", onSubmit });
    fireEvent.change(screen.getByDisplayValue("1"), { target: { value: "" } });
    fireEvent.submit(container.querySelector("form"));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(warning).toHaveBeenCalled();
  });
});
