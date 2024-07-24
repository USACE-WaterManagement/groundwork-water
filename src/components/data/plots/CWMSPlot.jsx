import { useEffect, useState, useRef } from "react";
import { Configuration, TimeSeriesApi } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";

import dayjs from "dayjs";

const config_v2 = new Configuration({
  headers: {
    accept: "application/json;version=2",
  },
});
const ts_api = new TimeSeriesApi(config_v2);

export default function CWMSPlot({
  title,
  tsids,
  office,
  begin,
  end,
  unit = "EN",
}) {
  const plotElement = useRef(null);

  // with no begin/end present defaults to 24 hours lookback (CDA default)
  const [tsData, setTSData] = useState(null);
  const [metaData, setMetaData] = useState({
    title,
    tsids,
    office,
  });
  // Confirm Inputs
  useEffect(() => {
    if (!title) {
      // Combine project names as the title if one is not given
      setMetaData(
        (metaData.title = tsids.map((ts) => ts.split(".")[0]).join(", "))
      );
    }
    if (!tsids.length)
      throw Error(
        "You must specify one or more Timeseries IDs to plot. I.e. tsids={[tsid1, tsid2, ...]}"
      );
    if (!office) throw Error("You must specify a 3 letter ID for the office");
    if (typeof tsids == "string") {
      tsids = [tsids];
      setMetaData({
        ...metaData,
        tsids: tsids,
      });
    }
  });
  // Data retrieval
  useEffect(() => {
    if (!tsData && !tsData?.ts?.values) {
      // Combine the time series segments and return it ordered by units for plotting
      //  data = interlace_data(data);
      // const plot = $("#plot");
      let promises = [];
      tsids.forEach((name) => {
        promises.push(
          ts_api.getCwmsDataTimeseries({
            name,
            end,
            unit,
            begin,
            office,
          })
        );
      });
      let _data = { ts: {}, dates: [] };
      // Set the dates if they are null
      if (!begin) begin = dayjs().subtract(24, "hour");
      if (!end) end = dayjs();
      // Build our plot dates

      Promise.all(promises).then((values) => {
        values.forEach((result) => {
          if (result?.units) {
            if (!_data.ts[result.units]) {
              _data.ts[result.units] = [];
            }
            console.log("push");
            _data.ts[result.units].push(result);
          } else {
            console.warn(`No unit found for ${result?.name}`);
          }
        });
        console.log("write", { _data });
        // plot.innerHTML = "";
        // Build Traces
        var unit_keys = Object.keys(_data.ts);
        // Calculate the grid's rows based on number of keys
        // Each subplot shares the same units which might have similar scaling
        var grid_col_cnt = unit_keys.length;
        var layout = {
          autosize: true,
          shapes: [],
          annotations: [],
          title: {
            text: title + "<br>" + "Units: " + unit_keys.join(", "),
            font: {
              family: "DejaVuSansMono, monospace",
            },
          },
          grid: {
            rows: grid_col_cnt,
            columns: 1,
            pattern: "independent",
          },
        };
        console.log(layout);
        // Initialize our traces for plotting
        var traces = [];
        let trace_cnt = 1;
        let domain_start = 0;
        let domain_delta = 1 / unit_keys.length;
        let domain_end = domain_delta;
        if (unit_keys.length > 4) {
          layout["font"] = {
            size: 8,
          };
        }

        // Loop through our keys to create a subplot for each
        for (var k_idx = 0; k_idx < unit_keys.length; k_idx++) {
          var key = unit_keys[k_idx];
          // Add the time series trace to the subplot
          console.log(key, _data.ts, _data.ts[key]);
          for (var ts_idx = 0; ts_idx < _data.ts[key].length; ts_idx++) {
            var ts = _data.ts[key][ts_idx];
            let trace = {
              x: _data["dates"],
              y: ts.values,
              // xaxis: "x" + trace_cnt,
              yaxis: "y" + trace_cnt,
              type: "scatter",
              mode: "lines",
              showlegend: true,
              legend: {
                x: 1,
                xanchor: "right",
                y: 1,
              },
              name: ts.param + "<br>" + ts.version,
            };
            traces.push(trace);
          }
          let title_text = ts.param + "<br>(" + key + ")";
          if (unit_keys.length > 3) title_text = key;
          // Write the YAxis Units to the label
          layout["yaxis" + trace_cnt] = {
            domain: [
              Math.round(domain_start * 100) / 100,
              Math.round(domain_end * 100) / 100,
            ],
            title: {
              text: title_text,
            },
          };
          if (unit_keys.length > 4) {
            layout["yaxis" + trace_cnt]["nticks"] = 1;
            layout["yaxis" + trace_cnt]["tickvals"] = [
              ts.values[ts.values.length / 2],
            ];
            layout["yaxis" + trace_cnt]["dtick"] = 1;
            layout["yaxis" + trace_cnt]["tick0"] = 0.5;
          }
          //
          // Add user selected levels
          // Decide if proj or stream
          //
          // try {
          //   layout = getLevels(layout, trace_cnt, ts.param, data["dates"]);
          // } catch (err) {
          //   saveError("error", err);
          // }
          domain_start += domain_delta;
          domain_end += domain_delta;
          // One we've added this unit's traces, increase the trace count (yaxis counter) for the next subplot
          trace_cnt++;
        }

        // Add our layout and traces to the DOM
        console.log(plotElement.current);
        Plotly.newPlot(plotElement.current, traces, layout, {
          responsive: true,
        });
        //   // Attempt to update the plot popout
        //   if (popoutPlotWindow && !popoutPlotWindow.plotLock) {
        //     // Plotly.newPlot(popoutPlotWindow.plotContainer, traces, layout, { responsive: true });
        //     popoutPlotWindow.document.getElementById("plot").innerHTML = "";
        //     // Check if the plot is locked, if not update it
        //     popoutPlotWindow.createPopoutPlot(traces, layout);
        //   }
        setTSData(_data);
        //   setStatusText(settings.range + " Hours Plotted");
      });
    }
  }, [tsids]);

  console.log(tsData);
  if (!tsData) return <div>Loading...</div>;
  return (
    <div ref={plotElement} id="plot">
      Loading...
    </div>
  );
}
