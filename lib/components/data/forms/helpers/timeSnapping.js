/**
 * Helper function to snap time to specified interval
 * @param {Date|string} date - The date to snap
 * @param {string} interval - The interval to snap to (none, second, minute, 5minutes, 15minutes, 30minutes, hour, day, month, year)
 * @param {string} snapTo - The direction to snap (nearest, previous, next)
 * @returns {Date} - The snapped date
 */
export function snapTime(date, interval, snapTo = "nearest") {
  const d = new Date(date);

  switch (interval) {
    case "second":
      d.setMilliseconds(0);
      break;

    case "minute":
      d.setSeconds(0, 0);
      if (snapTo === "next") {
        d.setMinutes(d.getMinutes() + 1);
      } else if (snapTo === "previous") {
        // Already at start of minute
      }
      break;

    case "5minutes":
      d.setSeconds(0, 0);
      const minutes = d.getMinutes();
      const remainder = minutes % 5;
      if (snapTo === "nearest") {
        if (remainder >= 3) {
          d.setMinutes(minutes + (5 - remainder));
        } else {
          d.setMinutes(minutes - remainder);
        }
      } else if (snapTo === "next") {
        d.setMinutes(minutes + (5 - remainder));
      } else {
        d.setMinutes(minutes - remainder);
      }
      break;

    case "15minutes":
      d.setSeconds(0, 0);
      const mins15 = d.getMinutes();
      const rem15 = mins15 % 15;
      if (snapTo === "nearest") {
        if (rem15 >= 8) {
          d.setMinutes(mins15 + (15 - rem15));
        } else {
          d.setMinutes(mins15 - rem15);
        }
      } else if (snapTo === "next") {
        d.setMinutes(mins15 + (15 - rem15));
      } else {
        d.setMinutes(mins15 - rem15);
      }
      break;

    case "30minutes":
      d.setSeconds(0, 0);
      const mins30 = d.getMinutes();
      const rem30 = mins30 % 30;
      if (snapTo === "nearest") {
        if (rem30 >= 15) {
          d.setMinutes(mins30 + (30 - rem30));
        } else {
          d.setMinutes(mins30 - rem30);
        }
      } else if (snapTo === "next") {
        d.setMinutes(mins30 + (30 - rem30));
      } else {
        d.setMinutes(mins30 - rem30);
      }
      break;

    case "hour":
      const currentMinutes = d.getMinutes();
      d.setMinutes(0, 0, 0);
      if (snapTo === "nearest") {
        // If 30 minutes or more past the hour, snap to next hour
        if (currentMinutes >= 30) {
          d.setHours(d.getHours() + 1);
        }
      } else if (snapTo === "next") {
        d.setHours(d.getHours() + 1);
      } else if (snapTo === "previous") {
        // Already at start of hour
      }
      break;

    case "day":
      const currentHours = d.getHours();
      d.setHours(0, 0, 0, 0);
      if (snapTo === "nearest") {
        // If 12 hours or more past midnight, snap to next day
        if (currentHours >= 12) {
          d.setDate(d.getDate() + 1);
        }
      } else if (snapTo === "next") {
        d.setDate(d.getDate() + 1);
      } else if (snapTo === "previous") {
        // Already at start of day
      }
      break;

    case "month":
      const currentDay = d.getDate();
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      if (snapTo === "nearest") {
        // If past the middle of the month, snap to next month
        if (currentDay > daysInMonth / 2) {
          d.setMonth(d.getMonth() + 1);
        }
      } else if (snapTo === "next") {
        d.setMonth(d.getMonth() + 1);
      } else if (snapTo === "previous") {
        // Already at start of month
      }
      break;

    case "year":
      const currentMonth = d.getMonth();
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      if (snapTo === "nearest") {
        // If past June (month 5), snap to next year
        if (currentMonth > 5) {
          d.setFullYear(d.getFullYear() + 1);
        }
      } else if (snapTo === "next") {
        d.setFullYear(d.getFullYear() + 1);
      } else if (snapTo === "previous") {
        // Already at start of year
      }
      break;

    default:
      // No snapping
      break;
  }

  return d;
}

/**
 * Format a date for datetime-local input
 * @param {Date} date - The date to format
 * @returns {string} - Formatted string (YYYY-MM-DDTHH:mm)
 */
export function formatForDateTimeLocal(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Get a snapped timestamp with formatting
 * @param {Date|string} date - The date to snap
 * @param {string} interval - The interval to snap to
 * @param {string} snapTo - The direction to snap
 * @returns {string} - Formatted datetime-local string
 */
export function getSnappedTimestamp(date, interval, snapTo = "nearest") {
  const snapped = snapTime(date, interval, snapTo);
  return formatForDateTimeLocal(snapped);
}

/**
 * Available time intervals for snapping
 */
export const TIME_INTERVALS = {
  NONE: "none",
  SECOND: "second",
  MINUTE: "minute",
  FIVE_MINUTES: "5minutes",
  FIFTEEN_MINUTES: "15minutes",
  THIRTY_MINUTES: "30minutes",
  HOUR: "hour",
  DAY: "day",
  MONTH: "month",
  YEAR: "year",
};

/**
 * Snap direction options
 */
export const SNAP_DIRECTIONS = {
  NEAREST: "nearest",
  PREVIOUS: "previous",
  NEXT: "next",
};

/**
 * Get display text for interval
 * @param {string} interval - The interval
 * @returns {string} - Display text
 */
export function getIntervalDisplayText(interval) {
  switch (interval) {
    case TIME_INTERVALS.NONE:
      return "No snapping";
    case TIME_INTERVALS.SECOND:
      return "second";
    case TIME_INTERVALS.MINUTE:
      return "minute";
    case TIME_INTERVALS.FIVE_MINUTES:
      return "5-minute interval";
    case TIME_INTERVALS.FIFTEEN_MINUTES:
      return "15-minute interval";
    case TIME_INTERVALS.THIRTY_MINUTES:
      return "30-minute interval";
    case TIME_INTERVALS.HOUR:
      return "hour";
    case TIME_INTERVALS.DAY:
      return "day";
    case TIME_INTERVALS.MONTH:
      return "month";
    case TIME_INTERVALS.YEAR:
      return "year";
    default:
      return interval;
  }
}
