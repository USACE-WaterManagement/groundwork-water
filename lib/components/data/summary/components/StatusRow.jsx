import {
  Badge,
  TextLink,
  TableRow,
  TableCell,
  Skeleton,
} from "@usace/groundwork";
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
      let returnData = { name: null, values: [null, [null]] };
      return tsApi
        .getTimeSeries({
          office,
          name: name,
          begin: dayjs(lookBack).format("YYYY-MM-DDTHH:mm:ssZZ"),
          end: dayjs().format("YYYY-MM-DDTHH:mm:ssZZ"),
          pageSize,
        })
        .then((data) => {
          returnData = { name: data?.name, values: [null, [null]] };
          if (data?.name && data?.values) {
            if (data.values.length > 0) {
              returnData.values = data?.values 
            }
          }
          returnData.values = data?.values;
          return returnData;
        })
        .catch((e) => {
          return { ...returnData, response: e.response };
        });
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: name != null && office != null,
  });
  const cellRef = useRef(null);

  useLayoutEffect(() => {
    if (tsData?.values)
      setStatusDelta(
        Math.round(
          cellRef.current?.getBoundingClientRect()?.width /
            tsData?.values.length
        )
      );
  }, [tsPending]);
  if (!office) {
    return (
      <TableRow>
        <TableCell>
          <Badge color="red">Error</Badge>
        </TableCell>
        <TableCell colSpan={2}>No office provided</TableCell>
      </TableRow>
    );
  }
  if (tsError || tsData?.response) {
    const STATUS_CODE = tsData?.response?.status;
    return (
      <TableRow>
        <TableCell>
          <Badge color={STATUS_CODE >= 500 ? "red" : "yellow"}>
            Error {STATUS_CODE}
          </Badge>
        </TableCell>
        <TableCell colSpan={2}>
          <div title={tsError?.stack}>
            {tsError?.message || tsData?.message || "CWMS Data API Unreachable"}
          </div>
        </TableCell>
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
              width="100%"
              height="10"
            >
              {tsData?.values
                ? tsData?.values.map((val, idx) => {
                    return (
                      <line
                        onMouseEnter={(e) => {
                            // Setup a tooltip to show date - value when a user hovers with a visible line to show which value is highlighted
                            const tooltip = document.createElement("div");
                            tooltip.className = "tooltip";
                            tooltip.innerText = e.target.dataset.tooltip;
                            tooltip.style.position = "absolute";
                            tooltip.style.top = `${e.clientY + 4}px`;
                            tooltip.style.left = `${e.clientX}px`;
                            document.body.appendChild(tooltip);
                            e.target.style.transform = "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                            document.querySelector(".tooltip")?.remove();
                            e.target.style.transform = "translateY(0)";
                        }}
                        key={`line-${name}-${idx}`}
                        x1={Math.round(statusDelta * idx)}
                        y1="0"
                        x2={Math.round(statusDelta * idx)}
                        y2="10"
                        strokeWidth={statusDelta + "px"}
                        className={`alert-${getQualityStr(val)?.toLowerCase()}`}
                        data-tooltip={dayjs(val[0]).format(dateFormat) + " " + val[1]?.toFixed(2)}
                      />
                    );
                  })
                : null}
            </svg>
          </TableCell>
          <TableCell>
            {tsData?.values?.[0]
              ? dayjs(tsData.values[tsData.values.length - 1][0]).format(dateFormat)
              : "Missing"}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
