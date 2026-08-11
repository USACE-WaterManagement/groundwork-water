import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";
import { useNearestValues } from "../hooks/useNearestValueStore";
import { cellKeyFor } from "../hooks/useLoadNearestValues";

function CWMSInputTable({
  className,
  style,
  disable,
  invalid,
  columns = [],
  timeoffsets = [],
  precision = 2,
  order = 1,
  AllowMissingData = true,
  loadNearest,
  readonly = false,
  units = "EN",
  onChange,
  showTimestamps = true,
  showValueTimestamp = false,
  required = false,
  transpose = false,
}) {
  const { registerInput, getTimestampForInput, baseTimestamp } =
    useContext(FormContext);

  // Initialize matrixData from column defaultValues
  const getInitialMatrixData = () => {
    const data = {};
    columns.forEach((column) => {
      if (column.defaultValues) {
        Object.entries(column.defaultValues).forEach(([offset, value]) => {
          data[cellKeyFor(column, offset)] = value;
        });
      }
    });
    return data;
  };

  // Whether a column loads values is decided per column, falling back to the
  // table. Only the opted-in columns are handed to the store, so a column left
  // out stays empty for entry.
  const columnLoadsNearest = (column) => !!(column.loadNearest ?? loadNearest);
  const loadingColumns = useMemo(
    () => columns.filter(columnLoadsNearest),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, loadNearest],
  );

  const [matrixData, setMatrixData] = useState(getInitialMatrixData);
  const [invalidCells, setInvalidCells] = useState({});
  const cleanupFunctions = useRef([]);
  const userEdited = useRef(new Set());
  const loadedValuesRef = useRef({});

  const {
    values: loadedValues,
    timestamps: loadedTimestamps,
    isPending: isLoadingNearest,
  } = useNearestValues({
    columns: loadingColumns,
    timeoffsets,
    strategy: loadNearest || "prev",
    defaultUnits: units,
    enabled: loadingColumns.length > 0 && timeoffsets.length > 0,
  });

  useEffect(() => {
    if (loadedValues) loadedValuesRef.current = loadedValues;
  }, [loadedValues]);

  useEffect(() => {
    if (isLoadingNearest || !loadedValues) return;

    setMatrixData((prev) => {
      const next = { ...prev };
      let changed = false;

      // Walk the opted-in columns rather than the loaded map, so a column that
      // did not ask to load is left alone even when a sibling column pulls the
      // same time series.
      loadingColumns.forEach((column) => {
        const columnDefaults = column.defaultValues ?? {};
        const p = column.precision ?? precision;

        timeoffsets.forEach((offset) => {
          const key = cellKeyFor(column, offset);
          const value = loadedValues[key];
          if (value == null) return;
          // A caller-supplied default takes precedence over a fetched value.
          if (columnDefaults[offset] !== undefined) return;
          if (userEdited.current.has(key)) return;

          const rounded = parseFloat(value.toFixed(p)).toString();
          if (next[key] !== rounded) {
            next[key] = rounded;
            changed = true;
          }
        });
      });

      return changed ? next : prev;
    });
  }, [loadedValues, isLoadingNearest, loadingColumns, timeoffsets, precision]);

  useEffect(() => {
    userEdited.current.clear();
  }, [baseTimestamp]);

  useEffect(() => {
    if (!registerInput) return;

    // Don't register disabled inputs for submission
    if (disable) return;

    // Clean up any previous registrations
    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    // Register each cell as an individual input
    columns.forEach((column) => {
      const {
        tsid,
        units: columnUnits,
        precision: columnPrecision,
        required: columnRequired,
        readonly: columnReadonly,
        defaultValues: columnDefaultValues = {},
      } = column;

      // A disabled column is display-only: skip it so it never submits, and so
      // a reference column cannot collide with the entry column beside it.
      if (column.disabled ?? column.disable) return;

      timeoffsets.forEach((offset) => {
        const key = cellKeyFor(column, offset);

        const cellRef = {
          name: key,
          tsid: tsid,
          precision: columnPrecision ?? precision,
          offset: offset || 0,
          order: order,
          AllowMissingData: AllowMissingData,
          loadNearest: loadNearest,
          readonly: columnReadonly ?? readonly,
          units: columnUnits ?? units,
          timeOffset: offset,
          required: columnRequired ?? required,
          label: column.label || `${tsid} at ${offset}s`,
          getValues: () => [matrixData[key] || ""],
          reset: () => {
            userEdited.current.delete(key);
            // Mirror the populate effect: a caller-supplied default takes
            // precedence over the fetched nearest value.
            const hasDefault = columnDefaultValues[offset] !== undefined;
            const nearestRaw = loadedValuesRef.current[key];
            let resetVal = hasDefault ? columnDefaultValues[offset] : "";
            if (!hasDefault && nearestRaw != null) {
              const p = columnPrecision ?? precision;
              resetVal = parseFloat(nearestRaw.toFixed(p)).toString();
            }
            setMatrixData((prev) => ({
              ...prev,
              [key]: resetVal,
            }));
            setInvalidCells((prev) => ({
              ...prev,
              [key]: false,
            }));
          },
          setInvalid: (invalid) => {
            setInvalidCells((prev) => ({
              ...prev,
              [key]: invalid,
            }));
          },
        };

        const cleanup = registerInput(cellRef);
        if (cleanup) {
          cleanupFunctions.current.push(cleanup);
        }
      });
    });

    // Cleanup function for the effect
    return () => {
      cleanupFunctions.current.forEach((cleanup) => cleanup());
      cleanupFunctions.current = [];
    };
  }, [
    registerInput,
    columns,
    timeoffsets,
    matrixData,
    precision,
    order,
    AllowMissingData,
    loadNearest,
    readonly,
    units,
    required,
    disable,
  ]);

  const handleInputChange = (column, offset, value) => {
    const key = cellKeyFor(column, offset);
    userEdited.current.add(key);
    const updatedData = {
      ...matrixData,
      [key]: value,
    };
    setMatrixData(updatedData);

    // Clear invalid state when user starts typing
    if (invalidCells[key] && value) {
      setInvalidCells((prev) => ({
        ...prev,
        [key]: false,
      }));
    }

    if (onChange) {
      onChange(updatedData);
    }
  };

  const formatValueTimestamp = (tsMs) => {
    if (!tsMs) return null;
    const date = new Date(tsMs);
    return date.toLocaleString("sv-SE").replace("T", " ");
  };

  const formatTimestamp = (offset) => {
    if (getTimestampForInput) {
      // Use the form's timestamp function which includes snapping
      const timestamp = getTimestampForInput(offset);
      const date = new Date(timestamp);
      // Use toLocaleString for local time display
      return date.toLocaleString("sv-SE").replace("T", " ");
    }
    // Fallback if not in a form context
    const currentTime = new Date();
    const offsetTime = new Date(currentTime.getTime() + offset * 1000);
    return offsetTime.toLocaleString("sv-SE").replace("T", " ");
  };

  if (transpose) {
    // Transposed layout: columns (TSIDs) as rows, timeoffsets as columns
    return (
      <table className={`w-full border-collapse mb-5 ${className || ""}`} style={style}>
        <thead>
          <tr>
            <th className="p-2 text-left border-b-2 border-gray-300">Parameter</th>
            {timeoffsets.map((offset, index) => (
              <th key={index} className="p-2 text-left border-b-2 border-gray-300">
                {showTimestamps ? (
                  <Input
                    type="text"
                    value={formatTimestamp(offset)}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-300 p-1"
                  />
                ) : (
                  `Offset ${offset}s`
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((column, colIndex) => {
            const columnReadonly = column.readonly ?? readonly;
            const columnRequired = column.required ?? required;
            const columnDisabled = column.disabled ?? column.disable ?? disable;

            return (
              <tr key={colIndex}>
                <td className="p-2 font-medium">
                  {column.label || column.tsid}
                  {column.displayUnits && (
                    <span className="ml-1 text-sm text-gray-500">
                      ({column.displayUnits})
                    </span>
                  )}
                </td>
                {timeoffsets.map((offset, offsetIndex) => {
                  const key = cellKeyFor(column, offset);
                  const cellLoading = isLoadingNearest && !matrixData[key];
                  const valueTs =
                    showValueTimestamp && !userEdited.current.has(key)
                      ? formatValueTimestamp(loadedTimestamps?.[key])
                      : null;
                  return (
                    <td key={offsetIndex} className="p-2">
                      <Input
                        name={key}
                        type="number"
                        step={column.step}
                        value={matrixData[key] || ""}
                        onChange={(e) =>
                          handleInputChange(column, offset, e.target.value)
                        }
                        disabled={columnDisabled}
                        readOnly={columnReadonly}
                        invalid={invalidCells[key] || invalid ? "true" : undefined}
                        placeholder={cellLoading ? "Loading..." : "Enter value"}
                        className={`w-full ${invalidCells[key] ? "border-red-500" : ""} ${cellLoading ? "animate-pulse opacity-60" : ""}`}
                        required={columnRequired}
                        title={valueTs ? `Value from: ${valueTs}` : undefined}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  // Default layout: timeoffsets as rows, columns (TSIDs) as columns
  return (
    <table className={`w-full border-collapse mb-5 ${className || ""}`} style={style}>
      <thead>
        <tr>
          {showTimestamps && (
            <th className="p-2 text-left border-b-2 border-gray-300">Time</th>
          )}
          {columns.map((column, index) => (
            <th key={index} className="p-2 text-left border-b-2 border-gray-300">
              {column.label || column.tsid}
              {column.displayUnits && (
                <span className="ml-1 text-sm text-gray-500 font-normal">
                  ({column.displayUnits})
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeoffsets.map((offset, rowIndex) => {
          const formattedTime = formatTimestamp(offset);

          return (
            <tr key={rowIndex}>
              {showTimestamps && (
                <td className="p-2 w-[200px]">
                  <Input
                    type="text"
                    value={formattedTime}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-300 p-1"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => {
                const key = cellKeyFor(column, offset);
                const columnReadonly = column.readonly ?? readonly;
                const columnRequired = column.required ?? required;
                const columnDisabled = column.disabled ?? column.disable ?? disable;
                const cellLoading = isLoadingNearest && !matrixData[key];
                const valueTs =
                  showValueTimestamp && !userEdited.current.has(key)
                    ? formatValueTimestamp(loadedTimestamps?.[key])
                    : null;

                return (
                  <td key={colIndex} className="p-2">
                    <Input
                      name={key}
                      type="number"
                      step={column.step}
                      value={matrixData[key] || ""}
                      onChange={(e) =>
                        handleInputChange(column, offset, e.target.value)
                      }
                      disabled={columnDisabled}
                      readOnly={columnReadonly}
                      invalid={invalidCells[key] || invalid ? "true" : undefined}
                      placeholder={cellLoading ? "Loading..." : "Enter value"}
                      className={`w-full ${invalidCells[key] ? "border-red-500" : ""} ${cellLoading ? "animate-pulse opacity-60" : ""}`}
                      required={columnRequired}
                      title={valueTs ? `Value from: ${valueTs}` : undefined}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CWMSInputTable;
export { CWMSInputTable };
