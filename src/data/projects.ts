/**
 * ============================================================
 *  项目列表 —— 全站唯一的项目数据源
 * ============================================================
 * 首页精选、/projects 列表页、/projects/:slug 详情页都从这里取数。
 *
 * 新增一个项目：复制下面任意一个对象，改掉字段即可，不用碰任何组件。
 * ⚠️ slug 一旦上线不要改，否则分享出去的旧链接会 404。
 */

import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'my-website',
    slug: 'my-website',
    title: 'MyWebSite',
    subtitle: '把一个人的经历，做成可以持续更新的版本历史',
    summary:
      '这个站点本身。用一个静态主页承载自我介绍、项目履历与提交轨迹，内容和展示彻底分离 —— 改文案不用碰代码，推上 GitHub 自动发布。',
    highlights: [
      'Vite + React 19 + TypeScript + Tailwind 4 + React Router，产物 JS 压缩后约 100KB',
      '8 个页面路由：项目列表、详情页、简历、时间线、发版日志、README',
      '全部文案集中在 src/data/，新增项目只改数据不改组件',
      'GitHub Actions 自动构建，推送后约 60 秒上线',
    ],
    tags: ['Vite', 'React', 'React Router', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'],
    year: '2026',
    period: '2026.09 — 至今',
    role: '全栈（自己动手）',
    status: '已上线',
    visibility: '公开',
    featured: true,
    repoUrl: 'https://github.com/wyyyzh/MyWebSite',
    demoUrl: 'https://wyyyzh.github.io/MyWebSite/',
    metrics: [
      { label: '技术栈', value: 'React 19' },
      { label: '构建工具', value: 'Vite 6' },
      { label: '页面路由', value: '8 个' },
    ],
    sections: [
      {
        heading: '为什么要做',
        body: '代码有版本历史，每一次改动都留得下证据。但一个人做过的事情、想过的问题，大多散落在聊天记录和各种平台里，时间一长自己也说不清。所以想做这样一个地方：把散落的记录收敛到同一条主线上，别人点进来一眼能看懂，自己也知道下一版该往哪改。',
      },
      {
        heading: '怎么做的',
        body: '刻意分成三层。最底下是 src/data/ 里的纯数据，中间是 index.css 的设计变量，最上面才是组件。日常更新只碰数据层，99% 的改动不会引入 bug。发布会走 GitHub Actions：推送触发构建，产物自动部署到 GitHub Pages，全程不需要手动操作。',
      },
      {
        heading: '过程中的取舍',
        body: '没有引入任何第三方动画库。进场动画用 IntersectionObserver 配合 CSS 过渡自己写的，几十行代码换来的是不用为一个翻页效果背上几百 KB 的依赖。另一个决定是坚持相对路径 base，这样将来换域名托管不用重新构建。',
      },
      {
        heading: '复盘',
        body: '最大的收获是认识到「能不能长期维护」比「第一版多好看」重要得多。一个两年后不敢碰的站点，等于没有。所以结构优先于视觉，能自动化的绝不手动。',
      },
    ],
    files: [
      { path: 'src/data/', kind: 'folder', note: '所有文案与配置，日常只改这里' },
      { path: 'src/data/site.ts', kind: 'code', note: '站点主配置：姓名、标语、联系方式', size: '约 90 行' },
      { path: 'src/data/projects.ts', kind: 'code', note: '项目数据源', size: '约 150 行' },
      { path: 'src/data/releases.ts', kind: 'code', note: '发版记录', size: '约 60 行' },
      { path: 'src/pages/', kind: 'folder', note: '每个路由一个页面组件' },
      { path: 'src/components/', kind: 'folder', note: '可复用区块与交互组件' },
      { path: 'src/index.css', kind: 'code', note: '设计变量与全站基础样式' },
      { path: '.github/workflows/deploy.yml', kind: 'config', note: '推送自动构建发布' },
      { path: 'docs/', kind: 'folder', note: '部署与协作文档' },
    ],
    nextSteps: [
      '把博客 / 写作单独拆成一个可检索的栏目',
      '热力图改成从 GitHub API 实时拉取提交数据',
      '补一张真实的项目封面图，替换现在的渐变占位',
    ],
  },
  {
    id: 'embedded',
    slug: 'embedded',
    title: '嵌入式 · 大学专业',
    subtitle: '与硬件打交道的那部分训练',
    summary: '本科阶段的嵌入式方向学习。具体做过的内容还在整理，先把这块地方占下来。',
    highlights: [],
    tags: ['嵌入式'],
    year: '进行中',
    period: '待补充',
    role: '学生',
    status: '构思中',
    visibility: '部分公开',
    featured: false,
    metrics: [],
    sections: [],
    files: [],
    nextSteps: ['整理课程里做过的硬件实验与实际项目'],
  },
]

/** 精选项目：首页展示，其余进 /projects 列表 */
export const featuredProjects = projects.filter((p) => p.featured)

/** 给详情页用：按 slug 查，找不到返回 undefined 由页面处理 404 */
export function getProjectBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return projects.find((p) => p.slug === slug)
}

/** 详情页底部的「上一篇 / 下一篇」 */
export function getProjectNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  }
}

export type { Project }
export default projects
