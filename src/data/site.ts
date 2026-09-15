/**
 * ============================================================
 *  站点全局配置 —— 你最需要改的文件（之一）
 * ============================================================
 * 改完保存，浏览器会自动热更新，不用重启。
 */

export interface LinkItem {
  label: string
  href: string
  /** 外链会自动带 target="_blank" */
  external?: boolean
}

export interface SiteConfig {
  /** 姓名 */
  name: string
  /** 昵称/代号，用于 Hero 大标题 */
  handle: string
  /** 当前人生版本号，右上角和 Hero 都会显示 */
  version: string
  /** 当前版本代号，例如 "在当前公司负责 AI 产品" */
  versionName: string
  /** Hero 主标语（一句话讲清你是谁） */
  tagline: string
  /** Hero 副标语 */
  subtitle: string
  /** 职业身份 */
  role: string
  /** 自我介绍段落，支持多段 */
  intro: string[]
  /** 你现在正在探索的问题 */
  exploring: string
  /** 邮箱 */
  email: string
  /** 底部/导航的外链 */
  links: LinkItem[]
  /** README 抽屉内容：每行一个字符串，支持简单标记 */
  readme: string[]
}

export const site: SiteConfig = {
  name: '林知远',
  handle: '知远',
  version: 'v1.0.0',
  versionName: '独立开发 · 寻找下一个问题',
  tagline: '我不是一个完成品。\n我是一段版本历史。',
  subtitle: '用 Git 的方式记录人生：每次提交都是一次更新，每次发布都是一个阶段。',
  role: 'AI 产品经理 / 独立开发者',
  intro: [
    '你好，我是知远。我把自己的经历当成一份持续维护的仓库：项目是提交，阶段是发布，走过的弯路是回滚。',
    '过去几年我一直在做同一件事 —— 把一个模糊的想法，拆成能被真实用户用起来的东西。从硬件机器人到 AI Agent，载体在变，方法没变。',
    '这个站点就是那份仓库的公开索引。它不会「完成」，只会不断有新版本。',
  ],
  exploring: '当 AI 能完成大部分执行工作后，「判断做什么」这件事还剩下多少属于人？',
  email: 'hello@example.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/your-id', external: true },
    { label: 'X / 推特', href: 'https://x.com/your-id', external: true },
    { label: '即刻', href: 'https://okjike.com/u/your-id', external: true },
    { label: '邮箱', href: 'mailto:hello@example.com' },
  ],
  readme: [
    '# README.md',
    '',
    '## 我是谁',
    '一名把「做东西」当成主要学习方式的 AI 产品经理。',
    '',
    '## 我擅长什么',
    '- 从 0 到 1 定义产品：需求拆解、用户研究、竞品调研',
    '- 把 AI 能力包装成可交付的产品形态，而不只是 demo',
    '- 快速原型：能在几天内把想法变成能点、能用的东西',
    '',
    '## 我在找什么',
    '一个有真实用户、真实约束的问题，以及愿意一起把它做出来的人。',
    '',
    '## 怎么联系我',
    '发邮件是最快的方式。附上你想聊的事，我一般一天内回。',
  ],
}

export default site
