import { Badge, TextLink, Skeleton } from "@usace/groundwork";
import { getQualityMeta, getQualityStr } from "../../utilities/qualityDecoder";

function formatMobileDate(value) {
  const datetime = new Date(value);
  return datetime.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

function buildQualityRuns(values) {
  if (!values.length) return [];

  return values.reduce((runs, value, index) => {
    const quality = getQualityStr(value);
    const lastRun = runs[runs.length - 1];

    if (lastRun && lastRun.quality === quality) {
      lastRun.count += 1;
      lastRun.lastIndex = index;
      lastRun.lastValue = value;
      return runs;
    }

    runs.push({
      quality,
      count: 1,
      firstIndex: index,
      lastIndex: index,
      firstValue: value,
      lastValue: value,
    });
    return runs;
  }, []);
}

function summarizeQualities(values) {
  return values.reduce(
    (summary, value) => {
      const quality = getQualityStr(value);
      summary[quality] = (summary[quality] ?? 0) + 1;
      return summary;
    },
    { OKAY: 0, MISSING: 0, QUESTIONABLE: 0, REJECTED: 0, UNKNOWN: 0 },
  );
}

function buildSummaryLine(summary, total) {
  const parts = [];
  const labels = [
    ["UNKNOWN", "Unknown"],
    ["QUESTIONABLE", "Questionable"],
    ["REJECTED", "Rejected"],
    ["MISSING", "Missing"],
    ["OKAY", "Good"],
  ];

  labels.forEach(([key, label]) => {
    parts.push(`${label}: ${summary[key] ?? 0}`);
  });
  parts.push(`Total: ${total}`);

  return parts.join(" | ");
}

export default function MobileStatusRow({
  tsPending,
  values,
  label,
  linkPath,
  tsid,
  expanded,
  setExpanded,
  formatDateWithZone,
  formatValue,
  tsData,
  precision,
}) {
  const latestPoint = values.length > 0 ? values[values.length - 1] : null;
  const latestMeta = latestPoint ? getQualityMeta(getQualityStr(latestPoint)) : null;
  const qualityRuns = buildQualityRuns(values);
  const qualitySummary = summarizeQualities(values);
  const summaryLine = buildSummaryLine(qualitySummary, values.length);
  const flaggedValues = values
    .slice()
    .reverse()
    .filter((value) => getQualityStr(value) !== "OKAY");
  const hasFlaggedValues = flaggedValues.length > 0;

  return (
    <div className="gww-rounded-2xl gww-border gww-border-slate-200 gww-bg-white gww-p-3 gww-shadow-sm">
      {tsPending ? (
        <Skeleton className="gww-h-28 gww-w-full" />
      ) : (
        <div className="gww-flex gww-flex-col gww-gap-3">
          <div className="gww-flex gww-items-start gww-justify-between gww-gap-3">
            <div title={label.title} className="gww-min-w-0">
              {linkPath ? (
                <TextLink href={`${linkPath}/${label.primary}`}>
                  <div className="gww-flex gww-flex-col gww-gap-0.5">
                    <span className="gww-text-base gww-font-semibold gww-leading-tight">
                      {label.primary}
                    </span>
                    <span className="gww-text-sm gww-leading-tight gww-text-slate-600">
                      {label.secondary}
                    </span>
                  </div>
                </TextLink>
              ) : (
                <div className="gww-flex gww-flex-col gww-gap-0.5">
                  <span className="gww-text-base gww-font-semibold gww-leading-tight">
                    {label.primary}
                  </span>
                  <span className="gww-text-sm gww-leading-tight gww-text-slate-600">
                    {label.secondary}
                  </span>
                </div>
              )}
            </div>
            <div className="gww-shrink-0 gww-text-right">
              <div className="gww-text-[0.68rem] gww-font-semibold gww-uppercase gww-tracking-[0.14em] gww-text-slate-500">
                Latest
              </div>
              <div className="gww-max-w-32 gww-text-sm gww-font-medium gww-leading-tight gww-text-slate-800">
                {latestPoint?.[0] ? formatDateWithZone(latestPoint[0]) : "Missing"}
              </div>
            </div>
          </div>

          {values.length > 0 ? (
            <>
              <div className="gww-flex gww-items-center gww-justify-between gww-gap-3">
                {latestMeta ? (
                  <span
                    className={`gww-inline-flex gww-items-center gww-rounded-full gww-px-2.5 gww-py-1 gww-text-xs gww-font-semibold ${latestMeta.pillClassName}`}
                  >
                    {latestMeta.shortLabel}
                  </span>
                ) : (
                  <span className="gww-text-xs gww-font-semibold gww-text-slate-500">
                    No status
                  </span>
                )}
                <div className="gww-text-sm gww-font-semibold gww-text-slate-900">
                  {latestPoint
                    ? formatValue(latestPoint[1], tsData?.units, precision)
                    : "Missing"}
                </div>
              </div>

              <div className="gww-rounded-xl gww-border gww-border-slate-200 gww-bg-slate-50 gww-px-2.5 gww-py-2">
                <div className="gww-flex gww-items-start gww-gap-3">
                  <div className="gww-flex gww-min-w-0 gww-flex-wrap gww-items-center gww-gap-2">
                    {qualityRuns.map((run, runIndex) => {
                      const meta = getQualityMeta(run.quality);
                      return (
                        <div
                          key={`mobile-strip-${tsid}-${runIndex}`}
                          className="gww-inline-flex gww-items-center gww-gap-1"
                          title={`${meta.shortLabel} x${run.count}`}
                        >
                          <span
                            className={`gww-block gww-h-3.5 gww-w-3.5 gww-shrink-0 gww-rounded-full ${meta.segmentClassName}`}
                            aria-hidden="true"
                          />
                          {run.count > 1 ? (
                            <span className="gww-text-[0.7rem] gww-font-medium gww-text-slate-500">
                              {run.count}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="gww-mt-2 gww-break-words gww-text-[0.72rem] gww-leading-5 gww-text-slate-600">
                  {summaryLine}
                </div>
                <div className="gww-mt-1 gww-text-[0.72rem] gww-leading-5 gww-text-slate-500">
                  {formatMobileDate(values[0][0])} to{" "}
                  {formatMobileDate(values[values.length - 1][0])}
                </div>
              </div>

              {hasFlaggedValues ? (
                <button
                  type="button"
                  className="gww-inline-flex gww-items-center gww-justify-center gww-self-start gww-rounded-lg gww-border gww-border-slate-300 gww-bg-white gww-px-3 gww-py-1.5 gww-text-sm gww-font-medium gww-text-slate-700"
                  onClick={() => setExpanded((current) => !current)}
                >
                  {expanded ? "Hide readings" : "Show readings"}
                </button>
              ) : null}

              {expanded && hasFlaggedValues ? (
                <div className="gww-overflow-hidden gww-rounded-xl gww-border gww-border-slate-200">
                  {hasFlaggedValues ? (
                    <div className="gww-max-h-56 gww-overflow-y-auto">
                      {flaggedValues.map((value, valueIndex) => {
                        const meta = getQualityMeta(getQualityStr(value));
                        return (
                          <div
                            key={`mobile-reading-${tsid}-${valueIndex}`}
                            className="gww-border-t gww-border-slate-200 gww-bg-white gww-px-3 gww-py-2"
                          >
                            <div className="gww-text-[0.74rem] gww-leading-5 gww-text-slate-700">
                              {formatMobileDate(value[0])}
                            </div>
                            <div className="gww-mt-1 gww-flex gww-items-center gww-justify-between gww-gap-2">
                              <div className="gww-min-w-0 gww-text-sm gww-font-semibold gww-text-slate-900">
                                {formatValue(value[1], tsData?.units, precision)}
                              </div>
                              <Badge
                                color="blue"
                                className={`gww-border-0 ${meta.pillClassName}`}
                              >
                                {meta.shortLabel}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="gww-text-sm gww-text-slate-500">
              No recent values in lookback window
            </div>
          )}
        </div>
      )}
    </div>
  );
}
