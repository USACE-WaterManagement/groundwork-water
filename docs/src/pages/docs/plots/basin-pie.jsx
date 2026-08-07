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

const fixtureTsData = {
  "ALFA.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [0, 72],
  "BRAV.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [0, 96],
};

const radialSegments = [
  { id: "north", label: "North", weight: 120, fillRatio: 0.6 },
  { id: "south", label: "South", weight: 80, fillRatio: 0.35 },
  { id: "west", label: "West", weight: 60, fillRatio: null },
];

const basinPieExample = `import { BasinPie } from "@usace-watermanagement/groundwork-water";

const levelData = {
  "ALFA.Stor.Inst.0.Top of Flood": ["2026-08-07T12:00:00Z", 220],
  "ALFA.Stor.Inst.0.Top of Conservation": ["2026-08-07T12:00:00Z", 160],
  "ALFA.Stor.Inst.0.Top of Inactive": ["2026-08-07T12:00:00Z", 40],
  "BRAV.Stor.Inst.0.Top of Flood": ["2026-08-07T12:00:00Z", 180],
  "BRAV.Stor.Inst.0.Top of Conservation": ["2026-08-07T12:00:00Z", 140],
  "BRAV.Stor.Inst.0.Top of Inactive": ["2026-08-07T12:00:00Z", 20],
  "CHAR.Stor.Inst.0.Top of Flood": ["2026-08-07T12:00:00Z", 150],
  "CHAR.Stor.Inst.0.Top of Conservation": ["2026-08-07T12:00:00Z", 110],
  "CHAR.Stor.Inst.0.Top of Inactive": ["2026-08-07T12:00:00Z", 30],
};

const tsData = {
  "ALFA.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [
    "2026-08-07T12:00:00Z",
    72,
  ],
  "BRAV.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev": [
    "2026-08-07T12:00:00Z",
    96,
  ],
  // Omitting CHAR's series renders it as a missing-storage segment.
};

<BasinPie
  projects={["ALFA", "BRAV", "CHAR"]}
  pool="conservation"
  levelData={levelData}
  tsData={tsData}
  asOf="2026-08-07T12"
  onProjectSelect={(projectId) =>
    navigate(\`/project/\${encodeURIComponent(projectId)}\`)
  }
/>`;

const basinPieFetchExample = `import { BasinPie } from "@usace-watermanagement/groundwork-water";

const projects = ["ALFA", "BRAV", "CHAR"];
const levelIds = projects.flatMap((project) => [
  \`\${project}.Stor.Inst.0.Top of Flood\`,
  \`\${project}.Stor.Inst.0.Top of Conservation\`,
  \`\${project}.Stor.Inst.0.Top of Inactive\`,
]);
const tsids = projects.map(
  (project) =>
    \`\${project}.Stor-Conservation Pool.Inst.1Hour.0.Ccp-Rev\`,
);

<BasinPie
  projects={projects}
  pool="conservation"
  office="SWT"
  levelIds={levelIds}
  tsids={tsids}
  onProjectSelect={(projectId) =>
    navigate(\`/project/\${encodeURIComponent(projectId)}\`)
  }
/>`;

const radialFillChartExample = `import { RadialFillChart } from "@usace-watermanagement/groundwork-water";

const segments = [
  { id: "north", label: "North", weight: 120, fillRatio: 0.6 },
  { id: "south", label: "South", weight: 80, fillRatio: 0.35 },
  { id: "west", label: "West", weight: 60, fillRatio: null },
];

<RadialFillChart
  segments={segments}
  title="Example radial fill chart"
  ariaLabel="Example radial fill chart"
  onSegmentSelect={(segment) => console.log(segment.id)}
/>`;

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
          the consuming application when levelData and tsData are provided. In this
          mode, no office is needed because BasinPie makes no CDA requests.
        </Text>
        <div
          className="gw-mx-auto gw-max-w-3xl gw-text-center"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <BasinPie
            id="basin-pie-example"
            projects={["ALFA", "BRAV", "CHAR"]}
            levelData={levels}
            tsData={fixtureTsData}
            pool="conservation"
            asOf="2026-08-07T12"
            onProjectSelect={setSelected}
          />
          <Text>Selected project: {selected}</Text>
        </div>
        <Text className="gw-font-bold gw-mt-4">
          Using data already loaded by the app
        </Text>
        <CodeBlock language="jsx">{basinPieExample}</CodeBlock>
        <Text className="gw-font-bold gw-mt-6">Loading identifiers from CDA</Text>
        <Text>
          Provide office, levelIds, and tsids to let BasinPie load missing datasets.
          Level IDs use CDA&apos;s level time-series endpoint; TSIDs use the standard
          time-series endpoint. The default window is the three hours ending now and can
          be overridden with begin and end.
        </Text>
        <CodeBlock language="jsx">{basinPieFetchExample}</CodeBlock>
      </UsaceBox>

      <Divider text="Generic radial chart" className="gw-mt-8" />
      <Text className="gw-mb-3">
        RadialFillChart accepts normalized data and has no CWMS-specific behavior.
      </Text>
      <div
        className="gw-mx-auto gw-max-w-3xl"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <RadialFillChart
          segments={radialSegments}
          title="Example radial fill chart"
          ariaLabel="Example radial fill chart"
        />
      </div>
      <CodeBlock language="jsx">{radialFillChartExample}</CodeBlock>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component APIs: <Code className="gw-p-2">{`<BasinPie />`}</Code> and{" "}
        <Code className="gw-p-2">{`<RadialFillChart />`}</Code>
      </div>
    </DocsPage>
  );
}

export default BasinPieDocs;
