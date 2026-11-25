import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@nexy": fileURLToPath(new URL("./__nexy__/src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/client/**/*.test.{ts,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.venv/**",
      "**/__nexy__/**",
      "**/*.d.ts",
      "vite.config.ts",
      "vitest.config.ts",
    ],
    setupFiles: ["./tests/client/setup.ts"],
  },
});
