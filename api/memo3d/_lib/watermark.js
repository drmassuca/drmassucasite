/**
 * Memo3D — aplica marca d'água do Dr. Massuca em foto antes do upload pro R2.
 *
 * Porta a lógica do tool C:\DEV\TOOLS\imgwatermark-horizontal pra dentro do
 * back-end. Aplicação automática em todos os uploads do Memo3D, garantindo
 * que nenhuma foto chegue ao R2 sem marca.
 *
 * Faz três coisas:
 *   1. Redimensiona pra 1136x852 (formato horizontal Voluson) com fit:'contain'
 *      e fundo preto se a imagem original tiver outra proporção.
 *   2. Compõe texto 'Dr. Massuca | Ultrassom' a 90% da altura, dourado
 *      transparente com sombra preta.
 *   3. Compõe o logo dourado (recolorido via color matrix SVG) no canto
 *      superior esquerdo, ocupando 50% da largura.
 *
 * Saída: JPEG quality 90, mozjpeg, progressive.
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, 'assets', 'watermark-logo.png');

const TARGET_WIDTH = 1136;
const TARGET_HEIGHT = 852;
const LOGO_WIDTH_RATIO = 0.5; // 50% da largura
const LOGO_MARGIN = 20;
const TEXT = 'Dr. Massuca | Ultrassom';

function buildTextSVG(width, height) {
  const fontSize = Math.floor(width * 0.035);
  const strokeWidth = Math.floor(fontSize * 0.05);
  const yPosition = height * 0.9;
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="textShadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="black" flood-opacity="1"/>
        </filter>
      </defs>
      <text
        x="50%"
        y="${yPosition}"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="#FFDFA8"
        fill-opacity="0.2"
        stroke="#000000"
        stroke-width="${strokeWidth}"
        stroke-opacity="0.2"
        filter="url(#textShadow)"
      >${TEXT}</text>
    </svg>
  `;
}

async function buildGoldenLogoSVG(targetWidth) {
  // Resize do logo original mantendo proporção
  const logoBuffer = await sharp(LOGO_PATH)
    .resize(targetWidth, null, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();
  const { width, height } = await sharp(logoBuffer).metadata();

  // SVG com color-matrix dourado e bordas arredondadas, alpha 0.15
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goldenTransparent">
          <feColorMatrix type="matrix" values="
            1.4 0.8 0.2 0 0
            1.2 0.6 0.1 0 0
            0.6 0.3 0.0 0 0
            0 0 0 0.15 0
          "/>
        </filter>
        <clipPath id="roundedCorners">
          <rect x="0" y="0" width="${width}" height="${height}"
                rx="${Math.floor(width * 0.1)}" ry="${Math.floor(height * 0.1)}"/>
        </clipPath>
      </defs>
      <image href="data:image/png;base64,${logoBuffer.toString('base64')}"
             width="100%" height="100%"
             filter="url(#goldenTransparent)"
             clip-path="url(#roundedCorners)"/>
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Aplica watermark em uma foto.
 * @param {Buffer} inputBuffer  bytes da imagem original (jpg/png/webp)
 * @returns {Promise<Buffer>}   bytes da imagem JPEG com watermark
 */
export async function applyWatermark(inputBuffer) {
  // 1) normaliza pra 1136x852 com fundo preto se aspect diferente
  const meta = await sharp(inputBuffer).metadata();
  let normalized;
  if (meta.width === TARGET_WIDTH && meta.height === TARGET_HEIGHT) {
    normalized = await sharp(inputBuffer).jpeg({ quality: 95 }).toBuffer();
  } else {
    normalized = await sharp(inputBuffer)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .jpeg({ quality: 95 })
      .toBuffer();
  }

  // 2) gera o logo dourado e o texto
  const logoTargetWidth = Math.floor(TARGET_WIDTH * LOGO_WIDTH_RATIO);
  const [goldenLogo, textSvg] = await Promise.all([
    buildGoldenLogoSVG(logoTargetWidth),
    Promise.resolve(Buffer.from(buildTextSVG(TARGET_WIDTH, TARGET_HEIGHT))),
  ]);

  // 3) compõe ambos sobre a imagem normalizada
  const out = await sharp(normalized)
    .composite([
      { input: textSvg, blend: 'over' },
      { input: goldenLogo, top: LOGO_MARGIN, left: LOGO_MARGIN, blend: 'over' },
    ])
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toBuffer();

  return out;
}
