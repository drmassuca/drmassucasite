/**
 * Injeta as webfonts do sistema editorial (Cormorant Garamond + Inter)
 * uma única vez por sessão. Usado pelo EditorialShell e pela pele
 * "edição tech" da IA Médica. Injeção direta no head (padrão da
 * review-z20), sem depender do flush assíncrono do Helmet.
 */
export function injetaFontesEditoriais() {
  if (typeof document === 'undefined' || document.getElementById('ed-fontes')) return;
  const preApi = document.createElement('link');
  preApi.rel = 'preconnect';
  preApi.href = 'https://fonts.googleapis.com';
  const preStatic = document.createElement('link');
  preStatic.rel = 'preconnect';
  preStatic.href = 'https://fonts.gstatic.com';
  preStatic.crossOrigin = 'anonymous';
  const css = document.createElement('link');
  css.id = 'ed-fontes';
  css.rel = 'stylesheet';
  css.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap';
  document.head.append(preApi, preStatic, css);
}
