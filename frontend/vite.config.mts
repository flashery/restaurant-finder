import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore – no types available, safe to ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ 
    plugins: [react(), tailwindcss()],
});
  