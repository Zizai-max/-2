import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const report = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "optimize-images-report.json"), "utf8"));

const converted = new Map(
  report.convertedFiles.map((item) => {
    const webPath = `/${item.webp.replace(/\\/g, "/").replace(/^public\//, "")}`;
    const fromPng = webPath.replace(/\.webp$/, ".png");
    const fromJpg = webPath.replace(/\.webp$/, ".jpg");
    const fromJpeg = webPath.replace(/\.webp$/, ".jpeg");
    return [
      [fromPng, webPath],
      [fromJpg, webPath],
      [fromJpeg, webPath],
    ];
  }).flat(),
);

function remapAssetPath(assetPath) {
  const normalized = assetPath.replace(/^\//, "");
  const webp = converted.get(normalized);
  if (!webp) return assetPath;
  return `/${webp}`;
}

async function updateFile(relPath) {
  const abs = path.join(ROOT, relPath);
  let content = await fs.readFile(abs, "utf8");
  let next = content;

  for (const [from, to] of converted.entries()) {
    next = next.split(from).join(to);
  }

  if (next !== content) {
    await fs.writeFile(abs, next, "utf8");
    console.log(`updated references: ${relPath}`);
  }
}

const files = [
  "app/site-data.ts",
  "app/page.tsx",
  "app/layout.tsx",
  "app/components/SiteHeader.tsx",
  "app/components/ProjectExperience.tsx",
  "app/projects/[slug]/page.tsx",
  "tests/rendered-html.test.mjs",
];

for (const file of files) {
  await updateFile(file);
}

console.log(`remapped ${converted.size} assets`);
