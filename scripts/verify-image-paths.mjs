import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIRS = ["app", "public"];
const IMAGE_REF = /\/(?:portfolio|downloads|og)[^"'`\s)]+\.(?:webp|png|jpe?g|svg)/gi;

async function collectFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "originals_backup") continue;
      await collectFiles(abs, files);
      continue;
    }
    if (/\.(tsx?|jsx?|css|html|mjs)$/.test(entry.name)) files.push(abs);
  }
  return files;
}

async function main() {
  const refs = new Set();
  for (const dir of SOURCE_DIRS.map((d) => path.join(ROOT, d))) {
    const files = await collectFiles(dir);
    for (const file of files) {
      const content = await fs.readFile(file, "utf8");
      for (const match of content.matchAll(IMAGE_REF)) refs.add(match[0]);
    }
  }

  const missing = [];
  for (const ref of [...refs].sort()) {
    const rel = ref.replace(/^\//, "");
    const candidates = [
      path.join(ROOT, "public", rel),
      path.join(ROOT, rel),
    ];
    const exists = await Promise.all(candidates.map((p) => fs.access(p).then(() => true).catch(() => false)));
    if (!exists.some(Boolean)) missing.push(ref);
  }

  const result = { referenced: refs.size, missing };
  console.log(JSON.stringify(result, null, 2));
  if (missing.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
