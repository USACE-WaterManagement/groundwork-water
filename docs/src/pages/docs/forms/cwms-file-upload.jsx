import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { CWMSFileUpload, CWMSForm } from "@usace-watermanagement/groundwork-water";

const componentProps = [
  {
    name: "blobId",
    type: "string",
    default: "required for CWMS submission",
    desc: "CWMS blob identifier written through cwmsjs BlobApi.postBlobs.",
  },
  {
    name: "officeId",
    type: "string",
    default: "CWMSForm office",
    desc: "Optional office override for the blob write. When omitted, the form office is used.",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    desc: "Optional blob description stored alongside the file contents.",
  },
  {
    name: "mediaTypeId",
    type: "string",
    default: "selected file.type",
    desc: "Optional media type override for the blob payload.",
  },
  {
    name: "failIfExists",
    type: "boolean",
    default: "false",
    desc: "Reject the write when a blob with the same id already exists.",
  },
  {
    name: "accept",
    type: "string",
    default: "undefined",
    desc: "Native file picker accept filter, such as '.json,.txt' or 'image/*'.",
  },
  {
    name: "maxFileSizeBytes",
    type: "number",
    default: "undefined",
    desc: "Client-side maximum file size in bytes. Zero-byte files are always rejected.",
  },
  {
    name: "readAs",
    type: "string",
    default: "base64",
    desc: "Use 'base64' for binary-safe uploads or 'text' to store the raw text content.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Whether a file must be selected before the form can submit.",
  },
  {
    name: "label",
    type: "string",
    default: "name or blobId",
    desc: "Visible label and validation label for the field.",
  },
  {
    name: "helperText",
    type: "string",
    default: "undefined",
    desc: "Optional helper text below the drop zone.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    desc: "Additional classes applied to the drop zone.",
  },
  {
    name: "dropzoneClassName",
    type: "string",
    default: "''",
    desc: "Additional drop zone styling classes.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Called with the selected File object or null when cleared.",
  },
];

function CWMSFileUploadDocs() {
  return (
    <DocsPage middleText="CWMS File Upload">
      <div>
        <Text>
          <Code>CWMSFileUpload</Code> adds drag-and-drop blob uploads to the CWMS forms
          feature set. It registers with <Code>CWMSForm</Code>, validates the selected
          file locally, and uploads through <Code>cwmsjs</Code>{" "}
          <Code>BlobApi.postBlobs</Code>.
        </Text>
        <Text className="mt-2">
          The default <Code>readAs="base64"</Code> mode works for arbitrary binary
          files. Switch to <Code>readAs="text"</Code> for plain-text content such as
          JSON, CSV, or TXT files.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <CWMSForm office="SWT" onSubmit={(data) => console.log("Upload payload", data)}>
        <CWMSFileUpload
          name="inspection-file"
          blobId="GROUNDWORK.TEST.UPLOAD"
          label="Inspection file"
          helperText="Drag a file here or browse for one. Empty files are rejected."
          maxFileSizeBytes={250000}
          accept=".txt,.json,.csv"
          failIfExists={true}
          required={true}
        />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`import { CWMSFileUpload, CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
>
  <CWMSFileUpload
    blobId="GROUNDWORK.TEST.UPLOAD"
    label="Inspection file"
    helperText="Drag a file here or browse for one."
    accept=".txt,.json,.csv"
    maxFileSizeBytes={250000}
    failIfExists={true}
    required={true}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Text Uploads" className="mt-8" />
      <Text className="mb-4">
        Use <Code>readAs="text"</Code> when the blob should store the raw text body
        instead of a base64-encoded string.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSFileUpload
    blobId="GROUNDWORK.CONFIG.JSON"
    label="Configuration JSON"
    accept=".json"
    mediaTypeId="application/json"
    readAs="text"
    maxFileSizeBytes={100000}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Dogfood Example" className="mt-8" />
      <Text className="mb-4">
        The upload input participates in the same form wrapper and submit flow as the
        rest of the CWMS form controls.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
  showCalendar={true}
  submitText="Store inspection package"
>
  <CWMSFileUpload
    blobId="SWT.INSPECTION.PACKAGE"
    label="Inspection package"
    helperText="Uploads through cwmsjs BlobApi.postBlobs."
    maxFileSizeBytes={5000000}
    accept=".zip,.pdf,.txt"
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSFileUpload />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSFileUploadDocs };
export default CWMSFileUploadDocs;
