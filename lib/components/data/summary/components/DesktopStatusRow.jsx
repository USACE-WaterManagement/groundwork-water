import { TextLink, TableRow, TableCell, Skeleton } from "@usace/groundwork";
import dayjs from "dayjs";
import { getQualityMeta, getQualityStr } from "../../utilities/qualityDecoder";

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
  displayIndex,
  activePoint,
  pinnedIndex,
  setPinnedIndex,
  setActiveIndex,
  formatDateWithZone,
  formatValue,
  getQualityCode,
  tsData,
  precision,
  idx,
}) {
  const latestPoint = values.length > 0 ? values[values.length - 1] : null;
  const tickIndices = buildTickIndices(values.length);
  const timelineColumns = `repeat(${values.length}, minmax(0, 1fr))`;
  const useInlineDetails = values.length <= 8;

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
                    {values.map((value, valueIndex) => {
                      const quality = getQualityStr(value);
                      const meta = getQualityMeta(quality);
                      const isActive = valueIndex === displayIndex;
                      return (
                        <button
                          type="button"
                          key={`segment-${tsid}-${valueIndex}`}
                          className="gww-group gww-relative gww-flex gww-h-9 gww-w-full gww-min-w-0 gww-cursor-pointer gww-items-end gww-justify-center gww-border-0 gww-bg-transparent gww-p-0 focus-visible:gww-outline-none"
                          onMouseEnter={() => {
                            if (pinnedIndex == null) {
                              setActiveIndex(valueIndex);
                            }
                          }}
                          onFocus={() => setActiveIndex(valueIndex)}
                          onBlur={() => {
                            if (pinnedIndex == null) {
                              setActiveIndex(null);
                            }
                          }}
                          onClick={() => {
                            setPinnedIndex((current) =>
                              current === valueIndex ? null : valueIndex,
                            );
                            setActiveIndex(valueIndex);
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
                    {values.map((value, valueIndex) => {
                      const quality = getQualityMeta(getQualityStr(value));
                      const isActive = valueIndex === displayIndex;
                      return (
                        <span
                          key={`tick-${tsid}-${valueIndex}`}
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
                {activePoint && !useInlineDetails ? (
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
            {activePoint && useInlineDetails ? (
              <div className="gww-mt-2 gww-rounded-lg gww-border gww-border-slate-200 gww-bg-slate-50 gww-px-3 gww-py-2">
                <div className="gww-flex gww-items-center gww-justify-between gww-gap-3">
                  <span className="gww-text-[0.78rem] gww-font-semibold gww-text-slate-800">
                    {label.primary} {label.secondary}
                  </span>
                  <span
                    className={`gww-inline-flex gww-items-center gww-rounded-full gww-px-2 gww-py-0.5 gww-text-[0.72rem] gww-font-semibold ${getQualityMeta(getQualityStr(activePoint)).pillClassName}`}
                  >
                    {getQualityMeta(getQualityStr(activePoint)).shortLabel}
                  </span>
                </div>
                <div className="gww-mt-1 gww-text-sm gww-font-bold gww-text-slate-900">
                  {formatValue(activePoint[1], tsData?.units, precision)}
                </div>
                <div className="gww-mt-1 gww-text-[0.78rem] gww-text-slate-600">
                  {formatDateWithZone(activePoint[0])}
                </div>
              </div>
            ) : null}
          </TableCell>
          <TableCell className="gww-overflow-visible">
            {latestPoint?.[0] ? formatDateWithZone(latestPoint[0]) : "Missing"}
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
