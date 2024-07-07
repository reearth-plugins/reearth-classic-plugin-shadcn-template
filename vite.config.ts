import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";

import pkg from "./package.json";

const pluginName = "ReearthDemoPlugin";
const IS_DEV_MODE = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  mode: IS_DEV_MODE ? "development" : "production",
  plugins: [react()],
  define: {
    "process.env.VERSION": JSON.stringify(pkg.version),
  },
  build: {
    minify: IS_DEV_MODE ? false : "esbuild",
    lib: {
      name: `ReearthBuiltInPlugin_${pluginName}`,
      formats: ["es"],
      entry: "./src/extensions/demo/main/main.tsx",
      fileName: () => `${pluginName}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
