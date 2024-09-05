import { Skeleton, UsaceBox, H3 } from "@usace/groundwork";
import { CWMSPlot, TSPlot } from "@usace-watermanagement/groundwork-water";
import Alert from "../../components/alert";
import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";
import PropsTable from "../../components/props-table";
import {
  cwmsPlotProps,
  tsPlotProps,
} from "../../../props-declarations/plots.jsx";
import dayjs from "dayjs";
// import  CWMSPlot  from "../../../../lib/components/data/plots/CWMSPlot";
function Plots() {
  const plotHeight = 550;
  return (
    <DocsPage
      nextUrl="/docs/tables"
      prevUrl="/docs/react-query"
      middleText="Plots"
      prevText="Return to React Query Page"
      nextText="Go to Tables Page"
    >
      <UsaceBox title="Generic Timeseries Plot">
        <TSPlot
          cdaParams={{
            name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
            office: "SWT",
            begin: dayjs().subtract(30, "day").format("YYYY-MM-DDTHH:mm:ss"),
            plotHeight: plotHeight,
          }}
          loadingComponent={
            <Skeleton
              style={{ height: plotHeight }}
              className="h-full w-full"
            />
          }
          className="mt-8"
        />
      </UsaceBox>
      <Alert
        title="Note"
        status="info"
        message={
          <span>
            By default, calls to CDA via CWMSjs <b>and</b> React Query (Data
            Hooks) use the national instance at{" "}
            <a
              className="underline"
              href="https://cwms-data.usace.army.mil/cwms-data"
            >
              cwms-data.usace.army.mil
            </a>
          </span>
        }
      />
      <Divider text="Basic Plot - How To" className="my-8" />
      <H3>Code Example:</H3>
      <Code className="gw-mt-8" language="jsx">
        {`import { Skeleton } from "@usace/groundwork";
import { TSPlot, Code} from "@usace-watermanagement/groundwork-water";
import { useState } from "react";
from dayjs import dayjs;

export default function Example() {
  // Set a default project ID
  const plotHeight = 550;
  const [projectId, setProjectId] = useState("KEYS");
  // Alternatively you could pass a Project ID as a prop
  return (
    <div>
     {/*Set a static list for the example and map the project to the start of each TSID*/}
         <TSPlot
          cdaParams={{
            name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
            office: "SWT",
            begin: dayjs().subtract(30, "day").format("YYYY-MM-DDTHH:mm:ss"),
          }}
          plotHeight={plotHeight}
          loadingComponent={
            <Skeleton style={{ height: plotHeight }} className="h-full w-full" />
          }
          className="mt-8"
        />
    </div>
  );
}
`}
      </Code>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        Component API -{" "}
        <Code className="gw-p-2" language={"jsx"}>{`<TSPlot tsids={[]} 
    office={null} begin={null} 
    end={null}  title={null} 
    fontSize={null} unit={null} 
    className={null} plotHeight={550} 
    autoSize={true} shapes={[]} 
    annotations={[]} responsive={true}
        />`}</Code>
      </div>
      <PropsTable propsList={tsPlotProps} showReq={false} />
      <Divider text="CWMS Themed Plot - How To" className="my-8" />
      <UsaceBox title="CWMS Plot">
        <CWMSPlot
          tsids={[
            ".Elev.Inst.1Hour.0.Ccp-Rev",
            ".Elev-Tailwater.Inst.1Hour.0.Ccp-Rev",
            ".Precip-Inc.Total.1Hour.1Hour.Ccp-Rev",
            ".Flow-Res In.Ave.1Hour.1Hour.Rev-Regi-Computed",
            ".Flow-Res Out.Ave.1Hour.1Hour.Rev-Regi-Flowgroup",
            ".Stor.Inst.1Hour.0.Ccp-Rev",
          ].map((ts) => "KEYS" + ts)}
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
