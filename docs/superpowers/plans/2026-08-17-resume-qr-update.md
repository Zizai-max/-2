# Resume And Contact QR Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 更新作品集中的最新版简历，并在首页联系区指定位置展示清晰可扫描的微信二维码。

**Architecture:** 复用现有简历下载 URL，以原文件覆盖静态资源；新增独立二维码静态资源，并在现有联系区左栏加入一个内层响应式网格。页面路由、下载交互和部署配置保持不变。

**Tech Stack:** Next.js 16、React 19、TypeScript、CSS、Node.js 静态导出测试

## Global Constraints

- 不压缩或改写用户提供的简历与二维码图片。
- 不修改现有路由、项目内容或 GitHub Pages 配置。
- 不新增依赖，不重构页面架构。
- 二维码必须使用项目内稳定路径并在桌面端、移动端可扫描。

---

### Task 1: 静态导出回归测试

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `out/index.html`
- Produces: 对二维码路径、替代文本和简历下载路径的静态 HTML 断言

- [ ] **Step 1: 写入失败测试**

在首页静态导出测试中断言：

```js
assert.match(html, /\/portfolio\/pages\/wechat-contact-qr\.png/);
assert.match(html, /alt="微信二维码"/);
assert.match(html, /\/downloads\/zhu-xingmeng-resume\.png/);
```

- [ ] **Step 2: 验证测试因二维码节点缺失而失败**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL，提示缺少 `wechat-contact-qr.png`。

### Task 2: 更新静态资源与联系区

**Files:**
- Replace: `public/downloads/zhu-xingmeng-resume.png`
- Create: `public/portfolio/pages/wechat-contact-qr.png`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `/portfolio/pages/wechat-contact-qr.png`、`/downloads/zhu-xingmeng-resume.png`
- Produces: `.footer-contact-panel` 和 `.contact-qr` 响应式布局

- [ ] **Step 1: 复制原始图片到稳定静态路径**

保持源文件字节不变，替换简历并新增二维码资源。

- [ ] **Step 2: 写入最小页面结构**

把现有 `.footer-contact-stack` 包在 `.footer-contact-panel` 中，并在同层加入：

```tsx
<figure className="contact-qr">
  <img src={withBasePath("/portfolio/pages/wechat-contact-qr.png")} alt="微信二维码" />
  <figcaption>扫码添加微信</figcaption>
</figure>
```

- [ ] **Step 3: 添加桌面端与移动端样式**

使用现有间距、圆角和边框变量；图片保持 `aspect-ratio: 1` 和 `object-fit: contain`，窄屏不产生横向滚动。

- [ ] **Step 4: 验证回归测试通过**

Run: `node --test tests/rendered-html.test.mjs`

Expected: PASS。

### Task 3: 完整验证与发布

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: 本地预览截图和命令输出
- Produces: 视觉验收记录、可发布提交

- [ ] **Step 1: 运行 lint**

Run: `npm run lint`

- [ ] **Step 2: 运行 test**

Run: `npm test`

- [ ] **Step 3: 运行 build**

Run: `npm run build`

- [ ] **Step 4: 启动本地预览并检查桌面端和移动端联系区**

确认二维码可见、比例正确、不遮挡文字、无横向滚动，简历下载链接指向新版静态文件。

- [ ] **Step 5: 检查差异并提交推送**

只提交本任务相关文件；推送当前 `main` 到 `origin/main`，禁止 force push，并核对 GitHub Pages / Actions 状态。
