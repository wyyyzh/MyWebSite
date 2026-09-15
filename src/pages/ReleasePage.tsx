/**
 * ReleasePage —— 站点本身的发版日志 /release
 * 数据来自 src/data/releases.ts，每次改动一条安装 reinterpret commit 号即可。
 */

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import releases, { type Release } from '../data/releases'

const TYPE_STYLE: Record<Release['type'], { border: string; text: string; bg: string }> = {
  特性: { border: 'border-accent/30', text: 'text-accent', bg: 'bg-accent-soft' },
  修复: { border: 'border-clay/30', text: 'text-clay', bg: 'bg-clay-soft' },
  文档: { border: 'border-line', text: 'text-ink-soft', bg: 'bg-paper' },
  重构: { border: 'border-clay/30', text: 'text-clay', bg: 'bg-clay-soft' },
}

export default function ReleasePage() {
  return (
    <>
      <PageHeader
        label="02 / Release notes"
        title="更新日志"
        description="这个站点本身的版本记录。每次有意义的改动都会留一条。"
        aside={
          <div className="text-right">
            <p className="font-mono text-3xl text-ink">{releases.length}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">releases</p>
          </div>
        }
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <ol className="relative ml-[7px] border-l border-line pl-7 sm:pl-9">
            {releases.map((r, i) => {
              const st = TYPE_STYLE[r.type]
              return (
                <Reveal key={r.version} as="li" delay={Math.min(i * 70, 280)} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/15 sm:-left-[41px]" />

                  <div className="card overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper-deep/50 px-5 py-3.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[15px] text-ink">{r.version}</span>
                        <span className={`chip ${st.border} ${st.bg} ${st.text}`}>{r.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ink-faint">{r.date}</span>
                        {r.commit && (
                          <span className="font-mono text-[11px] text-ink-faint">#{r.commit}</span>
                        )}
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      <h3 className="text-[18px]">{r.title}</h3>
                      <ul className="mt-3.5 space-y-2">
                        {r.changes.map((c) => (
                          <li key={c} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>
    </>
  )
}
