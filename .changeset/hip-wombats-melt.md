---
"@usace-watermanagement/groundwork-water": minor
---

Add nearest value loading to CWMSForms. Setting `loadNearest` on CWMSInput, CWMSInputTable or CWMSSpreadsheet pre-populates fields with the time series value nearest the form's calendar time, using a `prev`, `next` or `nearest` strategy. Loaded values never overwrite what a user has typed, and `showValueTimestamp` surfaces where each value came from.

Fetching is handled by CWMSForm rather than by each input: inputs declare the series and time offsets they need, and the form issues one request per distinct time series and unit no matter how many inputs asked for it, so overlapping components share a single request. The shared window covers the union of registered time offsets and is trimmed to what the registered strategies require, while each input still resolves its own strategy against the shared result.
