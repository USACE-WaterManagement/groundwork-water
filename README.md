# Groundwork Water Components

![GitHub Release](https://img.shields.io/github/v/release/usace-watermanagement/groundwork-water)
![NPM Version](https://img.shields.io/npm/v/@usace-watermanagement/groundwork-water)
![GitHub Issues](https://img.shields.io/github/issues/usace-watermanagement/groundwork-water)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/usace-watermanagement/groundwork-water)
![Last Commit](https://img.shields.io/github/last-commit/usace-watermanagement/groundwork-water)

## Getting Started ![React](https://img.shields.io/badge/React-18+-61dafb)

```bash
npm install @usace-watermanagement/groundwork-water --save
```

Will install the groundwork water components to your local `node_modules` directory, and add it to your packages.json for future use.

Import the styles once in your application entry point:

```jsx
import "@usace-watermanagement/groundwork-water/style.css";
```

This entry loads Groundwork Water styles and the stylesheet from your installed
`@usace/groundwork` peer dependency. You do not need a separate Groundwork CSS
import when using both libraries. The existing `/dist/style.css` import also works.
Import application-specific overrides afterward.

Groundwork CSS alone does not include Groundwork Water's `gww-` styles. If a
Groundwork Water component has missing spacing, colors, or positioning, check that
the import above is present. Keep Groundwork within the supported peer dependency
range. Matching its stylesheet does not make unsupported component APIs compatible.

This packaging requires Groundwork 4.3.2 or newer within version 4. Applications
using Groundwork 3 must upgrade to Groundwork 4 first, or remain on Groundwork
Water 4.x. Future Groundwork major versions will need compatibility validation
before support is added.

This CSS entry requires a bundler that resolves package CSS imports, such as Vite.
It is not a standalone stylesheet for direct browser or CDN linking. It loads the
full Groundwork stylesheet, not only the styles for imported components.

## Documentation ![Docs](https://img.shields.io/badge/docs-available-brightgreen)

You can read the current Groundwork Water Documentation:  
[https://usace-watermanagement.github.io/groundwork-water/](https://usace-watermanagement.github.io/groundwork-water/)

## Developers ![NPM Downloads](https://img.shields.io/npm/dm/@usace-watermanagement/groundwork-water)

If you wish to contribute to the `groundwork-water` project, and you are a current water management member within USACE, please consider checking out the [CONTRIBUTING](/CONTRIBUTING.md) documentation!
