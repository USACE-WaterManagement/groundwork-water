import { CWMSTable, TSTable } from "@usace-watermanagement/groundwork-water";
// import TSTable from "../../../../../lib/components/data/tables/TSTable";

import { Code } from "../../components/code";
import Divider from "../../components/divider";
import DocsPage from "../_docs-wrapper";
import ParamsTable from "../../components/params-table";
import {
  tsTableParams,
  cwmsTableParams,
  timeseriesParams,
} from "../../../props-declarations/tables.jsx";
import dayjs from "dayjs";
import { cdaTSHookParams } from "../../../props-declarations/data-hooks";
import { Badge, Text, UsaceBox } from "@usace/groundwork";
import CdaParamsTable from "../../components/cda-params-table.jsx";

const preloadedTimeseriesParams = [
  {
    tsid: "DEMO.Stage.Inst.1Hour.0.Observed",
    header: "Stage (ft)",
    precision: 2,
  },
  {
    tsid: "DEMO.Flow.Inst.1Hour.0.Observed",
    header: "Flow (cfs)",
    precision: 0,
  },
];

const preloadedTimeSeries = [
  {
    name: "DEMO.Stage.Inst.1Hour.0.Observed",
    units: "ft",
    values: [
      [Date.parse("2026-08-18T08:00:00-05:00"), 12.34, 0],
      [Date.parse("2026-08-18T09:00:00-05:00"), 12.41, 0],
      [Date.parse("2026-08-18T10:00:00-05:00"), 12.47, 0],
    ],
  },
  {
    name: "DEMO.Flow.Inst.1Hour.0.Observed",
    units: "cfs",
    values: [
      [Date.parse("2026-08-18T08:00:00-05:00"), 842, 0],
      [Date.parse("2026-08-18T09:00:00-05:00"), 875, 0],
      [Date.parse("2026-08-18T10:00:00-05:00"), 901, 0],
    ],
  },
];

function Tables() {
  const LOOKBACK_HOURS = 24;
  const tsid = "KEYS.Elev.Inst.1Hour.0.Ccp-Rev";
  const dateRange = {
    start: dayjs().subtract(LOOKBACK_HOURS, "hours"),
    end: dayjs(),
  };
  const datum = "NGVD29";

  const cdaParams = {
    begin: dateRange.start.format("YYYY-MM-DDTHH:mm:ssZZ"),
    end: dateRange.end.format("YYYY-MM-DDTHH:mm:ssZZ"),
    office: "NAE",
    unit: "EN",
  };

  const tableTimeseriesParams = [
    {
      tsid: "SHB.Stage-OCEAN.Inst.30Minutes.0.DCP-rev",
      header: `SHB.Stage-Ocean (ft ${datum})`,
      precision: 2,
    },
    {
      tsid: "SHB.Stage-Pred.Inst.0.0.DCP-rev",
      header: (
        <>
          SHB.Stage-Ocean <br /> (ft {datum})
        </>
      ),
      precision: 2,
    },
    {
      tsid: "SHB.Temp-Air.Inst.30Minutes.0.DCP-rev",
      header: "SHB.Temp-Air (F)",
      precision: 0,
    },
  ];

  return (
    <DocsPage
      nextUrl="/docs/maps"
      prevUrl="/docs/plots"
      middleText="Tables"
      prevText="Return to Plots"
      nextText="Go to Maps Page"
    >
      <UsaceBox title="CWMS Table">
        <Text>
          The CWMS Table is a generic table for displaying one or more timeseries
          containing CWMS Data.
        </Text>
        <Text className="mt-2">
          This table handles the nuts and bolts of data retrieval for the user, allowing
          for multiple CWMS data sets to be tabulated by providing only the time series,
          office, and other necessary parameters.
        </Text>

        <CWMSTable
          begin={cdaParams.begin}
          end={cdaParams.end}
          office={cdaParams.office}
          timeseriesParams={tableTimeseriesParams}
          interval={5}
          snapTopOfInterval={true}
          missingString="---"
          sortAscending={false}
          tableOptions={{ maxHeight: "45vh", className: "gw-mt-4" }}
        />
        <Divider text="Use Pre-Fetched Data" className="mt-8" />
        <Text>
          To render data you already have, pass CDA-compatible time-series responses to
          <code className="font-bold"> inputTSValues</code>. Each
          <code className="font-bold"> timeseriesParams[].tsid</code> must match a
          supplied series <code className="font-bold">name</code>. The value tuples
          begin with a Unix timestamp in milliseconds and a value; quality codes and
          other CDA metadata may follow.
        </Text>
        <Text className="mt-2">
          When <code className="font-bold">inputTSValues</code> is supplied, the table
          does not make CDA requests, so <code className="font-bold">office</code>,
          <code className="font-bold"> begin</code>, and
          <code className="font-bold"> end</code> are not required.
        </Text>
        <CWMSTable
          timeseriesParams={preloadedTimeseriesParams}
          inputTSValues={preloadedTimeSeries}
          dateFormat="MMM D, YYYY h:mm A"
          tableOptions={{ maxHeight: "24rem", className: "gw-mt-4" }}
        />
        <Code className="mt-4" language="jsx">
          {`const timeseriesParams = [
  {
    tsid: "DEMO.Stage.Inst.1Hour.0.Observed",
    header: "Stage (ft)",
    precision: 2,
  },
  {
    tsid: "DEMO.Flow.Inst.1Hour.0.Observed",
    header: "Flow (cfs)",
    precision: 0,
  },
];

const inputTSValues = [
  {
    name: "DEMO.Stage.Inst.1Hour.0.Observed",
    units: "ft",
    values: [
      [Date.parse("2026-08-18T08:00:00-05:00"), 12.34, 0],
      [Date.parse("2026-08-18T09:00:00-05:00"), 12.41, 0],
      [Date.parse("2026-08-18T10:00:00-05:00"), 12.47, 0],
    ],
  },
  {
    name: "DEMO.Flow.Inst.1Hour.0.Observed",
    units: "cfs",
    values: [
      [Date.parse("2026-08-18T08:00:00-05:00"), 842, 0],
      [Date.parse("2026-08-18T09:00:00-05:00"), 875, 0],
      [Date.parse("2026-08-18T10:00:00-05:00"), 901, 0],
    ],
  },
];

<CWMSTable
  timeseriesParams={timeseriesParams}
  inputTSValues={inputTSValues}
  dateFormat="MMM D, YYYY h:mm A"
/>`}
        </Code>
        <Divider text="Header Line Breaks" className="mt-8" />
        <Text className="mb-2">
          The header for the table can be set to an HTML tag or component with line
          breaks.
        </Text>
        <Code enableCopy={false} className="p-2 mb-2" language="jsx">
          {`// For example:
const datum = "NGVD29";
const tableTimeseriesParams = [
    {
      tsid: "SHB.Stage-OCEAN.Inst.30Minutes.0.DCP-rev",
      header: <>SHB.Stage-Ocean <br /> (ft {datum})</>,
      precision: 2,
    }
]`}
        </Code>
        <Badge color="blue" className="mb-2">
          Note: Using &quot;\n&quot; will NOT create a line break in the header.
        </Badge>
        <Divider text="Code Example:" className="mt-8" />
        <div className="mt-8">
          <Code className="mt-8" language="jsx">
            {`import dayjs from "dayjs";
import { CWMSTable } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";
default export function Example() {
  // Sets the initial to midnight today (start of day)
  const [dateRange, setDateRange] = useState({
    start: dayjs().startOf("day"),
    end: dayjs(),
  });

  // Explicitly define a default datum
  const [datum, setDatum] = useState("NGVD29");
  const cdaParams = {
    begin: dateRange.start.format("YYYY-MM-DDTHH:mm:ssZZ"),
    end: dateRange.end.format("YYYY-MM-DDTHH:mm:ssZZ"),
    office: "NAE",
    unit: "EN",
  };

  const tableTimeseriesParams = [
    {
      tsid: "SHB.Stage-OCEAN.Inst.30Minutes.0.DCP-rev",
      header: \`SHB.Stage-Ocean (ft ${datum})\`,
      precision: 2,
    },
    {
      tsid: "SHB.Stage-Pred.Inst.0.0.DCP-rev",
      header: \`SHB.Stage-Pred (ft ${datum})\`,
      precision: 2,
    },
    {
      tsid: "SHB.Temp-Air.Inst.30Minutes.0.DCP-rev",
      header: "SHB.Temp-Air (F)",
      precision: 0,
    },
  ];
    const LOOKBACK_HOURS = 24;
    const [tsid, setTsid] = useState("KEYS.Elev.Inst.1Hour.0.Ccp-Rev");

    return (
      <CWMSTable
          begin={cdaParams.begin}
          end={cdaParams.end}
          office={cdaParams.office}
          timeseriesParams={tableTimeseriesParams}
          interval={5}
          snapTopOfInterval={true}
          missingString="---"
          sortAscending={false}
          tableOptions={{ maxHeight: "65vh", className: "gw-mt-4" }}
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
          >{`<CWMSTable ... />`}</Code>
        </div>
        <ParamsTable paramsList={cwmsTableParams} showReq={true} />
        <div className="font-bold text-lg pt-6">
          timeseriesParams -{" "}
          <em className="text-sm font-normal">
            Array of timeseries objects seen below
          </em>
          <Code
            enableCopy={false}
            className="p-2"
            language="jsx"
          >{`<CWMSTable timeseriesParams={ [{tsid: "SHB.Stage-OCEAN.Inst.30Minutes.0.DCP-rev"}] } />`}</Code>
        </div>
        <ParamsTable paramsList={timeseriesParams} showReq={true} />

        <Badge color="blue" className="mt-2 text-[0.9em]">
          <b>Precision</b> is determined based on the units provided by CDA for each
          Time Series. They are overrode by the &quot;precision&quot; property in the
          timeseriesParams object for each Time Series.
        </Badge>
        <div className="font-bold text-lg pt-6">
          cdaParams
          <Code
            enableCopy={false}
            className="p-2"
            language="jsx"
          >{`<CWMSTable cdaParams={{name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev"}} />`}</Code>
        </div>
        <CdaParamsTable
          requestObject="TimeSeries"
          requestType="GET"
          cwmsJsType="GetTimeSeriesRequest"
        />
      </UsaceBox>
      <Divider text="More Generic TimeSeries Table" className="my-8" />
      <UsaceBox title="TSTable">
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
        <div className="mt-8  w-3/4">
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
          <Code enableCopy={false} className="p-2" language="jsx">{`<TSTable 
  precision={2} 
  title="Title" 
  subTitle="Subtitle"
  heading={["Heading1", "Heading2"]} 
  order="asc" 
  dateFormat="MM-DD-YYYY HH:mm" 
  />`}</Code>
        </div>
        <ParamsTable paramsList={tsTableParams} showReq={false} />
        <div className="font-bold text-lg pt-6">
          cdaParams
          <Code
            enableCopy={false}
            className="p-2"
            language="jsx"
          >{`<TSTable cdaParams={{name: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev"}} office="SWT" />`}</Code>
        </div>
        <ParamsTable paramsList={cdaTSHookParams} />
        <CdaParamsTable
          requestObject="TimeSeries"
          requestType="GET"
          cwmsJsType="GetTimeSeriesRequest"
        />
      </UsaceBox>
    </DocsPage>
  );
}

export default Tables;
