import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { FormContext } from "../CWMSForm";

function CWMSSpreadsheet({
  style,
  disable,
  invalid,
  columns = [],
  rows = 10,
  precision = 2,
  offset = 0,
  order = 1,
  AllowMissingData = true,
  loadNearest = "prev",
  readonly = false,
  units = "EN",
  onChange,
  defaultData = [],
  showRowNumbers = true,
  showColumnHeaders = true,
  showTimestamps = false,
  timeoffsets = [],
  required = false,
  cellOverrides = {},
  transpose = false,
}) {
  const { registerInput, baseTimestamp, getTimestampForInput } =
    useContext(FormContext);
  // Determine if we should show timestamps and prepare columns
  const shouldShowTimestamps = showTimestamps || timeoffsets.length > 0;
  const effectiveColumns = useMemo(
    () =>
      shouldShowTimestamps
        ? [{ key: "time", label: "Time", type: "text", readOnly: true }, ...columns]
        : columns,
    [shouldShowTimestamps, columns],
  );

  const [spreadsheetData, setSpreadsheetData] = useState(() => {
    const initialData = [];
    for (let i = 0; i < rows; i++) {
      if (shouldShowTimestamps) {
        // Add empty time column, data will be calculated dynamically
        initialData[i] = ["", ...(defaultData[i] || Array(columns.length).fill(""))];
      } else {
        initialData[i] = defaultData[i] || Array(columns.length).fill("");
      }
    }
    return initialData;
  });
  const [invalidCells, setInvalidCells] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const tableRef = useRef(null);
  const cleanupFunctions = useRef([]);

  // Unique ID prefix for this spreadsheet instance so multiple spreadsheets
  // on the same page don't collide when using document.getElementById
  const instanceId = useMemo(() => `ss-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    if (!registerInput) return;

    // Don't register disabled inputs for submission
    if (disable) return;

    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < effectiveColumns.length; colIndex++) {
        const key = `${rowIndex}_${colIndex}`;
        const column = effectiveColumns[colIndex] || {};

        // Skip time column for registration
        if (shouldShowTimestamps && colIndex === 0) {
          continue;
        }

        // Get cell override settings if they exist
        const cellOverride = cellOverrides[key] || {};

        // Adjust index for columns when time column is present
        const dataColIndex = shouldShowTimestamps ? colIndex - 1 : colIndex;

        // Get tsid from cell override, column, or generate one
        const cellTsid = cellOverride.tsid || column.tsid || `cell_${key}`;

        // Get cell-specific timeOffset (if timeoffsets array is provided for rows)
        const cellTimeOffset = cellOverride.offset ?? timeoffsets[rowIndex] ?? offset;

        const cellRef = {
          name: key,
          tsid: cellTsid,
          precision: cellOverride.precision ?? column.precision ?? precision,
          offset: cellTimeOffset,
          timeOffset: cellTimeOffset,
          order: order,
          AllowMissingData: AllowMissingData,
          loadNearest: loadNearest,
          readonly: cellOverride.readonly ?? column.readonly ?? readonly,
          units: cellOverride.units ?? column.units ?? units,
          required: cellOverride.required ?? column.required ?? required,
          label:
            cellOverride.label ||
            column.label ||
            `Cell ${rowIndex + 1},${colIndex + 1}`,
          getValues: () => {
            return [spreadsheetData[rowIndex]?.[colIndex] || ""];
          },
          reset: () => {
            setSpreadsheetData((prev) => {
              const updated = [...prev];
              if (!updated[rowIndex]) {
                updated[rowIndex] = Array(effectiveColumns.length).fill("");
              } else {
                updated[rowIndex] = [...updated[rowIndex]];
              }
              if (shouldShowTimestamps) {
                updated[rowIndex][colIndex] =
                  colIndex === 0 ? "" : defaultData[rowIndex]?.[dataColIndex] || "";
              } else {
                updated[rowIndex][colIndex] = defaultData[rowIndex]?.[colIndex] || "";
              }
              return updated;
            });
            setInvalidCells((prev) => ({
              ...prev,
              [key]: false,
            }));
          },
          setInvalid: (invalidState) => {
            setInvalidCells((prev) => ({
              ...prev,
              [key]: invalidState,
            }));
          },
        };

        const cleanup = registerInput(cellRef);
        if (cleanup) {
          cleanupFunctions.current.push(cleanup);
        }
      }
    }

    return () => {
      cleanupFunctions.current.forEach((cleanup) => cleanup());
      cleanupFunctions.current = [];
    };
  }, [
    registerInput,
    rows,
    effectiveColumns,
    spreadsheetData,
    precision,
    offset,
    order,
    AllowMissingData,
    loadNearest,
    readonly,
    units,
    defaultData,
    required,
    cellOverrides,
    shouldShowTimestamps,
    timeoffsets,
    baseTimestamp,
    disable,
  ]);

  // When transposed, visual rows = data cols and visual cols = data rows.
  // These helpers convert between visual (what the user sees/interacts with)
  // and data (the underlying spreadsheetData model) coordinates.
  const visualToData = (visualRow, visualCol) => {
    if (transpose) {
      return { row: visualCol, col: visualRow };
    }
    return { row: visualRow, col: visualCol };
  };

  const dataToVisual = (dataRow, dataCol) => {
    if (transpose) {
      return { row: dataCol, col: dataRow };
    }
    return { row: dataRow, col: dataCol };
  };

  // Visual grid dimensions
  const visualRows = transpose ? effectiveColumns.length : rows;
  const visualCols = transpose ? rows : effectiveColumns.length;

  // Calculate selected range from drag coordinates
  const getSelectionRange = () => {
    if (!dragStart || !dragEnd) return null;
    return {
      startRow: Math.min(dragStart.row, dragEnd.row),
      endRow: Math.max(dragStart.row, dragEnd.row),
      startCol: Math.min(dragStart.col, dragEnd.col),
      endCol: Math.max(dragStart.col, dragEnd.col),
    };
  };

  // Selection state is in visual coordinates, so this takes visual coords
  const isCellInSelection = (visualRow, visualCol) => {
    const range = getSelectionRange();
    if (!range) {
      return selectedCell?.row === visualRow && selectedCell?.col === visualCol;
    }
    return (
      visualRow >= range.startRow &&
      visualRow <= range.endRow &&
      visualCol >= range.startCol &&
      visualCol <= range.endCol
    );
  };

  const isActiveCell = (visualRow, visualCol) => {
    return selectedCell?.row === visualRow && selectedCell?.col === visualCol;
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    // Don't allow editing time column
    if (shouldShowTimestamps && colIndex === 0) {
      return;
    }

    const key = `${rowIndex}_${colIndex}`;
    const updatedData = [...spreadsheetData];
    updatedData[rowIndex] = [...updatedData[rowIndex]];
    updatedData[rowIndex][colIndex] = value;
    setSpreadsheetData(updatedData);

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

  const handleCopy = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const range = getSelectionRange();
    let copyText = "";

    if (!range && selectedCell) {
      // Single cell copy
      copyText = spreadsheetData[selectedCell.row][selectedCell.col];
    } else if (range) {
      // Multi-cell copy — iterate in visual order so copied output matches what the user sees
      for (let vRow = range.startRow; vRow <= range.endRow; vRow++) {
        const rowData = [];
        for (let vCol = range.startCol; vCol <= range.endCol; vCol++) {
          const { row: dRow, col: dCol } = visualToData(vRow, vCol);
          rowData.push(spreadsheetData[dRow]?.[dCol] || "");
        }
        copyText += rowData.join("\t") + "\n";
      }
      copyText = copyText.trim();
    }

    // Use clipboard API for keyboard shortcuts
    if (navigator.clipboard && copyText) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          console.log("Data copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          fallbackCopyToClipboard(copyText);
        });
    } else if (e && e.clipboardData) {
      // For onCopy event
      e.clipboardData.setData("text/plain", copyText);
    } else if (copyText) {
      // Fallback
      fallbackCopyToClipboard(copyText);
    }
  };

  const copyAllData = () => {
    // Create tab-separated string of all data in visual order
    let copyText = "";

    // Add headers if they exist
    if (showColumnHeaders) {
      const headers = [];
      if (showRowNumbers) headers.push("");
      if (transpose) {
        // In transposed mode, column headers are data row numbers
        for (let i = 0; i < rows; i++) {
          headers.push(i + 1);
        }
      } else {
        for (let i = 0; i < effectiveColumns.length; i++) {
          headers.push(effectiveColumns[i].label || getColumnLabel(i));
        }
      }
      copyText += headers.join("\t") + "\n";
    }

    // Add data in visual order
    for (let vRow = 0; vRow < visualRows; vRow++) {
      const rowData = [];
      if (showRowNumbers) {
        if (transpose) {
          rowData.push(effectiveColumns[vRow]?.label || getColumnLabel(vRow));
        } else {
          rowData.push(vRow + 1);
        }
      }
      for (let vCol = 0; vCol < visualCols; vCol++) {
        const { row: dRow, col: dCol } = visualToData(vRow, vCol);
        // For time column, calculate the actual time
        if (shouldShowTimestamps && dCol === 0) {
          if (getTimestampForInput && timeoffsets[dRow] !== undefined) {
            const timestamp = getTimestampForInput(timeoffsets[dRow]);
            const cellTime = new Date(timestamp);
            rowData.push(
              cellTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
            );
          } else {
            rowData.push("--:--");
          }
        } else {
          rowData.push(spreadsheetData[dRow]?.[dCol] || "");
        }
      }
      copyText += rowData.join("\t") + "\n";
    }

    // Copy to clipboard using the Clipboard API
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(copyText.trim())
        .then(() => {
          // Optional: Show success message
          console.log("Data copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          // Fallback method
          fallbackCopyToClipboard(copyText.trim());
        });
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(copyText.trim());
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Data copied to clipboard (fallback)");
    } catch (err) {
      console.error("Fallback copy failed: ", err);
    }
    document.body.removeChild(textArea);
  };

  const handlePaste = (e, startVisualRow, startVisualCol) => {
    e.preventDefault();
    e.stopPropagation();

    const pasteData = (e.clipboardData || window.clipboardData).getData("text");
    if (!pasteData) return;

    // Split by line breaks first (handles both \r\n and \n)
    const pasteRows = pasteData.split(/\r?\n/);
    const updatedData = [...spreadsheetData];

    pasteRows.forEach((row, rowOffset) => {
      // Skip empty rows
      if (!row.trim()) return;

      // Split by tabs for columns
      const cells = row.split("\t");

      cells.forEach((cell, colOffset) => {
        const vRow = startVisualRow + rowOffset;
        const vCol = startVisualCol + colOffset;

        // Check visual bounds
        if (vRow >= visualRows || vCol >= visualCols) return;

        // Convert visual to data coordinates
        const { row: targetRow, col: targetCol } = visualToData(vRow, vCol);

        // Check data bounds and skip time column
        if (targetRow < spreadsheetData.length && targetCol < effectiveColumns.length) {
          if (shouldShowTimestamps && targetCol === 0) {
            return;
          }

          if (!updatedData[targetRow]) {
            updatedData[targetRow] = Array(effectiveColumns.length).fill("");
          } else {
            updatedData[targetRow] = [...updatedData[targetRow]];
          }
          updatedData[targetRow][targetCol] = cell.trim();
        }
      });
    });

    setSpreadsheetData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  // Mouse handlers receive visual coordinates
  const handleMouseDown = (visualRow, visualCol, e) => {
    if (e.shiftKey && selectedCell) {
      setDragStart(selectedCell);
      setDragEnd({ row: visualRow, col: visualCol });
    } else {
      setIsMouseDown(true);
      setDragStart({ row: visualRow, col: visualCol });
      setDragEnd({ row: visualRow, col: visualCol });
      setSelectedCell({ row: visualRow, col: visualCol });
    }
  };

  const handleMouseEnter = (visualRow, visualCol) => {
    if (isMouseDown) {
      setDragEnd({ row: visualRow, col: visualCol });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    // Add global mouseup listener to handle mouseup outside the table
    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // All selection state (selectedCell, dragStart, dragEnd) uses VISUAL coordinates.
  // The handlers receive visual row/col and convert to data coords only when
  // reading/writing spreadsheetData.
  const handleKeyDown = (e, visualRow, visualCol) => {
    if (readonly || disable) return;

    // Handle copy
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      e.preventDefault();
      handleCopy();
      return;
    }

    // Handle paste
    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      // Don't prevent default here, let onPaste handle it
      return;
    }

    // Handle select all (Ctrl+A)
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();
      setDragStart({ row: 0, col: 0 });
      setDragEnd({ row: visualRows - 1, col: visualCols - 1 });
      return;
    }

    switch (e.key) {
      case "ArrowUp":
        if (e.shiftKey && selectedCell) {
          e.preventDefault();
          if (!dragStart) setDragStart(selectedCell);
          setDragEnd({ row: Math.max(0, visualRow - 1), col: visualCol });
        } else if (visualRow > 0) {
          e.preventDefault();
          const newRow = visualRow - 1;
          setSelectedCell({ row: newRow, col: visualCol });
          setDragStart(null);
          setDragEnd(null);
          const { row: dR, col: dC } = visualToData(newRow, visualCol);
          document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
        }
        break;
      case "ArrowDown":
        if (e.shiftKey && selectedCell) {
          e.preventDefault();
          if (!dragStart) setDragStart(selectedCell);
          setDragEnd({ row: Math.min(visualRows - 1, visualRow + 1), col: visualCol });
        } else if (visualRow < visualRows - 1) {
          e.preventDefault();
          const newRow = visualRow + 1;
          setSelectedCell({ row: newRow, col: visualCol });
          setDragStart(null);
          setDragEnd(null);
          const { row: dR, col: dC } = visualToData(newRow, visualCol);
          document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
        }
        break;
      case "ArrowLeft":
        if (e.shiftKey && selectedCell) {
          e.preventDefault();
          if (!dragStart) setDragStart(selectedCell);
          setDragEnd({ row: visualRow, col: Math.max(0, visualCol - 1) });
        } else if (visualCol > 0) {
          e.preventDefault();
          const newCol = visualCol - 1;
          setSelectedCell({ row: visualRow, col: newCol });
          setDragStart(null);
          setDragEnd(null);
          const { row: dR, col: dC } = visualToData(visualRow, newCol);
          document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
        }
        break;
      case "ArrowRight":
        if (e.shiftKey && selectedCell) {
          e.preventDefault();
          if (!dragStart) setDragStart(selectedCell);
          setDragEnd({
            row: visualRow,
            col: Math.min(visualCols - 1, visualCol + 1),
          });
        } else if (visualCol < visualCols - 1) {
          e.preventDefault();
          const newCol = visualCol + 1;
          setSelectedCell({ row: visualRow, col: newCol });
          setDragStart(null);
          setDragEnd(null);
          const { row: dR, col: dC } = visualToData(visualRow, newCol);
          document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
        }
        break;
      case "Enter":
        e.preventDefault();
        if (visualRow < visualRows - 1) {
          const { row: dR, col: dC } = visualToData(visualRow + 1, visualCol);
          document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
        }
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          if (visualCol > 0) {
            const { row: dR, col: dC } = visualToData(visualRow, visualCol - 1);
            document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
          } else if (visualRow > 0) {
            const { row: dR, col: dC } = visualToData(visualRow - 1, visualCols - 1);
            document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
          }
        } else {
          if (visualCol < visualCols - 1) {
            const { row: dR, col: dC } = visualToData(visualRow, visualCol + 1);
            document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
          } else if (visualRow < visualRows - 1) {
            const { row: dR, col: dC } = visualToData(visualRow + 1, 0);
            document.getElementById(`${instanceId}-${dR}-${dC}`)?.focus();
          }
        }
        break;
      case "Escape":
        setDragStart(null);
        setDragEnd(null);
        break;
      case "Delete": {
        const range = getSelectionRange();
        if (range) {
          const updatedData = [...spreadsheetData];
          for (let vRow = range.startRow; vRow <= range.endRow; vRow++) {
            for (let vCol = range.startCol; vCol <= range.endCol; vCol++) {
              const { row: dRow, col: dCol } = visualToData(vRow, vCol);
              if (!updatedData[dRow]) continue;
              updatedData[dRow] = [...updatedData[dRow]];
              updatedData[dRow][dCol] = "";
            }
          }
          setSpreadsheetData(updatedData);
          if (onChange) {
            onChange(updatedData);
          }
        } else {
          const { row: dRow, col: dCol } = visualToData(visualRow, visualCol);
          handleCellChange(dRow, dCol, "");
        }
        break;
      }
    }
  };

  const getColumnLabel = (index) => {
    if (effectiveColumns[index] && effectiveColumns[index].label) {
      return effectiveColumns[index].label;
    }
    // Generate Excel-like column labels (A, B, C, ..., AA, AB, etc.)
    let label = "";
    let num = index;
    while (num >= 0) {
      label = String.fromCharCode(65 + (num % 26)) + label;
      num = Math.floor(num / 26) - 1;
    }
    return label;
  };

  // Excel-like styles
  const containerStyle = {
    overflowX: "auto",
    overflowY: "auto",
    maxHeight: "600px",
    border: "1px solid #d0d0d0",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
    userSelect: "none",
    ...style,
  };

  const tableStyle = {
    borderSpacing: "0",
    borderCollapse: "collapse",
    width: "100%",
    fontSize: "13px",
  };

  const cellStyle = {
    border: "1px solid #d0d0d0",
    padding: "0",
    height: "23px",
    minWidth: "80px",
    position: "relative",
    backgroundColor: "#ffffff",
  };

  const headerStyle = {
    border: "1px solid #d0d0d0",
    padding: "2px 4px",
    height: "23px",
    backgroundColor: "#e0e0e0",
    fontWeight: "normal",
    textAlign: "center",
    userSelect: "none",
    fontSize: "13px",
    color: "#333",
  };

  const rowNumberStyle = {
    ...headerStyle,
    width: "40px",
    minWidth: "40px",
  };

  const inputStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    padding: "1px 3px",
    fontSize: "13px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "transparent",
    boxSizing: "border-box",
  };

  return (
    <div>
      <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
        <button
          onClick={copyAllData}
          style={{
            padding: "6px 12px",
            backgroundColor: "#0969da",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0860ca")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0969da")}
        >
          📋 Copy All Data
        </button>
        <button
          onClick={() => {
            setDragStart({ row: 0, col: 0 });
            setDragEnd({ row: visualRows - 1, col: visualCols - 1 });
            // Focus on first cell to enable keyboard copy
            document.getElementById(`${instanceId}-0-0`)?.focus();
          }}
          style={{
            padding: "6px 12px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "Arial, sans-serif",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5a6268")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
        >
          Select All
        </button>
      </div>
      <div style={containerStyle} ref={tableRef}>
        <table style={tableStyle}>
          {transpose ? (
            // Transposed layout: data columns become visual rows, data rows become visual columns
            <>
              {showColumnHeaders && (
                <thead>
                  <tr>
                    <th style={headerStyle}></th>
                    {spreadsheetData.map((_, rowIndex) => (
                      <th key={rowIndex} style={headerStyle}>
                        {showRowNumbers ? rowIndex + 1 : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {effectiveColumns.map((col, colIndex) => {
                  // In transposed view: visual row = colIndex, visual col = rowIndex
                  const vRow = colIndex;
                  return (
                    <tr key={colIndex}>
                      <td style={rowNumberStyle}>
                        {col.label || getColumnLabel(colIndex)}
                      </td>
                      {spreadsheetData.map((row, rowIndex) => {
                        const vCol = rowIndex;
                        // Data coordinates
                        const dRow = rowIndex;
                        const dCol = colIndex;
                        const key = `${dRow}_${dCol}`;
                        const column = effectiveColumns[dCol] || {};
                        const cellOverride = cellOverrides[key] || {};
                        const isSelected = isCellInSelection(vRow, vCol);
                        const isCellActive = isActiveCell(vRow, vCol);
                        const isCellInvalid = invalidCells[key] || invalid;

                        const cellReadonly =
                          cellOverride.readonly ?? column.readonly ?? readonly;
                        const cellRequired =
                          cellOverride.required ?? column.required ?? required;
                        const cellType = cellOverride.type ?? column.type ?? "text";
                        const cellPlaceholder =
                          cellOverride.placeholder ?? column.placeholder ?? "";

                        let displayValue = row[dCol];
                        if (shouldShowTimestamps && dCol === 0) {
                          if (getTimestampForInput && timeoffsets[dRow] !== undefined) {
                            const timestamp = getTimestampForInput(timeoffsets[dRow]);
                            const cellTime = new Date(timestamp);
                            displayValue = cellTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            });
                          } else {
                            displayValue = "--:--";
                          }
                        }

                        return (
                          <td
                            key={rowIndex}
                            style={{
                              ...cellStyle,
                              backgroundColor: isSelected
                                ? isCellActive
                                  ? "#b3d7ff"
                                  : "#cce5ff"
                                : "#ffffff",
                              boxShadow: isCellActive
                                ? "inset 0 0 0 2px #1a73e8"
                                : "none",
                              zIndex: isCellActive ? 10 : 1,
                              position: "relative",
                              borderColor: isCellInvalid ? "red" : "#d0d0d0",
                            }}
                            onMouseDown={(e) => handleMouseDown(vRow, vCol, e)}
                            onMouseEnter={() => handleMouseEnter(vRow, vCol)}
                            onMouseUp={handleMouseUp}
                          >
                            <input
                              id={`${instanceId}-${dRow}-${dCol}`}
                              name={key}
                              type={cellType}
                              value={displayValue}
                              onChange={(e) =>
                                handleCellChange(dRow, dCol, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(e, vRow, vCol)}
                              onPaste={(e) => handlePaste(e, vRow, vCol)}
                              disabled={disable || (shouldShowTimestamps && dCol === 0)}
                              readOnly={
                                cellReadonly || (shouldShowTimestamps && dCol === 0)
                              }
                              style={{
                                ...inputStyle,
                                cursor: "cell",
                                pointerEvents: "auto",
                                color: isCellInvalid ? "red" : undefined,
                              }}
                              placeholder={cellPlaceholder}
                              required={cellRequired}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            // Default layout
            <>
              {showColumnHeaders && (
                <thead>
                  <tr>
                    {showRowNumbers && <th style={rowNumberStyle}></th>}
                    {effectiveColumns.map((col, i) => (
                      <th key={i} style={headerStyle}>
                        {col.label || getColumnLabel(i)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {spreadsheetData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {showRowNumbers && <td style={rowNumberStyle}>{rowIndex + 1}</td>}
                    {row.map((cellValue, colIndex) => {
                      // In default layout, visual coords = data coords
                      const key = `${rowIndex}_${colIndex}`;
                      const column = effectiveColumns[colIndex] || {};
                      const cellOverride = cellOverrides[key] || {};
                      const isSelected = isCellInSelection(rowIndex, colIndex);
                      const isCellActive = isActiveCell(rowIndex, colIndex);
                      const isCellInvalid = invalidCells[key] || invalid;

                      const cellReadonly =
                        cellOverride.readonly ?? column.readonly ?? readonly;
                      const cellRequired =
                        cellOverride.required ?? column.required ?? required;
                      const cellType = cellOverride.type ?? column.type ?? "text";
                      const cellPlaceholder =
                        cellOverride.placeholder ?? column.placeholder ?? "";

                      let displayValue = cellValue;
                      if (shouldShowTimestamps && colIndex === 0) {
                        if (
                          getTimestampForInput &&
                          timeoffsets[rowIndex] !== undefined
                        ) {
                          const timestamp = getTimestampForInput(timeoffsets[rowIndex]);
                          const cellTime = new Date(timestamp);
                          displayValue = cellTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          });
                        } else {
                          displayValue = "--:--";
                        }
                      }

                      return (
                        <td
                          key={colIndex}
                          style={{
                            ...cellStyle,
                            backgroundColor: isSelected
                              ? isCellActive
                                ? "#b3d7ff"
                                : "#cce5ff"
                              : "#ffffff",
                            boxShadow: isCellActive
                              ? "inset 0 0 0 2px #1a73e8"
                              : "none",
                            zIndex: isCellActive ? 10 : 1,
                            position: "relative",
                            borderColor: isCellInvalid ? "red" : "#d0d0d0",
                          }}
                          onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                          onMouseUp={handleMouseUp}
                        >
                          <input
                            id={`${instanceId}-${rowIndex}-${colIndex}`}
                            name={key}
                            type={cellType}
                            value={displayValue}
                            onChange={(e) =>
                              handleCellChange(rowIndex, colIndex, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                            onPaste={(e) => handlePaste(e, rowIndex, colIndex)}
                            disabled={
                              disable || (shouldShowTimestamps && colIndex === 0)
                            }
                            readOnly={
                              cellReadonly || (shouldShowTimestamps && colIndex === 0)
                            }
                            style={{
                              ...inputStyle,
                              cursor: "cell",
                              pointerEvents: "auto",
                              color: isCellInvalid ? "red" : undefined,
                            }}
                            placeholder={cellPlaceholder}
                            required={cellRequired}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default CWMSSpreadsheet;
export { CWMSSpreadsheet };
