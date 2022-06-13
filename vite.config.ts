import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

function renderChunks(dependencies: Record<string, string>) {
  const chunks: {
    [key: string]: unknown;
  } = {};
  Object.keys(dependencies).forEach((key) => {
    if (["react", "react-dom", "react-router-dom", "firebase"].includes(key))
      return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  server: {
    port: 2000,
    hmr: {
      clientPort: 443
    }
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/analytics", "firebase/auth"],
          ...renderChunks(dependencies)
        }
      }
    }
  }
});
