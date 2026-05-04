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
} from 'lucide-react';
import SEO from '../../components/SEO';
import './memo3d-landing.css';

const WHATSAPP =
  'https://wa.me/5562996602117?text=' +
  encodeURIComponent('Olá! Quero saber mais sobre o Memo3D — galeria das memórias e impressão 3D.');

export default function Memo3dLanding() {
  return (
    <>
      <SEO
        title="Memo3D — Memórias 3D da gestação | Dr. Massucatti"
        description="Galeria boutique online com vídeos e fotos do seu ultrassom 3D/4D + impressão 3D do bebê. Acesso por 12 meses. Equipamentos premium GE Voluson S10 e Samsung HERA Z20."
        canonical="/memo3d"
        keywords="memo3d, memórias 3d gestação, galeria ultrassom, impressão 3d bebê, dr massuca itaberai, hera z20, voluson s10"
      />
      <Helmet>
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
        {/* HERO */}
        <section className="memo3d-hero">
          <div className="memo3d-hero-inner">
            <div className="memo3d-hero-badge">
              <Heart size={14} /> Memo3D · Dr. Massucatti
            </div>
            <h1>
              As memórias <em>boutique</em> da sua gestação, eternizadas.
            </h1>
            <p className="memo3d-hero-sub">
              Galeria online privada com os vídeos e fotos do seu ultrassom 3D/4D, com acesso por 12
              meses. E, quando quiser, transforme a imagem do seu bebê em uma escultura física de
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
              <Link to="/memo3d/login" className="memo3d-btn memo3d-btn-secondary">
                Já sou paciente · entrar
              </Link>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="memo3d-section memo3d-section-light">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <h2>Como funciona</h2>
              <p>Em três passos, pensados pra ser simples e seguros.</p>
            </header>
            <ol className="memo3d-steps">
              <li>
                <span className="memo3d-step-num">1</span>
                <h3>Realize seu ultrassom 3D/4D na clínica</h3>
                <p>
                  Os vídeos e fotos do exame são salvos com qualidade premium logo após a consulta,
                  com Dr. Massucatti em Itaberaí.
                </p>
              </li>
              <li>
                <span className="memo3d-step-num">2</span>
                <h3>Receba o acesso pessoalmente na recepção</h3>
                <p>
                  Você sai da clínica com a senha temporária da sua galeria. Sem app pra baixar, sem
                  cadastro online complicado.
                </p>
              </li>
              <li>
                <span className="memo3d-step-num">3</span>
                <h3>Visualize, compartilhe e personalize</h3>
                <p>
                  Acesse de qualquer dispositivo, compartilhe com a família por link de 24h, e
                  solicite a impressão 3D quando quiser.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE */}
        <section className="memo3d-section">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <h2>O que está incluído na sua memória</h2>
              <p>Hospedagem boutique por 12 meses contados da data do exame.</p>
            </header>
            <div className="memo3d-features-grid">
              <FeatureCard
                icon={Camera}
                title="Vídeos do exame"
                body="Vídeos do ultrassom 3D/4D, exibidos em alta qualidade adaptativa pelo Cloudflare Stream."
              />
              <FeatureCard
                icon={Sparkles}
                title="Fotos em alta"
                body="Imagens 3D do feto que você pode baixar quantas vezes quiser."
              />
              <FeatureCard
                icon={Hourglass}
                title="Acesso por 12 meses"
                body="Suas memórias ficam online o ano inteiro após o exame."
              />
              <FeatureCard
                icon={Share2}
                title="Compartilhar com família"
                body="Gere um link com expiração de 24h pra mostrar pra avós, irmãos, padrinhos. Sem download."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Acesso seguro"
                body="Senha pessoal e termo de privacidade conforme LGPD. Só você (e quem você compartilhar) acessa."
              />
              <FeatureCard
                icon={PlayCircle}
                title="Pronto pra impressão 3D"
                body="A partir das fotos da galeria, você pode pedir a escultura 3D do bebê com 1 clique."
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

        {/* IMPRESSÃO 3D */}
        <section className="memo3d-section">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <span className="memo3d-eyebrow">Impressão 3D</span>
              <h2>Tenha o rostinho do seu bebê em mãos</h2>
              <p>
                Mais que uma foto: a escultura 3D em resina, gerada a partir das imagens
                tridimensionais do seu próprio exame. Lembrança única, feita sob encomenda.
              </p>
            </header>
            <div className="memo3d-print3d">
              <div className="memo3d-print3d-text">
                <h3>Como funciona</h3>
                <ol>
                  <li>Você visualiza as fotos 3D do bebê na sua galeria.</li>
                  <li>Seleciona a imagem que mais te encantou.</li>
                  <li>Clica em &ldquo;Quero impressão 3D dessa imagem&rdquo;.</li>
                  <li>
                    O WhatsApp da clínica abre com a foto pronta. A gente combina detalhes, tamanho
                    e prazo.
                  </li>
                </ol>
                <p className="memo3d-muted">
                  Pagamento e prazo de entrega são tratados diretamente com a equipe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="memo3d-section memo3d-section-light">
          <div className="memo3d-container">
            <header className="memo3d-section-header">
              <h2>Perguntas frequentes</h2>
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
        <section className="memo3d-section memo3d-cta">
          <div className="memo3d-container memo3d-cta-inner">
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
              <Link to="/ultrassom-3d" className="memo3d-btn memo3d-btn-secondary">
                Sobre o exame 3D/4D <ArrowRight size={14} />
              </Link>
            </div>
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
