// https://vite.dev/config/
import { defineConfig, loadEnv } from 'vite'
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

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, '', 'VITE_')
  return {
    plugins: [
      vue(),
      tailwindcss(),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve', // 开发环境才启用mock
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
      port: Number(env.VITE_SERVER_PORT) || 3736,
      strictPort: false,
      open: true,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8085',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 8088,
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
  }
})

// IconsResolver({
//   prefix: 'Icon',
//   enabledCollections: ['ep'],
// })
