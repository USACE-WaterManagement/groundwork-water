---
"@usace-watermanagement/groundwork-water": minor
---

Add nearest value loading to CWMSForms. Setting `loadNearest` on CWMSInput, CWMSInputTable or CWMSSpreadsheet pre-populates fields with the time series value nearest the form's calendar time, using a `prev`, `next` or `nearest` strategy. Loaded values never overwrite what a user has typed, and `showValueTimestamp` surfaces where each value came from.

Fetching is handled by CWMSForm rather than by each input: inputs declare the series and time offsets they need, and the form issues one request per distinct time series and unit no matter how many inputs asked for it, so overlapping components share a single request. The shared window covers the union of registered time offsets and is trimmed to what the registered strategies require, while each input still resolves its own strategy against the shared result.

Add a `lookback` setting, in days, controlling how far either side of the form's calendar time a nearest-value search reaches. It defaults to 1 day, which was previously hard-wired, and cascades from `CWMSForm` to an individual input or table to a single column, so one slow-reporting series can widen its own window without every other column paying for it. Components sharing a series still share one request, taken over the widest window asked for. `lookahead` does the same for the `next` and `nearest` strategies.

When a series has no data in the window around the form's calendar time, the form now finds its all-time latest timestamp from CDA catalog extents and re-reads around it when the series ended before the window. Catalog requests use bounded, anchored batches so a form with dozens of gates cannot exceed Oracle's regular-expression limit. The fallback remains target-relative: a later reading cannot be shown as though it preceded the operator's selected time.

Add `useCdaRecentValues` for current-status displays that need recent values for an explicit TSID list without building a catalog regular expression. CDA limits this endpoint to approximately 14 days around the server's current date, so historical form lookups continue to use explicit `lookback` and `lookahead` windows.
