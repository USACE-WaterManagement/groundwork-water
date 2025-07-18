import { H3, Text, Card, Badge } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaMultiTimeSeries } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaTSHookParams } from "../../../props-declarations/data-hooks";

const OutflowCard = () => {
  const { data, isPending, isError } = useCdaMultiTimeSeries({
    cdaParams: {
      name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev,KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
      office: "SWT",
    },
  });

  if (isPending) return <span>Loading timeseries data...</span>;
  if (isError) return <span>TimeSeries error!</span>;
  return (
    <Card className="gw-w-96">
      <H3>Buckhorn Outflow Data</H3>
      {data.map((ts) => {
        return (
          <Card key={ts.name} className="gw-my-2">
            <div className="gw-flex gw-flex-col  gw-gap-2 gw-w-1/2">
              <Badge color="blue">TimeSeries: {ts.name}</Badge>
              <Badge color="yellow">Begin: {ts.begin.toISOString()}</Badge>
              <Badge color="yellow">End: {ts.end.toISOString()}</Badge>
            </div>
            <ul>
              <li>Time - Value</li>

              {ts.values
                .filter((entry) => !!entry[1]) // Remove empty records
                .slice(-5) // Trim to the last 5 values
                .map((entry) => {
                  const time = new Date(entry[0]).toLocaleTimeString();
                  const value = entry[1].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <li key={entry[0]}>
                      {time} - {value}
                    </li>
                  );
                })}
            </ul>
          </Card>
        );
      })}
    </Card>
  );
};

function UseCdaMultiTimeSeries() {
  return (
    <DocsPage middleText="CDA MultiTimeSeries Hook">
      <div>
        <Text>
          {`The useCdaMultiTimeSeries hook can be used to retrieve timeseries data
            using cwms-data-api (CDA). It requires only a timeseries ID and an
            office ID, but can be further customized using additional parameters
            provided through CDA if desired.`}
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <OutflowCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useCdaTimeSeries } from "@usace-watermanagement/groundwork-water";

const { data, isPending, isError } = useCdaMultiTimeSeries({
    cdaParams: {
      name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev,KEYS.Stor.Inst.1Hour.0.Ccp-Rev",
      office: "SWT",
    },
  });

  if (isPending) return <span>Loading timeseries data...</span>;
  if (isError) return <span>TimeSeries error!</span>;
  return (
    <Card className="gw-w-96">
      <H3>Buckhorn Outflow Data</H3>
      {data.map((ts) => {
        return (
          <Card key={ts.name} className="gw-my-2">
            <div className="gw-flex gw-flex-col  gw-gap-2 gw-w-1/2">
              <Badge color="blue">TimeSeries: {ts.name}</Badge>
              <Badge color="yellow">Begin: {ts.begin.toISOString()}</Badge>
              <Badge color="yellow">End: {ts.end.toISOString()}</Badge>
            </div>
            <ul>
              <li>Time - Value</li>

              {ts.values
                .filter((entry) => !!entry[1]) // Remove empty records
                .slice(-5) // Trim to the last 5 values
                .map((entry) => {
                  const time = new Date(entry[0]).toLocaleTimeString();
                  const value = entry[1].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <li key={entry[0]}>
                      {time} - {value}
                    </li>
                  );
                })}
            </ul>
          </Card>
        );
      })}
    </Card>
  );
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters -{" "}
        <Code className="p-2">{`useCdaTimeSeries({...})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="TimeSeries"
        requestType="GET"
        cwmsJsType="GetTimeSeriesRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaTSHookParams} />
    </DocsPage>
  );
}

export { UseCdaMultiTimeSeries };
export default UseCdaMultiTimeSeries;
