---
"@usace-watermanagement/groundwork-water": minor
---

Route nearest-value loading through a form-level orchestrator. Inputs now declare which series and time offsets they need and read values back from CWMSForm, instead of each component fetching for itself. Overlapping components share one request per tsid+units, the fetch window is trimmed to what the registered strategies actually require, and requests set an explicit page size so a truncated page can no longer hand back a stale value.
