/**
 * ProjectsPage —— 项目列表页 /projects
 * 支持按标签筛选与关键词搜索。数据都在前端，量不大，不需要后端接口。
 */

import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import projects from '../data/projects'

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string>('全部')
  const [query, setQuery] = useState('')

  // 标签及其出现次数
  const tags = useMemo(() => {
    const map = new Map<string, number>()
    projects.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)))
    return Array.from(map.entries())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchTag = activeTag === '全部' || p.tags.includes(activeTag)
      if (!matchTag) return false
      if (!q) return true
      return [p.title, p.subtitle, p.summary, p.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [activeTag, query])

  return (
    <>
      <PageHeader
        label="01 / Projects"
        title="项目"
        description="按背景、方法、结果、复盘四个段落记录的完整案例。悬停可以先扫一眼，点进去看全过程。"
        aside={
          <div className="text-right">
            <p className="font-mono text-3xl text-ink">{projects.length}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">total entries</p>
          </div>
        }
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          {/* 工具条：搜索 + 标签 */}
          <Reveal>
            <div className="mb-10 flex flex-col gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="搜索项目、技术栈…"
                    aria-label="搜索项目"
                    className="focus-ring w-full rounded-full border border-line bg-paper-soft py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent"
                  />
                </div>

                <p className="font-mono text-xs text-ink-faint">
                  显示 {filtered.length} / {projects.length}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['全部', ...tags.map(([t]) => t)].map((t) => {
                  const isActive = activeTag === t
                  const count = t === '全部' ? projects.length : tags.find(([n]) => n === t)?.[1]
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTag(t)}
                      className={`focus-ring rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
                        isActive
                          ? 'border-accent bg-accent-soft text-accent'
                          : 'border-line bg-paper-soft text-ink-soft hover:border-accent hover:text-accent'
                      }`}
                    >
                      {t}
                      <span className="ml-1.5 opacity-60">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 80, 240)}>
                  <ProjectCard project={p} compact={p.highlights.length === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card border-dashed p-12 text-center">
              <p className="font-mono text-sm text-ink-faint">没有匹配的项目</p>
              <p className="mt-2 text-sm text-ink-soft">换个关键词或标签试试。</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveTag('全部')
                }}
                className="focus-ring mt-5 rounded-full border border-line bg-paper-soft px-5 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                清空筛选
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
