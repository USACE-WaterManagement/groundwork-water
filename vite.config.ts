import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import pkg from "./package.json";

// Based off of Groundwork proper's lib vs doc config
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    console.log("Building library");
    return {
      plugins: [react(), tailwindcss()],
      publicDir: false,
      build: {
        minify: false,
        lib: {
          name: "GroundworkWater",
          fileName: (format) => `groundwork-water.${format}.js`,
          entry: "lib/index.jsx",
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "ol",
            "plotly.js-basic-dist",
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "@tanstack/react-query": "ReactQuery",
              ol: "ol",
              "plotly.js-basic-dist": "Plotly",
            },
          },
        },
      },
    };
  } else {
    console.log("Building Docs App: ", mode);
    const base =
      mode === "production"
        ? "https://USACE-WaterManagement.github.io/groundwork-water/"
        : "http://localhost:5173/";
    return {
      plugins: [react(), tailwindcss()],
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
