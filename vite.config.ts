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
          cssFileName: "style",
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "ol",
            "plotly.js-basic-dist",
            "cwmsjs",
            "@usace/groundwork",
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "@tanstack/react-query": "ReactQuery",
              ol: "ol",
              "plotly.js-basic-dist": "Plotly",
              cwmsjs: "cwmsjs",
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
      server: {
        proxy: {
          "^/api/v4/.*": {
            target: "https://midas.sec.usace.army.mil",
            changeOrigin: true,
            secure: false,
            configure: (proxy, _options) => {
              proxy.on("error", (err, _req, _res) => {
                console.log("proxy error", err);
              });
              proxy.on("proxyReq", (proxyReq, req, _res) => {
                console.log(
                  "Sending Request to the Target:",
                  req.method,
                  req.url
                );
              });
              proxy.on("proxyRes", (proxyRes, req, _res) => {
                console.log(
                  "Received Response from the Target:",
                  proxyRes.statusCode,
                  req.url
                );
              });
            },
          },
        },
      },
    };
  }
});
