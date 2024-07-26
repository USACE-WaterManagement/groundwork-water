import { UsaceBox } from "@usace/groundwork";
import { TSPlot, CWMSPlot } from "@usace-watermanagement/groundwork-water";
import { Code } from "../components/code";
import Divider from "../components/divider";
import DocsPage from "../docs/_docs-wrapper";
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
            ".Stor.Inst.1Hour.0.Ccp-Rev"
          ].map(ts=>"KEYS"+ts)}
          office="SWT"
        />
      </UsaceBox>
    </DocsPage>
  );
}

export default Plots;
