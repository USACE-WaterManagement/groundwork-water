import React from "react";
import { toast } from "react-toastify";

/**
 * Default toast configuration
 * Set autoClose to false to disable auto-closing
 */
const TOAST_DEFAULTS = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    ...TOAST_DEFAULTS,
    ...options,
  });
};

export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message, {
    containerId: TOAST_DEFAULTS.containerId,
    position: TOAST_DEFAULTS.position,
  });
};

export const updateToast = (toastId, { type = "success", message, ...options }) => {
  if (toastId) {
    toast.update(toastId, {
      ...TOAST_DEFAULTS,
      render: message,
      type,
      isLoading: false,
      closeButton: true,
      ...options,
    });
  }
};

export const formatSubmissionMessage = (data) => {
  if (!data) return "Submission completed";

  const { results = [], errors = [], hasErrors } = data;
  const successCount = results.length;
  const errorCount = errors.length;

  if (hasErrors && errorCount > 0) {
    if (successCount > 0) {
      return `Partial success: ${successCount} succeeded, ${errorCount} failed`;
    }

    return `Submission failed: ${errorCount} item${errorCount > 1 ? "s" : ""} failed`;
  }

  return `Successfully submitted ${successCount} item${successCount !== 1 ? "s" : ""}`;
};

export const showDetailedError = (error, options = {}) => {
  if (!error) {
    showErrorToast("An unknown error occurred", options);
    return;
  }

  if (error.errors && Array.isArray(error.errors)) {
    showErrorToast(
      <div>
        <div>{formatSubmissionMessage(error)}</div>
        {error.errors.length <= 3 && (
          <div className="text-sm mt-2 opacity-90">
            {error.errors.map((entry, i) => (
              <div key={i}>
                - {entry.tsid || entry.blobId || entry.name || "Submission"}:{" "}
                {entry.error}
              </div>
            ))}
          </div>
        )}
      </div>,
      { autoClose: false, ...options },
    );
  } else if (error.message) {
    showErrorToast(error.message, options);
  } else {
    showErrorToast("Submission failed. Please try again.", options);
  }
};
