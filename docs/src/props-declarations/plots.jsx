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
    default: "undefined",
    desc: "Custom className to add to the containing div",
  },
  {
    name: "responsive",
    type: "boolean",
    default: "true",
    desc: "Responsive mode toggle for the plot",
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
