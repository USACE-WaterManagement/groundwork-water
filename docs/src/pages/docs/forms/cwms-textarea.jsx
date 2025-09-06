import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSTextarea, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "name",
    type: "string",
    default: "undefined",
    desc: "The name attribute for the textarea.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    desc: "The controlled value of the textarea.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    desc: "The default value for the textarea when uncontrolled.",
  },
  {
    name: "rows",
    type: "number",
    default: "3",
    desc: "Number of visible text lines.",
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
    desc: "Whether the textarea is disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Whether the textarea is read-only.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    desc: "Whether the textarea is in an invalid state.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Whether the textarea field is required for form submission.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    desc: "Label text used in validation error messages.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "undefined",
    desc: "Placeholder text for the textarea.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when the textarea value changes.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles to apply to the textarea.",
  },
];

function CWMSTextareaDocs() {
  return (
    <DocsPage middleText="CWMS Textarea">
      <div>
        <Text>
          The CWMS Textarea component is a wrapper around the standard Groundwork
          Textarea component that integrates with CWMS forms for multi-line text input
          and data submission.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <div className="flex flex-col gap-4">
        <CWMSForm office="SWT">
          <CWMSTextarea
            name="basic-textarea"
            rows={4}
            defaultValue="Default text content"
          />
          <CWMSTextarea
            name="notes-textarea"
            rows={6}
            placeholder="Enter your notes here..."
          />
          <CWMSTextarea
            name="readonly-textarea"
            rows={3}
            defaultValue="This is a read-only textarea"
            readonly={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`import { CWMSTextarea } from "@usace-watermanagement/groundwork-water";

<CWMSTextarea
  name="basic-textarea"
  rows={4}
  defaultValue="Default text content"
/>

<CWMSTextarea
  name="notes-textarea"
  rows={6}
  placeholder="Enter your notes here..."
/>

<CWMSTextarea
  name="readonly-textarea"
  rows={3}
  defaultValue="This is a read-only textarea"
  readonly={true}
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a CWMSForm, CWMSTextarea automatically registers with the form
        context for data collection and submission to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSTextarea } from "@usace-watermanagement/groundwork-water";
import { CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSTextarea
    name="observation-notes"
    tsid="LOCATION.Notes.Inst.0.0.TEXT"
    rows={5}
    placeholder="Enter observation notes..."
  />
  <CWMSTextarea
    name="maintenance-log"
    tsid="LOCATION.Maintenance.Inst.0.0.TEXT"
    rows={8}
    placeholder="Maintenance activities..."
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With Custom Styling" className="mt-8" />
      <div className="flex flex-col gap-4">
        <CWMSForm office="SWT">
          <CWMSTextarea
            name="styled-textarea"
            rows={4}
            placeholder="Custom styled textarea"
            style={{
              backgroundColor: "#fffacd",
              border: "2px dashed #ff6347",
              padding: "12px",
              borderRadius: "10px",
              fontFamily: "monospace",
            }}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSTextarea
  name="styled-textarea"
  rows={4}
  placeholder="Custom styled textarea"
  style={{ 
    backgroundColor: "#fffacd", 
    border: "2px dashed #ff6347",
    padding: "12px",
    borderRadius: "10px",
    fontFamily: "monospace"
  }}
/>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSTextarea />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CWMSTextareaDocs };
export default CWMSTextareaDocs;
