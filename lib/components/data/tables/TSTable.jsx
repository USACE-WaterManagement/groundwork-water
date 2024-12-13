/* eslint-disable react/prop-types */

import { TimeSeriesApi, Configuration } from "cwmsjs";
import Table from "../../display/Table";
import useCdaTimeSeries from "../hooks/useCdaTimeSeries";

const V2_API = new Configuration({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2",
  },
});

const TS_API = new TimeSeriesApi(V2_API);

const fetchData = async ({ queryKey }) => {
  const [, cdaParams] = queryKey;
  const response = await TS_API.getTimeSeriesRaw(cdaParams);
  const data = await response.raw.json();
  data.url = response.raw.url;
  return data;
};

const TSTable = ({ cdaParams, queryOptions, cdaUrl, ...props }) => {
  const { data, error, isLoading, isError } = useCdaTimeSeries({
    cdaParams: cdaParams,
    queryOptions: queryOptions,
    cdaUrl: cdaUrl,
  });
  if (cdaParams) {
    if (isLoading || props?.isLoading) {
      return <div>Loading...</div>;
    }

    if (isError || props?.isError) {
      return <div>Error: {error.message}</div>;
    }

    if (data?.values?.length === 0) {
      return <div>No data found for the query {data?.url}</div>;
    }
  }

  return (
    <>
      <Table
        subTitle={`A total of ${data?.values.length} values were found.`}
        heading={["Date-Time", "Value", "Quality Code"]}
        content={props?.content || data?.values}
        {...props}
      />
    </>
  );
};

export default TSTable;
