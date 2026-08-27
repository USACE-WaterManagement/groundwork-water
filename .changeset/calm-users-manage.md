---
"@usace-watermanagement/groundwork-water": minor
---

Add reusable hooks for listing office users and roles and updating user role assignments. Add the cwms-cli-compatible read-only, read/write, and user-administrator role presets with helpers for resolving them against the CDA role catalog. Export CWMS role descriptions sourced from the database schema as a temporary fallback until CDA returns them. Extend `OfficeDropdown` with CDA URL and office allow-list support for authorized administration views. Remove an unused documentation-state import that prevented the packaged library from loading in Vite consumers.
