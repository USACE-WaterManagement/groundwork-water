import {
  buildCsvContent,
  buildTableIndex,
  buildTableRows,
  buildTableRowValues,
} from "../tableData";

const rawSeries = [
  {
    name: "A.Elev.Inst.1Hour.0.rev",
    units: "ft",
    values: [
      [1_000, 1.234],
      [2_000, null],
    ],
  },
  {
    name: "A.Flow.Inst.1Hour.0.rev",
    units: "cfs",
    values: [[2_000, 10]],
  },
];

const timeseriesParams = [
  {
    header: "Elevation",
    precision: 1,
    tsid: "A.Elev.Inst.1Hour.0.rev",
  },
  {
    header: "Flow, Out",
    rounding: 0,
    tsid: "A.Flow.Inst.1Hour.0.rev",
  },
];

describe("tableData", () => {
  it("indexes dates in requested order", () => {
    const ascending = buildTableIndex({
      rawSeries,
      sortAscending: true,
      timeseriesParams,
    });
    const descending = buildTableIndex({
      rawSeries,
      sortAscending: false,
      timeseriesParams,
    });

    expect(ascending.dates).toEqual([1_000, 2_000]);
    expect(descending.dates).toEqual([2_000, 1_000]);
    expect(
      ascending.seriesLookup.get("A.Elev.Inst.1Hour.0.rev").valuesByDate.get(1_000),
    ).toMatchObject({
      time: 1_000,
      value: 1.234,
    });
  });

  it("formats row values with precision and missing values", () => {
    const index = buildTableIndex({
      rawSeries,
      sortAscending: true,
      timeseriesParams,
    });

    expect(
      buildTableRowValues({
        date: 2_000,
        missingString: "---",
        precisionByTsid: new Map([
          ["A.Elev.Inst.1Hour.0.rev", 1],
          ["A.Flow.Inst.1Hour.0.rev", 0],
        ]),
        seriesLookup: index.seriesLookup,
        visibleTsids: index.visibleTsids,
      }),
    ).toEqual(["---", "10"]);
  });

  it("builds rows and csv content with escaped cells", () => {
    const rows = buildTableRows({
      dateFormat: "YYYY-MM-DD HH:mm:ss",
      missingString: "",
      rawSeries,
      sortAscending: true,
      timeseriesParams,
    });

    expect(rows).toHaveLength(2);
    expect(buildCsvContent({ rows, timeseriesParams })).toContain(
      'Date,Elevation,"Flow, Out"',
    );
  });
});
