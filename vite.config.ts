import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isVercelBuild = process.env.VITE_FORCE_ESBUILD === 'true'
  
  return {
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
      minify: isVercelBuild ? 'esbuild' : 'esbuild',
      sourcemap: false,
      rollupOptions: isVercelBuild ? undefined : {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage', 'firebase/analytics']
          }
        }
      },
      esbuild: {
        target: 'es2020',
        supported: {
          'top-level-await': true
        }
      }
    },
    define: {
      global: 'globalThis',
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: true,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '.ngrok-free.app',
        '238908da5360.ngrok-free.app'
      ],
      watch: {
        usePolling: true
      }
    }
  }
})
