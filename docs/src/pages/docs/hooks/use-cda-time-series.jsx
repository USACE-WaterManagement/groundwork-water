import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaTimeSeries } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaTSHookParams } from "../../../props-declarations/data-hooks";

const OutflowCard = () => {
  const { data, isPending, isError } = useCdaTimeSeries({
    cdaParams: {
      name: "Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp",
      office: "LRL",
    },
  });

  if (isPending) return <span>Loading timeseries data...</span>;
  if (isError) return <span>TimeSeries error!</span>;

  return (
    <Card className="gw-w-96">
      <H3>Buckhorn Outflow Data</H3>
      <ul>
        <li>Time - Value</li>
        {data.values
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
};

function UseCdaTimeSeries() {
  return (
    <DocsPage middleText="CDA TimeSeries Hook">
      <div>
        <Text>
          {`The useCdaTimeSeries hook can be used to retrieve timeseries data
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

const OutflowCard = () => {
  const { data, isPending, isError } = useCdaTimeSeries({
    cdaParams: {
      name: "Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp",
      office: "LRL",
    },
  });

  if (isPending) return <span>Loading timeseries data...</span>;
  if (isError) return <span>TimeSeries error!</span>;

  return (
    <Card className="w-96">
      <H3>Buckhorn Outflow Data</H3>
      <ul>
        <li>Time - Value</li>
        {data.values
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
};
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

export { UseCdaTimeSeries };
export default UseCdaTimeSeries;
