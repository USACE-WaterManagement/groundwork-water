import { UsaceBox } from "@usace/groundwork";
import {TSTable} from "@usace-watermanagement/groundwork-water";
import { Code } from "../components/code";
import Divider from "../components/divider";
import DocsPage from "../docs/_docs-wrapper";

function Tables() {
  return (
    <DocsPage
    nextUrl="/docs/maps"
    prevUrl="/docs/plots"
    middleText="Tables"
    prevText="Return to Plots"
    nextText="Go to Maps Page">
    <div className="mt-6">
        <TSTable
          queryParams={{
            office: "SWT",
            name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev",
          }}
          precision={2}
        />
    </div>
    </DocsPage>
  );
}

export default Tables;
