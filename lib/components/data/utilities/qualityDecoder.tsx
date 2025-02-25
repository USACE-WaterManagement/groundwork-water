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
}

function getQualityStr(ts_value: (number | null)[]) {
    if (ts_value?.[1] === null)  return QUALITY_CODES[37] 
    return QUALITY_CODES?.[ts_value?.[2] ?? 0]
}

export default getQualityStr
export { getQualityStr }
export type { QUALITY_CODES }