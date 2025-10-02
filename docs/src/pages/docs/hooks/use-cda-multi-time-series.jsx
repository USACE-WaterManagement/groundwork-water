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
import CdaParamsTable from "../../components/cda-params-table";
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
const TSID_LIST = [
  {
    name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
    office,
    begin: dayjs().subtract(2, "hour").toISOString(),
  },
  {
    name: "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
    office,
    begin: dayjs().subtract(5, "hour").toISOString(),
  },
];

const OutflowCard = () => {
  const cdaMultiTimeSeries = useCdaMultiTimeSeries({
    cdaParams: TSID_LIST,
  });
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
                  <Badge color="red">TimeSeries: {TSID_LIST.at(idx)}</Badge>
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
  Card,
  H3, 
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
  } from "@usace/groundwork";
import { useCdaTimeSeries } from "@usace-watermanagement/groundwork-water";

const office = "SWT";
const TSID_LIST = [
  {
    name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
    office,
    begin: dayjs().subtract(2, "hour").toISOString(),
  },
  {
    name: "KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
    office,
    begin: dayjs().subtract(5, "hour").toISOString(),
  },
];

export default function OutflowCardExample() {
    const cdaMultiTimeSeries = useCdaMultiTimeSeries({
        cdaParams: TSID_LIST,
    });
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
                    <Badge color="red">TimeSeries: {TSID_LIST.at(idx)}</Badge>
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
      <CdaParamsTable
        requestObject="TimeSeries"
        requestType="GET"
        cwmsJsType="GetTimeSeriesRequest"
        arrayOf={true}
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaTSHookParams} />
    </DocsPage>
  );
}

export { UseCdaMultiTimeSeries };
export default UseCdaMultiTimeSeries;
