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
    desc: "An array of arrays representing the data for the table. You can either provide this or use the queryParams prop. QueryParams performs the call for you, whereas content expects a 2D array of TS Data. i.e. [[Date, Value, Quality Code], [Date, Value, Quality Code]]",
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

export { tsTableParams };
