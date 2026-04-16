import { Badge, TextLink, TableRow, TableCell, Skeleton } from "@usace/groundwork";
import dayjs from "dayjs";
import { TimeSeriesApi } from "cwmsjs";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useCdaConfig } from "../../helpers/cda";
import { getPrecision } from "../../utilities";
import { getQualityMeta, getQualityStr } from "../../utilities/qualityDecoder";

function getLocationLabel(tsid) {
  const [location = "", parameter = ""] = tsid.split(".");
  return {
    title: tsid,
    primary: location,
    secondary: parameter,
  };
}

function buildTickIndices(length, maxLabels = 4) {
  if (length <= 0) return [];
  if (length <= maxLabels) return Array.from({ length }, (_, index) => index);

  const step = (length - 1) / (maxLabels - 1);
  return Array.from({ length: maxLabels }, (_, index) =>
    Math.round(index * step),
  ).filter((value, index, array) => array.indexOf(value) === index);
}

function getPopoverPosition(index, length) {
  if (length <= 1 || index <= 0) {
    return { left: "0%", transform: "translateX(0)" };
  }
  if (index >= length - 1) {
    return { left: "100%", transform: "translateX(-100%)" };
  }

  return {
    left: `${((index + 0.5) / length) * 100}%`,
    transform: "translateX(-50%)",
  };
}

function formatValue(value, units, precision) {
  if (value == null) return "Missing";
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  return units ? `${formatted} ${units}` : formatted;
}

function getQualityCode(value) {
  return value?.[2] ?? 0;
}

function formatDateWithZone(value) {
  const datetime = new Date(value);
  return datetime.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

export default function StatusRow({
  office,
  linkPath,
  name,
  idx,
  pageSize,
  lookBackHours,
  cdaUrl,
  dateFormat,
}) {
  const tsid = typeof name === "string" ? name.trim() : name;
  const config = useCdaConfig("v2", cdaUrl);
  const tsApi = new TimeSeriesApi(config);
  const [activeIndex, setActiveIndex] = useState(null);
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const label = useMemo(() => getLocationLabel(tsid), [tsid]);

  const {
    data: tsData,
    error: tsError,
    isPending: tsPending,
  } = useQuery({
    queryKey: ["dataStatusTS", office, tsid, pageSize, lookBackHours, cdaUrl],
    queryFn: async () => {
      let returnData = { name: null, values: [null, [null]] };
      const now = dayjs();
      const lookBack = now.subtract(lookBackHours, "hour");
      return tsApi
        .getTimeSeries({
          office,
          name: tsid,
          begin: lookBack.format("YYYY-MM-DDTHH:mm:ssZZ"),
          end: now.format("YYYY-MM-DDTHH:mm:ssZZ"),
          pageSize,
        })
        .then((data) => {
          returnData = { name: data?.name, values: [null, [null]] };
          if (data?.name && data?.values?.length > 0) {
            returnData.values = data.values;
          }
          returnData.values = data?.values;
          return {
            ...returnData,
            units: data?.units,
          };
        })
        .catch((e) => {
          return { ...returnData, response: e.response };
        });
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: tsid != null && tsid !== "" && office != null,
  });

  const values = useMemo(
    () =>
      (tsData?.values ?? []).filter(
        (value) => Array.isArray(value) && value[0] != null,
      ),
    [tsData?.values],
  );
  const displayIndex = pinnedIndex ?? activeIndex;
  const activePoint = displayIndex != null ? values[displayIndex] : null;
  const latestPoint = values.length > 0 ? values[values.length - 1] : null;
  const tickIndices = useMemo(() => buildTickIndices(values.length), [values.length]);
  const precision = getPrecision(tsData?.units);
  const timelineColumns = `repeat(${values.length}, minmax(0, 1fr))`;

  if (!office) {
    return (
      <TableRow className="gww-overflow-visible">
        <TableCell className="gww-overflow-visible">
          <Badge color="red">Error</Badge>
        </TableCell>
        <TableCell colSpan={2}>No office provided</TableCell>
      </TableRow>
    );
  }

  if (tsError || tsData?.response) {
    const statusCode = tsData?.response?.status;
    return (
      <TableRow className="gww-overflow-visible">
        <TableCell className="gww-overflow-visible">
          <Badge color={statusCode >= 500 ? "red" : "yellow"}>Error {statusCode}</Badge>
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
    <TableRow className="gww-overflow-visible">
      {tsPending ? (
        <TableCell colSpan={3}>
          <Skeleton className="gww-w-100" />
        </TableCell>
      ) : (
        <>
          <TableCell title={label.title} className="gww-overflow-visible">
            {linkPath ? (
              <TextLink href={`${linkPath}/${label.primary}`}>
                <div className="gww-flex gww-min-w-28 gww-flex-col gww-gap-0">
                  <span className="gww-leading-tight gww-font-semibold">
                    {label.primary}
                  </span>
                  <span className="gww-text-[0.85rem] gww-leading-tight gww-text-slate-600">
                    {label.secondary}
                  </span>
                </div>
              </TextLink>
            ) : (
              <div className="gww-flex gww-min-w-28 gww-flex-col gww-gap-0">
                <span className="gww-leading-tight gww-font-semibold">
                  {label.primary}
                </span>
                <span className="gww-text-[0.85rem] gww-leading-tight gww-text-slate-600">
                  {label.secondary}
                </span>
              </div>
            )}
          </TableCell>
          <TableCell className="gww-overflow-visible">
            {values.length > 0 ? (
              <div
                className="gww-relative gww-flex gww-w-full gww-max-w-full gww-flex-col gww-gap-1 gww-overflow-visible"
                onMouseLeave={() => {
                  if (pinnedIndex == null) {
                    setActiveIndex(null);
                  }
                }}
              >
                <div className="gww-flex gww-w-full gww-flex-col gww-gap-1">
                  <div
                    className="gww-grid gww-items-end gww-gap-0.5"
                    style={{ gridTemplateColumns: timelineColumns }}
                  >
                    {values.map((value, idx) => {
                      const quality = getQualityStr(value);
                      const meta = getQualityMeta(quality);
                      const isActive = idx === displayIndex;
                      return (
                        <button
                          type="button"
                          key={`segment-${tsid}-${idx}`}
                          className="gww-group gww-relative gww-flex gww-h-9 gww-w-full gww-min-w-0 gww-cursor-pointer gww-items-end gww-justify-center gww-border-0 gww-bg-transparent gww-p-0 focus-visible:gww-outline-none"
                          onMouseEnter={() => {
                            if (pinnedIndex == null) {
                              setActiveIndex(idx);
                            }
                          }}
                          onFocus={() => setActiveIndex(idx)}
                          onBlur={() => {
                            if (pinnedIndex == null) {
                              setActiveIndex(null);
                            }
                          }}
                          onClick={() => {
                            setPinnedIndex((current) => (current === idx ? null : idx));
                            setActiveIndex(idx);
                          }}
                          aria-label={`Quality ${getQualityCode(value)} at ${formatDateWithZone(value[0])} with value ${formatValue(value[1], tsData?.units, precision)}`}
                        >
                          <span
                            className={`gww-block gww-w-full gww-max-w-2 gww-rounded-full ${meta.segmentClassName} ${isActive ? "gww-h-9 gww-ring-1 gww-ring-slate-500" : "gww-h-7 gww-opacity-95"} gww-transition-all gww-duration-150 gww-ease-out group-hover:gww-h-9 group-hover:gww-opacity-100`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="gww-grid gww-items-center gww-gap-0.5"
                    style={{ gridTemplateColumns: timelineColumns }}
                  >
                    {values.map((value, idx) => {
                      const quality = getQualityMeta(getQualityStr(value));
                      const isActive = idx === displayIndex;
                      return (
                        <span
                          key={`tick-${tsid}-${idx}`}
                          className={`gww-justify-self-center gww-h-2 gww-w-0.5 gww-rounded-full ${isActive ? quality.segmentClassName : "gww-bg-slate-300"}`}
                        />
                      );
                    })}
                  </div>
                  <div className="gww-relative gww-min-h-[0.95rem]">
                    {tickIndices.map((index) => (
                      <span
                        key={`tick-label-${tsid}-${index}`}
                        className="gww-absolute gww-top-0 gww-whitespace-nowrap gww-text-[0.72rem] gww-text-slate-600"
                        style={{
                          left:
                            values.length <= 1
                              ? "0%"
                              : `${(index / (values.length - 1)) * 100}%`,
                          transform:
                            index === 0
                              ? "translateX(0)"
                              : index === values.length - 1
                                ? "translateX(-100%)"
                                : "translateX(-50%)",
                        }}
                      >
                        {dayjs(values[index][0]).format("MM/DD HH:mm")}
                      </span>
                    ))}
                  </div>
                </div>
                {activePoint ? (
                  <div
                    className="gww-pointer-events-none gww-absolute gww-z-20 gww-w-max gww-min-w-40 gww-max-w-64 gww-rounded-lg gww-border gww-border-slate-200 gww-bg-white/95 gww-px-2.5 gww-py-2 gww-shadow-[0_10px_24px_rgba(15,23,42,0.14),0_2px_6px_rgba(15,23,42,0.08)] gww-backdrop-blur"
                    style={{
                      ...getPopoverPosition(displayIndex, values.length),
                      ...(idx === 0
                        ? { top: "calc(100% + 0.75rem)" }
                        : { bottom: "calc(100% + 0.5rem)" }),
                    }}
                  >
                    <div className="gww-mb-1 gww-flex gww-items-center gww-justify-between gww-gap-3">
                      <span className="gww-text-[0.78rem] gww-font-semibold gww-text-slate-800">
                        {label.primary} {label.secondary}
                      </span>
                      <span
                        className={`gww-inline-flex gww-items-center gww-rounded-full gww-px-2 gww-py-0.5 gww-text-[0.72rem] gww-font-semibold ${getQualityMeta(getQualityStr(activePoint)).pillClassName}`}
                      >
                        {getQualityMeta(getQualityStr(activePoint)).shortLabel}
                      </span>
                    </div>
                    <div className="gww-text-sm gww-font-bold gww-text-slate-900">
                      {formatValue(activePoint[1], tsData?.units, precision)}
                    </div>
                    <div className="gww-mt-1 gww-text-[0.78rem] gww-text-slate-600">
                      {formatDateWithZone(activePoint[0])}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="gww-text-sm gww-text-slate-500">
                No recent values in lookback window
              </div>
            )}
          </TableCell>
          <TableCell className="gww-overflow-visible">
            {latestPoint?.[0] ? formatDateWithZone(latestPoint[0]) : "Missing"}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
