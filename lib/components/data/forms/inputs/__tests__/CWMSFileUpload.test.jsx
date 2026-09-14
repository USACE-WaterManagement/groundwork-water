import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CWMSFileUpload from "../CWMSFileUpload";
import { FormContext } from "../../CWMSForm";

afterEach(cleanup);

describe("CWMSFileUpload file mode", () => {
  it("works without a form, never reads bytes, and emits null on clear", () => {
    const onChange = vi.fn();
    render(
      <CWMSFileUpload mode="file" label="PDF" accept=".pdf" onChange={onChange} />,
    );
    const file = new File(["%PDF-"], "sample.pdf", { type: "application/pdf" });
    file.arrayBuffer = vi.fn(() => {
      throw new Error("Must not encode");
    });
    fireEvent.change(screen.getByLabelText("PDF"), { target: { files: [file] } });
    expect(onChange).toHaveBeenLastCalledWith(file);
    expect(file.arrayBuffer).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it.each([
    [new File([], "empty.pdf"), "cannot be empty"],
    [new File(["123456"], "large.pdf"), "bytes or smaller"],
    [new File(["text"], "wrong.txt"), "Choose a file"],
  ])(
    "rejects invalid selections and clears the consumer's previous file",
    (file, message) => {
      const onChange = vi.fn();
      render(
        <CWMSFileUpload
          mode="file"
          label="PDF"
          accept=".pdf"
          maxFileSizeBytes={5}
          onChange={onChange}
        />,
      );
      fireEvent.change(screen.getByLabelText("PDF"), { target: { files: [file] } });
      expect(onChange).toHaveBeenLastCalledWith(null);
      expect(screen.getByRole("alert").textContent).toContain(message);
    },
  );

  it("does not register a blob even inside a form", () => {
    const registerInput = vi.fn();
    render(
      <FormContext.Provider value={{ registerInput }}>
        <CWMSFileUpload mode="file" />
      </FormContext.Provider>,
    );
    expect(registerInput).not.toHaveBeenCalled();
  });

  it("preserves default blob encoding and registration", async () => {
    const registerInput = vi.fn();
    render(
      <FormContext.Provider value={{ registerInput }}>
        <CWMSFileUpload label="Blob" blobId="TEST" />
      </FormContext.Provider>,
    );
    const file = new File(["hello"], "hello.txt");
    file.arrayBuffer = vi
      .fn()
      .mockResolvedValue(new Uint8Array([104, 101, 108, 108, 111]).buffer);
    fireEvent.change(screen.getByLabelText("Blob"), { target: { files: [file] } });
    await waitFor(() =>
      expect(registerInput.mock.lastCall[0].getSubmissionData({}).value).toBe(
        "aGVsbG8=",
      ),
    );
    expect(registerInput.mock.lastCall[0].kind).toBe("blob");
  });

  it("does not restore a file when a read finishes after clearing", async () => {
    const onChange = vi.fn();
    render(<CWMSFileUpload label="Blob" blobId="TEST" onChange={onChange} />);
    const first = new File(["a"], "first.txt");
    first.arrayBuffer = vi.fn().mockResolvedValue(new Uint8Array([97]).buffer);
    fireEvent.change(screen.getByLabelText("Blob"), { target: { files: [first] } });
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(first));
    let finish;
    const second = new File(["b"], "second.txt");
    second.arrayBuffer = () =>
      new Promise((resolve) => {
        finish = resolve;
      });
    fireEvent.change(screen.getByLabelText("Blob"), { target: { files: [second] } });
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    await act(async () => finish(new Uint8Array([98]).buffer));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.queryByText("second.txt")).toBeNull();
  });
});
