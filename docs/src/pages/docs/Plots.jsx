import { UsaceBox } from "@usace/groundwork";
import { TSPlot, CWMSPlot } from "@usace-watermanagement/groundwork-water";
// import  CWMSPlot  from "../../../../lib/components/data/plots/CWMSPlot";
function Plots() {
  return (
    <div className="mt-6">
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
    </div>
  );
}

export default Plots;
