import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Heart,
  Camera,
  Share2,
  ShieldCheck,
  Hourglass,
  Sparkles,
  Activity,
  ArrowRight,
  MessageCircle,
  PlayCircle,
  Check,
} from 'lucide-react';
import SEO from '../../components/SEO';
import './memo3d-landing.css';

const WHATSAPP =
  'https://wa.me/5562996602117?text=' +
  encodeURIComponent('Olá! Quero saber mais sobre o Memo3D — galeria das memórias e impressão 3D.');

const TIMELINE = [
  {
    week: '8',
    img: '/imagens-3d/ultrassom-3d-1.webp',
    caption: 'Embrião com estruturas básicas formadas.',
  },
  { week: '11', img: '/imagens-3d/ultrassom-3d-2.webp', caption: 'Membros mais definidos.' },
  {
    week: '15',
    img: '/imagens-3d/ultrassom-3d-3.webp',
    caption: 'Traços faciais começam a aparecer.',
  },
  {
    week: '24',
    img: '/imagens-3d/ultrassom-3d-4.webp',
    caption: 'Fase ideal para 3D — rosto nítido.',
  },
  { week: '36', img: '/imagens-3d/ultrassom-3d-5.webp', caption: 'Bebê quase pronto pra nascer.' },
];

const ANTES_DEPOIS = [
  { antes: '/imagens-3d/antesedepois1.png', depois: '/imagens-3d/antesedepois1.2.png' },
  { antes: '/imagens-3d/antesedepois2.png', depois: '/imagens-3d/antesedepois2.2.png' },
  { antes: '/imagens-3d/antesedepois3.png', depois: '/imagens-3d/antesedepois3.2.png' },
  { antes: '/imagens-3d/antesedepois4.png', depois: '/imagens-3d/antesedepois4.2.png' },
];

export default function Memo3dLanding() {
  return (
    <>
      <SEO
        title="Memo3D — Memórias 3D da gestação | Dr. Massucatti"
        description="Galeria boutique online com vídeos e fotos do seu ultrassom 3D/4D + impressão 3D do bebê. Acesso por 12 meses. Equipamentos premium GE Voluson S10 e Samsung HERA Z20."
        canonical="/memo3d"
        keywords="memo3d, memórias 3d gestação, galeria ultrassom, impressão 3d bebê, dr massuca itaberai, hera z20, voluson s10"
        image="https://drmassuca.com.br/imagens-3d/ultrassom-3d-4.webp"
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Hospedagem boutique de memórias da gestação + impressão 3D',
            name: 'Memo3D',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Dr. Antonio Massucatti Neto',
              telephone: '+55-62-99660-2117',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Itaberaí',
                addressRegion: 'GO',
                addressCountry: 'BR',
              },
            },
            description:
              'Galeria privada com vídeos e fotos do ultrassom 3D/4D, acesso por 12 meses, e opção de impressão 3D do bebê.',
            areaServed: { '@type': 'City', name: 'Itaberaí, GO' },
          })}
        </script>
      </Helmet>

      <div className="memo3d-landing">
        {/* HERO — split layout */}
        <section className="memo3d-hero">
          <div className="memo3d-hero-grid">
            <div className="memo3d-hero-text">
              <div className="memo3d-hero-badge">
                <Heart size={14} /> Memo3D · Dr. Massucatti
              </div>
              <h1>
                As memórias <em>boutique</em> da sua gestação,
                <br />
                <span className="memo3d-hero-accent">eternizadas.</span>
              </h1>
              <p className="memo3d-hero-sub">
                Galeria privada com vídeos e fotos do seu ultrassom 3D/4D, acesso por 12 meses.
                Compartilhe com a família e, quando quiser, transforme em escultura física por
                impressão 3D.
              </p>
              <div className="memo3d-hero-cta">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="memo3d-btn memo3d-btn-primary"
                >
                  <MessageCircle size={16} /> Falar no WhatsApp
                </a>
                <Link to="/memo3d/login" className="memo3d-btn memo3d-btn-ghost">
                  Já sou paciente · entrar <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="memo3d-hero-visual">
              <div className="memo3d-hero-image-frame">
                <img src="/imagens-3d/ultrassom-3d-4.webp" alt="Ultrassom 3D · 24 semanas" />
                <span className="memo3d-hero-image-tag">24 semanas · Samsung HERA Z20</span>
              </div>
              <div className="memo3d-hero-image-deco" aria-hidden />
            </div>
          </div>
        </section>

        {/* TIMELINE — evolução do bebê */}
        <section className="memo3d-section memo3d-section-light">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Linha do tempo</span>
              <h2>Veja seu bebê crescer, semana a semana</h2>
              <p>
                Imagens reais de exames feitos no consultório. A fase ideal para 3D é entre 26 e 32
                semanas, quando o rostinho aparece com mais nitidez.
              </p>
            </header>
            <div className="memo3d-timeline">
              {TIMELINE.map(item => (
                <figure key={item.week} className="memo3d-timeline-card">
                  <div className="memo3d-timeline-frame">
                    <img
                      src={item.img}
                      alt={`Ultrassom 3D · ${item.week} semanas`}
                      loading="lazy"
                    />
                    <span className="memo3d-timeline-badge">{item.week} sem</span>
                  </div>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="memo3d-section">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Como funciona</span>
              <h2>Em três passos, simples e seguros</h2>
            </header>
            <ol className="memo3d-steps">
              <li>
                <span className="memo3d-step-num">1</span>
                <h3>Faça seu ultrassom 3D/4D</h3>
                <p>
                  Os vídeos e fotos do exame são salvos com qualidade premium logo após a consulta
                  com Dr. Massucatti em Itaberaí.
                </p>
              </li>
              <li>
                <span className="memo3d-step-num">2</span>
                <h3>Receba acesso na recepção</h3>
                <p>
                  Você sai da clínica com a senha temporária da sua galeria. Sem app, sem cadastro
                  online complicado.
                </p>
              </li>
              <li>
                <span className="memo3d-step-num">3</span>
                <h3>Visualize, compartilhe, personalize</h3>
                <p>
                  Acesse de qualquer dispositivo, compartilhe com a família via link de 24h, e
                  solicite a impressão 3D quando quiser.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* O QUE ESTÁ INCLUÍDO */}
        <section className="memo3d-section memo3d-section-light">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Sua memória, completa</span>
              <h2>Tudo o que está incluído</h2>
              <p>Hospedagem boutique por 12 meses contados da data do exame.</p>
            </header>
            <div className="memo3d-features-grid">
              <FeatureCard
                icon={Camera}
                title="Vídeos do exame"
                body="Vídeos do ultrassom 3D/4D em alta qualidade adaptativa via Cloudflare Stream."
              />
              <FeatureCard
                icon={Sparkles}
                title="Fotos em alta"
                body="Imagens 3D do feto que você pode baixar quantas vezes quiser."
              />
              <FeatureCard
                icon={Hourglass}
                title="Acesso por 12 meses"
                body="Suas memórias online o ano inteiro após o exame."
              />
              <FeatureCard
                icon={Share2}
                title="Compartilhar com família"
                body="Link com expiração de 24h pra avós, irmãos, padrinhos. Sem download."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Acesso seguro"
                body="Senha pessoal e termo conforme LGPD. Só você (e quem você compartilhar) acessa."
              />
              <FeatureCard
                icon={PlayCircle}
                title="Pronto pra impressão 3D"
                body="A partir das fotos da galeria, peça a escultura 3D do bebê com 1 clique."
              />
            </div>
          </div>
        </section>

        {/* EQUIPAMENTOS PREMIUM */}
        <section className="memo3d-section memo3d-section-dark">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Equipamentos premium</span>
              <h2>Tecnologia de referência mundial</h2>
              <p>
                Para garantir a qualidade das imagens que viram suas memórias, a clínica conta com
                dois aparelhos de ponta.
              </p>
            </header>
            <div className="memo3d-equipment-grid">
              <article className="memo3d-equipment-card">
                <Activity className="memo3d-equipment-icon" />
                <h3>GE Voluson S10</h3>
                <p>
                  Ultrassom 3D/4D consagrado em centros de referência mundo afora. Imagens nítidas,
                  vídeos em rede e qualidade clínica reconhecida.
                </p>
              </article>
              <article className="memo3d-equipment-card memo3d-equipment-featured">
                <Activity className="memo3d-equipment-icon" />
                <span className="memo3d-equipment-tag">Lançamento</span>
                <h3>Samsung HERA Z20</h3>
                <p>
                  O aparelho mais avançado do mundo para ultrassonografia obstétrica. Renderização
                  realista do feto, qualidade de imagem incomparável e tecnologia proprietária
                  Samsung. Diferencial exclusivo no centro-oeste.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* IMPRESSÃO 3D — antes e depois */}
        <section className="memo3d-section">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Impressão 3D</span>
              <h2>Tenha o rostinho do seu bebê em mãos</h2>
              <p>
                Mais que uma foto: a escultura 3D em resina, gerada a partir das imagens
                tridimensionais do seu próprio exame.
              </p>
            </header>

            <div className="memo3d-antes-depois">
              {ANTES_DEPOIS.map((pair, i) => (
                <div key={i} className="memo3d-antes-depois-pair">
                  <figure>
                    <img src={pair.antes} alt={`Imagem 3D do exame ${i + 1}`} loading="lazy" />
                    <figcaption>Imagem 3D do exame</figcaption>
                  </figure>
                  <ArrowRight className="memo3d-antes-depois-arrow" />
                  <figure>
                    <img src={pair.depois} alt={`Escultura 3D ${i + 1}`} loading="lazy" />
                    <figcaption>Escultura impressa 3D</figcaption>
                  </figure>
                </div>
              ))}
            </div>

            <div className="memo3d-print3d">
              <h3>Como solicitar</h3>
              <ol>
                <li>Você visualiza as fotos 3D do bebê na sua galeria.</li>
                <li>Seleciona a imagem que mais te encantou.</li>
                <li>Clica em &ldquo;Quero impressão 3D dessa imagem&rdquo;.</li>
                <li>
                  O WhatsApp da clínica abre com a foto pronta. A gente combina detalhes, tamanho e
                  prazo.
                </li>
              </ol>
              <p className="memo3d-muted">
                Pagamento e prazo de entrega são tratados diretamente com a equipe.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="memo3d-section memo3d-section-light">
          <div className="memo3d-container memo3d-container-narrow">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Dúvidas frequentes</span>
              <h2>Perguntas que aparecem com frequência</h2>
            </header>
            <dl className="memo3d-faq">
              <FaqItem
                q="Como recebo o acesso à minha galeria?"
                a="A recepção da clínica gera uma senha temporária presencialmente, junto com o email do seu cadastro. Você troca essa senha no primeiro acesso."
              />
              <FaqItem
                q="Por quanto tempo as memórias ficam disponíveis?"
                a="12 meses a partir da data do seu exame. Após esse período, os arquivos são apagados em definitivo conforme nossa política de privacidade."
              />
              <FaqItem
                q="Posso compartilhar com minha família?"
                a="Sim. Dentro da galeria você gera um link de compartilhamento com validade de 24 horas, sem necessidade de criar conta para quem recebe."
              />
              <FaqItem
                q="Quanto custa a hospedagem das memórias?"
                a="É um serviço opcional, com valor único cobrado na recepção no dia do exame. A recepção informa o valor atualizado."
              />
              <FaqItem
                q="Como funciona a impressão 3D?"
                a="A partir das fotos 3D do exame, fazemos a escultura física em resina. O contato inicial é por WhatsApp para combinarmos tamanho, prazo e valor — tudo personalizado."
              />
              <FaqItem
                q="E se eu perder minha senha?"
                a="A recepção gera uma nova senha temporária pra você. Basta solicitar pelo WhatsApp da clínica."
              />
              <FaqItem
                q="Meus dados ficam seguros?"
                a="Sim. Trabalhamos em conformidade com a LGPD. Suas memórias só são liberadas após você aceitar o termo de uso, e cada visualização é registrada com auditoria interna."
              />
            </dl>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="memo3d-cta">
          <div className="memo3d-container memo3d-cta-inner">
            <Heart className="memo3d-cta-icon" />
            <h2>Pronto pra começar?</h2>
            <p>Agende seu ultrassom 3D/4D pelo WhatsApp e deixe o resto com a gente.</p>
            <div className="memo3d-hero-cta">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="memo3d-btn memo3d-btn-primary"
              >
                <MessageCircle size={16} /> Conversar no WhatsApp
              </a>
              <Link to="/ultrassom-3d" className="memo3d-btn memo3d-btn-ghost-dark">
                Sobre o exame 3D/4D <ArrowRight size={14} />
              </Link>
            </div>
            <ul className="memo3d-cta-perks">
              <li>
                <Check size={14} /> Equipamentos premium
              </li>
              <li>
                <Check size={14} /> Atendimento boutique
              </li>
              <li>
                <Check size={14} /> Conformidade LGPD
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

function FeatureCard({ icon: Icon, title, body }) {
  return (
    <article className="memo3d-feature">
      <Icon className="memo3d-feature-icon" />
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function FaqItem({ q, a }) {
  return (
    <>
      <dt>{q}</dt>
      <dd>{a}</dd>
    </>
  );
}
