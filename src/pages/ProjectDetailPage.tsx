/**
 * ProjectDetailPage —— 项目详情页 /projects/:slug
 *
 * 布局：
 *   顶部封面 + 标题 + 元信息
 *   正文（背景/方法/结果/复盘）在左，目录在右（窄屏自动收起）
 *   底部是文件结构、后续计划、上下篇导航
 *
 * slug 找不到对应项目时，渲染站内 404 提示而不是崩溃。
 */

import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CoverArt from '../components/CoverArt'
import Reveal from '../components/Reveal'
import { getProjectBySlug, getProjectNeighbors } from '../data/projects'

const KIND_ICON: Record<string, { color: string; label: string }> = {
  folder: { color: 'text-clay', label: 'DIR' },
  code: { color: 'text-accent', label: 'TS' },
  markdown: { color: 'text-ink-faint', label: 'MD' },
  image: { color: 'text-clay', label: 'IMG' },
  config: { color: 'text-ink-faint', label: 'CFG' },
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const neighbors = useMemo(() => (slug ? getProjectNeighbors(slug) : { prev: undefined, next: undefined }), [slug])

  const sections = project?.sections ?? []
  const [activeSection, setActiveSection] = useState(0)

  // 滚动时高亮右侧目录当前项
  useEffect(() => {
    if (sections.length === 0) return
    const targets = sections.map((_, i) => document.getElementById(`sec-${i}`)).filter(Boolean) as HTMLElement[]
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const idx = Number(visible[0].target.id.replace('sec-', ''))
          setActiveSection(idx)
        }
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: 0 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [sections.length, slug])

  if (!project) {
    return (
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-40 text-center">
        <p className="font-mono text-sm text-ink-faint">404 / project not found</p>
        <h1 className="mt-4 text-3xl">没有这个项目</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          地址 <code className="font-mono text-sm">/projects/{slug}</code> 没有对应内容，可能链接过期了。
        </p>
        <Link
          to="/projects"
          className="focus-ring mt-8 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
        >
          回到项目列表
        </Link>
      </section>
    )
  }

  return (
    <article className="pb-24">
      {/* ── 封面与标题 ─────────────────────────────── */}
      <div className="pt-20">
        <div className="container-page mb-8 pt-6">
          <Link
            to="/projects"
            className="focus-ring font-mono text-[13px] text-ink-faint transition-colors hover:text-accent"
          >
            ← 返回项目列表
          </Link>
        </div>

        <div className="container-page">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.coverAlt ?? project.title}
                className="aspect-[21/9] w-full object-cover"
              />
            ) : (
              <CoverArt seed={project.slug} className="aspect-[21/9] w-full" />
            )}
          </div>

          <Reveal>
            <div className="mt-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-accent/30 bg-accent-soft text-accent">{project.status}</span>
                <span className="chip">{project.visibility}</span>
                <span className="chip">{project.year}</span>
              </div>

              <h1 className="mt-5 text-4xl leading-tight md:text-[46px]">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">{project.subtitle}</p>

              {/* 元信息栏 */}
              <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-line py-6 sm:grid-cols-3">
                {[
                  { k: 'Role', v: project.role },
                  { k: 'Period', v: project.period },
                  { k: 'Stack', v: project.tags.join(' · ') },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="section-label">{row.k}</dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{row.v}</dd>
                  </div>
                ))}
              </dl>

              {/* 数据栏 */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="card p-4 text-center">
                      <p className="font-serif text-2xl text-accent">{m.value}</p>
                      <p className="mt-1 font-mono text-[11px] text-ink-faint">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 外链 */}
              {(project.repoUrl || project.demoUrl) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform hover:-translate-y-0.5"
                    >
                      访问线上站点 <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      查看源码 <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 正文 + 目录 ────────────────────────────── */}
      <div className="container-page mt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_200px]">
          {/* 左：正文 */}
          <div className="min-w-0">
            {sections.length > 0 ? (
              sections.map((s, i) => (
                <Reveal key={s.heading} delay={i * 60}>
                  <section id={`sec-${i}`} className="mb-12 scroll-mt-24 last:mb-0">
                    <h2 className="mb-4 flex items-center gap-3 text-2xl">
                      <span className="font-mono text-sm text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.heading}
                    </h2>
                    <p className="whitespace-pre-line text-[15px] leading-[1.9] text-ink-soft">
                      {s.body}
                    </p>
                  </section>
                </Reveal>
              ))
            ) : (
              <p className="rounded-[var(--radius-card)] border border-dashed border-line bg-paper-soft p-8 text-center text-[15px] text-ink-faint">
                这个项目的完整记录还在整理中，很快补上。
              </p>
            )}

            {/* 要点清单 */}
            {project.highlights.length > 0 && (
              <Reveal>
                <div className="card mt-12 bg-accent-soft/40 p-6">
                  <p className="section-label mb-4 text-accent">Key points</p>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* 文件结构 */}
            {project.files && project.files.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <h2 className="mb-4 text-2xl">文件结构</h2>
                  <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-soft">
                    {project.files.map((f, i) => {
                      const icon = KIND_ICON[f.kind] ?? KIND_ICON.code
                      return (
                        <div
                          key={f.path}
                          className={`flex items-center gap-3 px-4 py-3 ${
                            i > 0 ? 'border-t border-line-soft' : ''
                          }`}
                        >
                          <span className={`w-9 shrink-0 font-mono text-[11px] ${icon.color}`}>
                            {icon.label}
                          </span>
                          <span className="font-mono text-[13px] text-ink">{f.path}</span>
                          {f.note && (
                            <span className="hidden flex-1 truncate text-[13px] text-ink-faint sm:block">
                              {f.note}
                            </span>
                          )}
                          {f.size && (
                            <span className="ml-auto shrink-0 font-mono text-[11px] text-ink-faint">
                              {f.size}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )}

            {/* 后续计划 */}
            {project.nextSteps && project.nextSteps.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <h2 className="mb-4 text-2xl">接下来</h2>
                  <ul className="space-y-3">
                    {project.nextSteps.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 rounded-lg border border-line bg-paper-soft px-4 py-3 text-[14px] leading-relaxed text-ink-soft"
                      >
                        <span className="font-mono text-xs text-clay">TODO</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* 右：目录 */}
          {sections.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="section-label mb-3">Contents</p>
                <nav className="border-l border-line">
                  {sections.map((s, i) => (
                    <a
                      key={s.heading}
                      href={`#sec-${i}`}
                      className={`-ml-px block border-l-2 py-2 pl-4 text-[13px] leading-snug transition-colors ${
                        activeSection === i
                          ? 'border-accent text-accent'
                          : 'border-transparent text-ink-faint hover:text-ink'
                      }`}
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── 上下篇 ─────────────────────────────────── */}
      <div className="container-page mt-20">
        <div className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {neighbors.prev ? (
            <Link to={`/projects/${neighbors.prev.slug}`} className="group focus-ring rounded">
              <div className="card card-hover p-5">
                <span className="font-mono text-[11px] text-ink-faint">← 上一个</span>
                <p className="mt-2 text-[16px] transition-colors group-hover:text-accent">
                  {neighbors.prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {neighbors.next && (
            <Link to={`/projects/${neighbors.next.slug}`} className="group focus-ring rounded sm:text-right">
              <div className="card card-hover p-5">
                <span className="font-mono text-[11px] text-ink-faint">下一个 →</span>
                <p className="mt-2 text-[16px] transition-colors group-hover:text-accent">
                  {neighbors.next.title}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
