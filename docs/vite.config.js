import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "../package.json";
import tailwindcss from "tailwindcss";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/groundwork-water/" : "/";
  const isDevelopment = mode === "development";
  return {
    plugins: [react(), tailwindcss()],
    base: base,
    resolve: {
      alias: isDevelopment
        ? [
             // During development, alias to the source files for easier debugging
            // Do not have to npm link if you do this: https://vitejs.dev/config/shared-options.html#resolve-alias
            {
              find: "@usace-watermanagement/groundwork-water/dist/style.css",
              replacement: fileURLToPath(new URL("../dist/style.css", import.meta.url)),
            },
            {
              find: "@usace-watermanagement/groundwork-water",
              replacement: fileURLToPath(new URL("../lib/index.jsx", import.meta.url)),
            },
          ]
        : [],
    },
    define: {
      "import.meta.env.PKG_VERSION": JSON.stringify(pkg.version),
    },
  };
});
