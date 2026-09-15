import site from '../data/site'

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-paper-deep/40 py-12">
      <div className="container-page flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="5" cy="12" r="3.2" fill="var(--color-accent)" />
              <circle cx="19" cy="12" r="3.2" fill="var(--color-clay)" />
              <path d="M8.2 12h7.6" stroke="var(--color-ink-faint)" strokeWidth="1.6" />
            </svg>
            <span className="font-mono text-sm text-ink">Life Git</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-faint">
            本站为纯静态站点，由 Vite + React + Tailwind 构建。内容持续提交中。
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="section-label">Links</p>
          <div className="flex flex-wrap gap-2">
            {site.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="focus-ring text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-ink-faint">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>built with vite · react · tailwind</span>
      </div>
    </footer>
  )
}

export default Footer
