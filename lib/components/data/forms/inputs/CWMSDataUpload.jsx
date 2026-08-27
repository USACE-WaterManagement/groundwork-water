import React, { useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  Field,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  UsaceBox,
  gwMerge,
} from "@usace/groundwork";
import { FormContext } from "../CWMSForm";
import CWMSPlot from "../../plots/CWMSPlot";
import useCwmsDataUpload from "../../hooks/useCwmsDataUpload";
import {
  createCwmsDataUploadTemplate,
  parseCwmsDataUploadRows,
  readCwmsDataUploadFile,
} from "../helpers/dataUpload";

const FILTER_OPTIONS = [
  { value: "all", label: "All data points" },
  { value: "existing", label: "Existing data points only" },
  { value: "new", label: "New data points only" },
];

function toInitialModel(initialData, options) {
  if (!initialData) return null;
  if (Array.isArray(initialData)) return parseCwmsDataUploadRows(initialData, options);
  if (Array.isArray(initialData.rows)) return initialData;
  return null;
}

function CWMSDataUpload({
  name = "cwmsDataUpload",
  label = "CWMS tabular data upload",
  helperText = "Upload an .xlsx workbook using the CWMS tabular data template.",
  cdaUrl,
  office,
  unit = "ft",
  timezone = "America/Chicago",
  storeRule = "REPLACE_ALL",
  overrideProtection = true,
  maxRows = 200000,
  maxIntradayYears = 10,
  maxPreviewRows = 250,
  defaultFilter = "all",
  required = true,
  disabled = false,
  showPlot = true,
  showDeleteButton = true,
  loadExistingData = true,
  initialData,
  className = "",
  onChange,
  onDeleteSuccess,
  onDeleteError,
}) {
  const formContext = useContext(FormContext);
  const registerInput = formContext?.registerInput;
  const inputId = useId();
  const fileInputRef = useRef(null);
  const options = useMemo(
    () => ({ office, timezone, maxRows, maxIntradayYears }),
    [maxIntradayYears, maxRows, office, timezone],
  );
  const [model, setModel] = useState(() => {
    try {
      return toInitialModel(initialData, options);
    } catch {
      return null;
    }
  });
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState(defaultFilter);
  const [isReading, setIsReading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [issues, setIssues] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    classifiedRows,
    filteredRows,
    existingData,
    isLoadingExisting,
    existingError,
    refreshExisting,
    deleteRows,
    isDeleting,
    deleteError,
  } = useCwmsDataUpload({
    model,
    filter,
    cdaUrl,
    unit,
    loadExistingData,
    onDeleteSuccess,
    onDeleteError,
  });

  const reset = () => {
    setModel(null);
    setFileName("");
    setFilter(defaultFilter);
    setIssues([]);
    setIsInvalid(false);
    setValidationMessage("");
    setConfirmDelete(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null);
  };

  const validate = () => {
    if (issues.length) return issues[0];
    if (required && !model?.rows?.length) return `${label} is required.`;
    if (model && !filteredRows.length) return "The selected filter contains no rows.";
    return null;
  };

  useEffect(() => {
    if (!registerInput || disabled) return undefined;
    return registerInput({
      kind: "timeseries-batch",
      name,
      label,
      required,
      getValues: () => [model?.rows?.length ? String(model.rows.length) : ""],
      getSubmissionData: () => ({
        kind: "timeseries-batch",
        name,
        rows: filteredRows,
        unit,
        storeRule,
        overrideProtection,
        cdaUrl,
      }),
      validate,
      reset,
      setInvalid: setIsInvalid,
      setValidationMessage,
    });
  }, [
    cdaUrl,
    disabled,
    filteredRows,
    issues,
    label,
    model,
    name,
    overrideProtection,
    registerInput,
    required,
    storeRule,
    unit,
  ]);

  const loadFile = async (file) => {
    if (!file || disabled) return;
    setIsReading(true);
    setIssues([]);
    setValidationMessage("");
    setIsInvalid(false);
    setConfirmDelete(false);
    try {
      const nextModel = await readCwmsDataUploadFile(file, options);
      setModel(nextModel);
      setFileName(file.name);
      onChange?.(nextModel);
    } catch (error) {
      const nextIssues = error?.issues || [
        error?.message || "Unable to read workbook.",
      ];
      setModel(null);
      setFileName(file.name);
      setIssues(nextIssues);
      setIsInvalid(true);
      setValidationMessage(nextIssues[0]);
      onChange?.(null);
    } finally {
      setIsReading(false);
    }
  };

  const downloadTemplate = async () => {
    const buffer = await createCwmsDataUploadTemplate({ office });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cwms-data-upload-template.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteRows(filteredRows);
    setConfirmDelete(false);
  };

  const previewRows = filteredRows.slice(0, maxPreviewRows);
  const uploadPlotRows = filteredRows.filter((row) => row.value !== null);
  const existingCount = classifiedRows.filter(
    (row) => row.status === "existing",
  ).length;
  const newCount = classifiedRows.length - existingCount;
  const plotData =
    existingData ||
    (model
      ? { name: model.tsid, officeId: model.office, units: unit, values: [] }
      : null);

  return (
    <div className={gwMerge("gww-flex gww-min-w-0 gww-flex-col gww-gap-4", className)}>
      <Field>
        <Label htmlFor={inputId}>{label}</Label>
        <input
          ref={fileInputRef}
          id={inputId}
          name={name}
          type="file"
          className="gww-sr-only"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          disabled={disabled}
          onChange={(event) => loadFile(event.target.files?.[0])}
        />
        <div
          className={gwMerge(
            "gww-flex gww-min-h-36 gww-flex-col gww-items-center gww-justify-center gww-gap-3 gww-rounded-lg gww-border-2 gww-border-dashed gww-p-6 gww-text-center gww-transition-colors",
            disabled
              ? "gww-cursor-not-allowed gww-border-slate-200 gww-bg-slate-100 gww-text-slate-500"
              : isInvalid
                ? "gww-border-red-400 gww-bg-red-50"
                : isDragging
                  ? "gww-border-blue-600 gww-bg-blue-50"
                  : "gww-border-slate-300 gww-bg-white hover:gww-border-slate-400",
          )}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            loadFile(event.dataTransfer?.files?.[0]);
          }}
          aria-invalid={isInvalid}
        >
          <div>
            <div className="gww-font-medium gww-text-slate-900">
              {isReading
                ? "Reading workbook..."
                : fileName || "Drag an .xlsx workbook here"}
            </div>
            <div className="gww-mt-1 gww-text-sm gww-text-slate-600">{helperText}</div>
          </div>
          <div className="gww-flex gww-flex-wrap gww-justify-center gww-gap-2">
            <Button
              type="button"
              color="secondary"
              disabled={disabled || isReading}
              onClick={() => fileInputRef.current?.click()}
            >
              Choose workbook
            </Button>
            <Button type="button" color="secondary" onClick={downloadTemplate}>
              Download template
            </Button>
            {model ? (
              <Button type="button" color="secondary" onClick={reset}>
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </Field>

      {issues.length ? (
        <div
          className="gww-rounded gww-border gww-border-red-200 gww-bg-red-50 gww-p-4 gww-text-sm gww-text-red-900"
          role="alert"
        >
          <div className="gww-font-semibold">Workbook validation failed</div>
          <ul className="gww-mt-2 gww-list-disc gww-space-y-1 gww-pl-5">
            {issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {validationMessage && !issues.length ? (
        <div className="gww-text-sm gww-text-red-700" role="alert">
          {validationMessage}
        </div>
      ) : null}

      {model ? (
        <>
          <UsaceBox title="Upload summary">
            <div className="gww-flex gww-flex-wrap gww-items-center gww-gap-2">
              <Badge color="blue">{model.office}</Badge>
              <span className="gww-break-all gww-font-mono gww-text-sm">
                {model.tsid}
              </span>
              <Badge color="gray">{classifiedRows.length.toLocaleString()} rows</Badge>
              <Badge color="green">{newCount.toLocaleString()} new</Badge>
              <Badge color="yellow">{existingCount.toLocaleString()} existing</Badge>
            </div>
            <div className="gww-mt-2 gww-text-sm gww-text-slate-600">
              {model.begin} through {model.end} · {unit} · {timezone}
            </div>
          </UsaceBox>

          <div className="gww-flex gww-flex-wrap gww-items-end gww-gap-3">
            <Field className="gww-min-w-64">
              <Label htmlFor={`${inputId}-filter`}>Rows used by form actions</Label>
              <Dropdown
                id={`${inputId}-filter`}
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                  setConfirmDelete(false);
                }}
                options={FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              />
            </Field>
            <Button
              type="button"
              color="secondary"
              disabled={isLoadingExisting}
              onClick={() => refreshExisting()}
            >
              {isLoadingExisting ? "Refreshing..." : "Refresh existing data"}
            </Button>
            {showDeleteButton ? (
              <Button
                type="button"
                color={confirmDelete ? "red" : "secondary"}
                disabled={!filteredRows.length || isDeleting}
                onClick={handleDelete}
              >
                {isDeleting
                  ? "Deleting..."
                  : confirmDelete
                    ? `Confirm delete ${filteredRows.length.toLocaleString()} rows`
                    : "Delete selected range"}
              </Button>
            ) : null}
            {confirmDelete ? (
              <Button
                type="button"
                color="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            ) : null}
          </div>

          {existingError || deleteError ? (
            <div
              className="gww-rounded gww-border gww-border-red-200 gww-bg-red-50 gww-p-3 gww-text-sm gww-text-red-900"
              role="alert"
            >
              {(existingError || deleteError)?.message || "The CDA request failed."}
            </div>
          ) : null}

          {showPlot && uploadPlotRows.length ? (
            <CWMSPlot
              office={model.office}
              cdaUrl={cdaUrl}
              unit={unit}
              timeSeries={{
                id: model.tsid,
                traceOptions: { name: "Existing data", mode: "markers" },
              }}
              inputTSValues={[plotData]}
              staticTraces={[
                {
                  x: uploadPlotRows.map((row) => new Date(row.epoch)),
                  y: uploadPlotRows.map((row) => row.value),
                  text: uploadPlotRows.map((row) => row.textValue),
                  name: "Workbook data",
                  mode: "markers",
                  type: "scatter",
                },
              ]}
              layoutOptions={{
                height: 420,
                title: { text: "Workbook and existing time-series values" },
              }}
            />
          ) : null}

          <div className="gww-min-w-0 gww-overflow-x-auto">
            <Table dense overflow stickyHeader overflowHeight="gww-max-h-[32rem]">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell>TSID</TableCell>
                  <TableCell>Date time ({timezone})</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Quality</TableCell>
                  <TableCell>Text value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previewRows.map((row) => (
                  <TableRow key={`${row.tsid}-${row.epoch}`}>
                    <TableCell>
                      <Badge color={row.status === "existing" ? "yellow" : "green"}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.office}</TableCell>
                    <TableCell>{row.tsid}</TableCell>
                    <TableCell>{row.dateTime}</TableCell>
                    <TableCell>{row.value ?? ""}</TableCell>
                    <TableCell>{row.qualityCode}</TableCell>
                    <TableCell>{row.textValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredRows.length > maxPreviewRows ? (
              <div className="gww-mt-2 gww-text-sm gww-text-slate-600">
                Showing the first {maxPreviewRows.toLocaleString()} of{" "}
                {filteredRows.length.toLocaleString()} selected rows.
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CWMSDataUpload;
export { CWMSDataUpload };
