import { loadEnvConfig } from "@next/env";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

loadEnvConfig(process.cwd());

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    clearMocks: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": "/",
    },
  },
});
