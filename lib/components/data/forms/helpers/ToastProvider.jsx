import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Track if ToastContainer has been added globally
let globalToastContainerMounted = false;

/**
 * Component that ensures ToastContainer is present in the app
 * Can be used multiple times - only one container will be rendered
 */
export function EnsureToastContainer() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if ToastContainer already exists in the DOM
    const existingContainer = document.querySelector(".Toastify");

    if (!existingContainer && !globalToastContainerMounted) {
      globalToastContainerMounted = true;
      setShouldRender(true);

      return () => {
        globalToastContainerMounted = false;
        setShouldRender(false);
      };
    }
  }, []);

  // Only render if this instance should render the container
  if (shouldRender) {
    return (
      <ToastContainer
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

  return null;
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
