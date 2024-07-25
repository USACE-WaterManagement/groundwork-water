/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from "react";
import { TimeSeriesApi, Configuration } from "cwmsjs";
import Plotly from "plotly.js-basic-dist";

const V2_API = new Configuration({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2",
  },
});

const TS_API = new TimeSeriesApi(V2_API);
/**
 * Component to fetch and plot timeseries data from the USACE CDA endpoint.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - Parameters for the timeseries query.
 * @param {Function} props.setLoadTime - Function to set the time taken to load the data.
 * @returns {JSX.Element} The rendered component.
 */
const TSPlot = ({ queryParams, responsive=true, ...props }) => {
  const [data, setData] = useState(null);
  const [loadTime, setLoadTime] = useState(null);
  const plotContainerRef = useRef(null);

  // Load the timeseries when the component loads in
  useEffect(() => {
    /**
     * Fetch timeseries data from the CDA endpoint.
     */
    const fetchData = async () => {
      const startTime = window.performance.now();
      try {
        TS_API.getCwmsDataTimeseriesRaw(queryParams)
          .then(async (r) => {
            let data = await r.raw.json();
            data.url = r.raw.url;
            return data;
          })
          .then((d) => {
            d.query_str = d.url;
            setData(d);
            setLoadTime(
              ((window.performance.now() - startTime) / 1000).toFixed(2)
            );
          })
          .catch((e) => {
            console.error(e);
            setData({ error: e.message });
          });
      } catch (error) {
        console.error("Failed to fetch: ", error);
        setData({ error: error.message });
      }
    };

    fetchData();
  }, [queryParams, setLoadTime]);

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
        title: queryParams?.name || "Timeseries Plot",
        xaxis: { title: "Date" },
        yaxis: { title: queryParams?.name.split(".")[1] },
      };
      Plotly.newPlot(plotContainerRef.current, plotData, layout, { responsive: responsive });
    }
  }, [data, queryParams]); // Re-plot when data changes

  if (!data) {
    return <div>Loading...</div>;
  } else if (data.error) {
    return <div>Error: {data.error}</div>;
  } else if (data.values && data.values.length === 0) {
    return <div>No data found for the query {data.url}</div>;
  }
  return (
    <div
      ref={plotContainerRef}
      title={`Loaded in ${loadTime} seconds`}
      style={{ width: "100%", height: "500px" }}
      {...props}
    ></div>
  );
};

export default TSPlot;
