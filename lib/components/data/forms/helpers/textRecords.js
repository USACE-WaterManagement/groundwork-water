import { Configuration, TextTimeSeriesApi } from "cwmsjs";

function api({ cdaUrl, token }) {
  if (!cdaUrl) throw new Error("A CDA URL is required.");
  return new TextTimeSeriesApi(
    new Configuration({
      basePath: cdaUrl.replace(/\/$/, ""),
      credentials: "include",
      headers: {
        Accept: "application/json;version=2",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }),
  );
}

export function serializeCwmsTextRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("A JSON object is required for a CWMS text record.");
  const text = JSON.stringify(value);
  if (new TextEncoder().encode(text).length > 16000)
    throw new Error("CWMS text records must be 16 KB or less.");
  return text;
}

/** Append one complete JSON record. No numeric inference, replacement, or retry. */
export async function appendCwmsTextRecord({
  cdaUrl,
  token,
  office,
  tsid,
  dateTime,
  value,
}) {
  if (!office || !tsid || !Number.isFinite(new Date(dateTime).getTime()))
    throw new Error("Office, time-series ID and a valid timestamp are required.");
  const text = serializeCwmsTextRecord(value);
  await api({ cdaUrl, token }).postTimeSeriesText({
    replaceAll: false,
    textTimeSeries: {
      officeId: office,
      name: tsid,
      timeZone: "UTC",
      regularTextValues: [{ dateTime: new Date(dateTime), textValue: text }],
    },
  });
}

/** Read the complete requested window. Bad/missing payloads are never hidden. */
export async function readCwmsTextRecords({ cdaUrl, token, office, tsid, begin, end }) {
  const series = await api({ cdaUrl, token }).getTimeSeriesText({
    office,
    name: tsid,
    begin,
    end,
    timezone: "UTC",
  });
  if (!Array.isArray(series.regularTextValues))
    throw new Error(`Missing text values for ${tsid}.`);
  return series.regularTextValues.map((row) => {
    if (typeof row.textValue !== "string")
      throw new Error(
        `Inline text is unavailable for ${tsid}; the record cannot be read safely.`,
      );
    let value;
    try {
      value = JSON.parse(row.textValue);
    } catch {
      throw new Error(`Invalid JSON text record in ${tsid}.`);
    }
    serializeCwmsTextRecord(value);
    return { dateTime: row.dateTime, dataEntryDate: row.dataEntryDate, value };
  });
}
