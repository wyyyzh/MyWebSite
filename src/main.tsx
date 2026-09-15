import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root')
if (!container) throw new Error('找不到 #root 挂载点，请检查 index.html')

// basename 取自 vite 的 base 配置，两者必须一致，
// 否则部署到子路径时路由会多算一层
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
