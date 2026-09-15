import site from '../data/site'
import Reveal from './Reveal'

export function Hero() {
  const lines = site.tagline.split('\n')

  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-page">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
          {/* 左：主标语 */}
          <div>
            <Reveal>
              <div className="mb-7 flex flex-wrap items-center gap-2">
                <span className="chip border-accent/30 bg-accent-soft text-accent">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  当前版本 {site.version}
                </span>
                <span className="chip">{site.versionName}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="mb-4 font-mono text-sm tracking-widest text-ink-faint">
                {site.role.toUpperCase()}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="text-[2.6rem] leading-[1.18] sm:text-6xl">
                {lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                    {i === lines.length - 1 && (
                      <span className="ml-1 inline-block h-[1em] w-[0.5ch] translate-y-[0.1em] animate-pulse bg-accent align-middle" />
                    )}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-7 max-w-xl text-lg text-ink-soft">{site.subtitle}</p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#intro"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
                >
                  阅读自我介绍
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#projects"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  查看全部项目
                </a>
              </div>
            </Reveal>
          </div>

          {/* 右：正在探索的问题 */}
          <Reveal delay={360}>
            <aside className="card card-hover p-6">
              <p className="section-label mb-3">Now exploring</p>
              <p className="font-serif text-xl leading-relaxed text-ink">「{site.exploring}」</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line-soft pt-4">
                <span className="chip">{site.name}</span>
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring font-mono text-xs text-ink-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Hero
