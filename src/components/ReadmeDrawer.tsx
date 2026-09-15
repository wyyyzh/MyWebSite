import { useEffect } from 'react'
import site from '../data/site'

/** 极简 Markdown 渲染：只处理 # / ## / - / 空行，够 README 用 */
function renderLine(line: string, index: number) {
  if (line.startsWith('## ')) {
    return (
      <h3 key={index} className="mt-7 mb-2 font-serif text-lg text-ink">
        {line.slice(3)}
      </h3>
    )
  }
  if (line.startsWith('# ')) {
    return (
      <h2 key={index} className="mb-1 font-serif text-2xl text-ink">
        {line.slice(2)}
      </h2>
    )
  }
  if (line.startsWith('- ')) {
    return (
      <li key={index} className="mb-1.5 flex gap-2 text-[0.95rem] text-ink-soft">
        <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
        <span>{line.slice(2)}</span>
      </li>
    )
  }
  if (line.trim() === '') return <div key={index} className="h-2" />
  return (
    <p key={index} className="mb-1 text-[0.95rem] leading-relaxed text-ink-soft">
      {line}
    </p>
  )
}

export function ReadmeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // 打开时锁定背景滚动
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/25 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="README"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l border-line bg-paper-soft shadow-2xl transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="font-mono text-sm text-ink">/README.md</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="focus-ring rounded-full px-2.5 py-1 font-mono text-lg leading-none text-ink-faint transition-colors hover:bg-paper-deep hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {site.readme.map((line, i) => renderLine(line, i))}
        </div>

        <div className="border-t border-line px-6 py-4">
          <a
            href={`mailto:${site.email}`}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform hover:-translate-y-0.5"
          >
            给 {site.handle} 发邮件 →
          </a>
        </div>
      </aside>
    </>
  )
}

export default ReadmeDrawer
