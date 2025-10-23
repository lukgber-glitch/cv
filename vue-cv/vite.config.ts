import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // Use relative base so the built site works from the repo root (e.g., GitHub Pages)
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Ensure the dev server is reachable via localhost and LAN IP
  server: {
    host: true, // 0.0.0.0 - listen on all addresses
    port: 5173, // Vite default; matches our docs and expectations
    strictPort: true, // fail if 5173 is taken so you immediately see the conflict
    open: false,
  },
  // Make vite preview reachable the same way
  preview: {
    host: true,
    port: 4173, // Vite preview default
    strictPort: true,
    open: false,
  },
})
