import { H3, Text, Card, Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import Divider from "../../components/divider";
import { Code as CodeBlock } from "../../components/code";
import { queryOptionsParam } from "../../components/shared-docs";
import { useMidasProjectTS } from "../../../../../lib/components/data/hooks/useMidasTS";

const hookParams = [
  {
    name: "project",
    type: "string",
    required: true,
    desc: "The MIDAS project ID (UUID) to retrieve timeseries data for.",
  },
  {
    name: "instrument",
    type: "string",
    required: true,
    desc: "The MIDAS instrument ID (UUID) associated with the project.",
  },
  queryOptionsParam,
];

const MidasTimeseriesCard = () => {
  const { data, isPending, isError } = useMidasProjectTS({
    project: "6de30cf7-e205-42dd-a23c-5ad8f9186725",
    instrument: "6e306cf2-c7a5-4251-8a01-690f60a482c6",
    queryOptions: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });

  if (isPending) return <span>Loading MIDAS timeseries data...</span>;
  if (isError) return <span>Error loading MIDAS data.</span>;

  return (
    <Card>
      <H3>P-5 Instrument Time Series</H3>
      <ul>
        {data?.slice(0, 5).map((ts) => (
          <li key={ts.id}>
            <strong>{ts.name}</strong> – {ts.parameter} ({ts.unit})
          </li>
        ))}
      </ul>
    </Card>
  );
};

function UseMidasProjectTS() {
  return (
    <DocsPage middleText="MIDAS Project Time Series Hook">
      <div>
        <Text>
          <div>
            <Text>
              <strong>MIDAS</strong> (Monitoring Instrumentation Data Acquisition
              System) is the U.S. Army Corps of Engineers&apos; centralized platform for
              storing and managing field instrumentation data at water resource projects
              such as dams, levees, and reservoirs.
            </Text>
            <Text className="mt-4">
              Each project in MIDAS may have one or more <strong>instruments</strong>{" "}
              (e.g. piezometers, GPS sensors, inclinometers), and each instrument can
              produce one or more <strong>time series</strong> — representing either
              measured or computed values over time.
            </Text>
            <Text className="mt-4">
              The <Code>useMidasProjectTS</Code> hook fetches the metadata for all time
              series associated with a specific instrument at a given project. This
              metadata includes the time series name, type (standard, computed, or
              constant), unit, parameter, and variable identifier — all of which are
              necessary for querying and visualizing data.
            </Text>
            <Text className="mt-4">
              This hook is useful when building UIs that allow users to select from
              available MIDAS time series or when integrating MIDAS data into Groundwork
              applications.
            </Text>
          </div>
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <MidasTimeseriesCard />
      </div>
      <CodeBlock language="tsx">
        {`import { useMidasProjectTS } from "@usace-watermanagement/groundwork-water";

const MyComponent = () => {
  const { data, isPending, isError } = useMidasProjectTS({
    project: "6de30cf7-e205-42dd-a23c-5ad8f9186725",
    instrument: "6e306cf2-c7a5-4251-8a01-690f60a482c6",
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error loading data.</span>;

  return (
    <ul>
      {data?.map((ts) => (
        <li key={ts.id}>{ts.name} ({ts.variable})</li>
      ))}
    </ul>
  );
};`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useMidasProjectTS({...})`}</Code>
      </div>
      <ParamsTable paramsList={hookParams} />
    </DocsPage>
  );
}

export { UseMidasProjectTS };
export default UseMidasProjectTS;
