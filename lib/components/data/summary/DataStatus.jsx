
import { useQuery } from "@tanstack/react-query";
import {
    UsaceBox, Badge, Text,
    Table, TableBody, TableRow, TableHead, TableCell,
} from "@usace/groundwork";

import "../../../css/alert.css";
import StatusRow from "./components/StatusRow";

function DataStatus({ office, pageSize, cdaUrl, dataStatusUrl, linkPath, tsids = [], lookBackHours = 24, dateFormat = "DD MMM HH:mm" }) {
    // fetch the data status file from URL and parse it new line delimited

    const { data: fileTsids = [], isPending: fileIsPending, error: fileError } = useQuery({
        queryKey: ["dataStatus", dataStatusUrl],
        queryFn: async () => {
            return fetch(dataStatusUrl)
                .then(response => {
                    if (response.ok)
                        return response.text()
                    else
                        return Promise.reject(response.statusText)
                })
                .then(text => {
                    // Split by new lines and filter out lines starting with ":" (commented)
                    return text.split("\n").filter(line => !line.startsWith(":"))
                })
        },
        refetchInterval: 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: dataStatusUrl != null,
    })

    if (fileTsids.length > 0) {
        tsids = [...tsids, ...fileTsids]
    }

    if (!dataStatusUrl && !tsids) {
        console.error("Error: No data status URL or tsids provided to component <DataStatus />")
        return <Badge color="red">Error: No data status URL or tsids provided</Badge>
    }

    return (
        <UsaceBox title="DCP Data Quality Summary" >
            <Text key="info">Data Quality Flags are shown as: </Text>
            <Badge key="missing" className="gww-ms-2 missing">Missing</Badge>
            <Badge key="questionable" className="gww-ms-2 questionable">Questionable</Badge>
            <Badge key="unknown" className="gww-ms-2 unknown">Unknown or Undefined</Badge>
            <Badge key="okay" className="gww-ms-2 okay">Passed Screening and/or Validated</Badge>
            <Table key="table">
                {/* Build list of dates for column headers */}
                <TableHead key="table-header">
                    <TableRow key="header-row">
                        <TableCell key="gage-header">Gage</TableCell>
                        <TableCell key="quality-header">Quality Info</TableCell>
                        <TableCell key="latest-header" title={dateFormat}>Latest Date-time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tsids.map((name, idx) => {
                        if (name) {
                            return (
                                <StatusRow key={`status-row-${idx}-${name}`} office={office} pageSize={pageSize} cdaUrl={cdaUrl} linkPath={linkPath} name={name} idx={idx} lookBackHours={lookBackHours} dateFormat={dateFormat} />
                            )
                        }
                        return null
                    })}
                </TableBody>
            </Table >
        </UsaceBox >
    )
}

export default DataStatus;
export { DataStatus };