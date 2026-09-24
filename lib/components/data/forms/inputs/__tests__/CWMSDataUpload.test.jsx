import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CWMSForm } from "../../CWMSForm";
import CWMSDataUpload from "../CWMSDataUpload";
import { CWMS_DATA_UPLOAD_HEADERS } from "../../helpers/dataUpload";

vi.mock("cwmsjs", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    TimeSeriesApi: class {
      getTimeSeries = vi.fn();
      postTimeSeries = vi.fn().mockResolvedValue(undefined);
      deleteTimeSeriesWithTimeSeries = vi.fn().mockResolvedValue(undefined);
    },
    TextTimeSeriesApi: class {
      postTimeSeriesText = vi.fn().mockResolvedValue(undefined);
      deleteTimeSeriesTextWithName = vi.fn().mockResolvedValue(undefined);
    },
  };
});

const initialData = [
  CWMS_DATA_UPLOAD_HEADERS,
  ["MVS", "TEST.Stage.Inst.1Hour.0.TEST", "2026-01-01 00:00", "10.25", "0", "", "note"],
];

const renderUpload = (onSubmit = vi.fn()) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <CWMSForm
        office="MVS"
        showCalendar={false}
        resetOnSubmit={false}
        onSubmit={onSubmit}
      >
        <CWMSDataUpload
          office="MVS"
          initialData={initialData}
          loadExistingData={false}
          showPlot={false}
          showDeleteButton={false}
        />
      </CWMSForm>
    </QueryClientProvider>,
  );
  return onSubmit;
};

describe("CWMSDataUpload", () => {
  afterEach(() => vi.clearAllMocks());

  it("renders parsed rows with Groundwork form controls", () => {
    renderUpload();

    expect(screen.getByText("Upload summary")).toBeTruthy();
    expect(screen.getAllByText("TEST.Stage.Inst.1Hour.0.TEST").length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText("10.25")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Download template" }).disabled).toBe(
      false,
    );
  });

  it("registers a batch payload with CWMSForm", async () => {
    const onSubmit = renderUpload();
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0][0]).toMatchObject({
      kind: "timeseries-batch",
      unit: "ft",
      rows: [
        expect.objectContaining({
          office: "MVS",
          tsid: "TEST.Stage.Inst.1Hour.0.TEST",
          value: 10.25,
        }),
      ],
    });
  });
});
