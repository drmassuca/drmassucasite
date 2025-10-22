import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import FloatingAccessibilityMenu from '../../components/FloatingAccessibilityMenu';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar um artigo específico
  const loadArticle = async articleId => {
    try {
      setLoading(true);
      setError(null);

      // Importar o JSON do artigo dinamicamente
      const articleData = await import(`./articles/article-${articleId}.json`);
      return articleData.default || articleData;
    } catch (err) {
      console.error(`Erro ao carregar artigo ${articleId}:`, err);
      throw new Error(`Artigo ${articleId} não encontrado`);
    }
  };

  // Função para carregar todos os IDs de artigos disponíveis
  const getAvailableArticleIds = () => {
    // IDs dos artigos existentes
    return [1, 2, 6, 7, 8, 10, 11, 12, 13];
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Carregar o artigo atual
        const articleData = await loadArticle(id);
        setArticle(articleData);

        // Carregar artigos relacionados
        const availableIds = getAvailableArticleIds();
        const relatedIds = availableIds
          .filter(availableId => availableId !== parseInt(id))
          .slice(0, 3); // Pegar apenas 3 relacionados

        const relatedPromises = relatedIds.map(relatedId =>
          loadArticle(relatedId).catch(err => null)
        );

        const relatedData = await Promise.all(relatedPromises);
        const validRelated = relatedData.filter(article => article !== null);

        setRelatedArticles(validRelated);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <div className="loading">Carregando artigo...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Artigo não encontrado</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/ia-medica')} className="back-button">
          <ArrowLeft className="back-icon" />
          Voltar para IA Médica
        </button>
      </div>
    );
  }

  if (!article) {
    return <div className="loading">Carregando artigo...</div>;
  }

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        keywords={article.tags}
        image={article.image}
        article={true}
        publishedTime={article.date}
        author={article.author}
        canonical={`https://drmassuca.com.br/ia-medica/artigo/${article.id}`}
      />

      <div className="article-detail-container">
        {/* Breadcrumb e Navegação */}
        <div className="article-navigation">
          <button onClick={() => navigate('/ia-medica')} className="back-button">
            <ArrowLeft className="back-icon" />
            Voltar para IA Médica
          </button>
        </div>

        {/* Menu Flutuante de Acessibilidade */}
        <FloatingAccessibilityMenu content={article.content} />

        {/* Imagem do Artigo */}
        <div className="article-image-container">
          <img
            src={article.image || '/images/ia-medica/default-article.svg'}
            alt={article.title}
            className="article-header-image"
            onError={e => {
              e.target.src = '/images/ia-medica/default-article.svg';
            }}
          />
        </div>

        {/* Header do Artigo */}
        <header className="article-header">
          <div className="article-header-content">
            <h1 className="article-title">{article.title}</h1>
            {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}

            <div className="article-meta-top">
              <span className="article-category">{article.category}</span>
              <div className="article-actions">
                <button onClick={handleLike} className={`action-btn ${isLiked ? 'liked' : ''}`}>
                  <Heart className="action-icon" />
                  {article.likes + (isLiked ? 1 : 0)}
                </button>
                <button
                  onClick={handleBookmark}
                  className={`action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                >
                  <Bookmark className="action-icon" />
                </button>
                <button onClick={handleShare} className="action-btn">
                  <Share2 className="action-icon" />
                  {article.shares || 0}
                </button>
              </div>
            </div>

            {/* Metadados do Artigo */}
            <div className="article-meta">
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="meta-item">
                <Clock className="meta-icon" />
                <span>{article.readTime}</span>
              </div>
              <div className="meta-item">
                <User className="meta-icon" />
                <span>{article.author}</span>
              </div>
            </div>

            {/* Métricas especiais (se houver) */}
            {(article.investment || article.users || article.patients) && (
              <div className="article-highlights">
                {article.investment && (
                  <div className="highlight-item">
                    <DollarSign className="highlight-icon" />
                    <div>
                      <span className="highlight-label">Investimento</span>
                      <span className="highlight-value">{article.investment}</span>
                    </div>
                  </div>
                )}
                {article.users && (
                  <div className="highlight-item">
                    <Users className="highlight-icon" />
                    <div>
                      <span className="highlight-label">Usuários</span>
                      <span className="highlight-value">{article.users}</span>
                    </div>
                  </div>
                )}
                {article.patients && (
                  <div className="highlight-item">
                    <Activity className="highlight-icon" />
                    <div>
                      <span className="highlight-label">Pacientes</span>
                      <span className="highlight-value">{article.patients}</span>
                    </div>
                  </div>
                )}
                {article.location && (
                  <div className="highlight-item">
                    <MapPin className="highlight-icon" />
                    <div>
                      <span className="highlight-label">Local</span>
                      <span className="highlight-value">{article.location}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="article-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Conteúdo do Artigo */}
        <article className="article-content">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Fontes e Referências */}
        {article.sources && article.sources.length > 0 && (
          <section className="article-sources">
            <h3>Fontes e Referências</h3>
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
                  <ExternalLink className="source-icon" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Artigos Relacionados */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h3>Artigos Relacionados</h3>
            <div className="related-grid">
              {relatedArticles.map(related => (
                <div
                  key={related.id}
                  className="related-card"
                  onClick={() => navigate(`/ia-medica/artigo/${related.id}`)}
                >
                  <img
                    src={related.image || '/images/ia-medica/default-article.svg'}
                    alt={related.title}
                    className="related-image"
                    onError={e => {
                      e.target.src = '/images/ia-medica/default-article.svg';
                    }}
                  />
                  <div className="related-content">
                    <span className="related-category">{related.category}</span>
                    <h4 className="related-title">{related.title}</h4>
                    <p className="related-excerpt">{related.excerpt}</p>
                    <div className="related-meta">
                      <span>{new Date(related.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;
