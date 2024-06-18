/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const CDA_ENDPOINT = "https://water.usace.army.mil/cwms-data";

const TSTable = ({ params, setLoadTime }) => {
    const [data, setData] = useState(null);
    // Load the timeseries when the component loads in
    useEffect(() => {
        // Convert the incoming parameters for the data table into URI parameters
        const queryString = new URLSearchParams(params).toString();
        const fetchData = async () => {
            try {
                const startTime = window.performance.now();
                fetch(CDA_ENDPOINT + `/timeseries?${queryString}`, {
                    headers: {
                        accept: "application/json;version=2",
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch: ", response.statusText);
                        }
                        return response.json();
                    })
                    .then((ts_data) => {
                        ts_data.query_str = queryString;
                        setData(ts_data);
                    })
                    .catch((error) => {
                        setData({ error: error.message });
                        setLoadTime(
                            ((window.performance.now() - startTime) / 1000).toFixed(3)
                        );
                        console.error("Failed to fetch: ", error);
                    });
            } catch (error) {
                console.error("Failed to fetch: ", error);
            }
        };
        fetchData();
    }, [params, setLoadTime]);
    //   Let the user know the data is on it's way!
    if (!data) {
        return <div>Loading...</div>;
    } else if (data?.error) {
        return <div>Error: {data.error}</div>;
    } else if (data?.values.length == 0) {
        return (
            <div>
                No data found for the query{" "}
                {CDA_ENDPOINT + `/timeseries?${data?.query_str}`}
            </div>
        );
    }
    return (
        <>
            <div className="table-responsive" style={{ maxHeight: "500px" }}>
                <table className="table">
                    <thead className="sticky-top">
                        <tr>
                            <th>Date-Time</th>
                            <th>Value</th>
                            <th>Quality Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.values.map((row, index) => {
                            let { 0: date, 1: value, 2: quality } = row;
                            return (
                                // Highlight the row if the quality is anything other than 0 (unscreened)
                                <tr key={index} className={quality != 0 ? "table-warning" : ""}>
                                    <td>{new Date(date).toLocaleString()}</td>
                                    <td>{value ? value.toFixed(2) : "----"}</td>
                                    <td>{quality}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TSTable;