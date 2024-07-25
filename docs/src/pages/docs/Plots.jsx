import { UsaceBox } from "@usace/groundwork";
import { TSPlot, CWMSPlot } from "@usace-watermanagement/groundwork-water";
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
            "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
            "KEYS.Flow-Res Out.Inst.1Hour.0.Rev-Regi-Flowgroup",
          ]}
          office="SWT"
        />
      </UsaceBox>
    </div>
  );
}

export default Plots;
