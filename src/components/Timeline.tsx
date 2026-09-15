import releases, { type Release } from '../data/timeline'
import Reveal from './Reveal'

const DOT_STYLE: Record<Release['type'], string> = {
  major: 'bg-accent ring-accent/20',
  minor: 'bg-clay ring-clay/20',
  patch: 'bg-ink-faint ring-ink-faint/20',
}

const TYPE_LABEL: Record<Release['type'], string> = {
  major: '大版本',
  minor: '小版本',
  patch: '补丁',
}

interface Props {
  /** 只显示最近几条，首页用；不传则显示全部 */
  limit?: number
  /** 是否显示标题区，子页面自带 PageHeader 时可关掉 */
  showHeader?: boolean
}

export function Timeline({ limit, showHeader = true }: Props) {
  const list = limit ? releases.slice(0, limit) : releases

  return (
    <section id="timeline" className="py-16 sm:py-20">
      <div className="container-page">
        {showHeader && (
          <Reveal>
            <div className="mb-9">
              <p className="section-label mb-1.5">Changelog</p>
              <h2 className="text-2xl sm:text-3xl">版本历史</h2>
              <p className="mt-2 text-ink-soft">每一次转折，都留了一个 tag。</p>
            </div>
          </Reveal>
        )}

        <ol className="relative ml-[7px] border-l border-line pl-7">
          {list.map((r, i) => (
            <Reveal key={r.version} as="li" delay={i * 70} className="relative pb-9 last:pb-0">
              <span
                className={`absolute -left-[35px] top-1.5 h-3 w-3 rounded-full ring-4 ${DOT_STYLE[r.type]}`}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-ink">{r.version}</span>
                <span className="chip">{TYPE_LABEL[r.type]}</span>
                <span className="font-mono text-xs text-ink-faint">{r.date}</span>
              </div>
              <h3 className="mt-2 text-lg">{r.title}</h3>
              <p className="mt-1 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
                {r.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Timeline
