import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxBundlerProvider } from "redux-bundler-hook";
import getStore from "./bundles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CdaUrlProvider } from "@usace-watermanagement/groundwork-water";
import App from "./App.jsx";
import "./css/index.css";

const store = getStore();
const CDA_HOST =
  import.meta.env.VITE_CDA_HOST || "https://cwms-data.usace.army.mil/cwms-data";
if (import.meta.env.MODE === "development") window.store = store;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxBundlerProvider store={store}>
      <CdaUrlProvider url={CDA_HOST}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CdaUrlProvider>
    </ReduxBundlerProvider>
  </React.StrictMode>
);
