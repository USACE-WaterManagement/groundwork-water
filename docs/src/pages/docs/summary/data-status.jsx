import { Badge, Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { Code } from "../../components/code";
import { DataStatus, useDataStatusFile } from "@usace-watermanagement/groundwork-water";

const BASE_URL = import.meta.env.BASE_URL;

const returnParams = [
    {
        name: "office",
        type: "string",
        required: true,
        desc: "The office code for the data status",
    },
    {
        name: "tsids",
        type: "array",
        desc: "An array of TimeSeries Identifiers to fetch data status for from CDA",
    },
    {
        name: "pageSize",
        type: "number",
        desc: "The maximum number of entries to fetch in one date range",
    },
    {
        name: "cdaUrl",
        type: "string",
        desc: "The URL to the CDA service to fetch TimeSeries from. Defaults to: https://cwms-data.usace.army.mil/cwms-data",
    },
    {
        name: "linkPath",
        type: "string",
        desc: "A url path to a project or some other page. I.e. /{office}/projects/ would end up pointing to /{office}/projects/{name}",
    },
    {
        name: "lookBackHours",
        type: "number",
        desc: "Number of hours from current time to look back for data status",
    },
    {
        name: "dateFormat",
        type: "string",
        desc: (
            <span>
                A{" "}
                <a
                    href="https://day.js.org/docs/en/display/format"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                >
                    day.js
                </a>{" "}
                format string for the date display in the table
            </span>
        ),
    },
    {
        name: "showBadges",
        type: "boolean",
        desc: "A flag to determine if the badge color legend should be shown",
    },
    {
        name: "title",
        type: "string",
        desc: "The title of the Data Status component within UsaceBox",
    },
];

const dataStatusFileParams = [
    {
        name: "fileUrl",
        type: "string",
        required: true,
        desc: "Path or URL to a newline-delimited data status file.",
    },
    {
        name: "queryOptions",
        type: "object",
        desc: (
            <span>
                Optional{" "}
                <a href={`${BASE_URL}#/docs/react-query`} className="underline">
                    TanStack Query
                </a>{" "}
                options passed through to <Code>useQuery</Code>.
            </span>
        ),
    },
];

const dataStatusFileReturnParams = [
    {
        name: "data",
        type: "string[]?",
        desc: "Resolved TSID entries from the file with comment lines filtered out.",
    },
    {
        name: "isPending",
        type: "boolean",
        desc: "True while the file is loading, then false once the query settles.",
    },
    {
        name: "error",
        type: "object?",
        desc: "Null when successful, otherwise the fetch/query error.",
    },
];

function DataStatusPage() {
    const { data: fileTsids = [], error: fileError, isPending: filePending } = useDataStatusFile({
        fileUrl: "/data/summary/swt.datastatus",
    })
    return (
        <DocsPage middleText="Data Status Overview">
            <div>
                <Text className="w-3/4 mb-2">
                    The Data Status component uses quality flags and values from
                    timeseries to return a quick overview of data in the last number of
                    hours that you specify. It is not meant to be a replacement of the
                    DataStatusSummary CWMS application, but certainly can function as a
                    substitute!
                </Text>
            </div>
            {!filePending && fileError ? <div>Failed to load TSID data status file! {fileError?.message}</div> : <DataStatus
                office="SWT"
                tsids={["KEYS.Elev.Inst.1Hour.0.Ccp-Rev", ...fileTsids]}
            />}
            <Divider text="Code Example:" className="mt-8" />
            <div className="mt-8">
                <Code className="mt-8" language="jsx">
                    {`import dayjs from "dayjs";
import { useState } from "react";
import { useDataStatusFile } from "@usace-watermanagement/groundwork-water";

/* swt.datastatus Contents : 
: This is a comment
KEYS.Elev.Inst.1Hour.0.Ccp-Rev
ALTU.Precip-Inc.Total.15Minutes.15Minutes.Ccp-Rev
CLRK.Precip-Inc.Total.15Minutes.15Minutes.Ccp-Rev
: KEYS.Precip-Inc.Total.1Hour.1Hour.Ccp-Rev
*/

default export function Example() {
    /* This is optional if you want to load tsids from a file */
    const { data: fileTsids, error: fileError, isPending: filePending } = useDataStatusFile({
        fileUrl: "/data/summary/swt.datastatus",
    })                 
    if (filePending) {
        return <Skeleton className="w-full" />
    }
    if (fileError) {
        return <div>Failed to load TSID data status file! {fileError?.message}</div>
    }
    /* You could use a timeseries group to load tsids as well! */
    // Or use a static array below :
    const tsids = ["KEYS.Elev.Inst.1Hour.0.Ccp-Rev"]
    return <DataStatus
        office="SWT"
        tsids={[...tsids, ...fileTsids]}
    />
}
`}
                </Code>
            </div>
            <div className="font-bold text-lg pt-6">
                Data Status Parameters
                <Code
                    enableCopy={false}
                    className="p-2"
                    language="jsx"
                >{`<DataStatus ... />`}</Code>
            </div>
            <Divider text="API Reference" className="mt-8" />
            <ParamsTable paramsList={returnParams} showReq={true} />
            <Badge color="yellow" className="my-2">
                You must specify tsids or the table will have no values!
            </Badge>
            <Divider text="useDataStatusFile Hook" className="mt-8" />
            <Text className="mb-2">
                Use <Code>useDataStatusFile</Code> to load a newline-delimited TSID file
                and turn it into an array that can be passed into <Code>DataStatus</Code>.
                Lines beginning with <Code>:</Code> are treated as comments and ignored.
            </Text>
            <Code className="mt-4" language="jsx">
                {`import { useDataStatusFile } from "@usace-watermanagement/groundwork-water";

function Example() {
    const { data: tsids = [], isPending, error } = useDataStatusFile({
        fileUrl: "/data/summary/swt.datastatus",
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Failed to load file.</div>;

    return <DataStatus office="SWT" tsids={tsids} />;
}`}
            </Code>
            <div className="font-bold text-lg pt-6">
                Hook Parameters
                <Code
                    enableCopy={false}
                    className="p-2"
                    language="jsx"
                >{`useDataStatusFile({...})`}</Code>
            </div>
            <ParamsTable paramsList={dataStatusFileParams} showReq={true} />
            <div className="font-bold text-lg pt-6">
                Hook Return Parameters
                <Code
                    enableCopy={false}
                    className="p-2"
                    language="jsx"
                >{`const { data, isPending, error } = useDataStatusFile({...})`}</Code>
            </div>
            <ParamsTable paramsList={dataStatusFileReturnParams} showReq={false} />
        </DocsPage>
    );
}

export { DataStatusPage };
export default DataStatusPage;
