import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.vue", "src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/main.ts", "e2e/**"],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
