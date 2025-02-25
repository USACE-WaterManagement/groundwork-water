import { Badge, Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { Code } from "../../components/code";
// import { DataStatus } from "@usace-watermanagement/groundwork-water"
import DataStatus from "../../../../../lib/components/data/summary/DataStatus";
import { useDataStatusFile } from "@usace-watermanagement/groundwork-water";

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
                dataStatusUrl={"/data/summary/swt.datastatus"}
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
        dataStatusUrl={"/data/summary/swt.datastatus"}
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
                You must specify either dataStatusUrl or tsids or the table will have no
                values!
            </Badge>
        </DocsPage>
    );
}

export { DataStatusPage };
export default DataStatusPage;
