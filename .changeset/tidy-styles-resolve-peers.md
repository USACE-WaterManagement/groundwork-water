---
"@usace-watermanagement/groundwork-water": major
---

Resolve Groundwork CSS from the consuming application's installed peer dependency
instead of embedding a build-time copy. Both `style.css` and `dist/style.css` remain
single entry points for Groundwork and Groundwork Water styles in bundlers such as
Vite. Direct browser or CDN stylesheet links must use a bundled CSS output.

Requires Groundwork ^4.3.2 for stable stylesheet aliases. Applications using
Groundwork 3 must upgrade to Groundwork 4 before adopting this major release, or
remain on Groundwork Water 4.x. Future Groundwork major versions require separate
compatibility validation before support is added.
