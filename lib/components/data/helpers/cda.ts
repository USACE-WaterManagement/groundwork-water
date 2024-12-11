import { Configuration, ConfigurationParameters, TimeSeries } from "cwmsjs";
import useCdaUrl from "../utilities/useCdaUrl";

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

/**
 * Retrieve a standard cwmsjs configuration object for the given version and URL.
 *
 * The configuration will appropriately set the accept header based on the version
 * string provided (and assumes JSON format).  The CDA URL will be set in this
 * order of priority:
 *   1. cdaUrl argument to the data hook
 *   2. URL provided through a wrapping CdaUrlProvider
 *   3. cwmsjs default CDA URL
 * @param version String indicating the CDA API version to use for the request.
 * @param hookCdaUrl The cdaUrl passed to the CDA data hook as an argument.
 * @returns
 */
export const useCdaConfig = (version: "v1" | "v2", hookCdaUrl?: string) => {
  let accept = "application/json";
  if (version == "v2") accept += ";version=2";

  const configOptions: ConfigurationParameters = {
    headers: { accept },
  };

  const providedCdaUrl = useCdaUrl();
  const userCdaUrl = hookCdaUrl ?? providedCdaUrl;
  if (userCdaUrl) configOptions.basePath = userCdaUrl;

  return new Configuration(configOptions);
};
