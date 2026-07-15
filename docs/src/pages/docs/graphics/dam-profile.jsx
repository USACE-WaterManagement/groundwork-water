import { UsaceBox, Code, H3, Text, Badge } from "@usace/groundwork";
import { DamProfile } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code.jsx";
import Divider from "../../components/divider.jsx";
import DocsPage from "../_docs-wrapper.jsx";
import PropsTable from "../../components/props-table.jsx";
import chartProps from "../../../props-declarations/chart.jsx";

function DamProfileDocs() {
  return (
    <DocsPage middleText="Dam Profile">
      <UsaceBox title="Dam Profile">
        <Text>
          The Dam Profile is a graphic for displaying current levels and timeseries
          values of a project.
        </Text>
        <Text className="mt-2">
          The graphic intakes an object of values and renders the chart.
        </Text>
      </UsaceBox>
      <Divider text="Example" className="mt-8" />
      <div className="h-vh border border-red-500">
        <DamProfile
          info={{
            damBottom: 820,
            damTop: 913,
            gradientBottom: 901,
            gradientTop: 888,
            inflow: 0,
            infoText: "Alum Creek Lake",
            latestTime: "2026-05-22T13:45:00Z",
            levels: [
              { name: "Streambed", value: 820 },
              { name: "Top of Dam", value: 913 },
              { name: "Top of Flood", value: 901 },
              { name: "Top of Inactive", value: 835 },
              { name: "Guide Curve", value: 900 },
            ],
            outflow: 519.58,
            pool: 888.81,
            powerGeneration: 15.21,
            surcharge: 101,
            tail: 3.28,
            precip: 2.3,
            outflowTotals: [
              { name: "Turbine Total", value: 400 },
              { name: "Gated Total", value: 18.58 },
              { name: "Surcharge Release", value: 101 },
            ],
          }}
        />
      </div>
      <CodeBlock className="mt-8" language="jsx">
        {`import { DamProfile } from "@usace-watermanagement/groundwork-water";

        <DamProfile 
          info={{
            damBottom: 820,
            damTop: 913,
            gradientBottom: 901,
            gradientTop: 888,
            inflow: 0,
            infoText: "Alum Creek Lake",
            latestTime: "2026-05-22T13:45:00Z",
            levels:[
              {name: "Streambed", value: 820},
              {name: "Top of Dam", value: 913},
              {name: "Top of Flood", value: 901},
              {name: "Top of Inactive", value: 835},
              {name: "Guide Curve", value: 900},
            ],
            outflow: 519.58,
            pool: 888.81,
            powerGeneration: 15.21,
            surcharge: 101,
            tail: 3.28,
            precip: 2.3,
            outflowTotals: [
              {name: "Turbine Total", value: 400}, 
              {name: "Gated Total", value: 18.58}, 
              {name: "Surcharge Release", value: 101}
            ],
          }}
      />
`}
      </CodeBlock>
      <Divider text="Precision" className="mt-8" />

      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component API - <Code className="gw-p-2">{`<CWMSPlot />`}</Code>
      </div>
      <PropsTable propsList={chartProps} showReq={false} />
    </DocsPage>
  );
}

export default DamProfileDocs;
