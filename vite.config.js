import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

export default defineConfig(({ mode }) => {
    const base =
        mode === "production"
            ? "https://usace.github.io/groundwork/"
            : "http://localhost:5173/";
    return {
        plugins: [react()],
        base: base,
        define: {
            "import.meta.env.PKG_VERSION": JSON.stringify(pkg.version),
        },
    };
});