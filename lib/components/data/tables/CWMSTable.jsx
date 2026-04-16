import { useEffect, useState, useRef } from "react";
import { TimeSeriesApi } from "cwmsjs";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableHeader,
  TableCell,
} from "@usace/groundwork";
import { useCdaConfig } from "../helpers/cda";
import { getPrecision } from "../utilities";

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
  const tableElement = useRef([]);
  const [tableData, setTableData] = useState(null);
  const [tsData, setTsData] = useState(null);
  const config = useCdaConfig("v2", cdaUrl);
  const ts_api = new TimeSeriesApi(config);

  useEffect(() => {
    const tsids = timeseriesParams.map((item) => item.tsid);

    if (!tsids.length)
      throw Error("You must specify one or more Timeseries IDs to table.");

    if (!office) throw Error("You must specify a 3 letter ID for the office");

    // Need support for page size, either defined or set with time delta
    // And then code to page thru each page and append into ts data

    const fetchData = async () => {
      let promises = tsids.map(async (name) => {
        try {
          return await ts_api.getTimeSeries({
            name,
            office,
            unit,
            datum,
            begin,
            end,
            timezone,
            trim,
            pageSize,
          });
        } catch (error) {
          if (error.response?.status === 404) {
            console.warn(`Data for ${name} not found: 404`);
            return null;
          } else {
            throw error;
          }
        }
      });

      let values = await Promise.all(promises);
      let data = { ts: {}, dates: [] };
      let dates = [];

      values.forEach((result) => {
        if (result && result.values) {
          if (!data.ts[result.values]) {
            data.ts[result.name] = [];
          }

          // Set default precision for table
          let precision = getPrecision(result.units);
          // Allow user to override precision
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

      setTsData(data);
    };

    fetchData();
  }, [
    timeseriesParams,
    office,
    unit,
    datum,
    begin,
    end,
    timezone,
    trim,
    pageSize,
    sortAscending,
    missingString,
    interval,
  ]);

  useEffect(() => {
    if (!tableElement.current || !tsData) {
      return;
    }

    const table = [];

    tsData.dates.forEach((dt) => {
      const row = [];

      Object.keys(tsData.ts).forEach((item) => {
        row.push(tsData.ts[item][dt]);
      });
      table.push([new Date(dt), row]);
    });
    setTableData(table);
  }, [tsData, timeseriesParams]);

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
        {tableData?.map((item, index) => (
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
