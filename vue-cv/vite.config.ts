import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
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
    port: 5183, // align with root scripts
    strictPort: true, // fail if 5183 is taken so you immediately see the conflict
    open: false,
  },
  // Make vite preview reachable the same way
  preview: {
    host: true,
    port: 5183,
    strictPort: true,
    open: false,
  },
})
