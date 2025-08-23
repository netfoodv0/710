import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    force: true,
    include: [
      'react',
      'react-dom',
      'react-router-dom',

      'firebase/app',
      'firebase/firestore',
      'firebase/auth',
      'firebase/storage',
      'firebase/analytics',
      'lucide-react'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],

          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage', 'firebase/analytics']
        }
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true
    }
  }
})
