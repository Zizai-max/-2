import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);

function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
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
