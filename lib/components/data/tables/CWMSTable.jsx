import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TimeSeriesApi } from "cwmsjs";
import dayjs from "dayjs";
import { useCdaConfig } from "../helpers/cda";
import { getPrecision } from "../utilities";
import { buildPrecisionMap, buildTableIndex, buildTableRowValues } from "./tableData";

function getDefaultMobileColumns(timeseriesParams) {
  return timeseriesParams.slice(0, 2).map((param) => param.tsid);
}

function normalizeMobileColumns(columns, timeseriesParams) {
  const validTsids = new Set(timeseriesParams.map((param) => param.tsid));
  const fallback = getDefaultMobileColumns(timeseriesParams);

  return [
    ...new Set([...columns.filter((tsid) => validTsids.has(tsid)), ...fallback]),
  ].slice(0, Math.min(2, timeseriesParams.length));
}

function TableMessage({ children, tone = "info" }) {
  const toneClass =
    tone === "error"
      ? "gww-border-red-200 gww-bg-red-50 gww-text-red-800"
      : "gww-border-slate-200 gww-bg-white gww-text-slate-600";

  return (
    <div
      className={`gww-rounded gww-border gww-p-4 gww-text-center gww-text-sm ${toneClass}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export default function CWMSTable({
  timeseriesParams,
  office,
  unit = "EN",
  datum,
  begin,
  end,
  timezone,
  inputTSValues,
  trim = true,
  pageSize,
  interval = 1,
  snapTopOfInterval = true,
  sortAscending = true,
  missingString = "",
  dateFormat = "ddd MMM DD HH:mm",
  cdaUrl,
  dateTimeTableColumnHeader = "Date & Time (Local)",
  tableOptions = {
    overflowHeight: "gww-max-h-[65vh]",
    className: "",
  },
}) {
  const parentRef = useRef(null);
  const [rawSeries, setRawSeries] = useState(inputTSValues || []);
  const [isLoading, setIsLoading] = useState(!inputTSValues);
  const [error, setError] = useState(null);
  const [mobileColumns, setMobileColumns] = useState(() =>
    getDefaultMobileColumns(timeseriesParams),
  );
  const config = useCdaConfig("v2", cdaUrl);
  const ts_api = useMemo(() => new TimeSeriesApi(config), [config]);
  const tsids = useMemo(
    () => timeseriesParams.map((item) => item.tsid),
    [timeseriesParams],
  );

  useEffect(() => {
    setMobileColumns((current) => normalizeMobileColumns(current, timeseriesParams));
  }, [timeseriesParams]);

  useEffect(() => {
    let cancelled = false;

    if (!tsids.length) {
      setIsLoading(false);
      setRawSeries([]);
      setError("You must specify one or more Timeseries IDs to table.");
      return;
    }

    if (!office) {
      setIsLoading(false);
      setRawSeries([]);
      setError("You must specify a 3 letter ID for the office.");
      return;
    }

    if (inputTSValues) {
      setIsLoading(false);
      setError(null);
      setRawSeries(inputTSValues);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const promises = tsids.map(async (name) => {
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
          }
          throw error;
        }
      });

      try {
        const series = (await Promise.all(promises)).filter(Boolean);
        if (!cancelled) {
          setRawSeries(series);
        }
      } catch (error) {
        if (!cancelled) {
          setRawSeries([]);
          setError(
            error?.message || "Unable to load time-series values for the table.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
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
    inputTSValues,
    ts_api,
    tsids,
  ]);

  const tableIndex = useMemo(
    () =>
      buildTableIndex({
        rawSeries,
        sortAscending,
        timeseriesParams,
        interval,
        snapTopOfInterval,
      }),
    [interval, rawSeries, snapTopOfInterval, sortAscending, timeseriesParams],
  );
  const precisionByTsid = useMemo(
    () => buildPrecisionMap({ rawSeries, timeseriesParams, getPrecision }),
    [rawSeries, timeseriesParams],
  );

  const visibleMobileParams = useMemo(
    () =>
      mobileColumns
        .map((tsid) => timeseriesParams.find((param) => param.tsid === tsid))
        .filter(Boolean),
    [mobileColumns, timeseriesParams],
  );

  const visibleMobileIndexes = useMemo(
    () =>
      visibleMobileParams.map((param) =>
        timeseriesParams.findIndex((item) => item.tsid === param.tsid),
      ),
    [timeseriesParams, visibleMobileParams],
  );

  const rowVirtualizer = useVirtualizer({
    count: tableIndex.dates.length,
    estimateSize: () => 36,
    getScrollElement: () => parentRef.current,
    overscan: 12,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const mobileColumnSlots = Array.from({
    length: Math.min(2, timeseriesParams.length),
  });
  const desktopGridStyle = {
    gridTemplateColumns: `12rem repeat(${timeseriesParams.length}, minmax(8rem, 1fr))`,
    minWidth: `${12 + timeseriesParams.length * 8}rem`,
  };
  const mobileGridStyle = {
    gridTemplateColumns: `12rem repeat(${visibleMobileParams.length}, minmax(8rem, 1fr))`,
    minWidth: `${12 + visibleMobileParams.length * 8}rem`,
  };

  if (error) {
    return <TableMessage tone="error">{error}</TableMessage>;
  }

  if (isLoading) {
    return <TableMessage>Loading table data...</TableMessage>;
  }

  if (!tableIndex.dates.length) {
    return (
      <TableMessage>No table rows found for the selected time series.</TableMessage>
    );
  }

  return (
    <div
      className={`gww-rounded gww-border gww-border-slate-200 gww-bg-white ${tableOptions.className || ""}`}
    >
      <div className="gww-grid gww-gap-3 gww-border-b gww-border-slate-200 gww-p-3 md:gww-hidden">
        {mobileColumnSlots.map((_, slot) => (
          <label
            key={slot}
            className="gww-grid gww-gap-1 gww-text-sm gww-text-slate-700"
          >
            <span>Column {slot + 1}</span>
            <select
              className="gww-w-full gww-rounded gww-border gww-border-slate-300 gww-px-2 gww-py-2"
              value={mobileColumns[slot] || ""}
              onChange={(event) => {
                const next = [...mobileColumns];
                next[slot] = event.target.value;
                setMobileColumns(normalizeMobileColumns(next, timeseriesParams));
              }}
            >
              {timeseriesParams.map((param) => (
                <option key={param.tsid} value={param.tsid}>
                  {param.header}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div
        ref={parentRef}
        className={`gww-overflow-auto ${tableOptions.overflowHeight || "gww-max-h-[65vh]"}`}
      >
        <div className="gww-hidden gww-text-sm md:gww-block" role="table">
          <div
            className="gww-sticky gww-top-0 gww-z-10 gww-grid gww-bg-slate-100 gww-text-left gww-font-semibold"
            role="row"
            style={desktopGridStyle}
          >
            <div
              className="gww-border-b gww-border-slate-200 gww-px-3 gww-py-2"
              role="columnheader"
            >
              {dateTimeTableColumnHeader}
            </div>
            {timeseriesParams.map((param) => (
              <div
                key={param.tsid}
                className="gww-border-b gww-border-slate-200 gww-px-3 gww-py-2 gww-text-right"
                role="columnheader"
              >
                {param.header}
              </div>
            ))}
          </div>
          <div
            className="gww-relative"
            role="rowgroup"
            style={{ height: `${totalSize}px`, minWidth: desktopGridStyle.minWidth }}
          >
            {virtualRows.map((virtualRow) => {
              const date = tableIndex.dates[virtualRow.index];
              const values = buildTableRowValues({
                date,
                missingString,
                precisionByTsid,
                seriesLookup: tableIndex.seriesLookup,
                visibleTsids: tableIndex.visibleTsids,
              });
              return (
                <div
                  key={date}
                  className="gww-absolute gww-left-0 gww-grid gww-w-full gww-border-b gww-border-slate-100 odd:gww-bg-white even:gww-bg-slate-50"
                  role="row"
                  style={{
                    ...desktopGridStyle,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div
                    className="gww-px-3 gww-py-2 gww-font-mono gww-text-xs gww-text-slate-700"
                    role="cell"
                  >
                    {dayjs(date).format(dateFormat)}
                  </div>
                  {values.map((value, index) => (
                    <div
                      key={timeseriesParams[index].tsid}
                      className="gww-px-3 gww-py-2 gww-text-right gww-font-mono gww-text-xs"
                      role="cell"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="gww-text-sm md:gww-hidden" role="table">
          <div
            className="gww-sticky gww-top-0 gww-z-10 gww-grid gww-bg-slate-100 gww-text-left gww-font-semibold"
            role="row"
            style={mobileGridStyle}
          >
            <div
              className="gww-border-b gww-border-slate-200 gww-px-3 gww-py-2"
              role="columnheader"
            >
              {dateTimeTableColumnHeader}
            </div>
            {visibleMobileParams.map((param) => (
              <div
                key={param.tsid}
                className="gww-border-b gww-border-slate-200 gww-px-3 gww-py-2 gww-text-right"
                role="columnheader"
              >
                {param.header}
              </div>
            ))}
          </div>
          <div
            className="gww-relative"
            role="rowgroup"
            style={{ height: `${totalSize}px`, minWidth: mobileGridStyle.minWidth }}
          >
            {virtualRows.map((virtualRow) => {
              const date = tableIndex.dates[virtualRow.index];
              const values = buildTableRowValues({
                date,
                missingString,
                precisionByTsid,
                seriesLookup: tableIndex.seriesLookup,
                visibleTsids: tableIndex.visibleTsids,
              });
              return (
                <div
                  key={date}
                  className="gww-absolute gww-left-0 gww-grid gww-w-full gww-border-b gww-border-slate-100 odd:gww-bg-white even:gww-bg-slate-50"
                  role="row"
                  style={{
                    ...mobileGridStyle,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div
                    className="gww-px-3 gww-py-2 gww-font-mono gww-text-xs gww-text-slate-700"
                    role="cell"
                  >
                    {dayjs(date).format(dateFormat)}
                  </div>
                  {visibleMobileIndexes.map((index) => (
                    <div
                      key={timeseriesParams[index].tsid}
                      className="gww-px-3 gww-py-2 gww-text-right gww-font-mono gww-text-xs"
                      role="cell"
                    >
                      {values[index]}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
