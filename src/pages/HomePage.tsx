/**
 * HomePage —— 首页
 * 按「先说人话，再上证据」的顺序组织：
 * 标语 → 栏目入口 → 提交轨迹 → 自我介绍 → 精选项目 → 最近更新 → 版本历史 → 联系
 */

import { Link } from 'react-router-dom'
import ActivityGraph from '../components/ActivityGraph'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import Timeline from '../components/Timeline'
import { featuredProjects, projects } from '../data/projects'
import releases from '../data/releases'
import site from '../data/site'

/** 首页四个栏目入口 */
const SECTIONS = [
  {
    to: '/projects',
    label: '项目',
    count: `${projects.length} 个`,
    desc: '完整记录：背景、方法、结果与复盘',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M9 9v11" />
      </>
    ),
  },
  {
    to: '/resume',
    label: '简历',
    count: site.version,
    desc: '一页看完经历、技能与教育背景',
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  {
    to: '/timeline',
    label: '时间线',
    count: 'Changelog',
    desc: '人生阶段的版本历史',
    icon: (
      <>
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M12 8.5v1.5M12 14.5v1.5" />
      </>
    ),
  },
  {
    to: '/release',
    label: '更新',
    count: releases[0]?.version ?? '—',
    desc: '这个站点本身的发版日志',
    icon: (
      <>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 19h16" />
      </>
    ),
  },
]

export default function HomePage() {
  const latest = releases[0]

  return (
    <>
      <Hero />

      {/* ── 栏目入口 ───────────────────────────────── */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <p className="section-label mb-4">Index / 目录</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.to} delay={i * 60}>
                <Link to={s.to} className="group block">
                  <div className="card card-hover h-full p-5">
                    <div className="flex items-start justify-between">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      >
                        {s.icon}
                      </svg>
                      <span className="font-mono text-[11px] text-ink-faint">{s.count}</span>
                    </div>
                    <h3 className="mt-4 text-[17px] transition-colors group-hover:text-accent">
                      {s.label}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">{s.desc}</p>
                    <span className="mt-3 inline-block font-mono text-[12px] text-ink-faint transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ActivityGraph />
      <Intro />

      {/* ── 精选项目 ───────────────────────────────── */}
      <section id="projects" className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label mb-1.5">Selected work</p>
                <h2 className="text-2xl sm:text-3xl">项目精华</h2>
                <p className="mt-2 text-ink-soft">点开任意一张，看它从头到尾怎么走完。</p>
              </div>
              <Link
                to="/projects"
                className="focus-ring font-mono text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                查看全部项目 →
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 最近更新 ───────────────────────────────── */}
      {latest && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <div className="card overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper-deep/60 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="chip border-accent/30 bg-accent-soft text-accent">
                      {latest.version}
                    </span>
                    <span className="font-mono text-xs text-ink-faint">{latest.date}</span>
                  </div>
                  <span className="chip">{latest.type}</span>
                </div>
                <div className="px-6 py-5">
                  <h3 className="text-lg">{latest.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {latest.changes.slice(0, 4).map((c) => (
                      <li key={c} className="flex gap-2 text-[14px] leading-relaxed text-ink-soft">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/release"
                    className="focus-ring mt-5 inline-block font-mono text-[13px] text-ink-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    查看完整发版记录 →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Timeline limit={3} />

      {/* ── 联系 ──────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <Reveal>
            <div className="card p-8 text-center sm:p-12">
              <p className="section-label mb-3">Get in touch</p>
              <h2 className="text-2xl sm:text-3xl">有什么想聊的？</h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                无论是合作、招人，还是单纯想聊聊某个想法，都可以找到我。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
                  >
                    发邮件
                    <span aria-hidden="true">→</span>
                  </a>
                )}
                {site.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
