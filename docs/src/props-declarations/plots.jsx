const cwmsPlotProps = [
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
    name: "unit",
    type: "string",
    default: "undefined",
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  {
    name: "office",
    type: "string",
    default: "undefined",
    desc: "The owning office of the data to be plotted",
  },
  {
    name: "timeSeries",
    type: "TraceData[]",
    default: "undefined",
    desc: "An array of objects that define the time series ids to plot and, optionally, styling options.  Details below.",
  },
  {
    name: "locationLevels",
    type: "TraceData[]",
    default: "undefined",
    desc: "An array of objects that define the location level ids to plot and, optionally, styling options.  Details below.",
  },
  {
    name: "pageSize",
    type: "string",
    default: "500",
    desc: "How many entries per page returned. If you notice you are missing data, try increasing this.",
  },
  {
    name: "layoutOptions",
    type: "object",
    default: "undefined",
    required: false,
    desc: (
      <>
        Optional styling options for the plot. Can take any of the plotlyjs
        layout properties:{" "}
        <a
          href="https://plotly.com/javascript/reference/layout/"
          className="gw-underline"
        >
          PlotlyJS Layout Reference
        </a>
        .
      </>
    ),
  },
  {
    name: "className",
    type: "string",
    default: '""',
    desc: "Custom className to add to the containing div.",
  },
  {
    name: "responsive",
    type: "boolean",
    default: "true",
    desc: "Responsive mode toggle for the plot.",
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
    name: "staticTraces",
    type: "TraceData[]",
    default: "undefined",
    desc: "Adds static trace data to the plots. These are the same as regular traces only they show up after/below other traces.",
  },
  {
    name: "cdaUrl",
    type: "string",
    default: "https://cwms-data.usace.army.mil/cwms-data",
    desc: "Allows overriding the default domain to a different CDA endpoint.",
  },
];

const traceDataProps = [
  {
    name: "id",
    type: "string",
    default: "undefined",
    desc: "The id of the CWMS data to be plotted",
  },
  {
    name: "traceOptions",
    type: "object",
    default: "undefined",
    desc: (
      <>
        Optional styling options for the data. Can take any of the plotlyjs
        scatter trace properties:{" "}
        <a
          href="https://plotly.com/javascript/reference/scatter/"
          className="gw-underline"
        >
          PlotlyJS Scatter Trace Reference
        </a>
        .
      </>
    ),
  },
];

export { cwmsPlotProps, traceDataProps };
