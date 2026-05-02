#!/usr/bin/env node
// Otimizacao de imagens criticas (one-shot, idempotente).
// Cria backup .original.webp na primeira execucao e usa ele como fonte
// nas execucoes seguintes (evita degradacao em cascata).
//
// Pre-requisito: npm install --save-dev sharp
// Uso: node scripts/optimize-images.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('[optimize-images] sharp nao instalado. Rode:');
  console.error('  npm install --save-dev sharp');
  process.exit(1);
}

// ---------- targets ----------
const TARGETS = [
  {
    file: 'logo.webp',
    width: 256,
    height: 256,
    quality: 85,
    note: 'usado em header (70px) e about (~123px) - 256 cobre Retina ate 128',
  },
  {
    file: 'assets/face.webp',
    width: 128,
    height: 128,
    quality: 85,
    note: 'avatar do chatbot (sm/md ~32-40px) - 128 cobre Retina',
  },
  {
    file: 'assets/texture_olive_dark_seamless.webp',
    quality: 75,
    note: 'background tile - mantem dimensoes, so re-comprime',
  },
];

// ---------- helpers ----------
function fmtKB(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

async function processOne(target) {
  const filePath = path.join(PUBLIC, target.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[skip] ${target.file} nao existe`);
    return;
  }

  const backupPath = filePath.replace(/\.webp$/, '.original.webp');

  // Cria backup na primeira execucao; depois usa o backup como fonte
  let sourceBuffer;
  if (!fs.existsSync(backupPath)) {
    sourceBuffer = fs.readFileSync(filePath);
    fs.writeFileSync(backupPath, sourceBuffer);
    console.log(`[backup] ${target.file} -> ${path.basename(backupPath)}`);
  } else {
    sourceBuffer = fs.readFileSync(backupPath);
  }

  const before = sourceBuffer.length;

  let pipeline = sharp(sourceBuffer);
  if (target.width && target.height) {
    pipeline = pipeline.resize(target.width, target.height, {
      fit: 'cover',
      withoutEnlargement: false,
    });
  }
  pipeline = pipeline.webp({ quality: target.quality });

  const out = await pipeline.toBuffer();
  fs.writeFileSync(filePath, out);
  const after = out.length;
  const savings = before - after;
  const pct = Math.round((savings / before) * 100);

  console.log(
    `[ok] ${target.file}: ${fmtKB(before)} -> ${fmtKB(after)} (-${fmtKB(savings)}, -${pct}%)` +
      (target.note ? `\n     ${target.note}` : '')
  );
}

// ---------- main ----------
let totalBefore = 0;
let totalAfter = 0;
for (const target of TARGETS) {
  const p = path.join(PUBLIC, target.file);
  if (fs.existsSync(p)) totalBefore += fs.statSync(p).size;
  await processOne(target);
  if (fs.existsSync(p)) totalAfter += fs.statSync(p).size;
}

console.log(
  `\n[total] ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)} (-${fmtKB(totalBefore - totalAfter)})`
);
