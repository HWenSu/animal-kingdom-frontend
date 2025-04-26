import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 可選：如果有全局 SCSS 檔案（例如變數或 mixins），在此引入
        additionalData: `@import "@/style/variables.scss";`,
      },
    },
  },
});

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
