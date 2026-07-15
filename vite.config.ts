import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import pkg from "./package.json";

const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternalPackage = (id: string) =>
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));
const libraryAssetFileNames = (assetInfo: { name?: string }) => {
  if (assetInfo.name?.endsWith(".css")) {
    return "style.css";
  }
  return "assets/[name][extname]";
};

// Based off of Groundwork proper's lib vs doc config
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    console.log("Building library");
    return {
      plugins: [react(), tailwindcss()],
      test: {
        environment: "jsdom",
        globals: true,
      },
      publicDir: false,
      build: {
        minify: false,
        lib: {
          name: "GroundworkWater",
          fileName: (format) =>
            format === "umd" ? "groundwork-water.umd.cjs" : "index.js",
          entry: "lib/index.jsx",
          formats: ["es", "umd"],
          cssFileName: "style",
        },
        rollupOptions: {
          external: isExternalPackage,
          output: [
            {
              format: "es",
              dir: "dist",
              preserveModules: true,
              preserveModulesRoot: "lib",
              entryFileNames: "es/[name].js",
              chunkFileNames: "es/chunks/[name]-[hash].js",
              assetFileNames: libraryAssetFileNames,
            },
            {
              format: "umd",
              name: "GroundworkWater",
              entryFileNames: "groundwork-water.umd.cjs",
              assetFileNames: libraryAssetFileNames,
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "@tanstack/react-query": "ReactQuery",
                ol: "ol",
                "plotly.js-basic-dist": "Plotly",
                cwmsjs: "cwmsjs",
                "@usace/groundwork": "Groundwork",
              },
            },
          ],
        },
      },
    };
  } else {
    console.log("Building Docs App: ", mode);
    const base = mode === "production" ? "/groundwork-water/" : "/";
    return {
      plugins: [react(), tailwindcss()],
      test: {
        environment: "jsdom",
        globals: true,
      },
      base: base,
      build: {
        outDir: "docs",
      },
      define: {
        "import.meta.env.PKG_VERSION": JSON.stringify(pkg.version),
      },
    };
  }
});
