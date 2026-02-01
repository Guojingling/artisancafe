import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("account", "routes/account.tsx")
] satisfies RouteConfig;
