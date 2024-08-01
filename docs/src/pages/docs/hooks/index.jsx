import { Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import Alert from "../../components/alert";

const returnParams = [
  {
    name: "data",
    type: "object?",
    desc: (
      <>
        Undefined until the request has resolved, then an object containing the
        response (if a valid response is received). The return object will vary
        depending on the request endpoint, but response definitions for each CDA
        endpoint are available in the{" "}
        <a
          href="https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html"
          className="underline"
        >
          CDA Swagger Docs
        </a>
        .
      </>
    ),
  },
  {
    name: "isPending",
    type: "boolean",
    desc: "Is true until a query response is received, then false.",
  },
  {
    name: "error",
    type: "object?",
    desc: "Is null if no error has occurred, else an object containing the error.",
  },
];

function DataHooks() {
  return (
    <DocsPage middleText="Data Hooks Overview">
      <div>
        <Text>
          The groundwork-water data hooks provide easy access to data provided
          by various APIs such as cwms-data-api (CDA) and the National Weather
          Prediction Service (NWPS). While many groundwork-water components
          handle the data-fetching process for the user, at times lower-level
          data-fetching access is required to allow for the development of more
          highly-customized components.
        </Text>
      </div>
      <Divider text="Basic Usage" className="mt-8 mb-5" />
      <Text>
        The groundwork water management data fetching hooks make use of the{" "}
        <a href="https://tanstack.com/query/latest" className="underline">
          TanStack Query
        </a>{" "}
        (FKA React Query) library. This library handles the nitty gritty bits of
        fetching, caching, synchronizing, and updating server state such as that
        exposed by cwms-data-api (CDA).
      </Text>
      <br />
      <Text>
        The included hooks wrap a JavaScript <Code>fetch()</Code> call to the
        associated API endpoint into a React Query <Code>useQuery()</Code>{" "}
        function. This returns an object with a number of helpful properties
        such as <Code>data</Code>,<Code>isPending</Code>, and <Code>error</Code>
        , which all help manage the more complex parts of the fetch life-cycle
        for you.
      </Text>
      <br />
      <Text>
        {`These hooks are intended to cover the most typical API endpoints that
        might be used in water management applications. If you need a hook for
        an API endpoint that doesn't currently exist, please create an issue in
        the `}
        <a
          href="https://github.com/USACE-WaterManagement/groundwork-water"
          className="underline"
        >
          GitHub repo
        </a>
        {` or, if you'd like, feel free to build the hook yourself and create a
        pull request!`}
      </Text>
      <br />
      <Alert
        title="Note"
        status="info"
        message={
          <span>
            A quick walkthrough to get React Query set up in your application is
            available at{" "}
            <a href="/docs/react-query" className="underline">
              Getting Started - React Query
            </a>
          </span>
        }
      />
      <Divider text="Configuration" className="mt-8 mb-5" />
      <Text>
        While the default configuration will likely suffice for most use cases,
        TanStack Query is highly configurable for individualized needs. The
        configuration can be adjusted either when the QueryClient is
        instantiated or for individual useQuery requests. See the docs for{" "}
        <a
          href="https://tanstack.com/query/latest/docs/reference/QueryClient"
          className="underline"
        >
          QueryClient
        </a>{" "}
        and for{" "}
        <a
          href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
          className="underline"
        >
          useQuery
        </a>
        {`. Due to the nature of water management data (i.e. occasional large data
        requests, data rarely changing "on-the-fly") users may consider
        increasing the "staleTime" on a default or per-query basis to limit
        unnecessary refetches.`}
      </Text>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Return Parameters -{" "}
        <Code className="p-2">{`const {...} = useQuery()`}</Code>
      </div>
      <ParamsTable paramsList={returnParams} showReq={false} />
      <Text className="pt-3">
        A full list of the return parameters for useQuery hooks can be
        referenced in the{" "}
        <a
          href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
          className="underline"
        >
          useQuery documentation
        </a>
        .
      </Text>
    </DocsPage>
  );
}

export { DataHooks };
export default DataHooks;
