# Portfolio Image Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the fan-benefits AI visual exploration footer and replace the AI and member project card covers with the two supplied images.

**Architecture:** Keep the existing data-driven project rendering intact. Add one existing-style section to the `fan-benefits` project and point two existing `coverImage` fields at newly copied, non-destructive assets so old files remain available and CDN cache keys change.

**Tech Stack:** Next.js 16, React 19, TypeScript, static export, Node test runner, CSS-driven project galleries.

## Global Constraints

- Do not change page structure, copy, project order, routes, navigation, card dimensions, GitHub Pages workflow, or deployment method.
- Keep the current 19 fan-benefits images in their existing order.
- Restore the existing 13-image AI visual exploration section after those 19 images.
- Copy supplied cover images without compression or re-encoding.
- Preserve `p18.jpg`, `p32.jpg`, and all existing project assets.

---

## File Structure

- Modify `tests/rendered-html.test.mjs`: regression coverage for both cover paths and the restored footer sequence.
- Modify `app/site-data.ts`: update two `coverImage` values and append the restored fan-benefits section.
- Create `public/portfolio/pages/ai-workflow-cover-2026.jpg`: supplied blue-purple AI cover.
- Create `public/portfolio/pages/member-badge-cover-2026.png`: supplied member badge cover.

### Task 1: Add regression coverage

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: static HTML under `out/` produced by the existing Next.js build.
- Produces: assertions for the two new cover paths and the complete fan-benefits image order.

- [ ] **Step 1: Add failing homepage cover assertions**

Add to `static export renders the current portfolio homepage`:

```js
assert.match(html, /\/portfolio\/pages\/ai-workflow-cover-2026\.jpg/);
assert.match(html, /\/portfolio\/pages\/member-badge-cover-2026\.png/);
assert.doesNotMatch(html, /\/portfolio\/pages\/p18\.jpg/);
assert.doesNotMatch(html, /\/portfolio\/pages\/p32\.jpg/);
```

- [ ] **Step 2: Extend the fan-benefits sequence assertion**

After the 19 supplied image paths, define and assert the restored sequence:

```js
const explorationPaths = Array.from(
  { length: 13 },
  (_, index) => `/portfolio/fan-growth/ai-ui-exploration/visual-${String(index + 1).padStart(2, "0")}.png`,
);

assertImageOrder(html, [...imagePaths, ...explorationPaths]);
assert.match(html, /case-gallery shell gallery-3 gallery-contained/);
assert.match(html, /case-gallery shell gallery-3 gallery-three-up/);
```

Replace the existing `assertImageOrder(html, imagePaths)` call so the complete combined order is tested once.

- [ ] **Step 3: Build and run the tests to verify RED**

Run:

```powershell
pnpm run build
node --test tests/rendered-html.test.mjs
```

Expected: build succeeds, then tests fail because the new cover paths and restored exploration paths are absent from current output.

- [ ] **Step 4: Commit the failing tests**

```powershell
git add tests/rendered-html.test.mjs
git commit -m "test: cover restored portfolio imagery"
```

### Task 2: Restore the footer and replace covers

**Files:**
- Modify: `app/site-data.ts`
- Create: `public/portfolio/pages/ai-workflow-cover-2026.jpg`
- Create: `public/portfolio/pages/member-badge-cover-2026.png`

**Interfaces:**
- Consumes: existing `Project` and `ProjectSection` data types and the project page renderer.
- Produces: updated `coverImage` strings and one additional `ProjectSection` for `fan-benefits`.

- [ ] **Step 1: Copy the supplied cover files byte-for-byte**

Copy:

```text
C:\Users\朱星梦\AppData\Local\Temp\codex-clipboard-8b8d1006-8fbf-48aa-91d7-7aa95402e04b.jpg
  -> public/portfolio/pages/ai-workflow-cover-2026.jpg

C:\Users\朱星梦\AppData\Local\Temp\codex-clipboard-65e630ee-8687-411c-9d47-decf70fde7f3.png
  -> public/portfolio/pages/member-badge-cover-2026.png
```

Verify each source and destination pair with SHA-256 hashes.

- [ ] **Step 2: Update the two cover references**

In `app/site-data.ts`, set:

```ts
coverImage: "/portfolio/pages/ai-workflow-cover-2026.jpg",
```

for `ai-application`, and:

```ts
coverImage: "/portfolio/pages/member-badge-cover-2026.png",
```

for `member-redesign`.

- [ ] **Step 3: Append the restored fan-benefits section**

After the current 19-image section, append:

```ts
{
  eyebrow: "08 / AI VISUAL EXPLORATION",
  title: "AI探索UI视觉设计",
  description:
    "围绕粉丝成长、签到激励与长期关系建立，使用 AI 并行探索不同的界面视觉方向。从任务成长、陪伴叙事到游戏化与数据反馈，在统一业务目标下比较信息密度、情感氛围与激励感知，辅助最终视觉判断。",
  galleryStyle: "three-up",
  images: [
    "/portfolio/fan-growth/ai-ui-exploration/visual-01.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-02.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-03.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-04.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-05.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-06.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-07.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-08.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-09.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-10.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-11.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-12.png",
    "/portfolio/fan-growth/ai-ui-exploration/visual-13.png",
  ],
},
```

- [ ] **Step 4: Build and run tests to verify GREEN**

Run:

```powershell
pnpm run build
node --test tests/rendered-html.test.mjs
```

Expected: all rendered HTML tests pass.

- [ ] **Step 5: Commit the implementation**

```powershell
git add app/site-data.ts public/portfolio/pages/ai-workflow-cover-2026.jpg public/portfolio/pages/member-badge-cover-2026.png
git commit -m "content: restore portfolio imagery"
```

### Task 3: Verify and deploy

**Files:**
- Verify only; no planned source changes.

**Interfaces:**
- Consumes: completed static project and current GitHub Pages workflow.
- Produces: verified `main` commit deployed at the existing Pages URL.

- [ ] **Step 1: Run the complete verification suite**

```powershell
pnpm run lint
.\node_modules\.bin\tsc.cmd --noEmit
pnpm run test
pnpm run build
git diff --check
```

Expected: zero command failures; existing lint warnings may remain but no lint errors.

- [ ] **Step 2: Audit the final Git scope**

```powershell
git status --short --branch
git diff --name-status 4aea3cc..HEAD
```

Expected changes after the spec commit: one test file, one data file, two new cover assets, and this implementation plan. No route, deployment workflow, dependency, or unrelated asset changes.

- [ ] **Step 3: Push and verify deployment**

```powershell
git push origin main
```

Confirm the GitHub Actions run for the final SHA completes successfully, then verify the existing Pages URL returns both new cover paths and the restored `visual-13.png` path.
