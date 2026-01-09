import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 部署在域名根路径时，资源前缀使用 "/"
  base: "/",
  assetsInclude: ["**/*.glb"],
});
