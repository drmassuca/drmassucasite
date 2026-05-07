// Corta metadata da maquina (nome de paciente, telefone, info tecnica)
// dos arquivos baby-4.webp e ultrassom-3d-4.webp.
//
// Uso: node scripts/crop-baby-4.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '..', 'public', 'imagens-3d');
const src = path.join(dir, 'baby-4.webp');

console.log('Lendo:', src);
const meta = await sharp(src).metadata();
console.log('Original:', meta.width + 'x' + meta.height);

// Crop bounds — removem barra superior (ANA CAROLINA OLIVEIRA RODRIGUES + telefone),
// barra inferior, coluna tecnica direita, e logo Voluson esquerda.
// Calculados pra baby-4 (1136x852).
const left = 60;
const top = 80;
const width = 1136 - 60 - 180; // = 896
const height = 852 - 80 - 35; // = 737

const buf = await sharp(src)
  .extract({ left, top, width, height })
  .webp({ quality: 92 })
  .toBuffer();

// Workaround Windows: writeFileSync direto em public/ tava dando UNKNOWN errno.
// Escrevemos em arquivos temporarios e renomeamos por cima dos originais.
const tmpBaby = path.join(dir, 'baby-4.tmp.webp');
const tmpU3d = path.join(dir, 'ultrassom-3d-4.tmp.webp');
fs.writeFileSync(tmpBaby, buf);
fs.writeFileSync(tmpU3d, buf);
fs.renameSync(tmpBaby, path.join(dir, 'baby-4.webp'));
fs.renameSync(tmpU3d, path.join(dir, 'ultrassom-3d-4.webp'));

const newMeta = await sharp(path.join(dir, 'baby-4.webp')).metadata();
console.log('Cortada:', newMeta.width + 'x' + newMeta.height + ' · ' + buf.length + ' bytes');
console.log('OK — gravada em baby-4.webp e ultrassom-3d-4.webp');
