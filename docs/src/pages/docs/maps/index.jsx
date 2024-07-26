import { H3 } from "@usace/groundwork";
import { GageMap } from "@usace-watermanagement/groundwork-water";
import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";

import PropsTable from "../../components/props-table";
import mapProps from "../../../props-declarations/maps";

export default function Maps() {
  return (
    <DocsPage
      prevUrl="/docs/tables"
      middleText="Maps"
      prevText="Return to Tables Page"
    >
      {" "}
      <div className="map-container">
        <GageMap className="w-50" />
      </div>
      <Divider text="Code Example:" className="mt-8" />
      <H3>Code Example:</H3>
      <Code className="mt-8" language="jsx">
        {`import { GageMap, Code} from "@usace-watermanagement/groundwork-water";

export default function Maps() {
  return (
    <>
    <div className="map-container">
      <GageMap className="w-50" />
    </div>
    <Code className="mt-8" language="jsx">
      {\`<GageMap className="w-50" />\`}
    </Code>
    </>
  );
}
`}
      </Code>
      <div className="gw-font-bold gw-text-lg gw-pt-6">
        CWMSPlot Parameters API -{" "}
        <Code className="gw-p-2" language={"jsx"}>{`<Maps />`}</Code>
      </div>
      <PropsTable enableCopy={false} propsList={mapProps} showReq={false} />
    </DocsPage>
  );
}
