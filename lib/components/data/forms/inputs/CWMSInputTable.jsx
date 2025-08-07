import React, { useEffect, useState, useContext } from "react";
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
}) {
  const { registerInput } = useContext(FormContext);
  const [matrixData, setMatrixData] = useState(defaultValues);

  const tableRef = {
    tsids,
    precision: precision || 2,
    timeoffsets: timeoffsets || [0],
    order: order || 1,
    AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
    loadNearest: loadNearest || "prev",
    readonly: readonly || false,
    units: units || "EN",
    getValues: () => matrixData,
    reset: () => setMatrixData(defaultValues),
  };

  useEffect(() => {
    if (registerInput) {
      registerInput(tableRef);
    }
  }, [registerInput]);

  const handleInputChange = (tsid, offset, value) => {
    const key = `${tsid}_${offset}`;
    const updatedData = {
      ...matrixData,
      [key]: value,
    };
    setMatrixData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const formatTimestamp = (offset) => {
    const currentTime = new Date();
    const offsetTime = new Date(currentTime.getTime() + offset * 1000);
    return offsetTime.toISOString().replace('T', ' ').split('.')[0];
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', ...style }}>
      <thead>
        <tr>
          {showTimestamps && (
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              Time
            </th>
          )}
          {tsids.map((tsid, index) => (
            <th key={index} style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
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
                <td style={{ padding: '8px', width: '200px' }}>
                  <Input
                    type="text"
                    value={formattedTime}
                    readOnly
                    style={{ 
                      width: '100%', 
                      backgroundColor: '#f9f9f9', 
                      border: '1px solid #ccc', 
                      padding: '5px' 
                    }}
                  />
                </td>
              )}
              {tsids.map((tsid, colIndex) => {
                const key = `${tsid}_${offset}`;
                return (
                  <td key={colIndex} style={{ padding: '8px' }}>
                    <Input
                      name={key}
                      type="number"
                      value={matrixData[key] || ''}
                      onChange={(e) => handleInputChange(tsid, offset, e.target.value)}
                      disabled={disable}
                      readOnly={readonly}
                      invalid={invalid}
                      placeholder="Enter value"
                      style={{ width: '100%' }}
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