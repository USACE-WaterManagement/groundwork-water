/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { TimeSeriesApi, Configuration } from "cwmsjs";
import Table from "../../display/Table";
const V2_API = new Configuration({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2",
  },
});

const TS_API = new TimeSeriesApi(V2_API);
const TSTable = ({ queryParams, precision, ...props }) => {
  const [data, setData] = useState(null);
  const [loadTime, setLoadTime] = useState(null);
  // Load the timeseries when the component loads in
  useEffect(() => {
    const startTime = window.performance.now();
    // Convert the incoming parameters for the data table into URI parameters
    const fetchData = async () => {
      try {
        TS_API.getCwmsDataTimeseriesRaw(queryParams)
          .then(async (r) => {
            let data = await r.raw.json();
            data.url = r.raw.url;
            return data;
          })
          .then((d) => {
            console.log(d);
            d.query_str = d.url;
            console.log(d);
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
  //   Let the user know the data is on it's way!
  if (!data) {
    return <div>Loading...</div>;
  } else if (data?.error) {
    return <div>Error: {data.error}</div>;
  } else if (data?.values.length == 0) {
    return (
      <div>
        No data found for the query{" "}
        {data?.url}
      </div>
    );
  }
  return (
    <>
      <Table
        h1="Time Series Data"
        subTitle={`Loaded in ${loadTime} seconds`}
        heading={["Date-Time", "Value", "Quality Code"]}
        precision={precision}
        content={data?.values}
      />
      {/* <div className={`table-responsive ${props?.className}`} style={{ maxHeight: "500px" }}>
        <table className="table">
          
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
      </div> */}
    </>
  );
};

export default TSTable;