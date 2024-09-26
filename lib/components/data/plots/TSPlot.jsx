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
  title = "Timeseries Plot",
  cdaParams = null,
  cdaUrl = null,
  queryOptions = null,
  responsive = true,
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
      const plotData = [
        {
          x: data.values.map((value) => new Date(value[0])),
          y: data.values.map((value) => value[1]),
          type: "scatter",
          mode: "lines",
          marker: { color: "blue" },
        },
      ];
      const layout = {
        title: title,
        autosize: autoSize,
        shapes: shapes,
        annotations: annotations,
        xaxis: { title: "Date" },
        yaxis: { title: cdaParams?.name.split(".")[1] },
      };
      if (layoutGrid) layout.grid = layoutGrid;
      Plotly.newPlot(plotContainerRef.current, plotData, layout, {
        responsive: responsive,
      });
    }
  }, [data, cdaParams, title, shapes, annotations, layoutGrid, responsive]); // Re-plot when data changes

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
      title={title}
      className="gww-h-full gww-w-full"
      style={{ width: "100%", height: plotHeight }}
      {...props}
    ></div>
  );
};

export default TSPlot;
