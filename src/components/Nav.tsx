/**
 * Nav —— 全站顶栏
 * 现在走真实路由跳转，当前页面对应的项会高亮。
 * 桌面端横向铺开，窄屏折叠成菜单。
 */

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import site from '../data/site'

const NAV_ITEMS = [
  { to: '/projects', label: '项目' },
  { to: '/resume', label: '简历' },
  { to: '/timeline', label: '时间线' },
  { to: '/release', label: '更新' },
  { to: '/readme', label: 'README.md' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 换页自动收起移动端菜单
  useEffect(() => setMenuOpen(false), [location.pathname])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `focus-ring rounded-full px-3 py-1.5 text-sm transition-colors ${
      isActive ? 'bg-paper-deep text-ink' : 'text-ink-soft hover:bg-paper-deep hover:text-ink'
    }`

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-line bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="focus-ring flex items-center gap-2.5 rounded">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="5" cy="12" r="3.2" fill="var(--color-accent)" />
            <circle cx="19" cy="12" r="3.2" fill="var(--color-clay)" />
            <path d="M8.2 12h7.6" stroke="var(--color-ink-faint)" strokeWidth="1.6" />
          </svg>
          <span className="font-mono text-sm tracking-tight text-ink">{site.handle}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <span className="chip hidden border-accent/30 bg-accent-soft text-accent sm:inline-flex">
            {site.version}
          </span>

          {/* 窄屏：汉堡按钮 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="切换导航菜单"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                  menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-ink transition-all duration-300 ${
                  menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 移动端下拉面板 */}
      <div
        className={`overflow-hidden border-line bg-paper/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-80 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-page flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `focus-ring border-b border-line-soft py-3 text-[15px] last:border-0 ${
                  isActive ? 'text-accent' : 'text-ink-soft'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
