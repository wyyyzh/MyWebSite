import { Link } from 'react-router-dom'
import projects from '../data/projects'
import site from '../data/site'
import HoverPreview from './HoverPreview'
import Reveal from './Reveal'

export function Intro() {
  // 正在推进或已落地的项目，作为正文下方的内联入口
  const active = projects.filter((p) => p.status === '进行中' || p.status === '已上线')
  return (
    <section id="intro" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <div>
              <p className="section-label mb-1.5">Introduction</p>
              <h2 className="text-2xl sm:text-3xl">你好，我是 {site.handle}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {site.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="focus-ring chip transition-colors hover:border-accent hover:text-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            {site.intro.map((para, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-lg leading-[1.9] text-ink-soft">{para}</p>
              </Reveal>
            ))}

            {active.length > 0 && (
              <Reveal delay={site.intro.length * 90 + 60}>
                <div className="mt-8 border-t border-line-soft pt-6">
                  <p className="section-label mb-3">Now working on</p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[15px] text-ink-faint">
                    {active.map((p, i) => (
                      <span key={p.id} className="inline-flex items-center gap-2">
                        {i > 0 && <span className="text-line">·</span>}
                        {/* 悬停 0.2 秒后浮出预览卡，点击进详情页 */}
                        <HoverPreview
                          data={{
                            title: p.title,
                            subtitle: p.subtitle,
                            summary: p.summary,
                            tags: p.tags,
                            meta: p.year,
                            status: p.status,
                          }}
                        >
                          <Link
                            to={`/projects/${p.slug}`}
                            className="focus-ring rounded text-ink decoration-accent/40 decoration-dotted underline-offset-4 transition-colors hover:text-accent hover:underline"
                          >
                            {p.title}
                          </Link>
                        </HoverPreview>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={site.intro.length * 90}>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-5 py-2.5 text-sm text-ink transition-colors hover:border-clay hover:text-clay"
              >
                一起做点东西 →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
