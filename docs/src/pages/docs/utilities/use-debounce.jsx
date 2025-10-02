import {
  H3,
  Text,
  Card,
  Input,
  Label,
  Fieldset,
  Code,
  Badge,
  Skeleton,
} from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { Code as CodeBlock } from "../../components/code";
import { useCdaTimeSeries, useDebounce } from "@usace-watermanagement/groundwork-water";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const DebounceDemoCard = () => {
  const [rawValue, setRawValue] = useState("KEYSMAR24.TXT");
  const [delayMs, setDelayMs] = useState(300);
  const debouncedValue = useDebounce(rawValue, delayMs);

  // Optional: show how many "updates" actually make it through
  const appliedCount = useRef(0);
  useEffect(() => {
    appliedCount.current += 1;
  }, [debouncedValue]);

  return (
    <Card className="w-full">
      <H3>Debounce an input value</H3>
      <Fieldset>
        <div className="grid grid-cols-[220px_1fr] gap-y-4 items-center">
          <Label htmlFor="debounce-value" className="text-right me-2">
            Value:
          </Label>
          <Input
            id="debounce-value"
            className="w-2/3"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            placeholder="Type quickly to see debouncing"
          />

          <Label htmlFor="debounce-delay" className="text-right me-2">
            Delay (ms):
          </Label>
          <Input
            id="debounce-delay"
            type="number"
            min={0}
            step={50}
            className="w-40"
            value={delayMs}
            onChange={(e) => setDelayMs(Math.max(0, Number(e.target.value)))}
            placeholder="300"
          />
        </div>
      </Fieldset>

      <div className="mt-4 space-y-2">
        <div className="rounded-md border px-4 py-3">
          <div className="font-semibold">Immediate value</div>
          <div className="font-mono break-all">{rawValue || <em>(empty)</em>}</div>
        </div>
        <div className="rounded-md border px-4 py-3">
          <div className="font-semibold">Debounced value</div>
          <div className="font-mono break-all">
            {debouncedValue || <em>(empty)</em>}
          </div>
        </div>
        <Badge color="blue" className="mt-2">
          Applied updates: {appliedCount.current}
        </Badge>
      </div>
    </Card>
  );
};

const TimeSeriesExample = ({ beginDate }) => {
  const [query, setQuery] = useState("KEYS.Elev.Inst.1Hour.0.Ccp-Rev");
  const debouncedTsid = useDebounce(query, 300);
  const timeSeries = useCdaTimeSeries({
    cdaParams: {
      office: "SWT",
      name: debouncedTsid,
      begin: beginDate,
    },
    queryOptions: {
      retry: 0,
    },
  });
  return (
    <div>
      <label htmlFor="time-series-query" className="text-right me-2 inline-block">
        Query:
      </label>
      <Input
        id="time-series-query"
        className="w-1/2 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="KEYS.Elev.Inst.1Hour.0.Ccp-Rev"
      />
      <div>
        Searching for: <b>{debouncedTsid}</b> in Office SWT
      </div>
      {timeSeries.isLoading ? (
        <Skeleton type="card" />
      ) : timeSeries.isError ? (
        <Badge color="red">Error: {timeSeries.error.message}</Badge>
      ) : !timeSeries.data || timeSeries.data.length === 0 ? (
        <Badge color="yellow">No results</Badge>
      ) : null}
      {timeSeries.data && (
        <>
          Results: <Badge color="green">Success</Badge> {timeSeries.data.values.length}{" "}
          value returned
          <CodeBlock language="json">
            {JSON.stringify(timeSeries.data, null, 2)}
          </CodeBlock>
        </>
      )}
    </div>
  );
};

function useDebouncePage() {
  const beginDate = dayjs().subtract(1, "hour").toISOString();

  return (
    <DocsPage middleText="useDebounce Hook">
      <p className="mb-4">
        <Code>useDebounce</Code> returns a value that only updates after a specified
        period of inactivity.
      </p>
      <p>
        This is useful for delaying expensive work (like network requests or heavy
        computations) until the user stops typing or a rapidly changing input settles.
      </p>
      <Text className="mt-4">
        <Badge color="blue">Note</Badge>: Key takeaway is that the debounced value lags
        behind the input value, only updating after the input has not changed for the
        specified delay time. This is critical if a user spams a value into the input,
        it does not send queries to the API (CDA) until the user has completed their
        input.
      </Text>

      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <DebounceDemoCard />
      </div>
      <Divider text="TimeSeries Example" className="mt-8" />

      <Text>
        The following example shows how to use <Code>useDebounce</Code> with the{" "}
        <Code>useCdaTimeSeries</Code> hook to fetch time series data from the CDA API
      </Text>
      <TimeSeriesExample beginDate={beginDate} />
      <Divider text="TS Example Code" className="mt-8" />
      <CodeBlock language="tsx">{`import { useState } from "react";
import { useDebounce } from "@usace-watermanagement/groundwork-water";

// Begin date is an ISO String provided to this component, 
// i.e. <TimeSeriesExample beginDate={dayjs().subtract(1, "hour").toISOString()} />
export default function ExampleDebounce({beginDate}) {
  const [query, setQuery] = useState("KEYS.Elev.Inst.1Hour.0.Ccp-Rev");
  const debouncedTsid = useDebounce(query, 300);
  const timeSeries = useCdaTimeSeries({
    cdaParams: {
      office: "SWT",
      name: debouncedTsid,
      begin: beginDate,
    },
    queryOptions: {
      retry: 0,
    },
  });
  return (
    <div>
      <label htmlFor="time-series-query" className="text-right me-2 inline-block">
        Query:
      </label>
      <Input
        id="time-series-query"
        className="w-1/2 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="KEYS.Elev.Inst.1Hour.0.Ccp-Rev"
      />
      <div>
        Searching for: <b>{debouncedTsid}</b> in Office SWT
      </div>
      {timeSeries.isLoading ? (
        <Skeleton type="card" />
      ) : timeSeries.isError ? (
        <Badge color="red">Error: {timeSeries.error.message}</Badge>
      ) : !timeSeries.data || timeSeries.data.length === 0 ? (
        <Badge color="yellow">No results</Badge>
      ) : null}
      {timeSeries.data && (
        <>
          Results: <Badge color="green">Success</Badge> {timeSeries.data.values.length}{" "}
          value returned
          <CodeBlock language="json">
            {JSON.stringify(timeSeries.data, null, 2)}
          </CodeBlock>
        </>
      )}
    </div>
}`}</CodeBlock>

      <Divider text="API Reference" className="mt-8" />

      <div className="font-bold text-lg pt-6">
        Hook Signature – <Code className="p-2">useDebounce(value, delay)</Code>
      </div>

      <div className="mt-4">
        <H3 className="text-base">Parameters</H3>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pe-4">Name</th>
                <th className="py-2 pe-4">Type</th>
                <th className="py-2 pe-4">Default</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b align-top">
                <td className="py-2 pe-4">
                  <Code>value</Code>
                </td>
                <td className="py-2 pe-4">
                  <Code>Any</Code>
                </td>
                <td className="py-2 pe-4">—</td>
                <td className="py-2">The input value to debounce. Can be any type.</td>
              </tr>
              <tr className="border-b align-top">
                <td className="py-2 pe-4">
                  <Code>delay</Code>
                </td>
                <td className="py-2 pe-4">
                  <Code>number</Code>
                </td>
                <td className="py-2 pe-4">
                  <Code>300</Code>
                </td>
                <td className="py-2">
                  Time in milliseconds to wait after the last change before updating the
                  debounced value. Defaults to 300 ms.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <H3 className="text-base">Returns</H3>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pe-4">Name</th>
                <th className="py-2 pe-4">Type</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b align-top">
                <td className="py-2 pe-4">
                  <Code>debounced</Code>
                </td>
                <td className="py-2 pe-4">
                  <Code>Any</Code>
                </td>
                <td className="py-2">
                  The debounced value. Mirrors <Code>value</Code> but only updates after
                  <Code> delay</Code> ms of inactivity.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Divider text="Notes & Gotchas" className="mt-8" />
      <ul className="list-disc ms-6 text-sm space-y-2">
        <li>
          Debouncing is time-based: rapid changes to <Code>value</Code> will reset the
          timer and postpone updates until the input settles.
        </li>
        <li>
          Changing <Code>delay</Code> resets the timer; the hook will wait the new delay
          before emitting the next value.
        </li>
        <li>
          Works well with data-fetching: debounce the query string, then trigger your
          request off the debounced value (e.g., in <Code>useEffect</Code> or a query
          key).
        </li>
        <li>
          TypeScript: the hook is generic. If inference doesn’t pick up your type, call
          as <Code>useDebounce&lt;YourType&gt;(value, 300)</Code>.
        </li>
        <li>
          Cleanup: the hook clears its timeout on unmount and when <Code>value</Code> or{" "}
          <Code>delay</Code> changes to avoid stale updates.
        </li>
      </ul>
    </DocsPage>
  );
}

export { useDebouncePage };
export default useDebouncePage;
