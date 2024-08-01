import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useNwpsGaugeData } from "@usace-watermanagement/groundwork-water";
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
  {
    name: "product",
    type: "string",
    required: false,
    desc: "Specify the product to be returned. Note that using this option will change the structure of the response object. Options: 'observed', 'forecast'",
  },
  queryOptionsParam,
];

const NwpsForecastCard = () => {
  const { data, isPending, isError } = useNwpsGaugeData({
    sid: "HLDK2",
    product: "forecast",
  });

  if (isPending) return <span>Loading NWPS gauge data...</span>;
  if (isError) return <span>NWPS error!</span>;

  return (
    <Card>
      <H3>Heidelberg Forecasted Stages</H3>
      <ul>
        {data.data.slice(0, 5).map((datum) => (
          <li key={datum.validTime}>
            <strong>
              {datum.primary} {data.primaryUnits}
            </strong>{" "}
            @ {datum.validTime}
          </li>
        ))}
      </ul>
    </Card>
  );
};

function UseNwpsGaugeData() {
  return (
    <DocsPage middleText="NWPS Gauge Data Hook">
      <div>
        <Text>
          {`The useNwpsGaugeData hook can be used to retrieve observed and
            forecasted stage and flow data from the National Weather Service
            using the National Weather Prediction Service (NWPS) API. It
            requires only the NWS site identifier for the requested location.
            Forecasted data and flow data are dependent on the existence of a
            forecast model and a rating curve for the requested location,
            respectively.`}
        </Text>
        <NwpsApiLink />
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <NwpsForecastCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useNwpsGaugeData } from "@usace-watermanagement/groundwork-water";

const NwpsForecastCard = () => {
  const { data, isPending, isError } = useNwpsGaugeData({
    sid: "HLDK2",
    product: "forecast",
  });

  if (isPending) return <span>Loading NWPS gauge data...</span>;
  if (isError) return <span>NWPS error!</span>;

  return (
    <Card>
      <H3>Heidelberg Forecasted Stages</H3>
      <ul>
        {data.data.slice(0, 5).map((datum) => (
          <li key={datum.validTime}>
            <strong>
              {datum.primary} {data.primaryUnits}
            </strong>{" "}
            @ {datum.validTime}
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
        Hook Parameters -{" "}
        <Code className="p-2">{`useNwpsGaugeData({...})`}</Code>
      </div>
      <ParamsTable paramsList={hookParams} />
    </DocsPage>
  );
}

export { UseNwpsGaugeData };
export default UseNwpsGaugeData;
