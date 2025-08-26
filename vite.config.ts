import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    chunkSizeWarningLimit: 800,
    // Configuração conservadora para evitar problemas
    cssCodeSplit: false,
    reportCompressedSize: true,
    emptyOutDir: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
      treeshake: false, // Desabilita tree-shaking para debug
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: ['@vite/client', '@vite/env'],
    force: true,
  },
  // Configurações de esbuild mais conservadoras
  esbuild: {
    treeShaking: false, // Desabilita tree-shaking para debug
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
});
