import { UsaceBox } from "@usace/groundwork";
import {TSTable} from "@usace-watermanagement/groundwork-water";
import DocsPage from "../_docs-wrapper";

function Tables() {
  return (
    <DocsPage>
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
    </DocsPage>
  );
}

export default Tables;
