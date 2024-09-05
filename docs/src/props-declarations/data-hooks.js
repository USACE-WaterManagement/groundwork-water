const cdaCatalogParams = [
  {
    name: "dataset",
    type: "string",
    required: true,
    desc: "Data type to catalog. Options: 'TIMESERIES', 'LOCATIONS'",
  },
  {
    name: "like",
    type: "string",
    required: true,
    desc: "Posix regular expression matching against the id.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "3-4 letter office name representing the district you want to isolate data to.",
  },
];

const cdaTSHookParams = [
  {
    name: "name",
    type: "string",
    required: true,
    desc: "Specifies the name(s) of the time series whose data is to be included in the response. A case insensitive comparison is used to match names.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Specifies the owning office of the time series whose data is to be included in the response. If this field is not specified, matching time series information from all offices shall be returned.",
  },
  {
    name: "unit",
    type: "string",
    required: false,
    desc: "Specifies the unit or unit system of the response. Options: 'EN', 'SI', specific units (e.g. 'ft')",
  },
  {
    name: "begin",
    type: "string",
    required: false,
    desc: "Specifies the start of the time window for data to be included in the response. If this field is not specified, any required time window begins 24 hours prior to the specified or default end time. The format for this field is ISO 8601 extended, with optional offset and timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-0700[PST8PDT]'.",
  },
  {
    name: "end",
    type: "string",
    required: false,
    desc: "Specifies the end of the time window for data to be included in the response. If this field is not specified, any required time window ends at the current time. The format for this field is ISO 8601 extended, with optional timezone, i.e., 'YYYY-MM-dd'T'hh:mm:ss[Z'['VV']']', e.g., '2021-06-10T13:00:00-0700[PST8PDT]'.",
  },
];

export { cdaTSHookParams, cdaCatalogParams };
