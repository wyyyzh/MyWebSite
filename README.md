# Life Git · 个人版本历史站点

一个「用 Git 的方式介绍自己」的个人网站：Hero 标语 + 年度活跃热力图 + 项目精华 + 版本历史时间线 + README 侧滑抽屉。

参考形态：`https://tulipyu.me`（同样是 Vite + React 的纯静态 SPA）。本项目已按同样的技术路线复刻并重写，你拿到的是一个可以直接改内容、直接部署的完整工程。

---

## 一、技术栈（都已安装好）

| 层 | 选型 | 作用 |
| --- | --- | --- |
| 构建 | **Vite 6** | 开发服务器 + 打包，毫秒级热更新 |
| 框架 | **React 19** | 组件化写页面 |
| 语言 | **TypeScript 5.7** | 类型检查，改错字段会立刻报错 |
| 样式 | **Tailwind CSS 4** | 原子化 CSS，配色集中在 `@theme` |
| 动画 | 自写 `useInView` + CSS | 不引第三方动画库，包更小 |
| 部署 | 任意静态托管 | 不需要服务器、不需要数据库 |

依赖已经装好（`node_modules/` 约 51 个包），**不需要再执行 `npm install`**。换电脑时把它删掉重装即可。

---

## 二、三步跑起来

```bash
cd F:/MyWebSite

npm run dev      # 启动开发服务器 → http://localhost:5173
npm run build    # 打包到 dist/，准备部署
npm run preview  # 本地预览打包结果，验证部署前效果
```

改任何文件保存后，浏览器自动刷新，不用重启。

---

## 三、目录结构

```
F:/MyWebSite
├── index.html                  ← 站点标题、SEO/分享 meta（要改）
├── vite.config.ts              ← 构建配置（一般不用动）
├── package.json                ← 依赖与脚本
├── public/                     ← 静态素材，不会被编译，原样复制到 dist
│   ├── favicon.svg / favicon.png
│   ├── apple-touch-icon.png
│   └── og.png                  ← 微信/X 分享时显示的卡片图
├── assets-source/
│   └── make_assets.py          ← 一键重新生成 og.png 和图标
├── src/
│   ├── main.tsx                ← 入口
│   ├── App.tsx                 ← 页面组装顺序
│   ├── index.css               ← 设计变量（配色/字体/圆角）+ 复用样式
│   ├── data/                   ← ★ 你 90% 的时间只改这里
│   │   ├── site.ts             ← 姓名、标语、自我介绍、社交链接、README
│   │   ├── projects.ts         ← 项目卡片
│   │   ├── timeline.ts         ← 版本历史
│   │   └── activity.ts         ← 热力图数据
│   ├── components/             ← 每个区块一个组件，互相独立
│   │   ├── Nav.tsx             ← 顶栏
│   │   ├── Hero.tsx            ← 首屏大字标语
│   │   ├── ActivityGraph.tsx   ← 年度热力图
│   │   ├── Intro.tsx           ← 自我介绍
│   │   ├── Projects.tsx        ← 项目卡片墙
│   │   ├── Timeline.tsx        ← 版本时间线
│   │   ├── ReadmeDrawer.tsx    ← 右侧 README 抽屉
│   │   ├── Footer.tsx
│   │   └── Reveal.tsx          ← 滚动进场动画包装器
│   └── hooks/
│       └── useInView.ts        ← 判断元素是否进入视口
└── docs/
    └── DEPLOY.md               ← 部署保姆级教程（含 4 种方案对比）
```

---

## 四、换成你自己的内容

### 1) 改身份信息 → `src/data/site.ts`

```ts
export const site: SiteConfig = {
  name: '林知远',                    // 改成你的名字
  handle: '知远',                    // Hero 里的称呼
  version: 'v1.0.0',                // 右上角版本号
  tagline: '我不是一个完成品。\n我是一段版本历史。',  // \n 处会换行
  role: 'AI 产品经理 / 独立开发者',
  intro: ['第一段…', '第二段…'],      // 数组，几个元素就是几段
  exploring: '你现在最想回答的问题？',
  email: 'hello@example.com',
  links: [{ label: 'GitHub', href: 'https://github.com/你的ID', external: true }],
  readme: ['# README.md', '', '## 我是谁', '…'],   // 支持 # / ## / -
}
```

> `readme` 字段里：`# ` 是大标题，`## ` 是小标题，`- ` 是列表项，空字符串是空行。

### 2) 改项目 → `src/data/projects.ts`

复制一个对象、改字段就是新增一个项目。`featured: true` 的项目在首页直接展示，其余点「查看全部项目」才出现。

### 3) 改版本历史 → `src/data/timeline.ts`

`type` 决定圆点颜色：`major`（墨绿，人生转折）／`minor`（陶土色，新项目）／`patch`（灰色，小修复）。

### 4) 换热力图数据 → `src/data/activity.ts`

默认是用确定性算法生成的**示例数据**。换成真实数据只需两步：

```ts
export const USE_MANUAL_DATA = true
export const manualData: Record<string, number> = {
  '2026-01-04': 3,   // 数值 0-8+，越大颜色越深
  '2026-01-05': 1,
}
```

想接 GitHub 贡献数据，把 `manualData` 换成由接口请求填充即可（保持 `{ 'YYYY-MM-DD': number }` 结构）。

---

## 五、换配色和字体

全站颜色只定义在 `src/index.css` 的 `@theme` 里，改一处全站生效：

```css
@theme {
  --color-paper: #f7f3e8;    /* 背景：纸色 */
  --color-ink: #211f1c;      /* 文字：墨色 */
  --color-accent: #2f6f4f;   /* 主强调色：墨绿 */
  --color-clay: #c2603f;     /* 次强调色：陶土 */
  --color-lv0..lv4: ...      /* 热力图五级色阶 */
  --font-serif / --font-sans / --font-mono
}
```

改完对应的工具类名不变（`bg-paper`、`text-ink`、`text-accent`…），所以不用改组件。

---

## 六、重新生成分享图与图标

改完自己的名字/标语后，让分享卡片也同步：

```bash
# 先编辑 assets-source/make_assets.py 顶部的 CONFIG
python assets-source/make_assets.py
```

会覆盖 `public/og.png`、`public/favicon.png`、`public/apple-touch-icon.png`。

---

## 七、部署

最快路线（推荐 Vercel，免费、自动 HTTPS、推代码即上线）：

1. 把项目推到 GitHub（`docs/DEPLOY.md` 有完整命令）
2. 打开 vercel.com → New Project → 选这个仓库 → 直接 Deploy

构建参数：

| 项 | 值 |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

四种方案的详细对比与踩坑说明见 **[docs/DEPLOY.md](docs/DEPLOY.md)**。

---

## 八、常见问题

**Q：`npm run build` 报 TS 类型错误？**
`src/data/` 里的字段拼错或漏字段了。TS 会直接告诉你文件、行号和缺哪个字段。

**Q：部署后刷新子页面 404？**
本站只有一个页面，不存在这个问题。以后用 React Router 加了多页，需要在托管平台配置 SPA fallback 到 `index.html`。

**Q：想要自定义域名？**
在托管平台绑定域名后，到域名服务商加一条 CNAME 记录指向平台给的地址即可。

**Q：热力图太宽、手机上溢出？**
已做横向滚动处理（`overflow-x-auto`），手机上左右滑动即可。
