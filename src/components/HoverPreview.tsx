/**
 * HoverPreview —— 悬停预览卡（Hovercard）
 * --------------------------------------
 * 鼠标停在某个链接或卡片上，稍作停顿就会悬浮出一张概览卡，
 * 显示标题、一句话摘要和标签，便于先扫一眼再决定点不点进去。
 *
 * 实现要点：
 *  1. 用 Portal 挂到 body，避免被父元素的 overflow / z-index 裁掉
 *  2. 位置基于触发器 rect 计算，靠近视口边缘时自动翻转，不会出界
 *  3. 延迟 180ms 出现、120ms 消失：快速划过时不会闪
 *  4. 触屏与窄屏自动关闭（手机上没有 hover 状态）
 *  5. Esc 可关闭，滚动立即收起
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface HoverPreviewData {
  title: string
  subtitle?: string
  summary?: string
  tags?: string[]
  meta?: string
  status?: string
}

const CARD_W = 330
const EST_H = 230
const OPEN_DELAY = 180
const CLOSE_DELAY = 120

interface Props {
  data: HoverPreviewData
  children: ReactNode
}

export default function HoverPreview({ data, children }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [floating, setFloating] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [enabled, setEnabled] = useState(true)

  // 只有「真的有鼠标」的设备才启用
  useEffect(() => {
    const check = () => {
      const fine =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        window.innerWidth >= 768
      setEnabled(fine)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const computePos = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()

    // 默认贴在触发器正下方，超出右边界则靠右，超出下边界则翻到上方
    let left = r.left
    if (left + CARD_W > window.innerWidth - 12) left = window.innerWidth - 12 - CARD_W
    if (left < 12) left = 12

    let top = r.bottom + 10
    if (top + EST_H > window.innerHeight - 12) {
      top = r.top - EST_H - 10
      if (top < 12) top = 12
    }

    setPos({ top, left })
  }, [])

  const scheduleOpen = () => {
    if (!enabled) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      computePos()
      setOpen(true)
      // 下一帧再把 CSS 过渡触发出来，得到淡入上浮的效果
      requestAnimationFrame(() => setFloating(true))
    }, OPEN_DELAY)
  }

  const scheduleClose = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setFloating(false)
      setOpen(false)
    }, CLOSE_DELAY)
  }

  // 滚动、缩放、Esc 都收起
  useEffect(() => {
    if (!open) return
    const close = () => {
      setFloating(false)
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <>
      <span
        ref={wrapRef}
        className="inline-block"
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
      >
        {children}
      </span>

      {open &&
        enabled &&
        createPortal(
          <div
            role="tooltip"
            className={`pointer-events-none fixed z-[80] w-[330px] max-w-[calc(100vw-24px)] rounded-[var(--radius-card)] border border-line bg-paper-soft p-4 shadow-[0_20px_45px_-20px_rgba(33,31,28,0.45)] transition-[opacity,transform] duration-200 ease-out ${
              floating ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            }`}
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] tracking-wide text-accent">{data.meta}</span>
              {data.status && (
                <span className="chip !border-clay/30 !bg-clay-soft !px-2 !py-0.5 !text-[11px] !text-clay">
                  {data.status}
                </span>
              )}
            </div>

            <h4 className="font-serif text-[17px] leading-snug text-ink">{data.title}</h4>
            {data.subtitle && (
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{data.subtitle}</p>
            )}
            {data.summary && (
              <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">
                {data.summary}
              </p>
            )}

            {data.tags && data.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {data.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-faint"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-3 border-t border-line-soft pt-2.5 font-mono text-[11px] text-ink-faint">
              点击查看完整记录 →
            </p>
          </div>,
          document.body,
        )}
    </>
  )
}
