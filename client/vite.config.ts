import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),

    // process.env.NODE_ENV === "development" &&
    istanbul({
      include: "src/**",
      exclude: ["node_modules", "test/", "**/*.test.ts", "**/*.spec.ts"],
      extension: [".ts", ".tsx"],
    }),
  ],
});
