

import { Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import { Code } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
// import { DataStatus } from "@usace-watermanagement/groundwork-water"
import DataStatus from "../../../../../lib/components/data/summary/DataStatus";

const returnParams = [
    {
        name: "data",
        type: "object?",
        desc: (
            <>
                Undefined until the request has resolved, then an object containing the
                response (if a valid response is received). The return object will vary
                depending on the request endpoint, but response definitions for each CDA
                endpoint are available in the{" "}
                <a
                    href="https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html"
                    className="underline"
                >
                    CDA Swagger Docs
                </a>
                .
            </>
        ),
    },
    {
        name: "isPending",
        type: "boolean",
        desc: "Is true until a query response is received, then false.",
    },
    {
        name: "error",
        type: "object?",
        desc: "Is null if no error has occurred, else an object containing the error.",
    },
];

function DataStatusPage() {
    return (
        <DocsPage middleText="Data Status Overview">
            <div>
                <Text>
                    The Data Status component uses quality flags and values from timeseries to
                    return a quick overview of data in the last number of hours that you specify.
                    It is not meant to be a replacement of the DataStatusSummary CWMS application,
                    but certainly can function as a substitute!
                </Text>
            </div>
            <DataStatus office="SWT" tsids={["KEYS.Elev.Inst.1Hour.0.Ccp-Rev"]} dataStatusUrl={"/data/summary/swt.datastatus"} />
            <Divider text="API Reference" className="mt-8" />
            <div className="font-bold text-lg pt-6">
                Return Parameters -{" "}
                <Code className="p-2">{`const {...} = useQuery()`}</Code>
            </div>
            <ParamsTable paramsList={returnParams} showReq={false} />
            <Text className="pt-3">
                A full list of the return parameters for useQuery hooks can be
                referenced in the{" "}
                <a
                    href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
                    className="underline"
                >
                    useQuery documentation
                </a>
                .
            </Text>
        </DocsPage>
    );
}

export { DataStatusPage };
export default DataStatusPage;
