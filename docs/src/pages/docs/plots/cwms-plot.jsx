import { UsaceBox, Code, H3, Text } from "@usace/groundwork";
import { CWMSPlot } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code.jsx";
import Divider from "../../components/divider.jsx";
import DocsPage from "../_docs-wrapper.jsx";
import PropsTable from "../../components/props-table.jsx";
import {
  cwmsPlotProps,
  traceDataProps,
} from "../../../props-declarations/plots.jsx";

const CWMSPlotExample = () => {
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
      units: "ft",
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
      units: "ft",
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
    height: plotHeight,
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
    <CWMSPlot
      timeSeries={timeSeries}
      locationLevels={locationLevels}
      layoutOptions={layoutOptions}
      unit="EN"
      office="SWT"
    />
  );
};

function CWMSPlotDocs() {
  return (
    <DocsPage middleText="CWMS Plot">
      <UsaceBox title="CWMS Plot">
        <Text>
          The CWMS Plot is a generic plot for displaying time series and
          location level data from CWMS.
        </Text>
        <Text className="mt-2">
          This plot handles the nuts and bolts of data retrieval for the user,
          allowing for multiple CWMS data sets to be plotted by providing only
          the time series or location level ID.
        </Text>
        <Text className="mt-2">
          All Plotly trace and layout options are exposed to the user, allowing
          for full customization of the appearance of the plot. Reasonable
          defaults are used if specific options are not provided.
        </Text>
      </UsaceBox>
      <Divider text="Example" className="mt-8" />
      <CWMSPlotExample />
      <CodeBlock className="mt-8" language="jsx">
        {`import { CWMSPlot } from "@usace-watermanagement/groundwork-water";

const CWMSPlotExample = () => {
  const plotHeight = 550;
  const dam = "KEYS";

  const timeSeries = [
    {
      id: \`\${dam}.Elev.Inst.1Hour.0.Ccp-Rev\`,
      traceOptions: {
        name: "Pool Level",
        yaxis: "y1",
      },
    },
    {
      id: \`\${dam}.Flow-Res Out.Ave.1Hour.1Hour.Rev-Regi-Flowgroup\`,
      traceOptions: {
        name: "Outflow",
        yaxis: "y2",
      },
    },
    {
      id: \`\${dam}.Flow-Res In.Ave.1Hour.1Hour.Rev-Regi-Computed\`,
      traceOptions: {
        name: "Inflow",
        yaxis: "y2",
      },
    },
    {
      id: \`\${dam}.Precip-Inc.Total.1Hour.1Hour.Ccp-Rev\`,
      traceOptions: {
        name: "Precip",
        yaxis: "y3",
      },
    },
  ];

  const locationLevels = [
    {
      id: \`\${dam}.Elev.Inst.0.Top of Flood\`,
      units: "ft",
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
      id: \`\${dam}.Elev.Inst.0.Top of Normal\`,
      units: "ft",
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
    height: plotHeight,
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
    <CWMSPlot
      timeSeries={timeSeries}
      locationLevels={locationLevels}
      layoutOptions={layoutOptions}
      unit="EN"
      office="SWT"
    />
  );
}
`}
      </CodeBlock>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component API - <Code className="gw-p-2">{`<CWMSPlot />`}</Code>
      </div>
      <PropsTable propsList={cwmsPlotProps} showReq={false} />
      <div className="gw-font-bold gw-text-lg gw-pt-6">TraceData</div>
      <PropsTable propsList={traceDataProps} showReq={false} />
    </DocsPage>
  );
}

export default CWMSPlotDocs;
