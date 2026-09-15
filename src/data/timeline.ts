/**
 * ============================================================
 *  人生版本历史（Timeline）
 * ============================================================
 * 每条是一次「发布」。type 决定时间线上的圆点颜色：
 *   major = 大版本（转岗、升学、创业等转折点）
 *   minor = 小版本（新项目、新技能）
 *   patch = 补丁（一次修复、一次复盘）
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
    version: 'v1.0.0',
    date: '2026.09',
    title: '这个站点上线',
    description: '把过去几年的散落记录，收敛成一条可持续更新的主线。',
    type: 'major',
  },
  {
    version: 'v0.9.0',
    date: '2026.07',
    title: '黑客松：48 小时做出语音 Agent 设备',
    description: '第一次把 Agent 装进实体硬件，验证了「先确认再执行」的交互假设。',
    type: 'minor',
  },
  {
    version: 'v0.8.2',
    date: '2026.04',
    title: '方法论沉淀：提示词即需求文档',
    description: '把做产品的拆解习惯迁移到提示词上，效果稳定性明显改善。',
    type: 'patch',
  },
  {
    version: 'v0.8.0',
    date: '2025.11',
    title: '转向 AI 产品方向',
    description: '开始系统性地把 AI 能力包装成可交付的产品形态，而不只是 demo。',
    type: 'major',
  },
  {
    version: 'v0.6.0',
    date: '2025.03',
    title: '第一版决策类小工具上线',
    description: '学会一件事：用户要的不是答案，是「为什么是这个答案」。',
    type: 'minor',
  },
  {
    version: 'v0.4.0',
    date: '2024.06',
    title: '完成第一个完整硬件产品',
    description: '从 0 到 1 定义产品、做调研、直到拿到融资。第一次理解「产品」两个字的重量。',
    type: 'major',
  },
]

export default releases
