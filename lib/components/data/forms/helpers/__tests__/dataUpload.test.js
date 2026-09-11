import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import {
  CWMS_DATA_UPLOAD_HEADERS,
  buildCwmsDataUploadPayloads,
  classifyCwmsDataUploadRows,
  createCwmsDataUploadTemplate,
  filterCwmsDataUploadRows,
  parseCwmsDataUploadRows,
} from "../dataUpload";

const validRows = [
  CWMS_DATA_UPLOAD_HEADERS,
  [
    "MVS",
    "TEST.Stage.Inst.1Hour.0.TEST",
    "2026-01-01 00:00",
    "10.25",
    "0",
    "",
    "first",
  ],
  [
    "MVS",
    "TEST.Stage.Inst.1Hour.0.TEST",
    "2026-01-01 01:00",
    "10.5",
    "3",
    "2026-01-01 01:05",
    "",
  ],
];

describe("CWMS tabular data helpers", () => {
  it("parses and normalizes a valid workbook", () => {
    const model = parseCwmsDataUploadRows(validRows, { office: "MVS" });

    expect(model.office).toBe("MVS");
    expect(model.tsid).toBe("TEST.Stage.Inst.1Hour.0.TEST");
    expect(model.rows).toHaveLength(2);
    expect(model.rows[0]).toMatchObject({
      value: 10.25,
      qualityCode: 0,
      timestamp: "2026-01-01T06:00:00.000Z",
    });
    expect(model.rows[1].dataEntryDate).toBeInstanceOf(Date);
  });

  it("reports structural and row validation errors together", () => {
    const rows = [
      CWMS_DATA_UPLOAD_HEADERS,
      ["MVS", "A.Stage.Inst.1Hour.0.TEST", "not-a-date", "bad", "-1", "", ""],
      ["SWT", "B.Stage.Inst.1Hour.0.TEST", "2026-01-01 01:00", "1", "0", "", ""],
    ];

    expect(() => parseCwmsDataUploadRows(rows, { office: "MVS" })).toThrowError(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.stringContaining("DATE TIME must use"),
          expect.stringContaining("VALUE bad is not numeric"),
          expect.stringContaining("QUALITY CODE"),
          expect.stringContaining("does not match configured office"),
          expect.stringContaining("All rows must use one OFFICE"),
          expect.stringContaining("All rows must use one TSID"),
        ]),
      }),
    );
  });

  it("builds grouped numeric and text CDA payloads", () => {
    const model = parseCwmsDataUploadRows(validRows);
    const payloads = buildCwmsDataUploadPayloads(model.rows, {
      unit: "ft",
      valueUrlBase: "https://example.test/cwms-data/",
    });

    expect(payloads.numeric).toHaveLength(1);
    expect(payloads.numeric[0]).toMatchObject({
      name: model.tsid,
      officeId: "MVS",
      units: "ft",
    });
    expect(payloads.numeric[0].values).toEqual([
      [model.rows[0].epoch, 10.25, 0],
      [model.rows[1].epoch, 10.5, 3],
    ]);
    expect(payloads.text[0].regularTextValues[0]).toMatchObject({
      textValue: "first",
      qualityCode: 0,
      valueUrl: "https://example.test/cwms-data/timeseries/text/ignored",
    });
  });

  it("classifies and filters values already present in CDA", () => {
    const model = parseCwmsDataUploadRows(validRows);
    const classified = classifyCwmsDataUploadRows(model.rows, [
      [model.rows[0].epoch, 10.25, 0],
    ]);

    expect(classified.map((row) => row.status)).toEqual(["existing", "new"]);
    expect(filterCwmsDataUploadRows(classified, "existing")).toHaveLength(1);
    expect(filterCwmsDataUploadRows(classified, "new")).toHaveLength(1);
  });

  it("generates the reusable workbook template", async () => {
    const buffer = await createCwmsDataUploadTemplate({
      office: "MVS",
      tsid: "TEST.Stage.Inst.1Hour.0.TEST",
    });
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet("Sheet1");

    expect(worksheet.getRow(1).values.slice(1)).toEqual(CWMS_DATA_UPLOAD_HEADERS);
    expect(worksheet.getRow(2).getCell(1).value).toBe("MVS");
    expect(worksheet.getRow(2).getCell(2).value).toBe("TEST.Stage.Inst.1Hour.0.TEST");
  });
});
