import { TimeSeries } from "cwmsjs";

/**
 * Retrieve the chronologically-last entry returned from a CDA TimeSeries GET request.
 * @param {object} cdaTimeSeries A valid CDA TimeSeries GET response.
 * @returns {[number, number, number]} The last CDA TimeSeries entry.
 */
export const getLatestEntry = (cdaTimeSeries: TimeSeries) => {
  return cdaTimeSeries.values
    ?.filter((entry) => entry[1] !== null)
    .slice(-1)[0];
};
