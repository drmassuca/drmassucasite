import { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Tag,
  TrendingUp,
  Users,
  Brain,
  Stethoscope,
  Activity,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { getPublishedArticles } from '../../lib/articles';
import { injetaFontesEditoriais } from '../../lib/fontesEditoriais';
import './IAMedica.css?v=2';

// Helper para formatar data com segurança
const formatDate = dateValue => {
  if (!dateValue) return 'Data não disponível';
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return 'Data não disponível';
    }
    return date.toLocaleDateString('pt-BR');
  } catch {
    return 'Data não disponível';
  }
};

const IAMedica = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categorias fixas (fallback enquanto carrega do Supabase)
  const categories = [
    { id: 'todas', name: 'Todas', icon: Activity },
    { id: 'Infraestrutura', name: 'Infraestrutura', icon: Brain },
    { id: 'Startups', name: 'Startups', icon: TrendingUp },
    { id: 'Aplicação Clínica', name: 'Aplicação Clínica', icon: Users },
    { id: 'Regulamentação', name: 'Regulamentação', icon: Tag },
    { id: 'Internacional', name: 'Internacional', icon: Calendar },
    { id: 'Ética', name: 'Ética', icon: Stethoscope },
  ];

  // Dados de fallback (usados se Supabase não estiver configurado)
  const fallbackArticles = [
    {
      id: 19,
      title:
        'O FDA Já Aprovou 1.200 Dispositivos de IA Médica. Esses São os Que Realmente Salvam Vidas',
      excerpt:
        'O FDA aprovou mais de 1.200 dispositivos de IA médica. A maioria? Ninguém nunca ouviu falar. Conheça os cinco que realmente mudam desfechos clínicos.',
      category: 'Aplicação Clínica',
      date: '2025-12-01T12:00:00',
      readTime: '11 min',
      tags: [
        'FDA',
        'dispositivos médicos',
        'IA diagnóstico',
        'retinopatia diabética',
        'câncer',
        'colonoscopia',
        'fibrilação atrial',
        'aprovação regulatória',
      ],
      featured: true,
      image: '/images/ia-medica/fda-ai-devices.jpg',
      promise: '1.200+ aprovados',
      reality: 'Poucos com evidência',
    },
    {
      id: 18,
      title: 'O SUS Quer IA, Mas Ainda Não Tem Nem Prontuário Unificado',
      excerpt:
        'Governo promete R$ 4,5 bilhões em hospitais inteligentes enquanto 55% dos estabelecimentos ainda guardam dados em papel',
      category: 'Infraestrutura',
      date: '2025-11-26T12:00:00',
      readTime: '12 min',
      tags: [
        'SUS',
        'inteligência artificial',
        'infraestrutura',
        'RNDS',
        'prontuário eletrônico',
        'hospital inteligente',
        'PBIA',
        'saúde digital',
      ],
      featured: true,
      image: '/images/ia-medica/hospital-tecnologia-contraste.jpg',
      promise: 'R$ 4,5 bi prometidos',
      reality: '55% usa papel',
    },
    {
      id: 17,
      title:
        'Rio Grande do Sul Publica Primeira Regulação de IA na Medicina do Brasil. O Resto do País? Ainda Esperando.',
      excerpt:
        "Rio Grande do Sul publica primeira resolução brasileira regulamentando IA na medicina. É histórica, mas só vale no RS. CFM promete norma nacional 'para breve' enquanto 17% dos médicos já usam IA sem regulação.",
      category: 'Regulamentação',
      date: '2025-11-18T12:00:00',
      readTime: '12 min',
      tags: [
        'CREMERS',
        'Regulamentação',
        'IA Médica',
        'CFM',
        'Rio Grande do Sul',
        'Resolução 6/2025',
        'LGPD',
        'Ética',
      ],
      featured: true,
      image: '/images/ia-medica/cremers-resolucao-ia.jpg',
      regulation: 'Primeira do Brasil',
      scope: 'Só Rio Grande do Sul',
    },
    {
      id: 16,
      title: 'IA em AVC: Quando a Tecnologia Realmente Salva Vidas',
      excerpt:
        'De 58 minutos para 7: algoritmos detectam AVC com 93% de precisão, reduzem tempo de atendimento em 44% e já estão salvando vidas em 2.000+ hospitais.',
      category: 'Aplicação Clínica',
      date: '2025-11-11T12:00:00',
      readTime: '9 min',
      tags: ['AVC', 'diagnóstico', 'neurologia', 'emergência', 'RapidAI', 'Viz.ai'],
      featured: true,
      image: '/images/ia-medica/ai-stroke-detection.jpg',
      accuracy: '93% precisão',
      timeReduction: '58min → 7min',
      hospitals: '2.000+ hospitais',
    },
    {
      id: 15,
      title: 'Chatbots de Saúde Mental Violam Padrões Éticos',
      excerpt:
        'Mais de 1 milhão de pessoas conversam semanalmente com ChatGPT sobre suicídio. Pesquisa mostra 15 padrões éticos violados.',
      category: 'Ética',
      date: '2025-11-05',
      readTime: '8 min',
      tags: ['chatbots', 'ética', 'saúde mental'],
      featured: true,
      image: '/images/ia-medica/chatbot-mental-health-ethics.jpg',
      users: '1M+ usuários/semana',
      violations: '15 violações éticas',
    },
    {
      id: 14,
      title: "GPT-4o 'Acerta' Diagnósticos Igual a Residentes, Mas Alucina em 75% dos Achados",
      excerpt: '82% de acurácia, 75% de alucinação em radiologia.',
      category: 'Aplicação Clínica',
      date: '2025-10-29',
      readTime: '12 min',
      tags: ['GPT-4o', 'Radiologia', 'IA Médica', 'Alucinações', 'Tomografia', 'Diagnóstico'],
      featured: true,
      image: '/images/ia-medica/gpt4o-radiologia-bg.webp',
      accuracy: '82% acurácia',
      hallucination: '75% alucinação',
    },
    {
      id: 13,
      title: 'Quando a IA Erra, Quem Paga a Conta?',
      excerpt:
        '83% de taxa de erro em diagnósticos pediátricos, tratamentos perigosos recomendados e nenhum culpado identificado.',
      category: 'Ética',
      date: '2025-10-20',
      readTime: '15 min',
      tags: [
        'Erros Médicos',
        'IA Médica',
        'Responsabilidade Legal',
        'The Guardian',
        'CFM',
        'Ética Médica',
      ],
      featured: true,
      image: '/images/ia-medica/responsabilidade-ia-medica.jpg',
      errorRate: '83% taxa de erro',
      responsibility: 'Zona cinza legal',
    },
    {
      id: 12,
      title: 'A Promessa dos 100 Mil: Anatomia de um Golpe na Medicina Digital',
      excerpt:
        'Investigação revela como sistemas de IA médica são vendidos com promessas irreais de faturamento.',
      category: 'Ética',
      date: '2025-10-14',
      readTime: '12 min',
      tags: ['Ética Médica', 'IA Médica', 'Marketing Médico', 'Golpes', 'CFM'],
      featured: true,
      image: '/images/ia-medica/100porcento.webp',
      promise: 'R$ 100 mil/mês',
      reality: 'Sem comprovação',
      victims: 'Médicos vulneráveis',
    },
    {
      id: 11,
      title: 'EUA Investem US$ 100M em IA para Câncer Pediátrico',
      excerpt:
        'Iniciativa americana duplica funding para pesquisa com IA em câncer infantil. Brasil enfrenta gap de investimento.',
      category: 'Internacional',
      date: '2025-10-07',
      readTime: '8 min',
      tags: ['Câncer Pediátrico', 'IA Médica', 'CCDI', 'NIH', 'Brasil-EUA'],
      featured: true,
      image: '/images/ia-medica/trump-ai-cancer-pediatrico-bg.jpg',
      investment: 'US$ 100 milhões/ano',
      patients: '7.930 casos/ano no Brasil',
      gap: '100x menos investimento BR',
    },
    {
      id: 10,
      title: 'IA Ajuda Pacientes com Dor Lombar a se Tratarem Melhor em Casa',
      excerpt:
        'Sistema AI-HEALS combina inteligência artificial e aplicativo de mensagens para revolucionar o autogerenciamento da dor lombar.',
      category: 'Aplicação Clínica',
      date: '2025-10-02',
      readTime: '10 min',
      tags: ['Dor Lombar', 'IA Médica', 'AI-HEALS', 'Autogerenciamento', 'Telemedicina'],
      featured: true,
      image: '/images/ia-medica/ai-dor-lombar-bg.webp',
      patients: '74 participantes',
      duration: '3 meses + 9 meses',
    },
    {
      id: 9,
      title: 'Stable Diffusion 3D Fetal: IA Revoluciona Ultrassom Obstétrico',
      excerpt:
        'Tecnologia de IA generativa transforma imagens 3D fetais com qualidade cinematográfica, preservando 100% da anatomia médica.',
      category: 'Aplicação Clínica',
      date: '2025-09-07',
      readTime: '8 min',
      tags: ['Ultrassom 3D', 'IA Generativa', 'Stable Diffusion', 'Obstetrícia'],
      featured: true,
      image: '/imagens-3d/antesedepois1.2.png',
      enhancement: '150% qualidade visual',
      preservation: '100% anatomia',
      customLink: '/ia-medica/stable-diffusion-3d-fetal',
    },
    {
      id: 1,
      title: 'ITMI-Brasil: Primeiro Hospital Público Inteligente do País',
      excerpt:
        'Ministério da Saúde anuncia hospital com 800 leitos que reduzirá tempo de espera de 17h para 2h usando IA e 5G.',
      category: 'Infraestrutura',
      date: '2025-09-07',
      readTime: '5 min',
      tags: ['SUS', 'Hospital Inteligente', '5G', 'Emergência'],
      featured: true,
      image: '/images/ia-medica/hospital-bg.jpg',
      investment: 'US$ 320 milhões',
      location: 'Hospital das Clínicas - USP/SP',
    },
    {
      id: 2,
      title: 'Voa Health: A Trajetória da Startup que Revoluciona a Documentação Médica com IA',
      excerpt:
        'Fundada por dois médicos brasileiros em 2023, cresceu de US$ 300 mil para US$ 3 milhões em investimentos.',
      category: 'Startups',
      date: '2025-08-30',
      readTime: '8 min',
      tags: ['Voa Health', 'IA Médica', 'Prontuário Eletrônico', 'Prosus Ventures', 'Healthtech'],
      featured: true,
      image: '/images/ia-medica/voa-health-bg.jpg',
      users: '20.000+ médicos',
      consultations: '80.000+ consultas/mês',
    },
    {
      id: 6,
      title: 'CFM Debate Ética e Regulamentação da IA Médica',
      excerpt:
        'Conselho Federal de Medicina estabelece diretrizes para uso responsável da IA como ferramenta auxiliar.',
      category: 'Regulamentação',
      date: '2025-08-15',
      readTime: '4 min',
      tags: ['CFM', 'Ética', 'Regulamentação', 'Diretrizes'],
      featured: false,
      image: '/images/ia-medica/cfm-debate.svg',
    },
    {
      id: 7,
      title: 'Brasil Lidera Agenda de IA na Saúde no BRICS 2025',
      excerpt:
        'Presidência brasileira prioriza cooperação internacional em IA médica e governança de dados em saúde.',
      category: 'Internacional',
      date: '2025-05-30',
      readTime: '6 min',
      tags: ['BRICS', 'Cooperação', 'Saúde Digital', 'Internacional'],
      featured: false,
      image: '/images/ia-medica/brics-saude.svg',
    },
    {
      id: 8,
      title: 'Câmara Debate PL 2338/23 para Regulamentação da IA',
      excerpt:
        'Projeto de Lei busca equilibrar inovação tecnológica com segurança jurídica na aplicação da IA em saúde.',
      category: 'Regulamentação',
      date: '2025-08-05',
      readTime: '5 min',
      tags: ['Legislação', 'PL 2338/23', 'Câmara', 'Segurança'],
      featured: true,
      image: '/images/ia-medica/camara-debate-bg.jpg',
    },
  ];

  // Carregar artigos ao montar
  useEffect(() => {
    injetaFontesEditoriais(); // fontes da pele "edição tech"
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await getPublishedArticles();

        // Se recebeu dados do Supabase, usa eles
        // Caso contrário, usa fallback
        if (data && data.length > 0) {
          // Mapear para formato esperado pelo componente
          const mappedArticles = data.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            date: article.date,
            readTime: article.readTime,
            tags: article.tags || [],
            featured: article.featured,
            image: article.image,
            // Metadados extras
            investment: article.investment,
            users: article.users,
            patients: article.patients,
            accuracy: article.accuracy,
            hallucination: article.hallucination,
            promise: article.promise,
            reality: article.reality,
            victims: article.victims,
            regulation: article.regulation,
            scope: article.scope,
            errorRate: article.errorRate,
            responsibility: article.responsibility,
            enhancement: article.enhancement,
            preservation: article.preservation,
            timeReduction: article.timeReduction,
            hospitals: article.hospitals,
            violations: article.violations,
            duration: article.duration,
            consultations: article.consultations,
            location: article.location,
            gap: article.gap,
          }));

          // Adicionar o tutorial do Stable Diffusion como artigo fixo (página standalone)
          const stableDiffusionCard = {
            id: 'stable-diffusion-3d-fetal',
            slug: 'stable-diffusion-3d-fetal',
            title: 'Stable Diffusion 3D Fetal: IA Revoluciona Ultrassom Obstétrico',
            excerpt:
              'Tecnologia de IA generativa transforma imagens 3D fetais com qualidade cinematográfica, preservando 100% da anatomia médica.',
            category: 'Aplicação Clínica',
            date: '2025-09-07T12:00:00',
            readTime: '8 min',
            tags: ['Ultrassom 3D', 'IA Generativa', 'Stable Diffusion', 'Obstetrícia'],
            featured: true,
            image: '/imagens-3d/antesedepois1.2.png',
            enhancement: '150% qualidade visual',
            preservation: '100% anatomia',
            customLink: '/ia-medica/stable-diffusion-3d-fetal',
          };

          setArticles([...mappedArticles, stableDiffusionCard]);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Filtrar artigos quando busca ou categoria mudar
  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const featuredArticles = articles.filter(article => article.featured);

  const handleArticleClick = article => {
    // Se o artigo tem um link customizado (ex: tutorial Stable Diffusion), usa esse link
    if (article.customLink) {
      navigate(article.customLink);
    } else {
      // Usa slug se disponível, senão usa ID
      navigate(`/ia-medica/artigo/${article.slug || article.id}`);
    }
  };

  return (
    <>
      <SEOHead
        title="IA Médica - Inteligência Artificial na Medicina Brasileira"
        description="Acompanhe todas as novidades sobre IA na medicina brasileira: startups inovadoras, pesquisas acadêmicas, hospitais inteligentes e regulamentação. Conteúdo atualizado para profissionais da saúde."
        keywords={[
          'IA médica',
          'hospitais inteligentes',
          'startups saúde',
          'pesquisa médica',
          'regulamentação IA',
        ]}
        canonical="https://drmassuca.com.br/ia-medica"
      />

      <div className="ia-medica-container">
        {/* Hero Section - IA Themed */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <p className="ia-chapeu">Curadoria · Edição Tech</p>
              <h1>
                <div className="title-stack">
                  <span className="gradient-text">IA Médica</span>
                </div>
              </h1>

              <div className="content-types">
                <span className="content-type">Notícias IA</span>
                <span className="separator">•</span>
                <span className="content-type">Tutoriais</span>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner" />
            <p>Carregando artigos...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Featured Articles */}
            <section className="featured-section">
              <h2 className="section-title">
                <TrendingUp className="title-icon" />
                Destaques em IA Médica
              </h2>
              <div className="featured-grid">
                {featuredArticles.map(article => (
                  <article
                    key={article.id}
                    className="featured-card"
                    onClick={() => handleArticleClick(article)}
                    style={{
                      cursor: 'pointer',
                      backgroundImage: `url(${article.image})`,
                    }}
                  >
                    <div className="card-category">{article.category}</div>

                    {/* Highlights lateralizados */}
                    <div className="card-highlights">
                      {article.regulation && (
                        <div className="card-highlight">📜 {article.regulation}</div>
                      )}
                      {article.scope && <div className="card-highlight">📍 {article.scope}</div>}
                      {article.errorRate && (
                        <div className="card-highlight">❌ {article.errorRate}</div>
                      )}
                      {article.responsibility && (
                        <div className="card-highlight">⚠️ {article.responsibility}</div>
                      )}
                      {article.promise && (
                        <div className="card-highlight">💸 {article.promise}</div>
                      )}
                      {article.reality && (
                        <div className="card-highlight">⚠️ {article.reality}</div>
                      )}
                      {article.victims && (
                        <div className="card-highlight">🎯 {article.victims}</div>
                      )}
                      {article.investment && (
                        <div className="card-highlight">💰 {article.investment}</div>
                      )}
                      {article.users && <div className="card-highlight">👥 {article.users}</div>}
                      {article.patients && (
                        <div className="card-highlight">🏥 {article.patients}</div>
                      )}
                      {article.enhancement && (
                        <div className="card-highlight">✨ {article.enhancement}</div>
                      )}
                      {article.preservation && (
                        <div className="card-highlight">🎯 {article.preservation}</div>
                      )}
                      {article.gap && <div className="card-highlight">📉 {article.gap}</div>}
                      {article.duration && (
                        <div className="card-highlight">⏰ {article.duration}</div>
                      )}
                      {article.consultations && (
                        <div className="card-highlight">📋 {article.consultations}</div>
                      )}
                      {article.location && (
                        <div className="card-highlight">📍 {article.location}</div>
                      )}
                      {article.accuracy && (
                        <div className="card-highlight">✅ {article.accuracy}</div>
                      )}
                      {article.hallucination && (
                        <div className="card-highlight">⚠️ {article.hallucination}</div>
                      )}
                      {article.comparison && (
                        <div className="card-highlight">🏥 {article.comparison}</div>
                      )}
                      {article.violations && (
                        <div className="card-highlight">🚨 {article.violations}</div>
                      )}
                      {article.timeReduction && (
                        <div className="card-highlight">⏱️ {article.timeReduction}</div>
                      )}
                      {article.hospitals && (
                        <div className="card-highlight">🏥 {article.hospitals}</div>
                      )}
                    </div>

                    <div className="card-content">
                      <h3 className="card-title">{article.title}</h3>
                      <p className="card-excerpt">{article.excerpt}</p>

                      <div className="card-tags">
                        {article.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="card-meta">
                        <span className="meta-date">
                          <Calendar className="meta-icon" />
                          {formatDate(article.date)}
                        </span>
                        <span className="meta-read">⏱️ {article.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Search and Filter Section */}
            <section className="search-section">
              <div className="search-container">
                <div className="search-box">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar artigos sobre IA médica..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    >
                      <category.icon className="category-icon" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* All Articles */}
            <section className="articles-section">
              <h2 className="section-title">
                <Stethoscope className="title-icon" />
                Todos os Artigos ({filteredArticles.length})
              </h2>

              <div className="articles-grid">
                {filteredArticles.map(article => (
                  <article
                    key={article.id}
                    className="article-card"
                    onClick={() => handleArticleClick(article)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="article-header">
                      <div className="article-category">{article.category}</div>
                      <div className="article-date">{formatDate(article.date)}</div>
                    </div>

                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>

                    <div className="article-tags">
                      {article.tags?.map((tag, index) => (
                        <span key={index} className="article-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="article-footer">
                      <span className="read-time">📖 {article.readTime}</span>
                      <button
                        className="read-more-btn"
                        onClick={e => {
                          e.stopPropagation();
                          handleArticleClick(article);
                        }}
                      >
                        Ler mais →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="no-results">
                  <Brain className="no-results-icon" />
                  <h3>Nenhum artigo encontrado</h3>
                  <p>Tente ajustar sua busca ou selecionar uma categoria diferente.</p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default IAMedica;
