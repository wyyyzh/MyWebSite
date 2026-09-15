# 把本地项目连接到 GitHub

这份文档回答一个问题：`F:\MyWebSite` 怎么连到 GitHub，并且让网站自动上线。

---

## 先分清两件事

新手最容易混淆的两个概念，其实是同一条流水线上的两段：

| 段 | 做什么 | 用的命令/机制 |
|---|---|---|
| **第一段：代码备份** | 本地代码存到 GitHub 仓库 | `git push` |
| **第二段：自动发布** | GitHub 检测到你推了代码，自动构建并发布成网站 | GitHub Actions（`.github/workflows/deploy.yml`） |

第一段只负责"存"，第二段才负责"上线"。**第二段我已经配好了**（`deploy.yml`），你只要做第一段，网站会自动跟着更新。

---

## 第一步：在 GitHub 网页上建一个空仓库

打开 <https://github.com/new>，填这些：

| 字段 | 填什么 | 为什么 |
|---|---|---|
| Repository name | 见下方说明 | **这个直接决定你的网址** |
| Public / Private | 选 **Public** | 免费版 GitHub Pages 只支持公开仓库开放访问 |
| Add a README file | **不要勾** | 本地已经有了，勾了会造成两边历史不一致，push 会被拒 |
| Add .gitignore | **不要勾** | 项目里已经配好了 |
| Choose a license | 随意，建议 MIT | 不影响部署 |

### 仓库名怎么起（重要）

| 你填的仓库名 | 最终网址 | 适用场景 |
|---|---|---|
| `MyWebSite` | `https://你的用户名.github.io/MyWebSite/` | 一个人有多个站时 |
| `你的用户名.github.io` | `https://你的用户名.github.io/` | **只有这一个站时推荐**，网址最短 |

例：用户名叫 `zhangsan`，仓库名填 `zhangsan.github.io`，网址就是 `https://zhangsan.github.io/`。

> 项目的 `vite.config.ts` 里 `base: './'` 用的是相对路径，**上面两种命名都能正常工作**，不用改配置。

填完点 **Create repository**，页面会跳转到一个"快速上手"的空白仓库提示页。**停在这一页别关**，下一步要用它上面的地址。

---

## 第二步：选一种登录方式（重磅，这里最容易卡住）

**GitHub 从 2021 年起就不接受账号密码了**，必须用下面两种方式之一。任选其一即可。

### 方案 A：Personal Access Token（推荐新手，通用）

1. 打开 <https://github.com/settings/tokens>，点 **Generate new token (classic)**
2. Note 随便填，比如 `my-website`
3. 勾选权限：**只勾 `repo`** 就够了（包含 push 权限）
4. Expiration 选 90 days 或 No expiration
5. 点底部 **Generate token**
6. **立刻复制那串 `ghp_` 开头的东西** —— 关掉页面就再也看不到了

然后本地用 HTTPS 地址推送。第一次 push 时让你输密码，**粘贴这串 token**（不是你的登录密码）：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

Windows 会记住这个凭据，以后不用重复输。

### 方案 B：SSH 密钥（一劳永逸，但要配一次）

你的电脑上已经有一把 SSH 公钥：

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwKJTymEwdXl08Jai0lMnCbE1Oe5cx0PBjZxLua2HSd+cKTrPDxpJslBXHXAG71XrDYF7xD5d+JiTWHlW0ksVvkVMVDi6dCmjXBIQaMvEZq+zkUZRaSVeFjS/Q0O2GmA81hBM7v+FGjfulvAZ08YoA3hTk8/wuA6hAz6i5YrAOJL4NzRI2oKhFhzSFtJqrbf4Fme9VRJ9Rcz4JSsNm8oTUflr1GlQ6Rx+BNgTVtp3zdwOVwhUM6+XybVC3apo2O53KmufFrn/Tk/QPOKp3gVopwqG09IvGBHiKMEfYbEDkkRQIbf3HYMrgWJqk/8An2Tb1R8N/WXOsGy/4jd5dQVG3nBLoxvwTxkwTh+X2pH9WBePyrX9U5AT6u4QWsf36UJMFrLY+0SFREN6yTZJ8CBa0MrxNo0G4gGzqciFyBJN50L1OY40NTFvU2rcC3j4NAnZEqzRzebWdC1Iku1SoTioEvqgX6rCSEpBeBz9UbFLMon+TK5abT6cOB6vPqqjaFiM= 2926971578@qq.com
```

把它加到 GitHub：右上角头像 → **Settings** → 左侧 **SSH and GPG keys** → **New SSH key** → Title 填 `我的电脑`，Key type 保持 `Authentication Key`，把上面整段粘进 Key 框 → **Add SSH key**。

> ⚠️ 这把公钥绑的邮箱是 `2926971578@qq.com`，而你本地 git 配置的邮箱是 `1753691858@qq.com`。
> **如果这两个不是同一个 GitHub 账号，push 会以另一个账号的身份提交。**不确定的话直接用方案 A。

测试连通性：

```bash
ssh -T git@github.com
```

看到 `Hi 用户名! You've successfully authenticated` 就成了。然后用 SSH 地址推送：

```bash
git remote add origin git@github.com:你的用户名/你的仓库名.git
git push -u origin main
```

---

## 第三步：推送代码

选好上面的方式后，在项目目录里执行：

```bash
cd F:/MyWebSite

# 只需做一次：告诉本地仓库远端在哪
git remote add origin <上一步复制的地址>

# 推送。-u 表示以后直接敲 git push 就行
git push -u origin main
```

推完刷新 GitHub 仓库页面，应该能看到 34 个文件，而且**没有 `node_modules` 和 `dist`**。

---

## 第四步：开启 GitHub Pages

这一步只做一次，也是唯一容易漏的一步：

1. 进你的仓库 → 顶部 **Settings**
2. 左侧 **Pages**
3. **Source** 下拉框选 **GitHub Actions**（不是 `Deploy from a branch`！选错就永远不发布）
4. 不用点 Save，选完自动生效

### 触发第一次发布

回到仓库的 **Actions** 标签页，左侧点 **Deploy to GitHub Pages** → 右上角 **Run workflow** → 绿色按钮确认。

或者更简单 —— 本地随便改点东西再推一次：

```bash
git commit --allow-empty -m "触发首次部署"
git push
```

等 1~2 分钟，Actions 页面出现绿色对勾，网址就活了。

---

## 以后怎么更新

改完 `src/data/` 里的任何内容后，三条命令：

```bash
git add -A
git commit -m "改了什么，用一句话说明"
git push
```

一分钟后网站自动更新。这就是开头说的"第二段"的好处 —— 你永远不用手动打包上传。

---

## 常见报错

| 报错 | 原因 | 怎么修 |
|---|---|---|
| `Support for password authentication was removed` | 还在用登录密码 | 改用方案 A 的 token 或方案 B 的 SSH |
| `remote: Permission denied` | 用 SSH 但公钥没加到账号 | 重新做第二步方案 B |
| `error: remote origin already exists` | 之前加过 remote | `git remote set-url origin <新地址>` |
| `failed to push some refs` | 网页上勾了 README，本地没有 | `git pull --rebase origin main` 后再 `git push` |
| Actions 一直是黄色转圈 | 首次仓库排队 | 等 5 分钟，正常现象 |
| Actions 报红 `npm ci can only install with an existing package-lock.json` | lock 文件没提交 | 本项目已有 `package-lock.json`，确保它进了仓库 |
| 网站 404 | 仓库名和网址对不上 | 看 Pages 页面顶部显示的实际网址是什么 |
| 页面白屏，F12 报资源 404 | 仓库名大小写不一致 | 仓库名统一用小写，重推一次 |

---

## 已经在 .gitignore 里挡掉的东西

检查一下有没有误提交这些，它们不该出现在 GitHub 上：

```
node_modules/    # 依赖，几百 MB
dist/            # 构建产物，CI 会自己生成
.env*            # 密钥，绝对不能提交
```

查看仓库里实际有什么：

```bash
git ls-files
```

如果误提交了，比如 dist：

```bash
git rm -r --cached dist
git commit -m "移除误提交"
git push
```

---

## 撤销：不想用 git 了

删掉项目里的 `.git` 文件夹就回到普通文件夹状态，代码一个不少：

```bash
cd F:/MyWebSite
rm -rf .git
```
