import {
  H3,
  Text,
  Card,
  Input,
  Label,
  Fieldset,
  Badge,
  Code,
  Textarea,
  Accordion,
  Skeleton,
} from "@usace/groundwork";
import { useCdaBlob, useDebounce } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { Code as CodeBlock } from "../../components/code";
import CdaParamsTable from "../../components/cda-params-table";
import ParamsTable from "../../components/params-table";
import { cdaBlobsParams } from "../../../props-declarations/data-hooks";

const BlobViewerCard = () => {
  const [blobId, setBlobId] = useState("KEYSMAR24.TXT");
  const [office, setOffice] = useState("SWT");

  const debouncedBlobId = useDebounce(blobId, 500);
  const debouncedOffice = useDebounce(office, 500);

  const cdaBlob = useCdaBlob({
    cdaParams: { blobId: debouncedBlobId, office: debouncedOffice },
    queryOptions: {
      enabled: !!debouncedBlobId && !!debouncedOffice,
      retry: false,
    },
  });

  return (
    <Card className="w-full">
      <H3>View a blob by ID</H3>
      <Fieldset>
        <div className="grid grid-cols-[300px_1fr] gap-y-4 items-center">
          <Label htmlFor="blob-id" className="text-right me-2">
            Blob ID:
          </Label>
          <Input
            id="blob-id"
            className="w-1/2"
            value={blobId}
            onChange={(e) => setBlobId(e.target.value)}
            placeholder="Enter blob ID (e.g. myfile.pdf)"
          />

          <Label htmlFor="office" className="text-right me-2">
            Office:
          </Label>
          <Input
            id="office"
            className="w-1/2"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            placeholder="e.g. SWT"
          />
        </div>
      </Fieldset>
      {cdaBlob.isPending ? (
        <Skeleton type="card" className="w-full h-[50vh]" />
      ) : cdaBlob.isError ? (
        <Badge color="red">Error retrieving blob: {cdaBlob.error?.message}</Badge>
      ) : cdaBlob.data ? (
        <div className="mt-4">
          <Accordion defaultOpen={true} heading={<H3>View: {blobId}</H3>}>
            <Textarea
              className="h-[50vh] font-mono"
              defaultValue={
                typeof cdaBlob.data == "object"
                  ? JSON.stringify(cdaBlob.data, null, 2)
                  : cdaBlob.data
              }
            />
          </Accordion>
        </div>
      ) : (
        <Badge color="yellow">No blob loaded yet</Badge>
      )}
    </Card>
  );
};

function useCdaBlobPage() {
  return (
    <DocsPage middleText="CDA Blob Hook">
      <Text>
        The <Code>useCdaBlob</Code> hook retrieves a single blob from the CWMS Data API
        using the <Code>/blobs/{`{blob-id}`}</Code> endpoint. This allows you to fetch
        binary blobs (PDF, XML, text, etc.) by ID and optionally filter by office.
      </Text>
      useCdaBlobPage
      <QueryClientWarning />
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <BlobViewerCard />
      </div>
      <CodeBlock language="jsx">
        {`import {
      H3,
  Card,
  Input,
  Label,
  Fieldset,
  Badge,
  Textarea,
  Accordion,
  Skeleton,
  } from "@usace/groundwork";
  import { useCdaBlob, useDebounce } from "@usace-watermanagement/groundwork-water";
  import { useState } from "react";
  
  const BlobViewerCard = () => {
    const [blobId, setBlobId] = useState("KEYSMAR24.TXT");
    const [office, setOffice] = useState("SWT");

    const debouncedBlobId = useDebounce(blobId, 500);
    const debouncedOffice = useDebounce(office, 500);

    const cdaBlob = useCdaBlob({
        cdaParams: { blobId: debouncedBlobId, office: debouncedOffice },
        queryOptions: {
        enabled: !!debouncedBlobId && !!debouncedOffice,
        retry: false,
        },
    });

    return (
        <Card className="w-full">
        <H3>View a blob by ID</H3>
        <Fieldset>
            <div className="grid grid-cols-[300px_1fr] gap-y-4 items-center">
            <Label htmlFor="blob-id" className="text-right me-2">
                Blob ID:
            </Label>
            <Input
                id="blob-id"
                className="w-1/2"
                value={blobId}
                onChange={(e) => setBlobId(e.target.value)}
                placeholder="Enter blob ID (e.g. myfile.pdf)"
            />

            <Label htmlFor="office" className="text-right me-2">
                Office:
            </Label>
            <Input
                id="office"
                className="w-1/2"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                placeholder="e.g. SWT"
            />
            </div>
        </Fieldset>
        {cdaBlob.isPending ? (
            <Skeleton type="card" className="w-full h-[50vh]" />
        ) : cdaBlob.isError ? (
            <Badge color="red">Error retrieving blob: {cdaBlob.error?.message}</Badge>
        ) : cdaBlob.data ? (
            <div className="mt-4">
            <Accordion defaultOpen={true} heading={<H3>View: {blobId}</H3>}>
                <Textarea
                className="h-[50vh] font-mono"
                defaultValue={
                    typeof cdaBlob.data == "object"
                    ? JSON.stringify(cdaBlob.data, null, 2)
                    : cdaBlob.data
                }
                />
            </Accordion>
            </div>
        ) : (
            <Badge color="yellow">No blob loaded yet</Badge>
        )}
        </Card>
    );
  };`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters - <Code className="p-2">{`useCdaBlob({...})`}</Code>
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

export { useCdaBlobPage };
export default useCdaBlobPage;
