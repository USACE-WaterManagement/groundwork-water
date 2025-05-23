import { H3, Text, Card } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaCatalogParams } from "../../../props-declarations/data-hooks";

function UseCdaLevels() {
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
      <div className="rounded-md border border-dashed px-6 py-3 my-3"></div>
      <CodeBlock language="jsx">
        {`import { Card, H3 } from "@usace/groundwork";

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

export { UseCdaLevels };
export default UseCdaLevels;
