import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import Plots from "../pages/docs/plots";
import Tables from "../pages/docs/tables";
import Maps from "../pages/docs/maps";
import Docs from "../pages/docs";

export default createRouteBundle(
    {
        "/": Home,
        "/docs": Docs,
        "/docs/plots": Plots,
        "/docs/tables": Tables,
        "/docs/maps": Maps,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);