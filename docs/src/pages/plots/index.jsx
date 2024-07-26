import { UsaceBox, H3 } from "@usace/groundwork";
import { TSPlot, CWMSPlot } from "@usace-watermanagement/groundwork-water";
import { Code } from "../components/code";
import Divider from "../components/divider";
import DocsPage from "../docs/_docs-wrapper";
import PropsTable from "../components/props-table";
import { cwmsPlotProps } from "../../props-declarations/plots";
// import  CWMSPlot  from "../../../../lib/components/data/plots/CWMSPlot";
function Plots() {
  return (
    <DocsPage
      nextUrl="/docs/tables"
      prevUrl="/docs/react-query"
      middleText="Plots"
      prevText="Return to React Query Page"
      nextText="Go to Tables Page"
    >
      <UsaceBox title="Generic">
        <TSPlot
          queryParams={{
            office: "SWT",
            name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
          }}
          className="mt-8"
        />
      </UsaceBox>
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
        {`import { GageMap, Code} from "@usace-watermanagement/groundwork-water";
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
        <Code className="gw-p-2" language={"jsx"}>{`<Breadcrumbs />`}</Code>
      </div>
      <PropsTable propsList={cwmsPlotProps} showReq={false} />
    </DocsPage>
  );
}

export default Plots;
