
import {
  UsaceBox,
  Badge,
  Text,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@usace/groundwork";

import "../../../css/alert.css";
import StatusRow from "./components/StatusRow";

function DataStatus({
  office,
  pageSize,
  cdaUrl,
  linkPath,
  tsids = [],
  lookBackHours = 24,
  dateFormat = "DD MMM HH:mm",
  showBadges = true,
  title = "Data Status",
}) {
  // fetch the data status file from URL and parse it new line delimited


  if (!tsids) {
    console.error(
      "Error: No data status URL or tsids provided to component <DataStatus />"
    );
    return (
      <Badge color="red">Error: No data status URL or tsids provided</Badge>
    );
  }

  return (
    <UsaceBox title={title}>
      {showBadges && (
        <>
          <Text key="info">Data Quality Flags are shown as: </Text>
          <Badge key="missing" className="gww-ms-2 alert-missing">
            Missing
          </Badge>
          <Badge key="questionable" className="gww-ms-2 alert-questionable">
            Questionable
          </Badge>
          <Badge key="unknown" className="gww-ms-2 alert-unknown">
            Unknown or Undefined
          </Badge>
          <Badge key="okay" className="gww-ms-2 alert-okay">
            Passed Screening and/or Validated
          </Badge>
        </>
      )}
      <Table key="table">
        {/* Build list of dates for column headers */}
        <TableHead key="table-header">
          <TableRow key="header-row">
            <TableCell key="gage-header">Gage</TableCell>
            <TableCell key="quality-header">Quality Info</TableCell>
            <TableCell key="latest-header" title={dateFormat}>
              Latest Date-time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tsids.map((name, idx) => {
            if (name) {
              return (
                <StatusRow
                  key={`status-row-${idx}-${name}`}
                  office={office}
                  pageSize={pageSize}
                  cdaUrl={cdaUrl}
                  linkPath={linkPath}
                  name={name}
                  idx={idx}
                  lookBackHours={lookBackHours}
                  dateFormat={dateFormat}
                />
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
    </UsaceBox>
  );
}

export default DataStatus;
export { DataStatus };
