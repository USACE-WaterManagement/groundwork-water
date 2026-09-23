---
"@usace-watermanagement/groundwork-water": minor
---

Add an opt-in `submissionMode="custom"` to CWMSForm for application-owned persistence. Registered fields include their name; custom handlers are awaited, prevent duplicate submissions, and use the existing success, error, and reset callbacks without issuing CWMS writes. Default CWMS submission is unchanged.
