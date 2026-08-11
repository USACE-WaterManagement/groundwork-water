import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { CWMSInputTable, CWMSForm } from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "columns",
    type: "array",
    default: "[]",
    desc: "Array of column configuration objects. Each object can have: tsid (required), label, units, precision, required, readonly, defaultValues.",
  },
  {
    name: "timeoffsets",
    type: "array",
    default: "[]",
    desc: "Row definitions. Each entry is either a time offset in seconds, or an object { offset, id, label, loadNearest, disabled } to override those settings for that row. The two forms can be mixed.",
  },
  {
    name: "showTimestamps",
    type: "boolean",
    default: "true",
    desc: "Whether to show timestamp column.",
  },
  {
    name: "precision",
    type: "number",
    default: "2",
    desc: "Global default number of decimal places for numeric values. Can be overridden per column.",
  },
  {
    name: "units",
    type: "string",
    default: "EN",
    desc: "Global default unit system (EN or SI). Can be overridden per column.",
  },
  {
    name: "disable",
    type: "boolean",
    default: "false",
    desc: "Whether all inputs are disabled.",
  },
  {
    name: "readonly",
    type: "boolean",
    default: "false",
    desc: "Global default for read-only status. Can be overridden per column.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    desc: "Whether the table is in an invalid state.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    desc: "Global default for required status. Can be overridden per column.",
  },
  {
    name: "order",
    type: "number",
    default: "1",
    desc: "Order for CWMS data submission.",
  },
  {
    name: "AllowMissingData",
    type: "boolean",
    default: "true",
    desc: "Whether to allow missing data in submissions.",
  },
  {
    name: "showValueTimestamp",
    type: "boolean",
    default: "false",
    desc: "When true, shows the source datetime of the loaded nearest value as a tooltip on each input cell. The tooltip is removed when the user edits the cell.",
  },
  {
    name: "loadNearest",
    type: "string",
    default: "undefined (feature off)",
    desc: "Opt-in strategy for auto-loading the nearest time series values into cells. When omitted, no values are fetched. 'prev' loads the last value at or before each target time, 'next' loads the first value at or after, 'nearest' loads the closest by absolute time difference. Requires columns with tsid, timeoffsets, and an office on the parent CWMSForm.",
  },
  {
    name: "onChange",
    type: "function",
    default: "undefined",
    desc: "Callback function when any input value changes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    desc: "Tailwind CSS classes to apply to the table.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom inline styles to apply to the table.",
  },
  {
    name: "transpose",
    type: "boolean",
    default: "false",
    desc: "When true, columns (TSIDs) become rows and time offsets become columns. Useful when you have many parameters but few time points.",
  },
];

function CWMSInputTableDocs() {
  // const currentTime = Date.now() / 1000;

  return (
    <DocsPage middleText="CWMS Input Table">
      <div>
        <Text>
          The CWMS Input Table component provides a matrix of input fields for entering
          multiple time series values across different time offsets. Its ideal for bulk
          data entry where you need to input values for multiple parameters at different
          time points.
        </Text>
      </div>

      <Divider text="Basic Usage" className="mt-8" />
      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Stage.Inst.0.0.USGS" },
              { tsid: "Flow.Inst.0.0.USGS" },
              { tsid: "Temp.Inst.0.0.USGS" },
            ]}
            timeoffsets={[0, 3600, 7200]}
            showTimestamps={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`import { CWMSInputTable } from "@usace-watermanagement/groundwork-water";

<CWMSInputTable
  columns={[
    { tsid: "Stage.Inst.0.0.USGS" },
    { tsid: "Flow.Inst.0.0.USGS" },
    { tsid: "Temp.Inst.0.0.USGS" }
  ]}
  timeoffsets={[0, 3600, 7200]}  // 0, 1 hour, 2 hours
  showTimestamps={true}
/>`}
      </CodeBlock>

      <Divider text="With Default Values" className="mt-8" />
      <Text className="mb-4">
        You can provide default values for specific cells within each column
        configuration. Default values are keyed by time offset.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              {
                tsid: "Elev.Inst.0.0.USGS",
                defaultValues: {
                  [-3600]: "650.5",
                  0: "651.2",
                },
              },
              {
                tsid: "Storage.Inst.0.0.USGS",
                defaultValues: {
                  0: "125000",
                },
              },
            ]}
            timeoffsets={[-3600, 0, 3600]}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    {
      tsid: "Elev.Inst.0.0.USGS",
      defaultValues: {
        [-3600]: "650.5",
        0: "651.2"
      }
    },
    {
      tsid: "Storage.Inst.0.0.USGS",
      defaultValues: {
        0: "125000"
      }
    }
  ]}
  timeoffsets={[-3600, 0, 3600]}  // -1 hour, now, +1 hour
/>`}
      </CodeBlock>

      <Divider text="With Form Integration" className="mt-8" />
      <Text className="mb-4">
        When used within a CWMSForm, CWMSInputTable automatically registers with the
        form context for bulk data submission to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`import { CWMSInputTable } from "@usace-watermanagement/groundwork-water";
import { CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSInputTable
    columns={[
      { tsid: "LOCATION.Stage.Inst.15Minutes.0.USGS-raw" },
      { tsid: "LOCATION.Flow.Inst.15Minutes.0.USGS-raw" },
      { tsid: "LOCATION.Precip.Inst.1Hour.0.USGS-raw" }
    ]}
    timeoffsets={[
      -7200,  // -2 hours
      -3600,  // -1 hour
      0,      // current time
      3600,   // +1 hour
      7200    // +2 hours
    ]}
    precision={2}
    units="EN"
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Load Nearest Values" className="mt-8" />
      <Text className="mb-4">
        This is an opt-in feature. When the <Code className="p-1">loadNearest</Code>{" "}
        prop is set (and columns have a <Code className="p-1">tsid</Code> and the parent{" "}
        <Code className="p-1">CWMSForm</Code> provides an{" "}
        <Code className="p-1">office</Code>), CWMSInputTable fetches the nearest time
        series values and pre-populates cells. With{" "}
        <Code className="p-1">loadNearest</Code> omitted, no values are fetched. The
        prop value selects the strategy:
      </Text>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <Code className="p-1">prev</Code> — last value at or before each target time
        </li>
        <li>
          <Code className="p-1">next</Code> — first value at or after each target time
        </li>
        <li>
          <Code className="p-1">nearest</Code> — closest value by absolute time
          difference
        </li>
      </ul>
      <Text className="mb-4">
        Cells show a Loading placeholder while data is being fetched. Once a user edits
        a cell, the loaded value will not overwrite their input. Changing the calendar
        date resets the loaded values.
      </Text>

      <CodeBlock language="jsx">
        {`// Auto-populate cells with the most recent time series values
<CWMSForm
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
  showCalendar={true}
  calendarInterval="hour"
>
  <CWMSInputTable
    columns={[
      { tsid: "KEYS.Elev.Inst.1Hour.0.Ccp-Rev", label: "Elevation (ft)", units: "ft", precision: 2 },
      { tsid: "KEYS.Flow.Inst.1Hour.0.Ccp-Rev", label: "Flow (cfs)", units: "cfs", precision: 0 }
    ]}
    timeoffsets={[0, 3600, 7200]}
    loadNearest="prev"
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Previous Values as a Reference Column" className="mt-8" />
      <Text className="mb-4">
        Loading the previous value straight into the entry cells is not always what you
        want - an operator updating one gate out of thirty may prefer to see the last
        recorded setting <em>beside</em> an empty field rather than edit on top of it.
        Both <Code className="p-1">loadNearest</Code> and{" "}
        <Code className="p-1">disabled</Code> can be set per column, so a single table
        can hold a read-only reference column next to the editable one.
      </Text>
      <Text className="mb-4">
        Two columns may point at the same time series. Give each an{" "}
        <Code className="p-1">id</Code> so they keep separate cell state - without one
        they share a cell and editing the entry column would change the reference column
        too. A disabled column never registers with the form, so only the entry column
        submits, and because fetching happens at the form level both columns still cost
        a single request.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
          <CWMSInputTable
            columns={[
              {
                tsid: "Gate 1",
                id: "gate1-prev",
                label: "Gate 1 (last)",
                loadNearest: "prev",
                disabled: true,
              },
              { tsid: "Gate 1", id: "gate1", label: "Gate 1 (new)" },
              {
                tsid: "Gate 2",
                id: "gate2-prev",
                label: "Gate 2 (last)",
                loadNearest: "prev",
                disabled: true,
              },
              { tsid: "Gate 2", id: "gate2", label: "Gate 2 (new)" },
            ]}
            timeoffsets={[0]}
            showValueTimestamp={true}
            showTimestamps={false}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`// A read-only "last recorded" column beside each entry column.
// Same tsid on both - the id is what keeps their cell state separate.
<CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
  <CWMSInputTable
    columns={[
      {
        tsid: "PROJ.Opening-Gate1.Inst.15Minutes.0.Ccp-Rev",
        id: "gate1-prev",
        label: "Gate 1 (last)",
        loadNearest: "prev",   // only this column loads
        disabled: true,        // display only - never registers, never submits
      },
      {
        tsid: "PROJ.Opening-Gate1.Inst.15Minutes.0.Ccp-Rev",
        id: "gate1",
        label: "Gate 1 (new)", // starts empty, this is what submits
      },
    ]}
    timeoffsets={[0]}
    showValueTimestamp={true}  // hover a cell to see when the value is from
  />
</CWMSForm>`}
      </CodeBlock>

      <Text className="mb-4">
        A column may also override the table-level strategy - set{" "}
        <Code className="p-1">loadNearest</Code> on the table for the common case and on
        an individual column where it should differ. Cells with different strategies
        still share one request; only the value each one picks out of the result
        changes.
      </Text>

      <div className="font-bold text-lg pt-4">Rows can override too</div>
      <Text className="mb-4">
        Entries in <Code className="p-1">timeoffsets</Code> may be objects instead of
        plain numbers, carrying the same overrides a column can:{" "}
        <Code className="p-1">loadNearest</Code>, <Code className="p-1">disabled</Code>,{" "}
        <Code className="p-1">readonly</Code>, <Code className="p-1">id</Code> and{" "}
        <Code className="p-1">label</Code>. That gives you the reference pattern along
        the other axis - useful in a transposed table, or when the same instant needs
        both a recorded row and an entry row.
      </Text>

      <Text className="mb-4">
        Combined with <Code className="p-1">transpose</Code> this gives the layout most
        gate-entry screens want: one row per parameter, a read-only column showing what
        was last recorded, and an empty column to type into. Rows become the visual
        columns when transposed, so the row overrides are what define the two columns
        below.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
          <CWMSInputTable
            transpose={true}
            columns={[
              { tsid: "Gate 1", label: "Gate 1" },
              { tsid: "Gate 2", label: "Gate 2" },
              { tsid: "Gate 3", label: "Gate 3" },
            ]}
            timeoffsets={[
              {
                offset: 0,
                id: "last",
                label: "Last recorded",
                loadNearest: "prev",
                disabled: true,
              },
              { offset: 0, id: "new", label: "New setting" },
            ]}
            showTimestamps={false}
            showValueTimestamp={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`// Transposed: parameters down the side, "last recorded" and "new" across.
// The two visual columns come from the two row definitions.
<CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
  <CWMSInputTable
    transpose={true}
    columns={[
      { tsid: "PROJ.Opening-Gate1.Inst.15Minutes.0.Ccp-Rev", label: "Gate 1" },
      { tsid: "PROJ.Opening-Gate2.Inst.15Minutes.0.Ccp-Rev", label: "Gate 2" },
      { tsid: "PROJ.Opening-Gate3.Inst.15Minutes.0.Ccp-Rev", label: "Gate 3" },
    ]}
    timeoffsets={[
      { offset: 0, id: "last", label: "Last recorded", loadNearest: "prev", disabled: true },
      { offset: 0, id: "new", label: "New setting" },
    ]}
    showTimestamps={false}
    showValueTimestamp={true}
  />
</CWMSForm>

// Plain numbers still work, and can be mixed with row objects.
<CWMSInputTable
  columns={COLUMNS}
  timeoffsets={[-3600, 0, { offset: 3600, loadNearest: "next" }]}
/>`}
      </CodeBlock>

      <Text className="mb-4">
        The reference row uses <Code className="p-1">disabled</Code> rather than{" "}
        <Code className="p-1">readonly</Code>. Both rows here sit at the same offset on
        the same time series, and a read-only row still registers with the form, so the
        two would share one registration and whichever was declared last would win.
        Disabling the reference row keeps it out of the submission entirely, so the
        entry row is unambiguously the one that submits.
      </Text>

      <Text className="mb-4">
        Where both a column and a row set the same option, the more specific wins:
        column over row, row over the table-level prop.
      </Text>

      <Text className="mb-4">
        Use <Code className="p-1">loadNearest</Code> on the table as a whole instead
        when the operator is confirming or nudging existing values rather than entering
        them fresh - the previous value becomes the starting point, and anything they do
        not touch is submitted unchanged.
      </Text>

      <Divider text="Without Timestamps" className="mt-8" />
      <Text className="mb-4">
        You can hide the timestamp column for a more compact view.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Gate 1" },
              { tsid: "Gate 2" },
              { tsid: "Gate 3" },
              { tsid: "Gate 4" },
            ]}
            timeoffsets={[0]}
            showTimestamps={false}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    { tsid: "Gate 1" },
    { tsid: "Gate 2" },
    { tsid: "Gate 3" },
    { tsid: "Gate 4" }
  ]}
  timeoffsets={[0]}  // Single row for current values
  showTimestamps={false}
/>`}
      </CodeBlock>

      <Divider text="Different Units and Precision Per Column" className="mt-8" />
      <Text className="mb-4">
        Each column can have its own units, precision, and other settings.
        Column-specific settings override global defaults.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT">
          <CWMSInputTable
            columns={[
              { tsid: "Stage", label: "Stage", units: "ft", precision: 2 },
              { tsid: "Flow", label: "Flow", units: "cfs", precision: 0 },
              { tsid: "Temperature", label: "Temp", units: "F", precision: 1 },
            ]}
            timeoffsets={[0, 3600]}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`<CWMSInputTable
  columns={[
    {
      tsid: "Stage",
      label: "Stage",
      units: "ft",
      precision: 2
    },
    {
      tsid: "Flow",
      label: "Flow",
      units: "cfs",
      precision: 0
    },
    {
      tsid: "Temperature",
      label: "Temp",
      units: "F",
      precision: 1
    }
  ]}
  timeoffsets={[0, 3600]}
/>

// You can also set global defaults and override only specific columns
<CWMSInputTable
  columns={[
    { tsid: "Stage" },                    // Uses global defaults
    { tsid: "Flow", units: "cms" },       // Overrides only units
    { tsid: "Temp", precision: 1 }        // Overrides only precision
  ]}
  timeoffsets={[0]}
  units="EN"      // Global default
  precision={2}   // Global default
/>`}
      </CodeBlock>

      <Divider text="States and Styling" className="mt-8" />
      <div className="flex flex-col gap-4">
        <div>
          <Text className="mb-2 font-semibold">Read-only Table</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[
                {
                  tsid: "Parameter A",
                  defaultValues: { 0: "100", 3600: "105" },
                },
                {
                  tsid: "Parameter B",
                  defaultValues: { 0: "200", 3600: "210" },
                },
              ]}
              timeoffsets={[0, 3600]}
              readonly={true}
            />
          </CWMSForm>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Custom Styled Table (Tailwind)</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[{ tsid: "Value 1" }, { tsid: "Value 2" }]}
              timeoffsets={[0]}
              showTimestamps={false}
              className="bg-gray-100 border-2 border-gray-700 rounded-lg"
            />
          </CWMSForm>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Custom Styled Table (Inline Style)</Text>
          <CWMSForm office="SWT">
            <CWMSInputTable
              columns={[{ tsid: "Value 3" }, { tsid: "Value 4" }]}
              timeoffsets={[0]}
              showTimestamps={false}
              style={{
                backgroundColor: "#f0f8ff",
                border: "2px solid #4169e1",
                borderRadius: "8px",
              }}
            />
          </CWMSForm>
        </div>
      </div>

      <CodeBlock language="jsx">
        {`// Read-only table with default values
<CWMSInputTable
  columns={[
    {
      tsid: "Parameter A",
      defaultValues: { 0: "100", 3600: "105" }
    },
    {
      tsid: "Parameter B",
      defaultValues: { 0: "200", 3600: "210" }
    }
  ]}
  timeoffsets={[0, 3600]}
  readonly={true}
/>

// Custom styled table with Tailwind classes
<CWMSInputTable
  columns={[
    { tsid: "Value 1" },
    { tsid: "Value 2" }
  ]}
  timeoffsets={[0]}
  showTimestamps={false}
  className="bg-gray-100 border-2 border-gray-700 rounded-lg"
/>

// Custom styled table with inline styles
<CWMSInputTable
  columns={[
    { tsid: "Value 3" },
    { tsid: "Value 4" }
  ]}
  timeoffsets={[0]}
  showTimestamps={false}
  style={{
    backgroundColor: "#f0f8ff",
    border: "2px solid #4169e1",
    borderRadius: "8px"
  }}
/>

// You can also use both className and style together
<CWMSInputTable
  columns={[{ tsid: "Combined" }]}
  timeoffsets={[0]}
  className="rounded-lg shadow-md"
  style={{ backgroundColor: "#fafafa" }}
/>`}
      </CodeBlock>

      <Divider text="Transposed Layout" className="mt-8" />
      <Text className="mb-4">
        Set <Code>transpose={"{true}"}</Code> to swap the axes. Parameters (columns)
        become rows and time offsets become columns. This is useful when you have many
        parameters but only a few time points.
      </Text>

      <div className="overflow-x-auto">
        <CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
          <CWMSInputTable
            columns={[
              { tsid: "Stage", label: "Stage (ft)", units: "ft", precision: 2 },
              { tsid: "Flow", label: "Flow (cfs)", units: "cfs", precision: 0 },
              { tsid: "Temp", label: "Temp (°F)", units: "F", precision: 1 },
              { tsid: "DO", label: "Dissolved O₂", units: "mg/L", precision: 2 },
            ]}
            timeoffsets={[0, 3600, 7200]}
            transpose={true}
          />
        </CWMSForm>
      </div>

      <CodeBlock language="jsx">
        {`// Transposed — parameters as rows, time offsets as columns
<CWMSForm office="SWT" showCalendar={true} calendarInterval="hour">
  <CWMSInputTable
    columns={[
      { tsid: "Stage", label: "Stage (ft)", units: "ft", precision: 2 },
      { tsid: "Flow", label: "Flow (cfs)", units: "cfs", precision: 0 },
      { tsid: "Temp", label: "Temp (°F)", units: "F", precision: 1 },
      { tsid: "DO", label: "Dissolved O₂", units: "mg/L", precision: 2 },
    ]}
    timeoffsets={[0, 3600, 7200]}
    transpose={true}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSInputTable />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />

      <div className="font-bold text-lg pt-6 mt-8">Column Configuration Object</div>
      <Text className="mb-4">
        Each object in the <Code className="p-1">columns</Code> array can have the
        following properties:
      </Text>
      <PropsTable
        propsList={[
          {
            name: "tsid",
            type: "string",
            default: "required",
            desc: "Time Series ID for this column. This is the only required property.",
          },
          {
            name: "id",
            type: "string",
            default: "tsid value",
            desc: "Identity for this column's cells. Only needed when two columns reference the same tsid - give each an id so they keep separate values instead of sharing one cell.",
          },
          {
            name: "loadNearest",
            type: "string",
            default: "table loadNearest",
            desc: "Per-column override of the table's loadNearest strategy ('prev', 'next', 'nearest'). Set it on a single column to load only that column, or to use a different strategy from the rest of the table. Columns with different strategies still share one request.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "table disable",
            desc: "Disables just this column. A disabled column does not register with the form, so it displays values but never submits them - which is what lets it sit beside an editable column on the same tsid.",
          },
          {
            name: "label",
            type: "string",
            default: "tsid value",
            desc: "Display label for the column header. If not provided, uses the tsid.",
          },
          {
            name: "units",
            type: "string",
            default: "global units",
            desc: "Unit system for this column (e.g., 'ft', 'cfs', 'm', 'cms'). Overrides global units prop.",
          },
          {
            name: "precision",
            type: "number",
            default: "global precision",
            desc: "Number of decimal places for values in this column. Overrides global precision prop.",
          },
          {
            name: "required",
            type: "boolean",
            default: "global required",
            desc: "Whether all cells in this column are required. Overrides global required prop.",
          },
          {
            name: "readonly",
            type: "boolean",
            default: "global readonly",
            desc: "Whether all cells in this column are read-only. Overrides global readonly prop.",
          },
          {
            name: "defaultValues",
            type: "object",
            default: "{}",
            desc: "Object with default values keyed by time offset (e.g., {0: '100', 3600: '105'}).",
          },
        ]}
      />

      <div className="font-bold text-lg pt-6 mt-8">Row Configuration Object</div>
      <Text className="mb-4">
        Entries in <Code className="p-1">timeoffsets</Code> may be a plain number, or an
        object with the following properties. Both forms can be mixed in one array.
      </Text>
      <PropsTable
        propsList={[
          {
            name: "offset",
            type: "number",
            default: "required",
            desc: "Time offset in seconds from the form's base time. This is what a plain number entry sets.",
          },
          {
            name: "id",
            type: "string",
            default: "offset value",
            desc: "Identity for this row's cells. Only needed when two rows use the same offset - give each an id so they keep separate values instead of sharing one cell.",
          },
          {
            name: "label",
            type: "string",
            default: "undefined",
            desc: "Heading for the row. Used in transposed layouts, where rows are rendered as columns, and when showTimestamps is false.",
          },
          {
            name: "loadNearest",
            type: "string",
            default: "table loadNearest",
            desc: "Per-row override of the loadNearest strategy ('prev', 'next', 'nearest'). Set it on a single row to load only that row. Rows with different strategies still share one request.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "table disable",
            desc: "Disables just this row. A disabled row does not register with the form, so it displays values but never submits them, and its cells reject edits.",
          },
          {
            name: "readonly",
            type: "boolean",
            default: "table readonly",
            desc: "Makes just this row read-only. Unlike disabled, a read-only row still registers and still submits - use it for a value the operator should see and send but not change. It is not a substitute for disabled in the reference pattern (see below).",
          },
        ]}
      />

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
        <Text className="font-semibold mb-2">readonly is not disabled</Text>
        <Text className="text-sm">
          Both stop the operator typing, but only <Code className="p-1">disabled</Code>{" "}
          keeps a cell out of the submission. A <Code className="p-1">readonly</Code>{" "}
          cell still registers with the form and still submits its value.
        </Text>
        <Text className="text-sm mt-2">
          That is why the reference pattern above uses{" "}
          <Code className="p-1">disabled</Code>. The form keys its registry by time
          series and time offset, so a read-only reference cell and the entry cell
          beside it - same tsid, same offset - would register under the same key and one
          would silently replace the other. Reach for{" "}
          <Code className="p-1">readonly</Code> when a value should be sent but not
          edited, and <Code className="p-1">disabled</Code> when it should only be
          displayed.
        </Text>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <Text className="font-semibold mb-2">Property Fallback Chain:</Text>
        <Text className="text-sm">
          For properties like units, precision, required, and readonly, the component
          uses this fallback order:
        </Text>
        <Code className="block mt-2 p-2 bg-white">
          column.property → global property → default value
        </Code>
        <Text className="text-sm mt-2">
          This allows you to set global defaults and selectively override them for
          specific columns.
        </Text>
        <Text className="text-sm mt-3">
          For the options a row can also set - <Code className="p-1">loadNearest</Code>{" "}
          and <Code className="p-1">disabled</Code> - the row sits between the column
          and the component-wide prop:
        </Text>
        <Code className="block mt-2 p-2 bg-white">
          column.property → row.property → global property
        </Code>
      </div>
    </DocsPage>
  );
}

export { CWMSInputTableDocs };
export default CWMSInputTableDocs;
