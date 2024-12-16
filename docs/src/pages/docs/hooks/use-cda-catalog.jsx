import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaCatalog } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaCatalogParams } from "../../../props-declarations/data-hooks";

const CatalogCard = () => {
  const { data, isPending, isError } = useCdaCatalog({
    cdaParams: {
      dataset: "TIMESERIES",
      office: "LRL",
      like: "Buckhorn.Flow-Inflow",
    },
  });

  if (isPending) return <span>Loading catalog data...</span>;
  if (isError) return <span>Catalog error!</span>;

  return (
    <Card className="w-fit">
      <H3>Buckhorn Inflow Records</H3>
      <ul>
        <li>TimeSeries ID: Latest Timestamp</li>
        {data.entries.map((entry) => (
          <li key={entry.name}>
            {entry.name}:{" "}
            {entry.extents?.[0]?.latestTime
              ? entry.extents[0].latestTime.toISOString()
              : "No data"}
          </li>
        ))}
      </ul>
    </Card>
  );
};

function UseCdaCatalog() {
  return (
    <DocsPage middleText="CDA Catalog Hook">
      <div>
        <Text>
          {`The useCdaCatalogTS hook can be used to retrieve a Catalog of
          data using cwms-data-api (CDA). It requires a dataset type 
          (timeseries, locations, etc.), an office ID, and a query 
          parameter such as "like", "timeseries-category-like", or
          "timeseries-group-like".`}
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <CatalogCard />
      </div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";
import { useCdaCatalog } from "@usace-watermanagement/groundwork-water";

const CatalogCard = () => {
  const { data, isPending, isError } = useCdaCatalogTS({
    cdaParams: { office: "LRL", like: "Buckhorn.Flow-Inflow" },
  });

  if (isPending) return <span>Loading catalog data...</span>;
  if (isError) return <span>Catalog error!</span>;

  return (
    <Card className="w-fit">
      <H3>Buckhorn Inflow Records</H3>
      <ul>
        <li>TimeSeries ID: Latest Timestamp</li>
        {data.entries.map((entry) => (
          <li key={entry.name}>
            {entry.name}: {entry.extents?.[0]?.latestTime.toISOString()}
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
        Hook Parameters - <Code className="p-2">{`useCdaCatalog({...})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="Catalog"
        requestType="GET"
        cwmsJsType="GetCatalogWithDatasetRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaCatalogParams} />
    </DocsPage>
  );
}

export { UseCdaCatalog };
export default UseCdaCatalog;
