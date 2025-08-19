import {
  H3,
  Text,
  Card,
  Code,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Skeleton,
  Label,
  Fieldset,
  Badge,
  Dropdown,
} from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { useCdaBlobCatalog } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { cdaBlobsParams } from "../../../props-declarations/data-hooks";
import { useEffect, useRef, useState } from "react";

const FileCatalogCard = () => {
  const [like, setLike] = useState("*.json");
  const [debouncedLike, setDebouncedLike] = useState(like);
  const [office, setOffice] = useState("SWT");
  const debounceTimeout = useRef();

  // Avoid querying CDA as the user finishes typing with a 400ms delay
  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedLike(like);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [like]);

  // Cherry-pick a few offices we know have blob data
  const offices = ["SWT", "SAM", "MVP", "MVS", "NAE"];

  const { data, isPending, isError } = useCdaBlobCatalog({
    cdaParams: {
      office,
      like: debouncedLike,
    },
  });

  return (
    <Card className="w-fit">
      <H3>File Catalog</H3>
      <Fieldset>
        <Label htmlFor="like-input" className="font-bold">
          Filter by File Name (like):
        </Label>
        <Input
          id="like-input"
          value={like}
          onChange={(e) => setLike(e.target.value)}
          className="w-1/4 ml-4 inline-block mb-2"
          placeholder="e.g. *.json or *.txt"
        />{" "}
        <Dropdown
          label="Office: "
          labelClassName="inline-block mx-2"
          className="inline-block w-1/4 mb-2"
          options={offices.map((option) => (
            <option key={option} value={option} className="pl-2">
              {option}
            </option>
          ))}
          onChange={(e) => setOffice(e.target.value)}
        />
      </Fieldset>

      <Table
        dense
        overflow
        stickyHeader
        striped
        bleed
        overflowHeight="max-h-[35vh]"
        className="min-w-[60vw]"
      >
        <TableHead>
          <TableRow>
            <TableCell>File (blob) ID</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending ? (
            // Show a few rows while loading for interest
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                <span>Error loading blob data!</span>
              </TableCell>
            </TableRow>
          ) : data?.blobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                <Badge color="red">
                  No files found matching <Code>&quot;{debouncedLike}&quot;</Code>
                </Badge>
              </TableCell>
            </TableRow>
          ) : (
            data?.blobs?.map((blob) => (
              <TableRow key={blob.id}>
                <TableCell>
                  <strong>{blob.id}</strong>
                </TableCell>
                <TableCell>{blob.description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

function useCdaBlobCatalogPage() {
  return (
    <DocsPage middleText="CDA File Catalog Hook">
      <div>
        <Text>
          {`The useCdaBlobCatalog hook retrieves blob metadata using the
          cwms-data-api. It accepts standard CDA query parameters such as 
          office, like, page, and page-size.`}
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <FileCatalogCard />
      </div>
      <CodeBlock language="jsx">
        {`import {
  H3,
  Text,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Skeleton,
  Label,
  Fieldset,
  Badge,
  Dropdown,
} from "@usace/groundwork";
import { useEffect, useRef, useState } from "react";
import { useCdaBlobCatalog } from "@usace-watermanagement/groundwork-water";

const FileCatalogCard = () => {
  const [like, setLike] = useState("*.json");
  const [debouncedLike, setDebouncedLike] = useState(like);
  const [office, setOffice] = useState("SWT");
  const debounceTimeout = useRef();

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedLike(like);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [like]);

  const offices = ["SWT", "MVP", "MVS", "NAE"];

  const { data, isPending, isError } = useCdaBlobCatalog({
    cdaParams: {
      office,
      like: debouncedLike,
    },
  });

  return (
    <Card className="w-fit">
      <H3>File Catalog</H3>
      <Fieldset>
        <Label htmlFor="like-input" className="font-bold">
          Filter by File Name (like):
        </Label>
        <Input
          id="like-input"
          value={like}
          onChange={(e) => setLike(e.target.value)}
          className="w-1/4 ml-4 inline-block mb-2"
          placeholder="e.g. *.json or *.txt"
        />
        <Dropdown
          label="Office: "
          labelClassName="inline-block mx-2"
          className="inline-block w-1/4 mb-2"
          options={offices.map((option) => (
            <option key={option} value={option} className="pl-2">
              {option}
            </option>
          ))}
          onChange={(e) => setOffice(e.target.value)}
        />
      </Fieldset>

      <Table
        dense
        overflow
        stickyHeader
        striped
        bleed
        overflowHeight="max-h-[35vh]"
        className="min-w-[60vw]"
      >
        <TableHead>
          <TableRow>
            <TableCell>File (blob) ID</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                <span>Error loading blob data!</span>
              </TableCell>
            </TableRow>
          ) : data?.blobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                <Badge color="red">
                  No files found matching <Code>"{debouncedLike}"</Code>
                </Badge>
              </TableCell>
            </TableRow>
          ) : (
            data?.blobs?.map((blob) => (
              <TableRow key={blob.id}>
                <TableCell>
                  <strong>{blob.id}</strong>
                </TableCell>
                <TableCell>{blob.description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useCdaBlobCatalog({...})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="Blob"
        requestType="GET"
        cwmsJsType="GetBlobsWithBlobIdRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaBlobsParams} />
    </DocsPage>
  );
}

export { useCdaBlobCatalogPage };
export default useCdaBlobCatalogPage;
