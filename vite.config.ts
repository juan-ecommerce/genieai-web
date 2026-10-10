import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createApiApp } from "./server/app.mjs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  cacheDir: resolve(tmpdir(), "genieai-web2-vite-cache"),
  plugins: [
    react(),
    {
      name: "genieai-api",
      configureServer(server) {
        server.middlewares.use(
          "/api",
          createApiApp({ ...process.env, ...loadEnv(mode, process.cwd(), "") }),
        );
      },
    },
  ],
}));
