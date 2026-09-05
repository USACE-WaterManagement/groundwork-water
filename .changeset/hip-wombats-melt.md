---
"@usace-watermanagement/groundwork-water": minor
---

Add nearest value loading to CWMSForms. Setting `loadNearest` on CWMSInput, CWMSInputTable or CWMSSpreadsheet pre-populates fields with the time series value nearest the form's calendar time, using a `prev`, `next` or `nearest` strategy. Loaded values never overwrite what a user has typed, and `showValueTimestamp` surfaces where each value came from.

Fetching is handled by CWMSForm rather than by each input: inputs declare the series and time offsets they need, and the form issues one request per distinct time series and unit no matter how many inputs asked for it, so overlapping components share a single request. The shared window covers the union of registered time offsets and is trimmed to what the registered strategies require, while each input still resolves its own strategy against the shared result.

When a series has no data in the window around the form's calendar time, the form now finds its last value through CDA's `/timeseries/recent` endpoint, which takes an explicit list of time series IDs. The previous catalog lookup built a regular expression alternation of every such TSID, which Oracle rejects with ORA-12733 once it grows long enough - a form with a few dozen gates could lose every prefill at once. Exposed as the `useCdaRecentValues` hook for direct use.

Add a `lookback` setting, in days, controlling how far either side of the form's calendar time a nearest-value search reaches. It defaults to 1 day, which was previously hard-wired, and cascades from `CWMSForm` to an individual input or table to a single column, so one slow-reporting series can widen its own window without every other column paying for it. Components sharing a series still share one request, taken over the widest window asked for. `lookahead` does the same for the `next` and `nearest` strategies.

Fix the fetch window not following the form's calendar. Once a series had been located by its last value, that position was cached against the series alone and reused indefinitely, so changing the calendar date left the form reading from a window frozen around the old date - most visibly while shifting dates to troubleshoot. The cached position is now tied to the window it was derived from and is discarded whenever the calendar or lookback changes. Relatedly, that fallback no longer jumps to a value newer than the selected time, which could show a reading from after the operator's date as though it preceded it.
