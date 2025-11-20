import React, { useEffect, useState, useContext, useRef } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

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
  loadNearest = "prev",
  readonly = false,
  units = "EN",
  onChange,
  showTimestamps = true,
  required = false,
}) {
  const { registerInput, getTimestampForInput } = useContext(FormContext);

  // Initialize matrixData from column defaultValues
  const getInitialMatrixData = () => {
    const data = {};
    columns.forEach((column) => {
      if (column.defaultValues) {
        Object.entries(column.defaultValues).forEach(([offset, value]) => {
          const key = `${column.tsid}_${offset}`;
          data[key] = value;
        });
      }
    });
    return data;
  };

  const [matrixData, setMatrixData] = useState(getInitialMatrixData);
  const [invalidCells, setInvalidCells] = useState({});
  const cleanupFunctions = useRef([]);

  useEffect(() => {
    if (!registerInput) return;

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

      timeoffsets.forEach((offset) => {
        const key = `${tsid}_${offset}`;

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
            setMatrixData((prev) => ({
              ...prev,
              [key]: columnDefaultValues[offset] || "",
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
  ]);

  const handleInputChange = (tsid, offset, value) => {
    const key = `${tsid}_${offset}`;
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
                const key = `${column.tsid}_${offset}`;
                const columnReadonly = column.readonly ?? readonly;
                const columnRequired = column.required ?? required;

                return (
                  <td key={colIndex} className="p-2">
                    <Input
                      name={key}
                      type="number"
                      value={matrixData[key] || ""}
                      onChange={(e) =>
                        handleInputChange(column.tsid, offset, e.target.value)
                      }
                      disabled={disable}
                      readOnly={columnReadonly}
                      invalid={invalidCells[key] || invalid ? "true" : undefined}
                      placeholder="Enter value"
                      className={`w-full ${invalidCells[key] ? "border-red-500" : ""}`}
                      required={columnRequired}
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
