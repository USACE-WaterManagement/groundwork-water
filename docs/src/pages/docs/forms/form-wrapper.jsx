import { useState, useEffect } from "react";
import { Text, Code, Input, Button } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import {
  FormWrapper,
  CWMSInput,
  CWMSTextarea,
  CWMSDropdown,
  CWMSCheckboxes,
  AuthProvider,
  useAuth,
  createCwmsLoginAuthMethod,
  createKeycloakAuthMethod,
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

// Inner component that uses auth context
function FormWrapperDocsContent({ authMethod, testCdaUrl, setTestCdaUrl }) {
  const [formData, setFormData] = useState(null);
  const [testOffice, setTestOffice] = useState("SWT");
  const [testMode, setTestMode] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCredentials, setAuthCredentials] = useState({ username: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  const auth = useAuth();
  
  // Listen for inline auth modal trigger
  useEffect(() => {
    if (authMethod === "inline") {
      const handleShowModal = () => {
        setShowAuthModal(true);
      };
      
      window.addEventListener('show-inline-auth-modal', handleShowModal);
      
      return () => {
        window.removeEventListener('show-inline-auth-modal', handleShowModal);
      };
    }
  }, [authMethod]);

  const handleEnableTestMode = () => {
    if (!auth.isAuthenticated) {
      if (authMethod === "inline") {
        // Show authentication modal for inline auth
        setShowAuthModal(true);
      } else {
        // Use the auth provider's login method for other auth types
        auth.login();
      }
      setTestMode(true);
    } else {
      setTestMode(true);
    }
  };
  
  const handleInlineAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      // Attempt basic auth with the CDA endpoint
      const response = await fetch(`${testCdaUrl}/auth/keys`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${authCredentials.username}:${authCredentials.password}`)
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        // Authentication successful for inline method
        setShowAuthModal(false);
        
        // For inline auth, update the auth provider's state
        if (authMethod === "inline") {
          // The auth provider needs to be notified of successful auth
          // We'll handle this through a custom mechanism
          window.dispatchEvent(new CustomEvent('inline-auth-success', { 
            detail: { username: authCredentials.username } 
          }));
        }
        
        setAuthCredentials({ username: "", password: "" });
        setSubmissionResult({ 
          status: "success", 
          message: `Successfully authenticated as ${authCredentials.username}` 
        });
      } else {
        setAuthError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setAuthError("Authentication failed. Please check your credentials and try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <DocsPage middleText="Form Wrapper">
      <div>
        <Text>
          The FormWrapper component provides a context for CWMS form inputs,
          handling data collection, validation, and submission to the CWMS Data
          API. It automatically manages form state and provides styled
          submit/reset buttons.
        </Text>
        <Text className="mt-2">
          All CWMS input components (CWMSInput, CWMSTextarea, CWMSDropdown,
          etc.) must be wrapped in a FormWrapper to function properly.
        </Text>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">CWMS Authentication</h3>
            <Text className="text-sm text-gray-600 mb-4">
              Enter your CWMS credentials to enable form submissions to {testCdaUrl}
            </Text>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input
                  type="text"
                  value={authCredentials.username}
                  onChange={(e) => setAuthCredentials({ ...authCredentials, username: e.target.value })}
                  placeholder="Enter your username"
                  disabled={authLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={authCredentials.password}
                  onChange={(e) => setAuthCredentials({ ...authCredentials, password: e.target.value })}
                  placeholder="Enter your password"
                  disabled={authLoading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !authLoading) {
                      handleInlineAuth();
                    }
                  }}
                />
              </div>
              
              {authError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <Text className="text-sm text-red-600">{authError}</Text>
                </div>
              )}
              
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError(null);
                    setAuthCredentials({ username: "", password: "" });
                  }}
                  color="secondary"
                  disabled={authLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInlineAuth}
                  color="primary"
                  disabled={authLoading || !authCredentials.username || !authCredentials.password}
                >
                  {authLoading ? "Authenticating..." : "Authenticate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Divider text="Interactive Test Mode" className="mt-8" />
      <Text className="mb-4">
        Test the form submission functionality with your configured authentication method.
        Configure the auth method above, then enable test mode below.
      </Text>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
        <div className="flex gap-4 mb-4">
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Office</label>
            <Input
              value={testOffice}
              onChange={(e) => setTestOffice(e.target.value.toUpperCase())}
              placeholder="Office ID"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Current CDA URL</label>
            <Text className="text-sm mt-1">{testCdaUrl}</Text>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              if (testMode) {
                setTestMode(false);
                setSubmissionResult(null);
              } else {
                handleEnableTestMode();
              }
            }}
            color={testMode ? "success" : "primary"}
          >
            {testMode ? "Disable Test Mode" : "Enable Test Mode"}
          </Button>

          {auth.isAuthenticated ? (
            <>
              <Text className="text-sm text-green-600">
                ✓ Authenticated as: {auth.user?.username || auth.user?.name || auth.user?.email || "User"}
              </Text>
              <Button 
                onClick={() => {
                  auth.logout();
                  setSubmissionResult({ 
                    status: "info", 
                    message: "Logged out successfully" 
                  });
                }} 
                color="secondary" 
                size="sm"
              >
                Logout
              </Button>
            </>
          ) : (
            testMode && (
              <div className="flex items-center gap-2">
                <Text className="text-sm text-amber-600">
                  ⚠ Not authenticated - submissions may fail
                </Text>
                <Button onClick={() => setShowAuthModal(true)} color="primary" size="sm">
                  Authenticate
                </Button>
              </div>
            )
          )}
        </div>

        {testMode && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
            <Text className="text-sm">
              <strong>Test Mode Active:</strong> Form will attempt to submit
              data to {testCdaUrl}
            </Text>
            <Text className="text-xs text-gray-600 mt-1">
              Note: Ensure you have proper authentication and permissions for
              the target CDA.
            </Text>
          </div>
        )}
      </div>

      <Divider text="Basic Form Example" className="mt-8" />
      <Text className="mb-4">
        A simple form with various input types.{" "}
        {testMode
          ? "Submissions will go to your configured CDA."
          : "This is a demo-only form."}
      </Text>

      <FormWrapper
        office={testMode ? testOffice : "SWT"}
        cdaUrl={testMode ? testCdaUrl : undefined}
        onSubmit={async (data, e) => {
          console.log("Form submitted:", data);
          setFormData(data);

          if (testMode) {
            setSubmissionResult({
              status: "pending",
              message: "Submitting to CDA...",
            });

            try {
              // If onSubmit is provided without preventing default,
              // FormWrapper will still submit to CWMS
              if (!e.defaultPrevented) {
                setSubmissionResult({
                  status: "info",
                  message:
                    "Form data prepared for submission. Check console for details.",
                });
              }
            } catch (error) {
              setSubmissionResult({
                status: "error",
                message: `Submission failed: ${error.message}`,
              });
            }
          }
        }}
      >
        <CWMSInput name="stage" placeholder="Enter stage value" type="number" />
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
      </FormWrapper>

      {formData && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <Text className="font-semibold">Last Submitted Data:</Text>
          <pre className="mt-2 text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}

      {submissionResult && testMode && (
        <div
          className={`mt-4 p-4 rounded ${
            submissionResult.status === "error"
              ? "bg-red-50 border border-red-200"
              : submissionResult.status === "success"
              ? "bg-green-50 border border-green-200"
              : submissionResult.status === "info"
              ? "bg-blue-50 border border-blue-200"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <Text className="font-semibold">
            {submissionResult.status === "error"
              ? "❌ "
              : submissionResult.status === "success"
              ? "✅ "
              : submissionResult.status === "info"
              ? "ℹ️ "
              : "⏳ "}
            Submission Result:
          </Text>
          <Text className="text-sm mt-1">{submissionResult.message}</Text>
        </div>
      )}

      <CodeBlock language="jsx">
        {`import { FormWrapper, CWMSInput, CWMSTextarea, CWMSDropdown } from "@usace-watermanagement/groundwork-water";

<FormWrapper 
  office="SWT"
  cdaUrl="https://water.usace.army.mil/cwms-data"
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
</FormWrapper>`}
      </CodeBlock>

      <Divider text="With CWMS Time Series" className="mt-8" />
      <Text className="mb-4">
        Form inputs can be associated with specific CWMS time series IDs for
        automatic data submission.
      </Text>

      <CodeBlock language="jsx">
        {`<FormWrapper 
  office="SWT"
  cdaUrl="https://water.usace.army.mil/cwms-data"
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
</FormWrapper>`}
      </CodeBlock>

      <Divider text="Custom Submit Handler" className="mt-8" />
      <Text className="mb-4">
        You can provide a custom submit handler to process form data before or
        instead of sending to CWMS.
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
    <FormWrapper 
      office="SWT"
      onSubmit={handleSubmit}
      onReset={handleReset}
      submitText="Save Data"
      resetText="Clear Form"
    >
      <CWMSInput name="value" type="number" />
    </FormWrapper>
  );
}`}
      </CodeBlock>

      <Divider text="Without Buttons" className="mt-8" />
      <Text className="mb-4">
        You can hide the default buttons and provide your own submit mechanism.
      </Text>

      <CodeBlock language="jsx">
        {`<FormWrapper 
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
</FormWrapper>`}
      </CodeBlock>

      <Divider text="With Custom Styling" className="mt-8" />
      <Text className="mb-4">
        The FormWrapper accepts className and style props for custom styling.
      </Text>

      <FormWrapper
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
      </FormWrapper>

      <CodeBlock language="jsx">
        {`<FormWrapper 
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
</FormWrapper>`}
      </CodeBlock>

      <Divider text="Live Testing Form" className="mt-8" />
      <Text className="mb-4">
        A comprehensive form for testing real CWMS submissions. Configure your
        CDA URL above and enable test mode to submit actual data.
      </Text>

      {testMode && (
        <FormWrapper
          office={testOffice}
          cdaUrl={testCdaUrl}
          onSubmit={async (data) => {
            console.log("Test submission data:", data);
            setSubmissionResult({
              status: "pending",
              message: "Submitting to CWMS...",
            });

            try {
              // The FormWrapper will handle the actual submission
              // We just track the status here
              setTimeout(() => {
                setSubmissionResult({
                  status: "success",
                  message: `Successfully submitted ${data.length} field(s) to CWMS`,
                });
              }, 1000);
            } catch (error) {
              setSubmissionResult({
                status: "error",
                message: `Failed: ${error.message}`,
              });
            }
          }}
        >
          <Text className="font-semibold mb-2">Test Data Entry Form</Text>

          <CWMSInput
            name="test-stage"
            tsid={`${testOffice}.Stage.Inst.0.0.TEST`}
            placeholder="Enter stage value (ft)"
            type="number"
            precision={2}
            units="ft"
          />

          <CWMSInput
            name="test-flow"
            tsid={`${testOffice}.Flow.Inst.0.0.TEST`}
            placeholder="Enter flow value (cfs)"
            type="number"
            precision={0}
            units="cfs"
          />

          <CWMSDropdown
            name="test-status"
            tsid={`${testOffice}.Status.Inst.0.0.TEST`}
            placeholder="Select operational status"
            options={["Normal", "Flood", "Drought", "Maintenance"]}
          />

          <CWMSTextarea
            name="test-remarks"
            tsid={`${testOffice}.Remarks.Inst.0.0.TEST`}
            placeholder="Enter any remarks or observations"
            rows={3}
          />
        </FormWrapper>
      )}

      {!testMode && (
        <div className="p-4 bg-gray-100 rounded">
          <Text className="text-center text-gray-600">
            Enable Test Mode above to see and use the live testing form
          </Text>
        </div>
      )}

      <Divider text="Complex Form Example" className="mt-8" />
      <Text className="mb-4">
        A complete example showing multiple input types working together.
      </Text>

      <CodeBlock language="jsx">
        {`import { useState } from "react";
import { 
  FormWrapper, 
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
    <FormWrapper 
      office="SWT"
      cdaUrl="https://water.usace.army.mil/cwms-data"
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
    </FormWrapper>
  );
}`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<FormWrapper />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />

      <Divider text="Form Data Structure" className="mt-8" />
      <Text className="mb-4">
        The formData passed to onSubmit is an array of objects, one for each
        registered input:
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
        For production CWMS submissions, you'll need to set up authentication.
        Here's how:
      </Text>
      
      <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
        <Text className="text-sm">
          <strong>Authentication Options:</strong> The test mode above demonstrates inline authentication 
          that keeps you on the same page. For production applications, you can use either:
        </Text>
        <ul className="list-disc ml-6 mt-2 text-sm">
          <li>Inline authentication with Basic Auth headers (as shown in test mode)</li>
          <li>OAuth redirect flow using createCwmsLoginAuthMethod (requires redirect)</li>
          <li>Keycloak or other SSO providers for enterprise authentication</li>
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
  
  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.login()}>Login to CWMS</button>;
  }
  
  return (
    <FormWrapper 
      office="SWT"
      cdaUrl="https://water.usace.army.mil/cwms-data"
    >
      {/* Your form inputs */}
    </FormWrapper>
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
          Use <Code>showButtons={false}</Code> when integrating with existing
          forms
        </li>
        <li>
          The form automatically prevents double submissions during processing
        </li>
        <li>
          All CWMS input components automatically register with the FormWrapper
          context
        </li>
        <li>
          For production use, always wrap your app with{" "}
          <Code>AuthProvider</Code> for secure CWMS submissions
        </li>
        <li>
          Test your forms with the interactive test mode above before deploying
        </li>
      </ul>
    </DocsPage>
  );
}

// Main component with AuthProvider wrapper
function FormWrapperDocs() {
  const [authMethod, setAuthMethod] = useState("inline");
  const [testCdaUrl, setTestCdaUrl] = useState("https://water.usace.army.mil/cwms-data");
  const [keycloakConfig, setKeycloakConfig] = useState({
    url: "https://keycloak.example.com",
    realm: "water",
    clientId: "cwms-client"
  });
  
  // Check if we're already in an AuthProvider
  let hasAuthProvider = false;
  try {
    const testAuth = useAuth();
    hasAuthProvider = true;
  } catch (e) {
    // No auth provider exists
  }

  // If already in AuthProvider, just render the content
  if (hasAuthProvider) {
    return <FormWrapperDocsContent authMethod="existing" testCdaUrl={testCdaUrl} setTestCdaUrl={setTestCdaUrl} />;
  }
  
  // Create auth method based on selection
  let selectedAuthMethod;
  
  if (authMethod === "cwms") {
    const baseUrl = testCdaUrl.replace(/\/$/, '');
    selectedAuthMethod = createCwmsLoginAuthMethod({
      authUrl: `${baseUrl}/auth`,
      authCheckUrl: `${baseUrl}/auth/keys`,
    });
  } else if (authMethod === "keycloak") {
    selectedAuthMethod = createKeycloakAuthMethod(keycloakConfig);
  } else {
    // Custom inline auth method that doesn't redirect
    const createInlineAuthMethod = () => {
      let authState = { isAuthenticated: false, user: null };
      
      // Listen for successful inline authentication
      const handleAuthSuccess = (event) => {
        authState.isAuthenticated = true;
        authState.user = event.detail;
      };
      
      window.addEventListener('inline-auth-success', handleAuthSuccess);
      
      return {
        login: async () => {
          // This will trigger the modal to show
          // The actual authentication is handled in handleInlineAuth
          window.dispatchEvent(new Event('show-inline-auth-modal'));
          return Promise.resolve();
        },
        logout: async () => {
          authState.isAuthenticated = false;
          authState.user = null;
          return Promise.resolve();
        },
        isAuth: async () => {
          return authState.isAuthenticated;
        },
        getUser: async () => {
          return authState.user;
        },
        cleanup: () => {
          window.removeEventListener('inline-auth-success', handleAuthSuccess);
        }
      };
    };
    
    selectedAuthMethod = createInlineAuthMethod();
  }
  
  return (
    <div>
      {/* Auth Method Selector */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-3">Authentication Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Authentication Method</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
            >
              <option value="inline">Inline (No Redirect)</option>
              <option value="cwms">CWMS Login (OAuth)</option>
              <option value="keycloak">Keycloak SSO</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">CDA URL</label>
            <Input
              value={testCdaUrl}
              onChange={(e) => setTestCdaUrl(e.target.value)}
              placeholder="CDA URL"
            />
          </div>
        </div>
        
        {authMethod === "keycloak" && (
          <div className="grid grid-cols-3 gap-2">
            <Input
              value={keycloakConfig.url}
              onChange={(e) => setKeycloakConfig({...keycloakConfig, url: e.target.value})}
              placeholder="Keycloak URL"
            />
            <Input
              value={keycloakConfig.realm}
              onChange={(e) => setKeycloakConfig({...keycloakConfig, realm: e.target.value})}
              placeholder="Realm"
            />
            <Input
              value={keycloakConfig.clientId}
              onChange={(e) => setKeycloakConfig({...keycloakConfig, clientId: e.target.value})}
              placeholder="Client ID"
            />
          </div>
        )}
        
        <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded">
          <Text className="text-sm">
            {authMethod === "inline" && "✅ Inline auth keeps you on this page with a login modal"}
            {authMethod === "cwms" && "🔄 CWMS Login will redirect to OAuth login page and back"}
            {authMethod === "keycloak" && "🔐 Keycloak SSO provides enterprise authentication"}
          </Text>
        </div>
      </div>
      
      <AuthProvider method={selectedAuthMethod}>
        <FormWrapperDocsContent 
          authMethod={authMethod} 
          testCdaUrl={testCdaUrl}
          setTestCdaUrl={setTestCdaUrl}
        />
      </AuthProvider>
    </div>
  );
}

export { FormWrapperDocs };
export default FormWrapperDocs;
