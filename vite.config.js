import path from "path"
//Applicationsimport tailwindcss from "@tailwindcss/vite"
import tailwindcss from "tailwindcss"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
