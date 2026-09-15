import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * 纯静态站点：构建产物全部落在 dist/，可直接托管到任意静态空间。
 *
 * 关于 base（部署路径）：
 *   - 部署到 GitHub Pages 子路径（https://xxx.github.io/MyWebSite/）→ 必须是 '/MyWebSite/'
 *   - 部署到根域名（https://yourname.com/）            → 设为 '/'
 *
 * 不用改这个文件，构建时用环境变量临时覆盖即可：
 *   BASE_PATH=/ npm run build
 */
export default defineConfig(({ command, mode }) => {
  // 第二个参数传 '.' 会相对于当前工作目录解析，避免依赖 node 类型定义
  const env = loadEnv(mode, '.', '')

  // 本地开发跑在根路径（localhost:5173/ 直接访问），
  // 打包时默认按 GitHub Pages 的子路径输出，可直接上传部署。
  // 想改成根域名部署：BASE_PATH=/ npm run build
  const base = env.BASE_PATH ?? (command === 'serve' ? '/' : '/MyWebSite/')

  return {
    plugins: [react(), tailwindcss()],
    base,
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
  }
})
