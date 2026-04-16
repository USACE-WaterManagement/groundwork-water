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
} from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaMultiTimeSeries } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaTSHookParams } from "../../../props-declarations/data-hooks";
import CWMSTableInfo from "../../../components/CWMSTableInfo";
import dayjs from "dayjs";

const office = "SWT";
const defaults = {
  office,
  begin: dayjs().subtract(6, "hour").toISOString(),
};
const TSID_LIST = [
  {
    name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
  },
  {
    name: "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
    unit: "ac-ft",
    begin: dayjs().subtract(5, "hour").toISOString(),
  },
];

const cdaMultiTsHookParams = cdaTSHookParams.map((param) =>
  param.name === "name"
    ? {
        ...param,
        type: "string | string[]",
        desc: "Specifies the name(s) of the time series whose data is to be included in the response. Pass either an array of TSIDs or a comma-separated string. Case insensitive.",
      }
    : param,
);
const multiTsHookParams = [
  {
    name: "cdaParams",
    type: "array<object>",
    required: true,
    desc: "Array of per-time-series CDA request objects. Existing usage remains supported, and per-item values override any matching defaults.",
  },
  {
    name: "defaults",
    type: "object",
    required: false,
    desc: "Optional shared CDA request values applied to every entry in cdaParams before each item's own fields are merged in. Useful for common office, begin, end, or unit values.",
  },
  {
    name: "cdaUrl",
    type: "string",
    required: false,
    desc: "Optional override for the CDA base URL.",
  },
  {
    name: "queryOptions",
    type: "object",
    required: false,
    desc: "Optional TanStack Query options applied to each generated query.",
  },
];

const OutflowCard = () => {
  const cdaMultiTimeSeries = useCdaMultiTimeSeries({
    defaults,
    cdaParams: TSID_LIST,
  });
  const getTsidLabel = (idx) => TSID_LIST[idx]?.name ?? "Unknown TSID";
  const isError = cdaMultiTimeSeries.some((ts) => ts.isError);
  const isLoading = cdaMultiTimeSeries.some((ts) => ts.isLoading);
  const data = cdaMultiTimeSeries
    .filter((ts) => ts.data) // Filter out any errors or pending states
    .map((ts) => ts.data);
  if (isLoading) return <Skeleton type="card" className="w-1/2 m-auto" />;
  return (
    <>
      <Card className="gw-w-96">
        <H3>Keystone Lake: Multiple TimeSeries Data</H3>
        {isError &&
          cdaMultiTimeSeries.map((ts, idx) => {
            if (!ts.isError) return null;
            return (
              <Card key={ts.data?.name + "-error"} className="gw-my-2">
                <div className="gw-flex gw-flex-col gw-gap-2 gw-w-1/2">
                  <Badge color="red">TimeSeries: {getTsidLabel(idx)}</Badge>
                  <Badge color="red">Error: {ts.error.message} </Badge>
                </div>
              </Card>
            );
          })}
        {data.map((ts) => {
          return (
            <Card key={ts.name} className="gw-my-2">
              <div className="gw-flex gw-flex-col  gw-gap-2 gw-w-1/2">
                <Badge color="blue">TimeSeries: {ts.name}</Badge>
                <Badge color="yellow">Begin: {ts.begin.toLocaleString()}</Badge>
                <Badge color="yellow">End: {ts.end.toLocaleString()}</Badge>
              </div>
              <Table
                className="gw-w-full"
                dense
                overflow={true}
                grid
                stickyHeader
                striped
                bleed
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ts.values
                    .filter((entry) => !!entry.at(1)) // Remove empty records
                    .map((entry) => {
                      const time = new Date(entry.at(0)).toLocaleString();
                      const value = entry.at(1).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      });
                      return (
                        <TableRow key={entry.at(0)}>
                          <TableCell>{time}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Card>
          );
        })}
      </Card>
    </>
  );
};

function UseCdaMultiTimeSeries() {
  return (
    <DocsPage middleText="CDA MultiTimeSeries Hook">
      <div>
        <Text>
          The useCdaMultiTimeSeries hook can be used to retrieve multiple timeseries
          data in parallel using cwms-data-api (CDA). It requires only a timeseries ID
          and an office ID, but can be further customized using additional parameters
          provided through CDA if desired.
        </Text>
        <Text className="my-4">
          To retrieve multiple timeseries, the `name` parameter should be an array of
          timeseries ids <b>or</b> a comma-separated list of timeseries IDs.
        </Text>
        <Text>
          You can also provide shared request values through a `defaults` object and
          override them on individual `cdaParams` entries as needed.
        </Text>
        <Text>
          The hook will return an array of{" "}
          <Link
            target="_blank"
            className="underline"
            href="https://tanstack.com/query/v5/docs/framework/react/reference/useQuery"
          >
            tanstack useQuery objects
          </Link>
          . The major objects you will want to access from this are data, isLoading, and
          isError/error. The data object will contain the timeseries name, begin and end
          dates, values and other metadata for each timeseries response in the array.
        </Text>
        <Text className="my-4">
          The timeseries response for a given useQuery result is outlined in the swagger
          specification here:{" "}
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
        <CWMSTableInfo />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <OutflowCard />
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
  TableCell
  } from "@usace/groundwork";
import { useCdaMultiTimeSeries } from "@usace-watermanagement/groundwork-water";
import dayjs from "dayjs";

const office = "SWT";
const defaults = {
  office,
  begin: dayjs().subtract(6, "hour").toISOString(),
};
const TSID_LIST = [
  {
    name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
  },
  {
    name: "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
    unit: "ac-ft",
    begin: dayjs().subtract(5, "hour").toISOString(),
  },
];

export default function OutflowCardExample() {
    const cdaMultiTimeSeries = useCdaMultiTimeSeries({
        defaults,
        cdaParams: TSID_LIST,
    });
    const getTsidLabel = (idx) => TSID_LIST[idx]?.name ?? "Unknown TSID";
    const isError = cdaMultiTimeSeries.some((ts) => ts.isError);
    const isLoading = cdaMultiTimeSeries.some((ts) => ts.isLoading);
    const data = cdaMultiTimeSeries
        .filter((ts) => ts.data) // Filter out any errors or pending states
        .map((ts) => ts.data);
    if (isLoading) return <Skeleton type="card" className="w-1/2 m-auto" />;
    return (
        <Card className="gw-w-96">
            <H3>Keystone Lake: Multiple TimeSeries Data</H3>
            {isError &&
            cdaMultiTimeSeries.map((ts, idx) => {
                if (!ts.isError) return null;
                return (
                <Card key={ts.data?.name + "-error"} className="gw-my-2">
                    <div className="gw-flex gw-flex-col gw-gap-2 gw-w-1/2">
                    <Badge color="red">TimeSeries: {getTsidLabel(idx)}</Badge>
                    <Badge color="red">Error: {ts.error.message} </Badge>
                    </div>
                </Card>
                );
            })}
            {data.map((ts) => {
                return (
                    <Card key={ts.name} className="gw-my-2">
                    <div className="gw-flex gw-flex-col  gw-gap-2 gw-w-1/2">
                        <Badge color="blue">TimeSeries: {ts.name}</Badge>
                        <Badge color="yellow">Begin: {ts.begin.toLocaleString()}</Badge>
                        <Badge color="yellow">End: {ts.end.toLocaleString()}</Badge>
                    </div>
                    <Table
                        className="gw-w-full"
                        dense
                        overflow={true}
                        grid
                        stickyHeader
                        striped
                        bleed
                    >
                        <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {ts.values
                            .filter((entry) => !!entry.at(1)) // Remove empty records
                            .map((entry) => {
                            const time = new Date(entry.at(0)).toLocaleString();
                            const value = entry[1].toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            });
                            return (
                                <TableRow key={entry.at(0)}>
                                    <TableCell>{time}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </Card>
                );
            })}
        </Card>
    );
}
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useCdaMultiTimeSeries({...})`}</Code>
      </div>
      <ParamsTable paramsList={multiTsHookParams} />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaMultiTsHookParams} />
    </DocsPage>
  );
}

export { UseCdaMultiTimeSeries };
export default UseCdaMultiTimeSeries;
