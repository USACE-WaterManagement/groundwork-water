import { Container, UsaceBox } from "@usace/groundwork";
import  TSPlot  from "../../../../src/components/data/plots/TSPlot";

function Plots() {
  return (
    <>
      <Container>
        <div className="mt-6">
          <UsaceBox title="Welcome">
            <TSPlot
              queryParams={{
                office: "SWT",
                name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
              }}
              className="mt-8"
            />
          </UsaceBox>
        </div>
      </Container>
    </>
  );
}

export default Plots;
