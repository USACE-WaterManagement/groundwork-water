import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import {
  CWMSDropdown,
  FormWrapper,
} from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "name",
    type: "string",
    default: "undefined",
    desc: "The name attribute for the dropdown.",
  },
  {
    name: "options",
    type: "array",
    default: "[]",
    desc: "Array of string options for the dropdown.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    desc: "The controlled selected value.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    desc: "The default selected value when uncontrolled.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "undefined",
    desc: "Placeholder text when no option is selected.",
  },
  {
    name: "tsid",
    type: "string",
    default: "undefined",
    desc: "The time series ID for CWMS data association.",
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
    desc: "Whether the dropdown is disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Whether the dropdown is read-only.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    desc: "Whether the dropdown is in an invalid state.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when selection changes.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles to apply to the dropdown.",
  },
];

function CWMSDropdownDocs() {
  return (
    <DocsPage middleText="CWMS Dropdown">
      <div>
        <Text>
          The CWMS Dropdown component provides a select dropdown that integrates
          with CWMS forms for single-selection data collection.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <FormWrapper office="SWT">
        <div className="flex flex-col gap-4">
          <CWMSDropdown
            name="basic-dropdown"
            placeholder="Select an option"
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
          />

          <CWMSDropdown
            name="with-default"
            options={["Small", "Medium", "Large", "Extra Large"]}
            defaultValue="Medium"
          />

          <CWMSDropdown
            name="labeled-dropdown"
            placeholder="Select priority level"
            options={["Critical", "High", "Medium", "Low"]}
          />
        </div>
      </FormWrapper>

      <CodeBlock language="jsx">
        {`import { CWMSDropdown } from "@usace-watermanagement/groundwork-water";

// Simple string options
<CWMSDropdown
  name="basic-dropdown"
  placeholder="Select an option"
  options={["Option 1", "Option 2", "Option 3", "Option 4"]}
/>

// With default value
<CWMSDropdown
  name="with-default"
  options={["Small", "Medium", "Large", "Extra Large"]}
  defaultValue="Medium"
/>

// With placeholder
<CWMSDropdown
  name="labeled-dropdown"
  placeholder="Select priority level"
  options={["Critical", "High", "Medium", "Low"]}
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a FormWrapper, CWMSDropdown automatically registers
        with the form context for data collection and submission to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSDropdown } from "@usace-watermanagement/groundwork-water";
import { FormWrapper } from "@usace-watermanagement/groundwork-water";

<FormWrapper office="SWT" cdaUrl="https://water.usace.army.mil/cwms-data">
  <CWMSDropdown
    name="gate-position"
    tsid="LOCATION.GatePos.Inst.0.0.POSITION"
    placeholder="Select gate position"
    options={["Closed", "25% Open", "50% Open", "75% Open", "Fully Open"]}
  />
  
  <CWMSDropdown
    name="unit-selection"
    tsid="LOCATION.Flow.Inst.0.0.USGS"
    placeholder="Select units"
    options={["cfs", "cms", "gpm", "mgd"]}
    defaultValue="cfs"
  />
</FormWrapper>`}
      </CodeBlock>

      <Divider text="States and Styling" className="mt-8" />
      <FormWrapper office="SWT">
        <div className="flex flex-col gap-4">
          <CWMSDropdown
            name="disabled-dropdown"
            options={["Option A", "Option B", "Option C"]}
            defaultValue="Option A"
            disable={true}
          />

          <CWMSDropdown
            name="invalid-dropdown"
            placeholder="Invalid state example"
            options={["Valid", "Invalid", "Error"]}
            invalid={true}
          />

          <CWMSDropdown
            name="styled-dropdown"
            placeholder="Custom styled dropdown"
            options={["Style 1", "Style 2", "Style 3"]}
            style={{
              backgroundColor: "#e8f5e9",
              border: "2px solid #4caf50",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </div>
      </FormWrapper>

      <CodeBlock language="jsx">
        {`// Disabled state
<CWMSDropdown
  name="disabled-dropdown"
  options={["Option A", "Option B", "Option C"]}
  defaultValue="Option A"
  disable={true}
/>

// Invalid state
<CWMSDropdown
  name="invalid-dropdown"
  placeholder="Invalid state example"
  options={["Valid", "Invalid", "Error"]}
  invalid={true}
/>

// Custom styling
<CWMSDropdown
  name="styled-dropdown"
  placeholder="Custom styled dropdown"
  options={["Style 1", "Style 2", "Style 3"]}
  style={{
    backgroundColor: "#e8f5e9",
    border: "2px solid #4caf50",
    borderRadius: "8px",
    padding: "8px"
  }}
/>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSDropdown />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSDropdownDocs };
export default CWMSDropdownDocs;
