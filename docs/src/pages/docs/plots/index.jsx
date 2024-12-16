import { UsaceBox, H3 } from "@usace/groundwork";
import { CWMSPlot } from "@usace-watermanagement/groundwork-water";
import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";
import PropsTable from "../../components/props-table";
import { cwmsPlotProps } from "../../../props-declarations/plots.jsx";

function Plots() {
  const plotHeight = 550;
  const dam = "KEYS";

  const timeSeries = [
    {
      id: `${dam}.Elev.Inst.1Hour.0.Ccp-Rev`,
      traceOptions: {
        name: "Pool Level",
        yaxis: "y1",
      },
    },
    {
      id: `${dam}.Flow-Res Out.Ave.1Hour.1Hour.Rev-Regi-Flowgroup`,
      traceOptions: {
        name: "Outflow",
        yaxis: "y2",
      },
    },
    {
      id: `${dam}.Flow-Res In.Ave.1Hour.1Hour.Rev-Regi-Computed`,
      traceOptions: {
        name: "Inflow",
        yaxis: "y2",
      },
    },
    {
      id: `${dam}.Precip-Inc.Total.1Hour.1Hour.Ccp-Rev`,
      traceOptions: {
        name: "Precip",
        yaxis: "y3",
      },
    },
  ];

  const locationLevels = [
    {
      id: `${dam}.Elev.Inst.0.Top of Flood`,
      traceOptions: {
        name: "Spillway",
        mode: "lines",
        type: "scatter",
        marker: {
          color: "red",
          size: "12",
        },
        line: {
          color: "red",
          width: 3,
        },
        yaxis: "y1",
        visible: "legendonly",
      },
    },
    {
      id: `${dam}.Elev.Inst.0.Top of Normal`,
      traceOptions: {
        name: "Normal Pool",
        mode: "lines",
        type: "scatter",
        marker: {
          color: "gray",
          size: "12",
        },
        line: {
          color: "gray",
          width: 3,
        },
        yaxis: "y1",
        visible: "legendonly",
      },
    },
  ];

  const layoutOptions = {
    title: {
      text: "Example",
      font: {
        family: "Arial, sans-serif",
        size: 16,
      },
    },
    height: plotHeight,
    grid: {
      columns: 1,
    },
    yaxis: {
      title: {
        text: "Pool Level (ft)",
      },
    },
    yaxis2: {
      title: {
        text: "Flow (cfs)",
      },
    },
    yaxis3: {
      title: {
        text: "Precip (in)",
      },
    },
    showlegend: true,
    legend: {
      font: {
        family: "Arial, sans-serif",
        size: 10,
      },
    },
    responsive: true,
  };

  return (
    <DocsPage
      nextUrl="/docs/tables"
      prevUrl="/docs/react-query"
      middleText="Plots"
      prevText="Return to React Query Page"
      nextText="Go to Tables Page"
    >
      <Divider text="CWMS Themed Plot - How To" className="my-8" />
      <UsaceBox title="CWMS Plot">
        <CWMSPlot
          timeSeries={timeSeries}
          locationLevels={locationLevels}
          layoutOptions={layoutOptions}
          office="SWT"
        />
      </UsaceBox>
      <Divider text="Code Example:" className="mt-8" />
      <H3>Code Example:</H3>
      <Code className="mt-8" language="jsx">
        {`import { CWMSPlot, Code } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";

export default function Example() {
  // Set a default project ID
  const [projectId, setProjectId] = useState("KEYS");
  // Alternatively you could pass a Project ID as a prop
  return (
    <div>
     {/*Set a static list for the example and map the project to the start of each TSID*/}
      <CWMSPlot
            tsids={[
              ".Elev.Inst.1Hour.0.Ccp-Rev",
              ".Elev-Tailwater.Inst.1Hour.0.Ccp-Rev",
              ".Precip-Inc.Total.1Hour.1Hour.Ccp-Rev",
              ".Flow-Res In.Ave.1Hour.1Hour.Rev-Regi-Computed",
              ".Flow-Res Out.Ave.1Hour.1Hour.Rev-Regi-Flowgroup",
              ".Stor.Inst.1Hour.0.Ccp-Rev"
            ].map(ts=>projectId+ts)}
            office="SWT"
          />
    </div>
  );
}
`}
      </Code>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component API -{" "}
        <Code className="gw-p-2" language={"jsx"}>{`<CWMSPlot tsids={[]} 
    office={null} begin={null} 
    end={null}  title={null} 
    fontSize={null} unit={null} 
    className={null} plotHeight={550} 
    autoSize={true} shapes={[]} 
    annotations={[]} responsive={true}
        />`}</Code>
      </div>
      <PropsTable propsList={cwmsPlotProps} showReq={false} />
    </DocsPage>
  );
}

export default Plots;
