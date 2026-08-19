# Portfolio Visual and Performance Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing portfolio’s project borders, AI project hero, contact area, and image delivery without changing copy, project order, routes, or deployment configuration.

**Architecture:** Keep the existing Next.js static-export structure. Use the existing AI cover as the project hero atmosphere layer, replace resume links with the existing lossless QR asset, and add a small reusable `<picture>` wrapper that serves generated WebP derivatives while retaining every original image as fallback.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, static export, Node test runner, Pillow for build-time asset generation only.

## Global Constraints

- Preserve all existing copy, project ordering, routes, typography, and deployment configuration.
- Do not install, upgrade, or add runtime dependencies.
- Preserve original PNG/JPG files and the QR PNG.
- Keep hover effects restrained and all visual changes limited to the requested surfaces.

---

### Task 1: Lock the requested behavior in rendered-output tests

**Files:**
- Modify: `tests/rendered-html.test.mjs`

- [ ] Add assertions that rendered pages contain no resume download UI or asset link.
- [ ] Add assertions that the footer QR is the right-side contact module.
- [ ] Add assertions that the AI project hero renders the existing AI cover with high fetch priority.
- [ ] Add assertions that large project images expose WebP `srcset`, `sizes`, lazy loading, and async decoding.
- [ ] Run the current rendered-output test against the existing export and confirm the new assertions fail for the missing behavior.

### Task 2: Remove resume UI and rebalance the contact footer

**Files:**
- Modify: `app/components/SiteHeader.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Delete: `public/downloads/zhu-xingmeng-resume.png`
- Delete: `public/downloads/zhu-xingmeng-resume.svg`

- [ ] Remove the resume item from the header contact popover and its unused import/style.
- [ ] Keep email and phone/WeChat on the left and move the existing lossless QR figure into the right footer column.
- [ ] Stack the two columns on mobile while retaining QR scan size and white quiet zone.
- [ ] Rename experience-section CSS classes so no obsolete resume semantics remain in current page markup.

### Task 3: Restore the AI hero atmosphere and soften lines

**Files:**
- Modify: `app/components/ProjectExperience.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `app/globals.css`
- Modify: `app/components/BorderGlow.css`

- [ ] Render `/portfolio/pages/ai-workflow-cover-2026.jpg` for both modal and route heroes instead of excluding the AI project.
- [ ] Mark the hero image eager/high-priority and keep a dark, desaturated overlay with responsive cropping.
- [ ] Lower dark-surface border tokens to a neutral 8–14% range and neutralize hover borders.
- [ ] Remove bright gallery shadows/glow while preserving 1px borders, radii, and layout.

### Task 4: Deliver responsive image derivatives

**Files:**
- Create: `app/components/ResponsiveProjectImage.tsx`
- Create: `public/portfolio/optimized/**`
- Modify: `app/components/ProjectExperience.tsx`
- Modify: `app/projects/[slug]/page.tsx`

- [ ] Generate 800px, 1600px, and 2400px WebP variants for the AI application, fan-benefits, and AI visual-exploration sequences; never overwrite originals.
- [ ] Render `<picture>` with WebP `srcset`/`sizes` for those sequences and original PNG fallback.
- [ ] Keep section images lazy with asynchronous decoding; keep only the hero eager/high-priority.
- [ ] Compare original and optimized byte totals and visually inspect representative text-heavy images.

### Task 5: Verify the complete change

**Files:**
- Modify: `design-qa.md`

- [ ] Run lint, TypeScript checking, tests, build, and `git diff --check` with fresh output.
- [ ] Start the static preview once and inspect desktop and mobile states for hero readability, contact layout, image aspect ratio, missing assets, and horizontal overflow.
- [ ] Record actual before/after image totals and verification results in `design-qa.md`.
- [ ] Review `git diff` to confirm routes, project order, copy, and deployment configuration are unchanged.
