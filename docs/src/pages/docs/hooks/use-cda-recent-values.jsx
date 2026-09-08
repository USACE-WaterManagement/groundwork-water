import {
  H3,
  Text,
  Card,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Link,
  Skeleton,
  Code,
} from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaRecentValues } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const office = "SWT";
const TSIDS = [
  "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
  "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
  "KEYS.Elev-Tailwater.Inst.1Hour.0.Ccp-Rev",
];

const recentValuesParams = [
  {
    name: "tsIds",
    type: "string[]",
    required: true,
    desc: "Time series IDs to look up. Duplicates and blanks are ignored, and TSIDs the office does not have are simply absent from the result.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Office ID to scope the lookup to.",
  },
  {
    name: "unitSystem",
    type: '"EN" | "SI"',
    required: false,
    desc: "Unit system for the returned values. CDA's default applies when omitted.",
  },
  {
    name: "cdaUrl",
    type: "string",
    required: false,
    desc: "Optional override for the CDA base URL.",
  },
  {
    name: "enabled",
    type: "boolean",
    required: false,
    desc: "Set false to hold the request. Defaults to true; no request is made for an empty tsIds list either way.",
  },
  {
    name: "staleTime",
    type: "number",
    required: false,
    desc: "TanStack Query staleTime, in milliseconds, applied to each request.",
  },
  {
    name: "maxChunkChars",
    type: "number",
    required: false,
    desc: "Encoded character budget for the TSID list in a single request. Longer lists are split across requests. Defaults to 1500.",
  },
];

const recentValueShape = [
  { name: "tsid", type: "string", required: true, desc: "The time series ID." },
  {
    name: "value",
    type: "number",
    required: false,
    desc: "The most recent value.",
  },
  {
    name: "dateTimeMs",
    type: "number",
    required: false,
    desc: "Timestamp of that value, in epoch milliseconds.",
  },
  {
    name: "unitId",
    type: "string",
    required: false,
    desc: "Units the value is expressed in.",
  },
  {
    name: "officeId",
    type: "string",
    required: false,
    desc: "Office that owns the time series.",
  },
  {
    name: "qualityCode",
    type: "number",
    required: false,
    desc: "CWMS quality code for the value.",
  },
];

const RecentValuesCard = () => {
  const { data, isPending, isError, error } = useCdaRecentValues({
    tsIds: TSIDS,
    office,
  });

  if (isPending) return <Skeleton type="card" className="w-1/2 m-auto" />;

  return (
    <Card className="gw-w-full">
      <H3>Keystone Lake: Most Recent Values</H3>
      {isError && <Badge color="red">Error: {error.message}</Badge>}
      <Table className="gw-w-full" dense overflow={true} grid striped bleed>
        <TableHead>
          <TableRow>
            <TableCell>Time Series</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>As Of</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TSIDS.map((tsid) => {
            const recent = data[tsid];
            return (
              <TableRow key={tsid}>
                <TableCell>{tsid}</TableCell>
                <TableCell>{recent?.value?.toFixed(2) ?? "-"}</TableCell>
                <TableCell>{recent?.unitId ?? "-"}</TableCell>
                <TableCell>
                  {recent?.dateTimeMs
                    ? new Date(recent.dateTimeMs).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

function UseCdaRecentValues() {
  return (
    <DocsPage middleText="CDA Recent Values Hook">
      <div>
        <Text>
          The useCdaRecentValues hook retrieves the most recent value of many time
          series in a single request, using CDA&apos;s{" "}
          <Code className="p-1">/timeseries/recent</Code> endpoint. Use it when you need
          &quot;what is this reading right now&quot; for a list of known TSIDs and
          don&apos;t care about the history in between.
        </Text>
        <Text className="my-4">
          Because the endpoint takes an explicit list of TSIDs rather than a search
          pattern, there is no regular expression for the database to compile. That
          matters at scale: asking a{" "}
          <Link href="/docs/hooks/use-cda-catalog" className="underline">
            catalog
          </Link>{" "}
          lookup about several dozen series at once means building a long alternation,
          which Oracle rejects past a certain length. This hook has no such ceiling -
          long lists are simply split across requests to keep URLs a reasonable size.
        </Text>
        <Text className="my-4">
          Results come back keyed by TSID. A TSID the office does not have is omitted
          from <Code className="p-1">data</Code> rather than raising an error, so check
          for the key before reading it.
        </Text>
        <Text className="my-4">
          If you need the surrounding values and not just the latest one, use{" "}
          <Link href="/docs/hooks/use-cda-multi-time-series" className="underline">
            useCdaMultiTimeSeries
          </Link>{" "}
          instead. For a single series with a fallback that reaches back past an empty
          window, see{" "}
          <Link href="/docs/hooks/use-cda-latest-value" className="underline">
            useCdaLatestValue
          </Link>
          .
        </Text>
        <Text className="my-4">
          The endpoint is documented in the swagger specification here:{" "}
          <Link
            href="https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html#operations-tag-TimeSeries"
            target="_blank"
            className="underline"
          >
            CDA Timeseries API
          </Link>
          .
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <RecentValuesCard />
      </div>
      <CodeBlock language="jsx">
        {`import {
  Badge,
  Card,
  H3,
  Skeleton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@usace/groundwork";
import { useCdaRecentValues } from "@usace-watermanagement/groundwork-water";

const office = "SWT";
const TSIDS = [
  "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
  "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
  "KEYS.Elev-Tailwater.Inst.1Hour.0.Ccp-Rev",
];

export default function RecentValuesExample() {
  const { data, isPending, isError, error } = useCdaRecentValues({
    tsIds: TSIDS,
    office,
  });

  if (isPending) return <Skeleton type="card" className="w-1/2 m-auto" />;

  return (
    <Card className="gw-w-full">
      <H3>Keystone Lake: Most Recent Values</H3>
      {isError && <Badge color="red">Error: {error.message}</Badge>}
      <Table className="gw-w-full" dense overflow={true} grid striped bleed>
        <TableHead>
          <TableRow>
            <TableCell>Time Series</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>As Of</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TSIDS.map((tsid) => {
            const recent = data[tsid];
            return (
              <TableRow key={tsid}>
                <TableCell>{tsid}</TableCell>
                <TableCell>{recent?.value?.toFixed(2) ?? "-"}</TableCell>
                <TableCell>{recent?.unitId ?? "-"}</TableCell>
                <TableCell>
                  {recent?.dateTimeMs
                    ? new Date(recent.dateTimeMs).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useCdaRecentValues({...})`}</Code>
      </div>
      <ParamsTable paramsList={recentValuesParams} />
      <div className="font-bold text-lg pt-6">
        Returns -{" "}
        <Code className="p-2">{`{ data, isPending, isFetching, isError, error }`}</Code>
      </div>
      <Text className="my-2">
        <Code className="p-1">data</Code> is an object keyed by TSID; each entry has the
        following shape. The remaining fields aggregate every underlying request, so a
        split list still reports one pending and one error state.
      </Text>
      <ParamsTable paramsList={recentValueShape} />
    </DocsPage>
  );
}

export { UseCdaRecentValues };
export default UseCdaRecentValues;
