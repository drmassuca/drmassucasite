import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, User, Share2, Bookmark, 
  TrendingUp, MapPin, DollarSign, Users, Activity,
  ExternalLink, Download, Heart
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Base de dados completa dos artigos
  const articlesDatabase = {
    1: {
      id: 1,
      title: "ITMI-Brasil: Primeiro Hospital Público Inteligente do País",
      subtitle: "Ministério da Saúde anuncia marco tecnológico que promete revolucionar o atendimento no SUS",
      excerpt: "Ministério da Saúde anuncia hospital com 800 leitos que reduzirá tempo de espera de 17h para 2h usando IA e 5G.",
      category: "Infraestrutura",
      date: "2025-09-07",
      readTime: "5 min",
      author: "Dr. Massuca",
      tags: ["SUS", "Hospital Inteligente", "5G", "Emergência", "IA Médica"],
      featured: true,
      image: "/images/ia-medica/hospital-inteligente.svg",
      investment: "US$ 320 milhões",
      location: "Hospital das Clínicas - USP/SP",
      likes: 247,
      shares: 89,
      content: `
        <h2>Uma Nova Era na Saúde Pública Brasileira</h2>
        
        <p>O Brasil está prestes a dar um salto tecnológico sem precedentes na área da saúde pública. O <strong>Instituto Tecnológico de Medicina Inteligente (ITMI-Brasil)</strong> representa muito mais que um hospital – é o símbolo de uma transformação digital que promete revolucionar o atendimento médico no país.</p>

        <div class="highlight-box">
          <h3>🏥 Números Impressionantes</h3>
          <ul>
            <li><strong>800 leitos</strong> especializados em emergências críticas</li>
            <li><strong>Redução de 17h para 2h</strong> no tempo de espera</li>
            <li><strong>US$ 320 milhões</strong> em investimento dos BRICS</li>
            <li><strong>Previsão de inauguração:</strong> 2027</li>
          </ul>
        </div>

        <h3>Tecnologias Revolucionárias</h3>
        
        <p>O ITMI-Brasil integrará um ecossistema tecnológico completo:</p>
        
        <h4>🚑 Ambulâncias Conectadas 5G</h4>
        <p>Sistema de comunicação em tempo real entre ambulâncias e hospital, permitindo que a equipe médica receba dados vitais do paciente antes mesmo de sua chegada, otimizando o preparo para o atendimento.</p>

        <h4>🧠 Inteligência Artificial Diagnóstica</h4>
        <p>Algoritmos avançados auxiliarão médicos na tomada de decisões, analisando exames, histórico do paciente e sintomas para sugerir diagnósticos mais rápidos e precisos.</p>

        <h4>🏥 UTIs Preditivas</h4>
        <p>Sistemas de IA monitorarão constantemente pacientes críticos, identificando sinais precoces de complicações como sepse ou choque, permitindo intervenções preventivas.</p>

        <h4>📱 Plataformas de Telessaúde</h4>
        <p>Integração completa com consultas remotas, monitoramento domiciliar e acompanhamento pós-alta, expandindo o cuidado além das paredes do hospital.</p>

        <h3>Impacto no SUS</h3>
        
        <p>Além de melhorar dramaticamente a eficiência no atendimento, o ITMI-Brasil funcionará como um <strong>centro de inovação e formação</strong> em saúde digital. A iniciativa promete:</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚡ Diagnósticos Mais Rápidos</strong>
            <p>IA auxiliará na interpretação de exames e na identificação precoce de patologias</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Terapias Personalizadas</strong>
            <p>Tratamentos adaptados ao perfil individual de cada paciente</p>
          </div>
          <div class="benefit-item">
            <strong>🔮 Medicina Preditiva</strong>
            <p>Antecipação de complicações e prevenção de agravamentos</p>
          </div>
          <div class="benefit-item">
            <strong>📚 Formação Médica</strong>
            <p>Centro de treinamento para profissionais em tecnologias de saúde</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "O ITMI-Brasil representa um marco tecnológico e de assistência, prometendo diagnósticos mais rápidos, terapias personalizadas e UTIs conectadas que preveem riscos em tempo real."
            <cite>— Ministério da Saúde</cite>
          </blockquote>
        </div>

        <div class="call-to-action">
          <h4>🚀 O Que Esperar Até 2027?</h4>
          <p>Acompanhe o desenvolvimento do ITMI-Brasil e prepare-se para uma revolução na saúde pública brasileira. A medicina do futuro está chegando, e ela fala português.</p>
        </div>
      `,
      sources: [
        {
          title: "Ministério da Saúde - Anúncio Oficial",
          url: "https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/ministerio-da-saude-anuncia-criacao-do-primeiro-hospital-publico-inteligente-do-brasil",
          type: "Fonte Oficial"
        }
      ]
    },
    2: {
      id: 2,
      title: "Voa Health: IA Generativa Revoluciona Prontuários Médicos",
      subtitle: "Startup brasileira reduz em 80% o tempo de documentação clínica com tecnologia nacional",
      excerpt: "Startup brasileira recebe US$ 3 milhões e reduz em 80% o tempo de documentação clínica com 20 mil médicos cadastrados.",
      category: "Startups",
      date: "2025-03-15",
      readTime: "4 min",
      author: "Dr. Massuca",
      tags: ["Prontuário Eletrônico", "IA Generativa", "Voa Health", "Unimed", "Startup"],
      featured: true,
      image: "/images/ia-medica/voa-health.svg",
      users: "20.000 médicos",
      consultations: "80.000 consultas/mês",
      likes: 189,
      shares: 67,
      content: `
        <h2>A Revolução dos Prontuários Inteligentes</h2>
        
        <p>Em um cenário onde médicos brasileiros gastam até 40% do tempo preenchendo papelada, a <strong>Voa Health</strong> emerge como uma solução disruptiva que promete devolver aos profissionais aquilo que é mais precioso: tempo para cuidar dos pacientes.</p>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">US$ 3 milhões</span>
            <span class="metric-label">Investimento Seed</span>
          </div>
          <div class="metric">
            <span class="metric-number">20.000</span>
            <span class="metric-label">Médicos Cadastrados</span>
          </div>
          <div class="metric">
            <span class="metric-number">80.000</span>
            <span class="metric-label">Consultas/Mês</span>
          </div>
          <div class="metric">
            <span class="metric-number">80%</span>
            <span class="metric-label">Redução no Tempo</span>
          </div>
        </div>

        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🎤 Gravação Consentida</h4>
              <p>Com autorização do paciente, a consulta é gravada em tempo real</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🗣️ Transcrição Inteligente</h4>
              <p>IA converte a fala em texto, identificando termos médicos e contextos</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>📋 Organização Automática</h4>
              <p>Dados são estruturados automaticamente no prontuário eletrônico</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>✅ Revisão Médica</h4>
              <p>Profissional valida e ajusta as informações quando necessário</p>
            </div>
          </div>
        </div>

        <div class="investor-spotlight">
          <h4>💰 Investimento da Prosus Ventures</h4>
          <p>A <strong>Prosus Ventures</strong> liderou a rodada seed de US$ 3 milhões, evidenciando a confiança internacional no potencial das healthtechs brasileiras.</p>
        </div>

        <div class="future-outlook">
          <h4>🔮 Próximos Passos</h4>
          <p>A Voa Health planeja expandir suas funcionalidades para incluir análise preditiva, sugestões de diagnóstico e integração com outros sistemas hospitalares.</p>
        </div>
      `,
      sources: [
        {
          title: "Bloomberg Línea - Investimento Prosus",
          url: "https://www.bloomberglinea.com.br/startups/prosus-investe-em-startup-brasileira-que-mira-ser-um-hub-de-agentes-de-ia-para-saude/",
          type: "Mídia Especializada"
        }
      ]
    }
  };

  useEffect(() => {
    // Simular carregamento do artigo
    const articleData = articlesDatabase[parseInt(id)];
    if (articleData) {
      setArticle(articleData);
      
      // Simular artigos relacionados
      const related = Object.values(articlesDatabase)
        .filter(a => a.id !== articleData.id && (
          a.category === articleData.category || 
          a.tags.some(tag => articleData.tags.includes(tag))
        ))
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
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
          <button 
            onClick={() => navigate('/ia-medica')}
            className="back-button"
          >
            <ArrowLeft className="back-icon" />
            Voltar para IA Médica
          </button>
        </div>

        {/* Header do Artigo */}
        <header className="article-header">
          {/* Imagem do Artigo */}
          <div className="article-image-container">
            <img 
              src={article.image || "/images/ia-medica/default-article.svg"} 
              alt={article.title}
              className="article-header-image"
              onError={(e) => {
                e.target.src = "/images/ia-medica/default-article.svg";
              }}
            />
          </div>
          
          {/* Conteúdo do Header */}
          <div className="article-header-content">
            {/* Título Principal */}
            <h1 className="article-title">{article.title}</h1>
            {article.subtitle && (
              <p className="article-subtitle">{article.subtitle}</p>
            )}
            
            <div className="article-meta-top">
              <span className="article-category">{article.category}</span>
              <div className="article-actions">
              <button 
                onClick={handleLike}
                className={`action-btn ${isLiked ? 'liked' : ''}`}
              >
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
                {article.shares}
              </button>
            </div>
          </div>

          <div className="article-meta">
            <div className="meta-item">
              <Calendar className="meta-icon" />
              {new Date(article.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="meta-item">
              <Clock className="meta-icon" />
              {article.readTime}
            </div>
            <div className="meta-item">
              <User className="meta-icon" />
              {article.author}
            </div>
          </div>

          {/* Destaques do artigo */}
          <div className="article-highlights">
            {article.investment && (
              <div className="highlight-item">
                <DollarSign className="highlight-icon" />
                <span>Investimento: {article.investment}</span>
              </div>
            )}
            {article.users && (
              <div className="highlight-item">
                <Users className="highlight-icon" />
                <span>{article.users}</span>
              </div>
            )}
            {article.location && (
              <div className="highlight-item">
                <MapPin className="highlight-icon" />
                <span>{article.location}</span>
              </div>
            )}
            {article.consultations && (
              <div className="highlight-item">
                <Activity className="highlight-icon" />
                <span>{article.consultations}</span>
              </div>
            )}
          </div>

            <div className="article-tags">
              {article.tags.map((tag, index) => (
                <span key={index} className="article-tag">#{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* Conteúdo do Artigo */}
        <main className="article-content">
          <div 
            className="content-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Fontes */}
          <div className="article-sources">
            <h3>📚 Fontes e Referências</h3>
            <div className="sources-list">
              {article.sources.map((source, index) => (
                <div key={index} className="source-item">
                  <div className="source-info">
                    <h4>{source.title}</h4>
                    <span className="source-type">{source.type}</span>
                  </div>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="source-link"
                  >
                    <ExternalLink className="link-icon" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Artigos Relacionados */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h2>📖 Artigos Relacionados</h2>
            <div className="related-grid">
              {relatedArticles.map((relatedArticle) => (
                <article 
                  key={relatedArticle.id}
                  className="related-card"
                  onClick={() => navigate(`/ia-medica/artigo/${relatedArticle.id}`)}
                >
                  <div className="related-category">{relatedArticle.category}</div>
                  <h3>{relatedArticle.title}</h3>
                  <p>{relatedArticle.excerpt}</p>
                  <div className="related-meta">
                    <span>{new Date(relatedArticle.date).toLocaleDateString('pt-BR')}</span>
                    <span>{relatedArticle.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;