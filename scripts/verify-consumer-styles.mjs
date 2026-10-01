import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { build } from "vite";
import postcss from "postcss";

const root = path.resolve("tests/consumer-styles");
const requireConsumer = createRequire(path.join(root, "package.json"));
const peerCss = await readFile(
  requireConsumer.resolve("@usace/groundwork/dist/style.css"),
  "utf8",
);
const waterEntry = requireConsumer.resolve(
  "@usace-watermanagement/groundwork-water/style.css",
);
assert.equal(
  waterEntry,
  requireConsumer.resolve("@usace-watermanagement/groundwork-water/dist/style.css"),
  "Both public CSS paths must remain compatible",
);
const entryCss = await readFile(waterEntry, "utf8");
assert.match(entryCss, /@import\s+"@usace\/groundwork\/dist\/style.css"/);
assert.doesNotMatch(entryCss, /\.gw-/, "Do not freeze peer styles in the entry");
const waterCss = await readFile(
  path.join(path.dirname(waterEntry), "groundwork-water.css"),
  "utf8",
);
postcss.parse(waterCss).walkRules((rule) => {
  assert.doesNotMatch(
    rule.selector,
    /\.gw-/,
    "Groundwork Water's generated CSS must not embed Groundwork utilities",
  );
});

await build({ root, configFile: false, build: { minify: false } });
const assets = path.join(root, "dist/assets");
const files = await readdir(assets);
const css = (
  await Promise.all(
    files
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFile(path.join(assets, f), "utf8")),
  )
).join("\n");
assert.doesNotMatch(css, /@import\s/, "Consumer build must resolve CSS imports");
const selectors = new Set();
postcss.parse(css).walkRules((rule) => selectors.add(rule.selector));
for (const selector of [
  ".gww-px-4",
  ".gww-py-3",
  ".gww-text-sm",
  ".gww-text-slate-500",
  ".gw-sticky",
]) {
  assert.ok(selectors.has(selector), `Missing consumer style: ${selector}`);
}
const peerHeaderRules = [];
postcss.parse(peerCss).walkRules((rule) => {
  if (rule.selector === ".gw-z-20" || rule.selector === ".gw-z-\\[150\\]") {
    peerHeaderRules.push(rule.selector);
  }
});
assert.ok(peerHeaderRules.length, "Installed peer must define header stacking");
for (const selector of peerHeaderRules)
  assert.ok(selectors.has(selector), `Missing installed peer style: ${selector}`);
console.log(
  "Packed consumer CSS: both entry paths, search styles, and installed peer header styles passed.",
);
