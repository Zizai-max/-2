# Homepage Background Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero's remote video with the supplied static PNG at the same bottom layer without moving or changing any other element.

**Architecture:** Keep the existing hero DOM and visual layer stack intact, replacing only the decorative `<video>` node with a decorative `<img>`. Reuse the existing full-cover positioning behavior under a new image-specific class and verify the static export contains the new asset but no video markup or remote video URL.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, CSS, Node test runner

## Global Constraints

- Do not move, delete, or reorder any existing navigation, title, personal information, footer prompt, or other hero element.
- Preserve the current dark overlay, grain, light ribbons, cursor interaction, and layer ordering.
- Do not change pages outside the homepage, content, routes, dependencies, or GitHub Pages configuration.
- Copy `image 2692.png` byte-for-byte without compression, recoloring, or source cropping.
- Use responsive cover behavior without stretching the image.

---

### Task 1: Replace the hero video with the supplied background image

**Files:**
- Create: `public/portfolio/pages/home-hero-background-2026.png`
- Modify: `app/page.tsx:14-28`
- Modify: `app/globals.css:135`
- Modify: `app/globals.css:484`
- Test: `tests/rendered-html.test.mjs:13-31`

**Interfaces:**
- Consumes: `withBasePath(path: string): string` from `app/base-path.ts`
- Produces: homepage decorative image path `/portfolio/pages/home-hero-background-2026.png` and CSS class `hero-background`

- [ ] **Step 1: Write the failing static-export test**

Add these assertions to the homepage test after the `portfolio-title` assertion:

```js
assert.match(html, /class="hero-background"/);
assert.match(html, /\/portfolio\/pages\/home-hero-background-2026\.png/);
assert.doesNotMatch(html, /<video\b|videos\.pexels\.com\/video-files\/3130284/i);
```

- [ ] **Step 2: Run the build and test to verify the new assertions fail**

Run:

```powershell
.\node_modules\.bin\next.cmd build
node --test tests/rendered-html.test.mjs
```

Expected: the homepage test fails because `hero-background` and the new image path are absent and the old video remains.

- [ ] **Step 3: Copy the supplied image without transformation**

Copy:

```text
D:\A相册\新建文件夹\image 2692.png
```

to:

```text
public/portfolio/pages/home-hero-background-2026.png
```

Compare source and destination byte length and SHA-256 hashes; both must match exactly.

- [ ] **Step 4: Replace only the video node**

Replace the existing `<video>` block in `app/page.tsx` with:

```tsx
<img
  className="hero-background"
  src={withBasePath("/portfolio/pages/home-hero-background-2026.png")}
  alt=""
  aria-hidden="true"
/>
```

Leave every following hero child unchanged and in its current order.

- [ ] **Step 5: Preserve the original background geometry**

Replace the `.hero-video` rule in `app/globals.css` with:

```css
.hero-background { position: absolute; z-index: -5; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
```

Remove only the obsolete `.hero-video { display: none; }` declaration from the reduced-motion media query. Do not edit any other hero rule.

- [ ] **Step 6: Run focused and full verification**

Run:

```powershell
.\node_modules\.bin\eslint.cmd . --ignore-pattern dist --ignore-pattern .next
.\node_modules\.bin\tsc.cmd --noEmit
.\node_modules\.bin\next.cmd build
node --test tests/rendered-html.test.mjs
git diff --check
```

Expected: lint has zero errors, TypeScript passes, the production build succeeds, all four tests pass, and `git diff --check` has no output.

- [ ] **Step 7: Audit and commit**

Confirm the diff contains only the plan/spec, new image, `app/page.tsx`, `app/globals.css`, and `tests/rendered-html.test.mjs`, then commit:

```powershell
git add app/page.tsx app/globals.css tests/rendered-html.test.mjs public/portfolio/pages/home-hero-background-2026.png docs/superpowers/plans/2026-08-16-homepage-background-image.md
git commit -m "style: replace homepage hero background"
```

- [ ] **Step 8: Push and verify deployment**

Push `main`, wait for the workflow run whose `head_sha` matches the new commit, and verify that the live homepage HTML contains `/portfolio/pages/home-hero-background-2026.png` and no longer contains the Pexels video URL.
