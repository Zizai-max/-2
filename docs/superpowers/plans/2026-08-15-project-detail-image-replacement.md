# Project Detail Image Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the AI and fan-benefits project detail galleries with the 28 original PNG files supplied by the user, preserving their exact order, natural aspect ratios, and the current contained gallery width.

**Architecture:** Keep the existing project data model and both gallery renderers unchanged. Add the original PNG files under ordered project-specific public asset folders, replace only the two projects' `sections` image arrays in `app/site-data.ts`, and add static-export assertions that verify every new image appears in order. The existing `gallery-contained` CSS already supplies consistent width, lateral margins, `height: auto`, and non-cropping behavior, so no visual-system CSS change is planned.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node.js test runner, static export.

## Global Constraints

- Preserve all 28 source images as original PNG files; do not compress, resize, crop, or transcode them.
- AI project order is `AI-1.png` through `AI-9.png`.
- Fan-benefits project order is `百度粉丝权益1.png`, `百度粉丝权益_ 2.png`, then `百度粉丝权益3.png` through `百度粉丝权益19.png`.
- Use the current contained gallery width and lateral margins.
- Render every image at `width: 100%` and natural height with no forced aspect ratio.
- Do not change project names, introductions, tags, card covers, ordering, slugs, routes, navigation, or GitHub Pages configuration.
- Do not delete old image assets.
- Do not add dependencies or new features.

---

### Task 1: Add static-export regression coverage for both ordered galleries

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: static HTML files in `out/projects/ai-application/index.html` and `out/projects/fan-benefits/index.html`.
- Produces: `assertImageOrder(html: string, paths: string[]): void`, which verifies that every expected asset path exists and appears after the preceding path.

- [ ] **Step 1: Add the order assertion helper and the failing gallery test**

Add this helper below `readOutput`:

```js
function assertImageOrder(html, paths) {
  let previousIndex = -1;

  paths.forEach((path) => {
    const currentIndex = html.indexOf(path);
    assert.notEqual(currentIndex, -1, `missing image path: ${path}`);
    assert.ok(currentIndex > previousIndex, `image path is out of order: ${path}`);
    previousIndex = currentIndex;
  });
}
```

Add this test after the existing route test:

```js
test("AI and fan-benefits galleries render the supplied images in order", async () => {
  const [aiPage, fanPage] = await Promise.all([
    readOutput("projects/ai-application/index.html"),
    readOutput("projects/fan-benefits/index.html"),
  ]);

  const aiImages = Array.from(
    { length: 9 },
    (_, index) => `/portfolio/ai-application/2026/${String(index + 1).padStart(2, "0")}.png`,
  );
  const fanImages = Array.from(
    { length: 19 },
    (_, index) => `/portfolio/fan-benefits/2026/${String(index + 1).padStart(2, "0")}.png`,
  );

  assertImageOrder(aiPage, aiImages);
  assertImageOrder(fanPage, fanImages);
  assert.match(aiPage, /case-gallery shell gallery-3 gallery-contained/);
  assert.match(fanPage, /case-gallery shell gallery-3 gallery-contained/);
});
```

- [ ] **Step 2: Run the new test and verify that it fails against the old galleries**

Run:

```powershell
pnpm run build
node --test tests/rendered-html.test.mjs
```

Expected: the new test fails with `missing image path: /portfolio/ai-application/2026/01.png`; the existing tests remain green.

- [ ] **Step 3: Commit the failing regression test**

```powershell
git add -- tests/rendered-html.test.mjs
git commit -m "test: cover ordered project image galleries"
```

---

### Task 2: Add the original assets and replace both project gallery datasets

**Files:**
- Create: `public/portfolio/ai-application/2026/01.png` through `public/portfolio/ai-application/2026/09.png`
- Create: `public/portfolio/fan-benefits/2026/01.png` through `public/portfolio/fan-benefits/2026/19.png`
- Modify: `app/site-data.ts`

**Interfaces:**
- Consumes: the 28 user-supplied PNG files at `D:\A相册\新建文件夹`.
- Produces: ordered public URLs referenced by both `app/projects/[slug]/page.tsx` and `app/components/ProjectExperience.tsx` through the shared `projects` data.

- [ ] **Step 1: Create the two ordered asset directories**

```powershell
New-Item -ItemType Directory -Force -Path 'public\portfolio\ai-application\2026'
New-Item -ItemType Directory -Force -Path 'public\portfolio\fan-benefits\2026'
```

- [ ] **Step 2: Copy the nine AI PNG files without transformation**

Copy each source byte-for-byte to the ordered destination:

```powershell
1..9 | ForEach-Object {
  $source = "D:\A相册\新建文件夹\AI-$_.png"
  $destination = "public\portfolio\ai-application\2026\$($_.ToString('00')).png"
  Copy-Item -LiteralPath $source -Destination $destination
}
```

- [ ] **Step 3: Copy the nineteen fan-benefits PNG files without transformation**

```powershell
1..19 | ForEach-Object {
  $source = if ($_ -eq 2) {
    'D:\A相册\新建文件夹\百度粉丝权益_ 2.png'
  } else {
    "D:\A相册\新建文件夹\百度粉丝权益$_.png"
  }
  $destination = "public\portfolio\fan-benefits\2026\$($_.ToString('00')).png"
  Copy-Item -LiteralPath $source -Destination $destination
}
```

- [ ] **Step 4: Verify that the copies match the originals byte-for-byte**

Run SHA-256 comparison for each source/destination pair and throw on any mismatch:

```powershell
1..9 | ForEach-Object {
  $source = "D:\A相册\新建文件夹\AI-$_.png"
  $destination = "public\portfolio\ai-application\2026\$($_.ToString('00')).png"
  if ((Get-FileHash -Algorithm SHA256 -LiteralPath $source).Hash -ne (Get-FileHash -Algorithm SHA256 -LiteralPath $destination).Hash) {
    throw "AI image hash mismatch: $_"
  }
}

1..19 | ForEach-Object {
  $source = if ($_ -eq 2) { 'D:\A相册\新建文件夹\百度粉丝权益_ 2.png' } else { "D:\A相册\新建文件夹\百度粉丝权益$_.png" }
  $destination = "public\portfolio\fan-benefits\2026\$($_.ToString('00')).png"
  if ((Get-FileHash -Algorithm SHA256 -LiteralPath $source).Hash -ne (Get-FileHash -Algorithm SHA256 -LiteralPath $destination).Hash) {
    throw "Fan-benefits image hash mismatch: $_"
  }
}
```

Expected: no output and exit code `0`.

- [ ] **Step 5: Replace the AI project's gallery image array**

Keep the existing AI section eyebrow, title, description, workflow content, project metadata, and `galleryStyle: "contained"`. Replace only its `images` value with:

```ts
images: [
  "/portfolio/ai-application/2026/01.png",
  "/portfolio/ai-application/2026/02.png",
  "/portfolio/ai-application/2026/03.png",
  "/portfolio/ai-application/2026/04.png",
  "/portfolio/ai-application/2026/05.png",
  "/portfolio/ai-application/2026/06.png",
  "/portfolio/ai-application/2026/07.png",
  "/portfolio/ai-application/2026/08.png",
  "/portfolio/ai-application/2026/09.png",
],
```

- [ ] **Step 6: Replace the fan-benefits sections with one contained ordered gallery**

Keep all fan-benefits project metadata unchanged. Replace only its current eight-section `sections` value with:

```ts
sections: [
  {
    eyebrow: "",
    title: "粉丝成长与签到激励体系升级",
    description:
      "将前期研究结论收束为完整方案，从任务驱动的送花行为出发，重构成长等级、签到反馈与长期关系维护机制，形成更可持续的粉丝体验系统。",
    galleryStyle: "contained",
    images: [
      "/portfolio/fan-benefits/2026/01.png",
      "/portfolio/fan-benefits/2026/02.png",
      "/portfolio/fan-benefits/2026/03.png",
      "/portfolio/fan-benefits/2026/04.png",
      "/portfolio/fan-benefits/2026/05.png",
      "/portfolio/fan-benefits/2026/06.png",
      "/portfolio/fan-benefits/2026/07.png",
      "/portfolio/fan-benefits/2026/08.png",
      "/portfolio/fan-benefits/2026/09.png",
      "/portfolio/fan-benefits/2026/10.png",
      "/portfolio/fan-benefits/2026/11.png",
      "/portfolio/fan-benefits/2026/12.png",
      "/portfolio/fan-benefits/2026/13.png",
      "/portfolio/fan-benefits/2026/14.png",
      "/portfolio/fan-benefits/2026/15.png",
      "/portfolio/fan-benefits/2026/16.png",
      "/portfolio/fan-benefits/2026/17.png",
      "/portfolio/fan-benefits/2026/18.png",
      "/portfolio/fan-benefits/2026/19.png",
    ],
  },
],
```

- [ ] **Step 7: Run the static-export tests and verify the ordered galleries pass**

Run:

```powershell
pnpm run build
node --test tests/rendered-html.test.mjs
```

Expected: all tests pass, including `AI and fan-benefits galleries render the supplied images in order`.

- [ ] **Step 8: Commit the project image replacement**

```powershell
git add -- app/site-data.ts public/portfolio/ai-application/2026 public/portfolio/fan-benefits/2026
git commit -m "content: replace AI and fan benefit project galleries"
```

---

### Task 3: Validate responsive presentation and the complete project

**Files:**
- Verify: `app/globals.css`
- Verify: `app/projects/[slug]/page.tsx`
- Verify: `app/components/ProjectExperience.tsx`
- Verify: `app/site-data.ts`

**Interfaces:**
- Consumes: the built static project and shared gallery data from Task 2.
- Produces: verified desktop and mobile presentation with no code changes unless a requirement is proven to fail.

- [ ] **Step 1: Confirm the existing contained-gallery rules remain active**

Verify `app/globals.css` still contains these effective declarations:

```css
.viewer-gallery.gallery-contained,
.case-gallery.gallery-contained {
  width: min(1500px, var(--shell));
  grid-template-columns: 1fr;
}

.gallery-contained img,
.viewer-gallery.gallery-contained img,
.case-gallery.gallery-contained img {
  width: 100%;
  height: auto;
  aspect-ratio: auto;
  object-fit: contain;
}
```

Expected: the rules are present, so no CSS edit is required.

- [ ] **Step 2: Start the production preview and inspect both project routes**

Run:

```powershell
pnpm start
```

Inspect `/projects/ai-application/` and `/projects/fan-benefits/` at 1440 px, 1024 px, 768 px, and 390 px. At each width verify:

- images follow the specified numeric order;
- every image has the same gallery width and natural height;
- no image is stretched or cropped;
- the gallery retains lateral margins;
- no horizontal scrollbar appears;
- the project preview modal shows the same images in the same order.

- [ ] **Step 3: Run the full verification suite**

Run:

```powershell
pnpm run lint
pnpm exec tsc --noEmit
pnpm run test
pnpm run build
git diff --check
```

Expected: every command exits with code `0`.

- [ ] **Step 4: Inspect the final change scope**

Run:

```powershell
git status --short
git diff --stat 3ad7cbc..HEAD
git diff --name-status 3ad7cbc..HEAD
```

Expected: changes are limited to the two plan/spec documents, `tests/rendered-html.test.mjs`, `app/site-data.ts`, and the two new ordered asset directories; no route, cover image, navigation, dependency, or deployment file is changed.
