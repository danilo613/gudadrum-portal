// ビルド後、リポジトリ直下にある画像・音声などの静的ファイルを dist/ にコピーする。
// Viteは基本的に src/ の中身しかビルドしないため、これらは自動では含まれない。
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

// コピーしないもの（ソースコードやビルド周りのファイル・フォルダ）
const EXCLUDE = new Set([
  'src', 'api', 'dist', 'node_modules', '.git', '.github',
  'package.json', 'package-lock.json', 'vite.config.js', 'vercel.json',
  'index.html', 'copy-assets.js', '.gitignore',
]);
const EXCLUDE_PATTERNS = [/^README/i, /^\./];

function shouldExclude(name) {
  if (EXCLUDE.has(name)) return true;
  return EXCLUDE_PATTERNS.some(p => p.test(name));
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

let count = 0;
for (const name of fs.readdirSync(ROOT)) {
  if (shouldExclude(name)) continue;
  const srcPath = path.join(ROOT, name);
  const destPath = path.join(DIST, name);
  copyRecursive(srcPath, destPath);
  count++;
}

console.log(`静的ファイルのコピー完了: ${count}件`);
