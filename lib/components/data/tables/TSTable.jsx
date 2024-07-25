/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { TimeSeriesApi, Configuration } from "cwmsjs";
import { useQuery } from '@tanstack/react-query';
import Table from "../../display/Table";

const V2_API = new Configuration({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2",
  },
});

const TS_API = new TimeSeriesApi(V2_API);

const fetchData = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  const response = await TS_API.getCwmsDataTimeseriesRaw(queryParams);
  const data = await response.raw.json();
  data.url = response.raw.url;
  return data;
};

const TSTable = ({ queryParams, precision, ...props }) => {
  const [loadTime, setLoadTime] = useState(null);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['timeseriesData', queryParams],
    queryFn: fetchData,
    onSuccess: () => {
      setLoadTime(((window.performance.now() - startTime) / 1000).toFixed(2));
    }
  });

  useEffect(() => {
    const startTime = window.performance.now();
    setLoadTime(null);
  }, [queryParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data?.values.length === 0) {
    return (
      <div>
        No data found for the query {data?.url}
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
      {/* If you want the table rows instead of your `Table` component, uncomment and use the code below */}
      {/* 
      <div className={`table-responsive ${props?.className}`} style={{ maxHeight: "500px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date-Time</th>
              <th>Value</th>
              <th>Quality Code</th>
            </tr>
          </thead>
          <tbody>
            {data?.values.map((row, index) => {
              let [date, value, quality] = row;
              return (
                <tr key={index} className={quality !== 0 ? "table-warning" : ""}>
                  <td>{new Date(date).toLocaleString()}</td>
                  <td>{value ? value.toFixed(2) : "----"}</td>
                  <td>{quality}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      */}
    </>
  );
};

export default TSTable;