import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSInput, FormWrapper } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "name",
    type: "string",
    default: "undefined",
    desc: "The name attribute for the input field.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    desc: "The controlled value of the input.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    desc: "The default value for the input when uncontrolled.",
  },
  {
    name: "type",
    type: "string",
    default: "text",
    desc: "The input type (text, number, email, password, etc.).",
  },
  {
    name: "placeholder",
    type: "string",
    default: "undefined",
    desc: "Placeholder text for the input.",
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
    name: "offset",
    type: "number",
    default: "0",
    desc: "Time offset in seconds for data timestamps.",
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
    desc: "Whether the input is disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Whether the input is read-only.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    desc: "Whether the input is in an invalid state.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when the input value changes.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles to apply to the input.",
  },
];

function CWMSInputDocs() {
  return (
    <DocsPage middleText="CWMS Input">
      <div>
        <Text>
          The CWMS Input component is a wrapper around the standard Groundwork
          Input component that integrates with CWMS forms for data collection
          and submission. It supports various input types and can be associated
          with CWMS time series data.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <FormWrapper office="SWT">
        <div className="flex flex-col gap-4">
          <CWMSInput name="basic-input" placeholder="Enter a value" />
          <CWMSInput
            name="number-input"
            type="number"
            placeholder="Enter a number"
            precision={2}
          />
          <CWMSInput
            name="disabled-input"
            defaultValue="Disabled input"
            disable={true}
          />
        </div>
      </FormWrapper>

      <CodeBlock language="jsx">
        {`import { CWMSInput } from "@usace-watermanagement/groundwork-water";

<CWMSInput
  name="basic-input"
  placeholder="Enter a value"
/>

<CWMSInput
  name="number-input"
  type="number"
  placeholder="Enter a number"
  precision={2}
/>

<CWMSInput
  name="disabled-input"
  defaultValue="Disabled input"
  disable={true}
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a FormWrapper, CWMSInput automatically registers with
        the form context for data collection and submission to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSInput } from "@usace-watermanagement/groundwork-water";
import { FormWrapper } from "@usace-watermanagement/groundwork-water";

<FormWrapper office="SWT" cdaUrl="https://water.usace.army.mil/cwms-data">
  <CWMSInput
    name="stage-input"
    tsid="LOCATION.Stage.Inst.0.0.USGS-raw"
    type="number"
    placeholder="Enter stage value"
    precision={2}
    units="ft"
  />
  <CWMSInput
    name="flow-input"
    tsid="LOCATION.Flow.Inst.0.0.USGS-raw"
    type="number"
    placeholder="Enter flow value"
    precision={0}
    units="cfs"
  />
</FormWrapper>`}
      </CodeBlock>

      <Divider text="With Custom Styling" className="mt-8" />
      <FormWrapper office="SWT">
        <div className="flex flex-col gap-4">
          <CWMSInput
            name="styled-input"
            placeholder="Custom styled input"
            style={{
              backgroundColor: "#f0f8ff",
              border: "2px solid #4169e1",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      </FormWrapper>

      <CodeBlock language="jsx">
        {`<CWMSInput
  name="styled-input"
  placeholder="Custom styled input"
  style={{ 
    backgroundColor: "#f0f8ff", 
    border: "2px solid #4169e1",
    padding: "10px",
    borderRadius: "8px"
  }}
/>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSInput />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSInputDocs };
export default CWMSInputDocs;
