/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from "react";
import Plotly from "plotly.js-basic-dist";

const CDA_ENDPOINT = "https://water.usace.army.mil/cwms-data";

/**
 * Component to fetch and plot timeseries data from the USACE CDA endpoint.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - Parameters for the timeseries query.
 * @param {Function} props.setLoadTime - Function to set the time taken to load the data.
 * @returns {JSX.Element} The rendered component.
 */
const TSPlot = ({ params, setLoadTime }) => {
    const [data, setData] = useState(null);
    const plotContainerRef = useRef(null);

    // Load the timeseries when the component loads in
    useEffect(() => {
        const queryString = new URLSearchParams(params).toString();

        /**
         * Fetch timeseries data from the CDA endpoint.
         */
        const fetchData = async () => {
            const startTime = window.performance.now();
            try {
                const response = await fetch(
                    `${CDA_ENDPOINT}/timeseries?${queryString}`,
                    {
                        headers: {
                            accept: "application/json;version=2",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const ts_data = await response.json();
                ts_data.query_str = queryString;
                setData(ts_data);
                setLoadTime(
                    ((window.performance.now() - startTime) / 1000).toFixed(2)
                );
            } catch (error) {
                console.error("Failed to fetch: ", error);
                setData({ error: error.message });
            }
        };

        fetchData();
    }, [params, setLoadTime]);

    // Plot the data with Plotly
    useEffect(() => {
        if (data && data.values && plotContainerRef.current) {
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
                title: params?.name || "Timeseries Plot",
                xaxis: { title: "Date" },
                yaxis: { title: params?.name.split(".")[1] },
            };

            Plotly.newPlot(plotContainerRef.current, plotData, layout);
        }
    }, [data, params]); // Re-plot when data changes

    if (!data) {
        return <div>Loading...</div>;
    } else if (data.error) {
        return <div>Error: {data.error}</div>;
    } else if (data.values && data.values.length === 0) {
        return (
            <div>
                No data found for the query{" "}
                {`${CDA_ENDPOINT}/timeseries?${data.query_str}`}
            </div>
        );
    }
    return (
        <div
            ref={plotContainerRef}
            style={{ width: "100%", height: "500px" }}
        ></div>
    );
};

export default TSPlot;
