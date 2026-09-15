/**
 * ============================================================
 *  简历数据 —— /resume 页面
 * ============================================================
 * ⚠️ 原则：只写真有的东西。
 *    目前能确认的内容来自你的 GitHub 与提交记录，其余位置留空。
 *    页面会把空的部分显示成「待补充」，而不是替你编一段。
 *
 * 填的时候注意：empty 数组会被页面识别为「未填写」并给出提示；
 * 如果某项你确实没有，删掉该条数组项即可，不要留空字符串。
 */

export interface EducationItem {
  school: string
  major: string
  period: string
  /** 学位，例如「本科」 */
  degree?: string
  detail?: string
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface AwardItem {
  title: string
  org: string
  date: string
  detail?: string
}

/** 教育背景 —— TODO: 请填写你的真实学校与专业 */
export const education: EducationItem[] = []

/** 获奖与其他 —— TODO: 有就填，没有就保持空数组 */
export const awards: AwardItem[] = []

/**
 * 技能清单
 * 已自动把 MyWebSite 用到的技术栈收录进去（真实来源：项目 tags）。
 * 剩下的按你实际掌握情况增删。
 */
export const skills: SkillGroup[] = [
  {
    group: '前端',
    // 真实来源：MyWebSite 项目的 tags
    items: ['TypeScript', 'React 19', 'Vite', 'Tailwind CSS 4'],
  },
  {
    group: '工程化',
    items: ['Git', 'GitHub Actions', 'CI/CD'],
  },
  {
    group: '嵌入式',
    // TODO: 确认后补全具体技能（如 C、STM32、RTOS…）
    items: [],
  },
]

export default { education, awards, skills }
