import { useState } from "react";
import { Code, Divider, Text, UsaceBox } from "@usace/groundwork";
import { BasinPie, RadialFillChart } from "../../../../../lib";
import { Code as CodeBlock } from "../../components/code.jsx";
import DocsPage from "../_docs-wrapper";

const levels = {
  "ALFA.Stor.Inst.0.Top of Flood": [0, 220],
  "ALFA.Stor.Inst.0.Top of Conservation": [0, 160],
  "ALFA.Stor.Inst.0.Top of Inactive": [0, 40],
  "BRAV.Stor.Inst.0.Top of Flood": [0, 180],
  "BRAV.Stor.Inst.0.Top of Conservation": [0, 140],
  "BRAV.Stor.Inst.0.Top of Inactive": [0, 20],
  "CHAR.Stor.Inst.0.Top of Flood": [0, 150],
  "CHAR.Stor.Inst.0.Top of Conservation": [0, 110],
  "CHAR.Stor.Inst.0.Top of Inactive": [0, 30],
};

const timeSeries = {
  "ALFA.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [0, 72],
  "BRAV.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [0, 96],
  "CHAR.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [0, -901],
};

const radialSegments = [
  { id: "north", label: "North", weight: 120, fillRatio: 0.6 },
  { id: "south", label: "South", weight: 80, fillRatio: 0.35 },
  { id: "west", label: "West", weight: 60, fillRatio: null },
];

function BasinPieDocs() {
  const [selected, setSelected] = useState("None");

  return (
    <DocsPage
      middleText="Basin Pie"
      prevUrl="/docs/plots/cwms-plot"
      prevText="CWMS Plot"
    >
      <UsaceBox title="Basin Pie">
        <Text>
          BasinPie converts already-loaded CWMS storage levels and time-series values
          into an interactive basin storage graphic. Data fetching remains controlled by
          the consuming application.
        </Text>
        <div className="gw-mx-auto gw-max-w-3xl gw-text-center">
          <BasinPie
            id="basin-pie-example"
            projects={["ALFA", "BRAV", "CHAR"]}
            levelData={levels}
            timeSeriesData={timeSeries}
            pool="conservation"
            asOf="2026-08-07T12"
            onProjectSelect={setSelected}
          />
          <Text>Selected project: {selected}</Text>
        </div>
      </UsaceBox>

      <Divider text="Generic radial chart" className="gw-mt-8" />
      <Text className="gw-mb-3">
        RadialFillChart accepts normalized data and has no CWMS-specific behavior.
      </Text>
      <div className="gw-mx-auto gw-max-w-3xl">
        <RadialFillChart
          segments={radialSegments}
          title="Example radial fill chart"
          ariaLabel="Example radial fill chart"
        />
      </div>

      <Divider text="Usage" className="gw-mt-8" />
      <CodeBlock language="jsx">
        {`import { BasinPie } from "@usace-watermanagement/groundwork-water";

<BasinPie
  projects={["ALFA", "BRAV", "CHAR"]}
  pool="conservation"
  levelData={levelData}
  timeSeriesData={timeSeriesData}
  asOf="2026-08-07T12"
  onProjectSelect={(projectId) => navigate(\`/project/\${encodeURIComponent(projectId)}\`)}
/>`}
      </CodeBlock>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component APIs: <Code className="gw-p-2">{`<BasinPie />`}</Code> and{" "}
        <Code className="gw-p-2">{`<RadialFillChart />`}</Code>
      </div>
    </DocsPage>
  );
}

export default BasinPieDocs;
