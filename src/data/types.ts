/**
 * 全站数据模型定义
 * ----------------
 * 改数据结构先看这里。所有页面都从这些接口取字段。
 */

/** 项目详情页里的一段正文，例如「背景」「方法」「结果」 */
export interface ProjectSection {
  heading: string
  body: string
}

/** 项目里的一个文件条目（用于详情页的文件树预览） */
export interface ProjectFile {
  path: string
  /** 决定图标样式与是否可预览 */
  kind: 'code' | 'markdown' | 'image' | 'config' | 'folder'
  /** 一句话说明这个文件干什么用 */
  note?: string
  /** 行数或体积的展示文案，例如 "312 行" / "76 KB" */
  size?: string
}

/** 关键指标，详情页顶部那条数据栏 */
export interface ProjectMetric {
  label: string
  value: string
}

/** 落地与收获里的一张图 */
export interface GalleryImage {
  src: string
  caption: string
}

export type ProjectStatus = '进行中' | '已上线' | '已归档' | '构思中'
export type Visibility = '公开' | '部分公开' | '私密'

export interface Project {
  /** 稳定标识，不参与 URL，改了不影响外链 */
  id: string
  /** URL 片段：/projects/<slug>，一旦上线就不要改，否则旧链接失效 */
  slug: string
  title: string
  /** 一句话副标题，显示在标题下方 */
  subtitle: string
  /** 列表卡与预览卡上显示的摘要 */
  summary: string
  /** 列表卡片最多展示 3 条 */
  highlights: string[]
  tags: string[]
  year: string
  /** 起止时间，例如 "2026.09 — 至今" */
  period: string
  /** 你在这个项目里扮演的角色 */
  role: string
  status: ProjectStatus
  visibility: Visibility
  /** 是否出现在首页精选区 */
  featured: boolean
  repoUrl?: string
  demoUrl?: string
  /** 封面图，放在 public/ 下填 "/xxx.png"，留空则用渐变占位 */
  coverImage?: string
  /** 封面图的替代文案（无障碍用） */
  coverAlt?: string
  metrics?: ProjectMetric[]
  /** 详情页正文段落 */
  sections?: ProjectSection[]
  files?: ProjectFile[]
  gallery?: GalleryImage[]
  /** 接下来打算做什么 */
  nextSteps?: string[]
}
