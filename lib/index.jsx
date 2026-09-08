// Import components
import TSTable from "./components/data/tables/TSTable";
import CWMSTable from "./components/data/tables/CWMSTable";
import {
  buildCsvContent,
  buildSeriesLookup,
  buildTableIndex,
  buildTableRows,
  buildTableRowValues,
  downloadBlob,
} from "./components/data/tables/tableData";
import GageMap from "./components/data/maps/GageMap";
import CWMSPlot from "./components/data/plots/CWMSPlot";
import BasinPie from "./components/data/plots/BasinPie";
import RadialFillChart from "./components/data/plots/RadialFillChart";
import CdaLatestValueCard from "./components/data/cards/CdaLatestValueCard";
import DamProfile from "./components/data/plots/dam-profile/chart";
import DataStatus from "./components/data/summary/DataStatus";

// Import input components
import CWMSInput from "./components/data/forms/inputs/CWMSInput";
import CWMSFileUpload from "./components/data/forms/inputs/CWMSFileUpload";
import CWMSDataUpload from "./components/data/forms/inputs/CWMSDataUpload";
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
import useLoadNearestValues, {
  selectNearestValue,
  useNearestSeriesData,
} from "./components/data/forms/hooks/useLoadNearestValues";
import {
  useNearestValues,
  useNearestValueStore,
} from "./components/data/forms/hooks/useNearestValueStore";
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
import useCdaLocationCatalog from "./components/data/hooks/useCdaLocationCatalog";
import useCdaLevels from "./components/data/hooks/useCdaLevels";
import useCdaTimeSeries from "./components/data/hooks/useCdaTimeSeries";
import useCdaMultiTimeSeries from "./components/data/hooks/useCdaMultiTimeSeries";
import useCdaRecentValues from "./components/data/hooks/useCdaRecentValues";
import useCdaTimeSeriesGroup from "./components/data/hooks/useCdaTimeSeriesGroup";
import useCdaOffices from "./components/data/hooks/useCdaOffices";
import useNwpsGauge from "./components/data/hooks/useNwpsGauge";
import useNwpsGaugeData from "./components/data/hooks/useNwpsGaugeData";
import useDataStatusFile from "./components/data/hooks/useDataStatusFile";
import useCwmsDataUpload from "./components/data/hooks/useCwmsDataUpload";
import {
  fetchCdaLevelTimeSeries,
  fetchCdaLevelValues,
} from "./components/data/helpers/levels";

// files
import useCdaBlob from "./components/data/hooks/useCdaBlob";
import useCdaBlobs from "./components/data/hooks/useCdaBlobs";

// Utility Hooks
import useDebounce from "./components/data/utilities/useDebounce";
import {
  getLocationCatalogCoordinates,
  locationCatalogToFeatureCollection,
} from "./components/data/maps/locationCatalog";
import {
  CWMS_DATA_UPLOAD_HEADERS,
  CwmsDataUploadValidationError,
  buildCwmsDataUploadPayloads,
  classifyCwmsDataUploadRows,
  createCwmsDataUploadTemplate,
  filterCwmsDataUploadRows,
  parseCwmsDataUploadRows,
  readCwmsDataUploadFile,
} from "./components/data/forms/helpers/dataUpload";
// Utility Functions
import {
  PRECISION_BY_UNIT,
  DEFAULT_PRECISION,
  getPrecision,
} from "./components/data/utilities";

// auth
import { AuthProvider } from "./components/data/utilities/auth/AuthProvider";
import { useAuth } from "./components/data/utilities/auth/useAuth";
import { createCwmsLoginAuthMethod } from "./components/data/utilities/auth/cwmsLoginAuthMethod";
import { createKeycloakAuthMethod } from "./components/data/utilities/auth/keycloakAuthMethod";

// dropdowns
import { OfficeDropdown } from "./components/data/dropdowns/OfficeDropdown";
import SearchInput from "./components/data/search/SearchInput";

// import { helperFunction } from './utils/helpers';

export {
  TSTable,
  CWMSTable,
  buildCsvContent,
  buildSeriesLookup,
  buildTableIndex,
  buildTableRows,
  buildTableRowValues,
  downloadBlob,
  GageMap,
  CWMSPlot,
  BasinPie,
  RadialFillChart,
  CdaLatestValueCard,
  CdaUrlProvider,
  DataStatus,
  OfficeDropdown,
  SearchInput,
  useCdaBlob,
  useCdaBlobs,
  useCdaCatalog,
  useCdaLatestValue,
  useCdaLocation,
  useCdaLocationCatalog,
  useCdaLevels,
  useCdaTimeSeries,
  useCdaMultiTimeSeries,
  useCdaRecentValues,
  useCdaTimeSeriesGroup,
  useCdaOffices,
  useDataStatusFile,
  useCwmsDataUpload,
  fetchCdaLevelTimeSeries,
  fetchCdaLevelValues,
  useDebounce,
  getLocationCatalogCoordinates,
  locationCatalogToFeatureCollection,
  CWMS_DATA_UPLOAD_HEADERS,
  CwmsDataUploadValidationError,
  buildCwmsDataUploadPayloads,
  classifyCwmsDataUploadRows,
  createCwmsDataUploadTemplate,
  filterCwmsDataUploadRows,
  parseCwmsDataUploadRows,
  readCwmsDataUploadFile,
  useNwpsGauge,
  useNwpsGaugeData,
  AuthProvider,
  useAuth,
  createCwmsLoginAuthMethod,
  createKeycloakAuthMethod,
  getPrecision,
  PRECISION_BY_UNIT,
  DEFAULT_PRECISION,
  // Input components
  CWMSInput,
  CWMSFileUpload,
  CWMSDataUpload,
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
  useLoadNearestValues,
  useNearestSeriesData,
  useNearestValues,
  useNearestValueStore,
  selectNearestValue,
  // Toast utilities
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showLoadingToast,
  updateToast,
  formatSubmissionMessage,
  showDetailedError,
  DamProfile,
};
// export { helperFunction };
