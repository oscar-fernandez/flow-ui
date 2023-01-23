import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ command, mode }) => {
  //https://vitejs.dev/config/#define
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_ENABLEMENT_FEMS": `"${env.VITE_ENABLEMENT_FEMS}"`,
    },
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: "src/utils/testSetup.js",
      watch: false,
      coverage: {
        provider: "istanbul",
        all: true,
        include: ["src/**/*.tsx", "src/**/*.ts"],
        exclude: [
          "**/node_modules/**",
          "src/data/**",
          "src/models/**",
          "src/utils/testSetup.js",
          "src/main.tsx",
          "src/components/DatepickerComponent/**",
          "src/components/SideBarItems/ColMenuItem/**", //temp, need to add tests but dif issue
          "./src/components/SideBarItems/customHooks.ts",
        ],
        reporter: ["text", "lcov"],
      },
    },
  };
});
