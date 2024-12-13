import { useState } from "react";
import { TSTable } from "@usace-watermanagement/groundwork-water";
// import TSTable from "../../../../../lib/components/data/tables/TSTable";

import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";
import ParamsTable from "../../components/params-table";
import { tsTableParams } from "../../../props-declarations/tables.jsx";
import dayjs from "dayjs";
import { cdaTSHookParams } from "../../../props-declarations/data-hooks";

function Tables() {
  const LOOKBACK_HOURS = 24;
  const [tsid, setTsid] = useState("KEYS.Elev.Inst.1Hour.0.Ccp-Rev");

  return (
    <DocsPage
      nextUrl="/docs/maps"
      prevUrl="/docs/plots"
      middleText="Tables"
      prevText="Return to Plots"
      nextText="Go to Maps Page"
    >
      <div className="mt-6">
        <TSTable
          title="Simple TimeSeries Table"
          cdaParams={{
            office: "SWT",
            name: tsid,
            begin: dayjs()
              .subtract(LOOKBACK_HOURS, "hours")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
          }}
          subTitle={`Looking back ${LOOKBACK_HOURS} hours for\n${tsid}`}
          heading={["Date-Time", "Value", "Quality Code"]}
          order="desc"
          precision={2}
          dateFormat="MM-DD-YYYY HH:mm"
        />
      </div>

      <Divider text="Code Example:" className="mt-8" />
      <div className="mt-8">
        <Code className="mt-8" language="jsx">
          {`import dayjs from "dayjs";
import { TSTable } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";
default export function Example() {
    const LOOKBACK_HOURS = 24;
    const [tsid, setTsid] = useState("KEYS.Elev.Inst.1Hour.0.Ccp-Rev");

    return (
    <TSTable
        title="Simple TimeSeries Table"
        cdaParams={{
        office: "SWT",
        name: tsid,
        begin: dayjs()
            .subtract(LOOKBACK_HOURS, "hours")
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        }}
        subTitle={\`Looking back $\{LOOKBACK_HOURS} hours for\n$\{tsid}\`}
        heading={["Date-Time", "Value", "Quality Code"]}
        order="desc"
        precision={2}
        dateFormat="MM-DD-YYYY HH:mm"
    />
    );
} 
`}
        </Code>
      </div>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Table Hook Parameters
        <Code
          enableCopy={false}
          className="p-2"
          language="jsx"
        >{`<TSTable precision={2} title="Title" subTitle="Subtitle" heading={["Heading1", "Heading2"]} order="asc" dateFormat="MM-DD-YYYY HH:mm"/>`}</Code>
      </div>
      <ParamsTable paramsList={tsTableParams} showReq={false} />
      <div className="font-bold text-lg pt-6">
        cdaParams
        <Code
          enableCopy={false}
          className="p-2"
          language="jsx"
        >{`<TSTable cdaParams={{name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev"}}/>`}</Code>
      </div>
      <ParamsTable paramsList={cdaTSHookParams} />
    </DocsPage>
  );
}

export default Tables;
