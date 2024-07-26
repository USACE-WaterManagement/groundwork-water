import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import Plots from "../pages/plots";
import Tables from "../pages/tables";
import Maps from "../pages/maps";
import Docs from "../pages/docs";
import ReactQuery from "../pages/docs/react-query";
import AddComponents from "../pages/docs/add-components";
import QuickStart from "../pages/docs/quick-start";

export default createRouteBundle(
    {
        "/": Home,
        "/docs": Docs,
        "/docs/plots": Plots,
        "/docs/tables": Tables,
        "/docs/maps": Maps,
        "/docs/react-query": ReactQuery,
        "/docs/add-components": AddComponents,
        "/docs/quick-start": QuickStart,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);