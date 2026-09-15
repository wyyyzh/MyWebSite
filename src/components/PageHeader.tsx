/**
 * PageHeader —— 子页面统一的标题区
 * 用法：<PageHeader label="01 / 项目" title="..." description="..." />
 */

import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface Props {
  label: string
  title: string
  description?: string
  /** 右侧附加内容，例如统计数字或操作按钮 */
  aside?: ReactNode
}

export default function PageHeader({ label, title, description, aside }: Props) {
  return (
    <header className="border-b border-line bg-paper-soft/60">
      <div className="container-page pt-32 pb-14 md:pt-36 md:pb-16">
        <Reveal>
          <p className="section-label">{label}</p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl leading-tight md:text-[46px]">{title}</h1>
              {description && (
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft md:text-base">
                  {description}
                </p>
              )}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </div>
        </Reveal>
      </div>
    </header>
  )
}
