import { TextLink, TableRow, TableCell, Skeleton } from "@usace/groundwork";
import dayjs from "dayjs";
import { getQualityMeta, getQualityStr } from "../../utilities/qualityDecoder";

function buildTickIndices(length, maxLabels = length <= 6 ? 3 : 4) {
  if (length <= 0) return [];
  if (length <= maxLabels) return Array.from({ length }, (_, index) => index);

  const step = (length - 1) / (maxLabels - 1);
  return Array.from({ length: maxLabels }, (_, index) =>
    Math.round(index * step),
  ).filter((value, index, array) => array.indexOf(value) === index);
}

export default function DesktopStatusRow({
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
}) {
  const latestPoint = values.length > 0 ? values[values.length - 1] : null;
  const tickIndices = buildTickIndices(values.length);
  const timelineColumns = `repeat(${values.length}, minmax(0, 1fr))`;

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
              <div className="gww-flex gww-w-full gww-max-w-full gww-flex-col gww-gap-1">
                <div className="gww-flex gww-w-full gww-flex-col gww-gap-1">
                  <div
                    className="gww-grid gww-items-end gww-gap-0.5"
                    style={{ gridTemplateColumns: timelineColumns }}
                  >
                    {values.map((value, valueIndex) => {
                      const quality = getQualityStr(value);
                      const meta = getQualityMeta(quality);
                      const isLatest = valueIndex === values.length - 1;
                      const buttonLabel = `${label.title}: ${meta.label} at ${formatDateWithZone(value[0])} with value ${formatValue(value[1], tsData?.units, precision)}`;
                      return (
                        <button
                          type="button"
                          key={`segment-${tsid}-${valueIndex}`}
                          className="gww-group gww-relative gww-flex gww-h-9 gww-w-full gww-min-w-0 gww-cursor-default gww-items-end gww-justify-center gww-border-0 gww-bg-transparent gww-p-0 focus-visible:gww-outline-none"
                          title={buttonLabel}
                          aria-label={`Quality ${getQualityCode(value)} at ${formatDateWithZone(value[0])} with value ${formatValue(value[1], tsData?.units, precision)}`}
                        >
                          <span
                            className={`gww-block gww-h-8 gww-w-full gww-max-w-2 gww-rounded-full ${meta.segmentClassName} ${isLatest ? "gww-ring-1 gww-ring-slate-500" : "gww-opacity-95"} gww-transition-opacity gww-duration-150 gww-ease-out group-hover:gww-opacity-100`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="gww-grid gww-items-center gww-gap-0.5"
                    style={{ gridTemplateColumns: timelineColumns }}
                  >
                    {values.map((value, valueIndex) => {
                      const quality = getQualityMeta(getQualityStr(value));
                      const isLatest = valueIndex === values.length - 1;
                      return (
                        <span
                          key={`tick-${tsid}-${valueIndex}`}
                          className={`gww-justify-self-center gww-h-2 gww-w-0.5 gww-rounded-full ${isLatest ? quality.segmentClassName : "gww-bg-slate-300"}`}
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
