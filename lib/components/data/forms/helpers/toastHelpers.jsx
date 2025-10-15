import React from "react";
import { toast } from "react-toastify";

/**
 * Default toast configuration
 * Set autoClose to false to disable auto-closing
 */
const TOAST_DEFAULTS = {
  position: "top-right",
  autoClose: 5000, // Set to false to disable auto-closing
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Show a success toast
 */
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

/**
 * Show an error toast
 */
export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

/**
 * Show a warning toast
 */
export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

/**
 * Show an info toast
 */
export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

/**
 * Show a loading toast that can be updated
 */
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message, {
    containerId: TOAST_DEFAULTS.containerId,
    position: TOAST_DEFAULTS.position,
  });
};

/**
 * Update an existing toast
 */
export const updateToast = (toastId, { type = "success", message, ...options }) => {
  if (toastId) {
    toast.update(toastId, {
      ...TOAST_DEFAULTS,
      render: message,
      type: type,
      isLoading: false,
      closeButton: true,
      ...options,
    });
  }
};

/**
 * Format submission results for toast messages
 */
export const formatSubmissionMessage = (data) => {
  if (!data) return "Submission completed";

  const { results = [], errors = [], hasErrors } = data;
  const successCount = results.length;
  const errorCount = errors.length;

  if (hasErrors && errorCount > 0) {
    if (successCount > 0) {
      // Partial success
      return `Partial success: ${successCount} succeeded, ${errorCount} failed`;
    } else {
      // Complete failure
      return `Submission failed: ${errorCount} item${errorCount > 1 ? "s" : ""} failed`;
    }
  }

  // Complete success
  return `Successfully submitted ${successCount} item${successCount !== 1 ? "s" : ""}`;
};

/**
 * Show detailed error information in a toast
 */
export const showDetailedError = (error, options = {}) => {
  if (!error) {
    showErrorToast("An unknown error occurred", options);
    return;
  }

  // If it's our custom error format with details
  if (error.errors && Array.isArray(error.errors)) {
    const errorMessages = error.errors.map((e) => `${e.tsid}: ${e.error}`).join("\n");
    showErrorToast(
      <div>
        <div>{formatSubmissionMessage(error)}</div>
        {error.errors.length <= 3 && (
          <div className="text-sm mt-2 opacity-90">
            {error.errors.map((e, i) => (
              <div key={i}>
                • {e.tsid}: {e.error}
              </div>
            ))}
          </div>
        )}
      </div>,
      { autoClose: false, ...options }, // Keep error details visible by default, but allow override
    );
  } else if (error.message) {
    showErrorToast(error.message, options);
  } else {
    showErrorToast("Submission failed. Please try again.", options);
  }
};
