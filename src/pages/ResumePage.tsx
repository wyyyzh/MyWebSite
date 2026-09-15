/**
 * ResumePage —— 简历页 /resume
 *
 * 项目经历由 src/data/projects.ts 自动生成，改那里这里就跟着变；
 * 技能与教育背景来自 src/data/resume.ts。
 * 未填的部分会显示「待补充」提示，而不是留一堆假话。
 */

import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import projects from '../data/projects'
import { awards, education, skills } from '../data/resume'
import site from '../data/site'

function EmptyHint({ children }: { children: string }) {
  return (
    <p className="rounded-lg border border-dashed border-line bg-paper px-4 py-3 text-[13px] text-ink-faint">
      {children}
    </p>
  )
}

export default function ResumePage() {
  return (
    <>
      <PageHeader
        label="03 / Resume"
        title={site.name}
        description={`${site.role} · ${site.handle}`}
        aside={
          <button
            type="button"
            onClick={() => window.print()}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent print:hidden"
          >
            保存为 PDF
            <span aria-hidden="true">↗</span>
          </button>
        }
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
            {/* 左栏：经历 */}
            <div className="min-w-0 space-y-14">
              {/* 项目经历 */}
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl">项目经历</h2>
                  {projects.length > 0 ? (
                    <div className="space-y-5">
                      {projects.map((p) => (
                        <div key={p.id} className="card p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <Link
                                to={`/projects/${p.slug}`}
                                className="focus-ring text-[17px] text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                              >
                                {p.title}
                              </Link>
                              <p className="mt-0.5 text-[13px] text-ink-faint">{p.role}</p>
                            </div>
                            <span className="font-mono text-xs text-ink-faint">{p.period}</span>
                          </div>

                          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{p.summary}</p>

                          {p.highlights.length > 0 && (
                            <ul className="mt-3.5 space-y-1.5">
                              {p.highlights.map((h) => (
                                <li key={h} className="flex gap-2 text-[13.5px] leading-relaxed text-ink-soft">
                                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyHint>还没有可展示的项目。</EmptyHint>
                  )}
                </div>
              </Reveal>

              {/* 教育背景 */}
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl">教育背景</h2>
                  {education.length > 0 ? (
                    <div className="space-y-5">
                      {education.map((e) => (
                        <div key={e.school} className="card p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-[17px] text-ink">{e.school}</p>
                              <p className="mt-0.5 text-[13px] text-ink-faint">
                                {e.major}
                                {e.degree ? ` · ${e.degree}` : ''}
                              </p>
                            </div>
                            <span className="font-mono text-xs text-ink-faint">{e.period}</span>
                          </div>
                          {e.detail && (
                            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{e.detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyHint>待补充：在 src/data/resume.ts 的 education 数组里填入学校、专业与起止时间。</EmptyHint>
                  )}
                </div>
              </Reveal>

              {/* 获奖 */}
              <Reveal>
                <div>
                  <h2 className="mb-5 text-2xl">获奖与其他</h2>
                  {awards.length > 0 ? (
                    <div className="space-y-3">
                      {awards.map((a) => (
                        <div key={a.title} className="card p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <p className="text-[16px] text-ink">{a.title}</p>
                            <span className="font-mono text-xs text-ink-faint">{a.date}</span>
                          </div>
                          <p className="mt-1 text-[13px] text-ink-faint">{a.org}</p>
                          {a.detail && (
                            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{a.detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyHint>待补充：有竞赛奖项、奖学金或证书时填到 resume.ts 的 awards 里。</EmptyHint>
                  )}
                </div>
              </Reveal>
            </div>

            {/* 右栏：技能与联系 */}
            <aside className="space-y-10">
              <Reveal delay={80}>
                <div className="card p-6 lg:sticky lg:top-28">
                  <h2 className="mb-5 font-mono text-sm tracking-widest text-ink-faint">SKILLS</h2>
                  <div className="space-y-5">
                    {skills.map((g) => (
                      <div key={g.group}>
                        <p className="mb-2 text-[13px] text-ink">{g.group}</p>
                        {g.items.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {g.items.map((i) => (
                              <span
                                key={i}
                                className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-soft"
                              >
                                {i}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[12px] text-ink-faint">待补充</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-line-soft pt-5">
                    <h2 className="mb-3 font-mono text-sm tracking-widest text-ink-faint">CONTACT</h2>
                    <div className="space-y-2 text-[13px]">
                      {site.email && (
                        <a
                          href={`mailto:${site.email}`}
                          className="focus-ring block break-all text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {site.email}
                        </a>
                      )}
                      {site.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={l.external ? '_blank' : undefined}
                          rel={l.external ? 'noreferrer' : undefined}
                          className="focus-ring block break-all text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {l.href.replace('https://', '')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
