/**
 * Footer —— 全站页脚
 * 内部页面用 Link 跳转，外链才用 <a>。
 * 打印时整块隐藏（class="no-print"）。
 */

import { Link } from 'react-router-dom'
import site from '../data/site'

const SITEMAP = [
  { to: '/projects', label: '项目' },
  { to: '/resume', label: '简历' },
  { to: '/timeline', label: '时间线' },
  { to: '/release', label: '更新日志' },
  { to: '/readme', label: 'README' },
]

export function Footer() {
  return (
    <footer className="no-print mt-8 border-t border-line bg-paper-deep/40 py-12">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="5" cy="12" r="3.2" fill="var(--color-accent)" />
              <circle cx="19" cy="12" r="3.2" fill="var(--color-clay)" />
              <path d="M8.2 12h7.6" stroke="var(--color-ink-faint)" strokeWidth="1.6" />
            </svg>
            <span className="font-mono text-sm text-ink">{site.handle}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-faint">
            纯静态站点，由 Vite + React + Tailwind 构建。内容持续提交中。
          </p>
        </div>

        <div>
          <p className="section-label">Sitemap</p>
          <nav className="mt-3 flex flex-col gap-2">
            {SITEMAP.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="focus-ring w-fit text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="section-label">Links</p>
          <div className="mt-3 flex flex-col gap-2">
            {site.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="focus-ring w-fit text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {l.label}
              </a>
            ))}
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="focus-ring w-fit break-all text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {site.email}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 font-mono text-xs text-ink-faint">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>built with vite · react · tailwind</span>
      </div>
    </footer>
  )
}

export default Footer
