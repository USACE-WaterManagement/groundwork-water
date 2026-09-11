import { Badge, Code, Text, UsaceBox } from "@usace/groundwork";
import {
  CWMSDataUpload,
  CWMSForm,
  CWMS_DATA_UPLOAD_HEADERS,
} from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import PropsTable from "../../components/props-table";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";

const DEMO_ROWS = [
  CWMS_DATA_UPLOAD_HEADERS,
  [
    "MVS",
    "DEMO.Stage.Inst.1Hour.0.TEST",
    "2026-01-01 00:00",
    "10.25",
    "0",
    "",
    "Observed",
  ],
  ["MVS", "DEMO.Stage.Inst.1Hour.0.TEST", "2026-01-01 01:00", "10.5", "0", "", ""],
  [
    "MVS",
    "DEMO.Stage.Inst.1Hour.0.TEST",
    "2026-01-01 02:00",
    "10.75",
    "3",
    "2026-01-01 02:05",
    "Questionable",
  ],
];

const componentProps = [
  {
    name: "office",
    type: "string",
    default: "workbook OFFICE",
    desc: "Expected CWMS office. When supplied, every workbook row must match it.",
  },
  {
    name: "cdaUrl",
    type: "string",
    default: "CdaUrlProvider or cwmsjs default",
    desc: "CWMS Data API base URL used to compare, submit, and delete values.",
  },
  {
    name: "unit",
    type: "string",
    default: "ft",
    desc: "Unit used to retrieve and submit numeric time-series values.",
  },
  {
    name: "timezone",
    type: "string",
    default: "America/Chicago",
    desc: "IANA timezone used to interpret workbook DATE TIME values.",
  },
  {
    name: "storeRule",
    type: "string",
    default: "REPLACE_ALL",
    desc: "CDA store rule used by CWMSForm for numeric batch submission.",
  },
  {
    name: "defaultFilter",
    type: "all | existing | new",
    default: "all",
    desc: "Initial row filter. The visible rows are also the rows submitted or deleted.",
  },
  {
    name: "maxRows",
    type: "number",
    default: "200000",
    desc: "Maximum number of workbook data rows accepted.",
  },
  {
    name: "maxIntradayYears",
    type: "number",
    default: "10",
    desc: "Maximum span for minute and hourly time-series workbooks.",
  },
  {
    name: "maxPreviewRows",
    type: "number",
    default: "250",
    desc: "Maximum number of selected rows rendered in the preview table.",
  },
  {
    name: "showPlot",
    type: "boolean",
    default: "true",
    desc: "Show a CWMSPlot comparison of workbook and existing values.",
  },
  {
    name: "showDeleteButton",
    type: "boolean",
    default: "true",
    desc: "Show the two-step authenticated deletion control for the selected range.",
  },
  {
    name: "loadExistingData",
    type: "boolean",
    default: "true",
    desc: "Retrieve matching CDA values for classification and comparison.",
  },
  {
    name: "initialData",
    type: "array | parsed model",
    default: "undefined",
    desc: "Preload worksheet rows or a parsed model. Useful for tests and controlled examples.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Called with the parsed workbook model, or null when cleared or invalid.",
  },
];

function CWMSDataUploadDocs() {
  return (
    <DocsPage middleText="CWMS Data Upload">
      <Text>
        <Code>CWMSDataUpload</Code> converts a standard Excel workbook into validated
        numeric and text time-series batches. It uses Groundwork components and
        Groundwork Water's form, authentication, CDA query, plotting, and toast
        infrastructure rather than a standalone page or copied vendor scripts.
      </Text>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge color="blue">React</Badge>
        <Badge color="blue">Groundwork</Badge>
        <Badge color="blue">Tailwind CSS</Badge>
        <Badge color="blue">TanStack Query</Badge>
        <Badge color="blue">cwmsjs</Badge>
      </div>

      <Divider text="Interactive preview" className="mt-8" />
      <Text className="mb-4">
        This documentation example uses controlled in-memory rows. Existing-data reads,
        submission buttons, and deletion are disabled, so it exercises the complete
        presentation and form-registration path without changing CDA.
      </Text>
      <CWMSForm office="MVS" showCalendar={false} showButtons={false}>
        <CWMSDataUpload
          office="MVS"
          initialData={DEMO_ROWS}
          loadExistingData={false}
          showDeleteButton={false}
          maxPreviewRows={10}
        />
      </CWMSForm>

      <Divider text="Workbook contract" className="mt-8" />
      <Text>
        The component reads the first worksheet, preferring a sheet named{" "}
        <Code>Sheet1</Code>. These seven headers must appear in order:
      </Text>
      <ol className="mt-3 list-decimal space-y-1 pl-6">
        {CWMS_DATA_UPLOAD_HEADERS.map((header) => (
          <li key={header}>
            <Code>{header}</Code>
          </li>
        ))}
      </ol>
      <Text className="mt-4">
        All rows must use one office and one TSID. Dates use{" "}
        <Code>YYYY-MM-DD HH:mm</Code> and are interpreted in the configured IANA
        timezone. Each row requires a numeric value, a text value, or both. Duplicate
        local timestamps, malformed values, invalid quality codes, and oversized ranges
        are rejected before submission.
      </Text>

      <Divider text="Production form" className="mt-8" />
      <CodeBlock language="jsx">
        {`import {
  AuthProvider,
  CdaUrlProvider,
  CWMSDataUpload,
  CWMSForm,
} from "@usace-watermanagement/groundwork-water";

const cdaUrl = "https://cwms-data.usace.army.mil/cwms-data";

<AuthProvider method={authMethod}>
  <CdaUrlProvider url={cdaUrl}>
    <CWMSForm
      office="MVS"
      cdaUrl={cdaUrl}
      storeRule="REPLACE_ALL"
      onSuccess={(result) => console.log(result)}
    >
      <CWMSDataUpload
        office="MVS"
        unit="ft"
        timezone="America/Chicago"
        defaultFilter="new"
      />
    </CWMSForm>
  </CdaUrlProvider>
</AuthProvider>`}
      </CodeBlock>

      <UsaceBox title="Submission behavior" className="mt-6">
        <ul className="list-disc space-y-2 pl-6">
          <li>Numeric rows are grouped into one CDA time-series payload per TSID.</li>
          <li>Text rows are grouped into CWMS regular text time-series payloads.</li>
          <li>The current all/existing/new filter controls the submitted rows.</li>
          <li>Authentication comes from AuthProvider; no login polling is required.</li>
          <li>Successful writes invalidate matching TanStack Query caches.</li>
          <li>Deletion requires a second explicit confirmation click.</li>
        </ul>
      </UsaceBox>

      <Divider text="Headless hook" className="mt-8" />
      <Text>
        Use <Code>useCwmsDataUpload</Code> when an application needs its own layout. The
        hook retrieves existing values, classifies parsed rows, applies the selected
        filter, refreshes the comparison query, and provides the authenticated range
        deletion mutation.
      </Text>
      <CodeBlock language="jsx">
        {`const {
  classifiedRows,
  filteredRows,
  existingData,
  isLoadingExisting,
  refreshExisting,
  deleteRows,
} = useCwmsDataUpload({
  model: parsedWorkbook,
  filter: "new",
  unit: "ft",
});`}
      </CodeBlock>

      <Divider text="Component API" className="mt-8" />
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSDataUploadDocs };
export default CWMSDataUploadDocs;
