import { defineConfig, UserConfig } from "vite";
import { isDev, r } from "./scripts/utils";
import packageJson from "./package.json";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

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

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("components/index.ts"),
      name: packageJson.name,
    },
    rollupOptions: {
      external: ["react"],
      output: [
        {
          entryFileNames: "index.js",
          format: "es",
          dir: r("es"),
          extend: true,
          globals: {
            react: "React",
          },
        },
        {
          entryFileNames: "index.js",
          format: "cjs",
          dir: r("lib"),
          extend: true,
          globals: {
            react: "React",
          },
        },
        {
          entryFileNames: "index.min.js",
          format: "iife",
          extend: true,
          dir: "dist",
          name: packageJson.name,
          globals: {
            react: "React",
          },
        },
      ],
    },
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react(), dts({ include: [r("components")] })],
});
