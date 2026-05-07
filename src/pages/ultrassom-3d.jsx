import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './memo3d-landing/memo3d-landing.css';
import './ultrassom-3d.css';

const WHATSAPP =
  'https://wa.me/5562996602117?text=' +
  encodeURIComponent(
    'Olá! Gostaria de agendar um ultrassom obstétrico com possibilidade de imagens 3D.'
  );

const TIMELINE = [
  {
    week: '8 semanas',
    img: '/imagens-3d/ultrassom-3d-1.webp',
    desc: 'Embrião com estruturas básicas formadas. Ainda silêncio em movimento.',
  },
  {
    week: '11 semanas',
    img: '/imagens-3d/ultrassom-3d-2.webp',
    desc: 'Membros mais definidos. Os primeiros gestos discretos.',
  },
  {
    week: '15 semanas',
    img: '/imagens-3d/ultrassom-3d-3.webp',
    desc: 'Os traços do rosto começam a se desenhar.',
  },
  {
    week: '24 semanas',
    img: '/imagens-3d/ultrassom-3d-4.webp',
    desc: 'Período áureo do 3D — rosto nítido, expressões claras.',
  },
  {
    week: '36 semanas',
    img: '/imagens-3d/ultrassom-3d-5.webp',
    desc: 'Quase pronto. Quase nascido.',
  },
];

const FAQS = [
  {
    q: 'Qual a melhor idade gestacional para o 3D?',
    a: 'Entre 26 e 32 semanas é o período ideal. Antes disso, o bebê ainda é muito pequeno; depois, pode estar com pouco espaço no útero, o que dificulta a visualização do rostinho.',
  },
  {
    q: 'Sempre é possível ter imagens 3D?',
    a: 'Nem sempre. A qualidade depende da posição do bebê, da quantidade de líquido amniótico e da janela acústica da gestante. Quando o exame permite, as imagens são capturadas e ficam disponíveis na sua galeria.',
  },
  {
    q: 'E depois do exame, como recebo as imagens?',
    a: 'Os vídeos e fotos do seu 3D ficam disponíveis numa galeria privada online — o Memo3D — por 12 meses, com possibilidade de impressão 3D do bebê em escultura física, sob encomenda.',
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

export default function Ultrassom3D() {
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

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
        title="Ultrassom 3D/4D em Itaberaí-GO | Dr. Massuca | Imagens 3D do Bebê"
        description="Ultrassom 3D/4D em Itaberaí-GO com Dr. Massuca. Veja seu bebê em detalhes únicos durante seus exames obstétricos, com equipamentos premium GE Voluson S10 e Samsung HERA Z20. Imagens disponíveis quando as condições técnicas permitem."
        canonical="/ultrassom-3d"
        keywords="ultrassom 3D Itaberaí, ultrassom 4D, imagens 3D bebê, Dr Massuca 3D, ultrassom obstétrico 3D, babyface 3D"
        image="https://drmassuca.com.br/imagens-3d/ultrassom-3d-4.webp"
        type="webpage"
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
            '@type': 'MedicalTest',
            name: 'Ultrassom 3D/4D',
            description:
              'Exame de ultrassom com tecnologia 3D/4D para visualização detalhada do feto',
            url: 'https://drmassuca.com.br/ultrassom-3d',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Dr. Massuca',
              telephone: '+55-62-99660-2117',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Itaberaí',
                addressRegion: 'GO',
                addressCountry: 'BR',
              },
            },
            medicalSpecialty: 'Ultrassom 3D/4D',
            availability: 'Dependendo das condições técnicas',
          })}
        </script>
      </Helmet>

      <div className="memo3d-landing u3d-landing">
        {/* HERO — split assimétrico */}
        <header className="memo3d-hero">
          <div className="memo3d-hero-left">
            <FadeUp>
              <div className="memo3d-eyebrow">Diferencial exclusivo</div>
            </FadeUp>
            <FadeUp delay={120}>
              <h1>
                Ultrassom 3D/4D:
                <br />
                veja seu bebê
                <br />
                <em>antes de nascer.</em>
              </h1>
            </FadeUp>
            <FadeUp delay={260}>
              <p className="memo3d-hero-lead">
                Tecnologia que permite visualizar o rostinho e os movimentos do seu bebê em detalhes
                únicos durante seus exames obstétricos.
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
                  Agendar pelo WhatsApp
                </a>
                <Link to="/memo3d" className="memo3d-btn memo3d-btn-secondary">
                  Conheça o Memo3D
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="memo3d-hero-right">
            <FadeUp delay={300} style={{ height: '100%' }}>
              <img src="/imagens-3d/ultrassom-3d-4.webp" alt="Ultrassom 3D · 24 semanas" />
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
              ['26–32', 'semanas · período áureo'],
              ['HERA Z20', 'aparelho premium Samsung'],
              ['Voluson S10', 'aparelho premium GE'],
              ['4D', 'tempo real'],
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
                <span className="memo3d-section-eyebrow">I · Evolução</span>
                <h2 className="memo3d-section-title">
                  Semana
                  <br />
                  <em>a semana.</em>
                </h2>
              </div>
              <p className="memo3d-section-lead">
                Imagens reais capturadas em consultório. Cada uma representa um instante que não se
                repete — e que pode caber numa moldura.
              </p>
            </div>
          </FadeUp>

          <div className="memo3d-gallery">
            {TIMELINE.map((item, i) => (
              <FadeUp key={item.week} delay={i * 100} as="div" style={{ display: 'contents' }}>
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
                A imagem 3D nunca é o protagonista do exame — é um <strong>presente</strong> que
                entregamos depois de cuidar do que <em>realmente importa</em>: a saúde do seu bebê.
              </p>
              <div className="memo3d-pullquote-rule bottom" />
              <div className="memo3d-pullquote-cite">Dr. Antonio Massucatti Neto</div>
            </div>
          </FadeUp>
        </section>

        {/* SPECS — Quando é possível + Tecnologia */}
        <section className="memo3d-section">
          <div className="memo3d-specs">
            <FadeUp>
              <span className="memo3d-section-eyebrow">II · Quando</span>
              <h3>
                Período <em>áureo</em>.
              </h3>
              <div className="memo3d-specs-num-block">
                <div className="memo3d-specs-num">26–32</div>
                <div className="memo3d-specs-num-label">
                  semanas
                  <br />
                  ideais para 3D
                </div>
              </div>
              <p className="memo3d-specs-prose">
                Entre 26 e 32 semanas o rosto do bebê fica mais nítido — já tem gordurinha que
                desenha as feições, mas ainda há espaço suficiente no útero para se mover. Antes
                disso ele é muito pequeno; depois, está apertado.
              </p>
              <p className="memo3d-specs-prose">
                Mesmo nesse período, a qualidade da imagem 3D depende da posição do bebê, do líquido
                amniótico e da janela acústica da gestante. É uma possibilidade — não uma promessa.
              </p>
            </FadeUp>

            <FadeUp delay={150}>
              <span className="memo3d-section-eyebrow">III · Tecnologia</span>
              <h3>
                Equipamentos <em>premium</em>.
              </h3>
              {[
                ['I', 'Imagens 3D nítidas do rostinho', 'GE Voluson S10 e Samsung HERA Z20'],
                ['II', 'Visualização em tempo real (4D)', 'movimentos capturados ao vivo'],
                ['III', 'Detalhes anatômicos precisos', 'avaliação clínica em primeiro lugar'],
                ['IV', 'Memórias que ficam', 'galeria privada por 12 meses no Memo3D'],
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

        {/* SEÇÃO MEMO3D — cross-link */}
        <section className="memo3d-section memo3d-section-soft u3d-memo-bridge">
          <FadeUp>
            <div className="u3d-memo-bridge-inner">
              <div className="u3d-memo-bridge-text">
                <span className="memo3d-section-eyebrow">IV · Depois do exame</span>
                <h2>
                  As imagens do
                  <br />
                  3D <em>continuam</em>
                  <br />
                  com você.
                </h2>
                <p>
                  Todas as fotos e vídeos do seu ultrassom 3D ficam disponíveis numa galeria privada
                  online — o <strong>Memo3D</strong> — por 12 meses. Você compartilha com a família
                  por links de 24 horas e, quando quiser, pode encomendar a impressão 3D do bebê em
                  escultura física.
                </p>
                <p className="u3d-memo-bridge-meta">
                  Acesso via senha temporária entregue presencialmente na recepção, em conformidade
                  com a LGPD.
                </p>
                <Link to="/memo3d" className="memo3d-btn memo3d-btn-primary">
                  Conheça o Memo3D →
                </Link>
              </div>
              <div className="u3d-memo-bridge-figure">
                <div className="u3d-memo-bridge-frame">
                  <img src="/imagens-3d/baby-4.webp" alt="Galeria privada Memo3D" loading="lazy" />
                </div>
                <div className="u3d-memo-bridge-frame u3d-memo-bridge-frame-secondary">
                  <img src="/imagens-3d/baby-2.webp" alt="Memória do exame 3D" loading="lazy" />
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* FAQ */}
        <section className="memo3d-section memo3d-section-soft">
          <div className="memo3d-faq-wrap">
            <FadeUp>
              <div className="memo3d-faq-header">
                <span className="memo3d-section-eyebrow">V · Conversas</span>
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
              Agende seu ultrassom obstétrico pelo WhatsApp e, quando as condições permitirem, veja
              lindas imagens 3D do seu bebê.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="memo3d-forest-btn"
            >
              WhatsApp · 62 99660‑2117
            </a>
            <Link to="/memo3d" className="memo3d-forest-btn">
              Conhecer o Memo3D
            </Link>
            <div className="memo3d-forest-cta-meta">Itaberaí · Goiás · Seg–Sex · 8h–18h</div>
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
