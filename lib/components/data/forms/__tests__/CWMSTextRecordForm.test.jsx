import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CWMSTextRecordForm } from "../CWMSTextRecordForm";
import { CWMSInput } from "../inputs/CWMSInput";
import { appendCwmsTextRecord, readCwmsTextRecords } from "../helpers/textRecords";

const { post, get, configs } = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
  configs: [],
}));
vi.mock("cwmsjs", () => ({
  Configuration: class {
    constructor(value) {
      configs.push(value);
    }
  },
  TextTimeSeriesApi: class {
    postTimeSeriesText = post;
    getTimeSeriesText = get;
  },
}));
vi.mock("../hooks/useCwmsFormSubmit", async (importOriginal) => ({
  ...(await importOriginal()),
  useCwmsFormSubmit: () => ({ isPending: false }),
}));
vi.mock("../../utilities/auth/useAuth", () => ({
  useAuth: () => ({ token: "test-token" }),
}));

describe("CWMS JSON text records", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    configs.length = 0;
  });
  it("appends one JSON record with explicit UTC and no replacement", async () => {
    await appendCwmsTextRecord({
      cdaUrl: "/cda",
      token: "token",
      office: "SWT",
      tsid: "Test.Text.Inst.0.0.Test",
      dateTime: "2020-01-01T12:00:00Z",
      value: { status: 0, notes: "123 maintenance" },
    });
    expect(post.mock.calls[0][0]).toMatchObject({
      replaceAll: false,
      textTimeSeries: {
        officeId: "SWT",
        timeZone: "UTC",
        regularTextValues: [{ textValue: '{"status":0,"notes":"123 maintenance"}' }],
      },
    });
    expect(configs[0]).toMatchObject({
      credentials: "include",
      headers: { Authorization: "Bearer token" },
    });
  });
  it("does not retry or swallow an uncertain write failure", async () => {
    post.mockRejectedValueOnce(new Error("Connection lost"));
    await expect(
      appendCwmsTextRecord({
        cdaUrl: "/cda",
        office: "SWT",
        tsid: "test",
        dateTime: "2020-01-01",
        value: {},
      }),
    ).rejects.toThrow("Connection lost");
    expect(post).toHaveBeenCalledTimes(1);
  });
  it("rejects malformed or indirect text rather than dropping history", async () => {
    const options = {
      cdaUrl: "/cda",
      office: "SWT",
      tsid: "test",
      begin: "2020-01-01",
      end: "2021-01-01",
    };
    get.mockResolvedValueOnce({ regularTextValues: [{ textValue: "bad" }] });
    await expect(readCwmsTextRecords(options)).rejects.toThrow("Invalid JSON");
    get.mockResolvedValueOnce({
      regularTextValues: [{ valueUrl: "https://example.test" }],
    });
    await expect(readCwmsTextRecords(options)).rejects.toThrow("Inline text");
  });
  it("preserves a prepared event on retry and lets a receipt check avoid duplicate appends", async () => {
    const prepareRecord = vi.fn(() => ({
      dateTime: "2020-01-01",
      value: { id: "event-1" },
    }));
    const beforeStore = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const onSaved = vi.fn();
    post.mockRejectedValueOnce(new Error("Connection lost"));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <CWMSTextRecordForm
          office="SWT"
          cdaUrl="/cda"
          tsid="test"
          prepareRecord={prepareRecord}
          beforeStore={beforeStore}
          onSaved={onSaved}
          showCalendar={false}
        >
          <CWMSInput name="notes" defaultValue="check" />
        </CWMSTextRecordForm>
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText("Submit").closest("button").disabled).toBe(false),
    );
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
    expect(prepareRecord).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);
  });
});
