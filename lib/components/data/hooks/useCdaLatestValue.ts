import { useEffect, useState } from "react";
import useCdaCatalog from "./useCdaCatalog";
import useCdaTimeSeries from "./useCdaTimeSeries";
import { getLatestEntry } from "../helpers/cda";
import { TimeSeriesCatalogEntry, TimeSeries } from "cwmsjs";
import { UseQueryOptions } from "@tanstack/react-query";

interface useCdaLatestValueParams {
  tsId: string;
  office: string;
  unit?: string;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<TimeSeries>>;
}

const useCdaLatestValue = ({
  tsId,
  office,
  unit,
  cdaUrl,
  queryOptions,
}: useCdaLatestValueParams) => {
  const [latestDate, setLatestDate] = useState("");
  const begin = latestDate;
  const end = latestDate;
  const ts = useCdaTimeSeries({
    cdaParams: {
      name: tsId,
      office,
      ...(unit && { unit }),
      ...(begin && { begin }),
      ...(end && { end }),
    },
    cdaUrl: cdaUrl,
    queryOptions: {
      enabled: !!tsId && !!office,
      ...queryOptions,
    },
  });

  const enableCatalog = !ts.isPending && ts.data?.values?.length === 0;

  const catalog = useCdaCatalog({
    cdaParams: { dataset: "TIMESERIES", office, like: tsId },
    cdaUrl: cdaUrl,
    queryOptions: {
      enabled: enableCatalog,
      ...queryOptions,
    },
  });

  useEffect(() => {
    if (!catalog?.data || !catalog?.data?.entries) {
      return;
    }
    const firstEntry: TimeSeriesCatalogEntry = catalog.data?.entries?.[0];
    const latestTime = firstEntry?.extents?.[0].latestTime;
    if (!latestTime) {
      return;
    }

    // Need to check if latestTime is already a string because React Query's
    // persister returns Date types as strings upon retrieval
    const latestTimeIso =
      typeof latestTime == "string" ? latestTime : latestTime.toISOString();

    setLatestDate(latestTimeIso);
  }, [catalog]);

  const isPending = catalog?.isPending || ts?.isPending;
  const isFetching = ts.isFetching || catalog.isFetching;

  const latestEntry = ts.data ? getLatestEntry(ts.data) : undefined;

  const data = latestEntry
    ? {
        datetime: latestEntry[0],
        value: latestEntry[1],
        qualityCode: latestEntry[2],
        units: ts.data?.units,
      }
    : undefined;
  return { ...ts, data, isPending, isFetching };
};

export { useCdaLatestValue };
export default useCdaLatestValue;
