/**
 * ProjectCard —— 项目卡片，全站在列表与首页精选处通用
 * 点击整张卡片进入详情页。
 */

import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import CoverArt from './CoverArt'

interface Props {
  project: Project
  /** 是否排期中的空项目：样式更淡，提示待补充 */
  compact?: boolean
}

const STATUS_STYLE: Record<Project['status'], { border: string; text: string; bg: string }> = {
  已上线: { border: 'border-accent/30', text: 'text-accent', bg: 'bg-accent-soft' },
  进行中: { border: 'border-clay/30', text: 'text-clay', bg: 'bg-clay-soft' },
  已归档: { border: 'border-line', text: 'text-ink-faint', bg: 'bg-paper' },
  构思中: { border: 'border-line', text: 'text-ink-faint', bg: 'bg-paper' },
}

export default function ProjectCard({ project, compact = false }: Props) {
  const hasContent = project.summary.length > 0
  const st = STATUS_STYLE[project.status]

  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full focus-ring rounded-[var(--radius-card)]">
      <article
        className={`card card-hover flex h-full flex-col overflow-hidden ${
          compact ? 'opacity-75' : ''
        }`}
      >
        {/* 封面：悬浮时缓慢放大，做出「贴上去看」的感觉 */}
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
          <div className="h-full w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]">
            <CoverArt seed={project.slug} mark={project.title.slice(0, 1)} className="h-full w-full" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex gap-2">
            <span className={`chip ${st.border} ${st.bg} ${st.text}`}>{project.status}</span>
            {project.visibility !== '公开' && (
              <span className="chip border-line bg-paper-soft/90 backdrop-blur">{project.visibility}</span>
            )}
          </div>

          <span className="absolute bottom-3 right-3 font-mono text-[11px] text-white/85">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-[19px] leading-snug transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{project.subtitle}</p>

          {hasContent ? (
            <ul className="mt-4 space-y-1.5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2 text-[13px] leading-relaxed text-ink-soft">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-lg border border-dashed border-line bg-paper px-3 py-2.5 text-[13px] text-ink-faint">
              内容整理中，稍后补充。
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-faint"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 底部推进式箭头，hover 时右移 */}
          <div className="mt-5 flex items-center gap-1.5 pt-1 font-mono text-[12px] text-ink-faint transition-colors group-hover:text-accent">
            <span>查看详情</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
