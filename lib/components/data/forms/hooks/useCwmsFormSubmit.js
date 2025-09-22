import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimeSeriesApi, TextTimeSeriesApi, Configuration } from "cwmsjs";

/**
 * Custom hook for submitting CWMS form data using TanStack Query
 * @param {Object} config - Configuration object
 * @param {string} config.cdaUrl - The CDA URL
 * @param {string} config.office - The office ID
 * @param {Object} config.auth - Auth object with token
 * @param {string} config.storeRule - Store rule for time series data (REPLACE_ALL, DO_NOT_REPLACE, etc.)
 * @param {Function} config.onSuccess - Success callback
 * @param {Function} config.onError - Error callback
 * @param {Object} config.mutationOptions - Additional options to pass to useMutation
 */
export function useCwmsFormSubmit({
  cdaUrl,
  office,
  auth,
  storeRule = "REPLACE_ALL",
  onSuccess,
  onError,
  mutationOptions = {},
}) {
  const queryClient = useQueryClient();

  // Add a flag to prevent double submissions in StrictMode
  const isSubmittingRef = React.useRef(false);

  // Create configuration for CWMS APIs
  const createApiConfig = () => {
    const configParams = {
      basePath: cdaUrl,
      headers: {
        accept: "application/json;version=2",
      },
      credentials: "include",
    };

    // Add authorization header if token is available
    if (auth?.token) {
      configParams.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    return new Configuration(configParams);
  };

  // Helper function to determine if value should be treated as text or numeric
  const isNumericValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  };

  // Mutation for submitting time series data
  const mutation = useMutation({
    mutationFn: async (formInputs) => {
      // Prevent double submission in StrictMode
      if (isSubmittingRef.current) {
        return { results: [], hasErrors: false, successCount: 0, errorCount: 0 };
      }
      isSubmittingRef.current = true;

      try {
        const config = createApiConfig();
        const ts_api = new TimeSeriesApi(config);
        const text_ts_api = new TextTimeSeriesApi(config);

        const results = [];
        const errors = [];

        // Process each input with TSID
        for (const input of formInputs) {
          if (input.tsid) {
            try {
              const rawValue = input.values[0];

              if (isNumericValue(rawValue)) {
                // Numeric data - use regular TimeSeries API
                const epochMs = new Date(input.timestamp).getTime();
                const value = parseFloat(rawValue) || 0;

                const timeSeries = {
                  name: input.tsid,
                  officeId: office,
                  units: input.units || "EN",
                  values: [
                    [epochMs, value, 0], // [timestamp, value, quality_code]
                  ],
                };

                await ts_api.postTimeSeries({
                  timeSeries: timeSeries,
                  timezone: "UTC",
                  createAsLrts: false,
                  storeRule: storeRule,
                });

                results.push({
                  tsid: input.tsid,
                  type: "numeric",
                  status: "success",
                  value: value,
                  timestamp: input.timestamp,
                });
              } else {
                // Text data - use TextTimeSeries API
                const textTimeSeries = {
                  name: input.tsid,
                  officeId: office,
                  timeZone: "UTC",
                  regularTextValues: [
                    {
                      dateTime: new Date(input.timestamp),
                      textValue: String(rawValue || ""),
                      qualityCode: 0,
                    },
                  ],
                };

                await text_ts_api.postTimeSeriesText({
                  textTimeSeries: textTimeSeries,
                  replaceAll: true,
                });

                results.push({
                  tsid: input.tsid,
                  type: "text",
                  status: "success",
                  value: rawValue,
                  timestamp: input.timestamp,
                });
              }
            } catch (error) {
              errors.push({
                tsid: input.tsid,
                error: error.message || "Unknown error",
                details: error,
                response: error.response?.data,
                status: error.response?.status,
              });
            }
          }
        }

        // If there were any errors, throw them to trigger onError
        if (errors.length > 0) {
          const errorResult = {
            results,
            errors,
            hasErrors: true,
            successCount: results.length,
            errorCount: errors.length,
          };

          throw errorResult;
        }

        return {
          results,
          hasErrors: false,
          successCount: results.length,
          errorCount: 0,
        };
      } finally {
        // Reset the flag after submission completes
        setTimeout(() => {
          isSubmittingRef.current = false;
        }, 100);
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate only the specific TSIDs that were submitted
      if (variables) {
        const submittedTsids = variables
          .filter((input) => input.tsid)
          .map((input) => input.tsid);

        // Invalidate queries for each submitted TSID
        submittedTsids.forEach((tsid) => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === "cda" &&
              query.queryKey[1] === "timeseries" &&
              query.queryKey.includes(tsid),
          });
        });
      }

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
    retry: 1, // Retry once on failure
    retryDelay: 1000, // Wait 1 second before retry
    ...mutationOptions, // Allow overriding default options
  });

  return mutation;
}

/**
 * Hook for validating form inputs before submission
 */
export function useFormValidation() {
  const validateInputs = (inputs) => {
    const validationErrors = [];

    inputs.forEach((input) => {
      if (input.required) {
        const value = input.getValues()[0];
        if (value === undefined || value === null || value === "") {
          validationErrors.push({
            name: input.name || input.tsid,
            message: `${input.label || input.name || input.tsid || "Field"} is required`,
            input: input,
          });
        }
      }
    });

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  };

  return { validateInputs };
}

/**
 * Helper hook to format submission results for display
 */
export function useSubmissionFormatter() {
  const formatResults = (data) => {
    if (!data) return null;

    const { results = [], errors = [], hasErrors } = data;

    const summary = {
      total: results.length + errors.length,
      successful: results.length,
      failed: errors.length,
      hasErrors,
      message: hasErrors
        ? `Submitted ${results.length} of ${results.length + errors.length} items successfully`
        : `Successfully submitted ${results.length} items`,
    };

    return {
      summary,
      results,
      errors,
    };
  };

  return { formatResults };
}
