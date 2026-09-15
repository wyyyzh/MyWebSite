import { useEffect, useState } from 'react'
import site from '../data/site'

const NAV_ITEMS = [
  { label: '轨迹', href: '#activity' },
  { label: '关于', href: '#intro' },
  { label: '项目', href: '#projects' },
  { label: '版本', href: '#timeline' },
]

export function Nav({ onOpenReadme }: { onOpenReadme: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="focus-ring flex items-center gap-2.5 rounded">
          {/* Logo 图形：三个提交节点 */}
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="5" cy="12" r="3.2" fill="var(--color-accent)" />
            <circle cx="19" cy="12" r="3.2" fill="var(--color-clay)" />
            <path d="M8.2 12h7.6" stroke="var(--color-ink-faint)" strokeWidth="1.6" />
          </svg>
          <span className="font-mono text-sm tracking-tight text-ink">Life Git</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenReadme}
            className="focus-ring chip transition-colors hover:border-accent hover:text-accent"
          >
            /README.md
          </button>

          <span className="chip border-accent/30 bg-accent-soft text-accent">{site.version}</span>
        </div>
      </div>
    </header>
  )
}

export default Nav
