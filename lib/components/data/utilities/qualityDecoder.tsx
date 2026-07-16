// Author: @stephenkissock

const QUALITY_CODES: { [key: number]: string } = {
  0: "UNKNOWN",
  1: "UNKNOWN",
  3: "OKAY",
  5: "MISSING",
  9: "QUESTIONABLE",
  17: "REJECTED",
  33: "UNKNOWN",
  35: "OKAY",
  37: "MISSING",
  41: "QUESTIONABLE",
  49: "REJECTED",
  65: "UNKNOWN",
  67: "OKAY",
  69: "MISSING",
  73: "QUESTIONABLE",
  81: "REJECTED",
  97: "UNKNOWN",
  99: "OKAY",
  101: "MISSING",
  105: "QUESTIONABLE",
  113: "REJECTED",
  2433: "UNKNOWN",
  2435: "OKAY",
  2437: "MISSING",
  2441: "QUESTIONABLE",
  2449: "REJECTED",
  2465: "UNKNOWN",
  2467: "OKAY",
  2469: "MISSING",
  2473: "QUESTIONABLE",
  2481: "REJECTED",
  2497: "UNKNOWN",
};

const QUALITY_META = {
  OKAY: {
    label: "Passed Screening / Validated",
    shortLabel: "Okay",
    badgeClassName:
      "gww-border gww-border-emerald-200 gww-bg-emerald-50 gww-text-emerald-900",
    segmentClassName: "gww-bg-emerald-300",
    pillClassName:
      "gww-bg-emerald-100 gww-text-emerald-900 gww-ring-1 gww-ring-emerald-200",
  },
  MISSING: {
    label: "Missing",
    shortLabel: "Missing",
    badgeClassName:
      "gww-border gww-border-slate-300 gww-bg-slate-100 gww-text-slate-800",
    segmentClassName: "gww-bg-slate-500",
    pillClassName: "gww-bg-slate-200 gww-text-slate-900 gww-ring-1 gww-ring-slate-300",
  },
  QUESTIONABLE: {
    label: "Questionable",
    shortLabel: "Questionable",
    badgeClassName:
      "gww-border gww-border-amber-200 gww-bg-amber-50 gww-text-amber-950",
    segmentClassName: "gww-bg-amber-300",
    pillClassName: "gww-bg-amber-100 gww-text-amber-950 gww-ring-1 gww-ring-amber-200",
  },
  REJECTED: {
    label: "Rejected",
    shortLabel: "Rejected",
    badgeClassName: "gww-border gww-border-rose-200 gww-bg-rose-50 gww-text-rose-900",
    segmentClassName: "gww-bg-rose-400",
    pillClassName: "gww-bg-rose-100 gww-text-rose-900 gww-ring-1 gww-ring-rose-200",
  },
  UNKNOWN: {
    label: "Unknown / Undefined",
    shortLabel: "Unknown",
    badgeClassName:
      "gww-border gww-border-fuchsia-200 gww-bg-fuchsia-50 gww-text-fuchsia-900",
    segmentClassName: "gww-bg-fuchsia-300",
    pillClassName:
      "gww-bg-fuchsia-100 gww-text-fuchsia-900 gww-ring-1 gww-ring-fuchsia-200",
  },
} as const;

function getQualityStr(ts_value: (number | null)[]) {
  if (ts_value?.[1] === null) return QUALITY_CODES[37];
  return QUALITY_CODES?.[ts_value?.[2] ?? 0];
}

function getQualityMeta(quality?: string | null) {
  return (
    QUALITY_META[(quality as keyof typeof QUALITY_META) ?? "UNKNOWN"] ??
    QUALITY_META.UNKNOWN
  );
}

export default getQualityStr;
export { getQualityMeta, getQualityStr, QUALITY_META };
export type { QUALITY_CODES };
