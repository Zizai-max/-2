import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const globalStylesheet = new URL("../app/globals.css", import.meta.url);

function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

function assertImageOrder(html, paths) {
  let previousIndex = -1;

  paths.forEach((path) => {
    const currentIndex = html.indexOf(path);
    assert.notEqual(currentIndex, -1, `missing image path: ${path}`);
    assert.ok(currentIndex > previousIndex, `image path is out of order: ${path}`);
    previousIndex = currentIndex;
  });
}

test("static export renders the current portfolio homepage", async () => {
  const html = await readOutput("index.html");

  assert.match(html, /<title>朱星梦 — UX \/ UI Designer<\/title>/);
  assert.match(html, /class="site-header/);
  assert.match(html, /aria-label="主导航"/);
  assert.match(html, /class="portfolio-title"/);
  assert.match(html, /class="hero-background"/);
  assert.match(html, /\/portfolio\/pages\/home-hero-background-2026\.webp/);
  assert.doesNotMatch(html, /<video\b|videos\.pexels\.com\/video-files\/3130284/i);
  assert.match(html, /class="hero-composition"/);
  assert.match(html, /移动端增长体验与视觉系统设计/);
  assert.match(html, /用户体验设计师/);
  assert.match(html, /class="hero-projects"/);
  assert.match(html, /百度粉丝成长与签到激励体系/);
  assert.match(html, /百度AI伴学文心老师/);
  assert.match(html, /会员勋章重构设计/);
  assert.doesNotMatch(html, /class="hero-statement"|<p class="hero-cn">移动端产品体验|BAIDU EXPERIENCE DESIGN/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="thanks"/);
  assert.equal((html.match(/\bproject-glow\b/g) ?? []).length, 4);
  assert.match(html, /\/portfolio\/pages\/ai-workflow-cover-2026\.jpg/);
  assert.match(html, /\/portfolio\/pages\/member-badge-cover-2026\.webp/);
  assert.match(html, /\/portfolio\/pages\/wechat-contact-qr\.png/);
  assert.match(html, /alt="微信二维码"/);
  assert.match(html, /class="contact-qr footer-contact-qr"/);
  assert.doesNotMatch(html, /class="contact-resume"|RESUME|下载简历|\/downloads\/zhu-xingmeng-resume/i);
  assert.doesNotMatch(html, /\/portfolio\/pages\/p18\.jpg/);
  assert.doesNotMatch(html, /\/portfolio\/pages\/p32\.jpg/);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape|Codex is working/i);
});

test("global page shell prevents horizontal viewport scrolling", async () => {
  const css = await readFile(globalStylesheet, "utf8");

  assert.match(css, /html,\s*body\s*\{[^}]*overflow-x:\s*hidden;/s);
});

test("static export includes the thanks page and all project detail routes", async () => {
  const [thanks, ...projectPages] = await Promise.all([
    readOutput("thanks/index.html"),
    readOutput("projects/ai-application/index.html"),
    readOutput("projects/fan-benefits/index.html"),
    readOutput("projects/wenxin-tutor/index.html"),
    readOutput("projects/member-redesign/index.html"),
  ]);

  assert.match(thanks, /class="thanks-page"/);
  assert.match(thanks, /THANK/);
  assert.match(thanks, /YOU\./);
  assert.match(thanks, /BACK TO HOME/);

  const projectTitles = [
    "AI Workflow Designer",
    "粉丝成长与签到激励体系升级",
    "AI 伴学文心老师",
    "焕新会员设计语言",
  ];

  projectPages.forEach((html, index) => {
    assert.match(html, /class="case-page"/);
    assert.match(html, /PROJECT OVERVIEW/);
    assert.match(html, new RegExp(projectTitles[index]));
    assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape|Codex is working/i);
  });
});

test("AI gallery renders the supplied image sequence within the contained layout", async () => {
  const html = await readOutput("projects/ai-application/index.html");
  const imagePaths = [
    "/portfolio/ai-application/2026/01.webp",
    "/portfolio/ai-application/2026/02.webp",
    "/portfolio/ai-application/2026/03.webp",
    "/portfolio/ai-application/2026/04.webp",
    "/portfolio/ai-application/2026/05.webp",
    "/portfolio/ai-application/2026/06.webp",
    "/portfolio/ai-application/2026/07.webp",
    "/portfolio/ai-application/2026/08.webp",
    "/portfolio/ai-application/2026/09.webp",
  ];

  assertImageOrder(html, imagePaths);
  assert.match(html, /case-gallery shell gallery-3 gallery-contained/);
  assert.match(html, /class="case-hero-bg"[^>]*>[\s\S]*\/portfolio\/pages\/ai-workflow-cover-2026\.jpg/);
  assert.match(html, /fetchPriority="high"|fetchpriority="high"/);
  assert.match(html, /<source[^>]+type="image\/webp"[^>]+01-800\.webp 800w[^>]+01-1600\.webp 1600w[^>]+01-2400\.webp 2400w/);
  assert.match(html, /<img[^>]+loading="lazy"[^>]+decoding="async"[^>]+AI Workflow Designer/);
});

test("fan-benefits gallery renders the supplied image sequence within the contained layout", async () => {
  const html = await readOutput("projects/fan-benefits/index.html");
  const imagePaths = [
    "/portfolio/fan-benefits/2026/01.webp",
    "/portfolio/fan-benefits/2026/02.webp",
    "/portfolio/fan-benefits/2026/03.webp",
    "/portfolio/fan-benefits/2026/04.webp",
    "/portfolio/fan-benefits/2026/05.webp",
    "/portfolio/fan-benefits/2026/06.webp",
    "/portfolio/fan-benefits/2026/07.webp",
    "/portfolio/fan-benefits/2026/08.webp",
    "/portfolio/fan-benefits/2026/09.webp",
    "/portfolio/fan-benefits/2026/10.webp",
    "/portfolio/fan-benefits/2026/11.webp",
    "/portfolio/fan-benefits/2026/12.webp",
    "/portfolio/fan-benefits/2026/13.webp",
    "/portfolio/fan-benefits/2026/14.webp",
    "/portfolio/fan-benefits/2026/15.webp",
    "/portfolio/fan-benefits/2026/16.webp",
    "/portfolio/fan-benefits/2026/17.webp",
    "/portfolio/fan-benefits/2026/18.webp",
    "/portfolio/fan-benefits/2026/19.webp",
  ];
  const explorationPaths = Array.from(
    { length: 13 },
    (_, index) => `/portfolio/fan-growth/ai-ui-exploration/visual-${String(index + 1).padStart(2, "0")}.webp`,
  );

  assertImageOrder(html, [...imagePaths, ...explorationPaths]);
  assert.match(html, /case-gallery shell gallery-3 gallery-contained/);
  assert.match(html, /case-gallery shell gallery-3 gallery-three-up/);
  assert.match(html, /<source[^>]+type="image\/webp"[^>]+14-800\.webp 800w[^>]+14-1600\.webp 1600w[^>]+14-2400\.webp 2400w/);
});

test("project surfaces use restrained neutral lines", async () => {
  const css = await readFile(globalStylesheet, "utf8");

  assert.match(css, /--color-border:\s*rgba\(214, 204, 196, \.11\)/);
  assert.match(css, /--color-border-hover:\s*rgba\(214, 204, 196, \.18\)/);
  assert.match(css, /--viewer-line:\s*rgba\(214, 204, 196, \.1\)/);
  assert.doesNotMatch(css, /\.gallery-contained figure[^}]+box-shadow:\s*var\(--shadow-card\)/s);
});
