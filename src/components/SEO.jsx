import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title,
  description,
  canonical,
  image = '/icons/favicon-512.png',
  keywords = '',
  type = 'website',
  structuredData = null,
  noindex = false,
}) => {
  const location = useLocation();

  // Força sempre sem "www." e garante URLs limpas
  const normalizeCanonical = url => {
    if (!url) return '';
    return url.replace('www.', '').replace(/\/$/, ''); // Remove trailing slash
  };

  const fullCanonical = canonical?.startsWith('http')
    ? normalizeCanonical(canonical)
    : `https://drmassuca.com.br${normalizeCanonical(canonical || location.pathname)}`;

  // Garantir que imagem seja URL absoluta
  const fullImageUrl = image?.startsWith('http') ? image : `https://drmassuca.com.br${image}`;

  // Keywords padrão para todas as páginas
  const defaultKeywords = 'ultrassom, ultrassonografia, Itaberaí, GO, Goiás, Dr Massuca, exame';
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Metas básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={finalKeywords} />}

      {/* SEO técnico */}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="author" content="Dr. Antonio Massucatti Neto" />
      <meta name="geo.region" content="BR-GO" />
      <meta name="geo.placename" content="Itaberaí" />
      <meta name="geo.position" content="-15.95;-49.95" />
      <meta name="ICBM" content="-15.95, -49.95" />

      {/* Hreflang para português brasileiro */}
      <link rel="alternate" hrefLang="pt-BR" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

      {/* Open Graph otimizado */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Dr. Massuca | Ultrassom" />

      {/* Twitter Card otimizado */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@drmassuca" />
      <meta name="twitter:creator" content="@drmassuca" />

      {/* Schema.org estruturado (se fornecido) */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

/* PropTypes */
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.object,
  noindex: PropTypes.bool,
};

export default SEO;
