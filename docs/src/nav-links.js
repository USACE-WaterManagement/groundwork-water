export default [
  {
    id: "get-started",
    text: "Getting Started",
    href: "/docs",
    children: [
      {
        id: "quick-start",
        text: "Quick Start",
        href: "/docs/quick-start",
      },
      {
        id: "add-components",
        text: "Add Components",
        href: "/docs/add-components",
      },
      {
        id: "react-query",
        text: "React Query",
        href: "/docs/react-query",
      },
    ],
  },
  {
    id: "auth",
    text: "Authentication",
    href: "/docs/auth",
    children: [
      {
        id: "auth-method",
        text: "AuthMethod",
        href: "/docs/auth/auth-method",
      },
      {
        id: "auth-provider",
        text: "AuthProvider",
        href: "/docs/auth/auth-provider",
      },
      {
        id: "cwms-login",
        text: "CWMSLogin Method",
        href: "/docs/auth/cwms-login",
      },
      {
        id: "keycloak",
        text: "Keycloak Method",
        href: "/docs/auth/keycloak",
      },
      {
        id: "use-auth",
        text: "useAuth Hook",
        href: "/docs/auth/use-auth",
      },
    ],
  },
  {
    id: "hooks",
    text: "Data Hooks",
    href: "/docs/hooks",
    children: [
      {
        id: "use-cda-catalog",
        text: "CDA Catalog",
        href: "/docs/hooks/use-cda-catalog",
      },
      {
        id: "use-cda-latest-value",
        text: "CDA Latest Value",
        href: "/docs/hooks/use-cda-latest-value",
      },
      {
        id: "use-cda-levels",
        text: "CDA Location Levels",
        href: "/docs/hooks/use-cda-levels",
      },
      {
        id: "use-cda-location",
        text: "CDA Location",
        href: "/docs/hooks/use-cda-location",
      },
      {
        id: "use-cda-time-series",
        text: "CDA Time Series",
        href: "/docs/hooks/use-cda-time-series",
      },
      {
        id: "use-cda-time-series-group",
        text: "CDA Time Series Group",
        href: "/docs/hooks/use-cda-time-series-group",
      },
      {
        id: "use-nwps-gauge",
        text: "NWPS Gauge",
        href: "/docs/hooks/use-nwps-gauge",
      },
      {
        id: "use-nwps-gauge-data",
        text: "NWPS Gauge Data",
        href: "/docs/hooks/use-nwps-gauge-data",
      },

      {
        id: "blobs",
        text: "CDA Blobs",
        href: "#",
        children: [
          {
            id: "use-cda-blob",
            text: "CDA Blob",
            href: "/docs/hooks/use-cda-blob",
          },
          {
            id: "use-cda-blob-catalog",
            text: "CDA Blob Catalog",
            href: "/docs/hooks/use-cda-blob-catalog",
          },
        ],
      },
    ],
  },
  {
    id: "cards",
    text: "Cards",
    href: "/docs/cards",
    children: [
      {
        id: "cda-latest-value-card",
        text: "CDA Latest Value Card",
        href: "/docs/cards/cda-latest-value-card",
      },
    ],
  },
  {
    id: "plots",
    text: "Plots",
    href: "/docs/plots",
    children: [
      {
        id: "cwms-plot",
        text: "CWMS Plot",
        href: "/docs/plots/cwms-plot",
      },
    ],
  },
  {
    id: "tables",
    text: "Tables",
    href: "/docs/tables",
  },
  {
    id: "maps",
    text: "Maps",
    href: "/docs/maps",
  },
  {
    id: "utilities",
    text: "Utilities",
    href: "/docs/utilities",
    children: [
      {
        id: "cda-url-provider",
        text: "CDA URL Provider",
        href: "/docs/utilities/cda-url-provider",
      },
    ],
  },
  {
    id: "help",
    text: "Help",
    href: "/docs/help",
    children: [
      {
        id: "help-overview",
        text: "Help Overview",
        href: "/docs/help",
      },
      {
        id: "report-issue",
        text: "Report Issue / Request Help",
        href: "https://github.com/USACE-WaterManagement/groundwork-water/issues",
      },
      {
        id: "javascript-basics",
        text: "JavaScript Basics",
        href: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics",
      },
      {
        id: "template-literal",
        text: "Template Literal",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
      },
      {
        id: "react-basics",
        text: "React Basics",
        href: "https://react.dev/learn",
      },
      {
        id: "groundwork-basics",
        text: "Getting Started - Groundwork - Themes/Styles",
        href: "https://usace.github.io/groundwork/#",
      },
      {
        id: "cwms-js-docs",
        text: "CWMSjs Developer Docs",
        href: "https://hydrologicengineeringcenter.github.io/cwms-data-api-client-javascript/",
      },
    ],
  },
];
