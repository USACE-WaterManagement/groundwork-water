# @usace-watermanagement/groundwork-water

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
