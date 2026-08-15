import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);

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
  assert.match(html, /id="about"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="thanks"/);
  assert.equal((html.match(/\bproject-glow\b/g) ?? []).length, 4);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape|Codex is working/i);
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
    "/portfolio/ai-application/2026/01.png",
    "/portfolio/ai-application/2026/02.png",
    "/portfolio/ai-application/2026/03.png",
    "/portfolio/ai-application/2026/04.png",
    "/portfolio/ai-application/2026/05.png",
    "/portfolio/ai-application/2026/06.png",
    "/portfolio/ai-application/2026/07.png",
    "/portfolio/ai-application/2026/08.png",
    "/portfolio/ai-application/2026/09.png",
  ];

  assertImageOrder(html, imagePaths);
  assert.match(html, /case-gallery shell gallery-3 gallery-contained/);
});

test("fan-benefits gallery renders the supplied image sequence within the contained layout", async () => {
  const html = await readOutput("projects/fan-benefits/index.html");
  const imagePaths = [
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
  ];

  assertImageOrder(html, imagePaths);
  assert.match(html, /case-gallery shell gallery-3 gallery-contained/);
});
