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

  // Base de dados completa dos artigos
  const articlesDatabase = {
    1: {
      id: 1,
      title: 'ITMI-Brasil: Primeiro Hospital Público Inteligente do País',
      subtitle:
        'Projeto revolucionário de US$ 320 milhões transformará o atendimento emergencial no SUS com IA, 5G e telessaúde',
      excerpt:
        'Marco histórico na saúde pública: hospital com 800 leitos que reduzirá tempo de espera de 17h para 2h usando IA, 5G e uma rede nacional de UTIs inteligentes.',
      category: 'Infraestrutura',
      date: '2025-09-04',
      readTime: '15 min',
      author: 'Dr. Massuca',
      tags: [
        'ITMI-Brasil',
        'Hospital Inteligente',
        '5G',
        'IA Médica',
        'SUS',
        'BRICS',
        'USP',
        'HCFMUSP',
      ],
      featured: true,
      image: '/images/ia-medica/hospital-bg.jpg',
      investment: 'US$ 320 milhões',
      location: 'Hospital das Clínicas - USP/SP',
      patients: '16 milhões potenciais',
      likes: 347,
      shares: 129,
      content: `
        <h2>Uma Revolução na Saúde Pública Brasileira</h2>
        
        <p>O <strong>Instituto Tecnológico de Medicina Inteligente (ITMI-Brasil)</strong> representa o mais ambicioso projeto de transformação digital já concebido para o Sistema Único de Saúde. Mais que um hospital, é um marco histórico que posicionará o Brasil na vanguarda mundial da medicina inteligente.</p>

        <p>Localizado no complexo do Hospital das Clínicas da FMUSP, em São Paulo, este empreendimento de <strong>US$ 320 milhões</strong> financiado pelo Novo Banco de Desenvolvimento (NDB-BRICS) promete revolucionar o atendimento de emergência no país, integrando tecnologias de ponta como inteligência artificial, conectividade 5G, Internet das Coisas (IoT) e telessaúde em uma unidade de 800 leitos voltada para emergências de alta complexidade.</p>

        <div class="highlight-box">
          <h3>🏥 ITMI-Brasil em Números</h3>
          <ul>
            <li><strong>800 leitos</strong> especializados em emergências neurológicas e cardíacas</li>
            <li><strong>150.000 m²</strong> de área construída com padrões internacionais</li>
            <li><strong>Redução de 17h para 2h</strong> no tempo de atendimento crítico</li>
            <li><strong>US$ 320 milhões</strong> do NDB + contrapartida nacional (~R$ 400 milhões)</li>
            <li><strong>10 UTIs inteligentes</strong> conectadas em capitais brasileiras</li>
            <li><strong>Inauguração prevista:</strong> final de 2027</li>
            <li><strong>Início das obras:</strong> 2026</li>
          </ul>
        </div>

        <h3>Cronologia de um Marco Histórico</h3>
        
        <p>O projeto ITMI-Brasil ganhou forma através de uma série de eventos decisivos que demonstram o comprometimento do governo brasileiro com a inovação em saúde:</p>
        
        <div class="process-steps">
          <div class="step">
            <span class="step-number">Jun/2025</span>
            <div>
              <h4>📋 Aprovação COFIEX</h4>
              <p>A Comissão de Financiamentos Externos autoriza preparação do projeto e financiamento de US$ 320 milhões junto ao NDB-BRICS</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">Jul/2025</span>
            <div>
              <h4>🤝 Apresentação ao BRICS</h4>
              <p>Ministros da Saúde e MCTI apresentam formalmente o projeto à presidenta do NDB, Dilma Rousseff, iniciando análise técnica detalhada</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">Set/2025</span>
            <div>
              <h4>✍️ Acordo de Cooperação</h4>
              <p>Assinatura oficial do ACT entre Ministério da Saúde, USP e Governo de SP, formalizando o consórcio para implementação</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2026</span>
            <div>
              <h4>🏗️ Início das Obras</h4>
              <p>Começo da construção e implementação das 10 UTIs inteligentes piloto em hospitais das capitais selecionadas</p>
            </div>
          </div>
        </div>

        <h3>Arquitetura Tecnológica Revolucionária</h3>
        
        <p>O ITMI-Brasil foi concebido como um ecossistema tecnológico integrado que redefine os padrões de atendimento hospitalar:</p>
        
        <h4>🧠 Inteligência Artificial Aplicada</h4>
        <p>O hospital incorporará modelos de IA em múltiplos contextos assistenciais, incluindo:</p>
        <ul>
          <li><strong>Triagem inteligente:</strong> Análise de sinais vitais e sintomas para estratificação de risco no protocolo de Manchester</li>
          <li><strong>Diagnóstico por imagem:</strong> Algoritmos para detecção de AVC em tomografias e infarto em eletrocardiogramas</li>
          <li><strong>UTI preditiva:</strong> Sistemas que analisam centenas de variáveis para prever deterioração clínica e sepse horas antes dos sinais tradicionais</li>
          <li><strong>Assistentes virtuais:</strong> Apoio à decisão médica baseado em diretrizes e dados do paciente</li>
        </ul>

        <h4>📡 Conectividade 5G Integral</h4>
        <p>Infraestrutura 5G de ponta a ponta garantirá:</p>
        <ul>
          <li><strong>Ambulâncias conectadas:</strong> Transmissão contínua de dados clínicos e videoconferência durante o transporte</li>
          <li><strong>Cobertura interna completa:</strong> Antenas 5G em todo o edifício para comunicação instantânea</li>
          <li><strong>Redundância de conectividade:</strong> Links de fibra óptica integrados à RNDS do Ministério da Saúde</li>
        </ul>

        <h4>🏥 Telessaúde e Regulação Inteligente</h4>
        <p>Central de telemedicina para suporte remoto que incluirá:</p>
        <ul>
          <li><strong>Tele-UTI:</strong> Especialistas acompanharão em tempo real pacientes críticos nas 10 UTIs remotas parceiras</li>
          <li><strong>Regulação de leitos:</strong> Sistema inteligente com IA preditiva para otimizar transferências e reduzir tempo de espera</li>
          <li><strong>Teleconsultas especializadas:</strong> Suporte remoto para unidades básicas de saúde</li>
        </ul>

        <h4>🔒 Segurança e Interoperabilidade</h4>
        <p>Padrão zero trust de segurança com:</p>
        <ul>
          <li><strong>Conformidade LGPD:</strong> Controle de acesso granular e logs de auditoria invioláveis</li>
          <li><strong>Integração nacional:</strong> Compatibilidade com RNDS, Conecte SUS e Meu SUS Digital</li>
          <li><strong>Padrões internacionais:</strong> HL7 FHIR, terminologias CID-10, LOINC e SNOMED CT</li>
        </ul>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">800</span>
            <span class="metric-label">Leitos Especializados</span>
          </div>
          <div class="metric">
            <span class="metric-number">90%</span>
            <span class="metric-label">Redução no Tempo</span>
          </div>
          <div class="metric">
            <span class="metric-number">10</span>
            <span class="metric-label">UTIs Conectadas</span>
          </div>
          <div class="metric">
            <span class="metric-number">R$ 2 bi</span>
            <span class="metric-label">Investimento Total</span>
          </div>
        </div>

        <h3>Rede Nacional de UTIs Inteligentes</h3>
        
        <p>Uma das inovações mais impactantes do projeto é a criação de uma rede interligada de UTIs inteligentes. Serão implantadas UTIs com monitoramento intensivo por IA em <strong>10 capitais brasileiras</strong>: Belém, Brasília, Belo Horizonte, Fortaleza, Porto Alegre, Rio de Janeiro, Recife, Salvador, São Paulo e Teresina.</p>

        <p>Essas unidades estarão conectadas ao HUB do HCFMUSP, permitindo:</p>
        <ul>
          <li><strong>Tele-UTI em tempo real:</strong> Monitoramento remoto 24/7 por especialistas</li>
          <li><strong>Segunda opinião instantânea:</strong> Consultoria especializada para casos complexos</li>
          <li><strong>Regulação ágil:</strong> Otimização de transferências entre unidades da rede</li>
          <li><strong>Capacitação contínua:</strong> Treinamento remoto de equipes locais</li>
        </ul>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚡ Tempo Porta-Agulha</strong>
            <p>Redução drástica no tempo crítico para AVC e infarto através de regulação inteligente</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Medicina Personalizada</strong>
            <p>IA auxilia na personalização de tratamentos baseados no perfil do paciente</p>
          </div>
          <div class="benefit-item">
            <strong>📊 Gestão Baseada em Dados</strong>
            <p>Análise preditiva de demandas e vigilância epidemiológica aprimorada</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Padrão Internacional</strong>
            <p>Alinhamento com melhores práticas globais em sustentabilidade e segurança</p>
          </div>
        </div>

        <h3>Parceria Estratégica e Governança</h3>
        
        <p>O ITMI-Brasil resulta de uma parceria inovadora entre múltiplas instituições:</p>
        
        <div class="quote-box">
          <blockquote>
            "O hospital inteligente fortalece o SUS, alia tecnologia de ponta ao cuidado humanizado, proporcionando ao paciente um cuidado mais rápido, eficaz e humano."
            <cite>— Alexandre Padilha, Ministro da Saúde</cite>
          </blockquote>
        </div>

        <h4>🏛️ Atores Principais:</h4>
        <ul>
          <li><strong>Ministério da Saúde:</strong> Proponente e líder do projeto, coordenação geral e gestão do financiamento</li>
          <li><strong>Universidade de São Paulo:</strong> Parceira acadêmica, pesquisa, inovação e formação profissional</li>
          <li><strong>Governo do Estado de SP:</strong> Cessão do terreno e integração com rede estadual</li>
          <li><strong>HCFMUSP:</strong> Executor local e operação integrada à estrutura existente</li>
          <li><strong>MCTI:</strong> Apoio técnico-científico e investimento em P&D via Finep/FNDCT</li>
          <li><strong>NDB-BRICS:</strong> Financiador principal com foco em cooperação internacional</li>
        </ul>

        <div class="quote-box">
          <blockquote>
            "Primeiros passos de um futuro em que o cuidado será mais ágil, preciso e humano, graças à ciência e responsabilidade pública."
            <cite>— Prof. Paulo Pêgo, HC-FMUSP</cite>
          </blockquote>
        </div>

        <h3>Aspectos Financeiros e Sustentabilidade</h3>
        
        <p>O projeto conta com estrutura financeira robusta e diversificada:</p>

        <h4>💰 Composição do Financiamento:</h4>
        <ul>
          <li><strong>NDB-BRICS:</strong> US$ 320 milhões (~R$ 1,7 bilhão) - 80% do projeto</li>
          <li><strong>Contrapartida Nacional:</strong> ~R$ 400 milhões (20%) - União e Estado de SP</li>
          <li><strong>MCTI Complementar:</strong> Recursos via Nova Indústria Brasil para P&D</li>
          <li><strong>Valor total estimado:</strong> Aproximadamente R$ 2 bilhões</li>
        </ul>

        <p>O financiamento do NDB oferece condições favoráveis e representa um marco na cooperação Sul-Sul, enquanto a contrapartida nacional garante o comprometimento e sustentabilidade do projeto.</p>

        <h3>Tecnologia Nacional e Transferência de Conhecimento</h3>
        
        <p>O ITMI-Brasil funcionará como catalisador para o desenvolvimento tecnológico nacional:</p>
        
        <ul>
          <li><strong>Formação de ecossistema:</strong> Estímulo a startups e empresas de healthtech</li>
          <li><strong>Pesquisa aplicada:</strong> Parcerias com universidades para desenvolvimento de soluções</li>
          <li><strong>Transferência tecnológica:</strong> Cooperação internacional, especialmente com a China</li>
          <li><strong>Capacitação profissional:</strong> Centro de excelência em saúde digital e segurança cibernética</li>
        </ul>

        <div class="quote-box">
          <blockquote>
            "O projeto simboliza o futuro da saúde pública global, baseado na cooperação internacional e transferência de tecnologia."
            <cite>— Dilma Rousseff, Presidenta do NDB-BRICS</cite>
          </blockquote>
        </div>

        <h3>Desafios e Gestão de Riscos</h3>
        
        <p>Como todo projeto inovador de grande escala, o ITMI-Brasil enfrenta desafios que estão sendo ativamente gerenciados:</p>

        <h4>🛡️ Mitigação de Riscos:</h4>
        <ul>
          <li><strong>Regulatórios:</strong> Alinhamento contínuo com normativas da Anvisa, CFM e ANPD</li>
          <li><strong>Tecnológicos:</strong> Fase intensiva de testes de interoperabilidade antes da inauguração</li>
          <li><strong>Operacionais:</strong> Programas de capacitação e gestão de mudança para profissionais</li>
          <li><strong>Financeiros:</strong> Gestão do risco cambial e reservas de contingência</li>
          <li><strong>Cibersegurança:</strong> Equipes especializadas 24/7 e protocolos de resposta a incidentes</li>
        </ul>

        <h3>Impacto Social e Econômico</h3>
        
        <p>O ITMI-Brasil gerará benefícios que transcendem o setor saúde:</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>👥 Vidas Salvas</strong>
            <p>Diagnósticos precoces e intervenções rápidas salvarão milhares de vidas anualmente</p>
          </div>
          <div class="benefit-item">
            <strong>💡 Inovação Tecnológica</strong>
            <p>Atração de investimentos e desenvolvimento do ecossistema de healthtech nacional</p>
          </div>
          <div class="benefit-item">
            <strong>🎓 Formação Profissional</strong>
            <p>Capacitação de uma nova geração de profissionais em saúde digital</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Referência Global</strong>
            <p>Posicionamento do Brasil como líder em medicina inteligente na América Latina</p>
          </div>
        </div>

        <h3>Cronograma de Implementação</h3>
        
        <p>A execução do projeto segue cronograma rigorosamente planejado:</p>

        <div class="process-steps">
          <div class="step">
            <span class="step-number">2025</span>
            <div>
              <h4>📊 Finalização</h4>
              <p>Aprovação final do empréstimo NDB, contratação pela União e autorização do Senado Federal</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2026</span>
            <div>
              <h4>🏗️ Construção</h4>
              <p>Início das obras civis, implementação das UTIs piloto e desenvolvimento de sistemas de IA</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2027</span>
            <div>
              <h4>⚙️ Integração</h4>
              <p>Instalação tecnológica, testes de sistemas, treinamento de equipes e preparação operacional</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">Q4/2027</span>
            <div>
              <h4>🎉 Inauguração</h4>
              <p>Entrada em operação plena, início do atendimento a pacientes e funcionamento da rede de UTIs</p>
            </div>
          </div>
        </div>

        <h3>Coordenação Clínica de Excelência</h3>
        
        <p>O projeto conta com liderança médica de primeira linha. A <strong>Dra. Ludhmila Hajjar</strong>, coordenadora clínica do ITMI-Brasil e professora de Emergências Clínicas da FMUSP, destaca que a iniciativa "reduzirá substancialmente o tempo médio de acesso ao atendimento especializado, de cerca de 17 horas para aproximadamente 2 horas".</p>

        <p>A coordenação clínica foca na humanização da tecnologia, garantindo que os avanços digitais ampliem - nunca substituam - a relação médico-paciente, mantendo o cuidado humanizado como pilar central do atendimento.</p>

        <h3>Compliance e Boas Práticas</h3>
        
        <p>O ITMI-Brasil estabelece novos padrões de compliance em saúde digital:</p>

        <ul>
          <li><strong>LGPD:</strong> Conformidade total com análise de impacto e DPO dedicado</li>
          <li><strong>ISO 27001/27799:</strong> Certificação em segurança da informação para sistemas críticos</li>
          <li><strong>HL7 FHIR:</strong> Interoperabilidade garantida com padrões internacionais</li>
          <li><strong>Governança de IA:</strong> Comitê multidisciplinar para ética e transparência algorítmica</li>
          <li><strong>CFM 2314/2022:</strong> Compliance total com diretrizes de telemedicina</li>
        </ul>

        <div class="call-to-action">
          <h4>🚀 O Futuro da Medicina Já Começou</h4>
          <p>O ITMI-Brasil não é apenas um projeto de infraestrutura - é a materialização de uma visão de futuro onde tecnologia e humanismo convergem para salvar vidas. Representa o primeiro passo em direção a uma rede nacional de hospitais inteligentes que colocará o Brasil na vanguarda mundial da medicina digital.</p>
          
          <p>Ao combinar investimento internacional, expertise acadêmica, inovação tecnológica e compromisso com o SUS, o ITMI-Brasil inaugura uma nova era onde cada segundo conta, cada dado importa e cada vida é preservada através da inteligência aplicada à medicina.</p>
        </div>

        <div class="quote-box">
          <blockquote>
            "O ITMI-Brasil fortalece o SUS e alia tecnologia de ponta ao cuidado humanizado, proporcionando ao paciente um cuidado mais rápido, eficaz e humano. A tecnologia a serviço do médico e do paciente."
            <cite>— Declaração Oficial do Ministério da Saúde</cite>
          </blockquote>
        </div>
      `,
      sources: [
        {
          title: 'Ministério da Saúde - Anúncio Oficial ITMI-Brasil',
          url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/ministerio-da-saude-anuncia-criacao-do-primeiro-hospital-publico-inteligente-do-brasil',
          type: 'Fonte Oficial',
        },
        {
          title:
            'MCTI - Brasil apresenta projeto do 1º hospital inteligente do SUS ao banco do BRICS',
          url: 'https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2025/07/brasil-apresenta-projeto-do-1o-hospital-inteligente-do-sus-ao-banco-do-brics',
          type: 'Fonte Oficial',
        },
        {
          title: 'Diário Oficial da União - Resolução COFIEX nº 57/2025',
          url: 'https://www.escavador.com/diarios/6084221/DOU/secao-1/2025-07-04?page=310',
          type: 'Documento Legal',
        },
        {
          title: 'Jornal da USP - Brasil terá seu primeiro hospital inteligente',
          url: 'https://jornal.usp.br/institucional/brasil-tera-seu-primeiro-hospital-inteligente-no-complexo-do-hospital-das-clinicas/',
          type: 'Fonte Acadêmica',
        },
        {
          title: 'Futuro da Saúde - Primeiro hospital inteligente do Brasil será construído em SP',
          url: 'https://futurodasaude.com.br/hospital-inteligente-usp/',
          type: 'Mídia Especializada',
        },
        {
          title: 'Terra - O que se sabe sobre o primeiro hospital público inteligente do Brasil',
          url: 'https://www.terra.com.br/noticias/o-que-se-sabe-sobre-o-primeiro-hospital-publico-inteligente-do-brasil',
          type: 'Mídia Nacional',
        },
      ],
    },
    2: {
      id: 2,
      title: 'Voa Health: A Trajetória da Startup que Revoluciona a Documentação Médica com IA',
      subtitle:
        'Fundada por dois médicos brasileiros, empresa cresceu de US$ 300 mil para US$ 3 milhões em investimentos e atende mais de 20 mil profissionais',
      excerpt:
        'Startup brasileira fundada em 2023 por médicos que vivenciaram o problema da burocracia na saúde. Com IA, reduz 80% do tempo gasto em documentação clínica.',
      category: 'Startups',
      date: '2025-08-30',
      readTime: '8 min',
      author: 'Dr. Massuca',
      tags: ['Voa Health', 'IA Médica', 'Prontuário Eletrônico', 'Prosus Ventures', 'Healthtech'],
      featured: true,
      image: '/images/ia-medica/voa-health-bg.jpg',
      users: '20.000+ médicos',
      consultations: '80.000+ consultas/mês',
      likes: 189,
      shares: 67,
      content: `
        <h2>Quando a Necessidade Vira Inovação</h2>
        
        <p>Em 2023, dois médicos brasileiros decidiram transformar uma das maiores frustrações da classe médica em oportunidade de negócio. <strong>Fillipe Loures</strong>, que liderou áreas de inovação na operadora MedSênior, e <strong>Solano Todeschini</strong>, ex-engenheiro de IA na startup Anterior (investida pela Sequoia), fundaram a <strong>Voa Health</strong> com uma missão clara: devolver aos médicos o tempo roubado pela burocracia.</p>

        <p>A inspiração veio da experiência prática. Ambos sabiam que cerca de 50% do tempo de uma consulta médica é consumido pelo preenchimento de prontuários e papelada, reduzindo drasticamente o tempo de interação com o paciente e contribuindo para o burnout dos profissionais.</p>

        <div class="quote-box">
          <blockquote>
            "A burocracia nos atendimentos médicos consome cerca de 50% do tempo de uma consulta. Isso leva à redução do tempo de interação com o paciente e contribui para o burnout dos profissionais."
            <cite>— Problemática identificada pelos fundadores</cite>
          </blockquote>
        </div>

        <h3>Primeiros Passos e Validação (2023-2024)</h3>
        
        <p>No segundo semestre de 2023, a Voa Health recebeu seu primeiro investimento-anjo de <strong>US$ 300 mil</strong> de investidores estratégicos, incluindo Jardel Cardoso (fundador da Billor e cofundador da CredPago) e Ícaro Vilar (CEO da rede de clínicas Amor Saúde). Esse capital inicial foi fundamental para desenvolver a solução e preparar o lançamento.</p>

        <p>Em <strong>5 de março de 2024</strong>, a plataforma foi oficialmente lançada. A proposta era simples mas revolucionária: um assistente de IA que transcreve em tempo real a conversa entre médico e paciente e gera automaticamente um resumo estruturado da consulta (anamnese), além de outros documentos clínicos.</p>

        <div class="highlight-box">
          <h3>🚀 Como Funciona a Plataforma Voa Health</h3>
          <ul>
            <li><strong>Transcrição em tempo real:</strong> IA converte conversa médico-paciente em texto</li>
            <li><strong>Geração automática:</strong> Cria resumos estruturados e documentos clínicos</li>
            <li><strong>Integração via iFrame:</strong> Embute-se nos sistemas de prontuário existentes</li>
            <li><strong>Economia de tempo:</strong> Reduz em média 10 minutos por consulta</li>
            <li><strong>Conformidade LGPD:</strong> Dados anonimizados e áudio gravado só com consentimento</li>
          </ul>
        </div>

        <h3>Crescimento Exponencial em 2024</h3>
        
        <p>Os números falam por si. Até novembro de 2024, apenas oito meses após o lançamento, a Voa Health já contava com <strong>10 mil médicos cadastrados</strong> utilizando a ferramenta, gerando mais de <strong>50 mil documentos clínicos por mês</strong>. A startup foi destacada em relatório da Grão VC como caso de uso exemplar de documentação clínica por IA, sendo apelidada de "piloto automático" para serviços médicos.</p>

        <p>O diferencial técnico impressiona: a empresa desenvolveu um modelo proprietário de apenas <strong>72 milhões de parâmetros</strong>, especializado em terminologia médica portuguesa. Resultado: ~85% das anotações geradas não necessitam correção humana, e médicos precisam revisar apenas 5% do conteúdo.</p>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">US$ 3 milhões</span>
            <span class="metric-label">Rodada Seed (Março 2025)</span>
          </div>
          <div class="metric">
            <span class="metric-number">20.000+</span>
            <span class="metric-label">Médicos Cadastrados</span>
          </div>
          <div class="metric">
            <span class="metric-number">80.000+</span>
            <span class="metric-label">Consultas/Mês</span>
          </div>
          <div class="metric">
            <span class="metric-number">R$ 2,5 MM</span>
            <span class="metric-label">ARR (Q1 2025)</span>
          </div>
        </div>

        <h3>Parceria Estratégica com a Unimed</h3>
        
        <p>Ainda em 2024, a Voa fechou uma parceria crucial com a <strong>Faculdade Unimed</strong>, abrindo caminho para distribuir a solução por todo o sistema Unimed no Brasil – uma cooperativa com mais de 300 unidades regionais e cerca de 118 mil médicos cooperados.</p>

        <p>Em setembro de 2024, a equipe técnica tornou a plataforma integrável via interface embutida (iFrame) nos sistemas de prontuário eletrônico existentes, permitindo que hospitais e operadoras adotassem a tecnologia sem mudanças drásticas nos sistemas legados.</p>

        <h3>O Grande Salto: Aporte de US$ 3 Milhões</h3>
        
        <p>Em março de 2025, menos de um ano após o lançamento, a Voa Health anunciou uma rodada Seed de <strong>US$ 3 milhões</strong> liderada pela <strong>Prosus Ventures</strong> – braço de venture capital do grupo Prosus, multinacional que controla o iFood no Brasil. O aporte avaliou a empresa em mais de <strong>R$ 100 milhões</strong>.</p>

        <div class="quote-box">
          <blockquote>
            "Os recursos serão destinados a acelerar o desenvolvimento de produto, ampliar a equipe e investir em marketing e atendimento ao cliente, além de consolidar a nova frente de vendas para empresas (B2B)."
            <cite>— Solano Todeschini, cofundador da Voa Health</cite>
          </blockquote>
        </div>

        <p>Na ocasião do investimento, a empresa já possuía mais de <strong>20 mil médicos cadastrados</strong> e cerca de <strong>600 usuários pagantes</strong> do plano premium. O modelo freemium permite uso gratuito para até 10 consultas mensais, com plano pago oferecendo consultas ilimitadas e recursos avançados.</p>

        <h3>Expansão B2B e Primeiro Case Corporativo</h3>
        
        <p>Um marco importante chegou em agosto de 2025 com a implementação na <strong>Unimed Vale dos Sinos (RS)</strong>, o primeiro case corporativo da startup. Nos dois primeiros meses de uso, foram realizadas <strong>20 mil consultas</strong> com auxílio da plataforma, com maior adesão inicial no departamento de pediatria.</p>

        <p>Para atender às demandas corporativas, a Voa desenvolveu templates específicos por especialidade: cardiologia, gastroenterologia, pré-anestesia e cirurgias. O sucesso abriu portas para diversas outras cooperativas Unimed iniciarem testes ou negociações.</p>

        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🎤 Captação de Áudio</h4>
              <p>Gravação da consulta com consentimento do paciente, respeitando a LGPD</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🧠 Processamento IA</h4>
              <p>Modelo proprietário de 72M parâmetros especializado em terminologia médica</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>📋 Geração Automática</h4>
              <p>Criação de anamnese estruturada e documentos clínicos especializados</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>✅ Revisão Mínima</h4>
              <p>85% das anotações dispensam correção; médico revisa apenas 5% do conteúdo</p>
            </div>
          </div>
        </div>

        <h3>Resultados Financeiros e Projeções</h3>
        
        <p>Com a base atual, a Voa Health atingiu uma receita anualizada (ARR) de <strong>R$ 2,5 milhões</strong> até o primeiro trimestre de 2025. As projeções são ambiciosas: chegar ao final de 2025 com cerca de <strong>3 mil médicos pagantes</strong> e ARR de <strong>R$ 12 milhões</strong>.</p>

        <p>Em horizonte de 18 meses, a meta é atingir aproximadamente <strong>R$ 15 milhões anuais</strong> em receita, com <strong>8 mil assinantes</strong> dos serviços premium. No B2B, a expectativa é processar <strong>600 mil consultas mensais</strong> até o final de 2025.</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>⚡ Eficiência Comprovada</strong>
            <p>Economia de 10 minutos por consulta, reduzindo 80% do tempo em documentação</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Expansão Internacional</strong>
            <p>Já atende usuários no Brasil, Portugal, Argentina, México e Colômbia</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Alta Precisão</strong>
            <p>85% das anotações dispensam correção humana com modelo especializado</p>
          </div>
          <div class="benefit-item">
            <strong>📈 Crescimento Sustentável</strong>
            <p>15% de crescimento mensal na base de usuários pagantes</p>
          </div>
        </div>

        <h3>Visão de Futuro: Agentes de IA Conversacionais</h3>
        
        <p>Com a rodada seed, a Voa delineou planos ambiciosos além da transcrição. Os fundadores anunciaram o desenvolvimento de um "agente de IA" conversacional para apoio clínico – um assistente virtual capaz de interagir via chat durante o atendimento.</p>

        <div class="quote-box">
          <blockquote>
            "A visão de longo prazo da startup é tornar-se um 'one-stop-shop' de IA na saúde, combinando documentação automatizada, assistentes clínicos especializados e interfaces conversacionais sob demanda."
            <cite>— Solano Todeschini, cofundador da Voa Health</cite>
          </blockquote>
        </div>

        <p>O médico poderá perguntar ao agente sobre medicamentos, solicitar resumos de orientações ou esclarecer dúvidas clínicas em tempo real. A ferramenta funcionará como hub de diferentes agentes especializados, assistindo desde o pré-consulta até o acompanhamento pós-atendimento.</p>

        <h3>Estratégia Equilibrada: B2B e B2C</h3>
        
        <p>Apesar do crescimento no segmento corporativo, a Voa mantém foco estratégico nos médicos individuais. "Nosso foco principal sempre vai ser atender os médicos diretamente. No B2B você ganha volume, mas o tíquete e as margens são menores", afirma Fillipe Loures.</p>

        <p>A empresa cresceu de 2 fundadores para <strong>25 colaboradores</strong> em pouco mais de um ano, mantendo a agilidade característica de startups enquanto escala operações corporativas.</p>

        <h3>Tecnologia Diferenciada</h3>
        
        <p>A Voa enfatiza o uso de modelos especializados em vez de grandes modelos genéricos. Para transcrição de áudio clínico, desenvolveu soluções baseadas em modelos open-source treinados com dados médicos em português, obtendo alta acurácia com baixíssima latência.</p>

        <p>O modelo de 72 milhões de parâmetros é suficiente para entender terminologia médica e nomes de medicamentos, mas leve o bastante para funcionar rapidamente mesmo em consultórios com internet limitada.</p>

        <div class="call-to-action">
          <h4>🔮 Impacto na Saúde Digital</h4>
          <p>A trajetória da Voa Health reflete a maturidade do ecossistema brasileiro de healthtech. Em apenas dois anos, evoluiu de uma ideia entre dois médicos empreendedores para uma plataforma robusta com dezenas de milhares de usuários e apoio de investidores globais, posicionando-se como referência em IA aplicada à documentação médica.</p>
        </div>

        <div class="quote-box">
          <blockquote>
            "A inteligência artificial generativa deve provocar uma transformação tão profunda quanto a causada pela internet – talvez até maior. Essa mudança já começou."
            <cite>— Fillipe Loures, cofundador da Voa Health</cite>
          </blockquote>
        </div>
      `,
      sources: [
        {
          title: 'Brazil Journal - A startup que leva a AI para os médicos',
          url: 'https://braziljournal.com/a-proxima-consulta-sera-diferente-a-startup-que-leva-a-ai-para-os-medicos/',
          type: 'Mídia Especializada',
        },
        {
          title: 'Bloomberg Línea - Prosus investe em startup brasileira',
          url: 'https://www.bloomberglinea.com.br/startups/prosus-investe-em-startup-brasileira-que-mira-ser-um-hub-de-agentes-de-ia-para-saude/',
          type: 'Mídia Financeira',
        },
        {
          title: 'IT Forum - Unimed Vale dos Sinos e Voa Health',
          url: 'https://itforum.com.br/noticias/unimed-voa-health-b2b/',
          type: 'Mídia Tecnológica',
        },
        {
          title: 'Startupi - Voa Health recebe US$ 3 milhões',
          url: 'https://startupi.com.br/voa-health-recebe-us-3-milhoes-em-rodada-seed/',
          type: 'Mídia Startups',
        },
        {
          title: 'Diário do Comércio - Startup transforma relação médico-paciente',
          url: 'https://diariodocomercio.com.br/negocios/startup-transforma-relacao-medico-paciente-ia/',
          type: 'Mídia Regional',
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
      title: 'Ministério da Saúde Apresenta Hospital Inteligente do SUS ao BRICS',
      subtitle:
        'Projeto de US$ 320 milhões para o primeiro hospital inteligente do SUS foi apresentado ao Novo Banco de Desenvolvimento',
      excerpt:
        'Ministério da Saúde apresenta ao banco do BRICS projeto para construção do primeiro hospital inteligente do SUS com investimento de US$ 320 milhões.',
      category: 'Internacional',
      date: '2025-07-07',
      readTime: '6 min',
      author: 'Dr. Massuca',
      tags: ['BRICS', 'Hospital Inteligente', 'SUS', 'ITMI-Brasil', 'USP'],
      featured: true,
      image: '/images/ia-medica/brics-saude-bg.jpg',
      investment: 'US$ 320 milhões',
      location: 'Hospital das Clínicas - USP/SP',
      likes: 245,
      shares: 89,
      content: `
        <h2>Marco Histórico para o SUS</h2>
        
        <p>O <strong>Ministério da Saúde</strong> apresentou oficialmente ao Novo Banco do Desenvolvimento (NDB), o banco do BRICS, o projeto para construção do primeiro hospital inteligente do Sistema Único de Saúde. O protocolo para financiamento de <strong>US$ 320 milhões</strong> foi entregue pelo ministro Alexandre Padilha à presidenta do banco, Dilma Rousseff.</p>

        <div class="highlight-box">
          <h3>🏥 Instituto Tecnológico de Medicina Inteligente (ITMI-Brasil)</h3>
          <ul>
            <li><strong>Localização:</strong> Hospital das Clínicas da USP, São Paulo</li>
            <li><strong>Investimento:</strong> US$ 320 milhões aprovados pela Cofiex</li>
            <li><strong>Área:</strong> 150 mil m² com padrões internacionais</li>
            <li><strong>Parceria:</strong> Ministério da Saúde e Universidade de São Paulo</li>
          </ul>
        </div>

        <h3>Tecnologias Revolucionárias</h3>
        
        <p>O ITMI-Brasil será um centro de excelência em saúde digital, integrando as mais avançadas tecnologias:</p>
        
        <h4>🧠 Inteligência Artificial Aplicada</h4>
        <p>Sistemas de IA para diagnóstico, prognóstico e gestão assistencial automatizada, otimizando tomadas de decisão médica.</p>

        <h4>🚑 Ambulâncias Conectadas 5G</h4>
        <p>Comunicação em tempo real entre ambulâncias e hospital, permitindo preparo antecipado da equipe médica.</p>

        <h4>📱 Telessaúde Integrada</h4>
        <p>Plataforma completa de telemedicina com consultas remotas e monitoramento contínuo de pacientes.</p>

        <h4>🏥 Automação Hospitalar</h4>
        <p>Integração total com prontuários eletrônicos e sistemas preditivos de gestão assistencial para alta eficiência operacional.</p>

        <div class="quote-box">
          <blockquote>
            "Apresentamos ao banco dos BRICS o projeto para o desenvolvimento de um hospital inteligente que use toda a tecnologia da informação e inteligência artificial, com base em experiências que estão acontecendo na China. É um grande passo para o Brasil entrar nessa revolução tecnológica."
            <cite>— Alexandre Padilha, Ministro da Saúde</cite>
          </blockquote>
        </div>

        <h3>Cooperação Internacional BRICS</h3>
        
        <p>O projeto representa um marco na cooperação entre os países do BRICS, unindo Brasil, China e demais membros em uma iniciativa que promove:</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>🤝 Intercâmbio Tecnológico</strong>
            <p>Transferência de tecnologia e conhecimento entre países do BRICS</p>
          </div>
          <div class="benefit-item">
            <strong>🎓 Ensino e Pesquisa</strong>
            <p>Centro de formação em medicina inteligente e inovação</p>
          </div>
          <div class="benefit-item">
            <strong>🌍 Padrões Globais</strong>
            <p>Adoção de práticas internacionais em sustentabilidade e segurança</p>
          </div>
          <div class="benefit-item">
            <strong>⚡ Eficiência Operacional</strong>
            <p>Regulação inteligente de leitos e redução do tempo de permanência</p>
          </div>
        </div>

        <div class="quote-box">
          <blockquote>
            "O projeto que está em análise pelo NDB simboliza o futuro da saúde pública global, baseado na cooperação internacional, na transferência de tecnologia e na aplicação da ciência e da inovação em benefício das populações."
            <cite>— Dilma Rousseff, Presidenta do Banco do BRICS</cite>
          </blockquote>
        </div>

        <h3>Rede de UTIs Inteligentes</h3>
        
        <p>Além do hospital principal, o projeto inclui a estruturação de uma <strong>rede de 10 UTIs inteligentes</strong> espalhadas pelo país, modernizando e qualificando o cuidado intensivo no SUS.</p>

        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🏥 Modernização</h4>
              <p>Atualização tecnológica de UTIs existentes em hospitais do SUS</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>🔗 Integração Digital</h4>
              <p>Conectividade e suporte de telessaúde para cuidado em rede</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>🚀 Expansão Nacional</h4>
              <p>Ampliação progressiva para mais unidades em todo o território</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>🏭 Setor Industrial</h4>
              <p>Fortalecimento da relação com setores de desenvolvimento tecnológico</p>
            </div>
          </div>
        </div>

        <div class="investor-spotlight">
          <h4>🏗️ Características do Projeto</h4>
          <p>O novo edifício seguirá padrões internacionais de sustentabilidade, com foco em logística interna avançada, redução de infecções hospitalares e preparação para desastres e pandemias. A estrutura será climaticamente otimizada e humanizada.</p>
        </div>

        <div class="call-to-action">
          <h4>🔮 Futuro da Saúde Pública</h4>
          <p>O ITMI-Brasil representará uma revolução na saúde pública brasileira, combinando inovação tecnológica, cooperação internacional e excelência em atendimento para beneficiar milhões de brasileiros.</p>
        </div>
      `,
      sources: [
        {
          title: 'Ministério da Saúde - Hospital Inteligente do SUS',
          url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/julho/ministerio-da-saude-apresenta-ao-banco-do-brics-projeto-para-construcao-do-primeiro-hospital-inteligente-do-sus',
          type: 'Fonte Oficial',
        },
      ],
    },
    10: {
      id: 10,
      title: 'IA Ajuda Pacientes com Dor Lombar a se Tratarem Melhor em Casa',
      subtitle:
        'Sistema AI-HEALS usa inteligência artificial e aplicativo de mensagens para revolucionar tratamento domiciliar da dor lombar',
      excerpt:
        'Estudo chinês testa sistema que combina chatbot inteligente, monitoramento e lembretes via WeChat para melhorar autogerenciamento da dor lombar não-específica, problema que afeta milhões globalmente.',
      category: 'Aplicação Clínica',
      date: '2025-10-02',
      readTime: '10 min',
      author: 'Dr. Massuca',
      tags: ['Dor Lombar', 'IA Médica', 'AI-HEALS', 'Autogerenciamento', 'Telemedicina', 'WeChat'],
      featured: true,
      image: '/images/ia-medica/ai-dor-lombar-bg.webp',
      patients: '74 participantes',
      duration: '3 meses',
      likes: 92,
      shares: 31,
      content: `
        <h2>O Problema Silencioso que Afeta Milhões</h2>
        
        <p>A <strong>dor lombar não-específica (NSLBP)</strong> é uma das condições médicas mais prevalentes e incapacitantes do mundo moderno. Estima-se que cerca de <strong>7,6% da população global</strong> sofra com o problema, um número que vem crescendo rapidamente nas últimas duas décadas.</p>

        <p>No Brasil e no mundo, a dor lombar é a <strong>principal causa de afastamento do trabalho</strong> e uma das razões mais frequentes de consultas médicas em serviços de urgência e emergência. Segundo o estudo Global Burden of Disease (GBD) de 2019, a dor lombar ficou em <strong>6º lugar entre as causas de anos de vida ajustados por incapacidade (DALYs)</strong> no mundo, representando aproximadamente 63,7 milhões de DALYs - um aumento de 47% desde 1990.</p>

        <div class="highlight-box">
          <h3>📊 Dor Lombar em Números Globais</h3>
          <ul>
            <li><strong>7,6%</strong> da população mundial afetada</li>
            <li><strong>63,7 milhões</strong> de DALYs em 2019 (GBD Study)</li>
            <li><strong>47% de aumento</strong> desde 1990</li>
            <li><strong>Principal causa</strong> de afastamento do trabalho</li>
            <li><strong>50% do tempo</strong> de consulta gasto em burocracia vs. tratamento</li>
            <li><strong>Impacto econômico:</strong> bilhões em custos diretos e indiretos</li>
          </ul>
        </div>

        <h3>O Desafio do Tratamento Tradicional</h3>
        
        <p>Os tratamentos convencionais para dor lombar - medicamentos, fisioterapia, acupuntura - enfrentam limitações significativas:</p>
        
        <ul>
          <li><strong>Acesso limitado:</strong> Pacientes precisam se deslocar repetidamente para unidades de saúde</li>
          <li><strong>Custos elevados:</strong> Tanto para pacientes quanto para o sistema de saúde</li>
          <li><strong>Baixa adesão:</strong> Dificuldade em manter exercícios e mudanças de estilo de vida</li>
          <li><strong>Falta de suporte contínuo:</strong> Consultas espaçadas não fornecem apoio diário</li>
        </ul>

        <p>É nesse contexto que surge o <strong>AI-HEALS</strong> (Artificial Intelligence - Health Education Accurately Linking System), um sistema inovador que promete revolucionar o autogerenciamento da dor lombar.</p>

        <h3>O que é o AI-HEALS?</h3>
        
        <p>Desenvolvido por pesquisadores chineses, o AI-HEALS é um <strong>sistema integrado de inteligência artificial</strong> que funciona através do WeChat (equivalente ao WhatsApp na China) e combina quatro componentes principais para apoiar pacientes com dor lombar em seu tratamento domiciliar.</p>

        <div class="process-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div>
              <h4>🤖 Chatbot Inteligente (KBQA)</h4>
              <p>Sistema de perguntas e respostas baseado em IA com conhecimento médico especializado. Responde dúvidas sobre dor lombar por texto OU voz, tornando acessível até para idosos. Sugere 3 perguntas relacionadas após cada resposta.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div>
              <h4>📊 Registro de Hábitos</h4>
              <p>Paciente registra medicamentos, alimentação e exercícios semanalmente. Sistema envia lembretes automáticos todo sábado. Médicos acompanham evolução em tempo real pelo painel.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div>
              <h4>⏰ Lembretes Personalizados</h4>
              <p>Notificações configuráveis para medicação e exercícios. Ajuda a manter adesão ao tratamento e rotina de cuidados preventivos.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <div>
              <h4>📚 Conteúdo Educativo</h4>
              <p>1-3 artigos por semana sobre exercícios corretos, uso de medicamentos, postura. Conteúdo personalizado baseado no perfil e interesses do paciente.</p>
            </div>
          </div>
        </div>

        <h3>O Estudo em Andamento</h3>
        
        <p>Atualmente em execução na China (abril de 2025 a dezembro de 2026), o estudo está testando a eficácia do AI-HEALS em um ensaio clínico randomizado controlado (RCT) - o padrão ouro em pesquisa médica.</p>

        <div class="startup-metrics">
          <div class="metric">
            <span class="metric-number">74</span>
            <span class="metric-label">Participantes</span>
          </div>
          <div class="metric">
            <span class="metric-number">3 meses</span>
            <span class="metric-label">Duração Intervenção</span>
          </div>
          <div class="metric">
            <span class="metric-number">9 meses</span>
            <span class="metric-label">Acompanhamento</span>
          </div>
          <div class="metric">
            <span class="metric-number">2026</span>
            <span class="metric-label">Conclusão Prevista</span>
          </div>
        </div>

        <h4>🔬 Desenho do Estudo:</h4>
        <ul>
          <li><strong>Grupo Controle:</strong> Recebe tratamento padrão (medicamentos, fisioterapia)</li>
          <li><strong>Grupo Intervenção:</strong> Tratamento padrão + AI-HEALS por 3 meses</li>
          <li><strong>Acompanhamento:</strong> Avaliações em 3, 6 e 9 meses após intervenção</li>
        </ul>

        <h4>📈 Resultados Medidos:</h4>
        <ul>
          <li><strong>Primário:</strong> Intensidade da dor (escala visual analógica)</li>
          <li><strong>Secundários:</strong> Qualidade de vida, adesão a exercícios, ansiedade, depressão, sono, autoeficácia</li>
        </ul>

        <h3>Tecnologia por Trás do Sistema</h3>
        
        <p>O coração do AI-HEALS é o <strong>Doubao-pro-32k</strong>, um modelo de linguagem grande (LLM) desenvolvido pela ByteDance e otimizado para aplicações médicas em chinês. O modelo foi:</p>

        <ul>
          <li>Treinado em literatura biomédica e diretrizes clínicas</li>
          <li>Ajustado para entender terminologia médica de dor lombar</li>
          <li>Validado por especialistas antes do lançamento</li>
          <li>Capaz de manter contexto em conversas de até 32 mil tokens</li>
        </ul>

        <div class="quote-box">
          <blockquote>
            "Em testes comparativos na plataforma FlagEval, o Doubao-pro-32k pontuou 77,75 - superior ao GPT-4o (73,51) - com destaque especial na aplicação de conhecimento médico (91,14 vs 86,71)."
            <cite>— Resultado dos benchmarks técnicos</cite>
          </blockquote>
        </div>

        <h3>Por que Isso Importa?</h3>
        
        <p>O AI-HEALS representa uma <strong>mudança de paradigma</strong> no tratamento de condições crônicas como a dor lombar:</p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <strong>🏠 Tratamento Domiciliar</strong>
            <p>Paciente gerencia sua condição em casa, reduzindo necessidade de consultas presenciais e custos com deslocamento</p>
          </div>
          <div class="benefit-item">
            <strong>💰 Custo-Efetivo</strong>
            <p>Sistema escalável que pode atender milhares de pacientes simultaneamente com custo marginal baixo</p>
          </div>
          <div class="benefit-item">
            <strong>📱 Acessibilidade</strong>
            <p>Funciona em app que bilhões já usam (WeChat/WhatsApp), não requer treinamento especial</p>
          </div>
          <div class="benefit-item">
            <strong>🎯 Personalização</strong>
            <p>IA adapta conteúdo e recomendações ao perfil individual de cada paciente</p>
          </div>
        </div>

        <h3>Contexto Clínico Brasileiro</h3>
        
        <p>No Brasil, a dor lombar representa um desafio imenso para o sistema de saúde. A condição é:</p>

        <ul>
          <li>Uma das <strong>principais causas de atendimento</strong> em UPAs e prontos-socorros</li>
          <li>Responsável por milhares de <strong>afastamentos do INSS</strong> anualmente</li>
          <li>Causa significativa de <strong>redução de produtividade</strong> no trabalho</li>
          <li>Geradora de <strong>custos bilionários</strong> em medicamentos e tratamentos</li>
        </ul>

        <div class="quote-box">
          <blockquote>
            "A implementação de soluções digitais como o AI-HEALS no SUS poderia significar economia de recursos e melhor qualidade de vida para milhões de brasileiros que sofrem com dor lombar crônica."
            <cite>— Perspectiva para o contexto brasileiro</cite>
          </blockquote>
        </div>

        <h3>Desafios e Considerações Éticas</h3>
        
        <p>Como toda inovação em saúde digital, o AI-HEALS enfrenta desafios importantes:</p>

        <ul>
          <li><strong>Privacidade de Dados:</strong> Sistema coleta informações sensíveis - precisa conformidade total com LGPD/GDPR</li>
          <li><strong>Validação Clínica:</strong> Resultados do RCT determinarão se eficácia justifica adoção ampla</li>
          <li><strong>Barreira Digital:</strong> Nem todos têm acesso a smartphones ou habilidade para usar apps</li>
          <li><strong>Supervisão Médica:</strong> IA nunca deve substituir avaliação profissional quando necessária</li>
        </ul>

        <h3>O Futuro da Telemedicina para Dor Crônica</h3>
        
        <p>O AI-HEALS é parte de uma tendência maior de <strong>digitalização do cuidado crônico</strong>. Sistemas similares estão sendo desenvolvidos para:</p>

        <ul>
          <li>Diabetes e controle glicêmico</li>
          <li>Hipertensão arterial</li>
          <li>Saúde mental (ansiedade e depressão)</li>
          <li>Reabilitação pós-cirúrgica</li>
        </ul>

        <p>Se o estudo confirmar a eficácia do AI-HEALS, poderemos ver uma <strong>adoção massiva</strong> de sistemas similares nos próximos anos, especialmente em países com sistemas de saúde sobrecarregados.</p>

        <div class="call-to-action">
          <h4>🚀 Implicações para o Futuro</h4>
          <p>O AI-HEALS representa mais que uma solução tecnológica para dor lombar - é um <strong>modelo de como a IA pode democratizar o acesso a cuidados de qualidade</strong>, permitindo que pacientes em áreas remotas ou com recursos limitados recebam suporte contínuo e personalizado.</p>
          
          <p>Com a conclusão do estudo prevista para 2026, a comunidade médica global aguarda ansiosamente os resultados que podem validar uma nova era no tratamento de condições crônicas - uma era onde tecnologia e humanização caminham juntas para melhorar a vida de milhões.</p>
        </div>

        <div class="quote-box">
          <blockquote>
            "A integração da IA com saúde móvel está revolucionando o manejo de doenças crônicas. O AI-HEALS oferece uma plataforma organizada para cuidado domiciliar eficiente, aliviando a dor, melhorando qualidade de vida e reduzindo a dependência de recursos médicos convencionais."
            <cite>— Conclusão do protocolo de pesquisa</cite>
          </blockquote>
        </div>
      `,
      sources: [
        {
          title: 'PubMed - AI-HEALS for NSLBP Self-Management',
          url: 'https://pubmed.ncbi.nlm.nih.gov/41018793/',
          type: 'Artigo Científico',
        },
        {
          title: 'PMC Full Text - AI-HEALS Study Protocol',
          url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12460242/',
          type: 'Texto Completo',
        },
        {
          title: 'Global Burden of Disease Study 2019',
          url: 'https://www.thelancet.com/gbd',
          type: 'Epidemiologia',
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

        {/* Menu Flutuante de Acessibilidade */}
        <FloatingAccessibilityMenu content={article.content} />

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
