import { createRouteBundle } from "redux-bundler";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";

export default createRouteBundle(
    {
        "/": Home,
        "*": NotFound
    },
    {
        routeInfoSelector: "selectHash",
    }
);