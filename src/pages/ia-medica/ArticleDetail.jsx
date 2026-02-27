import { useState, useEffect, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  MapPin,
  DollarSign,
  Users,
  Activity,
  ExternalLink,
  Heart,
  Loader2,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import FloatingAccessibilityMenu from '../../components/FloatingAccessibilityMenu';
import { getArticleById, getPublishedArticles, incrementViews } from '../../lib/articles';
import './ArticleDetail.css';

// Memoized components for better performance
const ArticleImage = memo(function ArticleImage({ src, alt }) {
  return (
    <div className="article-image-container">
      <img
        src={src || '/images/ia-medica/default-article.svg'}
        alt={alt}
        className="article-header-image"
        loading="eager"
        decoding="async"
        onError={e => {
          e.target.src = '/images/ia-medica/default-article.svg';
        }}
      />
    </div>
  );
});

ArticleImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

const ArticleMeta = memo(function ArticleMeta({ article }) {
  const formatDate = dateValue => {
    if (!dateValue) return 'Data não disponível';

    try {
      const date = new Date(dateValue);
      // Verifica se a data é válida
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  return (
    <div className="article-meta">
      <div className="meta-item">
        <Calendar className="meta-icon" aria-hidden="true" />
        <span>{formatDate(article.published_at || article.date)}</span>
      </div>
      <div className="meta-item">
        <Clock className="meta-icon" aria-hidden="true" />
        <span>{article.readTime || article.read_time}</span>
      </div>
      <div className="meta-item">
        <User className="meta-icon" aria-hidden="true" />
        <span>{article.author}</span>
      </div>
      {article.views > 0 && (
        <div className="meta-item">
          <Activity className="meta-icon" aria-hidden="true" />
          <span>{article.views} visualizações</span>
        </div>
      )}
    </div>
  );
});

ArticleMeta.propTypes = {
  article: PropTypes.object,
};

const ArticleHighlights = memo(function ArticleHighlights({ article }) {
  const highlights = useMemo(() => {
    const items = [];
    if (article.investment || article.metadata?.investment) {
      items.push({
        icon: DollarSign,
        label: 'Investimento',
        value: article.investment || article.metadata?.investment,
      });
    }
    if (article.users || article.metadata?.users) {
      items.push({
        icon: Users,
        label: 'Usuários',
        value: article.users || article.metadata?.users,
      });
    }
    if (article.patients || article.metadata?.patients) {
      items.push({
        icon: Activity,
        label: 'Pacientes',
        value: article.patients || article.metadata?.patients,
      });
    }
    if (article.location || article.metadata?.location) {
      items.push({
        icon: MapPin,
        label: 'Local',
        value: article.location || article.metadata?.location,
      });
    }
    if (article.accuracy || article.metadata?.accuracy) {
      items.push({
        icon: Activity,
        label: 'Acurácia',
        value: article.accuracy || article.metadata?.accuracy,
      });
    }
    return items;
  }, [article]);

  if (highlights.length === 0) return null;

  return (
    <div className="article-highlights">
      {highlights.map(({ icon: Icon, label, value }, index) => (
        <div key={index} className="highlight-item">
          <Icon className="highlight-icon" aria-hidden="true" />
          <div>
            <span className="highlight-label">{label}</span>
            <span className="highlight-value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
});

ArticleHighlights.propTypes = {
  article: PropTypes.object,
};

const RelatedCard = memo(function RelatedCard({ article, onClick }) {
  const formatDate = dateValue => {
    if (!dateValue) return 'Data não disponível';

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <article
      className="related-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <img
        src={article.image || article.image_url || '/images/ia-medica/default-article.svg'}
        alt=""
        className="related-image"
        loading="lazy"
        decoding="async"
        onError={e => {
          e.target.src = '/images/ia-medica/default-article.svg';
        }}
      />
      <div className="related-content">
        <span className="related-category">{article.category}</span>
        <h4 className="related-title">{article.title}</h4>
        <p className="related-excerpt">{article.excerpt}</p>
        <div className="related-meta">
          <span>{formatDate(article.published_at || article.date)}</span>
          <span>•</span>
          <span>{article.readTime || article.read_time}</span>
        </div>
      </div>
    </article>
  );
});

RelatedCard.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func,
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const articleModules = import.meta.glob('./articles/article-*.json');

  const loadArticleFromJson = async articleId => {
    try {
      const modulePath = `./articles/article-${articleId}.json`;
      if (!articleModules[modulePath]) {
        throw new Error(`Artigo ${articleId} não encontrado`);
      }
      const articleData = await articleModules[modulePath]();
      return articleData.default || articleData;
    } catch (err) {
      console.error(`Erro ao carregar artigo ${articleId} do JSON:`, err);
      throw new Error(`Artigo ${articleId} não encontrado`);
    }
  };

  const getAvailableArticleIds = () => {
    return Object.keys(articleModules)
      .map(path => {
        const match = path.match(/article-(\d+)\.json/);
        return match ? parseInt(match[1]) : null;
      })
      .filter(id => id !== null);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        let articleData = await getArticleById(slug);

        if (!articleData) {
          articleData = await loadArticleFromJson(slug);
        }

        setArticle(articleData);

        if (articleData?.id) {
          incrementViews(articleData.id);
        }

        let related = [];
        try {
          const allArticles = await getPublishedArticles();
          related = allArticles
            .filter(
              a => a.id !== articleData.id && a.slug !== slug && a.category === articleData.category
            )
            .slice(0, 3);

          if (related.length < 3) {
            const others = allArticles
              .filter(
                a => a.id !== articleData.id && a.slug !== slug && !related.find(r => r.id === a.id)
              )
              .slice(0, 3 - related.length);
            related = [...related, ...others];
          }
        } catch (relErr) {
          const availableIds = getAvailableArticleIds();
          const relatedIds = availableIds
            .filter(availableId => availableId !== articleData.id)
            .slice(0, 3);

          const relatedPromises = relatedIds.map(relatedId =>
            loadArticleFromJson(relatedId).catch(() => null)
          );

          const relatedData = await Promise.all(relatedPromises);
          related = relatedData.filter(article => article !== null);
        }

        setRelatedArticles(related);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar artigo:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleBookmark = () => setIsBookmarked(!isBookmarked);
  const handleLike = () => setIsLiked(!isLiked);

  // Template class based on article template setting
  const templateClass = useMemo(() => {
    return article?.template ? `template-${article.template}` : 'template-classic';
  }, [article?.template]);

  if (loading) {
    return (
      <div className="loading" role="status" aria-live="polite">
        <Loader2 className="loading-spinner-icon" aria-hidden="true" />
        <span>Carregando artigo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <h2>Artigo não encontrado</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/ia-medica')} className="back-button">
          <ArrowLeft className="back-icon" aria-hidden="true" />
          Voltar para IA Médica
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="loading" role="status">
        <Loader2 className="loading-spinner-icon" aria-hidden="true" />
        <span>Carregando artigo...</span>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt}
        keywords={article.tags}
        image={article.image || article.image_url}
        article={true}
        publishedTime={article.date || article.published_at}
        author={article.author}
        canonical={`https://drmassuca.com.br/ia-medica/artigo/${article.slug || slug}`}
      />

      <div className={`article-detail-container ${templateClass}`}>
        {/* Navigation */}
        <nav className="article-navigation" aria-label="Navegação do artigo">
          <button onClick={() => navigate('/ia-medica')} className="back-button">
            <ArrowLeft className="back-icon" aria-hidden="true" />
            Voltar para IA Médica
          </button>
        </nav>

        {/* Accessibility Menu */}
        <FloatingAccessibilityMenu content={article.content} />

        {/* Article Image */}
        <ArticleImage src={article.image || article.image_url} alt={article.title} />

        {/* Article Header */}
        <header className="article-header">
          <div className="article-header-content">
            <h1 className="article-title">{article.title}</h1>
            {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}

            <div className="article-meta-top">
              <span className="article-category">{article.category}</span>
              <div className="article-actions" role="group" aria-label="Ações do artigo">
                <button
                  onClick={handleLike}
                  className={`action-btn ${isLiked ? 'liked' : ''}`}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? 'Descurtir' : 'Curtir'}
                >
                  <Heart className="action-icon" aria-hidden="true" />
                  {(article.likes || 0) + (isLiked ? 1 : 0)}
                </button>
                <button
                  onClick={handleBookmark}
                  className={`action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                  aria-pressed={isBookmarked}
                  aria-label={isBookmarked ? 'Remover dos salvos' : 'Salvar'}
                >
                  <Bookmark className="action-icon" aria-hidden="true" />
                </button>
                <button
                  onClick={handleShare}
                  className="action-btn"
                  aria-label="Compartilhar artigo"
                >
                  <Share2 className="action-icon" aria-hidden="true" />
                  {article.shares || 0}
                </button>
              </div>
            </div>

            <ArticleMeta article={article} />
            <ArticleHighlights article={article} />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags" role="list" aria-label="Tags do artigo">
                {article.tags.map(tag => (
                  <span key={tag} className="tag" role="listitem">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="article-content">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <section className="article-sources" aria-labelledby="sources-title">
            <h3 id="sources-title">Fontes e Referências</h3>
            <div className="sources-list">
              {article.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-item"
                >
                  <div className="source-info">
                    <span className="source-title">{source.title}</span>
                    <span className="source-type">{source.type}</span>
                  </div>
                  <ExternalLink className="source-icon" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles" aria-labelledby="related-title">
            <h3 id="related-title">Artigos Relacionados</h3>
            <div className="related-grid">
              {relatedArticles.map(related => (
                <RelatedCard
                  key={related.id}
                  article={related}
                  onClick={() => navigate(`/ia-medica/artigo/${related.slug || related.id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;
