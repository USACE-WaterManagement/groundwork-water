---
"@usace-watermanagement/groundwork-water": minor
---

Add `getValidToken(minValiditySeconds)` to authentication methods so API clients can retrieve a usable Keycloak access token immediately before sending a request. The Keycloak implementation refreshes expired or soon-to-expire PKCE and direct-grant tokens and coalesces concurrent refresh attempts into one request.
