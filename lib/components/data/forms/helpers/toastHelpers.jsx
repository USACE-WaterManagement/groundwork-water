import React from "react";
import { toast } from "react-toastify";

/**
 * Show a success toast
 */
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show an error toast
 */
export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show a warning toast
 */
export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show an info toast
 */
export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show a loading toast that can be updated
 */
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message, {
    position: "top-right",
  });
};

/**
 * Update an existing toast
 */
export const updateToast = (toastId, { type = "success", message, ...options }) => {
  if (toastId) {
    toast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 5000,
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
export const showDetailedError = (error) => {
  if (!error) {
    showErrorToast("An unknown error occurred");
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
      { autoClose: 10000 },
    );
  } else if (error.message) {
    showErrorToast(error.message);
  } else {
    showErrorToast("Submission failed. Please try again.");
  }
};
