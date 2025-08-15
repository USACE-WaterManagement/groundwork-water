import React, { createContext, useContext, useRef, useState } from "react";
import { TimeSeriesApi, Configuration } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";
import { Input, Field, Label } from "@usace/groundwork";
import { useAuth } from "../utilities/auth/useAuth";

export const FormContext = createContext();

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

  // State for timestamp management
  const [baseTimestamp, setBaseTimestamp] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
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
    const base = new Date(baseTimestamp);
    if (timeOffset !== 0) {
      base.setMinutes(base.getMinutes() + timeOffset);
    }
    return base.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            // Convert timestamp to epoch milliseconds
            const epochMs = new Date(timestamp).getTime();
            const value = parseFloat(input.getValues()[0]) || 0;

            // Create TimeSeries object according to the interface
            const timeSeries = {
              name: input.tsid,
              officeId: office,
              units: input.units || "EN",
              // values is a 2D array: [[epochMs, value, qualityCode], ...]
              values: [
                [epochMs, value, 0], // [timestamp, value, quality_code]
              ],
            };

            console.log("Submitting time series:", timeSeries);

            // Call postTimeSeries with correct parameters
            await ts_api.postTimeSeries({
              timeSeries: timeSeries,
              timezone: "UTC",
              createAsLrts: false,
              storeRule: "REPLACE_ALL",
            });

            console.log("Successfully posted time series for:", input.tsid);
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
              onChange={(e) => setBaseTimestamp(e.target.value)}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              Base timestamp for all form submissions. Individual inputs can have time
              offsets.
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
