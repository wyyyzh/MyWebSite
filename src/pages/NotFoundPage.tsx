/**
 * NotFoundPage —— 站内 404
 * 未知路径会走到这里（上一次由 App 的兜底路由匹配）。
 */

import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="container-page flex min-h-[75vh] flex-col items-center justify-center pt-40 text-center">
      <p className="font-mono text-6xl text-line md:text-8xl">404</p>
      <h1 className="mt-6 text-3xl">这个路径不存在</h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        你要找的页面可能改了地址，或者链接打错了。
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="focus-ring rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
        >
          回到首页
        </Link>
        <Link
          to="/projects"
          className="focus-ring rounded-full border border-line bg-paper-soft px-6 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          浏览项目
        </Link>
      </div>

      <p className="mt-12 font-mono text-[11px] text-ink-faint">
        $ git status → fatal: not a valid object name
      </p>
    </section>
  )
}
