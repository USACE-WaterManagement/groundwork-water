import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSRadioGroup, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "name",
    type: "string",
    default: "tsid value",
    desc: "Name attribute for the radio group. Defaults to tsid if not provided.",
  },
  {
    name: "tsid",
    type: "string",
    default: "undefined",
    desc: "Time Series ID for CWMS data submission. Required for CWMS integration.",
  },
  {
    name: "options",
    type: "array",
    default: "[]",
    desc: "Array of option values (strings) or option objects with {value, label} structure.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    desc: "Initial selected value.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when selection changes. Receives the selected value.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Whether a selection is required for form submission.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Whether the radio group is read-only.",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Whether all radio buttons are disabled.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    desc: "Label text for the radio group.",
  },
  {
    name: "legend",
    type: "string",
    default: "undefined",
    desc: "Legend text for the fieldset containing the radio buttons.",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Decimal precision for numeric values in CWMS submission.",
  },
  {
    name: "offset",
    type: "number",
    default: "0",
    desc: "Time offset in seconds from the base time.",
  },
  {
    name: "timeOffset",
    type: "number",
    default: "undefined",
    desc: "Alternative to offset. Time offset in seconds from the base time.",
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
    name: "units",
    type: "string",
    default: "EN",
    desc: "Unit system (EN or SI) for CWMS data.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "CSS classes to apply to the radio group.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Inline styles to apply to the radio group.",
  },
];

function CWMSRadioGroupDocs() {
  return (
    <DocsPage middleText="CWMS Radio Group">
      <div>
        <Text>
          The CWMS Radio Group component allows users to select a single option from a
          list of choices. It integrates with CWMS forms to submit the selected value as
          time series data.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSRadioGroup
            name="operational-mode"
            tsid="pytest-loc.Code.Inst.0.0.OpMode"
            label="Operational Mode"
            options={["Normal", "Flood Control", "Drought Management", "Maintenance"]}
            defaultValue="Normal"
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`import { CWMSRadioGroup } from "@usace-watermanagement/groundwork-water";

<CWMSRadioGroup
  name="operational-mode"
  tsid="pytest-loc.Code.Inst.0.0.OpMode"
  label="Operational Mode"
  options={["Normal", "Flood Control", "Drought Management", "Maintenance"]}
  defaultValue="Normal"
/>`}
      </CodeBlock>

      <Divider text="With Custom Labels" className="mt-8" />
      <Text className="mb-4">
        You can provide options as objects with custom value/label pairs for more
        control over what gets displayed vs. what gets submitted.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSRadioGroup
            name="gate-status"
            tsid="pytest-loc.Code.Inst.0.0.GateStatus"
            label="Gate Status"
            options={[
              { value: "0", label: "Fully Closed" },
              { value: "25", label: "25% Open" },
              { value: "50", label: "50% Open" },
              { value: "75", label: "75% Open" },
              { value: "100", label: "Fully Open" },
            ]}
            defaultValue="0"
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSRadioGroup
  name="gate-status"
  tsid="pytest-loc.Code.Inst.0.0.GateStatus"
  label="Gate Status"
  options={[
    { value: "0", label: "Fully Closed" },
    { value: "25", label: "25% Open" },
    { value: "50", label: "50% Open" },
    { value: "75", label: "75% Open" },
    { value: "100", label: "Fully Open" }
  ]}
  defaultValue="0"
/>`}
      </CodeBlock>

      <Divider text="Required Selection" className="mt-8" />
      <Text className="mb-4">
        Mark a radio group as required to ensure a selection is made before form
        submission.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSRadioGroup
            name="water-quality"
            tsid="pytest-loc.Code.Inst.0.0.Quality"
            label="Water Quality *"
            options={["Excellent", "Good", "Fair", "Poor"]}
            required={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSRadioGroup
  name="water-quality"
  tsid="pytest-loc.Code.Inst.0.0.Quality"
  label="Water Quality *"
  options={["Excellent", "Good", "Fair", "Poor"]}
  required={true}
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a CWMSForm, the selected value is automatically submitted to
        CWMS with the appropriate timestamp and metadata.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSRadioGroup, CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSRadioGroup
    name="reservoir-operation"
    tsid="LOCATION.Code.Inst.0.0.ReservoirOp"
    label="Reservoir Operation Mode"
    options={[
      { value: "NORMAL", label: "Normal Operations" },
      { value: "FLOOD", label: "Flood Control" },
      { value: "DROUGHT", label: "Drought Management" },
      { value: "MAINT", label: "Maintenance Mode" }
    ]}
    units="n/a"
    required={true}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With Time Offsets" className="mt-8" />
      <Text className="mb-4">
        Use the timeOffset or offset prop to specify when this data point should be
        recorded relative to the form's base time.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT" showCalendar={true}>
          <Text className="text-sm mb-2 font-semibold">Current Conditions</Text>
          <CWMSRadioGroup
            name="current-conditions"
            tsid="pytest-loc.Code.Inst.0.0.Conditions"
            label="Weather Conditions (Now)"
            options={["Clear", "Cloudy", "Rainy", "Stormy"]}
            timeOffset={0}
          />

          <Text className="text-sm mb-2 font-semibold mt-4">Forecast (1 hour)</Text>
          <CWMSRadioGroup
            name="forecast-conditions"
            tsid="pytest-loc.Code.Inst.0.0.Forecast"
            label="Expected Conditions (+1 hour)"
            options={["Clear", "Cloudy", "Rainy", "Stormy"]}
            timeOffset={3600}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSForm office="SWT" showCalendar={true}>
  <CWMSRadioGroup
    name="current-conditions"
    tsid="pytest-loc.Code.Inst.0.0.Conditions"
    label="Weather Conditions (Now)"
    options={["Clear", "Cloudy", "Rainy", "Stormy"]}
    timeOffset={0}
  />

  <CWMSRadioGroup
    name="forecast-conditions"
    tsid="pytest-loc.Code.Inst.0.0.Forecast"
    label="Expected Conditions (+1 hour)"
    options={["Clear", "Cloudy", "Rainy", "Stormy"]}
    timeOffset={3600}  // 1 hour in seconds
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Read-only Mode" className="mt-8" />
      <Text className="mb-4">
        Use the readonly prop to display options without allowing changes.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSRadioGroup
            name="locked-status"
            tsid="pytest-loc.Code.Inst.0.0.Status"
            label="System Status (Read-only)"
            options={["Online", "Offline", "Maintenance"]}
            defaultValue="Online"
            readonly={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSRadioGroup
  name="locked-status"
  tsid="pytest-loc.Code.Inst.0.0.Status"
  label="System Status (Read-only)"
  options={["Online", "Offline", "Maintenance"]}
  defaultValue="Online"
  readonly={true}
/>`}
      </CodeBlock>

      <Divider text="With onChange Handler" className="mt-8" />
      <Text className="mb-4">
        Use the onChange callback to react to selection changes.
      </Text>

      <CodeBlock language="jsx">
        {`import { useState } from "react";

function MyForm() {
  const [selectedMode, setSelectedMode] = useState("Normal");

  return (
    <CWMSForm office="SWT">
      <CWMSRadioGroup
        name="operation-mode"
        tsid="pytest-loc.Code.Inst.0.0.Mode"
        label="Operation Mode"
        options={["Normal", "Emergency", "Maintenance"]}
        value={selectedMode}
        onChange={(value) => {
          setSelectedMode(value);
          console.log("Selected:", value);
          // Perform additional actions based on selection
        }}
      />

      {selectedMode === "Emergency" && (
        <div className="p-4 bg-red-100 border border-red-400 rounded">
          Emergency mode activated!
        </div>
      )}
    </CWMSForm>
  );
}`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSRadioGroup />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <Text className="font-semibold mb-2">Options Format:</Text>
        <Text className="text-sm mb-2">
          The <Code className="p-1">options</Code> prop accepts two formats:
        </Text>
        <div className="space-y-2">
          <div>
            <Text className="text-sm font-semibold">String Array:</Text>
            <Code className="block mt-1 p-2 bg-white text-sm">
              {`options={["Option 1", "Option 2", "Option 3"]}`}
            </Code>
            <Text className="text-xs mt-1">
              Simple format where the display label and submitted value are the same.
            </Text>
          </div>
          <div>
            <Text className="text-sm font-semibold">Object Array:</Text>
            <Code className="block mt-1 p-2 bg-white text-sm">
              {`options={[
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2", disabled: true }
]}`}
            </Code>
            <Text className="text-xs mt-1">
              Advanced format with separate value/label and optional disabled state.
            </Text>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
        <Text className="font-semibold mb-2">Important Notes:</Text>
        <ul className="list-disc ml-5 space-y-1 text-sm">
          <li>
            The <Code className="p-1">tsid</Code> prop is required for CWMS data
            submission
          </li>
          <li>Only one option can be selected at a time</li>
          <li>
            Use <Code className="p-1">defaultValue</Code> to set initial selection
          </li>
          <li>
            The <Code className="p-1">readonly</Code> prop disables user interaction
            while still showing the selection
          </li>
          <li>Selected values are submitted to CWMS when the form is submitted</li>
          <li>
            Time offsets allow the same radio group to record values at different
            timestamps
          </li>
        </ul>
      </div>
    </DocsPage>
  );
}

export { CWMSRadioGroupDocs };
export default CWMSRadioGroupDocs;
