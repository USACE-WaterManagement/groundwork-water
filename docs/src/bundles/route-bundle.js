import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import Plots from "../pages/docs/Plots";

export default createRouteBundle(
    {
        "/": Home,
        "/docs/plots": Plots,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);