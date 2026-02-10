const getPrecision = (units) => {
  // NOTE: Precision can NOT be null
  let unit = units?.toLowerCase() || ""; // empty string if units are undefined or null
  switch (unit) {
    case "m":
      return 3;
    case "ft":
    case "in":
    case "cms":
      return 2;
    case "irrad":
    case "%":
    case "langley/min":
    case "mph":
    case "kph":
    case "f":
    case "c":
    case "deg":
    case "volt":
      return 1;
    case "cfs":
    case "ac-ft":
    case "m3":
      return 0;
    default:
      return 2; // Default precision
  }
};

export { getPrecision };
