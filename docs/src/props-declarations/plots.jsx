import { cdaTSHookParams } from "./data-hooks";

const tsPlotProps = [
  ...cdaTSHookParams,
  {
    name: "responsive",
    type: "boolean",
    default: "true",
    desc: "Responsive mode for the plot",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Add custom className to the fieldset",
  },
];

const cwmsPlotProps = [
  {
    name: "tsids",
    type: "array",
    default: "undefined",
    desc: "Array of timeseries IDs to plot",
  },
  {
    name: "office",
    type: "string",
    default: "undefined",
    desc: "Office to plot",
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
    name: "title",
    type: "string",
    default: "undefined",
    desc: (
      <>
        The plotly js defined title of the plot seen here:{" "}
        <a
          className="gw-underline"
          href="https://plotly.com/javascript/reference/layout/#title"
        >
          Plotly Object Keys for Title
        </a>
      </>
    ),
  },
  {
    name: "fontSize",
    type: "number",
    default: "undefined",
    desc: "Font size of the plot",
  },
  {
    name: "unit",
    type: "string",
    default: "undefined",
    desc: "Unit of the plot",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Add custom className to the fieldset",
  },
  {
    name: "plotHeight",
    type: "number",
    default: "550",
    desc: "Height of the plot",
  },
  {
    name: "autoSize",
    type: "boolean",
    default: "true",
    desc: "Auto-size the plot",
  },
  {
    name: "shapes",
    type: "array",
    default: "undefined",
    desc: "Array of shapes to add to the plot",
  },
  {
    name: "annotations",
    type: "array",
    default: "undefined",
    desc: "Array of annotations to add to the plot",
  },
  {
    name: "responsive",
    type: "boolean",
    default: "true",
    desc: "Responsive mode for the plot",
  },
];

export { tsPlotProps, cwmsPlotProps };
