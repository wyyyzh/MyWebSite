/**
 * ============================================================
 *  年度活跃度（主页那张「人生轨迹」热力图）
 * ============================================================
 *
 * 现在用的是真实数据：下面的日期来自 MyWebSite 仓库的 git 提交记录，
 * 数值是当天的提交次数。USE_MANUAL_DATA = true 表示以 manualData 为准。
 *
 * 以后想继续记，两种方式都行：
 *   1）往 manualData 里加一行：'2026-09-16': 3,
 *   2）把 USE_MANUAL_DATA 改回 false，用算法生成（只是好看，不是真的）
 *
 * 数值含义随你定义：提交几次代码、写了几篇笔记，
 * 甚至只是「今天很充实」都行。
 */

export const ACTIVITY_YEAR = 2026

export const USE_MANUAL_DATA = true

/** 手写数据：日期 -> 强度（0 表示当天无记录） */
export const manualData: Record<string, number> = {
  // 真实提交记录（来自 git log --pretty=format:"%ad" --date=short）
  '2026-09-15': 2,
}

export interface DayCell {
  /** YYYY-MM-DD */
  date: string
  /** 0 = 无记录，1-4 = 强度递增 */
  level: 0 | 1 | 2 | 3 | 4
  count: number
}

/** 稳定的伪随机（LCG），保证每次渲染结果一致 */
function createRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function levelOf(count: number): DayCell['level'] {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 4) return 2
  if (count <= 7) return 3
  return 4
}

/** 生成某一年 1/1 ~ 12/31 的每一天（示例模式用） */
function generateYear(year: number): DayCell[] {
  const rand = createRandom(year * 7919)
  const cells: DayCell[] = []
  const cursor = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)

  while (cursor <= end) {
    const iso = toISODate(cursor)
    const weekday = cursor.getDay()
    const isWeekend = weekday === 0 || weekday === 6

    // 周末概率低一些，中段月份活跃一些，让图看起来像真实节奏
    const base = isWeekend ? 0.35 : 0.72
    const monthBoost = 0.6 + 0.4 * Math.sin(((cursor.getMonth() + 1) / 12) * Math.PI)
    const active = rand() < base * monthBoost
    const count = active ? 1 + Math.floor(rand() * 8) : 0

    cells.push({ date: iso, level: levelOf(count), count })
    cursor.setDate(cursor.getDate() + 1)
  }
  return cells
}

/** 手写模式：把 manualData 铺满整年 */
function buildFromManual(year: number): DayCell[] {
  const cells: DayCell[] = []
  const cursor = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)
  while (cursor <= end) {
    const iso = toISODate(cursor)
    const count = manualData[iso] ?? 0
    cells.push({ date: iso, level: levelOf(count), count })
    cursor.setDate(cursor.getDate() + 1)
  }
  return cells
}

export const activityCells: DayCell[] = USE_MANUAL_DATA
  ? buildFromManual(ACTIVITY_YEAR)
  : generateYear(ACTIVITY_YEAR)

/** 全年有记录的天数，用于顶部统计 */
export const activeDays = activityCells.filter((c) => c.count > 0).length

export default activityCells
