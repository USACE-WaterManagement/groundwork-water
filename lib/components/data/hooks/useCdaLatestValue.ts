import { useEffect, useState } from "react";
import useCdaCatalog from "./useCdaCatalog";
import useCdaTimeSeries from "./useCdaTimeSeries";
import { getLatestEntry } from "../helpers/cda";
import { TimeSeriesCatalogEntry } from "cwmsjs";

interface useCdaLatestValueParams {
  tsId: string;
  office: string;
  unit?: string;
  cdaUrl?: string;
}

const useCdaLatestValue = ({
  tsId,
  office,
  unit,
  cdaUrl,
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
  });

  const enableCatalog = !ts.isPending && ts.data?.values?.length === 0;

  const catalog = useCdaCatalog({
    cdaParams: { dataset: "TIMESERIES", office, like: tsId },
    cdaUrl: cdaUrl,
    queryOptions: {
      enabled: enableCatalog,
    },
  });

  useEffect(() => {
    if (!catalog.data || !catalog.data.entries) {
      return;
    }
    const firstEntry: TimeSeriesCatalogEntry = catalog.data.entries?.[0];
    if (!firstEntry.extents?.[0].latestTime) {
      return;
    }
    setLatestDate(firstEntry.extents?.[0].latestTime?.toISOString());
  }, [catalog]);

  const isPending =
    ts.isPending || (enableCatalog && (catalog.isPending || !latestDate));

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
