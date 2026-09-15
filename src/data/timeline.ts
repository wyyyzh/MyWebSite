/**
 * ============================================================
 *  人生版本历史（Timeline）
 * ============================================================
 * 每条是一次「发布」。type 决定时间线上的圆点颜色：
 *   major = 大版本（上线、转岗、升学等转折点）
 *   minor = 小版本（新项目、新技能）
 *   patch = 补丁（一次修复、一次复盘）
 *
 * ⚠️ 下面两条是真实发生过的事，日期取自 MyWebSite 仓库的 git 记录。
 *    以后的里程碑照着格式往上加（新的放最前面，页面从上往下倒序展示）。
 */

export interface Release {
  version: string
  date: string
  title: string
  description: string
  type: 'major' | 'minor' | 'patch'
}

export const releases: Release[] = [
  {
    version: 'v0.2.0',
    date: '2026.09.15',
    title: '站点上线到 GitHub Pages',
    description:
      '推送后 GitHub Actions 自动完成构建，https://wyyyzh.github.io/MyWebSite/ 首次可访问。从提交到上线不用手动部署。',
    type: 'major',
  },
  {
    version: 'v0.1.0',
    date: '2026.09.15',
    title: 'MyWebSite 仓库建立',
    description:
      '用 Vite + React 19 + TypeScript + Tailwind CSS 4 搭起骨架，完成首次 git 提交（4a5e493）。',
    type: 'minor',
  },
]

export default releases
