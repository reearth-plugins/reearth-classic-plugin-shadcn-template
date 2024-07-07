import path from "path";

import { defineConfig } from "vite";

const extensionName = process.env.EXTENSION_NAME || "";

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "../dist"),
    emptyOutDir: false,
    lib: {
      formats: ["iife"],
      entry: path.resolve(
        __dirname,
        "../src/extensions",
        extensionName,
        `${extensionName}.ts`
      ),
      name: `${extensionName}`,
      fileName: () => `${extensionName}.js`,
    },
  },
  resolve: {
    alias: {
      "@distui": path.resolve(__dirname, "../dist-ui"),
    },
  },
});
