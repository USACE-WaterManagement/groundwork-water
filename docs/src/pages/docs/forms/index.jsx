import { Text } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

function FormsDocs() {
  return (
    <DocsPage middleText="Forms">
      <div>
        <Text>
          The Forms section provides components for building data entry forms that integrate
          with the CWMS Data API. These components handle data collection, validation, and
          submission to CWMS time series.
        </Text>
      </div>

      <Divider text="Getting Started" className="mt-8" />
      <Text className="mb-4">
        Start with the <strong>FormWrapper</strong> component to create a form container, then add any of the 
        CWMS input components for data collection. The FormWrapper handles all the CWMS integration
        automatically.
      </Text>

      <Divider text="Available Components" className="mt-8" />
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>FormWrapper</strong> - Container component that provides form context and CWMS submission</li>
        <li><strong>CWMSInput</strong> - Standard text and number input field</li>
        <li><strong>CWMSTextarea</strong> - Multi-line text input</li>
        <li><strong>CWMSCheckboxes</strong> - Multiple selection checkboxes</li>
        <li><strong>CWMSDropdown</strong> - Single selection dropdown</li>
        <li><strong>CWMSInputTable</strong> - Matrix of inputs for time series data</li>
        <li><strong>CWMSSpreadsheet</strong> - Excel-like spreadsheet with copy/paste support</li>
      </ul>

      <Text className="mt-6">
        Navigate through the Forms menu to explore each component's documentation, examples, and API reference.
      </Text>
    </DocsPage>
  );
}

export { FormsDocs };
export default FormsDocs;