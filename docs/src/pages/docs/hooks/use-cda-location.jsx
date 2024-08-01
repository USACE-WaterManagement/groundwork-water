import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaLocation } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const cdaParams = [
  {
    name: "locationId",
    type: "string",
    required: true,
    desc: "Specifies the CWMS Location ID for the requested location.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Specifies the owning office of the location level(s) whose data is to be included in the response. If this field is not specified, matching location information from all offices shall be returned.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
];

const LocationCard = () => {
  const { data, isPending, isError } = useCdaLocation({
    cdaParams: { locationId: "Buckhorn", office: "LRL" },
  });

  if (isPending) return <span>Loading location data...</span>;
  if (isError) return <span>Location error!</span>;

  return (
    <Card className="w-96">
      <H3>Buckhorn Location Data</H3>
      <ul>
        {Object.entries(data) // Convert the response object to an array
          .slice(0, 4) // Get the first four key-value pairs
          .map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
      </ul>
    </Card>
  );
};

function UseCdaLocation() {
  return (
    <DocsPage middleText="CDA Location Hook">
      <div>
        <Text>
          The useCdaLocation hook can be used to retrieve location data using
          cwms-data-api (CDA). It requires only a location ID and an office ID,
          but can be further customized using additional parameters provided
          through CDA if desired.
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <LocationCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useCdaLocation } from "@usace-watermanagement/groundwork-water";

const LocationCard = () => {
  const { data, isPending, isError } = useCdaLocation({
    cdaParams: { locationId: "Buckhorn", office: "LRL" },
  });

  if (isPending) return <span>Loading location data...</span>;
  if (isError) return <span>Location error!</span>;

  return (
    <Card className="w-fit">
      <H3>Buckhorn Location Data</H3>
      <ul>
        {Object.entries(data) // Convert the response object to an array
          .slice(0, 4) // Get the first four key-value pairs
          .map(([key, value]) => (
            <li key={key}>
              {key}: {value}
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
        Hook Parameters - <Code className="p-2">{`useCdaLocation({...})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="Location"
        requestType="GET"
        cwmsJsType="GetCwmsDataLocationsWithLocationIdRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaParams} />
    </DocsPage>
  );
}

export { UseCdaLocation };
export default UseCdaLocation;
