/**
 * ReadmePage —— /readme
 * 把 site.ts 里的 readme 数组渲染成一个像 README 的页面。
 * 做了一个很轻的标记解析：# 标题、## 二级标题、- 列表、`行内代码`。
 */

import { Fragment, type ReactNode } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import site from '../data/site'

/** 处理行内 `code` 标记 */
function renderInline(text: string): ReactNode[] {
  const parts = text.split('`')
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[0.88em] text-accent"
      >
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** 把连续若干行按类型聚合成块 */
function parse(lines: string[]) {
  const blocks: { type: 'h1' | 'h2' | 'list' | 'p'; items: string[] }[] = []

  lines.forEach((raw) => {
    const line = raw.trimEnd()
    if (!line.trim()) return

    if (line.startsWith('# ')) blocks.push({ type: 'h1', items: [line.slice(2)] })
    else if (line.startsWith('## ')) blocks.push({ type: 'h2', items: [line.slice(3)] })
    else if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1]
      if (last?.type === 'list') last.items.push(line.slice(2))
      else blocks.push({ type: 'list', items: [line.slice(2)] })
    } else {
      const last = blocks[blocks.length - 1]
      if (last?.type === 'p') last.items.push(line)
      else blocks.push({ type: 'p', items: [line] })
    }
  })

  return blocks
}

export default function ReadmePage() {
  const blocks = parse(site.readme)

  return (
    <>
      <PageHeader
        label="05 / README.md"
        title="README"
        description="这个站点是怎么搭起来的、做了哪些取舍。改这段内容请编辑 src/data/site.ts 的 readme 字段。"
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-line bg-paper-soft p-7 sm:p-10">
              {blocks.map((b, i) => {
                if (b.type === 'h1') {
                  return (
                    <h2 key={i} className="mt-8 border-b border-line pb-3 font-mono text-2xl first:mt-0">
                      {renderInline(b.items[0])}
                    </h2>
                  )
                }
                if (b.type === 'h2') {
                  return (
                    <h3 key={i} className="mt-9 font-mono text-[13px] tracking-widest text-accent">
                      {renderInline(b.items[0])}
                    </h3>
                  )
                }
                if (b.type === 'list') {
                  return (
                    <ul key={i} className="mt-4 space-y-2">
                      {b.items.map((it, j) => (
                        <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{renderInline(it)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="mt-4 text-[14.5px] leading-[1.9] text-ink-soft">
                    {b.items.map((it, j) => (
                      <Fragment key={j}>
                        {j > 0 && <br />}
                        {renderInline(it)}
                      </Fragment>
                    ))}
                  </p>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
