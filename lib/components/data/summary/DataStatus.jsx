import {
  UsaceBox,
  Badge,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@usace/groundwork";
import { getQualityMeta } from "../utilities/qualityDecoder";
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
  const qualityLegend = ["MISSING", "REJECTED", "QUESTIONABLE", "UNKNOWN", "OKAY"];

  if (!tsids) {
    console.error(
      "Error: No data status URL or tsids provided to component <DataStatus />",
    );
    return <Badge color="red">Error: No data status URL or tsids provided</Badge>;
  }

  return (
    <UsaceBox title={title}>
      <div className="gww-mb-2 gww-rounded-lg gww-border gww-border-slate-200 gww-bg-slate-50/90 gww-px-3 gww-py-2">
        <div className="gww-flex gww-flex-wrap gww-items-center gww-gap-2">
          <span className="gww-text-xs gww-font-semibold gww-uppercase gww-tracking-[0.18em] gww-text-slate-500">
            Office
          </span>
          <Badge
            color="blue"
            className="gww-border gww-border-blue-200 gww-bg-blue-50 gww-text-blue-900"
          >
            {office}
          </Badge>
          {showBadges ? (
            <>
              <span className="gww-ml-1 gww-text-sm gww-font-medium gww-text-slate-700">
                Data Quality Status Flags
              </span>
              <div className="gww-flex gww-flex-wrap gww-items-center gww-gap-2">
                {qualityLegend.map((quality) => {
                  const meta = getQualityMeta(quality);
                  return (
                    <span
                      key={quality}
                      className={`gww-inline-flex gww-items-center gww-rounded-full gww-px-3 gww-py-1 gww-text-xs gww-font-semibold ${meta.badgeClassName}`}
                    >
                      {meta.label}
                    </span>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Table
        key="table"
        className="gww-overflow-visible"
        dense
        bleed
        overflow
        stickyHeader
        overflowHeight="gww-max-h-[72vh]"
      >
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
            const tsid = typeof name === "string" ? name.trim() : name;
            if (tsid) {
              return (
                <StatusRow
                  key={`status-row-${idx}-${tsid}`}
                  office={office}
                  pageSize={pageSize}
                  cdaUrl={cdaUrl}
                  linkPath={linkPath}
                  name={tsid}
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
