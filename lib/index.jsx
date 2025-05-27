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
import CdaUrlProvider from "./components/data/utilities/CdaUrlProvider";
import useCdaCatalog from "./components/data/hooks/useCdaCatalog";
import useCdaLatestValue from "./components/data/hooks/useCdaLatestValue";
import useCdaLocation from "./components/data/hooks/useCdaLocation";
import useCdaLevels from "./components/data/hooks/useCdaLevels";
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
  useCdaLevels,
  useCdaTimeSeries,
  useCdaTimeSeriesGroup,
  useNwpsGauge,
  useNwpsGaugeData,
  AuthProvider,
  useAuth,
  createCwmsLoginAuthMethod,
  createKeycloakAuthMethod,
};
// export { helperFunction };
