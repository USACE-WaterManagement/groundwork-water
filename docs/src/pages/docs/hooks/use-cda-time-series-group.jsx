import { H3, Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaTimeSeriesGroup } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const cdaParams = [
  {
    name: "groupId",
    type: "string",
    required: true,
    desc: "Specifies the timeseries group whose data is to be included in the response.",
  },
  {
    name: "office",
    type: "string",
    required: true,
    desc: "Specifies the owning office of the timeseries group whose data is to be included in the response.",
  },
  {
    name: "categoryId",
    type: "string",
    required: true,
    desc: "Specifies the category containing the timeseries group whose data is to be included in the response.",
  },
];

const TimeSeriesGroupList = () => {
  const { data, isPending, isError } = useCdaTimeSeriesGroup({
    cdaParams: {
      groupId: "USGS TS Data Acquisition",
      office: "CWMS",
      categoryId: "Data Acquisition",
    },
  });

  if (isPending) return <span>Loading time series group data...</span>;
  if (isError) return <span>Time series group error!</span>;

  return (
    <div>
      <H3>USGS Data Acquisition</H3>
      <ul>
        {data.assignedTimeSeries
          .slice(0, 5) // Get the first two key-value pairs
          .map((ts) => (
            <li key={ts.tsCode}>
              <strong>{ts.officeId}</strong> - {ts.timeseriesId}
            </li>
          ))}
      </ul>
    </div>
  );
};

function UseCdaTimeSeriesGroup() {
  return (
    <DocsPage middleText="CDA Time Series Group Hook">
      <div>
        <Text>
          The useCdaTimeSeriesGroup hook can be used to retrieve metadata and
          associated time series for a given time series group using
          cwms-data-api (CDA). It requires the passing of a groupId, office, and
          categoryId.
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <TimeSeriesGroupList />
      </div>
      <CodeBlock language="jsx">
        {`import { H3 } from "@usace/groundwork";
import { useCdaTimeSeriesGroup } from "@usace-watermanagement/groundwork-water";

const TimeSeriesGroupList = () => {
  const { data, isPending, isError } = useCdaTimeSeriesGroup({
    cdaParams: {
      groupId: "USGS TS Data Acquisition",
      office: "CWMS",
      categoryId: "Data Acquisition",
    },
  });

  if (isPending) return <span>Loading time series group data...</span>;
  if (isError) return <span>Time series group error!</span>;

  return (
    <div>
      <H3>USGS Data Acquisition</H3>
      <ul>
        {data.assignedTimeSeries
          .slice(0, 5) // Get the first five entries
          .map((ts) => (
            <li key={ts.tsCode}>
              <strong>{ts.officeId}</strong> - {ts.timeseriesId}
            </li>
          ))}
      </ul>
    </div>
  );
};
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters -{" "}
        <Code className="p-2">{`useCdaTimeSeriesGroup({...})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="TimeSeries Group"
        requestType="GET"
        cwmsJsType="GetTimeSeriesGroupWithGroupIdRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaParams} />
    </DocsPage>
  );
}

export { UseCdaTimeSeriesGroup };
export default UseCdaTimeSeriesGroup;
