import { Text } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const BASE_URL = import.meta.env.BASE_URL;

function FormsDocs() {
  return (
    <DocsPage middleText="Forms">
      <div>
        <Text>
          The Forms section provides components for building data entry forms that
          integrate with the CWMS Data API. These components handle data collection,
          validation, and submission to CWMS time series.
        </Text>
      </div>

      <Divider text="Getting Started" className="mt-8" />
      <Text className="mb-4">
        Start with the{" "}
        <a
          href={`${BASE_URL}#/docs/forms/cwms-form`}
          className="text-blue-600 hover:underline font-semibold"
        >
          CWMSForm
        </a>{" "}
        component to create a form container, then add any of the CWMS input components
        for data collection. The CWMSForm handles all the CWMS integration
        automatically.
      </Text>

      <Divider text="Available Components" className="mt-8" />
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-form`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSForm
          </a>{" "}
          - Container component that provides form context and CWMS submission
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-input`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSInput
          </a>{" "}
          - Standard text and number input field
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-textarea`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSTextarea
          </a>{" "}
          - Multi-line text input
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-checkboxes`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSCheckboxes
          </a>{" "}
          - Multiple selection checkboxes
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-dropdown`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSDropdown
          </a>{" "}
          - Single selection dropdown
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-input-table`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSInputTable
          </a>{" "}
          - Matrix of inputs for time series data
        </li>
        <li>
          <a
            href={`${BASE_URL}#/docs/forms/cwms-spreadsheet`}
            className="text-blue-600 hover:underline font-semibold"
          >
            CWMSSpreadsheet
          </a>{" "}
          - Excel-like spreadsheet with copy/paste support
        </li>
      </ul>

      <Text className="mt-6">
        Navigate through the Forms menu to explore each component's documentation,
        examples, and API reference.
      </Text>
    </DocsPage>
  );
}

export { FormsDocs };
export default FormsDocs;
