import { useState } from "react";
import { Text, Code } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import {
  CWMSForm,
  CWMSInput,
  CWMSTextarea,
  CWMSDropdown,
  CWMSCheckboxes,
  CWMSInputTable,
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
    desc: "Time interval for automatic snapping: 'none', 'second', 'minute', '5minutes', '15minutes', '30minutes', 'hour', or 'day'.",
  },
  {
    name: "calendarSnapTo",
    type: "string",
    default: "nearest",
    desc: "Snap direction when selecting time: 'nearest', 'previous', or 'next'.",
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
    tsid="LOCATION.Stage.Inst.0.0.USGS-raw"
    placeholder="Stage at base time"
    type="number"
    timeOffset={0}
  />
  
  <CWMSInput
    name="flow"
    tsid="LOCATION.Flow.Inst.0.0.USGS-raw"
    placeholder="Flow 15 minutes later"
    type="number"
    timeOffset={15}
  />
  
  <CWMSTextarea
    name="notes"
    tsid="LOCATION.Notes.Inst.0.0.MANUAL"
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
    tsid="LOCATION.Stage.Inst.0.0.USGS-raw"
    type="number"
    placeholder="Stage (ft)"
    precision={2}
    units="ft"
  />
  
  <CWMSInput
    name="flow-input"
    tsid="LOCATION.Flow.Inst.0.0.USGS-raw"
    type="number"
    placeholder="Flow (cfs)"
    precision={0}
    units="cfs"
  />
  
  <CWMSTextarea
    name="remarks"
    tsid="LOCATION.Remarks.Inst.0.0.MANUAL"
    placeholder="Enter remarks"
    rows={4}
  />
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
    tsid="LOCATION.Stage.Inst.0.0.USGS"
    placeholder="Enter stage value *"
    type="number"
    required={true}
    label="Stage Reading"
  />
  
  <CWMSDropdown
    name="status"
    tsid="LOCATION.Status.Inst.0.0.MANUAL"
    placeholder="Select status *"
    options={["Normal", "Alert", "Flood"]}
    required={true}
    label="Operational Status"
  />
  
  <CWMSTextarea
    name="notes"
    tsid="LOCATION.Notes.Inst.0.0.MANUAL"
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
        className="custom-form-class"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
        onSubmit={(data) => console.log("Styled form submitted:", data)}
      >
        <CWMSInput name="styled-input" placeholder="Enter a value" />
      </CWMSForm>

      <CodeBlock language="jsx">
        {`<CWMSForm 
  office="SWT"
  className="custom-form-class"
  style={{
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}
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
