import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSInputTable, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "columns",
    type: "array",
    default: "[]",
    desc: "Array of column configuration objects. Each object can have: tsid (required), label, units, precision, required, readonly, defaultValues.",
  },
  {
    name: "timeoffsets",
    type: "array",
    default: "[]",
    desc: "Array of time offsets in seconds for row timestamps.",
  },
  {
    name: "showTimestamps",
    type: "boolean",
    default: "true",
    desc: "Whether to show timestamp column.",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Global default number of decimal places for numeric values. Can be overridden per column.",
  },
  {
    name: "units",
    type: "string",
    default: "EN",
    desc: "Global default unit system (EN or SI). Can be overridden per column.",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Whether all inputs are disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Global default for read-only status. Can be overridden per column.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    desc: "Whether the table is in an invalid state.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Global default for required status. Can be overridden per column.",
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
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when any input value changes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Tailwind CSS classes to apply to the table.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom inline styles to apply to the table.",
  },
];

function CWMSInputTableDocs() {
  // const currentTime = Date.now() / 1000;

  return (
    <DocsPage middleText="CWMS Input Table">
      <div>
        <Text>
          The CWMS Input Table component provides a matrix of input fields for entering
          multiple time series values across different time offsets. Its ideal for bulk
          data entry where you need to input values for multiple parameters at different
          time points.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Stage.Inst.0.0.USGS" },
              { tsid: "Flow.Inst.0.0.USGS" },
              { tsid: "Temp.Inst.0.0.USGS" },
            ]}
            timeoffsets={[0, 3600, 7200]}
            showTimestamps={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`import { CWMSInputTable } from "@usace-watermanagement/groundwork-water";

<CWMSInputTable
  columns={[
    { tsid: "Stage.Inst.0.0.USGS" },
    { tsid: "Flow.Inst.0.0.USGS" },
    { tsid: "Temp.Inst.0.0.USGS" }
  ]}
  timeoffsets={[0, 3600, 7200]}  // 0, 1 hour, 2 hours
  showTimestamps={true}
/>`}
      </CodeBlock>

      <Divider text="With Default Values" className="mt-8" />
      <Text className="mb-4">
        You can provide default values for specific cells within each column
        configuration. Default values are keyed by time offset.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              {
                tsid: "Elev.Inst.0.0.USGS",
                defaultValues: {
                  [-3600]: "650.5",
                  0: "651.2",
                },
              },
              {
                tsid: "Storage.Inst.0.0.USGS",
                defaultValues: {
                  0: "125000",
                },
              },
            ]}
            timeoffsets={[-3600, 0, 3600]}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    {
      tsid: "Elev.Inst.0.0.USGS",
      defaultValues: {
        [-3600]: "650.5",
        0: "651.2"
      }
    },
    {
      tsid: "Storage.Inst.0.0.USGS",
      defaultValues: {
        0: "125000"
      }
    }
  ]}
  timeoffsets={[-3600, 0, 3600]}  // -1 hour, now, +1 hour
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a CWMSForm, CWMSInputTable automatically registers with the
        form context for bulk data submission to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSInputTable } from "@usace-watermanagement/groundwork-water";
import { CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSInputTable
    columns={[
      { tsid: "LOCATION.Stage.Inst.15Minutes.0.USGS-raw" },
      { tsid: "LOCATION.Flow.Inst.15Minutes.0.USGS-raw" },
      { tsid: "LOCATION.Precip.Inst.1Hour.0.USGS-raw" }
    ]}
    timeoffsets={[
      -7200,  // -2 hours
      -3600,  // -1 hour
      0,      // current time
      3600,   // +1 hour
      7200    // +2 hours
    ]}
    precision={2}
    units="EN"
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Without Timestamps" className="mt-8" />
      <Text className="mb-4">
        You can hide the timestamp column for a more compact view.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Gate 1" },
              { tsid: "Gate 2" },
              { tsid: "Gate 3" },
              { tsid: "Gate 4" },
            ]}
            timeoffsets={[0]}
            showTimestamps={false}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    { tsid: "Gate 1" },
    { tsid: "Gate 2" },
    { tsid: "Gate 3" },
    { tsid: "Gate 4" }
  ]}
  timeoffsets={[0]}  // Single row for current values
  showTimestamps={false}
/>`}
      </CodeBlock>

      <Divider text="Different Units and Precision Per Column" className="mt-8" />
      <Text className="mb-4">
        Each column can have its own units, precision, and other settings.
        Column-specific settings override global defaults.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Stage", label: "Stage", units: "ft", precision: 2 },
              { tsid: "Flow", label: "Flow", units: "cfs", precision: 0 },
              { tsid: "Temperature", label: "Temp", units: "F", precision: 1 },
            ]}
            timeoffsets={[0, 3600]}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    {
      tsid: "Stage",
      label: "Stage",
      units: "ft",
      precision: 2
    },
    {
      tsid: "Flow",
      label: "Flow",
      units: "cfs",
      precision: 0
    },
    {
      tsid: "Temperature",
      label: "Temp",
      units: "F",
      precision: 1
    }
  ]}
  timeoffsets={[0, 3600]}
/>

// You can also set global defaults and override only specific columns
<CWMSInputTable
  columns={[
    { tsid: "Stage" },                    // Uses global defaults
    { tsid: "Flow", units: "cms" },       // Overrides only units
    { tsid: "Temp", precision: 1 }        // Overrides only precision
  ]}
  timeoffsets={[0]}
  units="EN"      // Global default
  precision={2}   // Global default
/>`}
      </CodeBlock>

      <Divider text="States and Styling" className="mt-8" />
      <div className="flex flex-col gap-4">
        <div>
          <Text className="mb-2 font-semibold">Read-only Table</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[
                {
                  tsid: "Parameter A",
                  defaultValues: { 0: "100", 3600: "105" },
                },
                {
                  tsid: "Parameter B",
                  defaultValues: { 0: "200", 3600: "210" },
                },
              ]}
              timeoffsets={[0, 3600]}
              readonly={true}
            />
          </CWMSForm>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Custom Styled Table (Tailwind)</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[{ tsid: "Value 1" }, { tsid: "Value 2" }]}
              timeoffsets={[0]}
              showTimestamps={false}
              className="bg-gray-100 border-2 border-gray-700 rounded-lg"
            />
          </CWMSForm>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Custom Styled Table (Inline Style)</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[{ tsid: "Value 3" }, { tsid: "Value 4" }]}
              timeoffsets={[0]}
              showTimestamps={false}
              style={{
                backgroundColor: "#f0f8ff",
                border: "2px solid #4169e1",
                borderRadius: "8px",
              }}
            />
          </CWMSForm>
        </div>
      </div>

      <CodeBlock language="jsx">
        {`// Read-only table with default values
<CWMSInputTable
  columns={[
    {
      tsid: "Parameter A",
      defaultValues: { 0: "100", 3600: "105" }
    },
    {
      tsid: "Parameter B",
      defaultValues: { 0: "200", 3600: "210" }
    }
  ]}
  timeoffsets={[0, 3600]}
  readonly={true}
/>

// Custom styled table with Tailwind classes
<CWMSInputTable
  columns={[
    { tsid: "Value 1" },
    { tsid: "Value 2" }
  ]}
  timeoffsets={[0]}
  showTimestamps={false}
  className="bg-gray-100 border-2 border-gray-700 rounded-lg"
/>

// Custom styled table with inline styles
<CWMSInputTable
  columns={[
    { tsid: "Value 3" },
    { tsid: "Value 4" }
  ]}
  timeoffsets={[0]}
  showTimestamps={false}
  style={{
    backgroundColor: "#f0f8ff",
    border: "2px solid #4169e1",
    borderRadius: "8px"
  }}
/>

// You can also use both className and style together
<CWMSInputTable
  columns={[{ tsid: "Combined" }]}
  timeoffsets={[0]}
  className="rounded-lg shadow-md"
  style={{ backgroundColor: "#fafafa" }}
/>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSInputTable />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSInputTableDocs };
export default CWMSInputTableDocs;
