import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useNwpsGauge } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import { queryOptionsParam } from "../../components/shared-docs";
import NwpsApiLink from "../../../components/NwpsApiLink";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const hookParams = [
  {
    name: "sid",
    type: "string",
    required: true,
    desc: "The NWS site identifier for the requested location (typically 5 characters, e.g. CATK2)",
  },
  queryOptionsParam,
];

const NwpsCard = () => {
  const { data, isPending, isError } = useNwpsGauge({ sid: "HLDK2" });

  if (isPending) return <span>Loading NWPS gauge data...</span>;
  if (isError) return <span>NWPS error!</span>;

  return (
    <Card>
      <H3>{data.name}</H3>
      <ul>
        {Object.entries(data.flood.categories).map(([cat, catData]) => (
          <li key={cat}>
            {cat}: <strong>{catData.stage}</strong> {data.flood.stageUnits}
          </li>
        ))}
      </ul>
    </Card>
  );
};

function UseNwpsGauge() {
  return (
    <DocsPage middleText="NWPS Gauge Hook">
      <div>
        <Text>
          {`The useNwpsGauge hook can be used to retrieve gauge metadata from
            the National Weather Service using the National Weather Prediction
            Service (NWPS) API. It requires only the NWS site identifier for the
            requested location and returns data such as the location
            coordinates, flood categories, and current stage.`}
        </Text>
        <NwpsApiLink />
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <NwpsCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useNwpsGauge } from "@usace-watermanagement/groundwork-water";

const NwpsCard = () => {
  const { data, isPending, isError } = useNwpsGauge({sid: "HLDK2"});

  if (isPending) return <span>Loading NWPS gauge data...</span>;
  if (isError) return <span>NWPS error!</span>;

  return (
    <Card>
      <H3>{data.name}</H3>
      <ul>
        {Object.entries(data.flood.categories).map(([cat, catData]) => (
          <li key={cat}>
            {cat}: <strong>{catData.stage}</strong> {data.flood.stageUnits}
          </li>
        ))}
      </ul>
    </Card>
  );
};
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useNwpsGauge({...})`}</Code>
      </div>
      <ParamsTable paramsList={hookParams} />
    </DocsPage>
  );
}

export { UseNwpsGauge };
export default UseNwpsGauge;
