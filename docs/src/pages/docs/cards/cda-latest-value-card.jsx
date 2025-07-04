import { Text } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { CdaLatestValueCard } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "label",
    type: "string",
    default: "tsId",
    desc: "The label/title of the card.",
  },
  {
    name: "tsId",
    type: "string",
    default: "undefined",
    desc: "The time series ID of the value to be retrieved.",
  },
  {
    name: "office",
    type: "string",
    default: "undefined",
    desc: "The office code of the data's owning office.",
  },
  {
    name: "unit",
    type: "string",
    default: "undefined",
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  {
    name: "digits",
    type: "number",
    default: 0,
    desc: "A positive number specifies the number of trailing digits to display after the decimal. A negative number specifies rounding of the integer (e.g. -1 rounds to nearest 10, -2 rounds to nearest 100 etc...)",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Additional classes to add to the card.",
  },
  {
    name: "cdaUrl",
    type: "string",
    default: "undefined",
    desc: "An alternative URL for the CDA instance if not using the default (e.g. for testing in a development environment).",
  },
  {
    name: "datum",
    type: "string",
    default: "undefined",
    desc: "Adds a string tag after the units for datum labeling.",
  },
];

function CdaLatestValueCardDocs() {
  return (
    <DocsPage middleText="CDA Latest Value Card">
      <div>
        <Text>
          {`The CDA Latest Value Card component can be used to display the most
            recent available value for a CWMS time series.`}
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div className="flex flex-wrap gap-4">
        <CdaLatestValueCard
          label="Buckhorn Outflow"
          tsId="Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp"
          office="LRL"
        />
        <CdaLatestValueCard
          label="Lock & Dam 4 Elev"
          tsId="LockDam_04.Elev.Inst.~15Minutes.0.best-MSL1912"
          office="MVP"
          digits={2}
          datum="MSL1912"
        />

        <CdaLatestValueCard
          label="Lock & Dam 4 Outflow"
          tsId="LockDam_04.Flow-Out.Inst.~15Minutes.0.best"
          office="MVP"
          digits={-2}
        />
      </div>
      <CodeBlock language="jsx">
        {`import { CdaLatestValueCard } from "@usace-watermanagement/groundwork-water";

<CdaLatestValueCard
  label="Buckhorn Outflow"
  tsId="Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp"
  office="LRL"
/>

<CdaLatestValueCard
  label="Lock & Dam 4 Elev"
  tsId="LockDam_04.Elev.Inst.~15Minutes.0.best-MSL1912"
  office="MVP"
  digits=2
  datum='MSL1912'
/>

<CdaLatestValueCard
  label="Lock & Dam 4 Outflow"
  tsId="LockDam_04.Flow-Out.Inst.~15Minutes.0.best"
  office="MVP"
  digits=-2
/>
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CdaLatestValueCard />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CdaLatestValueCardDocs };
export default CdaLatestValueCardDocs;
