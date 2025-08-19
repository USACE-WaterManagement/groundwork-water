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
} from "@usace/groundwork";
import { useCdaBlob } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { Code as CodeBlock } from "../../components/code";
import CdaParamsTable from "../../components/cda-params-table";
import ParamsTable from "../../components/params-table";
import { cdaBlobByIdParams } from "../../../props-declarations/data-hooks";

const FileViewerCard = () => {
  const [blobId, setBlobId] = useState("ALTUFEB25.TXT");
  const [office, setOffice] = useState("SWT");

  const { data, isPending, isError } = useCdaBlob({
    cdaParams: { blobId, office },
    queryOptions: {
      enabled: !!blobId && !!office,
      retry: false,
    },
  });

  return (
    <Card className="w-fit">
      <H3>View a File by ID</H3>
      <Fieldset>
        <Label htmlFor="blob-id">File ID (Blob ID):</Label>
        <Input
          id="blob-id"
          className="mb-2 w-1/2"
          value={blobId}
          onChange={(e) => setBlobId(e.target.value)}
          placeholder="Enter file ID (e.g. myfile.pdf)"
        />
        <Label htmlFor="office">Office:</Label>
        <Input
          id="office"
          className="mb-4 w-1/4"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          placeholder="e.g. SWT"
        />
      </Fieldset>
      {isPending ? (
        <p>Loading file...</p>
      ) : isError ? (
        <Badge color="red">Error retrieving file</Badge>
      ) : data ? (
        <div className="mt-4">
          <p>File loaded. You can download or view it:</p>
          <Textarea>{data}</Textarea>
        </div>
      ) : (
        <Badge color="yellow">No file loaded yet</Badge>
      )}
    </Card>
  );
};

function useCdaBlobPage() {
  return (
    <DocsPage middleText="CDA File Hook">
      <Text>
        The <Code>useCdaBlob</Code> hook retrieves a single file (blob) from the CWMS
        Data API using the <Code>/blobs/{`{blob-id}`}</Code> endpoint. This allows you
        to fetch binary files (PDF, XML, text, etc.) by ID and optionally filter by
        office.
      </Text>
      useCdaBlobPage
      <QueryClientWarning />
      <Divider text="Example Usage" className="mt-8" />
      <div className="rounded-md border border-dashed px-6 py-3 my-3">
        <FileViewerCard />
      </div>
      <CodeBlock language="jsx">
        {`import {
    Card,
    H3,
    Input,
    Label,
    Fieldset,
    Button,
    Badge,
  } from "@usace/groundwork";
  import { useCdaBlob } from "@usace-watermanagement/groundwork-water";
  import { useState } from "react";
  
  const FileViewerCard = () => {
    const [blobId, setBlobId] = useState("sample.xml");
    const [office, setOffice] = useState("SWT");
  
    const { data, isPending, isError } = useCdaBlob({
      cdaParams: { "blob-id": blobId, office },
      queryOptions: {
        enabled: !!blobId,
      },
    });
  
    const getDownloadUrl = () => {
      if (!data) return null;
      const blob = new Blob([data]);
      return URL.createObjectURL(blob);
    };
  
    return (
      <Card className="w-fit">
        <H3>View a File by ID</H3>
        <Fieldset>
          <Label htmlFor="blob-id">File ID (Blob ID):</Label>
          <Input
            id="blob-id"
            value={blobId}
            onChange={(e) => setBlobId(e.target.value)}
            placeholder="e.g. myfile.pdf"
          />
          <Label htmlFor="office">Office:</Label>
          <Input
            id="office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            placeholder="e.g. SWT"
          />
        </Fieldset>
        {isPending ? (
          <p>Loading file...</p>
        ) : isError ? (
          <Badge color="red">Error retrieving file</Badge>
        ) : data ? (
          <div className="mt-4">
            <a href={getDownloadUrl()} target="_blank" rel="noopener noreferrer" download={blobId}>
              <Button>Download / View File</Button>
            </a>
          </div>
        ) : (
          <Badge color="yellow">No file loaded yet</Badge>
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
      <ParamsTable paramsList={cdaBlobByIdParams} />
    </DocsPage>
  );
}

export { useCdaBlobPage };
export default useCdaBlobPage;
