import { useState, useEffect } from "react";
import { Text, Code, Input, Button } from "@usace/groundwork";
import {
  CWMSForm,
  CWMSInput,
  CWMSTextarea,
  CWMSDropdown,
  CWMSCheckboxes,
  CWMSInputTable,
  CWMSSpreadsheet,
  AuthProvider,
  useAuth,
  createCwmsLoginAuthMethod,
  createKeycloakAuthMethod,
} from "@usace-watermanagement/groundwork-water";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

// Inner component that uses auth context
function InteractiveTestContent({ authMethod, testCdaUrl, setTestCdaUrl }) {
  const [formData, setFormData] = useState(null);
  const [testOffice, setTestOffice] = useState("SWT");
  const [testMode, setTestMode] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCredentials, setAuthCredentials] = useState({
    username: "",
    password: "",
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const auth = useAuth();

  // Listen for inline auth modal trigger
  useEffect(() => {
    if (authMethod === "inline") {
      const handleShowModal = () => {
        setShowAuthModal(true);
      };

      window.addEventListener("show-inline-auth-modal", handleShowModal);

      return () => {
        window.removeEventListener("show-inline-auth-modal", handleShowModal);
      };
    }
  }, [authMethod]);

  const handleEnableTestMode = () => {
    if (!auth.isAuth) {
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
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${authCredentials.username}:${authCredentials.password}`),
        },
        credentials: "include",
      });

      if (response.ok) {
        // Authentication successful for inline method
        setShowAuthModal(false);

        // For inline auth, update the auth provider's state
        if (authMethod === "inline") {
          // The auth provider needs to be notified of successful auth
          // We'll handle this through a custom mechanism
          window.dispatchEvent(
            new CustomEvent("inline-auth-success", {
              detail: { username: authCredentials.username },
            }),
          );
        }

        setAuthCredentials({ username: "", password: "" });
        setSubmissionResult({
          status: "success",
          message: `Successfully authenticated as ${authCredentials.username}`,
        });
      } else {
        setAuthError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setAuthError(
        "Authentication failed. Please check your credentials and try again.",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <DocsPage middleText="Interactive Form Testing">
      <div>
        <Text>
          Test the CWMS form components with real data submission capabilities.
          Configure your authentication method and CDA URL, then enable test mode to
          submit actual data to your CWMS instance.
        </Text>
        <Text className="mt-2 text-amber-600">
          ⚠️ <strong>Warning:</strong> This page allows real data submission to your
          CWMS instance. Ensure you're using a test environment before submitting data.
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
                  onChange={(e) =>
                    setAuthCredentials({ ...authCredentials, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  disabled={authLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={authCredentials.password}
                  onChange={(e) =>
                    setAuthCredentials({ ...authCredentials, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  disabled={authLoading}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !authLoading) {
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
                  disabled={
                    authLoading ||
                    !authCredentials.username ||
                    !authCredentials.password
                  }
                >
                  {authLoading ? "Authenticating..." : "Authenticate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Divider text="Test Configuration" className="mt-8" />
      <Text className="mb-4">
        Configure your test environment settings below. Select your authentication
        method and set the target CDA URL.
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

          {auth.isAuth ? (
            <>
              <Text className="text-sm text-green-600">
                ✓ Authenticated successfully
              </Text>
              <Button
                onClick={() => {
                  auth.logout();
                  setSubmissionResult({
                    status: "info",
                    message: "Logged out successfully",
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
                <Button
                  onClick={() => setShowAuthModal(true)}
                  color="primary"
                  size="sm"
                >
                  Authenticate
                </Button>
              </div>
            )
          )}
        </div>

        {testMode && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
            <Text className="text-sm">
              <strong>Test Mode Active:</strong> Form will attempt to submit data to{" "}
              {testCdaUrl}
            </Text>
            <Text className="text-xs text-gray-600 mt-1">
              Note: Ensure you have proper authentication and permissions for the target
              CDA.
            </Text>
          </div>
        )}
      </div>

      <Divider text="Comprehensive Test Form" className="mt-8" />
      <Text className="mb-4">
        A complete form demonstrating all available CWMS input components. Enable test
        mode above to submit real data to your configured CWMS instance.
      </Text>

      {testMode && (
        <CWMSForm
          office={testOffice}
          cdaUrl={testCdaUrl}
          showCalendar={true}
          calendarInterval="hour"
          calendarSnapTo="nearest"
          onSubmit={async (data, e) => {
            console.log("Form submitted with data:", data);
            setFormData(data);
            setSubmissionResult({
              status: "pending",
              message: "Submitting to CWMS...",
            });

            try {
              // CWMSForm handles the actual submission
              if (!e.defaultPrevented) {
                setSubmissionResult({
                  status: "success",
                  message: "Data submitted successfully to CWMS",
                });
              }
            } catch (error) {
              setSubmissionResult({
                status: "error",
                message: `Submission failed: ${error.message}`,
              });
            }
          }}
        >
          <Text className="font-semibold mb-2">
            Individual Input Components (Hourly Intervals)
          </Text>

          <CWMSInput
            name="test-stage"
            tsid={`pytest-loc.Stage.Inst.0.0.TEST`}
            placeholder="Enter stage value (ft) *"
            type="number"
            precision={2}
            units="ft"
            required={true}
            label="Stage Reading"
          />

          <CWMSInput
            name="test-flow"
            tsid={`pytest-loc.Flow.Inst.0.0.TEST`}
            placeholder="Enter flow value (cfs) *"
            type="number"
            precision={0}
            units="cfs"
            required={true}
            label="Flow Measurement"
          />

          <CWMSDropdown
            name="test-status"
            tsid={`pytest-loc.Code.Inst.0.0.TEST`}
            placeholder="Select operational status *"
            options={["Normal", "Flood", "Drought", "Maintenance"]}
            required={true}
            label="Operational Status"
          />

          <CWMSCheckboxes
            legend="Equipment Status"
            content={[
              {
                id: "gates-operational",
                label: "Gates Operational",
                tsid: "pytest-loc.Code.Inst.0.0.Gates",
                defaultChecked: false,
              },
              {
                id: "spillway-clear",
                label: "Spillway Clear",
                tsid: "pytest-loc.Code.Inst.0.0.Spillway",
                defaultChecked: false,
              },
              {
                id: "instruments-calibrated",
                label: "Instruments Calibrated",
                tsid: "pytest-loc.Code.Inst.0.0.Instruments",
                defaultChecked: false,
              },
            ]}
          />

          <CWMSTextarea
            name="test-remarks"
            tsid={`pytest-loc.Code.Inst.0.0.TEST2`}
            placeholder="Enter any remarks or observations (optional)"
            rows={3}
            required={false}
            label="Remarks"
          />

          <Text className="font-semibold mb-2 mt-4">
            Bulk Data Entry Table (Metric Units)
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            * Stage and Flow columns are required
          </Text>
          <CWMSInputTable
            columns={[
              {
                tsid: `pytest-loc.Stage.Inst.0.0.TABLE-TEST`,
                label: "Stage",
                units: "m",
                precision: 2,
                required: true,
                defaultValues: {
                  0: "198.12",
                },
              },
              {
                tsid: `pytest-loc.Flow.Inst.0.0.TABLE-TEST`,
                label: "Flow",
                units: "cms",
                precision: 2,
                required: true,
                defaultValues: {
                  0: "35.40",
                },
              },
              {
                tsid: `pytest-loc.Temp.Inst.0.0.TABLE-TEST`,
                label: "Temperature",
                units: "C",
                precision: 2,
                required: false,
                defaultValues: {
                  0: "22.5",
                },
              },
            ]}
            timeoffsets={[0, 3600, 7200]}
            showTimestamps={true}
          />
        </CWMSForm>
      )}

      {!testMode && (
        <div className="p-4 bg-gray-100 rounded">
          <Text className="text-center text-gray-600">
            Enable Test Mode above to see and use the interactive testing form
          </Text>
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

      <Divider text="Simple Test Form" className="mt-8" />
      <Text className="mb-4">
        A basic form with time offsets for testing different submission timestamps.
      </Text>

      <CWMSForm
        office={testMode ? testOffice : "SWT"}
        cdaUrl={testMode ? testCdaUrl : undefined}
        showCalendar={true}
        calendarLabel="Data Collection Time"
        calendarInterval="15minutes"
        calendarSnapTo="nearest"
        onSubmit={async (data, e) => {
          console.log("Simple form submitted:", data);
        }}
      >
        <CWMSInput
          name="stage"
          placeholder="Enter stage value"
          type="number"
          timeOffset={0}
          label="Stage (at base time)"
        />
        <CWMSTextarea
          name="notes"
          placeholder="Enter observation notes (5 minutes after base time)"
          rows={3}
          timeOffset={5}
          label="Notes"
        />
        <CWMSDropdown
          name="gate-position"
          placeholder="Select gate position (10 minutes after base time)"
          options={["Closed", "25% Open", "50% Open", "75% Open", "Fully Open"]}
          timeOffset={10}
          label="Gate Position"
        />
      </CWMSForm>

      <Divider text="Spreadsheet Data Entry" className="mt-8" />
      <Text className="mb-4">
        Use the spreadsheet component for bulk data entry with a familiar Excel-like
        interface. Copy and paste data directly from spreadsheets.
      </Text>

      {testMode ? (
        <CWMSForm
          office={testOffice}
          cdaUrl={testCdaUrl}
          showCalendar={true}
          calendarInterval="hour"
          calendarSnapTo="nearest"
          onSubmit={async (data, e) => {
            console.log("Spreadsheet form submitted:", data);
            setFormData(data);
            setSubmissionResult({
              status: "pending",
              message: "Submitting spreadsheet data to CWMS...",
            });

            try {
              if (!e.defaultPrevented) {
                setSubmissionResult({
                  status: "success",
                  message: "Spreadsheet data submitted successfully to CWMS",
                });
              }
            } catch (error) {
              setSubmissionResult({
                status: "error",
                message: `Submission failed: ${error.message}`,
              });
            }
          }}
        >
          <Text className="font-semibold mb-2">Time Series Data Entry Spreadsheet</Text>
          <Text className="text-sm text-gray-600 mb-2">
            Enter hourly data readings. Each row represents a different time offset from
            the base time. The time column shows when each reading will be recorded.
          </Text>

          <CWMSSpreadsheet
            columns={[
              {
                label: "Stage (ft)",
                type: "number",
                placeholder: "0.00",
                tsid: "pytest-loc.Stage.Inst.0.0.SPREADSHEET",
                precision: 2,
                units: "ft",
              },
              {
                label: "Flow (cfs)",
                type: "number",
                placeholder: "0",
                tsid: "pytest-loc.Flow.Inst.0.0.SPREADSHEET",
                precision: 0,
                units: "cfs",
              },
              {
                label: "Temp (°F)",
                type: "number",
                placeholder: "0.0",
                tsid: "pytest-loc.Temp.Inst.0.0.SPREADSHEET",
                precision: 1,
                units: "F",
              },
              {
                label: "Quality",
                type: "text",
                placeholder: "Good/Fair/Poor",
                tsid: "pytest-loc.Code.Inst.0.0.SPREADSHEET_Quality",
              },
              {
                label: "Notes",
                type: "text",
                placeholder: "Optional notes",
                tsid: "pytest-loc.Code.Inst.0.0.SPREADSHEET_Notes",
              },
            ]}
            rows={3}
            showRowNumbers={true}
            showColumnHeaders={true}
            timeoffsets={[0, 3600, 7200]}
            defaultData={[
              ["650.25", "1250", "72.5", "Good", "Normal operations"],
              ["648.10", "980", "71.8", "Good", "Slight increase"],
              ["647.85", "920", "71.2", "Fair", "Decreasing trend"],
            ]}
          />

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <Text className="text-sm font-semibold">
              Tips for using the spreadsheet:
            </Text>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>
                The Time column appears automatically when timeoffsets are provided
              </li>
              <li>Time values show when each reading will be recorded (read-only)</li>
              <li>Each row is a different time offset: 0hr, 1hr, 2hr</li>
              <li>Each column can have its own units, precision, and TSID</li>
              <li>Click any data cell to edit directly</li>
              <li>Use Tab/Enter to navigate between cells</li>
              <li>Copy data from Excel and paste using Ctrl+V</li>
              <li>Empty cells will not be submitted to CWMS</li>
            </ul>
          </div>
        </CWMSForm>
      ) : (
        <div className="p-4 bg-gray-100 rounded">
          <Text className="text-center text-gray-600">
            Enable Test Mode above to see and use the spreadsheet data entry form
          </Text>
        </div>
      )}

      <Divider text="Testing Tips" className="mt-8" />
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Start with a test environment:</strong> Always use a development or
          test CWMS instance first
        </li>
        <li>
          <strong>Verify authentication:</strong> Ensure you're authenticated before
          attempting submissions
        </li>
        <li>
          <strong>Check TSIDs:</strong> Make sure your time series IDs exist in your
          CWMS instance
        </li>
        <li>
          <strong>Monitor console:</strong> Open browser dev tools to see detailed
          submission data
        </li>
        <li>
          <strong>Test validation:</strong> Try submitting with empty required fields to
          test validation
        </li>
        <li>
          <strong>Check units:</strong> Ensure your units match the CWMS configuration
          (EN/SI)
        </li>
      </ul>

      <Divider text="Common Test Scenarios" className="mt-8" />
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded">
          <Text className="font-semibold">1. Basic Data Entry</Text>
          <Text className="text-sm mt-1">
            Test single value submissions with CWMSInput for stage, flow, or temperature
            readings.
          </Text>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <Text className="font-semibold">2. Bulk Data Import</Text>
          <Text className="text-sm mt-1">
            Use CWMSInputTable or CWMSSpreadsheet to test batch data entry with
            copy/paste from Excel.
          </Text>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <Text className="font-semibold">3. Time-Offset Data</Text>
          <Text className="text-sm mt-1">
            Test submissions with different timestamps using the timeOffset property on
            inputs.
          </Text>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <Text className="font-semibold">4. Validation Testing</Text>
          <Text className="text-sm mt-1">
            Verify required field validation by attempting to submit incomplete forms.
          </Text>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <Text className="font-semibold">5. Unit Conversion</Text>
          <Text className="text-sm mt-1">
            Test metric (SI) vs English (EN) unit submissions and conversions.
          </Text>
        </div>
      </div>
    </DocsPage>
  );
}

// Main component with AuthProvider wrapper
function InteractiveFormTest() {
  const [authMethod, setAuthMethod] = useState("keycloak");
  const [testCdaUrl, setTestCdaUrl] = useState("http://localhost:8081/cwms-data");
  const [keycloakConfig, setKeycloakConfig] = useState({
    host: "http://localhost:8081/auth",
    realm: "cwms",
    client: "cwms",
    flow: "direct-grant",
    password: "m5hectest",
    username: "m5hectest",
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
    return (
      <InteractiveTestContent
        authMethod="existing"
        testCdaUrl={testCdaUrl}
        setTestCdaUrl={setTestCdaUrl}
      />
    );
  }

  // Create auth method based on selection
  let selectedAuthMethod;

  if (authMethod === "cwms") {
    const baseUrl = testCdaUrl.replace(/\/$/, "");
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

      window.addEventListener("inline-auth-success", handleAuthSuccess);

      return {
        login: async () => {
          // This will trigger the modal to show
          // The actual authentication is handled in handleInlineAuth
          window.dispatchEvent(new Event("show-inline-auth-modal"));
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
          window.removeEventListener("inline-auth-success", handleAuthSuccess);
        },
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
            <label className="block text-sm font-medium mb-1">
              Authentication Method
            </label>
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
              value={keycloakConfig.host}
              onChange={(e) =>
                setKeycloakConfig({ ...keycloakConfig, host: e.target.value })
              }
              placeholder="Keycloak URL"
            />
            <Input
              value={keycloakConfig.realm}
              onChange={(e) =>
                setKeycloakConfig({ ...keycloakConfig, realm: e.target.value })
              }
              placeholder="Realm"
            />
            <Input
              value={keycloakConfig.client}
              onChange={(e) =>
                setKeycloakConfig({ ...keycloakConfig, client: e.target.value })
              }
              placeholder="Client ID"
            />
          </div>
        )}

        <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded">
          <Text className="text-sm">
            {authMethod === "inline" &&
              "✅ Inline auth keeps you on this page with a login modal"}
            {authMethod === "cwms" &&
              "🔄 CWMS Login will redirect to OAuth login page and back"}
            {authMethod === "keycloak" &&
              "🔐 Keycloak SSO provides enterprise authentication"}
          </Text>
        </div>
      </div>

      <AuthProvider method={selectedAuthMethod}>
        <InteractiveTestContent
          authMethod={authMethod}
          testCdaUrl={testCdaUrl}
          setTestCdaUrl={setTestCdaUrl}
        />
      </AuthProvider>
    </div>
  );
}

export { InteractiveFormTest };
export default InteractiveFormTest;
