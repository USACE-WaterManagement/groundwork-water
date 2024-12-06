import { useEffect, useState, useRef } from "react";
import { Configuration, LevelsApi, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";
import { gwMerge } from "@usace/groundwork";

const config_v2 = new Configuration({
  headers: {
    accept: "application/json;version=2",
  },
});
const ts_api = new TimeSeriesApi(config_v2);

const config_level = new Configuration({
  headers: {
    accept: "*/*",
  },
});
const level_api = new LevelsApi(config_level);

export default function CWMSPlot({
  begin,
  end,
  unit,
  office,
  timeseriesParams,
  locationLevelParams,
  layoutParams,
  className = "",
  responsive = true,
  loadingComponent = null,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [tsData, setTsData] = useState(null);
  const plotElement = useRef(null);

  let layout;
  if (layoutParams) {
    layout = layoutParams;
  }
  if (!layoutParams) {
    layout = {
      title: {
        text: timeseriesParams[0].tsid.split(".")[0],
        font: {
          family: "Arial, sans-serif",
          size: 16,
        },
      },
      height: 750,
      grid: {
        rows: timeseriesParams.length,
        columns: 1,
      },
      xaxis: {
        showgrid: true,
        showline: true,
        mirror: "ticks",
        linecolor: "black",
        linewidth: 1,
      },
    };

    timeseriesParams.map((item, index) => {
      const yaxis_id = index == 0 ? "yaxis" : "yaxis" + index;
      if (!layout.yaxis_id) {
        layout[yaxis_id] = {
          title: {
            text: item.tsid.split(".")[1],
            font: {
              family: "Arial, sans-serif",
              size: 14,
            },
          },
        };
      }
    });
    layoutParams = layout;
  }

  let tsids = [];
  Object.entries(timeseriesParams).map((item) => tsids.push(item[1].tsid));

  let levels = [];
  Object.entries(locationLevelParams).map((item) =>
    levels.push(item[1].levelid)
  );

  useEffect(() => {
    if (!tsids.length)
      throw Error("You must specify one or more Timeseries IDs to plot.");

    if (!office) throw Error("You must specify a 3 letter ID for the office");

    const fetchData = async () => {
      let ts_promises = tsids.map(async (tsid) => {
        try {
          // Currently, large page size calls are blocked, so the default of 500 is used
          let pageSize = 500;
          // const delta = dayjs(end.value).diff(dayjs(start.value), "day", true)
          // let interval = tsid.split(".")[3]
          // if (interval.includes("Minute")) {
          //   if (interval.includes("15")) { pageSize = delta * 100 }
          //   if (interval.includes("1Minute")) { pageSize = delta * 1500 }
          // }
          // if (interval.includes("Hour")) { pageSize = delta * 10 }
          // if (interval.includes("Day")) { pageSize = delta * 1 }
          return await ts_api.getCwmsDataTimeseries({
            name: tsid,
            begin: begin,
            end: end,
            pageSize: pageSize,
            office: office,
            unit: unit,
          });
        } catch (error) {
          console.error("Error fetching timeseries data:", error);
        }
      });

      let lev_promises = levels?.map(async (item) => {
        let level;
        // The Level API doesn't accept the same date format
        try {
          level = await level_api.getCwmsDataLevels({
            levelIdMask: item,
            begin: begin.slice(0, 10),
            end: end.slice(0, 10),
            office: office,
            format: "json",
            unit: unit,
          });
        } catch (error) {
          console.error("Error fetching location level data:", error);
        }
        return level;
      });

      let _data = { ts: {} };

      let values = await Promise.all(ts_promises);
      values.forEach((result) => {
        if (result && result.name) {
          if (!_data.ts[result.name]) {
            _data.ts[result.name] = [];
          }
          _data.ts[result.name].push(result);
        } else if (result === null) {
          console.warn(`Skipping as no data was found.`);
        } else {
          console.warn(`No timeseries data found for ${result?.name}`);
        }
      });

      let lev_values;
      if (lev_promises) {
        lev_values = await Promise.all(lev_promises);
      }

      lev_values?.forEach((result) => {
        const name = result["location-levels"]["location-levels"][0]?.name;
        const levels = result["location-levels"]["location-levels"][0]?.values;
        if (result && name) {
          if (!_data.ts[name]) {
            _data.ts[name] = [];
          }
          _data.ts[name].push(levels);
        } else if (result === null) {
          console.warn(`Skipping as no data was found.`);
        } else {
          console.warn(`No location level data found for ${result?.name}`);
        }
      });

      setTsData(_data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!plotElement.current || !tsData) {
      return;
    }

    setIsLoading(true);

    let ts_keys = Object.keys(tsData.ts);

    // Create traces keyed to the tsdata
    let traces = [];
    let ts;

    // Loop thru TS Data for timeseries and location levels
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
          const params = timeseriesParams?.filter(
            (item) => item.tsid == ts.name
          );
          Object.entries(params[0]).map((param) => {
            if (param[0] != "tsid") {
              trace[param[0]] = param[1];
            }
          });
          traces.push(trace);
        }
      }

      // Add Location Levels to list of traces
      if (levels?.includes(key)) {
        for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
          ts = tsData.ts[key][ts_idx];
          // Defaults for trace
          const trace = {
            x: ts.segments[0].values.map((value) => new Date(value[0])),
            y: ts.segments[0].values.map((value) => value[1]),
            showlegend: true,
            legend: { x: 1, xanchor: "right", y: 1 },
          };
          // Add all other parameters
          const params = locationLevelParams?.filter(
            (item) => item.levelid == key
          );
          Object.entries(params[0]).map((param) => {
            if (param[0] != "levelid") {
              trace[param[0]] = param[1];
            }
          });
          traces.push(trace);
        }
      }
    }

    setIsLoading(false);

    Plotly.newPlot(plotElement.current, traces, layout, {
      responsive: responsive,
    });
  }, [tsData]);

  return (
    <div
      className={gwMerge("gww-h-full gww-w-full", className)}
      style={{ height: layoutParams.height }}
    >
      <div
        ref={plotElement}
        id="plot"
        className="gww-h-full gww-w-full"
        style={{ height: layoutParams.height }}
      >
        {isLoading ? (
          loadingComponent ? (
            <>{loadingComponent}</>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
