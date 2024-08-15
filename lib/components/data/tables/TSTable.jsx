/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { TimeSeriesApi, Configuration } from "cwmsjs";
import { useQuery } from "@tanstack/react-query";
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
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["timeseriesData", queryParams],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data?.values.length === 0) {
    return <div>No data found for the query {data?.url}</div>;
  }

  return (
    <>
      <Table
        subTitle={`A total of ${data?.values.length} values were found.`}
        heading={["Date-Time", "Value", "Quality Code"]}
        precision={precision}
        content={data?.values}
        {...props}
      />
    </>
  );
};

export default TSTable;
