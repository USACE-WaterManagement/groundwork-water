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
import CWMSDropdown from "./components/data/forms/inputs/CWMSDropdown";
import CWMSInputTable from "./components/data/forms/inputs/CWMSInputTable";
import CWMSSpreadsheet from "./components/data/forms/inputs/CWMSSpreadsheet";

// Import form components
import { FormWrapper } from "./components/data/forms/CWMSForm";
import CdaUrlProvider from "./components/data/utilities/CdaUrlProvider";
import useCdaCatalog from "./components/data/hooks/useCdaCatalog";
import useCdaLatestValue from "./components/data/hooks/useCdaLatestValue";
import useCdaLocation from "./components/data/hooks/useCdaLocation";
import useCdaTimeSeries from "./components/data/hooks/useCdaTimeSeries";
import useCdaTimeSeriesGroup from "./components/data/hooks/useCdaTimeSeriesGroup";
import useNwpsGauge from "./components/data/hooks/useNwpsGauge";
import useNwpsGaugeData from "./components/data/hooks/useNwpsGaugeData";

// auth
import { AuthProvider } from "./components/data/utilities/auth/AuthProvider";
import { useAuth } from "./components/data/utilities/auth/useAuth";
import { createCwmsLoginAuthMethod } from "./components/data/utilities/auth/cwmsLoginAuthMethod";
import { createKeycloakAuthMethod } from "./components/data/utilities/auth/keycloakAuthMethod";

// import { helperFunction } from './utils/helpers';

export {
  TSTable,
  CWMSTable,
  GageMap,
  CWMSPlot,
  CdaLatestValueCard,
  CdaUrlProvider,
  useCdaCatalog,
  useCdaLatestValue,
  useCdaLocation,
  useCdaTimeSeries,
  useCdaTimeSeriesGroup,
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
  CWMSDropdown,
  CWMSInputTable,
  CWMSSpreadsheet,
  // Form components
  FormWrapper,
};
// export { helperFunction };
