import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()]
        }
    },
    publicDir: false,
    build: {
        lib: {
            name: "GroundworkWater",
            fileName: (format) => `groundwork-water.${format}.js`,
            entry: "./lib/index.jsx",
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ["react", "react-dom", "@tanstack/react-query", "ol", "plotly.js-basic-dist"],
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
})