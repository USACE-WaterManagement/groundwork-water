import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Component that provides a ToastContainer for CWMS forms
 * Uses enableMultiContainer and containerId to support multiple containers
 * This allows multiple instances without conflicts and removes the need
 * to check for existing containers in the DOM
 */
export function EnsureToastContainer() {
  return (
    <ToastContainer
      containerId="cwms-form-toast"
      enableMultiContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

/**
 * HOC that wraps a component with ToastContainer
 */
export function withToastProvider(Component) {
  return function WrappedComponent(props) {
    return (
      <>
        <Component {...props} />
        <EnsureToastContainer />
      </>
    );
  };
}
