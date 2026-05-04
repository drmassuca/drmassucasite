import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import './memo3d-landing.css';

const WHATSAPP =
  'https://wa.me/5562996602117?text=' +
  encodeURIComponent('Olá! Quero saber mais sobre o Memo3D — galeria das memórias e impressão 3D.');

const TIMELINE = [
  { week: '8 semanas', img: '/imagens-3d/baby-1.webp', desc: 'Estruturas básicas se formam — o silêncio inicial.' },
  { week: '11 semanas', img: '/imagens-3d/baby-2.webp', desc: 'Membros mais definidos. Os primeiros movimentos.' },
  { week: '15 semanas', img: '/imagens-3d/baby-3.webp', desc: 'Os traços faciais começam a se desenhar.' },
  { week: '24 semanas', img: '/imagens-3d/baby-4.webp', desc: 'Período áureo do 3D. Rosto nítido, expressões claras.' },
  { week: '36 semanas', img: '/imagens-3d/baby-5.webp', desc: 'Quase pronto. Quase nascido. Quase nos braços.' },
];

const FAQS = [
  {
    q: 'Como recebo o acesso à minha galeria?',
    a: 'A recepção da clínica gera presencialmente uma senha temporária junto com o email do seu cadastro. Você troca essa senha no primeiro acesso.',
  },
  {
    q: 'Por quanto tempo as memórias ficam disponíveis?',
    a: 'Doze meses a partir da data do exame. Após esse período, os arquivos são apagados em definitivo, conforme nossa política de privacidade.',
  },
  {
    q: 'Posso compartilhar com a família?',
    a: 'Sim. Dentro da galeria você gera um link de compartilhamento com validade de 24 horas, sem necessidade de quem recebe criar conta.',
  },
  {
    q: 'Como funciona a impressão 3D?',
    a: 'A partir das fotos 3D do exame, fazemos a escultura física em resina. O contato inicial é por WhatsApp, para combinarmos tamanho, prazo e valor — tudo personalizado.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Trabalhamos em conformidade com a LGPD. As memórias só são liberadas após você aceitar o termo de uso, e cada visualização é registrada em auditoria interna.',
  },
];

/* ─── Fade-up reveal hook ─────────────────────────────── */
function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return [ref, visible];
}

function FadeUp({ delay, style, children, as: Tag = 'div' }) {
  const [ref, visible] = useFadeUp(delay);
  return (
    <Tag ref={ref} className={`m3d-fade${visible ? ' is-visible' : ''}`} style={style}>
      {children}
    </Tag>
  );
}

export default function Memo3dLanding() {
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  // Esc fecha lightbox
  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <>
      <SEO
        title="Memo3D — Memórias 3D da gestação | Dr. Massucatti"
        description="Galeria boutique online com vídeos e fotos do seu ultrassom 3D/4D + impressão 3D do bebê. Acesso por 12 meses. Equipamentos premium GE Voluson S10 e Samsung HERA Z20."
        canonical="/memo3d"
        keywords="memo3d, memórias 3d gestação, galeria ultrassom, impressão 3d bebê, dr massuca itaberai, hera z20, voluson s10"
        image="https://drmassuca.com.br/imagens-3d/baby-4.webp"
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
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
        {/* HERO — split assimétrico */}
        <header className="memo3d-hero">
          <div className="memo3d-hero-left">
            <FadeUp>
              <div className="memo3d-eyebrow">Diferencial boutique</div>
            </FadeUp>
            <FadeUp delay={120}>
              <h1>
                As memórias<br />
                da sua gestação,<br />
                <em>eternizadas.</em>
              </h1>
            </FadeUp>
            <FadeUp delay={260}>
              <p className="memo3d-hero-lead">
                Galeria privada com vídeos e fotos do seu ultrassom 3D/4D, acesso por 12 meses.
                Compartilhe com a família — e, quando quiser, transforme em escultura física por
                impressão 3D.
              </p>
            </FadeUp>
            <FadeUp delay={400}>
              <div className="memo3d-hero-cta">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="memo3d-btn memo3d-btn-primary"
                >
                  Falar no WhatsApp
                </a>
                <Link to="/memo3d/login" className="memo3d-btn memo3d-btn-secondary">
                  Já sou paciente
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="memo3d-hero-right">
            <FadeUp delay={300} style={{ height: '100%' }}>
              <img src="/imagens-3d/baby-4.webp" alt="Ultrassom 3D · 24 semanas" />
            </FadeUp>
            <div className="memo3d-hero-image-meta">
              <span className="memo3d-hero-image-tag">24 semanas · período áureo</span>
            </div>
          </div>
        </header>

        {/* STATS NUMÉRICO */}
        <section className="memo3d-stats">
          <div className="memo3d-stats-grid">
            {[
              ['12 meses', 'duração da galeria'],
              ['HERA Z20', 'aparelho premium Samsung'],
              ['LGPD', 'auditoria conforme'],
              ['24h', 'compartilhamento família'],
            ].map(([k, v], i) => (
              <FadeUp key={i} delay={i * 70}>
                <div>
                  <div className="memo3d-stat-num">{k}</div>
                  <div className="memo3d-stat-label">{v}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* GALERIA editorial — semana a semana */}
        <section className="memo3d-section">
          <FadeUp>
            <div className="memo3d-section-header">
              <div>
                <span className="memo3d-section-eyebrow">I · A galeria</span>
                <h2 className="memo3d-section-title">
                  Semana<br />
                  <em>a semana.</em>
                </h2>
              </div>
              <p className="memo3d-section-lead">
                Imagens reais capturadas em consultório. Cada uma representa um instante
                que não se repete — mas que pode caber numa moldura.
              </p>
            </div>
          </FadeUp>

          <div className="memo3d-gallery">
            {TIMELINE.map((item, i) => (
              <FadeUp
                key={item.week}
                delay={i * 100}
                as="div"
                style={{ display: 'contents' }}
              >
                <figure
                  className={`memo3d-figure memo3d-gallery-item${i >= 2 ? ' tall' : ''}`}
                  onClick={() => setLightbox(i)}
                >
                  <div className="memo3d-figure-frame">
                    <img src={item.img} alt={`Ultrassom 3D · ${item.week}`} loading="lazy" />
                    <span className="memo3d-figure-week">{item.week}</span>
                    <figcaption className="memo3d-figure-caption">{item.desc}</figcaption>
                  </div>
                </figure>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="memo3d-pullquote">
          <FadeUp>
            <div className="memo3d-pullquote-inner">
              <div className="memo3d-pullquote-rule" />
              <p className="memo3d-pullquote-text">
                A galeria nunca é o protagonista do exame — é um <strong>presente</strong>{' '}
                que entregamos depois de cuidar do que <em>realmente importa</em>:
                a saúde do seu bebê.
              </p>
              <div className="memo3d-pullquote-rule bottom" />
              <div className="memo3d-pullquote-cite">Dr. Antonio Massucatti Neto</div>
            </div>
          </FadeUp>
        </section>

        {/* SPECS — Quando + O que vai junto */}
        <section className="memo3d-section">
          <div className="memo3d-specs">
            <FadeUp>
              <span className="memo3d-section-eyebrow">II · Quando</span>
              <h3>
                Doze meses para <em>guardar</em>.
              </h3>
              <div className="memo3d-specs-num-block">
                <div className="memo3d-specs-num">12</div>
                <div className="memo3d-specs-num-label">
                  meses<br />de acesso
                </div>
              </div>
              <p className="memo3d-specs-prose">
                Sua galeria fica disponível por doze meses contados da data do exame. É tempo
                suficiente para revisitar, baixar, compartilhar com a família — e, quando quiser,
                pedir a impressão 3D. Após esse período, os arquivos são apagados em definitivo.
              </p>
            </FadeUp>

            <FadeUp delay={150}>
              <span className="memo3d-section-eyebrow">III · O que vai junto</span>
              <h3>
                Pequenos <em>presentes</em>.
              </h3>
              {[
                ['I', 'Vídeos do ultrassom 3D/4D', 'em alta qualidade adaptativa'],
                ['II', 'Fotos do bebê', 'em resolução plena, com download'],
                ['III', 'Compartilhamento com a família', 'link de 24 horas, sem cadastro'],
                ['IV', 'Impressão 3D sob encomenda', 'a partir da imagem que você escolher'],
              ].map(([n, k, v]) => (
                <div key={n} className="memo3d-specs-list-item">
                  <div className="memo3d-specs-list-numeral">{n}.</div>
                  <div>
                    <div className="memo3d-specs-list-name">{k}</div>
                    <div className="memo3d-specs-list-detail">{v}</div>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="memo3d-section memo3d-section-soft">
          <div className="memo3d-faq-wrap">
            <FadeUp>
              <div className="memo3d-faq-header">
                <span className="memo3d-section-eyebrow">IV · Conversas</span>
                <h2>
                  O que costumam <em>perguntar</em>.
                </h2>
              </div>
            </FadeUp>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeUp key={i} delay={i * 80}>
                  <div className={`memo3d-faq-item${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="memo3d-faq-button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    >
                      <span className="memo3d-faq-q">{f.q}</span>
                      <span className="memo3d-faq-icon">+</span>
                    </button>
                    <div className="memo3d-faq-answer">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </section>

        {/* FOREST CTA */}
        <section className="memo3d-forest-cta">
          <FadeUp>
            <div className="memo3d-forest-cta-eyebrow">Convite</div>
            <h2>
              Pronta para o<br />
              <em>primeiro retrato</em>?
            </h2>
            <p className="memo3d-forest-cta-lead">
              Agende seu ultrassom 3D/4D pelo WhatsApp — quando o exame chegar, a galeria já está
              te esperando.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="memo3d-forest-btn"
            >
              WhatsApp · 62 99660‑2117
            </a>
            <Link to="/memo3d/login" className="memo3d-forest-btn">
              Já sou paciente · entrar
            </Link>
            <div className="memo3d-forest-cta-meta">
              Itaberaí · Goiás · Seg–Sex · 8h–18h
            </div>
          </FadeUp>
        </section>

        {/* LIGHTBOX */}
        {lightbox !== null && (
          <div className="memo3d-lightbox" onClick={() => setLightbox(null)}>
            <div className="memo3d-lightbox-content" onClick={e => e.stopPropagation()}>
              <div className="memo3d-lightbox-frame">
                <img src={TIMELINE[lightbox].img} alt={TIMELINE[lightbox].week} />
              </div>
              <div className="memo3d-lightbox-info">
                <div className="memo3d-lightbox-week">{TIMELINE[lightbox].week}</div>
                <div className="memo3d-lightbox-caption">{TIMELINE[lightbox].desc}</div>
              </div>
              <button
                type="button"
                className="memo3d-lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
