import { Container, UsaceBox } from "@usace/groundwork";
import TSTable from "../../../../src/components/data/tables/TSTable";

function Plots() {
  return (
    <>
      <Container>
        <div className="mt-6">
          <UsaceBox title="Welcome">
            <TSTable
              queryParams={{
                office: "SWT",
                name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
              }}
              precision={2}
            />
          </UsaceBox>
        </div>
      </Container>
    </>
  );
}

export default Plots;
