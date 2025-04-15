import { Code } from "../pages/components/code";
import { cdaUrlParam } from "../pages/components/shared-docs";

const tsTableParams = [
  {
    name: "precision",
    type: "number",
    required: false,
    desc: "The number of decimal places to display for the value.",
  },
  {
    name: "title",
    type: "string",
    required: false,
    desc: "The title heading for the table.",
  },
  {
    name: "subTitle",
    type: "string",
    required: false,
    desc: "The sub-heading for the table.",
  },
  {
    name: "heading",
    type: "array",
    required: false,
    desc: "An array of strings representing the headings for the table.",
  },
  {
    name: "content",
    type: "array",
    required: false,
    desc: "An array of arrays representing the data for the table. You can either provide this or use the cdaParams prop. Using cdaParams performs the call for you, whereas content expects a 2D array of TS Data. i.e. [[Date, Value, Quality Code], [Date, Value, Quality Code]]",
  },
  {
    name: "order",
    type: "string",
    required: false,
    desc: "The order of the table. Can be 'asc' or 'desc'.",
  },
  {
    name: "dateFormat",
    type: "string",
    required: false,
    desc: (
      <>
        The format of the date in the table in any string available here:{" "}
        <a
          href="https://day.js.org/docs/en/display/format"
          className="gw-underline"
        >
          Day.js Formatting
        </a>
        .
      </>
    ),
  },
];

const cwmsTableParams = [
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Specifies the owning office of the time series whose data is to be included in the response.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  {
    name: "datum",
    type: "string",
    default: "undefined",
    desc: (
      <div>
        Specifies the elevation datum of the response. This field affects only
        elevation location levels.
        <ul>
          <li>
            <b>NAVD88</b>: The elevation values will in the specified or default
            units above the NAVD-88 datum.
          </li>
          <li>
            <b>NGVD29</b>: The elevation values will be in the specified or
            default units above the NGVD-29 datum.
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: "begin",
    type: "string",
    default: "undefined",
    desc: "Beginning of the time range to plot 'YYYY-MM-DDThh:mm:ssZ' or '2021-06-10T13:00:00-07:00'.",
  },
  {
    name: "end",
    type: "string",
    default: "undefined",
    desc: "End of the time range to plot 'YYYY-MM-DDThh:mm:ssZ' or '2021-06-12T13:00:00-07:00'.",
  },
  {
    name: "timezone",
    type: "string",
    default: "undefined",
    desc: "Specifies the time zone of the values of the begin and end fields (unless otherwise specified).",
  },
  {
    name: "trim",
    type: "string",
    default: "true",
    desc: "Specifies whether to trim missing values from the beginning and end of the retrieved values.",
  },
  {
    name: "interval",
    type: "string",
    required: false,
    default: 1,
    desc: "Interval in minutes to use for the table. This is useful for reducing the number of data points in the table.",
  },
  {
    name: "pageSize",
    type: "string",
    default: "500",
    desc: "How many entries per page returned. If you notice you are missing data, try increasing this.",
  },
  {
    name: "sortAscending",
    type: "string",
    required: false,
    default: "true",
    desc: "The order of the table sorted by date. Can be 'true' or 'false'.",
  },
  {
    name: "missingString",
    type: "string",
    required: false,
    default: '""',
    desc: "The string to display when a value is missing.",
  },
  {
    name: "dateFormat",
    type: "string",
    required: false,
    desc: (
      <>
        The format of the date in the table in any string available here:{" "}
        <a
          href="https://day.js.org/docs/en/display/format"
          className="gw-underline"
        >
          Day.js Formatting
        </a>
        .<br />
        Default is "ddd MMM DD HH:mm"
      </>
    ),
  },
  cdaUrlParam,
];

const timeseriesParams = [
  {
    name: "tsid",
    type: "string",
    required: true,
    desc: "Fully qualified time series ID.",
  },
  {
    name: "header",
    desc: "The header for the table column.",
    type: "string",
  },
  {
    name: "rounding",
    type: "number",
    desc: "The number of decimal places to round the values to.",
  },
  {
    name: "offset",
    type: "number",
    desc: "An offset to apply to the values in the table.",
  },
];

export { tsTableParams, cwmsTableParams, timeseriesParams };
