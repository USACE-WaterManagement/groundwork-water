import { useEffect, useMemo, useState, useRef } from "react";
import { Configuration, LevelsApi, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";
import { gwMerge, Skeleton } from "@usace/groundwork";
import deepmerge from "deepmerge";
import { getPrecision } from "../utilities";

/**
 * Normalize a data prop to an array of objects
 *
 * This function provides support for data props entered as a single element
 * or as an array as well as support for data points entered as strings or as
 * objects.  Data is adjusted as necessary to return a normalized prop formatted
 * as an array of data objects in the format {id, ...additionalOptions}.
 * @param prop The data prop to be normalized.
 * @returns An array of data objects in the format {id, ...additionalOptions}
 */
const normalizeDataProp = (prop) => {
  if (!prop) return [];
  if (Array.isArray(prop))
    return prop.map((datum) => {
      if (Array.isArray(datum))
        console.error("Nested array not valid in plot data props");
      else if (typeof datum === "string") return { id: datum };
      else if (typeof datum === "object") return datum;
      else console.error(`Unrecognized data format: ${datum}`);
    });
  else if (typeof prop === "string") return [{ id: prop }];
  else if (typeof prop === "object") return [prop];
  else console.error(`Unrecognized data format: ${prop}`);
};

const getYAxisId = (timeseriesParam) => {
  const yaxis = timeseriesParam?.traceOptions?.yaxis;
  if (!yaxis) return undefined;
  if ((yaxis == "y") | (yaxis == "y1")) return "yaxis";
  const re = /^y(\d+)$/;
  const match = yaxis.match(re);
  if (match) {
    const axisInt = match[1];
    return `yaxis${axisInt}`;
  } else {
    return undefined;
  }
};

function PlotMessage({ children, height, tone = "info" }) {
  const toneClass =
    tone === "error"
      ? "gww-border-red-200 gww-bg-red-50 gww-text-red-800"
      : tone === "warning"
        ? "gww-border-amber-200 gww-bg-amber-50 gww-text-amber-900"
        : "gww-border-slate-200 gww-bg-white gww-text-slate-600";

  return (
    <div
      className={`gww-flex gww-items-center gww-justify-center gww-rounded gww-border gww-p-4 gww-text-center gww-text-sm ${toneClass}`}
      role={tone === "error" ? "alert" : "status"}
      style={{ minHeight: height || 240 }}
    >
      {children}
    </div>
  );
}

export default function CWMSPlot({
  begin,
  end,
  unit,
  office,
  timeSeries,
  pageSize,
  locationLevels,
  inputTSValues,
  layoutOptions = {},
  className = "",
  responsive = true,
  datum,
  timezone,
  trim,
  staticTraces,
  cdaUrl,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [tsData, setTsData] = useState(null);
  const plotElement = useRef(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const timeSeriesArray = useMemo(() => normalizeDataProp(timeSeries), [timeSeries]);

  const locationLevelsArray = useMemo(
    () => normalizeDataProp(locationLevels),
    [locationLevels],
  );

  const ts_api = useMemo(() => {
    const config_v2 = new Configuration({
      basePath: cdaUrl,
      headers: {
        accept: "application/json;version=2",
      },
    });
    return new TimeSeriesApi(config_v2);
  }, [cdaUrl]);

  const level_api = useMemo(() => {
    const config_level = new Configuration({
      basePath: cdaUrl,
      headers: {
        accept: "*/*",
      },
    });
    return new LevelsApi(config_level);
  }, [cdaUrl]);

  const defaultLayout = {
    height: 750,
    grid: {
      columns: 1,
    },
    xaxis: {
      showgrid: true,
      showline: true,
      mirror: "all",
      linecolor: "black",
      linewidth: 1,
    },
  };

  timeSeriesArray.forEach((item, index) => {
    const yaxis_id = getYAxisId(item) ?? (index == 0 ? "yaxis" : "yaxis" + index);
    if (!(yaxis_id in defaultLayout)) {
      defaultLayout[yaxis_id] = {
        title: {
          text:
            item.id.split(".")[1] +
            (item?.traceOptions?.units ? " (" + item.traceOptions.units + ")" : ""),
          font: {
            family: "Arial, sans-serif",
            size: 14,
          },
        },
      };
    }
  });

  defaultLayout.grid.rows = Object.keys(defaultLayout).filter((key) =>
    key.includes("yaxis"),
  ).length;

  const layout = deepmerge(defaultLayout, layoutOptions);
  const plotHeight = layoutOptions.height || layout.height;

  useEffect(() => {
    const tsids = timeSeriesArray.map((ts) => ts.id);
    const levels = locationLevelsArray;
    let cancelled = false;

    if (!tsids?.length) {
      setError("You must specify one or more Timeseries IDs to plot.");
      setWarning(null);
      setIsLoading(false);
      return;
    }

    if (!office) {
      setError("You must specify a 3 letter ID for the office.");
      setWarning(null);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setWarning(null);

      let values = [];
      const failures = [];

      if (!inputTSValues) {
        const tsResults = await Promise.allSettled(
          tsids.map((name) =>
            ts_api.getTimeSeries({
              name,
              office,
              unit,
              datum,
              begin,
              end,
              pageSize,
              timezone,
              trim,
            }),
          ),
        );

        values = tsResults
          .map((result, index) => {
            if (result.status === "fulfilled") return result.value;
            failures.push(`Time series ${tsids[index]}: ${result.reason?.message}`);
            return null;
          })
          .filter(Boolean);
      } else {
        values = inputTSValues;
      }

      const levelResults = await Promise.allSettled(
        levels.map((item) =>
          level_api.getLevelsWithLevelIdTimeSeries({
            levelId: item.id,
            unit: item.units,
            office: office,
            begin,
            end,
          }),
        ),
      );

      let _data = { ts: {} };

      values.forEach((result) => {
        if (result?.name && Array.isArray(result.values)) {
          if (!_data.ts[result.name]) {
            _data.ts[result.name] = [];
          }
          // Apply default rounding
          const precision = getPrecision(result.units);
          result.values = result.values.map((value) => [
            value[0], // Epoch
            value[1] != null ? parseFloat(Number(value[1]).toFixed(precision)) : null, // Value
            value[2], // Quality
          ]);

          // Update trace to include precision
          const yaxis_id = getYAxisId(
            timeSeriesArray.find((item) => {
              return item.id == result.name;
            }),
          );
          // Do not set tickformat if a precision is not required
          if (precision != 0 && yaxis_id && defaultLayout[yaxis_id]) {
            defaultLayout[yaxis_id].tickformat = `.${precision}f`;
          }

          _data.ts[result.name].push(result);
        } else if (result === null) {
          console.warn(`Skipping as no data was found.`);
        } else {
          failures.push(`No time-series data found for ${result?.name || "unknown"}.`);
        }
      });

      const lev_values = levelResults
        .map((result, index) => {
          if (result.status === "fulfilled") return result.value;
          failures.push(
            `Location level ${levels[index]?.id}: ${result.reason?.message}`,
          );
          return null;
        })
        .filter(Boolean);

      lev_values?.forEach((result) => {
        const name_arr = result?.name.split(".");
        let name;
        if (name_arr?.length > 0) {
          name =
            name_arr[0] +
            "." +
            name_arr[1] +
            "." +
            name_arr[2] +
            "." +
            name_arr[3] +
            "." +
            name_arr[5];
        }
        const levels = result?.values;
        if (result && name) {
          if (!_data.ts[name]) {
            _data.ts[name] = [];
          }
          _data.ts[name].push(levels);
        } else if (result === null) {
          console.warn(`Skipping as no data was found.`);
        } else {
          failures.push(
            `No location level data found for ${result?.name || "unknown"}.`,
          );
        }
      });

      if (cancelled) return;

      setTsData(_data);
      setWarning(failures.length ? failures.join(" ") : null);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      if (!cancelled) {
        setTsData(null);
        setError(error?.message || "Unable to load plot data.");
        setWarning(null);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    begin,
    datum,
    end,
    inputTSValues,
    level_api,
    locationLevelsArray,
    office,
    timeSeriesArray,
    timezone,
    trim,
    unit,
    pageSize,
    ts_api,
  ]);

  useEffect(() => {
    const tsids = timeSeriesArray.map((ts) => ts.id);
    const levels = locationLevelsArray.map((level) => level.id);

    if (!plotElement.current || !tsData) {
      return;
    }

    if (error) {
      return;
    }

    let ts_keys = Object.keys(tsData.ts);

    // Create traces keyed to the ts data
    let traces = [];
    let ts;

    // Add Static Data first to the list of traces so they show up behind
    if (staticTraces) {
      staticTraces.map((trace) => traces.push(trace));
    }

    // Loop thru TS Data for timeseries to add to traces
    // and build start and end timestamps to use with the location levels
    let start = 2100 * 12 * 30 * 24 * 3600 * 1000;
    let end = 0;

    for (let k_idx = 0; k_idx < ts_keys.length; k_idx++) {
      const key = ts_keys[k_idx];

      // Add Timeseries to list of traces
      if (tsids.includes(key)) {
        for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
          ts = tsData.ts[key][ts_idx];
          // Defaults for trace
          const trace = {
            x: ts.values.map((value) => new Date(value[0])),
            y: ts.values.map((value) => value[1]),
            showlegend: true,
            legend: { x: 1, xanchor: "right", y: 1 },
          };
          // Add all other parameters
          const tsObj = timeSeriesArray?.filter((item) => item.id === ts.name)[0];
          const fullTrace = tsObj?.traceOptions
            ? deepmerge(trace, tsObj?.traceOptions)
            : trace;
          traces.push(fullTrace);
          // Update start and end timestamps as necessary
          ts.values.map((value) => {
            if (value[1] != null) {
              if (value[0] < start) {
                start = value[0];
              }
              if (value[0] > end) {
                end = value[0];
              }
            }
          });
        }
      }
    }

    // Loop thru TS Data for location levels
    for (let k_idx = 0; k_idx < ts_keys.length; k_idx++) {
      const key = ts_keys[k_idx];

      // Add Location Levels to list of traces
      if (levels?.includes(key)) {
        for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
          ts = tsData.ts[key][ts_idx];

          // Update trace with dates bounded by start and end dates
          let dates = [];
          let values = [];

          ts.forEach((tsv) => {
            if (tsv[0] && tsv[1]) {
              dates.push(tsv[0]);
              values.push(tsv[1]);
            }
          });

          // Defaults for trace
          const trace = {
            x: dates.map((d) => new Date(d)),
            y: values,
            showlegend: true,
            legend: { x: 1, xanchor: "right", y: 1 },
          };
          // Add all other parameters
          const levelObj = locationLevelsArray?.filter((item) => item.id == key)[0];
          const fullTrace = levelObj?.traceOptions
            ? deepmerge(trace, levelObj?.traceOptions)
            : trace;
          traces.push(fullTrace);
        }
      }
    }

    if (!traces.length) {
      setError("No plot data found for the selected time series or levels.");
      return;
    }

    Plotly.newPlot(plotElement.current, traces, layout, {
      responsive: responsive,
    }).catch((error) => {
      setError(error?.message || "Unable to render the plot.");
      setWarning(null);
    });
  }, [
    error,
    layout,
    locationLevelsArray,
    responsive,
    staticTraces,
    timeSeriesArray,
    tsData,
  ]);

  return (
    <div
      className={gwMerge("gww-h-full gww-w-full", className)}
      style={{ height: plotHeight }}
    >
      {error ? (
        <PlotMessage height={plotHeight} tone="error">
          {error}
        </PlotMessage>
      ) : isLoading ? (
        <div style={{ height: plotHeight }}>
          <Skeleton className="gww-h-full gww-w-full" />
        </div>
      ) : (
        <>
          {warning ? (
            <div className="gww-mb-2">
              <PlotMessage tone="warning">{warning}</PlotMessage>
            </div>
          ) : null}
          <div
            ref={plotElement}
            id="plot"
            className="gww-h-full gww-w-full"
            style={{ height: plotHeight }}
          />
        </>
      )}
    </div>
  );
}
