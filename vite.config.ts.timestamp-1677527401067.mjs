// vite.config.ts
import { defineConfig } from "file:///C:/Users/959062/FLOW/enablement-ui/node_modules/vitest/dist/config.js";
import { loadEnv } from "file:///C:/Users/959062/FLOW/enablement-ui/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/959062/FLOW/enablement-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      chunkSizeWarningLimit: 700,
    },
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
          "./src/components/SideBarItems/customHooks.ts",
        ],
        reporter: ["text", "lcov"],
      },
    },
  };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw5NTkwNjJcXFxcRkxPV1xcXFxlbmFibGVtZW50LXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw5NTkwNjJcXFxcRkxPV1xcXFxlbmFibGVtZW50LXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy85NTkwNjIvRkxPVy9lbmFibGVtZW50LXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIjtcclxuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIC8vaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy8jZGVmaW5lXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcclxuICByZXR1cm4ge1xyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA3MDAsXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIFwicHJvY2Vzcy5lbnYuVklURV9FTkFCTEVNRU5UX0ZFTVNcIjogYFwiJHtlbnYuVklURV9FTkFCTEVNRU5UX0ZFTVN9XCJgLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcclxuICAgICAgc2V0dXBGaWxlczogXCJzcmMvdXRpbHMvdGVzdFNldHVwLmpzXCIsXHJcbiAgICAgIHdhdGNoOiBmYWxzZSxcclxuICAgICAgY292ZXJhZ2U6IHtcclxuICAgICAgICBwcm92aWRlcjogXCJpc3RhbmJ1bFwiLFxyXG4gICAgICAgIGFsbDogdHJ1ZSxcclxuICAgICAgICBpbmNsdWRlOiBbXCJzcmMvKiovKi50c3hcIiwgXCJzcmMvKiovKi50c1wiXSxcclxuICAgICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgICBcIioqL25vZGVfbW9kdWxlcy8qKlwiLFxyXG4gICAgICAgICAgXCJzcmMvZGF0YS8qKlwiLFxyXG4gICAgICAgICAgXCJzcmMvbW9kZWxzLyoqXCIsXHJcbiAgICAgICAgICBcInNyYy91dGlscy90ZXN0U2V0dXAuanNcIixcclxuICAgICAgICAgIFwic3JjL21haW4udHN4XCIsXHJcbiAgICAgICAgICBcInNyYy9jb21wb25lbnRzL0RhdGVwaWNrZXJDb21wb25lbnQvKipcIixcclxuICAgICAgICAgIFwiLi9zcmMvY29tcG9uZW50cy9TaWRlQmFySXRlbXMvY3VzdG9tSG9va3MudHNcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlcG9ydGVyOiBbXCJ0ZXh0XCIsIFwibGNvdlwiXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1MsU0FBUyxvQkFBb0I7QUFDL1QsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sV0FBVztBQUNsQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBRWpELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sb0NBQW9DLElBQUksSUFBSTtBQUFBLElBQzlDO0FBQUEsSUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLFFBQ1IsVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLFFBQ0wsU0FBUyxDQUFDLGdCQUFnQixhQUFhO0FBQUEsUUFDdkMsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxVQUFVLENBQUMsUUFBUSxNQUFNO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
