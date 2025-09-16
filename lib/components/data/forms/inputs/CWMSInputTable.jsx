import React, { useEffect, useState, useContext, useRef } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

function CWMSInputTable({
  className,
  style,
  disable,
  invalid,
  tsids = [],
  timeoffsets = [],
  precision,
  order,
  AllowMissingData,
  loadNearest,
  readonly,
  units,
  onChange,
  showTimestamps = true,
  defaultValues = {},
  perColumnUnits = {}, // Allow different units per TSID
  perColumnPrecision = {}, // Allow different precision per TSID
  required,
  perColumnRequired = {}, // Allow different required status per TSID
}) {
  const { registerInput, getTimestampForInput } = useContext(FormContext);
  const [matrixData, setMatrixData] = useState(defaultValues);
  const [invalidCells, setInvalidCells] = useState({});
  const cleanupFunctions = useRef([]);

  useEffect(() => {
    if (!registerInput) return;

    // Clean up any previous registrations
    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    // Register each cell as an individual input
    tsids.forEach((tsid, tsidIndex) => {
      timeoffsets.forEach((offset) => {
        const key = `${tsid}_${offset}`;

        // Support units as array or object
        let cellUnits = units;
        if (Array.isArray(units)) {
          cellUnits = units[tsidIndex] || "EN";
        } else if (typeof units === "object" && units !== null) {
          cellUnits = units[tsid] || "EN";
        } else if (perColumnUnits[tsid]) {
          cellUnits = perColumnUnits[tsid];
        } else {
          cellUnits = units || "EN";
        }

        const cellRef = {
          name: key,
          tsid: tsid,
          precision: perColumnPrecision[tsid] || precision || 2,
          offset: offset || 0,
          order: order || 1,
          AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
          loadNearest: loadNearest || "prev",
          readonly: readonly || false,
          units: cellUnits,
          timeOffset: offset,
          required: perColumnRequired[tsid] || required || false,
          label: `${tsid} at ${offset}s`,
          getValues: () => [matrixData[key] || ""],
          reset: () => {
            setMatrixData((prev) => ({
              ...prev,
              [key]: defaultValues[key] || "",
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
    tsids,
    timeoffsets,
    matrixData,
    precision,
    order,
    AllowMissingData,
    loadNearest,
    readonly,
    units,
    defaultValues,
    perColumnUnits,
    perColumnPrecision,
    required,
    perColumnRequired,
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
          {tsids.map((tsid, index) => (
            <th key={index} className="p-2 text-left border-b-2 border-gray-300">
              {tsid}
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
              {tsids.map((tsid, colIndex) => {
                const key = `${tsid}_${offset}`;
                return (
                  <td key={colIndex} className="p-2">
                    <Input
                      name={key}
                      type="number"
                      value={matrixData[key] || ""}
                      onChange={(e) => handleInputChange(tsid, offset, e.target.value)}
                      disabled={disable}
                      readOnly={readonly}
                      invalid={invalidCells[key] || invalid ? "true" : undefined}
                      placeholder="Enter value"
                      className={`w-full ${invalidCells[key] ? "border-red-500" : ""}`}
                      required={perColumnRequired[tsid] || required}
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
