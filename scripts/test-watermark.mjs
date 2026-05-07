// Smoke test: aplica watermark numa imagem do projeto e salva output em /tmp.
// Uso: node scripts/test-watermark.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyWatermark } from '../api/memo3d/_lib/watermark.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Usa baby-2 (já limpa, sem nome) como input de teste
const inputPath = path.join(root, 'public', 'imagens-3d', 'baby-2.webp');
const outPath = path.join(root, 'scripts', 'watermark-test-output.jpg');

console.log('Input:', inputPath);
const inputBuffer = fs.readFileSync(inputPath);
console.log('Input size:', inputBuffer.length, 'bytes');

const t0 = Date.now();
const watermarked = await applyWatermark(inputBuffer);
const elapsed = Date.now() - t0;

fs.writeFileSync(outPath, watermarked);
console.log('Output:', outPath);
console.log('Output size:', watermarked.length, 'bytes');
console.log('Tempo:', elapsed, 'ms');
console.log('OK — abre o arquivo pra conferir visualmente');
