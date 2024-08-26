import { defineConfig, UserConfig } from "vite";
import { isDev, r } from "./scripts/utils";
import packageJson from "./package.json";

export const sharedConfig: UserConfig = {
  root: r("test"),
  resolve: {
    alias: {
      "@/component": `${r("component")}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
};

export default defineConfig(({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("components/index.ts"),
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        extend: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
