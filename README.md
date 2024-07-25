# Groundwork Water Components 

## Getting Started
```bash
npm install @usace-watermanagement/groundwork-water --save
```
Will install the groundwork water components to your local `node_modules` directory, and add it to your packages.json for future use.

## Documentation
You can read the current Groundwork Water Documentation:  
[https://usace-watermanagement.github.io/groundwork-water/](https://usace-watermanagement.github.io/groundwork-water/)


[View Source on Github](https://github.com/USACE-WaterManagement/groundwork-water)

## Dev Notes

There are two directories of interest in this repository for Groundwork Water developers:

### Docs Website

The `/docs` directory contains the source code for the documentation website.

To run the docs you can do the following:
```bash
npm install
npm run build

cd docs
npm install
npm run dev
```
This will first *install* the dependencies for the library then it `npm link`'s the package in the docs. 

When you're making frequent changes you should consider importing the components directly from the package.
i.e.

```js
import { TSPlot } from "../path/to/lib/path/to/component";
```

This will install the dependencies, and then run the docs in development mode.




### Lib

The `/lib` directory contains the source code for the package itself.

These are the components that would be shared with the community but also within the docs themselves for testing and to showcase the components.


## Publishing
__*NOTE:*__ You will first need to be added as a collaborator to the package on NPM.

To publish a new version of the package, run the following command:
```bash
npm run publish
```
This will build the package, and then publish it to NPM.
