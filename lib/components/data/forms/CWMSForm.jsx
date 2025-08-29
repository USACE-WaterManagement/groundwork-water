import React, { createContext, useContext, useRef, useState } from "react";
import { TimeSeriesApi, TextTimeSeriesApi, Configuration } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";
import { Input, Field, Label } from "@usace/groundwork";
import { useAuth } from "../utilities/auth/useAuth";

export const FormContext = createContext();

// Helper function to snap time to specified interval
function snapTime(date, interval, snapTo = "nearest") {
  const d = new Date(date);

  switch (interval) {
    case "second":
      d.setMilliseconds(0);
      break;

    case "minute":
      d.setSeconds(0, 0);
      if (snapTo === "next") {
        d.setMinutes(d.getMinutes() + 1);
      } else if (snapTo === "previous") {
        // Already at start of minute
      }
      break;

    case "5minutes":
      d.setSeconds(0, 0);
      const minutes = d.getMinutes();
      const remainder = minutes % 5;
      if (snapTo === "nearest") {
        if (remainder >= 3) {
          d.setMinutes(minutes + (5 - remainder));
        } else {
          d.setMinutes(minutes - remainder);
        }
      } else if (snapTo === "next") {
        d.setMinutes(minutes + (5 - remainder));
      } else {
        d.setMinutes(minutes - remainder);
      }
      break;

    case "15minutes":
      d.setSeconds(0, 0);
      const mins15 = d.getMinutes();
      const rem15 = mins15 % 15;
      if (snapTo === "nearest") {
        if (rem15 >= 8) {
          d.setMinutes(mins15 + (15 - rem15));
        } else {
          d.setMinutes(mins15 - rem15);
        }
      } else if (snapTo === "next") {
        d.setMinutes(mins15 + (15 - rem15));
      } else {
        d.setMinutes(mins15 - rem15);
      }
      break;

    case "30minutes":
      d.setSeconds(0, 0);
      const mins30 = d.getMinutes();
      const rem30 = mins30 % 30;
      if (snapTo === "nearest") {
        if (rem30 >= 15) {
          d.setMinutes(mins30 + (30 - rem30));
        } else {
          d.setMinutes(mins30 - rem30);
        }
      } else if (snapTo === "next") {
        d.setMinutes(mins30 + (30 - rem30));
      } else {
        d.setMinutes(mins30 - rem30);
      }
      break;

    case "hour":
      const currentMinutes = d.getMinutes();
      d.setMinutes(0, 0, 0);
      if (snapTo === "nearest") {
        // If 30 minutes or more past the hour, snap to next hour
        if (currentMinutes >= 30) {
          d.setHours(d.getHours() + 1);
        }
      } else if (snapTo === "next") {
        d.setHours(d.getHours() + 1);
      } else if (snapTo === "previous") {
        // Already at start of hour
      }
      break;

    case "day":
      const currentHours = d.getHours();
      d.setHours(0, 0, 0, 0);
      if (snapTo === "nearest") {
        // If 12 hours or more past midnight, snap to next day
        if (currentHours >= 12) {
          d.setDate(d.getDate() + 1);
        }
      } else if (snapTo === "next") {
        d.setDate(d.getDate() + 1);
      } else if (snapTo === "previous") {
        // Already at start of day
      }
      break;

    default:
      // No snapping
      break;
  }

  return d;
}

export function FormWrapper({
  office,
  unit = "EN",
  cdaUrl,
  children,
  onSubmit,
  onReset,
  submitText = "Submit",
  resetText = "Reset",
  showButtons = true,
  showCalendar = true,
  calendarLabel = "Submission Time",
  calendarInterval = "minute", // none, second, minute, 5minutes, 15minutes, 30minutes, hour, day
  calendarSnapTo = "nearest", // nearest, previous, next
  className = "",
  style,
}) {
  const inputsRef = useRef([]);
  const registeredIds = useRef(new Set());

  // Try to get auth context if available
  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // No auth provider, that's ok
  }

  // Create config with auth token if available
  let configParams = {
    basePath: cdaUrl,
    headers: {
      accept: "application/json;version=2",
    },
  };

  // Add authorization header if token is available
  if (auth?.token) {
    configParams.headers["Authorization"] = `Bearer ${auth.token}`;
  }

  // Add credentials for cookie-based auth
  configParams.credentials = "include";

  const config = new Configuration(configParams);

  const ts_api = new TimeSeriesApi(config);
  const text_ts_api = new TextTimeSeriesApi(config);

  // State for timestamp management
  const [baseTimestamp, setBaseTimestamp] = useState(() => {
    const now = new Date();
    const snapped = snapTime(now, calendarInterval, calendarSnapTo);
    // Format for datetime-local input (YYYY-MM-DDTHH:mm)
    const year = snapped.getFullYear();
    const month = String(snapped.getMonth() + 1).padStart(2, "0");
    const day = String(snapped.getDate()).padStart(2, "0");
    const hours = String(snapped.getHours()).padStart(2, "0");
    const minutes = String(snapped.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });

  const registerInput = (input) => {
    // Create a unique ID for this input based on its properties
    const inputId = `${input.tsid || ""}_${input.name || ""}_${Math.random()}`;

    // Only register if not already registered
    if (!registeredIds.current.has(inputId)) {
      registeredIds.current.add(inputId);
      inputsRef.current.push({ ...input, id: inputId });
    }

    // Return cleanup function
    return () => {
      registeredIds.current.delete(inputId);
      inputsRef.current = inputsRef.current.filter((i) => i.id !== inputId);
    };
  };

  const getTimestampForInput = (timeOffset = 0) => {
    // Parse the baseTimestamp (which is in datetime-local format)
    const base = new Date(baseTimestamp);

    if (timeOffset !== 0) {
      // CWMSInputTable uses seconds, other components use minutes
      // Simple heuristic: if the absolute value is >= 60, it's likely seconds
      // This handles common cases like 3600 (1 hour), 7200 (2 hours), etc.
      // For smaller values (0-59), treat as minutes for backward compatibility
      let offsetMs;

      if (Math.abs(timeOffset) >= 60) {
        // Treat as seconds (from CWMSInputTable)
        offsetMs = timeOffset * 1000;
      } else {
        // Treat as minutes (from other components)
        offsetMs = timeOffset * 60 * 1000;
      }

      base.setTime(base.getTime() + offsetMs);
    }
    return base.toISOString();
  };

  // Helper function to determine if value should be treated as text or numeric
  const isNumericValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    // Check if it's a valid number
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const validationErrors = [];
    inputsRef.current.forEach((input) => {
      if (input.required) {
        const values = input.getValues();
        const value = values[0];
        if (value === undefined || value === null || value === "") {
          validationErrors.push({
            name: input.name || input.tsid,
            message: `${input.label || input.name || input.tsid || "Field"} is required`,
          });
        }
      }
    });

    // If there are validation errors, show them and prevent submission
    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.map((err) => err.message).join("\n");
      alert(`Please fill in all required fields:\n\n${errorMessage}`);

      // Mark invalid fields
      inputsRef.current.forEach((input) => {
        if (
          input.setInvalid &&
          validationErrors.find((err) => err.name === (input.name || input.tsid))
        ) {
          input.setInvalid(true);
        }
      });

      return;
    }

    // Collect all form data with timestamps
    const formData = inputsRef.current.map((input) => ({
      tsid: input.tsid,
      values: input.getValues(),
      units: input.units,
      precision: input.precision,
      offset: input.offset,
      order: input.order,
      timestamp: getTimestampForInput(input.timeOffset || 0),
      timeOffset: input.timeOffset || 0,
    }));

    // Call custom onSubmit if provided
    if (onSubmit) {
      await onSubmit(formData, e);
    } else {
      // Default submit behavior - send to CWMS with timestamps
      console.log("Auth token available:", !!auth?.token);
      console.log("Submitting to:", cdaUrl || baseConfig.basePath);

      for (const input of inputsRef.current) {
        if (input.tsid) {
          try {
            const timestamp = getTimestampForInput(input.timeOffset || 0);
            const rawValue = input.getValues()[0];

            // Determine if this is numeric or text data
            if (isNumericValue(rawValue)) {
              // Numeric data - use regular TimeSeries API
              const epochMs = new Date(timestamp).getTime();
              const value = parseFloat(rawValue) || 0;

              const timeSeries = {
                name: input.tsid,
                officeId: office,
                units: input.units || "EN",
                values: [
                  [epochMs, value, 0], // [timestamp, value, quality_code]
                ],
              };

              console.log("Submitting numeric time series:", timeSeries);

              await ts_api.postTimeSeries({
                timeSeries: timeSeries,
                timezone: "UTC",
                createAsLrts: false,
                storeRule: "REPLACE_ALL",
              });

              console.log("Successfully posted numeric time series for:", input.tsid);
            } else {
              // Text data - use TextTimeSeries API
              const textTimeSeries = {
                name: input.tsid,
                officeId: office,
                timeZone: "UTC",
                regularTextValues: [
                  {
                    dateTime: new Date(timestamp),
                    textValue: String(rawValue || ""),
                    qualityCode: 0,
                  },
                ],
              };

              console.log("Submitting text time series:", textTimeSeries);

              await text_ts_api.postTimeSeriesText({
                textTimeSeries: textTimeSeries,
                replaceAll: true,
              });

              console.log("Successfully posted text time series for:", input.tsid);
            }
          } catch (err) {
            console.error("API call failed for", input.tsid, ":", err);
          }
        }
      }
    }
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();

    inputsRef.current.forEach((input) => {
      if (input.reset) {
        input.reset();
      }
    });

    // Call custom onReset if provided
    if (onReset) {
      onReset(e);
    }
  };

  // Handle timestamp changes with automatic snapping
  const handleTimestampChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) return;

    // Parse the datetime-local value (which is in local time)
    const newDate = new Date(inputValue);

    // Check if date is valid
    if (isNaN(newDate.getTime())) return;

    const snappedDate = snapTime(newDate, calendarInterval, calendarSnapTo);
    // Format for datetime-local input (YYYY-MM-DDTHH:mm)
    const year = snappedDate.getFullYear();
    const month = String(snappedDate.getMonth() + 1).padStart(2, "0");
    const day = String(snappedDate.getDate()).padStart(2, "0");
    const hours = String(snappedDate.getHours()).padStart(2, "0");
    const minutes = String(snappedDate.getMinutes()).padStart(2, "0");

    setBaseTimestamp(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    ...style,
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.5rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  };

  return (
    <FormContext.Provider
      value={{ registerInput, baseTimestamp, getTimestampForInput }}
    >
      <form onSubmit={handleSubmit} className={className} style={formStyle}>
        {showCalendar && (
          <Field className="mb-4">
            <Label>{calendarLabel}</Label>
            <Input
              type="datetime-local"
              value={baseTimestamp}
              onChange={handleTimestampChange}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              Base timestamp for all form submissions.
              {calendarInterval !== "none" &&
                ` Time will snap to ${calendarSnapTo} ${calendarInterval}.`}{" "}
              Individual inputs can have time offsets.
            </div>
          </Field>
        )}
        {children}
        {showButtons && (
          <div style={buttonContainerStyle}>
            <button
              onClick={handleReset}
              type="button"
              style={{
                minWidth: "100px",
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                borderRadius: "0.375rem",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4b5563";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6b7280";
              }}
            >
              {resetText}
            </button>
            <button
              type="submit"
              style={{
                minWidth: "100px",
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                borderRadius: "0.375rem",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
            >
              {submitText}
            </button>
          </div>
        )}
      </form>
    </FormContext.Provider>
  );
}
