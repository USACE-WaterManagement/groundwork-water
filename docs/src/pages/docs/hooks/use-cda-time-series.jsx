import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaTimeSeries } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const cdaParams = [
  {
    name: "name",
    type: "string",
    required: true,
    desc: "Specifies the name(s) of the time series whose data is to be included in the response. A case insensitive comparison is used to match names.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Specifies the owning office of the time series whose data is to be included in the response. If this field is not specified, matching time series information from all offices shall be returned.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  {
    name: "begin",
    type: "string",
    required: false,
    desc: "Specifies the start of the time window for data to be included in the response. If this field is not specified, any required time window begins 24 hours prior to the specified or default end time. The format for this field is ISO 8601 extended, with optional offset and timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-0700[PST8PDT]'.",
  },
  {
    name: "end",
    type: "string",
    required: false,
    desc: "Specifies the end of the time window for data to be included in the response. If this field is not specified, any required time window ends at the current time. The format for this field is ISO 8601 extended, with optional timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-0700[PST8PDT]'.",
  },
];

const OutflowCard = () => {
  const { data, isPending, isError } = useCdaTimeSeries({
    cdaParams: {
      name: "Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp",
      office: "LRL",
    },
  });

  if (isPending) return <span>Loading timeseries data...</span>;
  if (isError) return <span>Timeseries error!</span>;

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
  if (isError) return <span>Timeseries error!</span>;

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
        cwmsJsType="GetCwmsDataTimeseriesRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaParams} />
    </DocsPage>
  );
}

export { UseCdaTimeSeries };
export default UseCdaTimeSeries;
