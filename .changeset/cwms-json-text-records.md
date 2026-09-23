---
"@usace-watermanagement/groundwork-water": minor
---

Add CWMSTextRecordForm and text-record helpers to append one JSON object through the CWMS text time-series endpoint. Named form fields can be combined into a single record without numeric inference or replacement of existing text. Unchanged retries reuse the prepared record, and applications can check whether an uncertain submission was already stored before retrying.
