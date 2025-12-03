const BASE_URL = import.meta.env.BASE_URL;
import { docsConfig } from "./config/docs.config";

export default [
  {
    id: "get-started",
    text: "Getting Started",
    href: `${BASE_URL}#/docs`,
    children: [
      {
        id: "quick-start",
        text: "Quick Start",
        href: `${BASE_URL}#/docs/quick-start`,
      },
      {
        id: "add-components",
        text: "Add Components",
        href: `${BASE_URL}#/docs/add-components`,
      },
      {
        id: "react-query",
        text: "React Query",
        href: `${BASE_URL}#/docs/react-query`,
      },
    ],
  },
  {
    id: "auth",
    text: "Authentication",
    href: `${BASE_URL}#/docs/auth`,
    children: [
      {
        id: "auth-method",
        text: "AuthMethod",
        href: `${BASE_URL}#/docs/auth/auth-method`,
      },
      {
        id: "auth-provider",
        text: "AuthProvider",
        href: `${BASE_URL}#/docs/auth/auth-provider`,
      },
      {
        id: "cwms-login",
        text: "CWMSLogin Method",
        href: `${BASE_URL}#/docs/auth/cwms-login`,
      },
      {
        id: "keycloak",
        text: "Keycloak Method",
        href: `${BASE_URL}#/docs/auth/keycloak`,
      },
      {
        id: "use-auth",
        text: "useAuth Hook",
        href: `${BASE_URL}#/docs/auth/use-auth`,
      },
    ],
  },
  {
    id: "dropdowns",
    text: "Dropdowns",
    href: `${BASE_URL}#/docs/dropdowns`,
    children: [
      {
        id: "offices",
        text: "Offices",
        href: `${BASE_URL}#/docs/dropdowns/offices`,
      },
    ],
  },
  {
    id: "hooks",
    text: "Data Hooks",
    href: `${BASE_URL}#/docs/hooks`,
    children: [
      {
        id: "blobs",
        text: "CDA Blobs",
        href: `${BASE_URL}#`,
        children: [
          {
            id: "use-cda-blob",
            text: "CDA Blob",
            href: `${BASE_URL}#/docs/hooks/use-cda-blob`,
          },
          {
            id: "use-cda-blobs",
            text: "CDA Blobs (list)",
            href: `${BASE_URL}#/docs/hooks/use-cda-blobs`,
          },
        ],
      },
      {
        id: "use-cda-catalog",
        text: "CDA Catalog",
        href: `${BASE_URL}#/docs/hooks/use-cda-catalog`,
      },
      {
        id: "use-cda-latest-value",
        text: "CDA Latest Value",
        href: `${BASE_URL}#/docs/hooks/use-cda-latest-value`,
      },
      {
        id: "use-cda-levels",
        text: "CDA Location Levels",
        href: `${BASE_URL}#/docs/hooks/use-cda-levels`,
      },
      {
        id: "use-cda-location",
        text: "CDA Location",
        href: `${BASE_URL}#/docs/hooks/use-cda-location`,
      },
      {
        id: "use-cda-offices",
        text: "CDA Offices",
        href: `${BASE_URL}#/docs/hooks/use-cda-offices`,
      },
      {
        id: "use-cda-time-series",
        text: "CDA Time Series",
        href: `${BASE_URL}#/docs/hooks/use-cda-time-series`,
      },
      {
        id: "use-cda-time-series-group",
        text: "CDA Time Series Group",
        href: `${BASE_URL}#/docs/hooks/use-cda-time-series-group`,
      },
      {
        id: "use-nwps-gauge",
        text: "NWPS Gauge",
        href: `${BASE_URL}#/docs/hooks/use-nwps-gauge`,
      },
      {
        id: "use-nwps-gauge-data",
        text: "NWPS Gauge Data",
        href: `${BASE_URL}#/docs/hooks/use-nwps-gauge-data`,
      },
    ],
  },
  {
    id: "cards",
    text: "Cards",
    href: `${BASE_URL}#/docs/cards`,
    children: [
      {
        id: "cda-latest-value-card",
        text: "CDA Latest Value Card",
        href: `${BASE_URL}#/docs/cards/cda-latest-value-card`,
      },
    ],
  },
  {
    id: "plots",
    text: "Plots",
    href: `${BASE_URL}#/docs/plots`,
    children: [
      {
        id: "cwms-plot",
        text: "CWMS Plot",
        href: `${BASE_URL}#/docs/plots/cwms-plot`,
      },
    ],
  },
  {
    id: "forms",
    text: "Forms",
    href: `${BASE_URL}#/docs/forms`,
    children: [
      {
        id: "cwms-form",
        text: "CWMSForm",
        href: `${BASE_URL}#/docs/forms/cwms-form`,
      },
      {
        id: "cwms-checkboxes",
        text: "CWMS Checkboxes",
        href: `${BASE_URL}#/docs/forms/cwms-checkboxes`,
      },
      {
        id: "cwms-radio-group",
        text: "CWMS Radio Group",
        href: `${BASE_URL}#/docs/forms/cwms-radio-group`,
      },
      {
        id: "cwms-dropdown",
        text: "CWMS Dropdown",
        href: `${BASE_URL}#/docs/forms/cwms-dropdown`,
      },
      {
        id: "cwms-input",
        text: "CWMS Input",
        href: `${BASE_URL}#/docs/forms/cwms-input`,
      },
      {
        id: "cwms-input-table",
        text: "CWMS Input Table",
        href: `${BASE_URL}#/docs/forms/cwms-input-table`,
      },
      {
        id: "cwms-spreadsheet",
        text: "CWMS Spreadsheet",
        href: `${BASE_URL}#/docs/forms/cwms-spreadsheet`,
      },
      {
        id: "cwms-textarea",
        text: "CWMS Textarea",
        href: `${BASE_URL}#/docs/forms/cwms-textarea`,
      },
      // Conditionally add interactive test page
      ...(docsConfig.features.showInteractiveTestPage
        ? [
            {
              id: docsConfig.testPage.id,
              text: docsConfig.testPage.text,
              href: docsConfig.testPage.href,
            },
          ]
        : []),
    ],
  },
  {
    id: "tables",
    text: "Tables",
    href: `${BASE_URL}#/docs/tables`,
  },
  {
    id: "maps",
    text: "Maps",
    href: `${BASE_URL}#/docs/maps`,
  },
  {
    id: "utilities",
    text: "Utilities",
    href: `${BASE_URL}#/docs/utilities`,
    children: [
      {
        id: "cda-url-provider",
        text: "CDA URL Provider",
        href: `${BASE_URL}#/docs/utilities/cda-url-provider`,
      },
      {
        id: "use-debounce",
        text: "Debounce",
        href: `${BASE_URL}#/docs/utilities/use-debounce`,
      },
    ],
  },
  {
    id: "help",
    text: "Help",
    href: `${BASE_URL}#/docs/help`,
    children: [
      {
        id: "help-overview",
        text: "Help Overview",
        href: `${BASE_URL}#/docs/help`,
      },
      {
        id: "report-issue",
        text: "Report Issue / Request Help",
        href: `https://github.com/USACE-WaterManagement/groundwork-water/issues`,
      },
      {
        id: "javascript-basics",
        text: "JavaScript Basics",
        href: `https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics`,
      },
      {
        id: "template-literal",
        text: "Template Literal",
        href: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals`,
      },
      {
        id: "react-basics",
        text: "React Basics",
        href: `https://react.dev/learn`,
      },
      {
        id: "groundwork-basics",
        text: "Getting Started - Groundwork - Themes/Styles",
        href: `https://usace.github.io/groundwork/#`,
      },
      {
        id: "cwms-js-docs",
        text: "CWMSjs Developer Docs",
        href: `https://hydrologicengineeringcenter.github.io/cwms-data-api-client-javascript/`,
      },
    ],
  },
];
