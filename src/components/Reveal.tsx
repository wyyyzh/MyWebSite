import type { ElementType, ReactNode } from 'react'
import useInView from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** 延迟毫秒数，用来做列表的错落进场 */
  delay?: number
  className?: string
  as?: ElementType
}

/** 包一层就自带「滚动进入视口时淡入上浮」的效果 */
export function Reveal({ children, delay = 0, className = '', as }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
