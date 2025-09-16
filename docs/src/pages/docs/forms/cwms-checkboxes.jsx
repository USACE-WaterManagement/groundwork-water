import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSCheckboxes, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "legend",
    type: "string",
    default: "undefined",
    desc: "The legend text for the checkbox group.",
  },
  {
    name: "content",
    type: "array<CheckboxItem>",
    default: "[]",
    desc: "Array of checkbox item objects. See CheckboxItem API below for detailed properties.",
  },
  {
    name: "singleSelect",
    type: "boolean",
    default: "false",
    desc: "When true, only one checkbox can be selected at a time (radio button behavior). Only the selected checkbox's value will be submitted.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when any checkbox changes. Receives array of all checked values (or single value in singleSelect mode).",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Whether at least one checkbox must be checked for form submission. Can be overridden per item.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles to apply to the container.",
  },
];

const checkboxItemProps = [
  // Required
  {
    name: "id",
    type: "string",
    default: "required",
    desc: "Unique identifier for the checkbox item.",
  },
  // Standard Groundwork Properties
  {
    name: "label",
    type: "string",
    default: "undefined",
    desc: "Display label for the checkbox.",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    desc: "Additional description text displayed below the label.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    desc: "Initial checked state of the checkbox.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Handler called when this checkbox changes. Receives event object.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    desc: "Whether this specific checkbox is disabled.",
  },
  {
    name: "inputProps",
    type: "object",
    default: "undefined",
    desc: "Additional props to pass to the underlying input element.",
  },
  {
    name: "labelProps",
    type: "object",
    default: "undefined",
    desc: "Additional props to pass to the label element (e.g., className for styling).",
  },
  // CWMS-Specific Properties
  {
    name: "tsid",
    type: "string",
    default: "undefined",
    desc: "Time series ID for CWMS data association for this specific checkbox.",
  },
  {
    name: "value",
    type: "string",
    default: "label or id",
    desc: "The value returned when this checkbox is checked.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Makes this specific checkbox read-only (CWMS-specific).",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Alias for disabled (CWMS-specific).",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Decimal precision for numeric values (CWMS-specific).",
  },
  {
    name: "offset",
    type: "number",
    default: "0",
    desc: "Time offset in seconds for data timestamps (CWMS-specific).",
  },
  {
    name: "order",
    type: "number",
    default: "1",
    desc: "Sort order for this checkbox (CWMS-specific).",
  },
  {
    name: "units",
    type: "string",
    default: "EN",
    desc: "Unit system (EN for English, SI for metric) (CWMS-specific).",
  },
  {
    name: "AllowMissingData",
    type: "boolean",
    default: "true",
    desc: "Whether to allow missing data points (CWMS-specific).",
  },
  {
    name: "loadNearest",
    type: "string",
    default: "prev",
    desc: "Strategy for loading nearest data point (CWMS-specific).",
  },
];

function CWMSCheckboxesDocs() {
  return (
    <DocsPage middleText="CWMS Checkboxes">
      <div>
        <Text>
          The CWMS Checkboxes component provides a group of checkboxes that integrates
          with CWMS forms for multi-selection data collection. Uses the full Groundwork
          checkbox content API with CWMS-specific extensions.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <CWMSForm office="SWT">
        <div className="flex flex-col gap-6">
          <div>
            <Text className="mb-2 font-semibold">Full Content API</Text>
            <CWMSCheckboxes
              legend="Select Options"
              content={[
                {
                  id: "option1",
                  label: "Option 1",
                  defaultChecked: true,
                  onChange: (checked) => console.log("Option 1:", checked),
                },
                {
                  id: "option2",
                  label: "Option 2",
                  defaultChecked: false,
                  onChange: (checked) => console.log("Option 2:", checked),
                },
                {
                  id: "option3",
                  label: "Option 3",
                  defaultChecked: false,
                  onChange: (checked) => console.log("Option 3:", checked),
                },
              ]}
            />
          </div>

          <div>
            <Text className="mb-2 font-semibold">With Descriptions</Text>
            <CWMSCheckboxes
              legend="Priority Levels"
              content={[
                {
                  id: "high",
                  label: "High Priority",
                  description: "Urgent tasks requiring immediate attention",
                  defaultChecked: true,
                  onChange: (checked) => console.log("High priority:", checked),
                },
                {
                  id: "medium",
                  label: "Medium Priority",
                  description: "Important but not urgent",
                  defaultChecked: false,
                  onChange: (checked) => console.log("Medium priority:", checked),
                },
                {
                  id: "low",
                  label: "Low Priority",
                  description: "Can be deferred if needed",
                  defaultChecked: false,
                  onChange: (checked) => console.log("Low priority:", checked),
                },
              ]}
            />
          </div>
        </div>
      </CWMSForm>

      <CodeBlock language="jsx">
        {`import { CWMSCheckboxes } from "@usace-watermanagement/groundwork-water";

// Multi-select mode (default) - multiple checkboxes can be selected
<CWMSCheckboxes
  legend="Select Options"
  content={[
    { id: "option1", label: "Option 1", defaultChecked: true, onChange: (checked) => console.log("Option 1:", checked) },
    { id: "option2", label: "Option 2", defaultChecked: false, onChange: (checked) => console.log("Option 2:", checked) },
    { id: "option3", label: "Option 3", defaultChecked: false, onChange: (checked) => console.log("Option 3:", checked) }
  ]}
/>

// With descriptions
<CWMSCheckboxes
  legend="Priority Levels"
  content={[
    { 
      id: "high", 
      label: "High Priority", 
      description: "Urgent tasks requiring immediate attention",
      defaultChecked: true,
      onChange: (checked) => console.log("High priority:", checked)
    },
    { 
      id: "medium", 
      label: "Medium Priority", 
      description: "Important but not urgent",
      defaultChecked: false,
      onChange: (checked) => console.log("Medium priority:", checked)
    }
  ]}
/>`}
      </CodeBlock>

      <Divider text="Per-Item Disabled/Readonly States" className="mt-8" />
      <CWMSForm office="SWT">
        <div className="flex flex-col gap-6">
          <div>
            <Text className="mb-2 font-semibold">Individual Item States</Text>
            <CWMSCheckboxes
              legend="Equipment Status"
              content={[
                {
                  id: "pump1",
                  label: "Pump 1",
                  defaultChecked: true,
                  disabled: false,
                  onChange: (checked) => console.log("Pump 1:", checked),
                },
                {
                  id: "pump2",
                  label: "Pump 2",
                  defaultChecked: false,
                  disabled: true,
                  onChange: (checked) => console.log("Pump 2:", checked),
                },
                {
                  id: "generator",
                  label: "Generator",
                  defaultChecked: true,
                  readonly: true,
                  onChange: (checked) => console.log("Generator:", checked),
                },
                {
                  id: "backup",
                  label: "Backup System",
                  defaultChecked: false,
                  onChange: (checked) => console.log("Backup:", checked),
                },
              ]}
            />
          </div>
        </div>
      </CWMSForm>

      <CodeBlock language="jsx">
        {`// Per-item disabled/readonly states
<CWMSCheckboxes
  legend="Equipment Status"
  content={[
    { id: "pump1", label: "Pump 1", defaultChecked: true, disabled: false, onChange: (checked) => console.log("Pump 1:", checked) },
    { id: "pump2", label: "Pump 2", defaultChecked: false, disabled: true, onChange: (checked) => console.log("Pump 2:", checked) },
    { id: "generator", label: "Generator", defaultChecked: true, readonly: true, onChange: (checked) => console.log("Generator:", checked) },
    { id: "backup", label: "Backup System", defaultChecked: false, onChange: (checked) => console.log("Backup:", checked) }
  ]}
/>`}
      </CodeBlock>

      <Divider text="Single Selection Mode" className="mt-8" />
      <CWMSForm office="SWT">
        <div className="flex flex-col gap-6">
          <div>
            <Text className="mb-2 font-semibold">Radio Button Behavior</Text>
            <Text className="mb-4 text-sm text-gray-600">
              With singleSelect enabled, only one checkbox can be selected at a time.
              Selecting a new checkbox automatically deselects the previous one.
            </Text>
            <CWMSCheckboxes
              singleSelect={true}
              legend="Select One Option"
              content={[
                {
                  id: "morning",
                  label: "Morning Shift",
                  tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
                  defaultChecked: true,
                },
                {
                  id: "afternoon",
                  label: "Afternoon Shift",
                  tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
                  defaultChecked: false,
                },
                {
                  id: "evening",
                  label: "Evening Shift",
                  tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
                  defaultChecked: false,
                },
              ]}
              onChange={(values) => console.log("Selected:", values)}
            />
          </div>
        </div>
      </CWMSForm>

      <CodeBlock language="jsx">
        {`// Single selection mode - only one checkbox can be selected
<CWMSCheckboxes
  singleSelect={true}
  legend="Select One Option"
  content={[
    {
      id: "morning",
      label: "Morning Shift",
      tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
      defaultChecked: true
    },
    {
      id: "afternoon",
      label: "Afternoon Shift",
      tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
      defaultChecked: false
    },
    {
      id: "evening",
      label: "Evening Shift",
      tsid: "LOCATION.Shift.Inst.1Hour.0.STATUS",
      defaultChecked: false
    }
  ]}
  onChange={(values) => console.log("Selected:", values)}
/>

// In single select mode:
// - Only one checkbox can be selected at a time
// - Selecting a new checkbox deselects all others
// - Only the selected checkbox's TSID data is submitted
// - onChange receives an array with only the selected value`}
      </CodeBlock>

      <Divider text="CWMS-Specific Properties" className="mt-8" />
      <Text className="mb-4">
        Content items can include CWMS-specific properties like tsid for individual time
        series association. When used within a CWMSForm, these properties enable
        fine-grained CWMS integration.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSCheckboxes } from "@usace-watermanagement/groundwork-water";
import { CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSCheckboxes
    legend="Gate Status"
    content={[
      { 
        id: "gate1", 
        label: "Gate 1 Open", 
        tsid: "LOCATION.Gate-Status.Inst.15Minutes.0.STATUS",
        defaultChecked: false,
        onChange: (checked) => console.log("Gate 1:", checked)
      },
      { 
        id: "gate2", 
        label: "Gate 2 Open", 
        tsid: "LOCATION.Gate-Status.Inst.15Minutes.0.STATUS",
        defaultChecked: true,
        onChange: (checked) => console.log("Gate 2:", checked)
      },
      { 
        id: "gate3", 
        label: "Gate 3 Open", 
        tsid: "LOCATION.Gate-Status.Inst.15Minutes.0.STATUS",
        defaultChecked: false,
        onChange: (checked) => console.log("Gate 3:", checked)
      }
    ]}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />

      <div className="font-bold text-lg pt-6">
        CWMSCheckboxes Component API -{" "}
        <Code className="p-2">{`<CWMSCheckboxes />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />

      <div className="font-bold text-lg pt-8 mt-8">
        CheckboxItem API - <Code className="p-2">{`content[n]`}</Code>
      </div>
      <Text className="mb-4">
        Each item in the content array accepts the following properties. The component
        passes through all standard Groundwork checkbox properties and adds
        CWMS-specific extensions.
      </Text>
      <PropsTable propsList={checkboxItemProps} />
    </DocsPage>
  );
}

export { CWMSCheckboxesDocs };
export default CWMSCheckboxesDocs;
