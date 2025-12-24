// https://vite.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      watchFiles: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(__dirname, 'src/auto-imports.d.ts'),
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: path.resolve(__dirname, 'src/components.d.ts'),
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css',
        }),
      ],
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3736,
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'vue',
            'vue-router',
            'pinia',
            'axios',
            'element-plus',
            '@element-plus/icons-vue',
            'nprogress',
            'pinia-plugin-persistedstate',
            '@vueuse/core',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})

// IconsResolver({
//   prefix: 'Icon',
//   enabledCollections: ['ep'],
// })
