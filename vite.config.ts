import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 纯静态站点：构建产物全部落在 dist/，可直接托管到任意静态空间
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    // 想让 npm run dev 后自动开浏览器，把下一行改成 open: true
    open: false,
  },
})
