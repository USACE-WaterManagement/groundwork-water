# @usace-watermanagement/groundwork-water

## 4.3.0

### Minor Changes

- b488715: Add nearest value loading to CWMSForms. Setting `loadNearest` on CWMSInput, CWMSInputTable or CWMSSpreadsheet pre-populates fields with the time series value nearest the form's calendar time, using a `prev`, `next` or `nearest` strategy. Loaded values never overwrite what a user has typed, and `showValueTimestamp` surfaces where each value came from.

  Fetching is handled by CWMSForm rather than by each input: inputs declare the series and time offsets they need, and the form issues one request per distinct time series and unit no matter how many inputs asked for it, so overlapping components share a single request. The shared window covers the union of registered time offsets and is trimmed to what the registered strategies require, while each input still resolves its own strategy against the shared result.

  Add a `lookback` setting, in days, controlling how far either side of the form's calendar time a nearest-value search reaches. It defaults to 1 day, which was previously hard-wired, and cascades from `CWMSForm` to an individual input or table to a single column, so one slow-reporting series can widen its own window without every other column paying for it. Components sharing a series still share one request, taken over the widest window asked for. `lookahead` does the same for the `next` and `nearest` strategies.

  When a series has no data in the window around the form's calendar time, the form now finds its all-time latest timestamp from CDA catalog extents and re-reads around it when the series ended before the window. Catalog requests use bounded, anchored batches so a form with dozens of gates cannot exceed Oracle's regular-expression limit. The fallback remains target-relative: a later reading cannot be shown as though it preceded the operator's selected time.

  Add `useCdaRecentValues` for current-status displays that need recent values for an explicit TSID list without building a catalog regular expression. CDA limits this endpoint to approximately 14 days around the server's current date, so historical form lookups continue to use explicit `lookback` and `lookahead` windows.

### Patch Changes

- b488715: Clear nearest-loaded form values when the calendar changes so loading indicators appear until values for the new time are ready.

## 4.2.0

### Minor Changes

- ec76b89: Add reusable hooks for listing office users and roles and updating user role assignments. Add the cwms-cli-compatible read-only, read/write, and user-administrator role presets with helpers for resolving them against the CDA role catalog. Export CWMS role descriptions sourced from the database schema as a temporary fallback until CDA returns them. Extend `OfficeDropdown` with CDA URL and office allow-list support for authorized administration views. Remove an unused documentation-state import that prevented the packaged library from loading in Vite consumers.
- ec76b89: Allow CDA user searches across offices by omitting the optional office filter.

## 4.1.1

### Patch Changes

- 26e13d4: Default Keycloak authentication to the CWBI production host while retaining the host
  override for development, test, and custom environments. Clarify the production and
  test hosts throughout the authentication documentation.

## 4.1.0

### Minor Changes

- 467d003: Add a paginated CDA location catalog hook and helpers for converting catalog entries to GeoJSON point features.
- 77a35dc: Added A2W Dam Profile Chart to component library
- 914dd52: Add a React and Groundwork-based CWMS tabular data upload form with workbook validation, existing-data comparison, batch submission, deletion, and generated templates.
- ec19d44: Add a reusable `SearchInput` component and docs for district-configured search bars.

### Patch Changes

- f56fabe: Document pre-fetched CWMSTable data and publish accurate optional prop types.

## 4.0.0

### Major Changes

- d24a410: Modernize CWMSTable with virtualized responsive rendering by default.
- fdc215b: Improve package output for downstream tree shaking by publishing preserved ESM modules, adding subpath exports, moving styles to an explicit CSS entry, and lazy-loading Plotly and OpenLayers from the components that need them.

### Minor Changes

- cc9e1c2: Add a secure interactive radial fill chart, a CWMS basin storage adapter, and exact
  level time-series fetching helpers for dynamic request lists.
- cebda1b: Add CDA parity improvements to CWMSPlot, including preloaded time-series values and memoized CDA clients.
- e452b73: Add Data Status Summary component
- 37d2607: Add `getValidToken(minValiditySeconds)` to authentication methods so API clients can retrieve a usable Keycloak access token immediately before sending a request. The Keycloak implementation refreshes expired or soon-to-expire PKCE and direct-grant tokens and coalesces concurrent refresh attempts into one request.

## 3.11.0

### Minor Changes

- 1adfa26: Prevent CWMSSpreadsheet toolbar buttons from submitting forms and add options to hide each button.

### Patch Changes

- adbc9fb: Allow Keycloak auth login calls to override the redirect URI so applications can return users to the page that initiated sign-in.

## 3.10.0

### Minor Changes

- 5592744: update auth documentation

### Patch Changes

- c4330b0: Allow downstream applications to install Groundwork Water alongside Groundwork 4.

## 3.9.0

### Minor Changes

- 38170dd: Add component for uploading blobs via the UI making use of cwmsforms

## 3.8.1

### Patch Changes

- 634ff06: Improve auth state responsiveness
- 89de5ed: Added features to CWMSForms, including updating the calendar componets, adding transpose for tables, and correctly handling disabled fields

## 3.8.0

### Minor Changes

- 3026339: Add multi-TS hook

### Patch Changes

- bbd29fb: Fix large Toastify icons
- bd77504: Updates to the CWMS Table to allow whether to start the table at the top of the interval or using the most recent data value
- 1448237: Fixes state management of auth for AAA login method
- ac547ee: Expand the React peer dependency range to support React 18 and 19, and add PR build verification for both versions
- a13fd5d: fix plotting variable location levels

## 3.7.0

### Minor Changes

- 72d40f1: Add Keycloak Auth Code + PKCE support while retaining the legacy direct-grant flow.

### Patch Changes

- f617d2a: Correct missing import for keycloakhost

## 3.6.4

### Patch Changes

- 7b44acf: Remove credentials from /user/profile request when token available

## 3.6.3

### Patch Changes

- f3b83dc: Use trusted publishing for npm publishing access

## 3.6.2

### Patch Changes

- 89bda0d: Add retries to useCdaUserProfile to return profile upon initial user creation

## 3.6.1

### Patch Changes

- 38ffd1c: Fix routing for other docs pages and headers to allow for ctrl + click and copy/paste of URLS

## 3.6.0

### Minor Changes

- ef0c492: Adds routing param to plots and allows for default rounding on plot and tables
- 1e5425a: Update authentication handling to expose the user profile from CDA when available

## 3.5.2

### Patch Changes

- a8c2461: Add missing baseurl to docs

## 3.5.1

### Patch Changes

- ad16cf6: Updating routing in docs by removing leading /#/ can setting base_Url to be "/groundwork-water/" : "/"

## 3.5.0

### Minor Changes

- 25f99ad: Adds a squite of form components to easily allow users to create and maintain manual data entry forms to the CWMS database. Components include text, number, dropdown, radio, and checkbox, fields, along with a seemless intregration with existing Auth contexts.

### Patch Changes

- 2246ae5: Update to CWMS Plot to modify location level trace with dates bounded by start and end of all timeseries datasets @stephenkissock

## 3.4.1

### Patch Changes

- b71d72d: Fix: republish version due to npm publish config issue

## 3.4.0

### Minor Changes

- b9567d3: Add a useOffices hook and an OfficesDropdown component
