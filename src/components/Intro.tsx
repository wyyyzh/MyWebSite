import site from '../data/site'
import Reveal from './Reveal'

export function Intro() {
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

            <Reveal delay={site.intro.length * 90}>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-5 py-2.5 text-sm text-ink transition-colors hover:border-clay hover:text-clay"
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
