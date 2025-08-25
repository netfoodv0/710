import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // ou 'sunburst', 'network', 'raw-data'
      title: 'Bundle Analysis - iFood Dashboard',
      projectRoot: resolve(__dirname),
      metadata: {
        buildTime: new Date().toISOString(),
        version: '1.0.0',
        environment: 'production'
      },
      // Análise detalhada
      detailed: true,
      // Incluir node_modules
      includeNodeModules: true,
    }),
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
    // Otimizações avançadas
    cssCodeSplit: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    // Otimizações de CSS
    cssMinify: true,
    // Otimizações de assets
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks básicos
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/i.test(assetInfo.name)) {
            return `img/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      external: [],
      // Tree shaking mais agressivo
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/firestore',
      'firebase/auth',
      'firebase/storage',
    ],
    exclude: ['@vite/client', '@vite/env'],
    force: true,
  },
  // Configurações de esbuild para tree shaking
  esbuild: {
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
});
