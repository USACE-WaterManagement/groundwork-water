import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaOfficesParams } from "../../../props-declarations/data-hooks";
import { useCdaOffices } from "@usace-watermanagement/groundwork-water";

function UseCdaOffices() {
  const cdaOffices = useCdaOffices({ cdaParams: { hasData: true } });
  return (
    <DocsPage middleText="CDA Offices Hook">
      <div>
        <Text>
          {`The useCdaOffices hook can be used to retrieve a list of
          offices using cwms-data-api (CDA).`}
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 mb-3">
        <Table striped dense overflow stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Reports To</TableHeader>
              <TableHeader>Long Name</TableHeader>
              <TableHeader>Type</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {cdaOffices.data &&
              cdaOffices.data.map((office) => (
                <TableRow key={JSON.stringify(office)}>
                  <TableCell>{office.name}</TableCell>
                  <TableCell>{office.reportsTo}</TableCell>
                  <TableCell>{office.longName}</TableCell>
                  <TableCell>{office.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <CodeBlock language="jsx">
        {`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@usace/groundwork";
import { cdaOfficesParams } from "../../../props-declarations/data-hooks";
export default function Example() {
  // Only show offices that have current data in CDA
  const cdaOffices = useCdaOffices({ cdaParams: { hasData: true } });
  return (
    <Table striped dense overflow stickyHeader>
        <TableHead>
            <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Reports To</TableHeader>
            <TableHeader>Long Name</TableHeader>
            <TableHeader>Type</TableHeader>
            </TableRow>
        </TableHead>
        <TableBody>
            {cdaOffices.data &&
                cdaOffices.data.map((office) => (
                <TableRow key={office.id}>
                    <TableCell>{office.name}</TableCell>
                    <TableCell>{office.reportsTo}</TableCell>
                    <TableCell>{office.longName}</TableCell>
                    <TableCell>{office.type}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>)
}
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
      <ParamsTable paramsList={cdaOfficesParams} />
    </DocsPage>
  );
}

export { UseCdaOffices };
export default UseCdaOffices;
