const BASE_URL = import.meta.env.BASE_URL;
export default [
  {
    id: "get-started",
    text: "Getting Started",
    href: `${BASE_URL}/#/docs`,
    children: [
      {
        id: "quick-start",
        text: "Quick Start",
        href: `${BASE_URL}/#/docs/quick-start`,
      },
      {
        id: "add-components",
        text: "Add Components",
        href: `${BASE_URL}/#/docs/add-components`,
      },
      {
        id: "react-query",
        text: "React Query",
        href: `${BASE_URL}/#/docs/react-query`,
      },
    ],
  },
  {
    id: "auth",
    text: "Authentication",
    href: `${BASE_URL}/#/docs/auth`,
    children: [
      {
        id: "auth-method",
        text: "AuthMethod",
        href: `${BASE_URL}/#/docs/auth/auth-method`,
      },
      {
        id: "auth-provider",
        text: "AuthProvider",
        href: `${BASE_URL}/#/docs/auth/auth-provider`,
      },
      {
        id: "cwms-login",
        text: "CWMSLogin Method",
        href: `${BASE_URL}/#/docs/auth/cwms-login`,
      },
      {
        id: "keycloak",
        text: "Keycloak Method",
        href: `${BASE_URL}/#/docs/auth/keycloak`,
      },
      {
        id: "use-auth",
        text: "useAuth Hook",
        href: `${BASE_URL}/#/docs/auth/use-auth`,
      },
    ],
  },
  {
    id: "hooks",
    text: "Data Hooks",
    href: `${BASE_URL}/#/docs/hooks`,
    children: [
      {
        id: "use-cda-catalog",
        text: "CDA Catalog",
        href: `${BASE_URL}/#/docs/hooks/use-cda-catalog`,
      },
      {
        id: "use-cda-latest-value",
        text: "CDA Latest Value",
        href: `${BASE_URL}/#/docs/hooks/use-cda-latest-value`,
      },
      {
        id: "use-cda-levels",
        text: "CDA Location Levels",
        href: `${BASE_URL}/#/docs/hooks/use-cda-levels`,
      },
      {
        id: "use-cda-location",
        text: "CDA Location",
        href: `${BASE_URL}/#/docs/hooks/use-cda-location`,
      },
      {
        id: "use-cda-time-series",
        text: "CDA Time Series",
        href: `${BASE_URL}/#/docs/hooks/use-cda-time-series`,
      },
      {
        id: "use-cda-time-series-group",
        text: "CDA Time Series Group",
        href: `${BASE_URL}/#/docs/hooks/use-cda-time-series-group`,
      },
      {
        id: "use-nwps-gauge",
        text: "NWPS Gauge",
        href: `${BASE_URL}/#/docs/hooks/use-nwps-gauge`,
      },
      {
        id: "use-nwps-gauge-data",
        text: "NWPS Gauge Data",
        href: `${BASE_URL}/#/docs/hooks/use-nwps-gauge-data`,
      },
    ],
  },
  {
    id: "cards",
    text: "Cards",
    href: `${BASE_URL}/#/docs/cards`,
    children: [
      {
        id: "cda-latest-value-card",
        text: "CDA Latest Value Card",
        href: `${BASE_URL}/#/docs/cards/cda-latest-value-card`,
      },
    ],
  },
  {
    id: "plots",
    text: "Plots",
    href: `${BASE_URL}/#/docs/plots`,
    children: [
      {
        id: "cwms-plot",
        text: "CWMS Plot",
        href: `${BASE_URL}/#/docs/plots/cwms-plot`,
      },
    ],
  },
  {
    id: "tables",
    text: "Tables",
    href: `${BASE_URL}/#/docs/tables`,
  },
  {
    id: "maps",
    text: "Maps",
    href: `${BASE_URL}/#/docs/maps`,
  },
  {
    id: "utilities",
    text: "Utilities",
    href: `${BASE_URL}/#/docs/utilities`,
    children: [
      {
        id: "cda-url-provider",
        text: "CDA URL Provider",
        href: `${BASE_URL}/#/docs/utilities/cda-url-provider`,
      },
    ],
  },
  {
    id: "help",
    text: "Help",
    href: `${BASE_URL}/#/docs/help`,
    children: [
      {
        id: "help-overview",
        text: "Help Overview",
        href: `${BASE_URL}/#/docs/help`,
      },
      {
        id: "report-issue",
        text: "Report Issue / Request Help",
        href: `${BASE_URL}/#https://github.com/USACE-WaterManagement/groundwork-water/issues`,
      },
      {
        id: "javascript-basics",
        text: "JavaScript Basics",
        href: `${BASE_URL}/#https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics`,
      },
      {
        id: "template-literal",
        text: "Template Literal",
        href: `${BASE_URL}/#https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals`,
      },
      {
        id: "react-basics",
        text: "React Basics",
        href: `${BASE_URL}/#https://react.dev/learn`,
      },
      {
        id: "groundwork-basics",
        text: "Getting Started - Groundwork - Themes/Styles",
        href: `${BASE_URL}/#https://usace.github.io/groundwork/#`,
      },
      {
        id: "cwms-js-docs",
        text: "CWMSjs Developer Docs",
        href: `${BASE_URL}/#https://hydrologicengineeringcenter.github.io/cwms-data-api-client-javascript/`,
      },
    ],
  },
];
