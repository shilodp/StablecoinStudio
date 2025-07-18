import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": "/src/assets",
            "@components": "/src/components",
            "@features": "/src/features",
            "@pages": "/src/pages",
            "@store": "/src/store",
            "@routes": "/src/routes",
            "@utils": "/src/utils",
        },
    },
});
