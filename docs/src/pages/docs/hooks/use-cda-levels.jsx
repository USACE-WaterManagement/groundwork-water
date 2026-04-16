import { Badge, Card, Link, Skeleton, Text } from "@usace/groundwork";
import CdaParamsTable from "../../components/cda-params-table";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { Code as CodeBlock } from "../../components/code";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { useCdaLevels } from "@usace-watermanagement/groundwork-water";
import dayjs from "dayjs";
import ParamsTable from "../../components/params-table";

const BASE_URL = import.meta.env.BASE_URL;

const cdaParams = [
  {
    name: "levelId",
    type: "string",
    required: true,
    desc: "Specifies the requested location level. I.E. 'KEYS.Elev.Inst.0.Top of Flood'.",
  },
  {
    name: "office",
    type: "string",
    required: true,
    desc: "Specifies the office of the Location Level to be returned. I.E. 'SWT'.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Desired unit for the values retrieved.",
  },
  {
    name: "begin",
    type: "string",
    required: false,
    desc: "Specifies the start of the time window for data to be included in the response. If this field is not specified, any required time window begins 24 hours prior to the specified or default end time. The format for this field is ISO 8601 extended, with optional offset and timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-07:00'.",
  },
  {
    name: "end",
    type: "string",
    required: false,
    desc: "Specifies the end of the time window for data to be included in the response. If this field is not specified, any required time window ends at the current time. The format for this field is ISO 8601 extended, with optional timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-07:00'.",
  },
  {
    name: "interval",
    type: "string",
    required: false,
    desc: "Interval time step for the returned time series. Pseudo-regular interval definitions will be treated like local regular. Irregular interval will generate daily time steps. Default: 0",
  },
  {
    name: "timezone",
    type: "string",
    required: false,
    desc: "Specifies the timezone for the response. If this field is not specified, the default timezone is used. The format for this field is IANA Time Zone Database format, e.g., 'America/New_York'.",
  },
];

function UseCdaLevels() {
  const TOI = useCdaLevels({
    cdaParams: {
      levelId: "KEYS.Elev.Inst.0.Top of Inactive",
      office: "SWT",
      unit: "ft",
    },
    queryOptions: {
      staleTime: 24 * 60 * 60 * 1000, // 1 day
    },
  });
  const TOF = useCdaLevels({
    cdaParams: {
      levelId: "KEYS.Elev.Inst.0.Top of Flood",
      office: "SWT",
      unit: "ft",
    },
    queryOptions: {
      staleTime: 24 * 60 * 60 * 1000, // 1 day
    },
  });
  const TOC = useCdaLevels({
    cdaParams: {
      levelId: "KEYS.Elev.Inst.0.Top of Conservation",
      office: "SWT",
      unit: "ft",
    },
    queryOptions: {
      staleTime: 24 * 60 * 60 * 1000, // 1 day
    },
  });
  const isError = TOI.isError || TOF.isError || TOC.isError;
  const isLoading = TOI.isLoading || TOF.isLoading || TOC.isLoading;

  return (
    <DocsPage middleText="CDA Catalog Hook">
      <div>
        <Text className="my-2">
          {" "}
          The useCdaLevels hook retrieves levels data for specified levels in CDA. It
          handles seasonal and constant levels.
        </Text>
        <Text>
          The useCdaLevels hook (and endpoint) returns it in the same format as the
          TimeSeries endpoint. If you are wanting to use levels in plots please see the{" "}
          <Code>locationLevels</Code> prop on{" "}
          <Link href={`${BASE_URL}#/docs/plots/cwms-plot`} className="underline">
            CWMSPlot
          </Link>
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <div>
        {isLoading ? (
          <div className="flex flex-col items-left">
            <Skeleton className="w-1/3 h-8 mb-2" />
            <Skeleton className="w-1/3 h-8 mb-2" />
            <Skeleton className="w-1/3 h-8 mb-2" />
          </div>
        ) : isError ? (
          <Badge color="red" className="mb-2">
            Error: {TOI.error?.message || TOF.error?.message || TOC.error?.message}
          </Badge>
        ) : (
          <Card className="p-4 w-2/5">
            {isLoading ? (
              <div className="flex flex-col items-left">
                <Skeleton className="w-1/3 h-8 mb-2" />
                <Skeleton className="w-1/3 h-8 mb-2" />
                <Skeleton className="w-1/3 h-8 mb-2" />
              </div>
            ) : isError ? (
              <Badge color="red" className="mb-2">
                Error: {TOI.error?.message || TOF.error?.message || TOC.error?.message}
              </Badge>
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="font-bold me-2">Top of Inactive:</span>
                  {TOI.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                  {dayjs(TOI.data?.values.at(-1)[0]).format("MM/DD/YYYY h:mm A")}
                </p>
                <p>
                  <span className="font-bold me-2">Top of Conservation:</span>
                  {TOC.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                  {dayjs(TOC.data?.values.at(-1)[0]).format("MM/DD/YYYY h:mm A")}
                </p>
                <p>
                  <span className="font-bold me-2">Top of Flood:</span>
                  {TOF.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                  {dayjs(TOF.data?.values.at(-1)[0]).format("MM/DD/YYYY h:mm A")}
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
      <Text className="mt-4">
        The example above shows how to use the <Code>useCdaLevels</Code> hook to
        retrieve the latest values for three levels: Top of Inactive, Top of
        Conservation, and Top of Flood. The hook takes a <Code>cdaParams</Code>
        object that specifies the level ID, office, and unit. The{" "}
        <Code>queryOptions</Code>
        object allows you to set options like <Code>staleTime</Code> to control how
        often the data is refetched. In this example, we set a stale time of 24 hours (1
        day) to avoid unnecessary refetching of data.
      </Text>
      <CodeBlock language="jsx">
        {`import { Card, Badge, Skeleton } from "@usace/groundwork";
import dayjs from "dayjs"; // Requires \`npm install dayjs\` 
import { useCdaLevels } from "@usace-watermanagement/groundwork-water";

{/* Basic example with some error handling and loading states */}
function UseCdaLevelsExample() {
    const TOI = useCdaLevels({
        cdaParams: {
            levelId: "KEYS.Elev.Inst.0.Top of Inactive",
            office: "SWT",
            unit: "ft",
        },
        // Set a stale time (before refetching data)
        queryOptions: {
            staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        },
    });
    const TOF = useCdaLevels({
        cdaParams: {
            levelId: "KEYS.Elev.Inst.0.Top of Flood",
            office: "SWT",
            unit: "ft",
        },
        queryOptions: {
            staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        },
    });
    const TOC = useCdaLevels({
        cdaParams: {
            levelId: "KEYS.Elev.Inst.0.Top of Conservation",
            office: "SWT",
            unit: "ft",
        },
        queryOptions: {
            staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        },
    });
    const isError = TOI.isError || TOF.isError || TOC.isError;
    const isLoading = TOI.isLoading || TOF.isLoading || TOC.isLoading;
    return (
        <Card className="p-4 w-2/5">
            {isLoading ? (
                <div className="flex flex-col items-left">
                    {/* Placeholder skeletons for each loading state */}
                    <Skeleton className="w-1/3 h-8 mb-2" />
                    <Skeleton className="w-1/3 h-8 mb-2" />
                    <Skeleton className="w-1/3 h-8 mb-2" />
                </div>
            ) : isError ? (
                <Badge color="red" className="mb-2">
                {/* Handle error messages for each hook */}
                Error:{" "}
                {TOI.error?.message || TOF.error?.message || TOC.error?.message}
                </Badge>
            ) : (
            <div className="space-y-2">
                {/* Display the latest values for each level */}
                <p>
                    <span className="font-bold me-2">Top of Inactive:</span>
                    {/* .at(-1) returns the last element in the array, 
                        [1] grabs the value from the 2d array CDA TS return */}
                    {TOI.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                    {dayjs(TOI.data?.values.at(-1)[0]).format(
                    "MM/DD/YYYY h:mm A"
                    )}
                </p>
                <p>
                    <span className="font-bold me-2">Top of Conservation:</span>
                    {TOC.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                    {dayjs(TOC.data?.values.at(-1)[0]).format(
                    "MM/DD/YYYY h:mm A"
                    )}
                </p>
                <p>
                    <span className="font-bold me-2">Top of Flood:</span>
                    {TOF.data?.values.at(-1)[1]?.toFixed(2)} ft as of{" "}
                    {dayjs(TOF.data?.values.at(-1)[0]).format(
                    "MM/DD/YYYY h:mm A"
                    )}
                </p>
            </div>
            )}
        </Card>
    );
}
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Hook Parameters -{" "}
        <Code className="p-2">{`useCdaCatalog({
        cdaParams: {
            levelId: "KEYS.Elev.Inst.0.Top of Flood",
            office: "SWT",
            unit: "ft",
        }, ...etc})`}</Code>
      </div>
      <CdaParamsTable
        requestObject="Levels"
        requestType="GET"
        cwmsJsType="GetLevelsWithLevelIdTimeSeriesRequest"
      />
      <div className="font-bold text-lg pt-6">cdaParams</div>
      <ParamsTable paramsList={cdaParams} />
    </DocsPage>
  );
}

export { UseCdaLevels };
export default UseCdaLevels;
