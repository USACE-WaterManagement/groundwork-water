/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import useCdaTimeSeries from "../hooks/useCdaTimeSeries";
import Plotly from "plotly.js-basic-dist";

/**
 * Component to fetch and plot timeseries data from the USACE CDA endpoint.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - Parameters for the timeseries query.
 * @param {Function} props.setLoadTime - Function to set the time taken to load the data.
 * @returns {JSX.Element} The rendered component.
 */
const TSPlot = ({
  cdaParams = null,
  cdaUrl = null,
  queryOptions = null,
  responsive = true,
  plotParams = null,
  grid = null,
  shapes = [],
  annotations = [],
  autoSize: autoSize,
  plotHeight = 550,
  loadingComponent = null,
  layoutGrid = null,
  ...props
}) => {
  const plotContainerRef = useRef(null);
  const { data, isPending, error } = useCdaTimeSeries({
    cdaParams: cdaParams,
    cdaUrl: cdaUrl,
  });
  // Plot the data with Plotly
  useEffect(() => {
    if (data && data.values) {
      // Check for user inputs or use defaults
      // Set Defaults
      var plotTitle = data.name.split(".")[0]
      var yaxisText = `${data.name.split(".")[1]} (${data.verticalDatumInfo?.unit})`
      var xaxisText = "Date"
      var legendItem = null
      var plotType = "scatter"
      var plotMode = "lines"
      var plotColor = "blue"
      // Update with user inputs
      if (plotParams.title) { plotTitle = plotParams.title }
      if (plotParams.legend) { legendItem = plotParams.legend }
      if (plotParams.type) { plotType = plotParams.type }
      if (plotParams.mode) { plotMode = plotParams.mode }
      if (plotParams.color) { plotColor = plotParams.color }
      if (plotParams.xaxis) { xaxisText = plotParams.xaxis }
      if (plotParams.yaxis) { yaxisText = plotParams.yaxis }
      var plotData = [
        {
          name: legendItem,
          x: data.values.map((value) => new Date(value[0])),
          y: data.values.map((value) => value[1]),
          type: plotType,
          mode: plotMode,
          marker: { color: plotColor },
        },
      ];
      // Check for any Location Levels
      if (plotParams.levels) {
        plotParams.levels.map((level) => {
          plotData.push(
            {
              name: `${level.levelName} (${level.levelValue})`,
              x: [
                new Date(data.values[0][0]),
                new Date(data.values[data.values.length - 1][0])
              ],
              y: [level.levelValue, level.levelValue],
              type: "scatter",
              mode: "lines",
              line: { color: level.levelColor }
            }
          )
        })
      }

      const layout = {
        title: plotTitle,
        autosize: autoSize,
        shapes: shapes,
        annotations: annotations,
        xaxis: { title: xaxisText },
        yaxis: { title: yaxisText },
      };
      if (layoutGrid) layout.grid = layoutGrid;
      Plotly.newPlot(plotContainerRef.current, plotData, layout, {
        responsive: responsive,
      });
    }
  }, [data, cdaParams, shapes, annotations, layoutGrid, responsive]); // Re-plot when data changes

  if (isPending) {
    return loadingComponent ? <>{loadingComponent}</> : <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error?.message}</div>;
  } else if (data.values && data.values.length === 0) {
    return <div>No data found for the query {data.url}</div>;
  }
  return (
    <div
      ref={plotContainerRef}
      className="gww-h-full gww-w-full"
      style={{ width: "100%", height: plotHeight }}
      {...props}
    ></div>
  );
};

export default TSPlot;
