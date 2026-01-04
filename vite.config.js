import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用source map生成(生产环境可关闭以减小体积)
    sourcemap: false,
    // 最小化输出
    minify: 'terser',
    // Terser配置
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true // 移除debugger
      }
    },
    rollupOptions: {
      output: {
        // 更稳定的代码分割策略
        manualChunks: (id) => {
          // node_modules包分割
          if (id.includes('node_modules')) {
            // Vue核心库 + Element Plus（避免循环依赖）
            if (id.includes('vue') || id.includes('pinia') ||
                id.includes('element-plus') || id.includes('@element-plus')) {
              return 'vue-core'
            }
            // Vue Router
            if (id.includes('vue-router')) {
              return 'router'
            }
            // 其他第三方库
            return 'vendor'
          }
        },
        // 资源文件命名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `media/[name]-[hash][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`
          }
          if (/\.(css)(\?.*)?$/i.test(assetInfo.name)) {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    // 提高警告阈值，避免不必要的报警
    chunkSizeWarningLimit: 1000,
    // 资源内联阈值
    assetsInlineLimit: 4096
  }
})

