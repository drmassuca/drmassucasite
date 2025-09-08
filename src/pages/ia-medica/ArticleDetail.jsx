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
      title: 'ITMI-Brasil: Primeiro Hospital Público Inteligente do País',
      subtitle:
        'Ministério da Saúde anuncia marco tecnológico que promete revolucionar o atendimento no SUS',
      excerpt:
        'Ministério da Saúde anuncia hospital com 800 leitos que reduzirá tempo de espera de 17h para 2h usando IA e 5G.',
      category: 'Infraestrutura',
      date: '2025-09-07',
      readTime: '5 min',
      author: 'Dr. Massuca',
      tags: ['SUS', 'Hospital Inteligente', '5G', 'Emergência', 'IA Médica'],
      featured: true,
      image: '/images/ia-medica/hospital-bg.jpg',
      investment: 'US$ 320 milhões',
      location: 'Hospital das Clínicas - USP/SP',
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
          title: 'Ministério da Saúde - Anúncio Oficial',
          url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/ministerio-da-saude-anuncia-criacao-do-primeiro-hospital-publico-inteligente-do-brasil',
          type: 'Fonte Oficial',
        },
      ],
    },
    2: {
      id: 2,
      title: 'Voa Health: IA Generativa Revoluciona Prontuários Médicos',
      subtitle:
        'Startup brasileira reduz em 80% o tempo de documentação clínica com tecnologia nacional',
      excerpt:
        'Startup brasileira recebe US$ 3 milhões e reduz em 80% o tempo de documentação clínica com 20 mil médicos cadastrados.',
      category: 'Startups',
      date: '2025-03-15',
      readTime: '4 min',
      author: 'Dr. Massuca',
      tags: ['Prontuário Eletrônico', 'IA Generativa', 'Voa Health', 'Unimed', 'Startup'],
      featured: true,
      image: '/images/ia-medica/voa-health-bg.jpg',
      users: '20.000 médicos',
      consultations: '80.000 consultas/mês',
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
          title: 'Bloomberg Línea - Investimento Prosus',
          url: 'https://www.bloomberglinea.com.br/startups/prosus-investe-em-startup-brasileira-que-mira-ser-um-hub-de-agentes-de-ia-para-saude/',
          type: 'Mídia Especializada',
        },
      ],
    },
    3: {
      id: 3,
      title: 'ChestFinder: IA da UFF Detecta Câncer de Pulmão Precocemente',
      subtitle:
        'Ferramenta open source desenvolvida na UFF identifica enfisema e câncer pulmonar em tomografias com alta precisão',
      excerpt:
        'Ferramenta open source desenvolvida na UFF identifica enfisema e câncer pulmonar em tomografias com alta precisão.',
      category: 'Pesquisa',
      date: '2025-07-20',
      readTime: '6 min',
      author: 'Dr. Massuca',
      tags: ['Diagnóstico', 'Câncer', 'UFF', 'Open Source'],
      featured: false,
      image: '/images/ia-medica/chestfinder-bg.jpg',
      accuracy: 'Alta acurácia',
      availability: 'Código Aberto',
      likes: 156,
      shares: 42,
      content: `
        <h2>Revolução no Diagnóstico Pulmonar</h2>
        
        <p>A Universidade Federal Fluminense (UFF) desenvolveu uma ferramenta de inteligência artificial que promete revolucionar o diagnóstico precoce de câncer de pulmão. O <strong>ChestFinder</strong> representa um avanço significativo na medicina diagnóstica, oferecendo precisão excepcional na análise de tomografias computadorizadas do tórax.</p>

        <div class="highlight-box">
          <h3>🎯 Capacidades do ChestFinder</h3>
          <ul>
            <li><strong>Detecção precoce</strong> de nódulos pulmonares suspeitos</li>
            <li><strong>Identificação de enfisema</strong> em estágios iniciais</li>
            <li><strong>Análise automatizada</strong> de tomografias em segundos</li>
            <li><strong>Código aberto</strong> para uso global</li>
          </ul>
        </div>

        <h3>Tecnologia Avançada</h3>
        
        <p>O sistema utiliza redes neurais convolucionais treinadas com milhares de imagens de tomografias, permitindo identificar padrões que podem passar despercebidos pelo olho humano. A ferramenta é especialmente eficaz na detecção de:</p>
        
        <h4>🫁 Nódulos Pulmonares</h4>
        <p>Identificação automática de nódulos suspeitos, incluindo aqueles de pequenas dimensões que podem indicar câncer em estágio inicial.</p>

        <h4>🌬️ Enfisema Pulmonar</h4>
        <p>Detecção precoce de alterações no parênquima pulmonar características do enfisema, permitindo intervenção médica antes da progressão da doença.</p>

        <h4>📊 Análise Quantitativa</h4>
        <p>Fornece métricas precisas sobre densidade pulmonar, volume e outras características importantes para o diagnóstico.</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚡ Velocidade</strong>
            <p>Análise completa em segundos, acelerando o fluxo de trabalho radiológico</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Precisão</strong>
            <p>Alta sensibilidade na detecção de lesões suspeitas</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Acessibilidade</strong>
            <p>Código aberto permite uso em hospitais públicos e privados</p>
          </div>
          <div class="benefit-item">
            <strong>📚 Educação</strong>
            <p>Ferramenta de apoio ao ensino médico e residência</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "O ChestFinder representa um marco na democratização do diagnóstico por imagem, oferecendo tecnologia de ponta de forma gratuita para toda a comunidade médica."
            <cite>— Equipe de Pesquisa UFF</cite>
          </blockquote>
        </div>

        <div class="call-to-action">
          <h4>🔬 Impacto na Saúde Pública</h4>
          <p>Com o código aberto, hospitais em todo o Brasil podem implementar esta tecnologia, melhorando significativamente a capacidade diagnóstica e salvando vidas através da detecção precoce.</p>
        </div>
      `,
      sources: [
        {
          title: 'UFF - Desenvolvimento ChestFinder',
          url: 'https://www.uff.br/pesquisa/chestfinder-ia-diagnostico-pulmonar',
          type: 'Fonte Acadêmica',
        },
      ],
    },
    4: {
      id: 4,
      title: 'CEREIA: Hapvida-UFC Aplica IA em 16 Milhões de Pacientes',
      subtitle:
        'Centro de referência atinge 72% de precisão na prevenção de doença renal contra 22% dos métodos tradicionais',
      excerpt:
        'Centro de referência atinge 72% de precisão na prevenção de doença renal contra 22% dos métodos tradicionais.',
      category: 'Aplicação Clínica',
      date: '2025-08-10',
      readTime: '7 min',
      author: 'Dr. Massuca',
      tags: ['Prevenção', 'Doença Renal', 'Hapvida', 'UFC'],
      featured: true,
      image: '/images/ia-medica/cereia-bg.jpg',
      investment: 'R$ 17,5 milhões',
      patients: '16 milhões',
      likes: 203,
      shares: 78,
      content: `
        <h2>Revolução na Prevenção de Doenças Renais</h2>
        
        <p>O <strong>Centro de Referência em Engenharia de Inteligência Artificial (CEREIA)</strong>, fruto da parceria entre Hapvida e Universidade Federal do Ceará (UFC), estabelece um novo paradigma na medicina preventiva. Com investimento de R$ 17,5 milhões, o centro já impacta a vida de 16 milhões de pacientes.</p>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">72%</span>
            <span class="metric-label">Precisão na Prevenção</span>
          </div>
          <div class="metric">
            <span class="metric-number">16M</span>
            <span class="metric-label">Pacientes Beneficiados</span>
          </div>
          <div class="metric">
            <span class="metric-number">R$ 17,5M</span>
            <span class="metric-label">Investimento Total</span>
          </div>
          <div class="metric">
            <span class="metric-number">22%</span>
            <span class="metric-label">Métodos Tradicionais</span>
          </div>
        </div>

        <h3>Tecnologia Preditiva Avançada</h3>
        
        <p>O CEREIA utiliza algoritmos de machine learning para analisar padrões em dados clínicos, identificando pacientes com alto risco de desenvolver doença renal antes mesmo dos primeiros sintomas aparecerem.</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>📊 Coleta de Dados</h4>
              <p>Sistema integra dados de exames, histórico médico e fatores de risco do paciente</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🧠 Análise Preditiva</h4>
              <p>Algoritmos processam informações para calcular probabilidade de doença renal</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>⚠️ Alertas Precoces</h4>
              <p>Sistema gera alertas para médicos quando identifica risco elevado</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>🎯 Intervenção Preventiva</h4>
              <p>Equipe médica implementa protocolos de prevenção personalizados</p>
            </div>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>🕰️ Detecção Precoce</strong>
            <p>Identificação de riscos até 5 anos antes dos sintomas</p>
          </div>
          <div class="benefit-item">
            <strong>💰 Economia de Recursos</strong>
            <p>Redução significativa nos custos de tratamento</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Medicina Personalizada</strong>
            <p>Protocolos de prevenção adaptados ao perfil individual</p>
          </div>
          <div class="benefit-item">
            <strong>📈 Melhores Resultados</strong>
            <p>Aumento drástico na eficácia preventiva</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "A parceria entre Hapvida e UFC demonstra como a colaboração público-privada pode gerar inovações que salvam vidas e otimizam recursos na saúde."
            <cite>— CEREIA</cite>
          </blockquote>
        </div>

        <div class="investor-spotlight">
          <h4>🎆 Expansão Nacional</h4>
          <p>O sucesso do CEREIA no Nordeste abre caminho para replicação em outras regiões do Brasil, democratizando o acesso à medicina preditiva de alta qualidade.</p>
        </div>
      `,
      sources: [
        {
          title: 'Hapvida - CEREIA Resultados',
          url: 'https://www.hapvida.com.br/cereia-inteligencia-artificial-prevencao',
          type: 'Fonte Empresarial',
        },
      ],
    },
    5: {
      id: 5,
      title: 'Rebec@: Fiocruz Lança IA para Pesquisas Clínicas',
      subtitle:
        'Primeira ferramenta mundial de IA generativa para registros de ensaios clínicos reduz aprovação para 48h',
      excerpt:
        'Primeira ferramenta mundial de IA generativa para registros de ensaios clínicos reduz aprovação para 48h.',
      category: 'Pesquisa',
      date: '2025-03-25',
      readTime: '5 min',
      author: 'Dr. Massuca',
      tags: ['Ensaios Clínicos', 'Fiocruz', 'Rebec', 'OMS'],
      featured: false,
      image: '/images/ia-medica/rebec-bg.jpg',
      approval: '48 horas',
      scope: 'Mundial',
      likes: 134,
      shares: 56,
      content: `
        <h2>Pioneirismo Global em Pesquisa Clínica</h2>
        
        <p>A Fundação Oswaldo Cruz (Fiocruz) lançou uma ferramenta revolucionária que coloca o Brasil na vanguarda mundial da pesquisa clínica. O <strong>Rebec@</strong> é a primeira plataforma do mundo a utilizar inteligência artificial generativa para automatizar registros de ensaios clínicos.</p>

        <div class="highlight-box">
          <h3>🌍 Impacto Global</h3>
          <ul>
            <li><strong>Primeira ferramenta mundial</strong> de IA para ensaios clínicos</li>
            <li><strong>Redução drástica</strong> no tempo de aprovação: de semanas para 48h</li>
            <li><strong>Reconhecimento da OMS</strong> como inovação prioritária</li>
            <li><strong>Democratização</strong> do acesso à pesquisa clínica</li>
          </ul>
        </div>

        <h3>Revolução na Documentação Científica</h3>
        
        <p>Tradicionalmente, o registro de ensaios clínicos é um processo moroso e complexo que pode levar semanas ou meses. O Rebec@ transforma essa realidade:</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>📝 Inserção de Dados</h4>
              <p>Pesquisador insere informações básicas sobre o estudo proposto</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🧠 Processamento IA</h4>
              <p>Sistema gera automaticamente documentação completa e protocolos</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>⚙️ Revisão Automatizada</h4>
              <p>Validação automática de conformidade com normas nacionais e internacionais</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>✅ Aprovação Rápida</h4>
              <p>Registro aprovado e publicado em plataformas globais em 48 horas</p>
            </div>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚡ Agilidade</strong>
            <p>Redução de 90% no tempo de registro de ensaios clínicos</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Padronização</strong>
            <p>Conformidade automática com padrões internacionais da OMS</p>
          </div>
          <div class="benefit-item">
            <strong>💰 Economia</strong>
            <p>Redução significativa nos custos administrativos de pesquisa</p>
          </div>
          <div class="benefit-item">
            <strong>📈 Qualidade</strong>
            <p>Melhoria na qualidade e consistência da documentação</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "O Rebec@ representa um marco na democratização da pesquisa clínica, permitindo que mais instituições brasileiras participem de estudos internacionais."
            <cite>— Fiocruz</cite>
          </blockquote>
        </div>

        <div class="future-outlook">
          <h4>🚀 Próximas Etapas</h4>
          <p>A Fiocruz planeja expandir o Rebec@ para incluir análise preditiva de resultados de ensaios e integração com bases de dados internacionais de pesquisa clínica.</p>
        </div>
      `,
      sources: [
        {
          title: 'Fiocruz - Lançamento Rebec@',
          url: 'https://portal.fiocruz.br/rebec-inteligencia-artificial-ensaios-clinicos',
          type: 'Fonte Oficial',
        },
      ],
    },
    6: {
      id: 6,
      title: 'CFM Debate Ética e Regulamentação da IA Médica',
      subtitle:
        'Conselho Federal de Medicina estabelece diretrizes para uso responsável da IA como ferramenta auxiliar',
      excerpt:
        'Conselho Federal de Medicina estabelece diretrizes para uso responsável da IA como ferramenta auxiliar.',
      category: 'Regulamentação',
      date: '2025-08-15',
      readTime: '4 min',
      author: 'Dr. Massuca',
      tags: ['CFM', 'Ética', 'Regulamentação', 'Diretrizes'],
      featured: false,
      image: '/images/ia-medica/cfm-debate-bg.jpg',
      likes: 178,
      shares: 63,
      content: `
        <h2>Marco Regulatório para IA na Medicina</h2>
        
        <p>O <strong>Conselho Federal de Medicina (CFM)</strong> lançou diretrizes pioneiras para o uso ético e responsável da inteligência artificial na prática médica brasileira. As novas normas estabelecem um marco regulatório que equilibra inovação tecnológica com segurança do paciente.</p>

        <div class="highlight-box">
          <h3>⚖️ Princípios Éticos Fundamentais</h3>
          <ul>
            <li><strong>IA como ferramenta auxiliar</strong>, nunca substituta do médico</li>
            <li><strong>Responsabilidade médica</strong> permanece sempre com o profissional</li>
            <li><strong>Transparência</strong> obrigatória sobre uso de IA para pacientes</li>
            <li><strong>Validação científica</strong> rigorosa antes da implementação</li>
          </ul>
        </div>

        <h3>Diretrizes de Implementação</h3>
        
        <p>O CFM estabeleceu critérios claros para a adoção responsável de tecnologias de IA na medicina:</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>📊 Validação Científica</h4>
              <p>Comprovação de eficácia e segurança através de estudos controlados</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🎯 Treinamento Médico</h4>
              <p>Capacitação obrigatória dos profissionais antes do uso</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>📋 Documentação</h4>
              <p>Registro detalhado do uso de IA em prontuários médicos</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>🔍 Auditoria Contínua</h4>
              <p>Monitoramento permanente de resultados e segurança</p>
            </div>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>🛡️ Segurança do Paciente</strong>
            <p>Proteção contra uso inadequado ou mal interpretado da IA</p>
          </div>
          <div class="benefit-item">
            <strong>⚖️ Responsabilidade Clara</strong>
            <p>Definição nítida dos limites e responsabilidades médicas</p>
          </div>
          <div class="benefit-item">
            <strong>🎆 Inovação Responsável</strong>
            <p>Incentivo ao avanço tecnológico com ética e segurança</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Padronização Nacional</strong>
            <p>Uniformização de práticas em todo o território brasileiro</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "A IA deve ser vista como uma ferramenta poderosa para auxiliar o médico, mas jamais pode substituir o julgamento clínico, a empatia e a relação médico-paciente."
            <cite>— CFM</cite>
          </blockquote>
        </div>

        <div class="investor-spotlight">
          <h4>📚 Formação Continuada</h4>
          <p>O CFM lançará programa nacional de capacitação em IA médica, garantindo que todos os profissionais tenham acesso ao conhecimento necessário para uso ético da tecnologia.</p>
        </div>

        <div class="future-outlook">
          <h4>🚀 Próximos Passos</h4>
          <p>O CFM planeja revisar as diretrizes anualmente, adaptando-se aos avanços tecnológicos e incorporando aprendizados da prática clínica real.</p>
        </div>
      `,
      sources: [
        {
          title: 'CFM - Diretrizes IA Médica',
          url: 'https://portal.cfm.org.br/diretrizes-inteligencia-artificial-medicina',
          type: 'Fonte Regulatória',
        },
      ],
    },
    7: {
      id: 7,
      title: 'Brasil Lidera Agenda de IA na Saúde no BRICS 2025',
      subtitle:
        'Presidência brasileira prioriza cooperação internacional em IA médica e governança de dados em saúde',
      excerpt:
        'Presidência brasileira prioriza cooperação internacional em IA médica e governança de dados em saúde.',
      category: 'Internacional',
      date: '2025-05-30',
      readTime: '6 min',
      author: 'Dr. Massuca',
      tags: ['BRICS', 'Cooperação', 'Saúde Digital', 'Internacional'],
      featured: false,
      image: '/images/ia-medica/brics-saude-bg.jpg',
      likes: 145,
      shares: 71,
      content: `
        <h2>Liderança Global em Saúde Digital</h2>
        
        <p>Durante a presidência brasileira do BRICS em 2025, o Brasil estabeleceu a inteligência artificial na saúde como prioridade estratégica do bloco. A iniciativa busca criar um marco de cooperação entre Brasil, Rússia, Índia, China e África do Sul para o desenvolvimento de soluções de IA médica.</p>

        <div class="highlight-box">
          <h3>🌍 Agenda BRICS Saúde Digital</h3>
          <ul>
            <li><strong>Compartilhamento tecnológico</strong> entre países membros</li>
            <li><strong>Padrões éticos</strong> comuns para IA médica</li>
            <li><strong>Governança de dados</strong> em saúde pública</li>
            <li><strong>Capacitação conjunta</strong> de profissionais</li>
          </ul>
        </div>

        <h3>Iniciativas Estratégicas</h3>
        
        <p>O Brasil propôs um conjunto abrangente de ações para fortalecer a cooperação em saúde digital:</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🤝 Rede de Cooperação</h4>
              <p>Criação de rede permanente de instituições de pesquisa em IA médica</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>📊 Base de Dados Conjunta</h4>
              <p>Desenvolvimento de repositório compartilhado de dados para treinamento de IA</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>⚖️ Marcos Regulatórios</h4>
              <p>Harmonização de normas éticas e regulatórias entre países</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>🎓 Programa de Capacitação</h4>
              <p>Intercâmbio de conhecimento e formação de especialistas</p>
            </div>
          </div>
        </div>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">5</span>
            <span class="metric-label">Países Membros</span>
          </div>
          <div class="metric">
            <span class="metric-number">3.2B</span>
            <span class="metric-label">População Total</span>
          </div>
          <div class="metric">
            <span class="metric-number">42%</span>
            <span class="metric-label">PIB Global</span>
          </div>
          <div class="metric">
            <span class="metric-number">15+</span>
            <span class="metric-label">Projetos Conjuntos</span>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>🌍 Escala Global</strong>
            <p>Acesso a populações diversas para desenvolvimento de IA inclusiva</p>
          </div>
          <div class="benefit-item">
            <strong>💰 Recursos Compartilhados</strong>
            <p>Otimização de investimentos em pesquisa e desenvolvimento</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Soluções Adaptadas</strong>
            <p>Tecnologias adequadas às realidades dos países em desenvolvimento</p>
          </div>
          <div class="benefit-item">
            <strong>🔄 Transferência Tecnológica</strong>
            <p>Aceleração da inovação através do compartilhamento</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "A liderança brasileira no BRICS representa uma oportunidade única de posicionar o país na vanguarda da saúde digital global, beneficiando milhões de pessoas."
            <cite>— Ministério da Saúde</cite>
          </blockquote>
        </div>

        <div class="investor-spotlight">
          <h4>🎆 Resultados Esperados</h4>
          <p>A cooperação BRICS em IA médica promete acelerar o desenvolvimento de soluções inovadoras, reduzir custos de pesquisa e democratizar o acesso a tecnologias de ponta.</p>
        </div>

        <div class="future-outlook">
          <h4>🚀 Projetos Futuros</h4>
          <p>Os países BRICS plannejam lançar centro conjunto de excelência em IA médica e programa de intercâmbio de pesquisadores em 2026.</p>
        </div>
      `,
      sources: [
        {
          title: 'BRICS Brasil 2025 - Saúde Digital',
          url: 'https://www.brics2025.gov.br/saude-digital-inteligencia-artificial',
          type: 'Fonte Oficial',
        },
      ],
    },
    8: {
      id: 8,
      title: 'Câmara Debate PL 2338/23 para Regulamentação da IA',
      subtitle:
        'Projeto de Lei busca equilibrar inovação tecnológica com segurança jurídica na aplicação da IA em saúde',
      excerpt:
        'Projeto de Lei busca equilibrar inovação tecnológica com segurança jurídica na aplicação da IA em saúde.',
      category: 'Regulamentação',
      date: '2025-08-05',
      readTime: '5 min',
      author: 'Dr. Massuca',
      tags: ['Legislação', 'PL 2338/23', 'Câmara', 'Segurança'],
      featured: false,
      image: '/images/ia-medica/camara-debate-bg.jpg',
      likes: 167,
      shares: 54,
      content: `
        <h2>Marco Legal para Inteligência Artificial</h2>
        
        <p>A Câmara dos Deputados intensificou os debates sobre o <strong>Projeto de Lei 2338/23</strong>, que estabelece o marco regulatório para inteligência artificial no Brasil. Com foco especial na área da saúde, a proposta busca criar um ambiente seguro e inovador para o desenvolvimento e uso de tecnologias de IA.</p>

        <div class="highlight-box">
          <h3>📜 Principais Pontos do PL 2338/23</h3>
          <ul>
            <li><strong>Classificação de riscos</strong> para sistemas de IA médica</li>
            <li><strong>Obrigatoriedade de testes</strong> antes da implementação</li>
            <li><strong>Transparência algorítmica</strong> em decisões médicas</li>
            <li><strong>Responsabilidade civil</strong> por danos causados por IA</li>
          </ul>
        </div>

        <h3>Categorização de Riscos em Saúde</h3>
        
        <p>O projeto estabelece diferentes níveis de regulamentação baseados no risco potencial:</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🟢 Risco Mínimo</h4>
              <p>Ferramentas de apoio administrativo e agendamento - autorregulação</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🟡 Risco Limitado</h4>
              <p>Sistemas de triagem e análise de imagens - transparência obrigatória</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>🟠 Alto Risco</h4>
              <p>Diagnósticos automáticos e prescrições - certificação rigorosa</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>🔴 Risco Inaceitável</h4>
              <p>Sistemas que substituem completamente decisão médica - proibição</p>
            </div>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚖️ Segurança Jurídica</strong>
            <p>Clareza sobre responsabilidades e limites legais</p>
          </div>
          <div class="benefit-item">
            <strong>🎆 Incentivo à Inovação</strong>
            <p>Ambiente regulatório previsível para empresas</p>
          </div>
          <div class="benefit-item">
            <strong>🛡️ Proteção ao Paciente</strong>
            <p>Garantias contra uso inadequado da tecnologia</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Alinhamento Global</strong>
            <p>Harmonização com regulamentações internacionais</p>
          </div>
        </div>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">4</span>
            <span class="metric-label">Níveis de Risco</span>
          </div>
          <div class="metric">
            <span class="metric-number">180</span>
            <span class="metric-label">Dias Consulta Pública</span>
          </div>
          <div class="metric">
            <span class="metric-number">50+</span>
            <span class="metric-label">Entidades Consultadas</span>
          </div>
          <div class="metric">
            <span class="metric-number">2026</span>
            <span class="metric-label">Previsão Aprovação</span>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "O Brasil precisa de uma legislação que proteja cidadãos e pacientes sem frear a inovação tecnológica. O PL 2338/23 busca esse equilíbrio fundamental."
            <cite>— Relatoria do Projeto</cite>
          </blockquote>
        </div>

        <div class="investor-spotlight">
          <h4>📊 Impacto Econômico</h4>
          <p>A regulamentação clara pode atrair mais investimentos para o setor de healthtech, estimado em crescimento de 300% nos próximos 5 anos.</p>
        </div>

        <div class="future-outlook">
          <h4>⏳ Cronograma Legislativo</h4>
          <p>O projeto passa por consulta pública até dezembro de 2025, com votação prevista para o primeiro semestre de 2026 e entrada em vigor em 2027.</p>
        </div>

        <div class="call-to-action">
          <h4>🗣️ Participação Social</h4>
          <p>A Câmara incentiva a participação de profissionais de saúde, empresas de tecnologia e sociedade civil no processo de consulta pública para aprimorar o texto final.</p>
        </div>
      `,
      sources: [
        {
          title: 'Câmara dos Deputados - PL 2338/23',
          url: 'https://www.camara.leg.br/propostas-legislativas/pl-2338-2023',
          type: 'Fonte Legislativa',
        },
      ],
    },
  };

  useEffect(() => {
    // Simular carregamento do artigo
    const articleData = articlesDatabase[parseInt(id)];
    if (articleData) {
      setArticle(articleData);

      // Simular artigos relacionados
      const related = Object.values(articlesDatabase)
        .filter(
          a =>
            a.id !== articleData.id &&
            (a.category === articleData.category ||
              a.tags.some(tag => articleData.tags.includes(tag)))
        )
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

        {/* Imagem do Artigo - Agora no topo */}
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
          {/* Conteúdo do Header */}
          <div className="article-header-content">
            {/* Título Principal */}
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
                  day: 'numeric',
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
                <span key={index} className="article-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Conteúdo do Artigo */}
        <main className="article-content">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: article.content }} />

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
              {relatedArticles.map(relatedArticle => (
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
