# 部署指南

本站是**纯静态站点**：`npm run build` 之后，`dist/` 里就是一堆 HTML/CSS/JS/图片，扔到任何静态托管都能跑。不需要服务器、不需要数据库、不用管运维。

先确认本地能构建成功：

```bash
cd F:/MyWebSite
npm run build      # 产物在 dist/
npm run preview    # 本地模拟线上效果，打开 http://localhost:4173
```

> `preview` 看到的效果 = 上线后的效果。上线前务必先跑一遍。

---

## 方案对比

| 方案 | 免费额度 | 国内访问速度 | 要不要科学上网 | 上手难度 | 适合谁 |
| --- | --- | --- | --- | --- | --- |
| **Vercel** | 个人项目充足 | 一般 | 部署时需要 | ★☆☆☆☆ | 最推荐，推代码即上线 |
| **Cloudflare Pages** | 无限流量 | 一般 | 部署时需要 | ★★☆☆☆ | 想要无限带宽 |
| **GitHub Pages** | 1GB / 100GB 月流量 | 较慢但稳定 | 部署时需要 | ★★☆☆☆ | 纯免费、和仓库绑定 |
| **腾讯云 EdgeOne Pages** | 有免费版 | **快** | 不需要 | ★★★☆☆ | 面向国内访问者 |
| **自己的服务器 / 虚拟主机** | 看服务商 | 看机房 | 不需要 | ★★★☆☆ | 已有服务器或备案域名 |

**结论**：先按 Vercel 走通一遍（最快）；如果你的访客主要在国内，再换 EdgeOne Pages 或备案域名 + 国内服务器。

---

## 第 0 步：把代码交给 Git

部署平台都要从 Git 仓库拉代码，所以先做这一步（只需一次）。

```bash
cd F:/MyWebSite

git init
git add .
git commit -m "init: life git site"

# 在 github.com 新建一个空仓库（不要勾选 README），然后：
git remote add origin https://github.com/你的用户名/life-git.git
git branch -M main
git push -u origin main
```

之后每次更新内容，只要重复这三行就完成一次「提交」：

```bash
git add .
git commit -m "update: 新增项目卡片"
git push
```

---

## 方案 A：Vercel（推荐，最快）

1. 打开 <https://vercel.com>，用 GitHub 账号登录
2. 点 **Add New → Project**，选择刚才的 `life-git` 仓库
3. 配置会自动识别为 Vite，确认或手填：
   - Framework Preset：`Vite`
   - Build Command：`npm run build`
   - Output Directory：`dist`
4. 点 **Deploy**，约 30 秒后拿到 `xxx.vercel.app` 域名

**之后更新**：`git push` 一下，Vercel 自动重新构建发布，无需任何操作。

**绑定自己的域名**：Project → Settings → Domains → 输入域名 → 按提示到域名商加一条 `CNAME` 记录。

---

## 方案 B：Cloudflare Pages

1. 登录 <https://dash.cloudflare.com> → **Workers & Pages → Create → Pages → Connect to Git**
2. 选择仓库，构建配置：
   - Framework preset：`Vite`
   - Build command：`npm run build`
   - Build output directory：`dist`
3. Save and Deploy

优势：免费版流量不限量，适合有图片/视频的站点。

---

## 方案 C：GitHub Pages

本项目已内置自动化工作流（`.github/workflows/deploy.yml`），推代码就自动发布。

1. 把代码 push 到 GitHub 的 `main` 分支（见第 0 步）
2. 仓库页面 → **Settings → Pages**
3. **Source** 选择 `GitHub Actions`（不要选 "Deploy from a branch"）
4. 回到 **Actions** 标签，等 "Deploy to GitHub Pages" 跑完（约 1 分钟）
5. 访问 `https://你的用户名.github.io/life-git/`

**注意**：项目站点会带一级子路径（`/life-git/`）。本项目 `vite.config.ts` 里已经设置了 `base: './'`，资源用相对路径引用，所以子路径部署可以直接用，无需修改配置。若你之后加了前端路由，需要改成 `base: '/life-git/'`。

---

## 方案 D：腾讯云 EdgeOne Pages（国内访问快）

1. 打开 <https://edgeone.cloud.tencent.com/pages>（支持微信/QQ 登录）
2. 新建项目 → 导入 Git 仓库（或直接上传 `dist/` 文件夹）
3. 构建命令 `npm run build`，输出目录 `dist`
4. 部署完成后会分配一个可访问的域名

面向大陆用户时，这是成本最低、速度最好的选择。

---

## 方案 E：自己的服务器（Nginx）

在服务器上：

```bash
# 1. 上传构建产物（本地执行）
scp -r F:/MyWebSite/dist/* root@你的服务器IP:/var/www/life-git/
```

Nginx 配置：

```nginx
server {
    listen 80;
    server_name 你的域名.com;
    root /var/www/life-git;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # SPA 兜底
    }

    # 静态资源长缓存，文件名带 hash 可以放心用
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

配完用 `nginx -t` 校验，再 `nginx -s reload`。HTTPS 用 `certbot --nginx` 一条命令自动签发。

---

## 部署后自检清单

- [ ] 打开首页，首屏大字和版本号显示正常
- [ ] 热力图能横向滚动，鼠标悬停有日期提示
- [ ] 点右上角 `/README.md`，右侧抽屉滑出，按 `Esc` 能关闭
- [ ] 「查看全部项目」按钮能展开全部卡片
- [ ] 手机宽度下（浏览器 F12 切设备模式）没有横向滚动条
- [ ] 把网址发到微信/X，分享卡片显示的是你的标题和图（`og.png`）

---

## 常见报错

**构建失败：`Cannot find module`**
本地 `node_modules` 不完整。`rm -rf node_modules package-lock.json && npm install` 重装（部署平台上不存在这个问题）。

**页面白屏，控制台报 404 找不到 /assets/xxx.js**
`base` 配置与实际部署路径不匹配。子目录部署用 `base: './'`，根域名部署也可用 `'./'`；只有用了前端路由才需要改成 `'/子目录/'`。

**样式没生效**
Tailwind 4 的入口是 `src/index.css` 里的 `@import 'tailwindcss';`，确认这行没被删。类名要在 `src/` 下的文件里出现，Tailwind 才会生成对应 CSS。

**部署后还是旧界面**
先强制刷新（`Ctrl/Cmd + Shift + R`）。如果仍旧，检查平台是否真的重新构建了（看部署日志时间）。
