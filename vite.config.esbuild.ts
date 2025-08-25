import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Configuração que força esbuild e evita Rollup completamente
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
    // Configurações específicas para esbuild
    esbuild: {
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    },
    // Configurações para evitar Rollup
    lib: false,
    ssr: false,
    emptyOutDir: true,
    reportCompressedSize: false,
    // Força configurações que evitam Rollup
    rollupOptions: false,
    // Configurações adicionais para esbuild
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false
  },
  define: {
    global: 'globalThis',
  },
  // Plugin personalizado para forçar esbuild
  plugins: [
    react(),
    {
      name: 'force-esbuild-only',
      configResolved(config) {
        // Força configurações que evitam Rollup
        config.build.rollupOptions = false;
        config.build.minify = 'esbuild';
        config.build.lib = false;
        config.build.ssr = false;
        
        // Log para debug
        console.log('🔧 Configuração forçada: esbuild ativo, Rollup completamente desabilitado');
      }
    }
  ]
})
