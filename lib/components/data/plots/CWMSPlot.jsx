import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Configuration, LevelsApi, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";
import { gwMerge } from "@usace/groundwork";

const config_v2 = new Configuration({
  headers: {
    accept: "application/json;version=2",
  },
});
const ts_api = new TimeSeriesApi(config_v2);


export default function CWMSPlot({
  tsids,
  office,
  begin,
  end,
  title,
  unit = "EN",
  pageSize,
  timeseriesParams,
  locationLevelParams,
  layoutParams,
  className = "",
  responsive = true,
  loadingComponent = null,
}) {

  const plotElement = useRef(null);
  const [plotTSIDs, setPlotTSIDs] = useState(null);


  const layout = layoutParams


  useEffect(() => {
    if (!tsids.length)
      throw Error("You must specify one or more Timeseries IDs to plot.");
    if (!office) throw Error("You must specify a 3 letter ID for the office");
    if (typeof tsids == "string") {
      tsids = [tsids];
    }
    setPlotTSIDs(tsids);
  }, [title, tsids, office]);


  const fetchData = async () => {
    let promises = plotTSIDs.map(async (name) => {

      try {

        if (timeseriesParams.map(item => item.tsid).includes(name)) {
          console.log("TS Call", name)
          return await ts_api.getCwmsDataTimeseries({
            name,
            begin,
            end,
            pageSize,
            unit,
            office,
          });
        }

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
    console.log(values)
    let _data = { ts: {}, dates: [] };
    values.forEach((result) => {
      console.log(result)
      if (result && result.name) {
        if (!_data.ts[result.name]) {
          _data.ts[result.name] = [];
        }
        _data.ts[result.name].push(result);
      } else if (result === null) {
        console.warn(`Skipping as no data was found.`);
      } else {
        console.warn(`No data found for ${result?.name}`);
      }
    });
    return _data;
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

    // Create traces keyed to the ts
    let traces = [];
    let ts;

    for (let k_idx = 0; k_idx < ts_keys.length; k_idx++) {
      const key = ts_keys[k_idx];
      for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
        ts = tsData.ts[key][ts_idx];
        ts.values.map((value) => {
          if (!dates.includes(value[0])) { dates.push(value[0]) }
        })
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
        };
        traces.push(trace);
      }
    }
    dates.sort()

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