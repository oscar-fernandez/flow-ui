import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "src/utils/testSetup.js",
    watch: false,
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "./src/models",
      "./src/data",
      "./src/utils/testSetup.js",
    ],
    coverage: {
      reporter: ["lcov"],
    },
  },
});
