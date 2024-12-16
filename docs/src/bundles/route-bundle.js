import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import CdaLatestValueCardDocs from "../pages/docs/cards/cda-latest-value-card";
import NotFound from "../pages/NotFound";
import CWMSPlotDocs from "../pages/docs/plots/cwms-plot";
import Tables from "../pages/docs/tables";
import Maps from "../pages/docs/maps";
import Docs from "../pages/docs/";
import ReactQuery from "../pages/docs/react-query";
import AddComponents from "../pages/docs/add-components";
import QuickStart from "../pages/docs/quick-start";
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

export default createRouteBundle(
  {
    "/": Home,
    "/docs": Docs,
    "/docs/cards/cda-latest-value-card": CdaLatestValueCardDocs,
    "/docs/help": HelpPage,
    "/docs/hooks": DataHooks,
    "/docs/hooks/use-cda-catalog": UseCdaCatalog,
    "/docs/hooks/use-cda-latest-value": UseCdaLatestValue,
    "/docs/hooks/use-cda-location": UseCdaLocation,
    "/docs/hooks/use-cda-time-series": UseCdaTimeSeries,
    "/docs/hooks/use-cda-time-series-group": UseCdaTimeSeriesGroup,
    "/docs/hooks/use-nwps-gauge": UseNwpsGauge,
    "/docs/hooks/use-nwps-gauge-data": UseNwpsGaugeData,
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
  }
);
