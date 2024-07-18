import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import Plots from "../pages/docs/Plots";
import Tables from "../pages/docs/Tables";
import Maps from "../pages/docs/Maps";

export default createRouteBundle(
    {
        "/": Home,
        "/docs/plots": Plots,
        "/docs/tables": Tables,
        "/docs/maps": Maps,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);