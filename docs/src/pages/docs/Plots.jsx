import { Container, UsaceBox } from "@usace/groundwork";
import  TSPlot  from "../../../../src/components/data/plots/TSPlot";
import CWMSPlot from "../../../../src/components/data/plots/CWMSPlot";

function Plots() {
  return (
    <>
      <Container>
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
              tsids={["KEYS.Elev.Inst.1Hour.0.Ccp-Rev"]}
              office="SWT"
              className="mt-8"
            />
          </UsaceBox>
        </div>
      </Container>
    </>
  );
}

export default Plots;
