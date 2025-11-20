import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSSpreadsheet, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "columns",
    type: "array",
    default: "[]",
    desc: "Array of column configuration objects. Each object can have: label, type, tsid, units, precision, required, readonly, placeholder. When showTimestamps is true, a time column is automatically added as the first column.",
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
    desc: "Array of arrays containing default cell values. When showTimestamps is true, do not include time values in the data.",
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
    name: "showTimestamps",
    type: "boolean",
    default: "false",
    desc: "Whether to show a time column as the first column. When true, times are calculated from the form's base time plus timeoffsets.",
  },
  {
    name: "timeoffsets",
    type: "array",
    default: "[]",
    desc: "Array of time offsets in seconds from the base time. Each offset corresponds to a row. When provided, automatically enables showTimestamps.",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Global default number of decimal places for numeric values. Can be overridden per column or per cell.",
  },
  {
    name: "units",
    type: "string",
    default: "EN",
    desc: "Global default unit system (EN or SI). Can be overridden per column or per cell.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Global default for required status. Can be overridden per column or per cell.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Global default for read-only status. Can be overridden per column or per cell.",
  },
  {
    name: "cellOverrides",
    type: "object",
    default: "{}",
    desc: "Object with per-cell overrides keyed by 'rowIndex_colIndex' (e.g., {'0_1': {required: true, readonly: true}}).",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Whether all cells are disabled.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when any cell value changes.",
  },
  {
    name: "order",
    type: "number",
    default: "1",
    desc: "Order for CWMS data submission.",
  },
  {
    name: "AllowMissingData",
    type: "boolean",
    default: "true",
    desc: "Whether to allow missing data in submissions.",
  },
  {
    name: "loadNearest",
    type: "string",
    default: "prev",
    desc: "Load nearest value strategy (prev, next, nearest).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Tailwind CSS classes to apply to the container.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom inline styles to apply to the container.",
  },
];

function CWMSSpreadsheetDocs() {
  return (
    <DocsPage middleText="CWMS Spreadsheet">
      <div>
        <Text>
          The CWMS Spreadsheet component provides an Excel-like grid interface for data
          entry. It supports keyboard navigation, copy/paste operations, and can handle
          large datasets with multiple columns and rows.
        </Text>
        <Text className="mt-2">
          <strong>Excel-like Features:</strong>
        </Text>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Multi-cell selection:</strong> Click and drag to select multiple
            cells
          </li>
          <li>
            <strong>Range selection:</strong> Shift+Click to select a range
          </li>
          <li>
            <strong>Keyboard selection:</strong> Shift+Arrow keys to extend selection
          </li>
          <li>
            <strong>Copy multiple cells:</strong> Select cells and press Ctrl+C to copy
            as tab-separated values
          </li>
          <li>
            <strong>Paste from Excel:</strong> Copy from Excel/Google Sheets and paste
            directly
          </li>
          <li>
            <strong>Select all:</strong> Ctrl+A to select entire spreadsheet
          </li>
          <li>Arrow keys - Navigate between cells</li>
          <li>Enter - Move down to next row</li>
          <li>Tab / Shift+Tab - Move forward/backward through cells</li>
          <li>Escape - Clear selection</li>
          <li>Delete - Clear selected cells</li>
        </ul>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "date", label: "Date", type: "text" },
              { key: "stage", label: "Stage (ft)", type: "number" },
              { key: "flow", label: "Flow (cfs)", type: "number" },
              { key: "notes", label: "Notes", type: "text" },
            ]}
            rows={5}
          />
        </CWMSForm>
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
      <Text className="mb-4">Pre-populate the spreadsheet with default values.</Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "time", label: "Time" },
              { key: "elevation", label: "Elevation", type: "number" },
              { key: "volume", label: "Volume", type: "number" },
            ]}
            rows={4}
            defaultData={[
              ["08:00", "650.5", "125000"],
              ["09:00", "651.2", "127500"],
              ["10:00", "651.8", "130000"],
              ["11:00", "", ""],
            ]}
          />
        </CWMSForm>
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
        <CWMSForm office="SWT">
          <CWMSSpreadsheet
            columns={[
              { key: "a", label: "A" },
              { key: "b", label: "B" },
              { key: "c", label: "C" },
              { key: "d", label: "D" },
              { key: "e", label: "E" },
              { key: "f", label: "F" },
            ]}
            rows={4}
            showRowNumbers={true}
            showColumnHeaders={true}
          />
        </CWMSForm>
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

      <Divider text="Time Series Data with Timestamps" className="mt-8" />
      <Text className="mb-4">
        When collecting time series data, the spreadsheet automatically displays a time
        column when you provide timeoffsets. Each row represents a different time offset
        from the form's base time selected in the calendar.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
          <Text className="text-sm text-gray-600 mb-2">
            The time column automatically appears when timeoffsets are provided
          </Text>
          <CWMSSpreadsheet
            columns={[
              {
                label: "Stage (ft)",
                type: "number",
                placeholder: "0.00",
                tsid: "LOCATION.Stage.Inst.1Hour.0.USGS",
                units: "ft",
                precision: 2,
              },
              {
                label: "Flow (cfs)",
                type: "number",
                placeholder: "0",
                tsid: "LOCATION.Flow.Inst.1Hour.0.USGS",
                units: "cfs",
                precision: 0,
              },
              {
                label: "Temp (°F)",
                type: "number",
                placeholder: "0.0",
                tsid: "LOCATION.Temp-Water.Inst.1Hour.0.USGS",
                units: "F",
                precision: 1,
              },
            ]}
            timeoffsets={[0, 3600, 7200, 10800]} // 0hr, 1hr, 2hr, 3hr offsets
            rows={4}
            defaultData={[
              ["650.25", "1250", "72.5"],
              ["650.30", "1275", "72.3"],
              ["650.28", "1265", "72.4"],
              ["", "", ""],
            ]}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`// Time series data with automatic timestamp column
<CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
  <CWMSSpreadsheet
    columns={[
      {
        label: "Stage (ft)",
        type: "number",
        placeholder: "0.00",
        tsid: "LOCATION.Stage.Inst.1Hour.0.USGS",
        units: "ft",
        precision: 2
      },
      {
        label: "Flow (cfs)",
        type: "number",
        placeholder: "0",
        tsid: "LOCATION.Flow.Inst.1Hour.0.USGS",
        units: "cfs",
        precision: 0
      },
      {
        label: "Temp (°F)",
        type: "number",
        placeholder: "0.0",
        tsid: "LOCATION.Temp-Water.Inst.1Hour.0.USGS",
        units: "F",
        precision: 1
      }
    ]}
    timeoffsets={[0, 3600, 7200, 10800]}  // Time offsets in seconds - this triggers time column
    rows={4}
    defaultData={[
      ["650.25", "1250", "72.5"],  // Data for base time + 0 seconds
      ["650.30", "1275", "72.3"],  // Data for base time + 3600 seconds (1 hour)
      ["650.28", "1265", "72.4"],  // Data for base time + 7200 seconds (2 hours)
      ["", "", ""]                  // Data for base time + 10800 seconds (3 hours)
    ]}
  />
</CWMSForm>`}
      </CodeBlock>

      <Text className="mt-4">
        <strong>Important notes about timestamps:</strong>
      </Text>
      <ul className="list-disc ml-6 mt-2">
        <li>
          The time column is automatically added when timeoffsets array is provided
        </li>
        <li>
          You can also explicitly set showTimestamps={"{true}"} to force the time column
        </li>
        <li>
          Time values are read-only and calculated from the form's calendar selection
        </li>
        <li>Each row's time = base time (from calendar) + timeoffset for that row</li>
        <li>Do not include time values in defaultData</li>
        <li>The number of rows should match the length of the timeoffsets array</li>
        <li>Each row's data is submitted with its corresponding time offset</li>
      </ul>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a CWMSForm, CWMSSpreadsheet can submit tabular data to CWMS.
        Each column's TSID is specified within the column configuration.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSSpreadsheet } from "@usace-watermanagement/groundwork-water";
import { CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSSpreadsheet
    columns={[
      {
        label: "Stage (ft)",
        type: "number",
        placeholder: "0.00",
        tsid: "LOCATION.Stage.Inst.15Minutes.0.Ccp-Rev",
        units: "ft",
        precision: 2
      },
      {
        label: "Discharge (cfs)",
        type: "number",
        placeholder: "0",
        tsid: "LOCATION.Flow.Inst.15Minutes.0.Ccp-Rev",
        units: "cfs",
        precision: 0
      },
      {
        label: "Temp (°F)",
        type: "number",
        placeholder: "0.0",
        tsid: "LOCATION.Temp-Water.Inst.1Hour.0.Ccp-Rev",
        units: "F",
        precision: 1
      },
      {
        label: "Quality Code",
        type: "text",
        placeholder: "G/F/P",
        tsid: "LOCATION.Quality.Inst.1Hour.0.Ccp-Rev"
      }
    ]}
    rows={10}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Customization Options" className="mt-8" />
      <div className="flex flex-col gap-6">
        <div>
          <Text className="mb-2 font-semibold">Without Row Numbers</Text>
          <div className="overflow-x-auto">
            <CWMSForm office="SWT">
              <CWMSSpreadsheet
                columns={[
                  { key: "item", label: "Item" },
                  { key: "quantity", label: "Qty", type: "number" },
                  { key: "price", label: "Price", type: "number" },
                ]}
                rows={3}
                showRowNumbers={false}
              />
            </CWMSForm>
          </div>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Read-only Spreadsheet</Text>
          <div className="overflow-x-auto">
            <CWMSForm office="SWT">
              <CWMSSpreadsheet
                columns={[
                  { key: "gauge", label: "Gauge" },
                  { key: "reading", label: "Reading" },
                ]}
                rows={3}
                readonly={true}
                defaultData={[
                  ["Gauge A", "125.5"],
                  ["Gauge B", "130.2"],
                  ["Gauge C", "128.7"],
                ]}
              />
            </CWMSForm>
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

      <div className="font-bold text-lg pt-6 mt-8">Column Configuration Object</div>
      <Text className="mb-4">
        Each object in the <Code className="p-1">columns</Code> array can have the
        following properties:
      </Text>
      <PropsTable
        propsList={[
          {
            name: "label",
            type: "string",
            default: "auto-generated",
            desc: "Display label for the column header (e.g., 'A', 'B', 'Stage (ft)').",
          },
          {
            name: "type",
            type: "string",
            default: "text",
            desc: "Input type for cells in this column ('text', 'number', etc.).",
          },
          {
            name: "tsid",
            type: "string",
            default: "undefined",
            desc: "Time Series ID for this column. Required for CWMS data submission.",
          },
          {
            name: "units",
            type: "string",
            default: "global units",
            desc: "Unit system for this column (e.g., 'ft', 'cfs', 'm', 'cms'). Overrides global units prop.",
          },
          {
            name: "precision",
            type: "number",
            default: "global precision",
            desc: "Number of decimal places for values in this column. Overrides global precision prop.",
          },
          {
            name: "required",
            type: "boolean",
            default: "global required",
            desc: "Whether all cells in this column are required. Overrides global required prop.",
          },
          {
            name: "readonly",
            type: "boolean",
            default: "global readonly",
            desc: "Whether all cells in this column are read-only. Overrides global readonly prop.",
          },
          {
            name: "placeholder",
            type: "string",
            default: "undefined",
            desc: "Placeholder text for empty cells in this column.",
          },
        ]}
      />

      <div className="font-bold text-lg pt-6 mt-8">Cell Override Object</div>
      <Text className="mb-4">
        The <Code className="p-1">cellOverrides</Code> prop accepts an object where keys
        are cell coordinates in the format{" "}
        <Code className="p-1">"rowIndex_colIndex"</Code> and values are configuration
        objects with these properties:
      </Text>
      <PropsTable
        propsList={[
          {
            name: "tsid",
            type: "string",
            default: "column tsid",
            desc: "Override the TSID for this specific cell.",
          },
          {
            name: "units",
            type: "string",
            default: "column/global units",
            desc: "Override the units for this specific cell.",
          },
          {
            name: "precision",
            type: "number",
            default: "column/global precision",
            desc: "Override the precision for this specific cell.",
          },
          {
            name: "required",
            type: "boolean",
            default: "column/global required",
            desc: "Override the required status for this specific cell.",
          },
          {
            name: "readonly",
            type: "boolean",
            default: "column/global readonly",
            desc: "Override the readonly status for this specific cell.",
          },
          {
            name: "type",
            type: "string",
            default: "column type",
            desc: "Override the input type for this specific cell.",
          },
          {
            name: "placeholder",
            type: "string",
            default: "column placeholder",
            desc: "Override the placeholder text for this specific cell.",
          },
          {
            name: "offset",
            type: "number",
            default: "row timeoffset",
            desc: "Override the time offset for this specific cell.",
          },
        ]}
      />

      <CodeBlock language="jsx" className="mt-4">
        {`// Example with cell overrides
<CWMSSpreadsheet
  columns={[
    { label: "Stage", tsid: "LOC.Stage.Inst.0.0.TEST", units: "ft" },
    { label: "Flow", tsid: "LOC.Flow.Inst.0.0.TEST", units: "cfs" }
  ]}
  rows={3}
  cellOverrides={{
    "0_1": { required: true, readonly: true },     // First row, second column
    "1_0": { precision: 3, units: "m" },           // Second row, first column
    "2_1": { tsid: "LOC.Flow.Inst.0.0.SPECIAL" }   // Third row, second column
  }}
/>`}
      </CodeBlock>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <Text className="font-semibold mb-2">Property Fallback Chain:</Text>
        <Text className="text-sm">
          For properties like units, precision, required, and readonly, the component
          uses this fallback order:
        </Text>
        <Code className="block mt-2 p-2 bg-white">
          cellOverride → column → global → default value
        </Code>
        <Text className="text-sm mt-2">
          This three-level system allows maximum flexibility: set global defaults,
          override per column, and fine-tune individual cells as needed.
        </Text>
      </div>
    </DocsPage>
  );
}

export { CWMSSpreadsheetDocs };
export default CWMSSpreadsheetDocs;
