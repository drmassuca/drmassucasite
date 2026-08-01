import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

import SEO from '../../components/SEO';
import Chatbot from '../../components/Chatbot';
import SeloConteudoValidado from '../../components/selo/SeloConteudoValidado';
import { getPublishedArticles } from '../../lib/articles';
import { CREDENCIAL_PADRAO, FORMACAO_PADRAO } from '../../lib/validacao';
import './v1.css';

const WHATSAPP_AGENDAR =
  'https://wa.me/5562996602117?text=Ol%C3%A1%2C%20quero%20agendar%20um%20ultrassom.';
const WHATSAPP = 'https://wa.me/5562996602117';
const INSTAGRAM = 'https://instagram.com/drmassuca';

/* As 10 seções de exames da página /exames (índice da edição). */
const SECOES_EXAMES = [
  {
    titulo: 'Ultrassom Obstétrico',
    subitens: [
      ['Obstétrico de Rotina', '/exames/obstetrico-de-rotina'],
      ['Morfológico 1º trimestre', '/exames/morfologico-primeiro-trimestre'],
      ['Morfológico 2º trimestre', '/exames/morfologico-segundo-trimestre'],
      ['Doppler Obstétrico', '/exames/doppler-obstetrico'],
      ['Ecocardiografia Fetal', '/exames/ecocardiografia-fetal'],
    ],
  },
  {
    titulo: 'Ultrassom Ginecológico',
    subitens: [
      ['Endovaginal', '/exames/endovaginal'],
      ['Mamas', '/exames/mamas'],
      ['Pélvico via abdominal', '/exames/pelvico-via-abdominal'],
      ['Pesquisa de Endometriose (com preparo)', '/exames/pesquisa-de-endometriose-com-preparo'],
      ['Monitorização da Ovulação', '/exames/monitorizacao-da-ovulacao'],
    ],
  },
  {
    titulo: 'Ultrassom Abdominal',
    subitens: [
      ['Total', '/exames/total'],
      ['Superior', '/exames/superior'],
      ['Inferior', '/exames/inferior'],
      ['Parede Abdominal', '/exames/parede-abdominal'],
    ],
  },
  {
    titulo: 'Ultrassom de Próstata',
    subitens: [
      ['Via Abdominal', '/exames/via-abdominal'],
      ['Via Transretal', '/exames/via-transretal'],
    ],
  },
  { titulo: 'Ultrassom Bolsa Escrotal e Testículos', link: '/exames/bolsa-escrotal-e-testiculos' },
  { titulo: 'Ultrassom Rins e Vias Urinárias', link: '/exames/rins-e-vias-urinarias' },
  {
    titulo: 'Ultrassom Pediátrico',
    subitens: [
      ['Pesquisa de Puberdade Precoce', '/exames/pesquisa-de-puberdade-precoce'],
      ['Transfontanela', '/exames/transfontanela'],
    ],
  },
  { titulo: 'Ultrassom de Partes Moles', link: '/exames/partes-moles' },
  {
    titulo: 'Ultrassom Avaliação Pré Cirurgia Plástica',
    link: '/exames/avaliacao-pre-cirurgia-plastica',
  },
  {
    titulo: 'Ultrassom de Tireoide e Cervical',
    subitens: [
      ['Tireoide (com ou sem Doppler)', '/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler'],
      ['Cervical (com ou sem Doppler)', '/exames/ultrassonografia-cervical-com-ou-sem-doppler'],
    ],
  },
];

const formataData = valor => {
  if (!valor) return null;
  const d = /^\d{4}-\d{2}-\d{2}$/.test(valor) ? new Date(`${valor}T12:00:00`) : new Date(valor);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const CtaButtons = () => (
  <div className="ed-ctas">
    <a
      className="ed-btn ed-btn--cheio"
      href={WHATSAPP_AGENDAR}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar ultrassom pelo WhatsApp com Dr. Massuca"
    >
      <FaWhatsapp aria-hidden="true" /> Agendar pelo WhatsApp
    </a>
    <a
      className="ed-btn ed-btn--contorno"
      href={INSTAGRAM}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Seguir Dr. Massuca no Instagram"
    >
      <FaInstagram aria-hidden="true" /> Instagram
    </a>
  </div>
);

export default function V1Home() {
  const [artigos, setArtigos] = useState([]);
  const [curadoriaCarregando, setCuradoriaCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    getPublishedArticles()
      .then(lista => {
        if (ativo) setArtigos((lista || []).slice(0, 4));
      })
      .catch(() => {})
      .finally(() => {
        if (ativo) setCuradoriaCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const [artigoPrincipal, ...artigosSecundarios] = artigos;

  return (
    <div className="v1">
      <SEO
        title="Dr. Massuca — Edição de Demonstração | Conteúdo Validado"
        description="Prévia editorial da home do Dr. Massuca com o sistema Conteúdo Validado. Página de demonstração, sem indexação."
        canonical="/v1"
        noindex
      />

      <main>
        {/* ── Manchete + foto editorial ─────────────────────────────── */}
        <section className="v1-manchete" aria-labelledby="v1-titulo">
          <div className="v1-manchete__texto">
            <p className="ed-chapeu">Ultrassonografia em Itaberaí-GO</p>
            <h1 id="v1-titulo" className="v1-titulo">
              Ultrassom com precisão, propósito e alma médica.
            </h1>
            <p className="v1-lide">
              Mais de 20 anos de atuação na medicina, com pós-graduação em ultrassonografia geral e
              ecocardiografia fetal. Trabalho guiado por ética, precisão diagnóstica e compromisso
              com uma escuta atenta e humanizada. Minha missão é oferecer exames de ultrassom de
              alta qualidade, apoiando médicos, famílias e pacientes em decisões seguras e
              conscientes.
            </p>
            <p className="v1-assinatura">
              <strong>Dr. Massuca</strong> · Antonio Massucatti Neto – CRM-GO 17475
              <br />
              {FORMACAO_PADRAO}
            </p>
            <CtaButtons />
            <RouterLink className="v1-continua" to="/sobre">
              Por trás do ultrassom, existe uma história — continua na página Sobre →
            </RouterLink>
          </div>
          <figure className="v1-foto">
            <img
              src="/foto-home.webp"
              alt="Dr. Massuca realizando exame"
              width="479"
              height="672"
              loading="eager"
            />
            <figcaption>Dr. Massuca durante exame de ultrassom · Itaberaí-GO</figcaption>
          </figure>
        </section>

        {/* ── Selo Conteúdo Validado: manifesto editorial ───────────── */}
        <section className="v1-manifesto" aria-labelledby="v1-manifesto-titulo">
          <div className="v1-manifesto__grid">
            <div className="v1-manifesto__distintivo">
              <div className="v1-manifesto__medalha">
                <img src="/logo.webp" alt="Logotipo Dr. Massuca" width="88" height="88" />
              </div>
              <p className="v1-manifesto__selo-nome">Conteúdo Validado</p>
            </div>
            <div className="v1-manifesto__texto">
              <p className="ed-chapeu ed-chapeu--sobre-verde">O compromisso desta edição</p>
              <h2 id="v1-manifesto-titulo">Todo conteúdo assinado tem lastro.</h2>
              <p>
                O selo <strong>Conteúdo Validado</strong> marca os textos revisados por{' '}
                <strong>{CREDENCIAL_PADRAO}</strong>, {FORMACAO_PADRAO.toLowerCase()}. Todo conteúdo
                assinado tem revisor identificado, data de revisão e fontes citadas. Se o texto
                mudar, o selo cai automaticamente — e só volta depois de nova revisão e assinatura.
              </p>
            </div>
          </div>
        </section>

        {/* ── Seções numeradas (contador CSS: nunca pula número) ────── */}
        <div className="ed-secoes">
          {/* 01 · IA Médica */}
          <section className="ed-secao" aria-labelledby="v1-sec-ia">
            <header className="ed-secao__cab">
              <span className="ed-secao__numero" aria-hidden="true" />
              <div className="ed-secao__titulos">
                <p className="ed-chapeu">Curadoria</p>
                <h2 id="v1-sec-ia">IA Médica</h2>
              </div>
              <RouterLink to="/ia-medica" className="ed-secao__link">
                Ver toda a curadoria →
              </RouterLink>
            </header>

            {curadoriaCarregando ? (
              <p className="ed-vazio">Carregando a curadoria…</p>
            ) : artigos.length === 0 ? (
              <p className="ed-vazio">
                A curadoria completa está na página{' '}
                <RouterLink to="/ia-medica">IA Médica</RouterLink>.
              </p>
            ) : (
              <div className="v1-ia">
                <article className="v1-ia__principal">
                  <p className="ed-meta">
                    {artigoPrincipal.category}
                    {artigoPrincipal.date && ` · ${formataData(artigoPrincipal.date)}`}
                    {artigoPrincipal.readTime && ` · ${artigoPrincipal.readTime}`}
                  </p>
                  <h3>
                    <RouterLink
                      to={`/ia-medica/artigo/${artigoPrincipal.slug || artigoPrincipal.id}`}
                    >
                      {artigoPrincipal.title}
                    </RouterLink>
                  </h3>
                  {artigoPrincipal.subtitle && (
                    <p className="v1-ia__sub">{artigoPrincipal.subtitle}</p>
                  )}
                  <p className="v1-ia__excerto">{artigoPrincipal.excerpt}</p>
                  <SeloConteudoValidado artigo={artigoPrincipal} variant="chip" previa />
                </article>
                <div className="v1-ia__lista">
                  {artigosSecundarios.map(artigo => (
                    <article key={artigo.slug || artigo.id} className="v1-ia__item">
                      <p className="ed-meta">
                        {artigo.category}
                        {artigo.date && ` · ${formataData(artigo.date)}`}
                      </p>
                      <h4>
                        <RouterLink to={`/ia-medica/artigo/${artigo.slug || artigo.id}`}>
                          {artigo.title}
                        </RouterLink>
                      </h4>
                      <SeloConteudoValidado artigo={artigo} variant="chip" previa />
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 02 · Exames: índice da edição */}
          <section className="ed-secao" aria-labelledby="v1-sec-exames">
            <header className="ed-secao__cab">
              <span className="ed-secao__numero" aria-hidden="true" />
              <div className="ed-secao__titulos">
                <p className="ed-chapeu">Índice da edição</p>
                <h2 id="v1-sec-exames">Exames de Ultrassom Realizados</h2>
              </div>
              <RouterLink to="/exames" className="ed-secao__link">
                Índice completo →
              </RouterLink>
            </header>
            {/* role explícito: list-style:none faz o Safari/VoiceOver rebaixar
                a lista para Group sem ele */}
            <ol className="ed-indice" role="list">
              {SECOES_EXAMES.map((secao, i) => (
                <li key={secao.titulo} className="ed-indice__item">
                  <span className="ed-indice__ordinal" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="ed-indice__conteudo">
                    <h3>
                      <RouterLink to={secao.link || '/exames'}>{secao.titulo}</RouterLink>
                    </h3>
                    {secao.subitens && (
                      <p className="ed-indice__sub">
                        {secao.subitens.map(([nome, href], j) => (
                          <span key={href}>
                            {j > 0 && ' · '}
                            <RouterLink to={href}>{nome}</RouterLink>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 03 · Depoimentos */}
          <section className="ed-secao" aria-labelledby="v1-sec-depoimentos">
            <header className="ed-secao__cab">
              <span className="ed-secao__numero" aria-hidden="true" />
              <div className="ed-secao__titulos">
                <p className="ed-chapeu">Vozes dos pacientes</p>
                <h2 id="v1-sec-depoimentos">Depoimentos</h2>
              </div>
              <RouterLink to="/depoimentos" className="ed-secao__link">
                Ler todos →
              </RouterLink>
            </header>
            <div className="v1-depoimentos">
              {/* width/height reais de cada webp: reserva de espaço, zero CLS */}
              {[
                { n: 1, w: 649, h: 113 },
                { n: 2, w: 661, h: 241 },
                { n: 3, w: 649, h: 117 },
              ].map(({ n, w, h }) => (
                <figure key={n} className="v1-depoimentos__quadro">
                  <img
                    src={`/img-depoimentos/depoimento${n}.webp`}
                    alt={`Depoimento de paciente ${n}`}
                    width={w}
                    height={h}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
            <p className="v1-depoimentos__nota">Avaliação média 4,9 de 5 · 120 avaliações.</p>
          </section>

          {/* 04 · Contato */}
          <section className="ed-secao" aria-labelledby="v1-sec-contato">
            <header className="ed-secao__cab">
              <span className="ed-secao__numero" aria-hidden="true" />
              <div className="ed-secao__titulos">
                <p className="ed-chapeu">Fale com o consultório</p>
                <h2 id="v1-sec-contato">Contato</h2>
              </div>
              <RouterLink to="/contato" className="ed-secao__link">
                Página de contato →
              </RouterLink>
            </header>
            <div className="v1-contato">
              <dl className="v1-contato__dados">
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      (62) 99660-2117
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    <a href="mailto:drmassucatti@gmail.com">drmassucatti@gmail.com</a>
                  </dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    <a
                      href="https://maps.app.goo.gl/yERHkLaxiicVrKH27"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rua 19, Qd. 33, Lt. 01 – Vila Leonor, Itaberaí-GO · CEP 76630-000
                    </a>
                  </dd>
                </div>
              </dl>
              <CtaButtons />
            </div>
          </section>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
