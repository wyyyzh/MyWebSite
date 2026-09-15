/**
 * ============================================================
 *  站点全局配置
 * ============================================================
 * 改完保存，浏览器会自动热更新，不用重启。
 *
 * ✅ 本文件已全部换成真实信息（来自你的 GitHub 与 git 提交记录）。
 *    只剩两处需要你按自己想法调整，已用 TODO 注释标出。
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
  /** 当前版本代号 */
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
  name: '夏不语',
  handle: 'wyyyzh',
  version: 'v0.2.0',
  versionName: '站点上线 · 一切刚起步',
  tagline: '我不是一个完成品。\n我是一段版本历史。',
  subtitle: '用 Git 的方式记录自己：每次提交都是一次更新，每次发布都是一个阶段。',
  // TODO: 换成你的真实身份，比如「前端开发者」「学生」「产品经理」
  role: '开发者',
  intro: [
    '你好，我是 夏不语。这个站点是 2026 年 9 月 15 日上线的个人主页，用 Vite + React 19 + TypeScript + Tailwind CSS 4 从零搭起来的，也是我第一个完全属于自己的站点。',
    '它的思路是把内容和展示彻底分开：所有文案都收在 `src/data/` 四个文件里，改文字不用碰任何组件代码，保存即热更新。1335 行源码、9 个组件，构建产物压缩后约 78KB。',
    '部署也是自动的：代码 push 到 GitHub，Actions 自动构建并发布到 GitHub Pages，没有后端要维护。这份 README 就是站点的一部分 —— 点开右侧抽屉看到的，和我仓库里的东西是同一套。',
  ],
  // TODO: 换成你现在真正在琢磨的问题（这是全站最有个人色彩的一句话）
  exploring: '怎么把散落的记录，沉淀成一条别人一眼能看懂的主线。',
  // 取自你 git 提交记录的作者邮箱，不想公开就删掉或换成别的
  email: '1753691858@qq.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/wyyyzh', external: true },
  ],
  readme: [
    '# README.md',
    '',
    '## 我是谁',
    'GitHub 上的 夏不语。这个主页是我自己搭的，用来集中放我写的东西。',
    '',
    '## 这个站点是怎么做的',
    '- Vite + React 19 + TypeScript + Tailwind CSS 4',
    '- 内容与展示分离：所有文案都在 src/data/ 下，四个文件',
    '- GitHub Actions 自动构建，发布到 GitHub Pages',
    '',
    '## 技术选择',
    '刻意没装任何动画库，进场效果用自写的 useInView + CSS 过渡实现，省下约 100KB 体积。',
    '设计上取的是纸质感：米色 #f7f3e8 打底，衬线标题配等宽字体的版本号，做成一份「可以滚动的简历」。',
    '',
    '## 怎么联系我',
    '邮箱 1753691858@qq.com，或者在 GitHub 上找我。',
  ],
}

export default site
