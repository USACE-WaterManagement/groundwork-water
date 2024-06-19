import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import Plots from "../pages/docs/Plots";
import Tables from "../pages/docs/Tables";

export default createRouteBundle(
    {
        "/": Home,
        "/docs/plots": Plots,
        "/docs/tables": Tables,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);