/**
 * ============================================================
 *  项目列表 —— 主页「项目精华」区块的数据源
 * ============================================================
 * 每个对象就是一张卡片。highlights 是最多展示 3 条要点。
 * featured: true 的会出现在首页精选，其余点「查看全部」才展开。
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
    id: 'life-git',
    title: 'Life Git · 人生版本控制',
    summary:
      '这个站点本身：让创作记录、项目里程碑和公开展示连成同一条可持续更新的生命线。',
    highlights: [
      '内容驱动展示，不依赖一次性搬运',
      '可持续更新：新内容直接归档到主页',
      '纯静态部署，零后端维护成本',
    ],
    tags: ['产品', '个人品牌', 'Vite'],
    year: '2026',
    visibility: '公开',
    featured: true,
    link: 'https://github.com/your-id/life-git',
  },
  {
    id: 'agent-device',
    title: '语音 Agent 实体设备',
    summary:
      '把一个会听、会理解、会行动的 Agent 装进实体设备：先语音理解意图，再在屏幕上确认，最后才执行。',
    highlights: [
      '主流程：语音识别 + Touch UI + 触发执行',
      '加入确认机制，显著减少误操作',
      '48 小时黑客松内完成可演示原型',
    ],
    tags: ['Agent', '硬件', '黑客松'],
    year: '2026',
    visibility: '公开',
    featured: true,
  },
  {
    id: 'prompt-reverse',
    title: 'Prompt Reverse',
    summary:
      '把提示词当作「产品需求文档」来处理：先定位目标，再拆解上下文、约束和预期，避免一次成型才发现效果不稳定。',
    highlights: [
      '结构化拆解任意提示词',
      '给出可执行的优化建议',
      '沉淀可复用的提示词模板',
    ],
    tags: ['Prompt', '工具', 'LLM'],
    year: '2025',
    visibility: '公开',
    featured: true,
  },
  {
    id: 'decision-engine',
    title: 'Coffee Decision',
    summary: '把「挑咖啡」变成可量化的决策，不是只给推荐，而是给出不同目标下的选择逻辑。',
    highlights: [
      '三种目标模式：清醒、预算、健康',
      '多平台价格对比与透明逻辑',
      '可解释输出：为什么这个更适合你',
    ],
    tags: ['决策', '数据', '小工具'],
    year: '2025',
    visibility: '公开',
    featured: true,
  },
  {
    id: 'rebuild-3d',
    title: '植物三维重建',
    summary: '把课程项目做成可复用方法库：从传感器采集、重建算法到展示流程的全链路记录。',
    highlights: [
      'RGB-D 数据采集与配准流程',
      '绿植三维重建可视化',
      '实验迭代与交付文档汇总',
    ],
    tags: ['CV', '三维重建', '课程'],
    year: '2024',
    visibility: '公开',
    featured: false,
  },
  {
    id: 'following-pd',
    title: '长期跟进主题库',
    summary: '放置「长期跟进主题」的主入口，按季度更新学习计划，对外展示可直接从这里扩展。',
    highlights: ['产品观察与学习方向归档', '每季度更新学习计划', '对外展示的统一出口'],
    tags: ['知识库', '长期'],
    year: '2024',
    visibility: '进行中',
    featured: false,
  },
]

export default projects
