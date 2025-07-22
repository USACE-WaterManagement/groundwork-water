import dayjs from "dayjs";
import {
  Badge,
  Skeleton,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableHeader,
  TableCell,
} from "@usace/groundwork";
import useCdaMultiTimeSeries from "../hooks/useCdaMultiTimeSeries";

export default function CWMSTable({
  timeseriesParams,
  office,
  unit = "EN",
  datum,
  begin,
  end,
  timezone,
  trim = true,
  pageSize,
  interval = 1,
  sortAscending = true,
  missingString = "",
  dateFormat = "ddd MMM DD HH:mm",
  cdaUrl,
  dateTimeTableColumnHeader = "Date & Time (Local)",
  queryOptions,
  tableOptions = {
    striped: false,
    dense: false,
    bleed: false,
    stickyHeader: false,
    overflow: false,
    overflowHeight: "h-[65vh]",
    grid: false,
    className: "",
  },
}) {
  const multTimeSeries = useCdaMultiTimeSeries({
    cdaParams: {
      name: timeseriesParams.map((item) => item.tsid).join(","),
      office,
      unit,
      datum,
      begin,
      end,
      timezone,
      trim,
      pageSize,
    },
    cdaUrl,
    queryOptions: {
      enabled: !!timeseriesParams.length && !!office,
      select: (values) => {
        let data = { ts: {}, dates: [] };
        let dates = [];

        values.forEach((result) => {
          if (result && result.values) {
            if (!data.ts[result.values]) {
              data.ts[result.name] = [];
            }

            let precision = 2;
            timeseriesParams.map((entry) => {
              if (entry.tsid == result.name && entry.precision != null) {
                precision = entry.precision;
              }
            });

            result.values.forEach((item) => {
              const dt = item[0];
              const val = item[1];

              if (val === null) {
                data.ts[result.name][dt] = missingString;
              } else {
                data.ts[result.name][dt] = val.toFixed(precision);
              }

              if (!dates.includes(dt)) {
                if (dt % (interval * 1000 * 60) == 0) {
                  dates.push(dt);
                }
              }
            });
          } else if (result === null) {
            console.warn(`Skipping as no data was found.`);
            data.ts[null] = [];
          } else {
            console.warn(`No unit found for ${result?.name}`);
          }
        });

        dates.sort();

        if (!sortAscending) {
          dates.reverse();
        }

        data.dates = dates;
        if (!data) {
          throw new Error("No data was returned from the server.");
        }

        const table = [];

        data.dates.forEach((dt) => {
          const row = [];

          Object.keys(data.ts).forEach((item) => {
            row.push(data.ts[item][dt]);
          });
          table.push([new Date(dt), row]);
        });

        return table;
      },
      ...queryOptions, // allow for additional OR overrides
    },
  });
  if (!timeseriesParams.map((item) => item.tsid).length)
    throw Error("You must specify one or more Timeseries IDs to table.");

  if (!office) throw Error("You must specify a 3 letter ID for the office");

  if (multTimeSeries.isLoading) {
    return (
      <Table {...tableOptions}>
        <TableHead>
          <TableRow>
            <TableHeader>{dateTimeTableColumnHeader}</TableHeader>
            {timeseriesParams.map((item, index) => (
              <TableHeader key={`header${index}`}>{item.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={timeseriesParams.length + 1}>
              <Skeleton className="gww-w-full gww-h-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  if (multTimeSeries.isError) {
    return <Badge color="red">Error:{multTimeSeries.error.message}</Badge>;
  }
  return (
    <Table {...tableOptions}>
      <TableHead>
        <TableRow>
          <TableHeader>{dateTimeTableColumnHeader}</TableHeader>
          {timeseriesParams.map((item, index) => (
            <TableHeader key={`header${index}`}>{item.header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Each Row */}
        {multTimeSeries.data.map((item, index) => (
          <TableRow key={`row${index}`}>
            {/* Date-Time */}
            <TableCell key={`cell${index}`}>
              {dayjs(item[0]).format(dateFormat)}
            </TableCell>

            {/* Loop over columns */}
            {item[1].map((val, idx) => (
              <TableCell key={`cell${idx}`}>{val}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
