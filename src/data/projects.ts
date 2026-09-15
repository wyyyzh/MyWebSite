/**
 * ============================================================
 *  项目列表 —— 主页「项目精华」区块的数据源
 * ============================================================
 * 每个对象就是一张卡片。highlights 是最多展示 3 条要点。
 * featured: true 的会出现在首页精选，其余点「查看全部」才展开。
 *
 * ⚠️ 本文件只收录你真实存在的项目。目前只有 MyWebSite 这一个
 *    （真实数据来自仓库本身的 git 历史与构建产物）。
 *    以后做完新东西，照着下面这个对象的格式往下加即可。
 */

export interface Project {
  id: string
  title: string
  summary: string
  highlights: string[]
  tags: string[]
  year: string
  /** 公开 / 私密 / 进行中 */
  visibility: '公开' | '私密' | '进行中'
  /** 是否首页精选 */
  featured: boolean
  /** 项目链接（留空则不显示按钮） */
  link?: string
}

export const projects: Project[] = [
  {
    id: 'my-website',
    title: 'MyWebSite · 我的第一个个人主页',
    summary:
      '这个站点本身：用 Vite + React 从零搭起来的静态个人主页，内容与展示分离，代码推上去就自动上线。',
    highlights: [
      '1335 行源码、9 个组件，构建产物 JS 压缩后约 78KB',
      '所有文案集中在 src/data/，改内容不用碰组件代码',
      'GitHub Actions 自动构建并发布到 GitHub Pages',
    ],
    tags: ['Vite', 'React', 'TypeScript', 'Tailwind CSS 4'],
    year: '2026',
    visibility: '进行中',
    featured: true,
    link: 'https://github.com/wyyyzh/MyWebSite',
  },
  {
    id: 'test',
    title: '嵌入式 · 我的大学专业',
    summary:
      '稍后再说。',
    highlights: [
      '1335 行源码、9 个组件，构建产物 JS 压缩后约 78KB',
      '所有文案集中在 src/data/，改内容不用碰组件代码',
      'GitHub Actions 自动构建并发布到 GitHub Pages',
    ],
    tags: ['Vite', 'React', 'TypeScript', 'Tailwind CSS 4'],
    year: '2026',
    visibility: '进行中',
    featured: true,
    link: 'https://github.com/wyyyzh/MyWebSite',
  },
]

export default projects
