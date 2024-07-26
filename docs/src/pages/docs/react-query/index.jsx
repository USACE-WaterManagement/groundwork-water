import { UsaceBox, Text, H2, H4 } from "@usace/groundwork";
import { Code } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Alert from "../../components/alert";
import Divider from "../../components/divider";

export default function Docs() {
  return (
    <DocsPage
      nextUrl="/docs/plots"
      prevUrl="/docs/add-components"
      middleText="React Query"
      prevText="Return to Add Components"
      nextText="Go to Plots Page"
    >
      <H2>React Query Installation</H2>
      <Alert
        status="warning"
        title="NOTE"
        message={
          <span>
            This package is not included in the{" "}
            <b>@usace-watermanagement/groundwork-water</b> package. You will
            need to install it separately.
          </span>
        }
      />
      <Text className="mt-4">
        Install the <b>@tanstack/react-query</b> package in your terminal with:
      </Text>
      <Code className="gw-block gw-p-1 gw-px-2" language="bash">
        npm install @tanstack/react-query
      </Code>
      <Divider text="React Query Setup" className="my-4" />
      <Alert
        status="info"
        title="INFO"
        message={
          <span>
            The following 3 steps take place in the <b>/main.jsx</b> file.
          </span>
        }
      />
      <Text className="mt-4">
        Import the <b>QueryClient</b> and <b>QueryClientProvider</b> from the
        <code className="font-bold"> @tanstack/react-query</code> package.
      </Text>
      <Code className="gw-block gw-p-1 gw-px-2 " language="jsx">
        {
          'import { QueryClient, QueryClientProvider } from "@tanstack/react-query"'
        }
      </Code>
      <Text>
        Create a new instance of the <b>QueryClient</b> and pass in the default
        options. Note: The{" "}
        <code className="font-bold"> refetchOnWindowFocus</code> option is set
        to true by default.
      </Text>
      <Alert
        status="warning"
        title="NOTE"
        message={
          <span>
            Use the <b>refetchOnWindowFocus: true</b> option sparingly, as it will
            cause <em>EVERY</em> query to be re-run every time the user navigates back to the tab or window.
          </span>
        }
      />
      <Code className="gw-block gw-pb-1 gw-px-2" language="jsx">
        {`const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});`}
      </Code>
      <Text>
        Wrap your application in the <b>QueryClientProvider</b> and pass in the
        <code className="font-bold"> queryClient</code> instance you created
        above.
      </Text>
      <Code className="gw-block gw-p-1 gw-px-2" language="jsx">
        {`ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxBundlerProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ReduxBundlerProvider>
  </React.StrictMode>
);`}
      </Code>

      <Text>
        Make sure to import style.css from Groundwork into your top-level
        component (i.e. App.jsx), then go build stuff with the components
      </Text>
    </DocsPage>
  );
}
