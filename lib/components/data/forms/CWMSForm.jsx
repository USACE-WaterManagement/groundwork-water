import React, { createContext, useRef, useState } from "react";
import { Input, Field, Label, Button } from "@usace/groundwork";
import { useAuth } from "../utilities/auth/useAuth";
import { getSnappedTimestamp } from "./helpers/timeSnapping";
import { useCwmsFormSubmit, useFormValidation } from "./hooks/useCwmsFormSubmit";
import {
  showSuccessToast,
  showWarningToast,
  formatSubmissionMessage,
  showDetailedError,
} from "./helpers/toastHelpers.jsx";
import { EnsureToastContainer } from "./helpers/ToastProvider";

export const FormContext = createContext();

export function CWMSForm({
  office,
  cdaUrl,
  children,
  onSubmit,
  onReset,
  onSuccess,
  onError,
  submitText = "Submit",
  resetText = "Reset",
  resetOnSubmit = true, // Whether to reset form fields after successful submission
  storeRule = "REPLACE_ALL", // Store rule for time series data: REPLACE_ALL, DO_NOT_REPLACE, DELETE_INSERT, etc.
  showButtons = true,
  showCalendar = true,
  calendarLabel = "Submission Time",
  calendarInterval = "minute", // none, second, minute, 5minutes, 15minutes, 30minutes, hour, day
  calendarSnapTo = "nearest", // nearest, previous, next
  toastAutoClose = 5000, // Set to false to disable auto-close for all toasts, or number for milliseconds
  className = "",
  style,
  mutationOptions = {}, // Additional options for the mutation
}) {
  const inputsRef = useRef([]);
  const registeredIds = useRef(new Set());

  // Try to get auth context if available
  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // No auth provider, dont fail to show mock fields in docs
  }

  // Use TanStack Query mutation for form submission
  const mutation = useCwmsFormSubmit({
    cdaUrl,
    office,
    auth,
    storeRule,
    onSuccess: (data) => {
      // Show success toast
      const message = formatSubmissionMessage(data);
      showSuccessToast(message, { autoClose: toastAutoClose });

      // Reset form on successful submission if enabled
      if (resetOnSubmit) {
        handleReset();
      }

      // Call user's onSuccess callback
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      // Handle errors
      console.error("Form submission error:", error);

      // Mark invalid fields if there are validation errors
      if (error.errors) {
        error.errors.forEach((err) => {
          const input = inputsRef.current.find(
            (i) => i.tsid === err.tsid || i.name === err.tsid,
          );
          if (input?.setInvalid) {
            input.setInvalid(true);
          }
        });
      }

      // Show error toast
      showDetailedError(error, { autoClose: toastAutoClose });

      // Call user's onError callback
      if (onError) {
        onError(error);
      }
    },
    mutationOptions,
  });

  // Form validation hook
  const { validateInputs } = useFormValidation();

  // State for timestamp management
  const [baseTimestamp, setBaseTimestamp] = useState(() => {
    return getSnappedTimestamp(new Date(), calendarInterval, calendarSnapTo);
  });

  const registerInput = (input) => {
    // Create a unique ID for this input based on its TSID and name
    // Use TSID as primary identifier since it should be unique
    const inputId = input.tsid || `${input.name || ""}_${Math.random()}`;

    // Check if this input is already registered by looking for the same TSID
    const existingIndex = inputsRef.current.findIndex(
      (i) => i.tsid === input.tsid && i.tsid !== undefined,
    );

    if (existingIndex !== -1) {
      // Update existing input instead of adding a duplicate
      inputsRef.current[existingIndex] = { ...input, id: inputId };
    } else {
      // Add new input
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields using the validation hook
    const validation = validateInputs(inputsRef.current);

    if (!validation.isValid) {
      // Show validation errors in toast
      const errorCount = validation.errors.length;
      const message =
        errorCount === 1
          ? validation.errors[0].message
          : `Please fill in ${errorCount} required fields`;

      showWarningToast(message, { autoClose: toastAutoClose });

      // Mark invalid fields
      validation.errors.forEach((error) => {
        if (error.input?.setInvalid) {
          error.input.setInvalid(true);
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

    // Call custom onSubmit if provided (runs alongside CWMS submission)
    if (onSubmit) {
      onSubmit(formData, e);
    }

    // Submit using TanStack Query mutation
    // Filter to only inputs with TSIDs for CWMS submission
    const cwmsInputs = formData.filter((input) => input.tsid);

    if (cwmsInputs.length > 0) {
      mutation.mutate(cwmsInputs);
    } else {
      showWarningToast("No inputs with TSIDs to submit to CWMS");
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

    const snappedTimestamp = getSnappedTimestamp(
      newDate,
      calendarInterval,
      calendarSnapTo,
    );
    setBaseTimestamp(snappedTimestamp);
  };

  // Combine default Tailwind classes with any custom className
  const formClasses = `flex flex-col gap-4 ${className || ""}`;

  return (
    <>
      <EnsureToastContainer />
      <FormContext.Provider
        value={{ registerInput, baseTimestamp, getTimestampForInput }}
      >
        <form onSubmit={handleSubmit} className={formClasses} style={style}>
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
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                type="button"
                color="secondary"
                disabled={mutation.isPending}
              >
                {resetText}
              </Button>
              <Button type="submit" color="primary" disabled={mutation.isPending}>
                {mutation.isPending ? "Submitting..." : submitText}
              </Button>
            </div>
          )}
        </form>
      </FormContext.Provider>
    </>
  );
}
