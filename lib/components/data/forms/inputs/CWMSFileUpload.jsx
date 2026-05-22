import React, { useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { Field, Label, Button } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

const bytesToBase64 = async (file) => {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return window.btoa(binary);
};

const readFileValue = async (file, readAs) => {
  if (readAs === "text") {
    return file.text();
  }

  return bytesToBase64(file);
};

function CWMSFileUpload({
  blobId,
  officeId,
  description,
  mediaTypeId,
  failIfExists = false,
  label,
  helperText,
  accept,
  className = "",
  dropzoneClassName = "",
  maxFileSizeBytes,
  readAs = "base64",
  required = false,
  disabled = false,
  readonly = false,
  invalid = false,
  onChange,
  name,
  placeholder = "Drag and drop a file here, or choose one from your device.",
}) {
  const { registerInput } = useContext(FormContext);
  const inputId = useId();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [encodedValue, setEncodedValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(invalid || false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resolvedLabel = label || name || blobId || "Upload file";

  const clearInvalidState = () => {
    setIsInvalid(false);
    setValidationMessage("");
  };

  const setFileState = async (file) => {
    if (!file) {
      setSelectedFile(null);
      setEncodedValue("");
      clearInvalidState();
      if (onChange) {
        onChange(null);
      }
      return;
    }

    if (file.size === 0) {
      setSelectedFile(file);
      setEncodedValue("");
      setIsInvalid(true);
      setValidationMessage(`${resolvedLabel} cannot be empty`);
      if (onChange) {
        onChange(file);
      }
      return;
    }

    if (maxFileSizeBytes && file.size > maxFileSizeBytes) {
      setSelectedFile(file);
      setEncodedValue("");
      setIsInvalid(true);
      setValidationMessage(
        `${resolvedLabel} must be ${maxFileSizeBytes.toLocaleString()} bytes or smaller`,
      );
      if (onChange) {
        onChange(file);
      }
      return;
    }

    setIsReading(true);

    try {
      const value = await readFileValue(file, readAs);
      setSelectedFile(file);
      setEncodedValue(value);
      clearInvalidState();
      if (onChange) {
        onChange(file);
      }
    } catch (error) {
      setSelectedFile(file);
      setEncodedValue("");
      setIsInvalid(true);
      setValidationMessage(
        error?.message || `Unable to read ${file.name} for ${resolvedLabel}`,
      );
    } finally {
      setIsReading(false);
    }
  };

  const resetInput = () => {
    setSelectedFile(null);
    setEncodedValue("");
    clearInvalidState();
    setIsReading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateSelection = () => {
    if (!blobId) {
      return `${resolvedLabel} requires a blobId`;
    }

    if (required && !selectedFile) {
      return `${resolvedLabel} is required`;
    }

    if (!selectedFile) {
      return null;
    }

    if (selectedFile.size === 0) {
      return `${resolvedLabel} cannot be empty`;
    }

    if (maxFileSizeBytes && selectedFile.size > maxFileSizeBytes) {
      return `${resolvedLabel} must be ${maxFileSizeBytes.toLocaleString()} bytes or smaller`;
    }

    if (!encodedValue) {
      return `Select a valid file before submitting ${resolvedLabel}`;
    }

    return null;
  };

  useEffect(() => {
    if (!registerInput) return;

    const inputRef = {
      kind: "blob",
      name,
      blobId,
      officeId,
      description,
      mediaTypeId,
      failIfExists,
      required,
      label: resolvedLabel,
      getValues: () => [selectedFile?.name || ""],
      getSubmissionData: ({ timestamp }) => ({
        kind: "blob",
        blobId,
        officeId,
        description,
        mediaTypeId: mediaTypeId || selectedFile?.type || undefined,
        failIfExists,
        fileName: selectedFile?.name,
        fileSize: selectedFile?.size,
        timestamp,
        value: encodedValue,
        values: [selectedFile?.name || ""],
      }),
      validate: validateSelection,
      reset: resetInput,
      setInvalid: setIsInvalid,
      setValidationMessage,
    };

    return registerInput(inputRef);
  }, [
    blobId,
    description,
    encodedValue,
    failIfExists,
    mediaTypeId,
    name,
    officeId,
    registerInput,
    required,
    resolvedLabel,
    selectedFile,
  ]);

  const dropzoneClasses = useMemo(() => {
    const stateClasses =
      disabled || readonly
        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
        : isDragging
          ? "border-blue-600 bg-blue-50 text-slate-900"
          : isInvalid
            ? "border-red-500 bg-red-50 text-slate-900"
            : "border-slate-300 bg-white text-slate-900 hover:border-slate-400";

    return [
      "flex min-h-36 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors",
      stateClasses,
      className,
      dropzoneClassName,
    ]
      .filter(Boolean)
      .join(" ");
  }, [className, disabled, dropzoneClassName, isDragging, isInvalid, readonly]);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!disabled && !readonly) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled || readonly) return;

    const file = event.dataTransfer?.files?.[0];
    await setFileState(file);
  };

  const handleBrowseClick = () => {
    if (!disabled && !readonly) {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = async (event) => {
    const file = event.target.files?.[0];
    await setFileState(file);
  };

  return (
    <Field className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{resolvedLabel}</Label>
      <input
        ref={fileInputRef}
        id={inputId}
        name={name}
        type="file"
        className="hidden"
        accept={accept}
        disabled={disabled || readonly}
        onChange={handleInputChange}
      />
      <div
        className={dropzoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-invalid={isInvalid}
      >
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isReading ? "Reading file..." : placeholder}
          </p>
          {selectedFile ? (
            <div className="text-sm">
              <div>{selectedFile.name}</div>
              <div className="text-slate-500">
                {selectedFile.size.toLocaleString()} bytes
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              {accept ? `Accepted file types: ${accept}` : "Any file type accepted"}
            </p>
          )}
          {maxFileSizeBytes ? (
            <p className="text-xs text-slate-500">
              Max file size: {maxFileSizeBytes.toLocaleString()} bytes
            </p>
          ) : null}
        </div>
        <div className="mt-4 flex gap-3">
          <Button type="button" color="secondary" onClick={handleBrowseClick}>
            Choose File
          </Button>
          {selectedFile ? (
            <Button type="button" color="secondary" onClick={resetInput}>
              Clear
            </Button>
          ) : null}
        </div>
      </div>
      {helperText ? <div className="text-xs text-slate-500">{helperText}</div> : null}
      {validationMessage ? (
        <div className="text-sm text-red-600">{validationMessage}</div>
      ) : null}
    </Field>
  );
}

export default CWMSFileUpload;
export { CWMSFileUpload };
