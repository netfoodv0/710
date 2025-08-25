import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Configuração específica para o Vercel - Sem Rollup
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
    // Força uso do esbuild
    esbuild: {
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    },
    // Configurações adicionais para evitar Rollup
    lib: undefined,
    ssr: false
  },
  define: {
    global: 'globalThis',
  },
  // Configurações específicas para evitar Rollup
  plugins: [
    react(),
    {
      name: 'disable-rollup',
      configResolved(config) {
        // Força configurações que evitam Rollup
        config.build.rollupOptions = undefined;
        config.build.minify = 'esbuild';
      }
    }
  ]
})
