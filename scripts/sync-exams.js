#!/usr/bin/env node
// scripts/sync-exams.js
// Sincroniza src/data/exams-data.json (fonte do RAG do chatbot + prerender)
// com as paginas dedicadas em src/pages/exam-details/*.jsx.
//
// PROBLEMA QUE RESOLVE:
// O conteudo real de cada exame vive no .jsx, mas o RAG (build-embeddings)
// e o prerender (HTML+sitemap) leem de exams-data.json. Sem sync, criar
// uma pagina nova de exame nao aparece no chatbot nem no sitemap ("drift").
// Este script extrai o conteudo das paginas e adiciona ao json os exames
// que ainda nao estao la — sem tocar nos ja curados a mao.
//
// Roda no `npm run build`, antes do prerender.
//
// Uso:
//   node scripts/sync-exams.js          # adiciona exames ausentes ao json
//   node scripts/sync-exams.js --check  # so reporta drift (exit 1 se houver) — pra CI
//   node scripts/sync-exams.js --dump   # imprime o que extrairia de cada pagina (debug)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const EXAM_DIR = path.join(ROOT, 'src', 'pages', 'exam-details');
const JSON_PATH = path.join(ROOT, 'src', 'data', 'exams-data.json');

const CHECK_ONLY = process.argv.includes('--check');
const DUMP = process.argv.includes('--dump');

function cleanText(s) {
  return (s || '')
    .replace(/<[^>]+>/g, ' ') // remove tags JSX internas (<strong>, <Image/>, etc)
    .replace(/\{[^}]*\}/g, ' ') // remove expressoes JSX {var}
    .replace(/&nbsp;/g, ' ')
    .replace(/^[•\s]+/, '') // remove bullet do inicio de ListItem
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExam(jsxPath, fileName) {
  const src = fs.readFileSync(jsxPath, 'utf-8');

  const slugM = src.match(/const\s+SLUG\s*=\s*['"]([^'"]+)['"]/);
  if (!slugM) {
    console.warn(`[sync-exams] WARN: ${fileName} sem const SLUG — ignorado`);
    return null;
  }
  const slug = slugM[1];

  // Titulo visivel = primeiro <Heading as="h1">
  const h1M = src.match(/<Heading\s+as="h1"[^>]*>([\s\S]*?)<\/Heading>/);
  const title = h1M ? cleanText(h1M[1]) : slug;

  // Imagem do <ExamImage src="/img-exams-webp/...">
  const imgM = src.match(/src=["'](\/img-exams-webp\/[^"']+)["']/);
  const image = imgM ? imgM[1] : `/img-exams-webp/${slug}.webp`;

  // Blocos de conteudo em ordem de aparicao: Heading (h2+), Text, ListItem.
  // Essas tags nao se aninham entre si, entao regex nao-greedy e seguro.
  const BLOCK_RE = /<(Heading|Text|ListItem)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  const paragraphs = [];
  let currentSection = null;
  let buffer = [];

  const flush = () => {
    if (buffer.length === 0) return;
    const text = buffer.join(' ').trim();
    if (text) paragraphs.push(currentSection ? `${currentSection}: ${text}` : text);
    buffer = [];
  };

  let m;
  while ((m = BLOCK_RE.exec(src)) !== null) {
    const tag = m[1];
    const attrs = m[2] || '';
    const inner = cleanText(m[3]);
    if (!inner) continue;

    if (tag === 'Heading') {
      if (/as="h1"/.test(attrs)) continue; // titulo ja capturado
      flush(); // fecha secao anterior
      currentSection = inner;
    } else {
      buffer.push(inner); // Text ou ListItem -> conteudo da secao atual
    }
  }
  flush();

  return { slug, title, image, paragraphs };
}

function main() {
  const files = fs.readdirSync(EXAM_DIR).filter(f => f.endsWith('.jsx'));
  const extracted = [];
  for (const f of files) {
    const ex = extractExam(path.join(EXAM_DIR, f), f);
    if (!ex) continue;
    if (ex.paragraphs.length === 0) {
      console.warn(`[sync-exams] WARN: ${f} sem paragrafos extraidos — ignorado`);
      continue;
    }
    extracted.push(ex);
  }

  if (DUMP) {
    console.log(JSON.stringify(extracted, null, 2));
    return;
  }

  const json = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const existingSlugs = new Set(json.map(e => e.slug));
  const missing = extracted.filter(e => !existingSlugs.has(e.slug));

  if (missing.length === 0) {
    console.log(`[sync-exams] OK: ${extracted.length} paginas exam-details, todas no json.`);
    return;
  }

  console.log(`[sync-exams] ${missing.length} exame(s) faltando no json:`);
  for (const e of missing) {
    console.log(`  + ${e.slug} ("${e.title}", ${e.paragraphs.length} paragrafos)`);
  }

  if (CHECK_ONLY) {
    console.error(
      `[sync-exams] --check: drift detectado. Rode 'node scripts/sync-exams.js' pra sincronizar.`
    );
    process.exit(1);
  }

  // Novos no topo, preserva ordem e curadoria dos existentes
  const merged = [...missing, ...json];
  fs.writeFileSync(JSON_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  console.log(`[sync-exams] json atualizado: ${merged.length} exames (+${missing.length}).`);
}

main();
