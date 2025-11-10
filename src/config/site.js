/**
 * Configurações centralizadas do site Dr. Massuca
 * Usado para SEO, Open Graph, URLs absolutas, etc.
 */

export const SITE_CONFIG = {
  // URL base do site (IMPORTANTE: sem barra no final)
  baseUrl: 'https://drmassuca.com.br',

  // Informações do site
  siteName: 'Dr. Massuca',
  siteDescription:
    'Acompanhe as últimas inovações em Inteligência Artificial na medicina brasileira. Notícias, pesquisas e análises especializadas sobre IA médica.',

  // Imagens padrão
  defaultImage: '/images/dr-massuca-og-image.jpg',
  defaultLogo: '/images/dr-massuca-logo.png',

  // Redes sociais
  social: {
    twitter: '@drmassuca',
    facebook: 'drmassuca',
  },

  // Autor padrão
  author: 'Dr. Massuca',

  // Dimensões recomendadas para Open Graph
  ogImage: {
    width: 1200,
    height: 630,
  },
};

/**
 * Converte URL relativa em URL absoluta
 * @param {string} path - Caminho relativo (ex: /images/foto.jpg)
 * @returns {string} URL absoluta (ex: https://drmassuca.com.br/images/foto.jpg)
 */
export const getAbsoluteUrl = path => {
  // Se não tem path, retorna imagem padrão
  if (!path) {
    return SITE_CONFIG.baseUrl + SITE_CONFIG.defaultImage;
  }

  // Se já é URL absoluta (começa com http ou https), retorna como está
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Se é URL relativa, adiciona o baseUrl
  // Garante que não tem barra duplicada
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return SITE_CONFIG.baseUrl + cleanPath;
};

/**
 * Valida se uma imagem existe ou retorna fallback
 * @param {string} imagePath - Caminho da imagem
 * @param {string} fallback - Imagem de fallback (opcional)
 * @returns {string} Caminho da imagem validado
 */
export const getValidImagePath = (imagePath, fallback = SITE_CONFIG.defaultImage) => {
  return imagePath || fallback;
};

/**
 * Gera URL canônica para uma página
 * @param {string} path - Caminho da página (ex: /ia-medica/artigo/14)
 * @returns {string} URL canônica completa
 */
export const getCanonicalUrl = path => {
  if (!path) return SITE_CONFIG.baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return SITE_CONFIG.baseUrl + cleanPath;
};

export default SITE_CONFIG;
