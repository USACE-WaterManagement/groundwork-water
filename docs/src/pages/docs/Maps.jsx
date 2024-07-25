import { H3} from "@usace/groundwork"
import { GageMap} from "@usace-watermanagement/groundwork-water";
import { Code } from "../../../../lib/components/display/text";

export default function Maps() {
  return (
    <>
    <div className="map-container">
      <GageMap className="w-50" />
    </div>
    <H3>Code Example:</H3>
    <Code className="mt-8" syntaxHighlight={true} language="jsx">
      {`import { GageMap } from "@usace-watermanagement/groundwork-water";
import { Code } from "../../../../lib/components/display/text";

export default function Maps() {
  return (
    <>
    <div className="map-container">
      <GageMap className="w-50" />
    </div>
    <Code className="mt-8" syntaxHighlight={true} language="jsx">
      {\`<GageMap className="w-50" />\`}
    </Code>
    </>
  );
}
`}
    </Code>
    </>
  );
}
