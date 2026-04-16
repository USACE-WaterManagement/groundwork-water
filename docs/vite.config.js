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
            {
              find: "@usace-watermanagement/groundwork-water/dist/style.css",
              replacement: fileURLToPath(
                new URL("../lib/css/tailwind.css", import.meta.url),
              ),
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
