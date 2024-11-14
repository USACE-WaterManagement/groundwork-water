import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Configuration, LevelsApi, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";
import { gwMerge } from "@usace/groundwork";
import dayjs from "dayjs";

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

const level_api = new LevelsApi(config_level)



export default function CWMSPlot({
  tsids,
  levels,
  office,
  begin,
  end,
  title,
  unit,
  timeseriesParams,
  locationLevelParams,
  layoutParams,
  className = "",
  responsive = true,
  loadingComponent = null,
}) {

  const plotElement = useRef(null);
  const [plotTSIDs, setPlotTSIDs] = useState(null);
  const [plotLevelIDs, setPlotLevels] = useState(null);


  const layout = layoutParams


  useEffect(() => {
    if (!tsids.length)
      throw Error("You must specify one or more Timeseries IDs to plot.");
    if (!office) throw Error("You must specify a 3 letter ID for the office");
    if (typeof tsids == "string") {
      tsids = [tsids];
    }
    setPlotTSIDs(tsids);
    setPlotLevels(levels)
  }, [title, tsids, levels, office]);


  const fetchData = async () => {

    let ts_promises = plotTSIDs.map(async (tsid) => {
      try {
        // Currently, large page size calls are blocked, so the default of 500 is used
        let pageSize = 500
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
          unit: unit
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    })

    let lev_promises = plotLevelIDs.map(async (item) => {
      try {
        return await level_api.getCwmsDataLevels({
          levelIdMask: item,
          begin: dayjs(begin).format("YYYY-MM-DDTHH:mm:ss") + "Z",
          end: dayjs(end).format("YYYY-MM-DDTHH:mm:ss") + "Z",
          office: office,
          format: "json",
          unit: unit
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    })

    let tsdata = { ts: {} };

    let values = await Promise.all(ts_promises)
    values.forEach((result) => {
      if (result && result.name) {
        if (!tsdata.ts[result.name]) {
          tsdata.ts[result.name] = [];
        }
        tsdata.ts[result.name].push(result);
      } else if (result === null) {
        console.warn(`Skipping as no data was found.`);
      } else {
        console.warn(`No data found for ${result?.name}`);
      }
    })

    let lev_values = await Promise.all(lev_promises)
    lev_values.forEach(result => {
      const name = result["location-levels"]["location-levels"][0].name
      const levels = result["location-levels"]["location-levels"][0].values
      if (result && name) {
        if (!tsdata.ts[name]) {
          tsdata.ts[name] = [];
        }
        tsdata.ts[name].push(levels);
      } else if (result === null) {
        console.warn(`Skipping as no data was found.`);
      } else {
        console.warn(`No data found for ${result?.name}`);
      }
    })

    return tsdata;
  };

  const {
    data: tsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["timeseries", plotTSIDs, begin, end, unit, office],
    queryFn: fetchData,
    enabled: !!plotElement.current, // Only run the query when plotElement is available
  });


  useEffect(() => {
    if (!plotElement.current || !tsData) {
      return;
    }


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
          const params = timeseriesParams.filter((item) => item.tsid == ts.name)
          const trace = {
            x: ts.values.map((value) => new Date(value[0])),
            y: ts.values.map((value) => value[1]),
            name: params[0].name,
            mode: params[0].mode,
            type: params[0].type,
            marker: params[0].marker,
            line: params[0].line,
            showlegend: true,
            legend: { x: 1, xanchor: "right", y: 1 },
            yaxis: params[0].yaxis,
          }
          traces.push(trace)
        }
      }

      // Add Location Levels to list of traces
      if (levels.includes(key)) {
        for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
          ts = tsData.ts[key][ts_idx];
          const params = locationLevelParams.filter((item) => item.levelid == key)
          const trace = {
            x: ts.segments[0].values.map(value => new Date(value[0])),
            y: ts.segments[0].values.map(value => value[1]),
            name: params[0].name,
            mode: params[0].mode,
            type: params[0].type,
            marker: params[0].marker,
            line: params[0].line,
            showlegend: true,
            legend: { x: 1, xanchor: "right", y: 1 },
            yaxis: params[0].yaxis,
          }
          traces.push(trace)
        }
      }
    }



    Plotly.newPlot(plotElement.current, traces, layout, {
      responsive: responsive,
    });
  }, [tsData, title]);

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
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}