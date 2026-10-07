---
"@usace-watermanagement/groundwork-water": minor
---

Add `CWMSFileUpload mode="file"` for standalone file selection without encoding or registering a CDA blob submission. Reject empty, oversized, and unsupported selections, and notify consumers when the selection is cleared. Prevent stale asynchronous reads from restoring a cleared file.
