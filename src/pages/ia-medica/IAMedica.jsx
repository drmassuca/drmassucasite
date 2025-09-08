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
      title: 'Voa Health: IA Generativa Revoluciona Prontuários Médicos',
      excerpt:
        'Startup brasileira recebe US$ 3 milhões e reduz em 80% o tempo de documentação clínica com 20 mil médicos cadastrados.',
      category: 'Startups',
      date: '2025-03-15',
      readTime: '4 min',
      tags: ['Prontuário Eletrônico', 'IA Generativa', 'Voa Health', 'Unimed'],
      featured: true,
      image: '/images/ia-medica/voa-health-bg.jpg',
      users: '20.000 médicos',
      consultations: '80.000 consultas/mês',
    },
    {
      id: 3,
      title: 'ChestFinder: IA da UFF Detecta Câncer de Pulmão Precocemente',
      excerpt:
        'Ferramenta open source desenvolvida na UFF identifica enfisema e câncer pulmonar em tomografias com alta precisão.',
      category: 'Pesquisa',
      date: '2025-07-20',
      readTime: '6 min',
      tags: ['Diagnóstico', 'Câncer', 'UFF', 'Open Source'],
      featured: false,
      image: '/images/ia-medica/chestfinder.svg',
      accuracy: 'Alta acurácia',
      availability: 'Código Aberto',
    },
    {
      id: 4,
      title: 'CEREIA: Hapvida-UFC Aplica IA em 16 Milhões de Pacientes',
      excerpt:
        'Centro de referência atinge 72% de precisão na prevenção de doença renal contra 22% dos métodos tradicionais.',
      category: 'Aplicação Clínica',
      date: '2025-08-10',
      readTime: '7 min',
      tags: ['Prevenção', 'Doença Renal', 'Hapvida', 'UFC'],
      featured: true,
      image: '/images/ia-medica/cereia-bg.jpg',
      investment: 'R$ 17,5 milhões',
      patients: '16 milhões',
    },
    {
      id: 5,
      title: 'Rebec@: Fiocruz Lança IA para Pesquisas Clínicas',
      excerpt:
        'Primeira ferramenta mundial de IA generativa para registros de ensaios clínicos reduz aprovação para 48h.',
      category: 'Pesquisa',
      date: '2025-03-25',
      readTime: '5 min',
      tags: ['Ensaios Clínicos', 'Fiocruz', 'Rebec', 'OMS'],
      featured: false,
      image: '/images/ia-medica/rebec.svg',
      approval: '48 horas',
      scope: 'Mundial',
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
      featured: false,
      image: '/images/ia-medica/camara-debate.svg',
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
  ];

  const categories = [
    { id: 'todas', name: 'Todas', icon: Activity },
    { id: 'Infraestrutura', name: 'Infraestrutura', icon: Brain },
    { id: 'Startups', name: 'Startups', icon: TrendingUp },
    { id: 'Pesquisa', name: 'Pesquisa', icon: Stethoscope },
    { id: 'Aplicação Clínica', name: 'Aplicação Clínica', icon: Users },
    { id: 'Regulamentação', name: 'Regulamentação', icon: Tag },
    { id: 'Internacional', name: 'Internacional', icon: Calendar },
  ];

  const stats = [
    { label: 'Investimentos em 2025', value: 'US$ 326,5 mi', icon: TrendingUp },
    { label: 'Médicos Impactados', value: '20.000+', icon: Users },
    { label: 'Pacientes Beneficiados', value: '16 milhões', icon: Activity },
    { label: 'Projetos Ativos', value: '8+', icon: Brain },
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
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span className="gradient-text">Inteligência Artificial</span>
                <br />
                na Medicina Brasileira
              </h1>
              <p className="hero-description">
                Acompanhe as últimas inovações, pesquisas e aplicações da IA transformando a saúde
                no Brasil. Notícias atualizadas e análises especializadas para profissionais da área
                médica.
              </p>
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <stat.icon className="stat-icon" />
                    <div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card">
                <Brain className="card-icon" />
                <h3>IA em Ação</h3>
                <p>Redução de 17h para 2h no tempo de espera hospitalar</p>
              </div>
            </div>
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

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>📧 Newsletter IA Médica</h2>
            <p>Receba as últimas novidades sobre Inteligência Artificial na medicina brasileira</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Seu e-mail profissional" />
              <button>Assinar Gratuitamente</button>
            </div>
            <small>Enviamos apenas conteúdo relevante, sem spam. Cancele quando quiser.</small>
          </div>
        </section>
      </div>
    </>
  );
};

export default IAMedica;
