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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import './IAMedica.css?v=2';

const IAMedica = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Dados dos artigos baseados na pesquisa
  const articles = [
    {
      id: 10,
      title: 'IA Ajuda Pacientes com Dor Lombar a se Tratarem Melhor em Casa',
      excerpt:
        'Sistema AI-HEALS combina inteligência artificial e aplicativo de mensagens para revolucionar o autogerenciamento da dor lombar não-específica, problema que afeta milhões.',
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
      link: '/ia-medica/stable-diffusion-3d-fetal',
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
        'Fundada por dois médicos brasileiros em 2023, cresceu de US$ 300 mil para US$ 3 milhões em investimentos da Prosus Ventures, atendendo 20+ mil profissionais.',
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

  const categories = [
    { id: 'todas', name: 'Todas', icon: Activity },
    { id: 'Infraestrutura', name: 'Infraestrutura', icon: Brain },
    { id: 'Startups', name: 'Startups', icon: TrendingUp },
    { id: 'Aplicação Clínica', name: 'Aplicação Clínica', icon: Users },
    { id: 'Regulamentação', name: 'Regulamentação', icon: Tag },
    { id: 'Internacional', name: 'Internacional', icon: Calendar },
  ];

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
          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory]);

  const featuredArticles = articles.filter(article => article.featured);

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
                onClick={() => {
                  if (article.id === 9) {
                    navigate('/ia-medica/stable-diffusion-3d-fetal');
                  } else {
                    navigate(`/ia-medica/artigo/${article.id}`);
                  }
                }}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url(${article.image})`,
                }}
              >
                <div className="card-category">{article.category}</div>

                {/* Highlights lateralizados */}
                <div className="card-highlights">
                  {article.investment && (
                    <div className="card-highlight">💰 {article.investment}</div>
                  )}

                  {article.users && <div className="card-highlight">👥 {article.users}</div>}

                  {article.patients && (
                    <div className="card-highlight">🏥 {article.patients} pacientes</div>
                  )}

                  {article.enhancement && (
                    <div className="card-highlight">✨ {article.enhancement}</div>
                  )}

                  {article.preservation && (
                    <div className="card-highlight">🎯 {article.preservation}</div>
                  )}
                </div>

                <div className="card-content">
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-excerpt">{article.excerpt}</p>

                  <div className="card-tags">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="card-meta">
                    <span className="meta-date">
                      <Calendar className="meta-icon" />
                      {new Date(article.date).toLocaleDateString('pt-BR')}
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
                onClick={() => {
                  if (article.id === 9) {
                    navigate('/ia-medica/stable-diffusion-3d-fetal');
                  } else {
                    navigate(`/ia-medica/artigo/${article.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="article-header">
                  <div className="article-category">{article.category}</div>
                  <div className="article-date">
                    {new Date(article.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-tags">
                  {article.tags.map((tag, index) => (
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
                      if (article.id === 9) {
                        navigate('/ia-medica/stable-diffusion-3d-fetal');
                      } else {
                        navigate(`/ia-medica/artigo/${article.id}`);
                      }
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
      </div>
    </>
  );
};

export default IAMedica;
