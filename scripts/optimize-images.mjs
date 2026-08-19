import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const sharp = require(path.join(ROOT, "node_modules", ".pnpm", "sharp@0.34.5", "node_modules", "sharp"));
const BACKUP_ROOT = path.join(ROOT, "originals_backup");
const THRESHOLD = 200 * 1024;
const QUALITY = 80;
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "out", "dist", "originals_backup", ".git", ".pnpm-store"]);

const stats = {
  scanned: 0,
  large: 0,
  converted: 0,
  skipped: 0,
  beforeBytes: 0,
  afterBytes: 0,
  convertedFiles: [],
  largeFiles: [],
};

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(path.join(dir, entry.name), files);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;
    files.push(path.join(dir, entry.name));
  }
  return files;
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function convertImage(absPath) {
  const rel = path.relative(ROOT, absPath);
  const before = (await fs.stat(absPath)).size;
  stats.beforeBytes += before;

  if (before <= THRESHOLD) {
    stats.afterBytes += before;
    return;
  }

  stats.large += 1;
  stats.largeFiles.push({ rel, kb: Math.round(before / 1024) });

  const backupPath = path.join(BACKUP_ROOT, rel);
  await ensureDir(backupPath);
  await fs.copyFile(absPath, backupPath);

  const webpPath = absPath.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(absPath).webp({ quality: QUALITY }).toFile(webpPath);
  const after = (await fs.stat(webpPath)).size;
  stats.afterBytes += after;
  stats.converted += 1;
  stats.convertedFiles.push({ rel, before, after, webp: path.relative(ROOT, webpPath) });

  await fs.unlink(absPath);
}

async function main() {
  const files = await walk(ROOT);
  stats.scanned = files.length;

  for (const file of files) {
    await convertImage(file);
  }

  const report = {
    scannedRasterImages: stats.scanned,
    largeOver200KB: stats.large,
    convertedToWebp: stats.converted,
    beforeMB: Number((stats.beforeBytes / (1024 * 1024)).toFixed(2)),
    afterMB: Number((stats.afterBytes / (1024 * 1024)).toFixed(2)),
    savedMB: Number(((stats.beforeBytes - stats.afterBytes) / (1024 * 1024)).toFixed(2)),
    savedPercent: stats.beforeBytes
      ? Number((((stats.beforeBytes - stats.afterBytes) / stats.beforeBytes) * 100).toFixed(1))
      : 0,
    largeFiles: stats.largeFiles,
    convertedFiles: stats.convertedFiles,
  };

  const reportPath = path.join(ROOT, "scripts", "optimize-images-report.json");
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
