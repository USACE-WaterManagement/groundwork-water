import { H3 } from "@usace/groundwork";
import { GageMap } from "@usace-watermanagement/groundwork-water";
import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";

export default function Maps() {
  return (
    <DocsPage
      prevUrl="/docs/maps"
      nextUrl="/docs/css"
      middleText="Maps"
      prevText="Return to Maps Page"
      nextText="Go to CSS Page"
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
    </DocsPage>
  );
}