
async function createPlot(data) {
    // Combine the time series segments and return it ordered by units for plotting
    //  data = interlace_data(data);
    const plot = $("#plot");
    plot.innerHTML = ""
    // Build Traces
    var unit_keys = Object.keys(data["ts"]);
    // Calculate the grid's rows based on number of keys
    // Each subplot shares the same units which might have similar scaling
    var grid_col_cnt = unit_keys.length;
    var layout = {
        autosize: true,
        shapes: [],
        annotations: [],
        title: {
            text: proj + "<br>" + "Units: " + unit_keys.join(", "),
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
    // Initialize our traces for plotting
    var traces = [];
    let trace_cnt = 1;
    let domain_start = 0;
    let domain_delta = 1 / unit_keys.length;
    let domain_end = domain_delta
    if (unit_keys.length > 4) {
        layout["font"] = {
            size: 8
        };
    }

    // Loop through our keys to create a subplot for each
    for (var k_idx = 0; k_idx < unit_keys.length; k_idx++) {
        var key = unit_keys[k_idx];
        // Add the time series trace to the subplot
        for (var ts_idx = 0; ts_idx < data["ts"][key].length; ts_idx++) {
            var ts = data["ts"][key][ts_idx];
            let trace = {
                x: data["dates"],
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
        if (unit_keys.length > 3) title_text = key
        // Write the YAxis Units to the label
        layout["yaxis" + trace_cnt] = {
            domain: [Math.round(domain_start * 100) / 100, Math.round(domain_end * 100) / 100],
            title: {
                text: title_text,
            },
        };
        if (unit_keys.length > 4) {
            layout["yaxis" + trace_cnt]["nticks"] = 1
            layout["yaxis" + trace_cnt]["tickvals"] = [ts.values[ts.values.length / 2]];
            layout["yaxis" + trace_cnt]["dtick"] = 1;
            layout["yaxis" + trace_cnt]["tick0"] = 0.5;
        }
        //
        // Add user selected levels
        // Decide if proj or stream
        //
        try {
            layout = getLevels(layout, trace_cnt, ts.param, data["dates"])
        } catch(err) {
            saveError("error", err);
        }
        domain_start += domain_delta;
        domain_end += domain_delta;
        // One we've added this unit's traces, increase the trace count (yaxis counter) for the next subplot
        trace_cnt++;
    }

    // Add our layout and traces to the DOM
    Plotly.newPlot(plot, traces, layout, { responsive: true });
    // Attempt to update the plot popout
    if (popoutPlotWindow && !popoutPlotWindow.plotLock) {
       // Plotly.newPlot(popoutPlotWindow.plotContainer, traces, layout, { responsive: true });
        popoutPlotWindow.document.getElementById("plot").innerHTML = ""
        // Check if the plot is locked, if not update it
        popoutPlotWindow.createPopoutPlot(traces, layout)
    }
    setStatusText(settings.range + " Hours Plotted");
}

export { createPlot }