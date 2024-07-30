import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaLatestValue } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import { cdaUrlParam } from "../../components/shared-docs";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const hookParams = [
  {
    name: "tsId",
    type: "string",
    required: true,
    desc: "Specifies the time series ID for the requested value.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Specifies the owning office of the time series whose data is to be included in the response.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  cdaUrlParam,
];

const returnParams = [
  {
    name: "datetime",
    type: "number",
    desc: "Timestamp in milliseconds since the UNIX epoch.",
  },
  {
    name: "value",
    type: "number",
    desc: "Time series value at the indicated time.",
  },
  {
    name: "qualityCode",
    type: "number",
    desc: "Numerical quality code of the time series entry.  See CWMS documentation for more information.",
  },
  {
    name: "units",
    type: "string",
    desc: "The units of the retrieved value.",
  },
];

const LatestDataCard = () => {
  const { data, isPending, isError } = useCdaLatestValue({
    tsId: "Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp",
    office: "LRL",
    unit: "cfs",
  });

  if (isPending) return <span>Loading latest value...</span>;
  if (isError) return <span>API error!</span>;

  return (
    <Card className="w-96">
      <H3>Buckhorn Outflow</H3>
      {data ? (
        <ul>
          <li>
            Datetime: <strong>{new Date(data.datetime).toISOString()}</strong>
          </li>
          <li>
            Value: <strong>{data.value.toFixed(2)}</strong> {data.units}
          </li>
          <li>
            Quality Code: <strong>{data.qualityCode}</strong>
          </li>{" "}
        </ul>
      ) : (
        <span>No data found.</span>
      )}
    </Card>
  );
};

function UseCdaLatestValue() {
  return (
    <DocsPage middleText="CDA Latest Value Hook">
      <div>
        <Text>
          The useCdaLatestValue hook returns the latest value entry from a CDA
          time series. It includes the timestamp, value, quality code, and
          units.
        </Text>
        <Text className="mt-2">
          The hook is an abstraction of the CDA TimeSeries GET and Catalog GET
          endpoints. It first makes a TimeSeries GET request with the default
          time window (now - 24 hours ago) and returns the latest value. If no
          values are found, it makes a Catalog GET request and retrieves the
          timestamp of the latest value. It then repeats the TimeSeries GET
          request with the retrieved timestamp.
        </Text>
        <Text className="mt-2">
          The isPending and isFetching return booleans represent the full
          lifecycle of the abstracted hook (time series AND catalog, if needed).
          All other return parameters represent those returned from the time
          series request.
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <LatestDataCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useCdaLatestValue } from "@usace-watermanagement/groundwork-water";

const LatestDataCard = () => {
  const { data, isPending, isError } = useCdaLatestValue({
    tsId: "Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp",
    office: "LRL",
    unit: "cfs",
  });

  if (isPending) return <span>Loading latest value...</span>;
  if (isError) return <span>API error!</span>;

  return (
    <Card className="w-96">
      <H3>Buckhorn Outflow</H3>
      {data ? (
        <ul>
          <li>
            Datetime: <strong>{new Date(data.datetime).toISOString()}</strong>
          </li>
          <li>
            Value: <strong>{data.value.toFixed(2)}</strong> {data.units}
          </li>
          <li>
            Quality Code: <strong>{data.qualityCode}</strong>
          </li>{" "}
        </ul>
      ) : (
        <span>No data found.</span>
      )}
    </Card>
  );
};
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters -{" "}
        <Code className="p-2">{`useCdaLatestValue({...})`}</Code>
      </div>
      <ParamsTable paramsList={hookParams} />
      <div className="font-bold text-lg pt-6">Return Data Parameters - </div>
      <ParamsTable paramsList={returnParams} showReq={false} />
    </DocsPage>
  );
}

export { UseCdaLatestValue };
export default UseCdaLatestValue;
