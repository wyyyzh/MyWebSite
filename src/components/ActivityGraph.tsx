import { useMemo, useState } from 'react'
import { ACTIVITY_YEAR, activeDays, activityCells, type DayCell } from '../data/activity'
import Reveal from './Reveal'

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const LEVEL_VAR = ['--color-lv0', '--color-lv1', '--color-lv2', '--color-lv3', '--color-lv4']

interface Tip {
  text: string
  x: number
  y: number
}

export function ActivityGraph() {
  const [tip, setTip] = useState<Tip | null>(null)

  const { weeks, monthLabels, stats } = useMemo(() => {
    const firstWeekday = new Date(ACTIVITY_YEAR, 0, 1).getDay() // 0=周日

    // 补上前导空格，让 1/1 落在正确的星期行上
    const padded: (DayCell | null)[] = [...Array(firstWeekday).fill(null), ...activityCells]
    while (padded.length % 7 !== 0) padded.push(null)

    const cols: (DayCell | null)[][] = []
    for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7))

    // 每月第一列打标签
    let lastMonth = -1
    const labels = cols.map((col) => {
      const first = col.find((c): c is DayCell => c !== null)
      if (!first) return ''
      const m = new Date(first.date).getMonth()
      if (m !== lastMonth) {
        lastMonth = m
        return MONTHS[m]
      }
      return ''
    })

    // 最长连续记录
    let best = 0
    let cur = 0
    activityCells.forEach((c) => {
      if (c.count > 0) {
        cur += 1
        best = Math.max(best, cur)
      } else {
        cur = 0
      }
    })

    return {
      weeks: cols,
      monthLabels: labels,
      stats: {
        activeDays,
        total: activityCells.reduce((s, c) => s + c.count, 0),
        streak: best,
      },
    }
  }, [])

  return (
    <section id="activity" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label mb-1.5">Activity</p>
              <h2 className="text-2xl sm:text-3xl">{ACTIVITY_YEAR} 年人生轨迹</h2>
            </div>
            <div className="flex gap-4 font-mono text-xs text-ink-faint">
              <span>
                <b className="text-base text-ink">{stats.activeDays}</b> 天有记录
              </span>
              <span>
                <b className="text-base text-ink">{stats.total}</b> 次提交
              </span>
              <span>
                最长连续 <b className="text-base text-ink">{stats.streak}</b> 天
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card overflow-x-auto p-5 sm:p-6">
            <div className="inline-block min-w-max">
              {/* 月份标签行 */}
              <div className="mb-1.5 grid grid-flow-col gap-[3px] pl-[34px]">
                {monthLabels.map((m, i) => (
                  <span key={i} className="w-[11px] font-mono text-[10px] text-ink-faint">
                    {m}
                  </span>
                ))}
              </div>

              <div className="flex gap-1.5">
                {/* 星期标签列 */}
                <div className="grid grid-rows-7 gap-[3px] pr-1.5">
                  {WEEKDAYS.map((d, i) => (
                    <span
                      key={d}
                      className="flex h-[11px] items-center justify-end font-mono text-[10px] leading-none text-ink-faint"
                    >
                      {i % 2 === 1 ? d.slice(1) : ''}
                    </span>
                  ))}
                </div>

                {/* 方块矩阵：一列 = 一周 */}
                <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                  {weeks.map((col, ci) =>
                    col.map((cell, ri) =>
                      cell === null ? (
                        <span key={`${ci}-${ri}`} className="h-[11px] w-[11px]" />
                      ) : (
                        <span
                          key={cell.date}
                          className="h-[11px] w-[11px] rounded-[2px] outline-offset-1 transition-transform hover:scale-125"
                          style={{ backgroundColor: `var(${LEVEL_VAR[cell.level]})` }}
                          onMouseEnter={(e) =>
                            setTip({
                              text: `${cell.date} · ${cell.count} 次`,
                              x: e.clientX,
                              y: e.clientY,
                            })
                          }
                          onMouseLeave={() => setTip(null)}
                        />
                      ),
                    ),
                  )}
                </div>
              </div>

              {/* 图例 */}
              <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] text-ink-faint">
                <span>少</span>
                {LEVEL_VAR.map((v) => (
                  <span
                    key={v}
                    className="h-[11px] w-[11px] rounded-[2px]"
                    style={{ backgroundColor: `var(${v})` }}
                  />
                ))}
                <span>多</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 跟随鼠标的提示气泡，放在最外层避免被滚动容器裁掉 */}
      {tip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2.5 py-1.5 font-mono text-[11px] text-paper shadow-lg"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          {tip.text}
        </div>
      )}
    </section>
  )
}

export default ActivityGraph
