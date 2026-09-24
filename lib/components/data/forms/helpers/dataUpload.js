import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezonePlugin from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
const DEFAULT_TIMEZONE = "America/Chicago";
const CWMS_DATA_UPLOAD_HEADERS = [
  "OFFICE",
  "TSID",
  "DATE TIME",
  "VALUE",
  "QUALITY CODE",
  "DATA ENTRY DATE",
  "TEXT VALUE",
];
const INTRADAY_INTERVALS = new Set([
  "1Minute",
  "5Minutes",
  "10Minutes",
  "15Minutes",
  "30Minutes",
  "1Hour",
]);

class CwmsDataUploadValidationError extends Error {
  constructor(issues) {
    const normalizedIssues = Array.isArray(issues) ? issues : [String(issues)];
    super(normalizedIssues[0] || "The workbook is not a valid CWMS data upload.");
    this.name = "CwmsDataUploadValidationError";
    this.issues = normalizedIssues;
  }
}

const cellText = (value) => {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return dayjs(value).format(DATE_TIME_FORMAT);
  if (typeof value === "object") {
    if (value.text !== undefined) return String(value.text).trim();
    if (value.result !== undefined) return cellText(value.result);
    if (Array.isArray(value.richText)) {
      return value.richText
        .map((part) => part.text || "")
        .join("")
        .trim();
    }
  }
  return String(value).trim();
};

const parseLocalTimestamp = (value, timezone, rowNumber, label = "DATE TIME") => {
  const text = cellText(value);
  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(text)) {
    throw new CwmsDataUploadValidationError(
      `Row ${rowNumber}: ${label} must use ${DATE_TIME_FORMAT}.`,
    );
  }

  const parsed = dayjs.tz(text, DATE_TIME_FORMAT, timezone);
  if (!parsed.isValid() || parsed.format(DATE_TIME_FORMAT) !== text) {
    throw new CwmsDataUploadValidationError(
      `Row ${rowNumber}: ${label} is not a valid time in ${timezone}.`,
    );
  }
  return parsed;
};

const parseDataEntryDate = (value, timezone, rowNumber) => {
  const text = cellText(value);
  if (!text || text.toUpperCase() === "NA") return undefined;

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(text)) {
    return parseLocalTimestamp(text, timezone, rowNumber, "DATA ENTRY DATE").toDate();
  }

  const parsed = dayjs(text);
  if (!parsed.isValid()) {
    throw new CwmsDataUploadValidationError(
      `Row ${rowNumber}: DATA ENTRY DATE must be blank, NA, an ISO timestamp, or ${DATE_TIME_FORMAT}.`,
    );
  }
  return parsed.toDate();
};

const validateHeaders = (headerRow) => {
  const issues = [];
  CWMS_DATA_UPLOAD_HEADERS.forEach((header, index) => {
    const actual = cellText(headerRow?.[index]);
    if (actual !== header) {
      issues.push(
        `Column ${index + 1} must be ${header}; found ${actual || "a blank header"}.`,
      );
    }
  });
  if (issues.length) throw new CwmsDataUploadValidationError(issues);
};

function parseCwmsDataUploadRows(
  worksheetRows,
  {
    timezone = DEFAULT_TIMEZONE,
    maxRows = 200000,
    maxIntradayYears = 10,
    office: expectedOffice,
  } = {},
) {
  if (!Array.isArray(worksheetRows) || worksheetRows.length < 2) {
    throw new CwmsDataUploadValidationError(
      "The workbook must contain a header and at least one data row.",
    );
  }
  if (worksheetRows.length - 1 > maxRows) {
    throw new CwmsDataUploadValidationError(
      `The workbook contains ${worksheetRows.length - 1} data rows; the limit is ${maxRows}.`,
    );
  }

  validateHeaders(worksheetRows[0]);

  const rows = [];
  const issues = [];
  const seenLocalTimes = new Set();
  const offices = new Set();
  const tsids = new Set();

  worksheetRows.slice(1).forEach((sourceRow, index) => {
    const rowNumber = index + 2;
    const values = Array.from({ length: CWMS_DATA_UPLOAD_HEADERS.length }, (_, col) =>
      cellText(sourceRow?.[col]),
    );
    if (values.every((value) => value === "")) return;

    const [office, tsid, dateTime, rawValue, rawQuality, dataEntryDate, textValue] =
      values;

    if (!office) issues.push(`Row ${rowNumber}: OFFICE is required.`);
    if (!tsid) issues.push(`Row ${rowNumber}: TSID is required.`);
    if (expectedOffice && office && office !== expectedOffice) {
      issues.push(
        `Row ${rowNumber}: OFFICE ${office} does not match configured office ${expectedOffice}.`,
      );
    }
    if (!rawValue && !textValue) {
      issues.push(`Row ${rowNumber}: provide VALUE, TEXT VALUE, or both.`);
    }

    let parsedTime;
    try {
      parsedTime = parseLocalTimestamp(dateTime, timezone, rowNumber);
    } catch (error) {
      issues.push(...(error.issues || [error.message]));
    }

    const duplicateKey = `${office}|${tsid}|${dateTime}`;
    if (seenLocalTimes.has(duplicateKey)) {
      issues.push(`Row ${rowNumber}: duplicate DATE TIME ${dateTime} for ${tsid}.`);
    }
    seenLocalTimes.add(duplicateKey);

    const value = rawValue === "" ? null : Number(rawValue);
    if (rawValue !== "" && !Number.isFinite(value)) {
      issues.push(`Row ${rowNumber}: VALUE ${rawValue} is not numeric.`);
    }

    const qualityCode = rawQuality === "" ? 0 : Number(rawQuality);
    if (!Number.isSafeInteger(qualityCode) || qualityCode < 0) {
      issues.push(`Row ${rowNumber}: QUALITY CODE must be a non-negative integer.`);
    }

    let parsedEntryDate;
    try {
      parsedEntryDate = parseDataEntryDate(dataEntryDate, timezone, rowNumber);
    } catch (error) {
      issues.push(...(error.issues || [error.message]));
    }

    if (office) offices.add(office);
    if (tsid) tsids.add(tsid);
    if (office && tsid && parsedTime?.isValid()) {
      rows.push({
        rowNumber,
        office,
        tsid,
        dateTime,
        timestamp: parsedTime.toISOString(),
        epoch: parsedTime.valueOf(),
        value: Number.isFinite(value) ? value : null,
        qualityCode: Number.isSafeInteger(qualityCode) ? qualityCode : 0,
        dataEntryDate: parsedEntryDate,
        textValue,
      });
    }
  });

  if (offices.size > 1) {
    issues.push(`All rows must use one OFFICE; found ${[...offices].join(", ")}.`);
  }
  if (tsids.size > 1) {
    issues.push(`All rows must use one TSID; found ${[...tsids].join(", ")}.`);
  }
  if (!rows.length && !issues.length) issues.push("The workbook has no data rows.");

  if (rows.length) {
    const tsid = rows[0].tsid;
    const interval = tsid.split(".")[3];
    const spanYears = (rows.at(-1).epoch - rows[0].epoch) / 31557600000;
    if (INTRADAY_INTERVALS.has(interval) && spanYears > maxIntradayYears) {
      issues.push(
        `${interval} uploads may span at most ${maxIntradayYears} years; this workbook spans ${spanYears.toFixed(2)} years.`,
      );
    }
  }

  if (issues.length) throw new CwmsDataUploadValidationError(issues);

  const sortedRows = [...rows].sort((a, b) => a.epoch - b.epoch);
  return {
    rows: sortedRows,
    office: sortedRows[0].office,
    tsid: sortedRows[0].tsid,
    begin: sortedRows[0].timestamp,
    end: sortedRows.at(-1).timestamp,
    timezone,
  };
}

async function getExcelModule() {
  const excel = await import("exceljs");
  return excel.default || excel;
}

async function readCwmsDataUploadFile(file, options) {
  const ExcelJS = await getExcelModule();
  const workbook = new ExcelJS.Workbook();
  const source =
    typeof file?.arrayBuffer === "function" ? await file.arrayBuffer() : file;
  await workbook.xlsx.load(source);
  const worksheet = workbook.getWorksheet("Sheet1") || workbook.worksheets[0];
  if (!worksheet) {
    throw new CwmsDataUploadValidationError(
      "The workbook does not contain a worksheet.",
    );
  }

  const rows = [];
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    rows.push(
      Array.from({ length: CWMS_DATA_UPLOAD_HEADERS.length }, (_, index) =>
        cellText(row.getCell(index + 1).value),
      ),
    );
  });
  return parseCwmsDataUploadRows(rows, options);
}

async function createCwmsDataUploadTemplate({ office = "", tsid = "" } = {}) {
  const ExcelJS = await getExcelModule();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");
  worksheet.addRow(CWMS_DATA_UPLOAD_HEADERS);
  worksheet.addRow([office, tsid, "2026-01-01 00:00", "", "0", "", ""]);
  worksheet.getRow(1).font = { bold: true };
  worksheet.columns = [12, 46, 20, 14, 16, 22, 30].map((width) => ({ width }));
  return workbook.xlsx.writeBuffer();
}

function buildCwmsDataUploadPayloads(
  rows,
  { unit = "ft", textFilename = "cwms-data-upload.txt", valueUrlBase } = {},
) {
  const numericGroups = new Map();
  const textGroups = new Map();

  rows.forEach((row) => {
    const key = `${row.office}|${row.tsid}`;
    if (row.value !== null && row.value !== undefined) {
      if (!numericGroups.has(key)) {
        numericGroups.set(key, {
          name: row.tsid,
          officeId: row.office,
          units: unit,
          values: [],
        });
      }
      numericGroups.get(key).values.push([row.epoch, row.value, row.qualityCode || 0]);
    }

    if (row.textValue) {
      if (!textGroups.has(key)) {
        textGroups.set(key, {
          name: row.tsid,
          officeId: row.office,
          intervalOffset: 0,
          timeZone: "UTC",
          dateVersionType: "MAX_AGGREGATE",
          regularTextValues: [],
        });
      }
      textGroups.get(key).regularTextValues.push({
        dateTime: new Date(row.epoch),
        dataEntryDate: row.dataEntryDate || new Date(),
        textValue: row.textValue,
        filename: textFilename,
        mediaType: "text/plain",
        qualityCode: row.qualityCode || 0,
        destFlag: 0,
        valueUrl: valueUrlBase
          ? `${valueUrlBase.replace(/\/$/, "")}/timeseries/text/ignored`
          : undefined,
      });
    }
  });

  return {
    numeric: [...numericGroups.values()],
    text: [...textGroups.values()],
  };
}

function classifyCwmsDataUploadRows(rows, existingValues = []) {
  const existing = new Set(
    existingValues
      .filter((item) => item?.[0] !== undefined && Number.isFinite(Number(item?.[1])))
      .map((item) => {
        const time = Number.isFinite(Number(item[0]))
          ? Number(item[0])
          : new Date(item[0]).getTime();
        return `${time}|${Number(item[1]).toFixed(2)}`;
      }),
  );

  return rows.map((row) => ({
    ...row,
    status:
      row.value !== null && existing.has(`${row.epoch}|${Number(row.value).toFixed(2)}`)
        ? "existing"
        : "new",
  }));
}

function filterCwmsDataUploadRows(rows, filter = "all") {
  if (filter === "existing") return rows.filter((row) => row.status === "existing");
  if (filter === "new") return rows.filter((row) => row.status !== "existing");
  return rows;
}

export {
  CWMS_DATA_UPLOAD_HEADERS,
  CwmsDataUploadValidationError,
  buildCwmsDataUploadPayloads,
  classifyCwmsDataUploadRows,
  createCwmsDataUploadTemplate,
  filterCwmsDataUploadRows,
  parseCwmsDataUploadRows,
  readCwmsDataUploadFile,
};
