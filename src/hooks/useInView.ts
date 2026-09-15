import { useEffect, useRef, useState } from 'react'

interface InViewOptions {
  /** 元素露出多少比例时触发，默认 0.15 */
  threshold?: number
  /** 提前/延后触发的边距 */
  rootMargin?: string
  /** 只触发一次（默认 true，进场动画通常只需要一次） */
  once?: boolean
}

/**
 * 监听元素是否进入视口，用于「滚动到哪、动画到哪」的进场效果。
 * 用法：<div ref={ref} className={inView ? 'reveal is-visible' : 'reveal'} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: InViewOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 老浏览器兜底：直接显示，不做动画
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}

export default useInView
