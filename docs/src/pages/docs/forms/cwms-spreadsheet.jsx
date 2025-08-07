import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSSpreadsheet, FormWrapper } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "columns",
    type: "array",
    default: "[]",
    desc: "Array of column definitions with {key, label, type, placeholder} structure.",
  },
  {
    name: "rows",
    type: "number",
    default: "10",
    desc: "Number of rows in the spreadsheet.",
  },
  {
    name: "defaultData",
    type: "array",
    default: "[]",
    desc: "Array of arrays containing default cell values.",
  },
  {
    name: "showRowNumbers",
    type: "boolean",
    default: "true",
    desc: "Whether to show row numbers.",
  },
  {
    name: "showColumnHeaders",
    type: "boolean",
    default: "true",
    desc: "Whether to show column headers.",
  },
  {
    name: "resizable",
    type: "boolean",
    default: "false",
    desc: "Whether columns are resizable (future feature).",
  },
  {
    name: "tsid",
    type: "string",
    default: "undefined",
    desc: "The time series ID for CWMS data association.",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Number of decimal places for numeric values.",
  },
  {
    name: "units",
    type: "string",
    default: "EN",
    desc: "Unit system (EN for English, SI for metric).",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Whether all cells are disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Whether all cells are read-only.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when any cell value changes.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles to apply to the container.",
  },
];

function CWMSSpreadsheetDocs() {
  return (
    <DocsPage middleText="CWMS Spreadsheet">
      <div>
        <Text>
          The CWMS Spreadsheet component provides an Excel-like grid interface for data entry.
          It supports keyboard navigation, copy/paste operations, and can handle large datasets
          with multiple columns and rows.
        </Text>
        <Text className="mt-2">
          <strong>Excel-like Features:</strong>
        </Text>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Multi-cell selection:</strong> Click and drag to select multiple cells</li>
          <li><strong>Range selection:</strong> Shift+Click to select a range</li>
          <li><strong>Keyboard selection:</strong> Shift+Arrow keys to extend selection</li>
          <li><strong>Copy multiple cells:</strong> Select cells and press Ctrl+C to copy as tab-separated values</li>
          <li><strong>Paste from Excel:</strong> Copy from Excel/Google Sheets and paste directly</li>
          <li><strong>Select all:</strong> Ctrl+A to select entire spreadsheet</li>
          <li>Arrow keys - Navigate between cells</li>
          <li>Enter - Move down to next row</li>
          <li>Tab / Shift+Tab - Move forward/backward through cells</li>
          <li>Escape - Clear selection</li>
          <li>Delete - Clear selected cells</li>
        </ul>
      </div>
      
      <Divider text="Basic Usage" className="mt-8" />
      <div className="overflow-x-auto">
        <FormWrapper office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "date", label: "Date", type: "text" },
              { key: "stage", label: "Stage (ft)", type: "number" },
              { key: "flow", label: "Flow (cfs)", type: "number" },
              { key: "notes", label: "Notes", type: "text" }
            ]}
            rows={5}
          />
        </FormWrapper>
      </div>
      
      <CodeBlock language="jsx">
        {`import { CWMSSpreadsheet } from "@usace-watermanagement/groundwork-water";

<CWMSSpreadsheet
  columns={[
    { key: "date", label: "Date", type: "text" },
    { key: "stage", label: "Stage (ft)", type: "number" },
    { key: "flow", label: "Flow (cfs)", type: "number" },
    { key: "notes", label: "Notes", type: "text" }
  ]}
  rows={5}
/>`}
      </CodeBlock>

      <Divider text="With Default Data" className="mt-8" />
      <Text className="mb-4">
        Pre-populate the spreadsheet with default values.
      </Text>
      
      <div className="overflow-x-auto">
        <FormWrapper office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "time", label: "Time" },
              { key: "elevation", label: "Elevation", type: "number" },
              { key: "volume", label: "Volume", type: "number" }
            ]}
            rows={4}
            defaultData={[
              ["08:00", "650.5", "125000"],
              ["09:00", "651.2", "127500"],
              ["10:00", "651.8", "130000"],
              ["11:00", "", ""]
            ]}
          />
        </FormWrapper>
      </div>
      
      <CodeBlock language="jsx">
        {`<CWMSSpreadsheet
  columns={[
    { key: "time", label: "Time" },
    { key: "elevation", label: "Elevation", type: "number" },
    { key: "volume", label: "Volume", type: "number" }
  ]}
  rows={4}
  defaultData={[
    ["08:00", "650.5", "125000"],
    ["09:00", "651.2", "127500"],
    ["10:00", "651.8", "130000"],
    ["11:00", "", ""]
  ]}
/>`}
      </CodeBlock>

      <Divider text="Simple Column Labels" className="mt-8" />
      <Text className="mb-4">
        You can create a spreadsheet with simple column labels like A, B, C, etc.
      </Text>
      
      <div className="overflow-x-auto">
        <FormWrapper office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "a", label: "A" },
              { key: "b", label: "B" },
              { key: "c", label: "C" },
              { key: "d", label: "D" },
              { key: "e", label: "E" },
              { key: "f", label: "F" }
            ]}
            rows={4}
            showRowNumbers={true}
            showColumnHeaders={true}
          />
        </FormWrapper>
      </div>
      
      <CodeBlock language="jsx">
        {`// Creates a 6-column spreadsheet with labeled columns
<CWMSSpreadsheet
  columns={[
    { key: "a", label: "A" },
    { key: "b", label: "B" },
    { key: "c", label: "C" },
    { key: "d", label: "D" },
    { key: "e", label: "E" },
    { key: "f", label: "F" }
  ]}
  rows={4}
  showRowNumbers={true}
  showColumnHeaders={true}
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a FormWrapper, CWMSSpreadsheet can submit tabular data to CWMS.
      </Text>
      
      <CodeBlock language="jsx">
        {`import { CWMSSpreadsheet } from "@usace-watermanagement/groundwork-water";
import { FormWrapper } from "@usace-watermanagement/groundwork-water";

<FormWrapper office="SWT" cdaUrl="https://water.usace.army.mil/cwms-data">
  <CWMSSpreadsheet
    tsid="LOCATION.DataTable.Inst.0.0.TABLE"
    columns={[
      { key: "datetime", label: "Date/Time", type: "text", placeholder: "YYYY-MM-DD HH:MM" },
      { key: "stage", label: "Stage (ft)", type: "number", placeholder: "0.00" },
      { key: "discharge", label: "Discharge (cfs)", type: "number", placeholder: "0" },
      { key: "temperature", label: "Temp (°F)", type: "number", placeholder: "0.0" },
      { key: "quality", label: "Quality Code", type: "text", placeholder: "G/F/P" }
    ]}
    rows={10}
    precision={2}
    units="EN"
  />
</FormWrapper>`}
      </CodeBlock>

      <Divider text="Customization Options" className="mt-8" />
      <div className="flex flex-col gap-6">
        <div>
          <Text className="mb-2 font-semibold">Without Row Numbers</Text>
          <div className="overflow-x-auto">
            <FormWrapper office="SWT">
              <CWMSSpreadsheet
                columns={[
                  { key: "item", label: "Item" },
                  { key: "quantity", label: "Qty", type: "number" },
                  { key: "price", label: "Price", type: "number" }
                ]}
                rows={3}
                showRowNumbers={false}
              />
            </FormWrapper>
          </div>
        </div>
        
        <div>
          <Text className="mb-2 font-semibold">Read-only Spreadsheet</Text>
          <div className="overflow-x-auto">
            <FormWrapper office="SWT">
              <CWMSSpreadsheet
                columns={[
                  { key: "gauge", label: "Gauge" },
                  { key: "reading", label: "Reading" }
                ]}
                rows={3}
                readonly={true}
                defaultData={[
                  ["Gauge A", "125.5"],
                  ["Gauge B", "130.2"],
                  ["Gauge C", "128.7"]
                ]}
              />
            </FormWrapper>
          </div>
        </div>
      </div>
      
      <CodeBlock language="jsx">
        {`// Without row numbers
<CWMSSpreadsheet
  columns={[
    { key: "item", label: "Item" },
    { key: "quantity", label: "Qty", type: "number" },
    { key: "price", label: "Price", type: "number" }
  ]}
  rows={3}
  showRowNumbers={false}
/>

// Read-only spreadsheet
<CWMSSpreadsheet
  columns={[
    { key: "gauge", label: "Gauge" },
    { key: "reading", label: "Reading" }
  ]}
  rows={3}
  readonly={true}
  defaultData={[
    ["Gauge A", "125.5"],
    ["Gauge B", "130.2"],
    ["Gauge C", "128.7"]
  ]}
/>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSSpreadsheet />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSSpreadsheetDocs };
export default CWMSSpreadsheetDocs;