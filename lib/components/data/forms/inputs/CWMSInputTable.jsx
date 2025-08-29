import React, { useEffect, useState, useContext, useRef } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSInputTable({
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
  const { registerInput, baseTimestamp, getTimestampForInput } =
    useContext(FormContext);
  const [matrixData, setMatrixData] = useState(defaultValues);
  const [invalidCells, setInvalidCells] = useState({});
  const cleanupFunctions = useRef([]);

  useEffect(() => {
    if (!registerInput) return;

    // Clean up any previous registrations
    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    // Register each cell as an individual input
    tsids.forEach((tsid) => {
      timeoffsets.forEach((offset) => {
        const key = `${tsid}_${offset}`;

        const cellRef = {
          name: key,
          tsid: tsid,
          precision: perColumnPrecision[tsid] || precision || 2,
          offset: offset || 0,
          order: order || 1,
          AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
          loadNearest: loadNearest || "prev",
          readonly: readonly || false,
          units: perColumnUnits[tsid] || units || "EN",
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

  // Global reset function for the entire table
  const resetTable = () => {
    setMatrixData(defaultValues);
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
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
        ...style,
      }}
    >
      <thead>
        <tr>
          {showTimestamps && (
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Time
            </th>
          )}
          {tsids.map((tsid, index) => (
            <th
              key={index}
              style={{
                padding: "8px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
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
                <td style={{ padding: "8px", width: "200px" }}>
                  <Input
                    type="text"
                    value={formattedTime}
                    readOnly
                    style={{
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ccc",
                      padding: "5px",
                    }}
                  />
                </td>
              )}
              {tsids.map((tsid, colIndex) => {
                const key = `${tsid}_${offset}`;
                return (
                  <td key={colIndex} style={{ padding: "8px" }}>
                    <Input
                      name={key}
                      type="number"
                      value={matrixData[key] || ""}
                      onChange={(e) => handleInputChange(tsid, offset, e.target.value)}
                      disabled={disable}
                      readOnly={readonly}
                      invalid={invalidCells[key] || invalid}
                      placeholder="Enter value"
                      style={{
                        width: "100%",
                        borderColor: invalidCells[key] ? "red" : undefined,
                      }}
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
