import { useEffect, useRef, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import './memo3d-landing.css';
import './mostruario.css';

const WHATSAPP =
  'https://wa.me/5562996602117?text=' +
  encodeURIComponent('Olá! Quero saber mais sobre o Memo3D — galeria das memórias do meu bebê.');

/**
 * Mostruário Memo3D — apresentação guiada, página por página.
 *
 * Pensado pra recepção (Cristiana) abrir no PC ou celular e ir passando os
 * slides ao lado da paciente, explicando o que é, como funciona e quanto
 * custa. Também funciona como link pra mandar pra paciente ver sozinha.
 *
 * Navegação: setas na tela, teclado (← →), swipe no celular, e os pontos.
 */
const SLIDES = [
  {
    key: 'capa',
    eyebrow: 'Memo3D · Dr. Massuca',
    title: (
      <>
        As memórias do seu bebê,
        <br />
        <em>guardadas com carinho.</em>
      </>
    ),
    lead: 'Uma galeria privada com os vídeos e as fotos do seu ultrassom 3D/4D — pra rever, compartilhar com a família e eternizar.',
    image: '/imagens-3d/baby-4.webp',
    imageTag: '24 semanas · período áureo do 3D',
  },
  {
    key: 'o-que-e',
    eyebrow: 'I · O que é',
    title: (
      <>
        Sua galeria <em>particular</em> online.
      </>
    ),
    lead: 'Depois do exame, suas imagens ficam num espaço só seu, acessível pelo celular ou computador, a qualquer hora.',
    bullets: [
      ['Vídeos do ultrassom 3D/4D', 'em alta qualidade, pra assistir quando quiser'],
      ['Fotos do bebê', 'em resolução plena, com opção de baixar'],
      ['Acesso por 12 meses', 'contados a partir da data do exame'],
      ['100% privado e seguro', 'em conformidade com a LGPD'],
    ],
  },
  {
    key: 'como-funciona',
    eyebrow: 'II · Como funciona',
    title: (
      <>
        Simples, do exame
        <br />
        <em>ao seu celular.</em>
      </>
    ),
    steps: [
      ['1', 'A recepção te entrega o acesso', 'Um login e uma senha temporária, na hora, aqui mesmo na clínica.'],
      ['2', 'Você entra e troca a senha', 'No primeiro acesso, você cria a sua senha pessoal.'],
      ['3', 'Vê seus vídeos e fotos', 'Tudo organizado por exame, pronto pra rever quando quiser.'],
      ['4', 'Compartilha com a família', 'Gera um link de 24 horas — sem a família precisar criar conta.'],
    ],
  },
  {
    key: 'quanto-custa',
    eyebrow: 'III · Quanto custa',
    title: (
      <>
        Um valor <em>justo</em> por exame.
      </>
    ),
    price: 'R$ 30',
    priceUnit: 'por exame liberado',
    lead: 'Cada exame que você quiser guardar na galeria custa R$ 30 — e já vem completo:',
    bullets: [
      ['12 meses de acesso', 'à galeria daquele exame'],
      ['100 créditos de IA', 'pra melhorar suas fotos, a cada exame'],
      ['Compartilhamento com a família', 'link de 24 horas, incluso'],
      ['Sem mensalidade', 'você paga só pelos exames que quiser'],
    ],
  },
  {
    key: 'impressao',
    eyebrow: 'IV · Um presente a mais',
    title: (
      <>
        O rostinho dele,
        <br />
        <em>em suas mãos.</em>
      </>
    ),
    lead: 'A partir das fotos 3D, esculpimos o bebê em resina — uma lembrança física pra guardar pra sempre. Sob encomenda, orçamento personalizado pelo WhatsApp.',
    image: '/imagens-3d/baby-4.webp',
    imageTag: 'Impressão 3D sob encomenda',
  },
  {
    key: 'cta',
    eyebrow: 'Vamos começar?',
    title: (
      <>
        Pronta pra guardar
        <br />
        <em>essas memórias?</em>
      </>
    ),
    lead: 'Fale com a nossa recepção ou no WhatsApp — a gente cuida do resto.',
    isCta: true,
  },
];

export default function Mostruario() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const touchStartX = useRef(null);

  const go = useCallback(
    delta => {
      setIndex(prev => Math.min(total - 1, Math.max(0, prev + delta)));
    },
    [total]
  );

  // Teclado: setas e espaço
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  const slide = SLIDES[index];

  return (
    <>
      <SEO
        title="Memo3D — Como funciona | Dr. Massucatti"
        description="Conheça o Memo3D: galeria privada com vídeos e fotos do seu ultrassom 3D/4D, acesso por 12 meses, e impressão 3D do bebê."
        canonical="/memo3d/mostruario"
        noindex
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </Helmet>

      <div
        className="m3d-show"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Barra de progresso */}
        <div className="m3d-show-progress">
          <div
            className="m3d-show-progress-bar"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        <div className={`m3d-show-stage m3d-show-${slide.key}`} key={slide.key}>
          {/* Slide com imagem (capa / impressão) */}
          {slide.image ? (
            <div className="m3d-show-split">
              <div className="m3d-show-text">
                <div className="m3d-show-eyebrow">{slide.eyebrow}</div>
                <h1 className="m3d-show-title">{slide.title}</h1>
                {slide.lead && <p className="m3d-show-lead">{slide.lead}</p>}
                {slide.isCta && <CtaButtons />}
              </div>
              <div className="m3d-show-media">
                <img src={slide.image} alt="Ultrassom 3D do bebê" />
                {slide.imageTag && <span className="m3d-show-media-tag">{slide.imageTag}</span>}
              </div>
            </div>
          ) : (
            <div className="m3d-show-centered">
              <div className="m3d-show-eyebrow">{slide.eyebrow}</div>
              <h1 className="m3d-show-title">{slide.title}</h1>

              {slide.price && (
                <div className="m3d-show-price">
                  <span className="m3d-show-price-value">{slide.price}</span>
                  <span className="m3d-show-price-unit">{slide.priceUnit}</span>
                </div>
              )}

              {slide.lead && <p className="m3d-show-lead">{slide.lead}</p>}

              {slide.steps && (
                <div className="m3d-show-steps">
                  {slide.steps.map(([n, k, v]) => (
                    <div key={n} className="m3d-show-step">
                      <div className="m3d-show-step-num">{n}</div>
                      <div>
                        <div className="m3d-show-step-name">{k}</div>
                        <div className="m3d-show-step-detail">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.bullets && (
                <div className="m3d-show-bullets">
                  {slide.bullets.map(([k, v]) => (
                    <div key={k} className="m3d-show-bullet">
                      <span className="m3d-show-bullet-check">✓</span>
                      <div>
                        <div className="m3d-show-bullet-name">{k}</div>
                        <div className="m3d-show-bullet-detail">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.isCta && <CtaButtons />}
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="m3d-show-controls">
          <button
            type="button"
            className="m3d-show-nav"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="m3d-show-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className={`m3d-show-dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir para o slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="m3d-show-nav"
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Próximo"
          >
            ›
          </button>
        </div>

        <div className="m3d-show-counter">
          {index + 1} / {total}
        </div>
      </div>
    </>
  );
}

function CtaButtons() {
  return (
    <div className="m3d-show-cta">
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="memo3d-btn memo3d-btn-primary">
        Falar no WhatsApp
      </a>
      <span className="m3d-show-cta-meta">62 99660‑2117 · Itaberaí · GO</span>
    </div>
  );
}
