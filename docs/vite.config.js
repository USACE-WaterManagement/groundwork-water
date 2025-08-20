import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "../package.json";
import tailwindcss from "tailwindcss";

export default defineConfig(({ mode }) => {
  const base =
    mode === "production"
      ? "https://USACE-WaterManagement.github.io/groundwork-water/"
      : "http://localhost:5173/";
  return {
    plugins: [react(), tailwindcss()],
    base: base,
    define: {
      "import.meta.env.PKG_VERSION": JSON.stringify(pkg.version),
    },
  };
});
