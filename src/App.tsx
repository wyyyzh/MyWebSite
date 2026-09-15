/**
 * App —— 全站路由表
 *
 * 路由一览：
 *   /                     首页
 *   /projects             项目列表（支持筛选搜索）
 *   /projects/:slug       项目详情
 *   /resume               简历
 *   /timeline             人生版本历史
 *   /release              站点发版日志
 *   /readme               README
 *   *                     404
 *
 * 新增页面：在这里加一条 <Route>，并在 components/Nav.tsx 的 NAV_ITEMS 里加入口。
 */

import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ReadmePage from './pages/ReadmePage'
import ReleasePage from './pages/ReleasePage'
import ResumePage from './pages/ResumePage'
import TimelinePage from './pages/TimelinePage'

/** 切换页面时回到顶部，否则会从上一页的滚动位置接着看 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <ScrollToTop />
      <Nav />

      {/* key 换掉会重新挂载，配合 CSS 得到每次换页的淡入效果 */}
      <main key={location.pathname} className="page-enter flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/release" element={<ReleasePage />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
