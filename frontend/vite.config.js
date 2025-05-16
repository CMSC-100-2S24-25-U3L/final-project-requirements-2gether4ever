import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/product': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/user-transaction': 'http://localhost:3000',
    },
  },
});