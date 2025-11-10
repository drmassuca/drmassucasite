import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { getAbsoluteUrl, getCanonicalUrl, SITE_CONFIG } from '../config/site';

const SEOHead = ({
  title = '',
  description = '',
  keywords = [],
  image = '',
  article = false,
  publishedTime = '',
  modifiedTime = '',
  author = 'Dr. Massuca',
  canonical = '',
}) => {
  const baseTitle = 'Dr. Massuca - Medicina Inteligente';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  const defaultDescription =
    'Acompanhe as últimas inovações em Inteligência Artificial na medicina brasileira. Notícias, pesquisas e análises especializadas sobre IA médica, startups de saúde e transformação digital hospitalar.';

  const seoDescription = description || defaultDescription;

  const defaultKeywords = [
    'IA médica',
    'inteligência artificial medicina',
    'saúde digital Brasil',
    'startups saúde',
    'hospital inteligente',
    'telemedicina',
    'Dr. Massuca',
    'inovação médica',
    'tecnologia hospitalar',
    'diagnóstico IA',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  // Processar imagem para URL absoluta (CRÍTICO para WhatsApp/Facebook/Twitter)
  const seoImage = getAbsoluteUrl(image || SITE_CONFIG.defaultImage);

  // Processar URL canônica
  const currentUrl = canonical
    ? getCanonicalUrl(canonical)
    : typeof window !== 'undefined'
      ? window.location.href
      : SITE_CONFIG.baseUrl;

  return (
    <Helmet>
      {/* Título */}
      <title>{fullTitle}</title>

      {/* Meta tags básicas */}
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph - Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:secure_url" content={seoImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={SITE_CONFIG.ogImage.width} />
      <meta property="og:image:height" content={SITE_CONFIG.ogImage.height} />
      <meta property="og:image:alt" content={title || 'Dr. Massuca - Medicina Inteligente'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Dr. Massuca" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={title || 'Dr. Massuca - Medicina Inteligente'} />
      <meta name="twitter:creator" content={SITE_CONFIG.social.twitter} />
      <meta name="twitter:site" content={SITE_CONFIG.social.twitter} />

      {/* Para artigos - dados estruturados */}
      {article && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Medicina" />
          <meta property="article:tag" content="IA Médica" />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Dados estruturados JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': article ? 'Article' : 'WebSite',
          name: fullTitle,
          description: seoDescription,
          url: currentUrl,
          image: seoImage,
          author: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Dr. Massuca',
            logo: {
              '@type': 'ImageObject',
              url: '/images/dr-massuca-logo.png',
            },
          },
          ...(article &&
            publishedTime && {
              datePublished: publishedTime,
              dateModified: modifiedTime || publishedTime,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': currentUrl,
              },
            }),
          ...(article && {
            articleSection: 'Medicina',
            about: {
              '@type': 'Thing',
              name: 'Inteligência Artificial na Medicina',
            },
            keywords: allKeywords,
          }),
        })}
      </script>

      {/* Meta tags específicas para IA Médica */}
      <meta name="category" content="Saúde" />
      <meta name="coverage" content="Brasil" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Link tags adicionais */}
      <link rel="alternate" type="application/rss+xml" title="Dr. Massuca RSS" href="/rss.xml" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* Para PWA */}
      <meta name="theme-color" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dr. Massuca" />

      {/* Preload de recursos críticos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Para indexação melhor */}
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
    </Helmet>
  );
};

// Presets de SEO para diferentes tipos de página
export const SEOPresets = {
  homePage: {
    title: 'Medicina Inteligente e IA no Brasil',
    description:
      'Portal especializado em Inteligência Artificial na medicina brasileira. Notícias, análises e inovações em saúde digital, startups médicas e hospitais inteligentes.',
    keywords: ['medicina inteligente', 'portal médico', 'saúde Brasil'],
  },

  iaMedicaHome: {
    title: 'IA Médica - Inteligência Artificial na Medicina Brasileira',
    description:
      'Acompanhe todas as novidades sobre IA na medicina brasileira: startups inovadoras, pesquisas acadêmicas, hospitais inteligentes e regulamentação. Conteúdo atualizado para profissionais da saúde.',
    keywords: [
      'IA médica',
      'hospitais inteligentes',
      'startups saúde',
      'pesquisa médica',
      'regulamentação IA',
    ],
  },

  articleITMI: {
    title: 'ITMI-Brasil: Primeiro Hospital Público Inteligente com IA',
    description:
      'Hospital das Clínicas da USP receberá US$ 320 milhões para criar o primeiro hospital público inteligente do Brasil, reduzindo tempo de espera de 17h para 2h com IA e 5G.',
    keywords: ['ITMI Brasil', 'hospital inteligente', 'USP', 'IA hospitalar', 'SUS tecnologia'],
  },

  articleVoaHealth: {
    title: 'Voa Health: Startup Brasileira Revoluciona Prontuários com IA',
    description:
      'Startup brasileira recebe US$ 3 milhões da Prosus Ventures e reduz 80% do tempo de documentação médica com IA generativa. 20 mil médicos já utilizam a plataforma.',
    keywords: [
      'Voa Health',
      'prontuário eletrônico',
      'IA generativa',
      'startup saúde',
      'Prosus Ventures',
    ],
  },
};

// PropTypes para validação
SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
  image: PropTypes.string,
  article: PropTypes.bool,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  author: PropTypes.string,
  canonical: PropTypes.string,
};

// ✅ REMOVIDO: defaultProps (deprecated)
// Agora usando JavaScript default parameters na função

export default SEOHead;
