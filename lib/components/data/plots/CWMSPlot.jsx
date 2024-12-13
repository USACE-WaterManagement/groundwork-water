import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Configuration, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";
import dayjs from "dayjs";
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
  fontSize,
  unit = "EN",
  className = "",
  plotHeight = 550,
  shapes = [],
  autoSize = true,
  annotations = [],
  responsive = true,
  loadingComponent = null,
  layoutGrid = null,
}) {
  const plotElement = useRef(null);
  const [metaData, setMetaData] = useState(null);
  const [plotTitle, setPlotTitle] = useState(null);
  const [plotTSIDs, setPlotTSIDs] = useState(null);
  const [plotFontSize, setPlotFontSize] = useState(fontSize);

  useEffect(() => {
    if (!title) {
      setPlotTitle((Array.isArray(tsids) ? tsids[0] : tsids).split(".")[0]);
    }
    if (!tsids.length)
      throw Error("You must specify one or more TimeSeries IDs to plot.");
    if (!office) throw Error("You must specify a 3 letter ID for the office");
    if (typeof tsids == "string") {
      tsids = [tsids];
    }
    setPlotTSIDs(tsids);
  }, [title, tsids, office]);

  const fetchData = async () => {
    let promises = plotTSIDs.map(async (name) => {
      try {
        return await ts_api.getTimeSeries({
          name,
          end,
          unit,
          begin,
          office,
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
    let _data = { ts: {}, dates: [] };
    // TODO: This should probably be the parameter not the units
    values.forEach((result) => {
      if (result && result.units) {
        if (!_data.ts[result.units]) {
          _data.ts[result.units] = [];
        }
        _data.ts[result.units].push(result);
      } else if (result === null) {
        console.warn(`Skipping as no data was found.`);
      } else {
        console.warn(`No unit found for ${result?.name}`);
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

    let unit_keys = Object.keys(tsData.ts);
    let grid_col_cnt = unit_keys.length;
    const layout = {
      autosize: autoSize,
      title: title,
      shapes: shapes,
      annotations: annotations,
    };
    if (title) layout.title = title;
    else
      layout.title = {
        text: `${plotTitle}<br>Units: ${unit_keys.join(", ")}`,
        font: {
          family: "DejaVuSansMono, monospace",
        },
      };
    if (layoutGrid) layout.grid = layoutGrid;
    else
      layout.grid = { rows: grid_col_cnt, columns: 1, pattern: "independent" };

    let traces = [];
    let trace_cnt = 1;
    let domain_start = 0;
    let domain_delta = 1 / unit_keys.length;
    let domain_end = domain_delta;

    // Force the font size if specified
    if (plotFontSize) layout["font"] = { size: plotFontSize };
    else if (unit_keys.length > 4) {
      layout["font"] = { size: 8 };
    }

    // Create traces keyed to the unit
    let ts;
    for (let k_idx = 0; k_idx < unit_keys.length; k_idx++) {
      const key = unit_keys[k_idx];
      for (let ts_idx = 0; ts_idx < tsData.ts[key].length; ts_idx++) {
        ts = tsData.ts[key][ts_idx];
        const trace = {
          x: ts.values.map((value) => new Date(value[0])),
          y: ts.values.map((value) => value[1]),
          yaxis: "y" + trace_cnt,
          type: "scatter",
          mode: "lines",
          showlegend: true,
          legend: { x: 1, xanchor: "right", y: 1 },
          name: `${ts.name.split(".")[1]}<br>${ts.name.split(".")[5]}`,
        };
        traces.push(trace);
      }
      let title_text = `${ts.name.split(".")[1]}<br>(${key})`;
      if (unit_keys.length > 3) title_text = key;

      layout["yaxis" + trace_cnt] = {
        domain: [
          Math.round(domain_start * 100) / 100,
          Math.round(domain_end * 100) / 100,
        ],
        title: { text: title_text },
      };
      // Alter if there are more than 4 units / view ports
      if (unit_keys.length > 4) {
        layout["yaxis" + trace_cnt]["nticks"] = 1;
        layout["yaxis" + trace_cnt]["tickvals"] = [
          ts.values[ts.values.length / 2],
        ];
        layout["yaxis" + trace_cnt]["dtick"] = 1;
        layout["yaxis" + trace_cnt]["tick0"] = 0.5;
      }

      domain_start += domain_delta;
      domain_end += domain_delta;
      trace_cnt++;
    }

    Plotly.newPlot(plotElement.current, traces, layout, {
      responsive: responsive,
    });
  }, [tsData, title]);

  return (
    <div
      className={gwMerge("gww-h-full gww-w-full", className)}
      style={{ height: plotHeight }}
    >
      <div
        ref={plotElement}
        id="plot"
        className="gww-h-full gww-w-full"
        style={{ height: plotHeight }}
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
