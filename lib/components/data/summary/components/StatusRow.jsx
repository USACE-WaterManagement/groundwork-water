import { TextLink, TableRow, TableCell, Skeleton } from "@usace/groundwork";
import dayjs from "dayjs";
import { useCdaConfig } from "../../helpers/cda";
import { TimeSeriesApi } from "cwmsjs";
import { useQuery } from "@tanstack/react-query";
import getQualityStr from "../../utilities/qualityDecoder";
import { useLayoutEffect, useRef, useState } from "react";

export default function StatusRow({
  office,
  linkPath,
  name,
  pageSize,
  lookBackHours,
  cdaUrl,
  dateFormat,
}) {
  // append fileTsids to tsids
  const config = useCdaConfig("v2", cdaUrl);
  const tsApi = new TimeSeriesApi(config);
  const lookBack = dayjs().subtract(lookBackHours, "hour");
  const [statusDelta, setStatusDelta] = useState(null);

  const {
    data: tsData,
    error: tsError,
    isPending: tsPending,
  } = useQuery({
    queryKey: ["dataStatusTS", name, dayjs().format("YYYY-MM-DDTHH:mm:ss")],
    queryFn: async () => {
      return tsApi
        .getTimeSeries({
          office,
          name: name,
          begin: dayjs(lookBack).format("YYYY-MM-DDTHH:mm:ssZZ"),
          end: dayjs().format("YYYY-MM-DDTHH:mm:ssZZ"),
          pageSize,
        })
        .then((data) => {
          let returnData = { name: data?.name, values: [null, [null]] };
          if (data?.name && data?.values) {
            if (data.values.length > 0) {
              let quality_array = [];
              let dt = new Date(0);

              // Catch missing data from lookback
              const first_dt = data.values?.[0]?.[0];
              if (first_dt > lookBack.valueOf()) {
                const missing_count =
                  dayjs(first_dt).diff(lookBack, "hours", true) * 4;
                for (let i = 0; i < missing_count; i++) {
                  quality_array.push("missing");
                }
              }

              // Read response
              data.values.map((val) => {
                // Latest Date-time
                if (val[0] > dt && val[1] != null) {
                  dt = val[0];
                }
                // Quality
                let quality = getQualityStr(val[2])?.toLowerCase();
                if (val[1] === null) {
                  quality = "missing";
                }
                quality_array.push(quality);
              });
              returnData.values = [dt, [quality_array]];
            }
          }
          return returnData;
        });
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: name != null,
  });
  const cellRef = useRef(null);

  useLayoutEffect(() => {
    if (tsData?.values?.[1]?.[0])
      setStatusDelta(
        Math.round(
          cellRef.current?.getBoundingClientRect()?.width /
            tsData?.values[1][0].length
        )
      );
  }, [tsPending]);
  if (tsError) {
    return (
      <TableRow>
        <TableCell>Error: {tsError.message}</TableCell>
      </TableRow>
    );
  }
  return (
    <TableRow>
      {tsPending ? (
        <TableCell colSpan={3}>
          <Skeleton className="gww-w-100" />
        </TableCell>
      ) : (
        <>
          <TableCell title={name}>
            {linkPath ? (
              <TextLink href={`${linkPath}/${name.split(".")[0]}`}>
                {`${name.split(".")[0]} ${name.split(".")[1]}`}
              </TextLink>
            ) : (
              `${name.split(".")[0]} ${name.split(".")[1]}`
            )}
          </TableCell>
          <TableCell>
            <svg
              ref={cellRef}
              key={`svg-${name}`}
              width="full" //{lookBackHours / 24 * 96 * 2 + 10}
              height="10"
            >
              {tsData?.values[1][0]
                ? tsData?.values[1][0].map((val, idx) => {
                    console.log({ idx });
                    return (
                      <line
                        key={`line-${name}-${idx}`}
                        x1={Math.round(statusDelta * idx)}
                        y1="0"
                        x2={Math.round(statusDelta * idx)}
                        y2="10"
                        strokeWidth={statusDelta + "px"}
                        className={val}
                      />
                    );
                  })
                : null}
            </svg>
          </TableCell>
          <TableCell>
            {tsData?.values?.[0]
              ? dayjs(tsData.values[0]).format(dateFormat)
              : "Missing"}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
