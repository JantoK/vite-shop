import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname),
  alias: [
    {
      find: "/@",
      replacement: path.resolve(__dirname, './src')
    }
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `@import "./src/styles/index.scss";`,
      }
    }
  },
  server: {
    open: false,
    cors: true,
    proxy: {
      '/api': {
        target: ' http://mock.51y.cc:81/mock/6000f462151bfc02d3ba69cf/api',
        changeOrigin: true
      }
    }
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        strict: true,
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            const expansions: any[] = [];
            if (expansions.some(exp => id.includes(`/node_modules/${exp}`))) {
              return 'expansion'
            } else {
              return 'vendor'
            }
          }
        }
      }
    }
  },
})
