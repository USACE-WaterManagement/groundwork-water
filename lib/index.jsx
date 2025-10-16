// Bundle tailwind
import "./css/tailwind.css";

// Bundle groundwork-water styles
import "@usace/groundwork/dist/style.css";

// Import components
import TSTable from "./components/data/tables/TSTable";
import CWMSTable from "./components/data/tables/CWMSTable";
import GageMap from "./components/data/maps/GageMap";
import CWMSPlot from "./components/data/plots/CWMSPlot";
import CdaLatestValueCard from "./components/data/cards/CdaLatestValueCard";

// Import input components
import CWMSInput from "./components/data/forms/inputs/CWMSInput";
import CWMSTextarea from "./components/data/forms/inputs/CWMSTextarea";
import CWMSCheckboxes from "./components/data/forms/inputs/CWMSCheckboxes";
import CWMSRadioGroup from "./components/data/forms/inputs/CWMSRadioGroup";
import CWMSDropdown from "./components/data/forms/inputs/CWMSDropdown";
import CWMSInputTable from "./components/data/forms/inputs/CWMSInputTable";
import CWMSSpreadsheet from "./components/data/forms/inputs/CWMSSpreadsheet";

// Import form components
import { CWMSForm } from "./components/data/forms/CWMSForm";
import {
  useCwmsFormSubmit,
  useFormValidation,
  useSubmissionFormatter,
} from "./components/data/forms/hooks/useCwmsFormSubmit";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showLoadingToast,
  updateToast,
  formatSubmissionMessage,
  showDetailedError,
} from "./components/data/forms/helpers/toastHelpers.jsx";
import CdaUrlProvider from "./components/data/utilities/CdaUrlProvider";
import useCdaCatalog from "./components/data/hooks/useCdaCatalog";
import useCdaLatestValue from "./components/data/hooks/useCdaLatestValue";
import useCdaLocation from "./components/data/hooks/useCdaLocation";
import useCdaLevels from "./components/data/hooks/useCdaLevels";
import useCdaTimeSeries from "./components/data/hooks/useCdaTimeSeries";
import useCdaTimeSeriesGroup from "./components/data/hooks/useCdaTimeSeriesGroup";
import useCdaOffices from "./components/data/hooks/useCdaOffices";
import useNwpsGauge from "./components/data/hooks/useNwpsGauge";
import useNwpsGaugeData from "./components/data/hooks/useNwpsGaugeData";

// files
import useCdaBlob from "./components/data/hooks/useCdaBlob";
import useCdaBlobs from "./components/data/hooks/useCdaBlobs";

// Utility Hooks
import useDebounce from "./components/data/utilities/useDebounce";

// auth
import { AuthProvider } from "./components/data/utilities/auth/AuthProvider";
import { useAuth } from "./components/data/utilities/auth/useAuth";
import { createCwmsLoginAuthMethod } from "./components/data/utilities/auth/cwmsLoginAuthMethod";
import { createKeycloakAuthMethod } from "./components/data/utilities/auth/keycloakAuthMethod";

// dropdowns
import { OfficeDropdown } from "./components/data/dropdowns/OfficeDropdown";

// import { helperFunction } from './utils/helpers';

export {
  TSTable,
  CWMSTable,
  GageMap,
  CWMSPlot,
  CdaLatestValueCard,
  CdaUrlProvider,
  OfficeDropdown,
  useCdaBlob,
  useCdaBlobs,
  useCdaCatalog,
  useCdaLatestValue,
  useCdaLocation,
  useCdaLevels,
  useCdaTimeSeries,
  useCdaTimeSeriesGroup,
  useCdaOffices,
  useDebounce,
  useNwpsGauge,
  useNwpsGaugeData,
  AuthProvider,
  useAuth,
  createCwmsLoginAuthMethod,
  createKeycloakAuthMethod,
  // Input components
  CWMSInput,
  CWMSTextarea,
  CWMSCheckboxes,
  CWMSRadioGroup,
  CWMSDropdown,
  CWMSInputTable,
  CWMSSpreadsheet,
  // Form components
  CWMSForm,
  // Form hooks
  useCwmsFormSubmit,
  useFormValidation,
  useSubmissionFormatter,
  // Toast utilities
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showLoadingToast,
  updateToast,
  formatSubmissionMessage,
  showDetailedError,
};
// export { helperFunction };
