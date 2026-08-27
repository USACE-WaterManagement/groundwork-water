const chartProps = [
  {
    name: "damBottom",
    type: "number",
    default: "undefined",
    desc: "The level at which the bottom of the dam will be drawn. Usually Elev.Streambed or Stage.Streambed",
  },
  {
    name: "damTop",
    type: "number",
    default: "undefined",
    desc: "The level at which the top of the dam will be drawn. Usually Elev.Top of Dam or Stage.Top of Dam",
  },
  {
    name: "gradientBottom",
    type: "number",
    default: "undefined",
    desc: "The level at which the bottom of the dam gradient will be drawn. Usually Elev.Bottom of Flood or Elev.Bottom of Flood Control or Elev.Top of Conservation",
  },
  {
    name: "gradientTop",
    type: "number",
    default: "undefined",
    desc: "The level at which the top of the dam gradient will be drawn. Usually Elev.Top of Flood or Elev.Top of Flood Control",
  },
  {
    name: "inflow",
    type: "number",
    default: "undefined",
    desc: "The latest value of the inflow timeseries.",
  },
  {
    name: "outflow",
    type: "number",
    default: "undefined",
    desc: "The latest value of the outflow timeseries.",
  },
  {
    name: "pool",
    type: "number",
    default: "undefined",
    desc: "The latest value of the elevation or stage timeseries.",
  },
  {
    name: "powerGeneration",
    type: "number",
    default: "undefined",
    desc: "The latest value of the power generation timeseries. Determines if the turbine graphic is drawn.",
  },
  {
    name: "surcharge",
    type: "number",
    default: "undefined",
    desc: "The latest value of the surcharge release timeseries.",
  },
  {
    name: "tail",
    type: "number",
    default: "undefined",
    desc: "The latest value of the Elevation Tailwater or Stage Tailwater timeseries.",
  },
  {
    name: "infoText",
    type: "string",
    default: "undefined",
    desc: "The name of the project.",
  },
  {
    name: "latestTime",
    type: "string",
    default: "undefined",
    desc: "The latest time from the Elevation or Stage timeseries",
  },
  {
    name: "levels",
    type: "array",
    default: "undefined",
    desc: "Array of levels to be drawn on the dam Y axis.",
  },
  {
    name: "outflowTotals",
    type: "array",
    default: "undefined",
    desc: "Array of outflow types to be drawn on below the Outflow Icon.",
  },
  {
    name: "elevation",
    type: "string",
    default: "undefined",
    desc: "The elevation of the project.",
  },
  {
    name: "drainage",
    type: "string",
    default: "undefined",
    desc: "The size of the drainage basin of the project.",
  },
];

export default chartProps;
