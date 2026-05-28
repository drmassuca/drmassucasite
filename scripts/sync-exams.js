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
const APP_JSX = path.join(ROOT, 'src', 'App.jsx');

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

// Mapeia cada arquivo exam-details/<file>.jsx -> slug da ROTA real em App.jsx.
// A rota e a fonte de verdade do slug (URL publica/indexada). O `const SLUG`
// interno de algumas paginas diverge da rota — confiar nele gera URL 404 no
// sitemap + chunk duplicado no RAG. Por isso priorizamos a rota.
function loadExamRouteMap() {
  const src = fs.readFileSync(APP_JSX, 'utf-8');
  const compToFile = new Map();
  const IMPORT_RE =
    /const\s+(\w+)\s*=\s*lazy\(\s*(?:\(\)\s*=>\s*)?import\(\s*['"]\.\/pages\/exam-details\/([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = IMPORT_RE.exec(src)) !== null) compToFile.set(m[1], m[2]);

  const fileToSlug = new Map();
  const ROUTE_RE = /path=["']\/exames\/([^"']+)["']\s+element=\{<(\w+)/g;
  while ((m = ROUTE_RE.exec(src)) !== null) {
    const file = compToFile.get(m[2]);
    if (file) fileToSlug.set(file, m[1]);
  }
  return fileToSlug;
}

function extractExam(jsxPath, fileName, routeMap) {
  const src = fs.readFileSync(jsxPath, 'utf-8');

  const fileBase = fileName.replace(/\.jsx$/, '');
  const routeSlug = routeMap.get(fileBase);
  const slugM = src.match(/const\s+SLUG\s*=\s*['"]([^'"]+)['"]/);
  const slug = routeSlug || (slugM ? slugM[1] : null);
  if (!slug) {
    console.warn(`[sync-exams] WARN: ${fileName} sem rota em App.jsx nem const SLUG — ignorado`);
    return null;
  }
  if (routeSlug && slugM && routeSlug !== slugM[1]) {
    console.warn(
      `[sync-exams] NOTA: ${fileName} const SLUG="${slugM[1]}" difere da rota "/exames/${routeSlug}" — usando a rota (URL real).`
    );
  }

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

  return { slug, title, image, paragraphs, _file: fileBase };
}

function main() {
  const routeMap = loadExamRouteMap();
  const files = fs.readdirSync(EXAM_DIR).filter(f => f.endsWith('.jsx'));
  const extracted = [];
  for (const f of files) {
    const ex = extractExam(path.join(EXAM_DIR, f), f, routeMap);
    if (!ex) continue;
    if (ex.paragraphs.length === 0) {
      console.warn(`[sync-exams] WARN: ${f} sem paragrafos extraidos — ignorado`);
      continue;
    }
    extracted.push(ex);
  }

  if (DUMP) {
    console.log(JSON.stringify(extracted.map(({ _file, ...e }) => e), null, 2));
    return;
  }

  const json = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const bySlug = new Map(json.map(e => [e.slug, e]));

  const added = [];
  const corrected = [];

  for (const ex of extracted) {
    const { _file, ...entry } = ex;
    const routeSlug = entry.slug; // ja priorizado pra rota em extractExam

    if (bySlug.has(routeSlug)) continue; // ja correto no json

    const legacy = bySlug.get(_file); // entrada antiga com slug == nome do arquivo (errado)
    if (legacy && _file !== routeSlug) {
      // Corrige o slug da entrada existente pro da rota; preserva conteudo curado
      legacy.slug = routeSlug;
      bySlug.delete(_file);
      bySlug.set(routeSlug, legacy);
      corrected.push(`${_file} -> ${routeSlug}`);
    } else {
      json.unshift(entry); // exame novo: adiciona no topo
      bySlug.set(routeSlug, entry);
      added.push(routeSlug);
    }
  }

  if (added.length === 0 && corrected.length === 0) {
    console.log(`[sync-exams] OK: ${extracted.length} paginas exam-details, json sincronizado.`);
    return;
  }

  if (added.length) console.log(`[sync-exams] +${added.length} exame(s): ${added.join(', ')}`);
  if (corrected.length)
    console.log(`[sync-exams] ~${corrected.length} slug(s) corrigido(s): ${corrected.join(', ')}`);

  if (CHECK_ONLY) {
    console.error(
      `[sync-exams] --check: drift detectado. Rode 'node scripts/sync-exams.js' pra sincronizar.`
    );
    process.exit(1);
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`[sync-exams] json atualizado: ${json.length} exames.`);
}

main();
