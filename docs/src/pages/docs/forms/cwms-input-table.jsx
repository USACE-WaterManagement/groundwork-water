import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSInputTable, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "tsids",
    type: "array",
    default: "[]",
    desc: "Array of time series IDs for column headers.",
  },
  {
    name: "timeoffsets",
    type: "array",
    default: "[0]",
    desc: "Array of time offsets in seconds for row timestamps.",
  },
  {
    name: "defaultValues",
    type: "object",
    default: "{}",
    desc: "Object with default values keyed by 'tsid_offset'.",
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
    desc: "Number of decimal places for numeric values.",
  },
  {
    name: "units",
    type: "string | array | object",
    default: "EN",
    desc: "Unit system. Can be a string (applies to all), array (per column index), or object (per TSID key).",
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
    desc: "Whether all inputs are read-only.",
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
    desc: "Whether all table cells are required for form submission.",
  },
  {
    name: "perColumnRequired",
    type: "object",
    default: "{}",
    desc: "Object specifying required status per TSID column (e.g., {'Stage': true, 'Flow': false}).",
  },
  {
    name: "perColumnUnits",
    type: "object",
    default: "{}",
    desc: "Object specifying units per TSID column (e.g., {'Stage': 'ft', 'Flow': 'cfs'}).",
  },
  {
    name: "perColumnPrecision",
    type: "object",
    default: "{}",
    desc: "Object specifying precision per TSID column (e.g., {'Stage': 2, 'Flow': 0}).",
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
            tsids={["Stage.Inst.0.0.USGS", "Flow.Inst.0.0.USGS", "Temp.Inst.0.0.USGS"]}
            timeoffsets={[0, 3600, 7200]}
            showTimestamps={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`import { CWMSInputTable } from "@usace-watermanagement/groundwork-water";

<CWMSInputTable
  tsids={["Stage.Inst.0.0.USGS", "Flow.Inst.0.0.USGS", "Temp.Inst.0.0.USGS"]}
  timeoffsets={[0, 3600, 7200]}  // 0, 1 hour, 2 hours
  showTimestamps={true}
/>`}
      </CodeBlock>

      <Divider text="With Default Values" className="mt-8" />
      <Text className="mb-4">
        You can provide default values for specific cells using the tsid_offset key
        format.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            tsids={["Elev.Inst.0.0.USGS", "Storage.Inst.0.0.USGS"]}
            timeoffsets={[-3600, 0, 3600]}
            defaultValues={{
              "Elev.Inst.0.0.USGS_-3600": "650.5",
              "Elev.Inst.0.0.USGS_0": "651.2",
              "Storage.Inst.0.0.USGS_0": "125000",
            }}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  tsids={["Elev.Inst.0.0.USGS", "Storage.Inst.0.0.USGS"]}
  timeoffsets={[-3600, 0, 3600]}  // -1 hour, now, +1 hour
  defaultValues={{
    "Elev.Inst.0.0.USGS_-3600": "650.5",
    "Elev.Inst.0.0.USGS_0": "651.2",
    "Storage.Inst.0.0.USGS_0": "125000"
  }}
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
    tsids={[
      "LOCATION.Stage.Inst.15Minutes.0.USGS-raw",
      "LOCATION.Flow.Inst.15Minutes.0.USGS-raw",
      "LOCATION.Precip.Inst.1Hour.0.USGS-raw"
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
            tsids={["Gate 1", "Gate 2", "Gate 3", "Gate 4"]}
            timeoffsets={[0]}
            showTimestamps={false}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  tsids={["Gate 1", "Gate 2", "Gate 3", "Gate 4"]}
  timeoffsets={[0]}  // Single row for current values
  showTimestamps={false}
/>`}
      </CodeBlock>

      <Divider text="Different Units Per Column" className="mt-8" />
      <Text className="mb-4">
        You can specify different units for each column using an array or object
        notation.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            tsids={["Stage", "Flow", "Temperature"]}
            timeoffsets={[0, 3600]}
            units={["ft", "cfs", "F"]} // Array of units
            perColumnPrecision={{
              Stage: 2,
              Flow: 0,
              Temperature: 1,
            }}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`// Using units as an array (matches tsids by index)
<CWMSInputTable
  tsids={["Stage", "Flow", "Temperature"]}
  timeoffsets={[0, 3600]}
  units={["ft", "cfs", "F"]}
  perColumnPrecision={{
    "Stage": 2,
    "Flow": 0,
    "Temperature": 1
  }}
/>

// Alternative: Using units as an object (matches by TSID key)
<CWMSInputTable
  tsids={["Stage", "Flow", "Temperature"]}
  timeoffsets={[0, 3600]}
  units={{
    "Stage": "ft",
    "Flow": "cfs",
    "Temperature": "F"
  }}
/>

// Or continue using perColumnUnits for backward compatibility
<CWMSInputTable
  tsids={["Stage", "Flow"]}
  timeoffsets={[0]}
  perColumnUnits={{
    "Stage": "ft",
    "Flow": "cfs"
  }}
/>`}
      </CodeBlock>

      <Divider text="States and Styling" className="mt-8" />
      <div className="flex flex-col gap-4">
        <div>
          <Text className="mb-2 font-semibold">Read-only Table</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              tsids={["Parameter A", "Parameter B"]}
              timeoffsets={[0, 3600]}
              readonly={true}
              defaultValues={{
                "Parameter A_0": "100",
                "Parameter B_0": "200",
                "Parameter A_3600": "105",
                "Parameter B_3600": "210",
              }}
            />
          </CWMSForm>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Custom Styled Table (Tailwind)</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              tsids={["Value 1", "Value 2"]}
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
              tsids={["Value 3", "Value 4"]}
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
        {`// Read-only table
<CWMSInputTable
  tsids={["Parameter A", "Parameter B"]}
  timeoffsets={[0, 3600]}
  readonly={true}
  defaultValues={{
    "Parameter A_0": "100",
    "Parameter B_0": "200",
    "Parameter A_3600": "105",
    "Parameter B_3600": "210"
  }}
/>

// Custom styled table with Tailwind classes
<CWMSInputTable
  tsids={["Value 1", "Value 2"]}
  timeoffsets={[0]}
  showTimestamps={false}
  className="bg-gray-100 border-2 border-gray-700 rounded-lg"
/>

// Custom styled table with inline styles
<CWMSInputTable
  tsids={["Value 3", "Value 4"]}
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
  tsids={["Combined"]}
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
