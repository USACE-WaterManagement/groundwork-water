import { Badge, TableRow, TableCell } from "@usace/groundwork";
import dayjs from "dayjs";
import { TimeSeriesApi } from "cwmsjs";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useCdaConfig } from "../../helpers/cda";
import { getPrecision } from "../../utilities";
import DesktopStatusRow from "./DesktopStatusRow";
import MobileStatusRow from "./MobileStatusRow";

function getLocationLabel(tsid) {
  const [location = "", parameter = ""] = tsid.split(".");
  return {
    title: tsid,
    primary: location,
    secondary: parameter,
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
  mobile = false,
  pageSize,
  lookBackHours,
  cdaUrl,
}) {
  const tsid = typeof name === "string" ? name.trim() : name;
  const config = useCdaConfig("v2", cdaUrl);
  const tsApi = new TimeSeriesApi(config);
  const [activeIndex, setActiveIndex] = useState(null);
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
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
  const precision = getPrecision(tsData?.units);

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
    if (mobile) {
      return (
        <div className="gww-rounded-xl gww-border gww-border-amber-200 gww-bg-amber-50 gww-p-3">
          <div className="gww-mb-1">
            <Badge color={statusCode >= 500 ? "red" : "yellow"}>
              Error {statusCode}
            </Badge>
          </div>
          <div title={tsError?.stack}>
            {tsError?.message || tsData?.message || "CWMS Data API Unreachable"}
          </div>
        </div>
      );
    }

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

  const sharedProps = {
    tsPending,
    values,
    label,
    linkPath,
    tsid,
    formatDateWithZone,
    formatValue,
    getQualityCode,
    tsData,
    precision,
  };

  if (mobile) {
    return (
      <MobileStatusRow {...sharedProps} expanded={expanded} setExpanded={setExpanded} />
    );
  }

  return (
    <DesktopStatusRow
      {...sharedProps}
      activeIndex={activeIndex}
      pinnedIndex={pinnedIndex}
      setPinnedIndex={setPinnedIndex}
      setActiveIndex={setActiveIndex}
      displayIndex={displayIndex}
      activePoint={activePoint}
      idx={idx}
    />
  );
}
