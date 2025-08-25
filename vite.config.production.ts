import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Configuração específica para produção/Vercel
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
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    // Desabilita completamente o Rollup
    rollupOptions: undefined,
    esbuild: {
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    }
  },
  define: {
    global: 'globalThis',
  }
})
