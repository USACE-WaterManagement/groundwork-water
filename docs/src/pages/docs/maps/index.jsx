import { Button, H3 } from "@usace/groundwork";
// import { GageMap } from "@usace-watermanagement/groundwork-water";
import { OpenLayersMap } from "../../../../../lib/components/data/maps/OpenLayersMap"

import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";

import PropsTable from "../../components/props-table";
import mapProps from "../../../props-declarations/maps";
import Alert from "../../components/alert";
import { useState } from "react";

export default function Maps() {
    const [layerVisibility, setLayerVisibility] = useState({
        layer1: true, // Example layer
        layer2: false, // Example layer
    });

    return (
        <DocsPage
            prevUrl="/docs/tables"
            middleText="Maps"
            prevText="Return to Tables Page"
        >
            {" "}
            <Alert
                title="Notice"
                status="error"
                message={
                    <span>
                        This component is currently in development and is not yet ready for
                        use. But it does serve as a placeholder!
                    </span>
                }
            />
            {/* <Button onClick={() => setLayerVisibility({ layer1: !layerVisibility.layer1, layer2: !layerVisibility.layer2 })}> */}

            <div className="grid-container">
                <div className="grid-2">
                    <h1>React OpenLayers Map</h1>
                    <OpenLayersMap layerVisibility={layerVisibility} />

                </div>
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
