import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import {
  CWMSForm,
  CWMSInput,
  CWMSFileUpload,
  CWMSTextarea,
  CWMSDropdown,
} from "@usace-watermanagement/groundwork-water";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "office",
    type: "string",
    default: "required",
    desc: "USACE office symbol (e.g., 'SWT', 'NWD').",
  },
  {
    name: "cdaUrl",
    type: "string",
    default: "undefined",
    desc: "URL for CWMS Data API. If not provided, uses the URL from CdaUrlProvider.",
  },
  {
    name: "unit",
    type: "string",
    default: "EN",
    desc: "Unit system for data submission (EN for English, SI for metric).",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "required",
    desc: "Form input components to be wrapped.",
  },
  {
    name: "onSubmit",
    type: "function",
    default: "undefined",
    desc: "Custom submit handler. Receives (formData, event). If not provided, submits to CWMS.",
  },
  {
    name: "onReset",
    type: "function",
    default: "undefined",
    desc: "Custom reset handler. Called after form inputs are reset.",
  },
  {
    name: "submitText",
    type: "string",
    default: "Submit",
    desc: "Text for the submit button.",
  },
  {
    name: "resetText",
    type: "string",
    default: "Reset",
    desc: "Text for the reset button.",
  },
  {
    name: "resetOnSubmit",
    type: "boolean",
    default: "true",
    desc: "Whether to automatically reset form fields after successful submission.",
  },
  {
    name: "storeRule",
    type: "string",
    default: "REPLACE_ALL",
    desc: "Store rule for time series data: 'REPLACE_ALL', 'DO_NOT_REPLACE', 'DELETE_INSERT', 'REPLACE_WITH_NON_MISSING', 'REPLACE_MISSING_VALUES_ONLY'.",
  },
  {
    name: "showButtons",
    type: "boolean",
    default: "true",
    desc: "Whether to show submit and reset buttons.",
  },
  {
    name: "showCalendar",
    type: "boolean",
    default: "false",
    desc: "Whether to show a calendar for setting the base timestamp for submissions.",
  },
  {
    name: "calendarLabel",
    type: "string",
    default: "Submission Time",
    desc: "Label text for the calendar input.",
  },
  {
    name: "calendarInterval",
    type: "string",
    default: "minute",
    desc: "Time interval for automatic snapping: 'none', 'second', 'minute', '5minutes', '15minutes', '30minutes', 'hour', 'day', 'month', or 'year'.",
  },
  {
    name: "calendarSnapTo",
    type: "string",
    default: "nearest",
    desc: "Snap direction when selecting time: 'nearest', 'previous', or 'next'.",
  },
  {
    name: "calendarTimezone",
    type: "string",
    default: "undefined",
    desc: "A dayjs timezone string (e.g. 'America/Chicago', 'US/Central', 'UTC'). When set, the calendar displays and interprets times in this timezone.",
  },
  {
    name: "calendarOffset",
    type: "number",
    default: "0",
    desc: "Offset in seconds applied to the snap anchor. Shifts where the snap lands (e.g. 25200 for 7 hours, 600 for 10 minutes). The snap grid is shifted by this amount.",
  },
  {
    name: "calendarUseGmtOffset",
    type: "boolean",
    default: "false",
    desc: "When true, the calendarOffset is applied in fixed GMT (no daylight saving). Display still uses calendarTimezone if set. When false, the offset is applied in the calendarTimezone (DST-aware).",
  },
  {
    name: "onCalendarChange",
    type: "function",
    default: "undefined",
    desc: "Callback fired when the calendar timestamp changes. Receives the snapped Date object.",
  },
  {
    name: "onLoadError",
    type: "function",
    default: "undefined",
    desc: "Callback fired when loading nearest values fails or times out. Receives the error. Without it a failed load is indistinguishable from no data existing - the fields simply stay empty.",
  },
  {
    name: "lookback",
    type: "number",
    default: "1",
    desc: "How many days before the form's calendar time to search when loading nearest values. Raise it for sites that report less often than daily - a gage whose last reading is three days old is invisible to the default one-day window. Individual inputs and columns can override it.",
  },
  {
    name: "lookahead",
    type: "number",
    default: "1",
    desc: "How many days after the form's calendar time to search. Only applies to the 'next' and 'nearest' strategies; a 'prev' lookup never requests future data.",
  },
  {
    name: "toastAutoClose",
    type: "number|boolean",
    default: "5000",
    desc: "Auto-close time for toasts in milliseconds. Set to false to disable auto-closing.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    desc: "Additional CSS classes for the form element.",
  },
  {
    name: "style",
    type: "object",
    default: "undefined",
    desc: "Custom styles for the form element.",
  },
];

function CWMSFormDocs() {
  return (
    <DocsPage middleText="Form Wrapper">
      <div>
        <Text>
          The CWMSForm component provides a context for CWMS form inputs, handling data
          collection, validation, and submission to the CWMS Data API. It automatically
          manages form state and provides styled submit/reset buttons.
        </Text>
        <Text className="mt-2">
          All CWMS input components (CWMSInput, CWMSTextarea, CWMSDropdown, etc.) must
          be wrapped in a CWMSForm to function properly.
        </Text>
      </div>

      <Divider text="Basic Form Example" className="mt-8" />
      <Text className="mb-4">
        A simple form with various input types demonstrating the basic usage of
        CWMSForm.
      </Text>

      <CWMSForm
        office="SWT"
        showCalendar={true}
        calendarLabel="Data Collection Time"
        calendarInterval="15minutes"
        calendarSnapTo="nearest"
        onSubmit={(data) => {
          console.log("Form submitted with timestamps:", data);
        }}
      >
        <CWMSInput
          name="stage"
          placeholder="Enter stage value"
          type="number"
          timeOffset={0}
        />
        <CWMSTextarea
          name="notes"
          placeholder="Enter observation notes (5 minutes after base time)"
          rows={3}
          timeOffset={5}
        />
        <CWMSDropdown
          name="gate-position"
          placeholder="Select gate position (10 minutes after base time)"
          options={["Closed", "25% Open", "50% Open", "75% Open", "Fully Open"]}
          timeOffset={10}
        />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`import { CWMSForm, CWMSInput, CWMSTextarea, CWMSDropdown } from "@usace-watermanagement/groundwork-water";

<CWMSForm 
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
>
  <CWMSInput
    name="stage"
    placeholder="Enter stage value"
    type="number"
  />
  <CWMSTextarea
    name="notes"
    placeholder="Enter observation notes"
    rows={3}
  />
  <CWMSDropdown
    name="gate-position"
    placeholder="Select gate position"
    options={["Closed", "25% Open", "50% Open", "75% Open", "Fully Open"]}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With Blob Uploads" className="mt-8" />
      <Text className="mb-4">
        <Code>CWMSForm</Code> can coordinate blob uploads alongside the rest of the
        forms feature set. <Code>CWMSFileUpload</Code> registers with the same form
        context, validates locally, and uploads through <Code>cwmsjs</Code>.
      </Text>

      <CWMSForm office="SWT" onSubmit={(data) => console.log("File upload form", data)}>
        <CWMSFileUpload
          blobId="GROUNDWORK.DOCS.UPLOAD"
          label="Upload a document"
          helperText="Zero-byte files are rejected before submit."
          maxFileSizeBytes={250000}
          accept=".txt,.json,.csv"
        />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`import { CWMSFileUpload, CWMSForm } from "@usace-watermanagement/groundwork-water";

<CWMSForm office="SWT" cdaUrl="https://cwms-data.usace.army.mil/cwms-data">
  <CWMSFileUpload
    blobId="GROUNDWORK.DOCS.UPLOAD"
    label="Upload a document"
    helperText="Zero-byte files are rejected before submit."
    accept=".txt,.json,.csv"
    maxFileSizeBytes={250000}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With Calendar and Time Offsets" className="mt-8" />
      <Text className="mb-4">
        Enable a calendar to set a base timestamp for all submissions. Individual inputs
        can have time offsets (in minutes) relative to this base time.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm 
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
  showCalendar={true}
  calendarLabel="Data Collection Time"
>
  <CWMSInput
    name="stage"
    tsid="LOCATION.Stage.Inst.15Minutes.0.USGS-raw"
    placeholder="Stage at base time"
    type="number"
    timeOffset={0}
  />
  
  <CWMSInput
    name="flow"
    tsid="LOCATION.Flow.Inst.15Minutes.0.USGS-raw"
    placeholder="Flow 15 minutes later"
    type="number"
    timeOffset={15}
  />
  
  <CWMSTextarea
    name="notes"
    tsid="LOCATION.Notes.Inst.1Hour.0.MANUAL"
    placeholder="Notes 30 minutes later"
    timeOffset={30}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Calendar Time Snapping" className="mt-8" />
      <Text className="mb-4">
        The calendar can automatically snap selected times to specified intervals. This
        ensures consistent time boundaries for data collection (e.g., always on the
        hour, or at 15-minute intervals).
      </Text>

      <CodeBlock language="jsx">
        {`// Snap to nearest 15-minute interval
<CWMSForm 
  office="SWT"
  showCalendar={true}
  calendarInterval="15minutes"
  calendarSnapTo="nearest"
>
  {/* Form inputs */}
</CWMSForm>

// Snap to previous hour boundary
<CWMSForm 
  office="SWT"
  showCalendar={true}
  calendarInterval="hour"
  calendarSnapTo="previous"
>
  {/* Form inputs */}
</CWMSForm>

// Snap to next 5-minute interval
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="5minutes"
  calendarSnapTo="next"
>
  {/* Form inputs */}
</CWMSForm>

// Snap to beginning of month
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="month"
  calendarSnapTo="previous"
>
  {/* Form inputs */}
</CWMSForm>

// Snap to nearest year boundary
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="year"
  calendarSnapTo="nearest"
>
  {/* Form inputs */}
</CWMSForm>`}
      </CodeBlock>

      <Text className="mb-4 mt-4">
        <strong>Available Intervals:</strong>
      </Text>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          <Code>none</Code> - No snapping, exact time selection
        </li>
        <li>
          <Code>second</Code> - Snap to nearest second (removes milliseconds)
        </li>
        <li>
          <Code>minute</Code> - Snap to minute boundaries
        </li>
        <li>
          <Code>5minutes</Code> - Snap to 5-minute intervals (00, 05, 10, etc.)
        </li>
        <li>
          <Code>15minutes</Code> - Snap to 15-minute intervals (00, 15, 30, 45)
        </li>
        <li>
          <Code>30minutes</Code> - Snap to 30-minute intervals (00, 30)
        </li>
        <li>
          <Code>hour</Code> - Snap to hour boundaries
        </li>
        <li>
          <Code>day</Code> - Snap to midnight
        </li>
        <li>
          <Code>month</Code> - Snap to first day of month at midnight
        </li>
        <li>
          <Code>year</Code> - Snap to January 1st at midnight
        </li>
      </ul>

      <Text className="mb-4">
        <strong>Snap Directions:</strong>
      </Text>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          <Code>nearest</Code> - Snap to the nearest interval boundary
        </li>
        <li>
          <Code>previous</Code> - Always snap backward to the previous boundary
        </li>
        <li>
          <Code>next</Code> - Always snap forward to the next boundary
        </li>
      </ul>

      <Divider text="Timezone and Snap Offset" className="mt-8" />
      <Text className="mb-4">
        The <Code>calendarTimezone</Code>, <Code>calendarOffset</Code>, and{" "}
        <Code>calendarUseGmtOffset</Code> props give you fine-grained control over how
        times are displayed and where the snap lands.
      </Text>

      <Text className="mt-2 mb-2">
        <strong>calendarTimezone</strong> sets the display timezone. The calendar input
        will show and interpret times in this timezone instead of the browser's local
        time.
      </Text>

      <Text className="mt-2 mb-2">
        <strong>calendarOffset</strong> (in seconds) shifts the snap anchor point. For
        example, with a daily interval and an offset of 25200 (7 hours), the snap target
        becomes 07:00 instead of 00:00. With an hourly interval and an offset of 600 (10
        minutes), the snap target becomes :10 past the hour.
      </Text>

      <Text className="mt-2 mb-4">
        <strong>calendarUseGmtOffset</strong> controls whether the offset is applied in
        fixed GMT or in the DST-aware timezone. When <Code>true</Code>, the snap always
        lands at the same GMT time regardless of daylight saving changes, but the
        calendar still displays in the selected timezone.
      </Text>

      <CWMSForm
        office="SWT"
        showCalendar={true}
        calendarLabel="Daily at 07:00 GMT"
        calendarInterval="day"
        calendarSnapTo="nearest"
        calendarOffset={25200}
        calendarUseGmtOffset={true}
        onSubmit={(data) => {
          console.log("Timezone example submitted:", data);
        }}
      >
        <CWMSInput
          name="daily-reading"
          placeholder="Daily reading (snaps to 07:00 GMT)"
          type="number"
        />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`// Daily snap at 07:00 GMT (fixed, no DST shift)
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="day"
  calendarOffset={25200}        // 7 hours in seconds
  calendarUseGmtOffset={true}   // Use fixed GMT offset
>
  <CWMSInput name="daily-reading" type="number" />
</CWMSForm>

// Hourly snap at :10 past the hour in Chicago time (DST-aware)
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="hour"
  calendarOffset={600}                    // 10 minutes in seconds
  calendarTimezone="America/Chicago"      // DST-aware timezone
>
  <CWMSInput name="hourly-reading" type="number" />
</CWMSForm>

// Display in Chicago time, but snap offset is fixed GMT
// In summer (CDT, UTC-5) the user sees 02:00, in winter (CST, UTC-6) they see 01:00
// but the stored time is always 07:00 UTC
<CWMSForm
  office="SWT"
  showCalendar={true}
  calendarInterval="day"
  calendarOffset={25200}
  calendarTimezone="America/Chicago"
  calendarUseGmtOffset={true}
>
  <CWMSInput name="daily-reading" type="number" />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With CWMS Time Series" className="mt-8" />
      <Text className="mb-4">
        Form inputs can be associated with specific CWMS time series IDs for automatic
        data submission.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm 
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
  unit="EN"
>
  <CWMSInput
    name="stage-input"
    tsid="LOCATION.Stage.Inst.15Minutes.0.USGS-raw"
    type="number"
    placeholder="Stage (ft)"
    precision={2}
    units="ft"
  />
  
  <CWMSInput
    name="flow-input"
    tsid="LOCATION.Flow.Inst.15Minutes.0.USGS-raw"
    type="number"
    placeholder="Flow (cfs)"
    precision={0}
    units="cfs"
  />
  
  <CWMSTextarea
    name="remarks"
    tsid="LOCATION.Remarks.Inst.1Hour.0.MANUAL"
    placeholder="Enter remarks"
    rows={4}
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Shared Nearest-Value Loading" className="mt-8" />
      <Text className="mb-4">
        When inputs opt into <Code>loadNearest</Code>, the fetching is handled by the
        form, not by each input. Every input registers the series and time offsets it
        needs, and CWMSForm issues one request per distinct time series and unit -
        however many inputs asked for it. Two tables that both reference the same TSID
        share a single request rather than each issuing their own.
      </Text>
      <Text className="mb-4">
        The shared fetch window covers the union of every registered time offset, and is
        trimmed to what the registered strategies need: if every input uses{" "}
        <Code>prev</Code>, no future data is requested. Each input still resolves its
        own <Code>prev</Code> / <Code>next</Code> / <Code>nearest</Code> strategy
        against the shared result, so inputs with different strategies do not cost extra
        requests.
      </Text>
      <Text className="mb-4">
        This requires an <Code>office</Code> on the form. Outside a CWMSForm, or when
        you want to fetch independently, the standalone{" "}
        <Code>useLoadNearestValues</Code> hook does the same resolution for a single
        caller.
      </Text>

      <div className="font-bold text-lg pt-4">How far back to look</div>
      <Text className="mb-4">
        By default the form searches one day either side of its calendar time. That
        suits anything reporting hourly, but a site that reports weekly - or a gate that
        has not moved in days - has nothing inside a one-day window, and the field stays
        empty. Set <Code>lookback</Code> to the number of days the slowest series at
        your site can go between readings.
      </Text>
      <CodeBlock language="jsx">
        {`{/* Search a week back for every input on this form */}
<CWMSForm office="SWT" lookback={7}>
  <CWMSInputTable columns={columns} timeoffsets={[0]} loadNearest="prev" />
</CWMSForm>`}
      </CodeBlock>
      <Text className="my-4">
        The setting cascades: the form sets the default, an individual input or table
        can override it, and a single column can override that again. Lookback belongs
        to a series rather than a cell, so it is a column-level setting - every row of a
        column shares one fetch window. When two components ask for the same series over
        different windows they still share one request, taken over the wider of the two.
      </Text>
      <CodeBlock language="jsx">
        {`<CWMSForm office="SWT" lookback={2}>
  <CWMSInputTable
    loadNearest="prev"
    timeoffsets={[0]}
    columns={[
      { tsid: "PROJ.Elev.Inst.15Minutes.0.Ccp-Rev", label: "Pool" },
      // This gage only reports weekly.
      { tsid: "PROJ.Precip.Total.~1Day.1Day.Ccp-Rev", label: "Precip", lookback: 10 },
    ]}
  />
</CWMSForm>`}
      </CodeBlock>
      <Text className="my-4">
        If a series has no data anywhere in the window, the form makes one more attempt:
        it asks CDA for that series&apos; most recent value and, when the series ended
        before the window began, re-reads around it. That covers &quot;this gate has not
        moved in months&quot; without making every form pay for a wide window. It
        deliberately will not reach <i>forward</i> to a value newer than the time you
        picked - a reading from after the operator&apos;s date is not a previous value.
        Reaching across a gap in the middle of a series is what <Code>lookback</Code> is
        for.
      </Text>

      <div className="font-bold text-lg pt-4">When loading fails</div>
      <Text className="mb-4">
        A failed or timed-out fetch leaves the fields empty, which looks exactly like a
        series having no data - an operator could reasonably read a blank cell as real.
        Pass <Code>onLoadError</Code> to be told when that happens and surface it
        however suits your app.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm
  office="SWT"
  onLoadError={(error) => {
    console.error("Could not load previous values", error);
    showBanner("Previous values are unavailable - enter readings manually.");
  }}
>
  {/* ... */}
</CWMSForm>`}
      </CodeBlock>

      <div className="font-bold text-lg pt-4">After a submit</div>
      <Text className="mb-4">
        Submitting invalidates the queries for the time series that were written, so the
        form re-reads them. CDA caches time series responses for several minutes, which
        means that read can come back with the value as it was <em>before</em> the
        submission - the operator would watch their entry revert to the old number.
      </Text>
      <Text className="mb-4">
        To avoid that, the form keeps the values it just wrote and shows them in place
        of the cached response, until CDA reports the same value back and the local copy
        is dropped. This needs no configuration. Be aware that what you see immediately
        after submitting is what the form sent, not a confirmed read-back - the
        displayed value only reflects a genuine server read once CDA&apos;s cache has
        expired.
      </Text>

      <Divider text="Controlling Form Reset Behavior" className="mt-8" />
      <Text className="mb-4">
        By default, forms automatically reset all fields after successful submission.
        You can disable this behavior using the <Code>resetOnSubmit</Code> prop, which
        is useful for continuous data entry scenarios.
      </Text>

      <CodeBlock language="jsx">
        {`// Form that keeps values after submission (useful for repeated entries)
<CWMSForm
  office="SWT"
  resetOnSubmit={false}  // Keep form values after submission
  showCalendar={true}
  calendarInterval="15minutes"
>
  <CWMSInput
    name="stage"
    tsid="LOCATION.Stage.Inst.15Minutes.0.USGS"
    placeholder="Stage reading"
    type="number"
  />

  <CWMSInput
    name="flow"
    tsid="LOCATION.Flow.Inst.15Minutes.0.USGS"
    placeholder="Flow reading"
    type="number"
  />
</CWMSForm>

// Default behavior - form resets after submission
<CWMSForm
  office="SWT"
  // resetOnSubmit={true} is the default
>
  {/* Form inputs */}
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Toast Notification Settings" className="mt-8" />
      <Text className="mb-4">
        Control how long toast notifications stay visible using the{" "}
        <Code>toastAutoClose</Code> prop. Set to <Code>false</Code> to keep toasts
        visible until manually dismissed, or specify a custom duration in milliseconds.
      </Text>

      <CodeBlock language="jsx">
        {`// Keep toasts visible until user dismisses them
<CWMSForm
  office="SWT"
  toastAutoClose={false}  // Toasts won't auto-close
>
  {/* Form inputs */}
</CWMSForm>

// Custom toast duration (10 seconds)
<CWMSForm
  office="SWT"
  toastAutoClose={10000}  // 10 second auto-close
>
  {/* Form inputs */}
</CWMSForm>

// Default behavior (5 seconds)
<CWMSForm
  office="SWT"
  // toastAutoClose={5000} is the default
>
  {/* Form inputs */}
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Required Field Validation" className="mt-8" />
      <Text className="mb-4">
        Form components support required field validation to ensure critical data is not
        missing. When a required field is empty during submission, the form will display
        an alert and highlight the invalid fields.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm 
  office="SWT"
  cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
>
  <CWMSInput
    name="stage"
    tsid="LOCATION.Stage.Inst.15Minutes.0.USGS"
    placeholder="Enter stage value *"
    type="number"
    required={true}
    label="Stage Reading"
  />
  
  <CWMSDropdown
    name="status"
    tsid="LOCATION.Status.Inst.1Hour.0.MANUAL"
    placeholder="Select status *"
    options={["Normal", "Alert", "Flood"]}
    required={true}
    label="Operational Status"
  />
  
  <CWMSTextarea
    name="notes"
    tsid="LOCATION.Notes.Inst.1Hour.0.MANUAL"
    placeholder="Optional notes"
    required={false}
    label="Observation Notes"
  />
  
  {/* Table with selective required columns */}
  <CWMSInputTable
    tsids={["Stage", "Flow", "Temp"]}
    timeoffsets={[0, 3600]}
    required={false}  // Global default
    perColumnRequired={{
      "Stage": true,   // Stage is required
      "Flow": true,    // Flow is required
      "Temp": false    // Temperature is optional
    }}
  />
</CWMSForm>`}
      </CodeBlock>

      <Text className="mb-4 mt-4">
        <strong>Validation Features:</strong>
      </Text>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Required fields are validated on form submission</li>
        <li>Empty required fields trigger an alert with field names</li>
        <li>Invalid fields are visually highlighted with red borders</li>
        <li>Invalid state clears automatically when user enters data</li>
        <li>Labels are used in error messages for clarity</li>
      </ul>

      <Text className="mb-4">
        <strong>Supported Props:</strong>
      </Text>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          <Code>required</Code> - Makes the field required (boolean)
        </li>
        <li>
          <Code>label</Code> - Display name used in error messages
        </li>
        <li>
          <Code>perColumnRequired</Code> - For CWMSInputTable, set required per column
        </li>
      </ul>

      <Divider text="Custom Submit Handler" className="mt-8" />
      <Text className="mb-4">
        You can provide a custom submit handler to process form data before or instead
        of sending to CWMS.
      </Text>

      <CodeBlock language="jsx">
        {`function MyForm() {
  const [submittedData, setSubmittedData] = useState(null);
  
  const handleSubmit = async (formData, event) => {
    console.log("Form data:", formData);
    
    // Custom validation
    if (!formData[0]?.values?.length) {
      alert("Please enter at least one value");
      return;
    }
    
    // Custom processing
    const processedData = formData.map(item => ({
      ...item,
      timestamp: new Date().toISOString(),
      user: "current-user"
    }));
    
    // Send to custom endpoint or process locally
    setSubmittedData(processedData);
    
    // Optionally still send to CWMS by not preventing default
  };
  
  const handleReset = () => {
    console.log("Form was reset");
    setSubmittedData(null);
  };
  
  return (
    <CWMSForm 
      office="SWT"
      onSubmit={handleSubmit}
      onReset={handleReset}
      submitText="Save Data"
      resetText="Clear Form"
    >
      <CWMSInput name="value" type="number" />
    </CWMSForm>
  );
}`}
      </CodeBlock>

      <Divider text="Without Buttons" className="mt-8" />
      <Text className="mb-4">
        You can hide the default buttons and provide your own submit mechanism.
      </Text>

      <CodeBlock language="jsx">
        {`<CWMSForm 
  office="SWT"
  showButtons={false}
>
  <CWMSInput name="value" type="number" />
  
  {/* Custom buttons or submit logic */}
  <div className="flex gap-2 mt-4">
    <button type="submit" className="custom-submit-btn">
      Custom Submit
    </button>
    <button type="reset" className="custom-reset-btn">
      Custom Reset
    </button>
  </div>
</CWMSForm>`}
      </CodeBlock>

      <Divider text="With Custom Styling" className="mt-8" />
      <Text className="mb-4">
        The CWMSForm accepts className and style props for custom styling.
      </Text>

      <CWMSForm
        office="SWT"
        className="bg-gray-50 p-8 rounded-lg shadow-md"
        onSubmit={(data) => console.log("Styled form submitted:", data)}
      >
        <CWMSInput name="styled-input" placeholder="Enter a value" />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`<CWMSForm
  office="SWT"
  className="bg-gray-50 p-8 rounded-lg shadow-md"
>
  <CWMSInput
    name="styled-input"
    placeholder="Enter a value"
  />
</CWMSForm>`}
      </CodeBlock>

      <Divider text="Complex Form Example" className="mt-8" />
      <Text className="mb-4">
        A complete example showing multiple input types working together.
      </Text>

      <CodeBlock language="jsx">
        {`import { useState } from "react";
import { 
  CWMSForm, 
  CWMSInput, 
  CWMSTextarea, 
  CWMSDropdown,
  CWMSCheckboxes,
  CWMSSpreadsheet 
} from "@usace-watermanagement/groundwork-water";

function DataEntryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Process form data
      console.log("Submitting data:", formData);
      
      // Show success message
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit data");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <CWMSForm 
      office="SWT"
      cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
      onSubmit={handleSubmit}
      submitText={isSubmitting ? "Submitting..." : "Submit Data"}
    >
      <h3>Dam Safety Inspection</h3>
      
      <CWMSInput
        name="inspector"
        placeholder="Inspector Name"
        tsid="DAM.Inspector.Inst.0.0.MANUAL"
      />
      
      <CWMSInput
        name="date"
        type="date"
        tsid="DAM.InspectionDate.Inst.0.0.MANUAL"
      />
      
      <CWMSCheckboxes
        legend="Equipment Checked"
        content={[
          { 
            id: "gates", 
            label: "Gates", 
            tsid: "DAM.Gates.Inst.0.0.STATUS",
            defaultChecked: false 
          },
          { 
            id: "spillway", 
            label: "Spillway", 
            tsid: "DAM.Spillway.Inst.0.0.STATUS",
            defaultChecked: false 
          },
          { 
            id: "instruments", 
            label: "Instruments", 
            tsid: "DAM.Instruments.Inst.0.0.STATUS",
            defaultChecked: false 
          },
        ]}
      />
      
      <CWMSDropdown
        name="overall-condition"
        placeholder="Select overall condition"
        options={["Good", "Fair", "Poor", "Critical"]}
        tsid="DAM.Condition.Inst.0.0.MANUAL"
      />
      
      <CWMSSpreadsheet
        columns={[
          { key: "location", label: "Location" },
          { key: "reading", label: "Reading", type: "number" },
          { key: "units", label: "Units" },
        ]}
        rows={5}
        tsid="DAM.Readings.Inst.0.0.TABLE"
      />
      
      <CWMSTextarea
        name="notes"
        placeholder="Additional notes and observations"
        rows={5}
        tsid="DAM.Notes.Inst.0.0.MANUAL"
      />
    </CWMSForm>
  );
}`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CWMSForm />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />

      <Divider text="Form Data Structure" className="mt-8" />
      <Text className="mb-4">
        The formData passed to onSubmit is an array of objects, one for each registered
        input:
      </Text>

      <CodeBlock language="javascript">
        {`// Structure of formData array passed to onSubmit
[
  {
    tsid: "LOCATION.Stage.Inst.0.0.USGS-raw",
    values: [123.45],
    units: "ft",
    precision: 2,
    offset: 0,
    order: 1
  },
  {
    tsid: "LOCATION.Flow.Inst.0.0.USGS-raw",
    values: [5000],
    units: "cfs",
    precision: 0,
    offset: 0,
    order: 1
  }
]`}
      </CodeBlock>

      <Divider text="Authentication Setup" className="mt-8" />
      <Text className="mb-4">
        For production CWMS submissions, you'll need to set up authentication. Here's
        how:
      </Text>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
        <Text className="text-sm">
          <strong>Authentication Options:</strong> CWMS form submissions require
          authentication. You can use:
        </Text>
        <ul className="list-disc ml-6 mt-2 text-sm">
          <li>OAuth redirect flow using createCwmsLoginAuthMethod</li>
          <li>Keycloak or other SSO providers for enterprise authentication</li>
          <li>Basic Auth headers for testing environments</li>
        </ul>
      </div>

      <CodeBlock language="jsx">
        {`import { AuthProvider, createCwmsLoginAuthMethod } from "@usace-watermanagement/groundwork-water";

// Wrap your app with AuthProvider
function App() {
  const cwmsAuthMethod = createCwmsLoginAuthMethod({
    authUrl: "https://cwms-data.usace.army.mil/cwms-data/auth",
    authCheckUrl: "https://cwms-data.usace.army.mil/cwms-data/auth/keys",
  });
  
  return (
    <AuthProvider method={cwmsAuthMethod}>
      {/* Your app components */}
      <YourFormComponent />
    </AuthProvider>
  );
}

// In your form component, use the auth context
function YourFormComponent() {
  const auth = useAuth();
  
  if (!auth.isAuth) {
    return <button onClick={() => auth.login()}>Login to CWMS</button>;
  }
  
  return (
    <CWMSForm 
      office="SWT"
      cdaUrl="https://cwms-data.usace.army.mil/cwms-data"
    >
      {/* Your form inputs */}
    </CWMSForm>
  );
}`}
      </CodeBlock>

      <Divider text="Best Practices" className="mt-8" />
      <ul className="list-disc ml-6 space-y-2">
        <li>
          Always provide an <Code>office</Code> prop - it's required for CWMS
          submissions
        </li>
        <li>
          Use <Code>cdaUrl</Code> if not using a global CdaUrlProvider
        </li>
        <li>
          Associate inputs with <Code>tsid</Code> for automatic CWMS integration
        </li>
        <li>
          Provide custom <Code>onSubmit</Code> for validation or preprocessing
        </li>
        <li>
          Use <Code>showButtons={false}</Code> when integrating with existing forms
        </li>
        <li>The form automatically prevents double submissions during processing</li>
        <li>
          All CWMS input components automatically register with the CWMSForm context
        </li>
        <li>
          For production use, always wrap your app with <Code>AuthProvider</Code> for
          secure CWMS submissions
        </li>
      </ul>
    </DocsPage>
  );
}

export { CWMSFormDocs };
export default CWMSFormDocs;
