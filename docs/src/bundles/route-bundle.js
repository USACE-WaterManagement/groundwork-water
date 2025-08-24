import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import CdaLatestValueCardDocs from "../pages/docs/cards/cda-latest-value-card";
import NotFound from "../pages/NotFound";
import PlotsDocs from "../pages/docs/plots";
import CWMSPlotDocs from "../pages/docs/plots/cwms-plot";
import Tables from "../pages/docs/tables";
import Maps from "../pages/docs/maps";
import Docs from "../pages/docs/";
import ReactQuery from "../pages/docs/react-query";
import AddComponents from "../pages/docs/add-components";
import QuickStart from "../pages/docs/quick-start";
import AuthenticationDocs from "../pages/docs/auth";
import AuthMethodDocs from "../pages/docs/auth/auth-method";
import AuthProviderDocs from "../pages/docs/auth/auth-provider";
import CwmsLoginDocs from "../pages/docs/auth/cwms-login";
import KeycloakDocs from "../pages/docs/auth/keycloak";
import UseAuthDocs from "../pages/docs/auth/use-auth";
import UseCdaCatalog from "../pages/docs/hooks/use-cda-catalog";
import UseCdaLatestValue from "../pages/docs/hooks/use-cda-latest-value";
import UseCdaLocation from "../pages/docs/hooks/use-cda-location";
import UseCdaTimeSeries from "../pages/docs/hooks/use-cda-time-series";
import UseCdaTimeSeriesGroup from "../pages/docs/hooks/use-cda-time-series-group";
import UseNwpsGauge from "../pages/docs/hooks/use-nwps-gauge";
import UseNwpsGaugeData from "../pages/docs/hooks/use-nwps-gauge-data";
import DataHooks from "../pages/docs/hooks";
import HelpPage from "../pages/docs/help";
import CdaUrlProviderDocs from "../pages/docs/utilities/cda-url-provider";
import UtilitiesDocs from "../pages/docs/utilities";
import UseCdaLevels from "../pages/docs/hooks/use-cda-levels";
import UseCdaOffices from "../pages/docs/hooks/use-cda-offices";

export default createRouteBundle(
  {
    "/": Home,
    "/docs": Docs,
    "/docs/cards/cda-latest-value-card": CdaLatestValueCardDocs,
    "/docs/help": HelpPage,
    "/docs/auth": AuthenticationDocs,
    "/docs/auth/auth-method": AuthMethodDocs,
    "/docs/auth/auth-provider": AuthProviderDocs,
    "/docs/auth/cwms-login": CwmsLoginDocs,
    "/docs/auth/keycloak": KeycloakDocs,
    "/docs/auth/use-auth": UseAuthDocs,
    "/docs/hooks": DataHooks,
    "/docs/hooks/use-cda-catalog": UseCdaCatalog,
    "/docs/hooks/use-cda-latest-value": UseCdaLatestValue,
    "/docs/hooks/use-cda-location": UseCdaLocation,
    "/docs/hooks/use-cda-levels": UseCdaLevels,
    "/docs/hooks/use-cda-offices": UseCdaOffices,
    "/docs/hooks/use-cda-time-series": UseCdaTimeSeries,
    "/docs/hooks/use-cda-time-series-group": UseCdaTimeSeriesGroup,
    "/docs/hooks/use-nwps-gauge": UseNwpsGauge,
    "/docs/hooks/use-nwps-gauge-data": UseNwpsGaugeData,
    "/docs/plots": PlotsDocs,
    "/docs/plots/cwms-plot": CWMSPlotDocs,
    "/docs/maps": Maps,
    "/docs/tables": Tables,
    "/docs/utilities": UtilitiesDocs,
    "/docs/utilities/cda-url-provider": CdaUrlProviderDocs,
    "/docs/react-query": ReactQuery,
    "/docs/add-components": AddComponents,
    "/docs/quick-start": QuickStart,
    "*": NotFound,
  },
  {
    routeInfoSelector: "selectHash",
  },
);
