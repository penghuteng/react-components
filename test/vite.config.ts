import { defineConfig } from "vite";
import { isDev, port, r } from "../scripts/utils";
import { sharedConfig } from "../vite.config";

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost",
    },
  },
  build: {
    target: "esnext",
    watch: isDev ? {} : undefined,
    outDir: r("dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    rollupOptions: {
      input: r("test/index.html"),
      output: {
        manualChunks: {},
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}));
