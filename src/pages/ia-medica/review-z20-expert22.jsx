import { useState, useEffect, useRef, useCallback } from 'react';
import SEOHead from '../../components/SEOHead';
import './review-z20-expert22.css';

const IMG_HERA = 'https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/hera-z20.png';
const IMG_VOLUSON = 'https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/voluson-expert-22.png';
const IMG_BANNER = 'https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/banner-z20-vs-expert22.jpeg';

const PREC_S = 500000;
const PREC_G = 650000;

const radarData = {
  ia: {
    labels: ['Automacao workflow', 'Neurossonografia fetal', 'Validacao cientifica', 'STIC cardiaco', 'Fluxo vascular 3D', 'Reducao keystrokes'],
    S: [9, 8, 5, 7, 7, 9],
    G: [8, 7, 10, 8, 8, 8],
  },
  perf: {
    labels: ['Morfologia fetal rotina', 'Eco fetal avancada', 'Alto volume diario', 'Medicina fetal alto risco', 'Suporte Brasil', 'Custo-beneficio', 'Inovacao em IA', 'Display / ergonomia'],
    S: [9, 7, 9, 7, 4, 8, 9, 9],
    G: [8, 8, 7, 8, 4, 7, 7, 7],
  },
};

function fmt(v) {
  return 'R$ ' + Math.round(v).toLocaleString('pt-BR');
}
function fmtPct(v) {
  return Math.round(v) + '%';
}

export default function ReviewZ20Expert22() {
  // --- Google Fonts ---
  useEffect(() => {
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // --- Chart.js CDN ---
  const [chartReady, setChartReady] = useState(false);
  useEffect(() => {
    if (window.Chart) {
      setChartReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload = () => setChartReady(true);
    document.head.appendChild(script);
  }, []);

  // --- Radar chart ---
  const [radarTab, setRadarTab] = useState('ia');
  const radarRef = useRef(null);
  const radarInst = useRef(null);

  useEffect(() => {
    if (!chartReady || !radarRef.current) return;
    if (radarInst.current) radarInst.current.destroy();
    const d = radarData[radarTab];
    radarInst.current = new window.Chart(radarRef.current, {
      type: 'radar',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'Samsung HERA Z20', data: d.S, fill: true, backgroundColor: 'rgba(24,95,165,.12)', borderColor: '#185FA5', pointBackgroundColor: '#185FA5', borderWidth: 1.5, pointRadius: 3 },
          { label: 'GE Voluson Expert 22', data: d.G, fill: true, backgroundColor: 'rgba(163,45,45,.12)', borderColor: '#A32D2D', pointBackgroundColor: '#A32D2D', borderWidth: 1.5, pointRadius: 3 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#4a5568', font: { size: 11, family: "'IBM Plex Sans',sans-serif" } } } },
        scales: {
          r: {
            min: 0, max: 10,
            ticks: { color: '#718096', stepSize: 2, backdropColor: 'transparent', font: { size: 9 } },
            pointLabels: { color: '#4a5568', font: { size: 10, family: "'IBM Plex Sans',sans-serif" } },
            grid: { color: 'rgba(0,0,0,.08)' },
            angleLines: { color: 'rgba(0,0,0,.08)' },
          },
        },
      },
    });
    return () => { if (radarInst.current) radarInst.current.destroy(); };
  }, [chartReady, radarTab]);

  // --- ROI state ---
  const [receitaDia, setReceitaDia] = useState(3000);
  const [diasUteis, setDiasUteis] = useState(20);
  const [custoOp, setCustoOp] = useState(15000);
  const [proLabore, setProLabore] = useState(15000);
  const [manutPct, setManutPct] = useState(2);

  const recMes = receitaDia * diasUteis;
  const recAno = recMes * 12;
  const manS = PREC_S * (manutPct / 100) / 12;
  const manG = PREC_G * (manutPct / 100) / 12;
  const lucS = recMes - custoOp - proLabore - manS;
  const lucG = recMes - custoOp - proLabore - manG;
  const payS = lucS > 0 ? Math.ceil(PREC_S / lucS) : null;
  const payG = lucG > 0 ? Math.ceil(PREC_G / lucG) : null;
  const roi5S = lucS > 0 ? (((lucS * 12 * 5) - PREC_S) / PREC_S) * 100 : null;
  const roi5G = lucG > 0 ? (((lucG * 12 * 5) - PREC_G) / PREC_G) * 100 : null;
  const roi10S = lucS > 0 ? (((lucS * 12 * 10) - PREC_S) / PREC_S) * 100 : null;
  const roi10G = lucG > 0 ? (((lucG * 12 * 10) - PREC_G) / PREC_G) * 100 : null;
  const margem = recMes > 0 ? ((lucS / recMes) * 100) : 0;

  // --- ROI Bar chart ---
  const roiBarRef = useRef(null);
  const barInst = useRef(null);

  useEffect(() => {
    if (!chartReady || !roiBarRef.current) return;
    if (barInst.current) barInst.current.destroy();
    const barLabels = ['Investimento', 'Manutencao 5a', 'Custo oper. 5a', 'Receita 5a', 'Lucro liq. 5a'];
    const barS = [PREC_S, manS * 60, custoOp * 60, recMes * 60, lucS * 60];
    const barG = [PREC_G, manG * 60, custoOp * 60, recMes * 60, lucG * 60];
    barInst.current = new window.Chart(roiBarRef.current, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [
          { label: 'Samsung HERA Z20', data: barS, backgroundColor: 'rgba(55,138,221,.75)', borderColor: '#378ADD', borderWidth: 1 },
          { label: 'GE Voluson Expert 22', data: barG, backgroundColor: 'rgba(127,119,221,.75)', borderColor: '#7F77DD', borderWidth: 1 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: (v) => 'R$ ' + Math.round(v / 1000) + 'k', color: '#718096', font: { size: 9 } }, grid: { color: 'rgba(0,0,0,.05)' } },
          x: { ticks: { color: '#718096', font: { size: 9 } }, grid: { display: false } },
        },
      },
    });
    return () => { if (barInst.current) barInst.current.destroy(); };
  }, [chartReady, recMes, custoOp, proLabore, manS, manG, lucS, lucG]);

  // --- ROI Line chart ---
  const roiLineRef = useRef(null);
  const lineInst = useRef(null);

  useEffect(() => {
    if (!chartReady || !roiLineRef.current) return;
    if (lineInst.current) lineInst.current.destroy();
    const meses = [];
    const acsS = [];
    const acsG = [];
    for (let m = 0; m <= 60; m++) {
      meses.push(m);
      acsS.push(Math.round(-PREC_S + (lucS * m)));
      acsG.push(Math.round(-PREC_G + (lucG * m)));
    }
    lineInst.current = new window.Chart(roiLineRef.current, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          { label: 'Samsung HERA Z20', data: acsS, borderColor: '#378ADD', backgroundColor: 'rgba(55,138,221,.07)', fill: true, tension: .3, pointRadius: 0, borderWidth: 2 },
          { label: 'GE Voluson Expert 22', data: acsG, borderColor: '#7F77DD', backgroundColor: 'rgba(127,119,221,.07)', fill: true, tension: .3, pointRadius: 0, borderWidth: 2 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: (v) => 'R$ ' + Math.round(v / 1000) + 'k', color: '#718096', font: { size: 9 } }, grid: { color: 'rgba(0,0,0,.05)' } },
          x: { title: { display: true, text: 'meses', color: '#718096', font: { size: 9 } }, ticks: { color: '#718096', font: { size: 9 }, maxTicksLimit: 13 }, grid: { display: false } },
        },
      },
    });
    return () => { if (lineInst.current) lineInst.current.destroy(); };
  }, [chartReady, lucS, lucG]);

  // --- Animated bars (IntersectionObserver) ---
  const barsTransRef = useRef(null);
  const barsIaRef = useRef(null);
  const barsSuporteRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // fallback: animate immediately
      [barsTransRef, barsIaRef, barsSuporteRef].forEach((ref) => {
        if (ref.current) {
          ref.current.querySelectorAll('.bar-fill[data-w]').forEach((el) => {
            el.style.width = el.getAttribute('data-w') + '%';
          });
        }
      });
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill[data-w]').forEach((el) => {
              el.style.width = el.getAttribute('data-w') + '%';
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    [barsTransRef, barsIaRef, barsSuporteRef].forEach((ref) => {
      if (ref.current) obs.observe(ref.current);
    });
    return () => obs.disconnect();
  }, []);

  // --- Counter animation ---
  const statsRef = useRef(null);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [counterValues, setCounterValues] = useState({ c1: 0, c2: 0, c3: 0, c4: 0 });

  const animateCounters = useCallback(() => {
    if (countersAnimated) return;
    setCountersAnimated(true);
    const targets = [
      { key: 'c1', val: 11040 },
      { key: 'c2', val: 3650 },
      { key: 'c3', val: 14690 },
      { key: 'c4', val: 2.4 },
    ];
    const dur = 1300;
    const start = performance.now();
    function step(ts) {
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const vals = {};
      targets.forEach((t) => {
        vals[t.key] = t.val * e;
      });
      setCounterValues({ ...vals });
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [countersAnimated]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      animateCounters();
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounters();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [animateCounters]);

  function switchRadarTab(tab) {
    setRadarTab(tab);
  }

  return (
    <div className="rv">
      <SEOHead
        title="Samsung HERA Z20 vs. GE Voluson Expert 22 — Dr. Massuca"
        description="Review completo: Samsung HERA Z20 vs GE Voluson Expert 22. Hardware, IA, transdutores, ROI e veredicto para ultrassom obstetrico premium."
        image={IMG_BANNER}
      />

      <div className="wrap">
        {/* HEADER */}
        <header className="art-header">
          <span className="art-cat">Review de Equipamentos</span>
          <h1 className="art-title">Samsung HERA Z20 vs. GE Voluson Expert 22: o duelo definitivo em ultrassom obstetrico premium</h1>
          <p className="art-sub">Testei os dois aparelhos mais avancados do mundo em morfologia fetal no congresso This Is Us 2026 — e trouxe specs que nao existem em nenhuma outra publicacao</p>
          <div className="art-meta">
            <span>30 de marco de 2026</span>
            <span>Dr. Massuca</span>
            <span>18 min de leitura</span>
            <span>Review de Equipamentos</span>
          </div>
        </header>

        {/* DUEL */}
        <div className="duel">
          <div className="dc dc-s">
            <img src={IMG_HERA} alt="Samsung HERA Z20" style={{ maxHeight: 180, width: 'auto', margin: '0 auto 12px', display: 'block', borderRadius: 'var(--radius)' }} />
            <div className="dc-brand">Samsung</div>
            <div className="dc-model">HERA Z20</div>
            <div className="dc-price">~R$ 500.000</div>
          </div>
          <div className="vs">vs</div>
          <div className="dc dc-g">
            <img src={IMG_VOLUSON} alt="GE Voluson Expert 22" style={{ maxHeight: 180, width: 'auto', margin: '0 auto 12px', display: 'block', borderRadius: 'var(--radius)', transform: 'scale(1.2)' }} />
            <div className="dc-brand">GE</div>
            <div className="dc-model">Voluson Expert 22</div>
            <div className="dc-price">~R$ 600.000</div>
          </div>
        </div>

        <div className="art-body">
          {/* LEAD */}
          <div className="lead-box">
            O mercado de ultrassom obstetrico premium vive seu momento mais competitivo. O Samsung HERA Z20 e o GE Voluson Expert 22 representam o estado da arte absoluto em imagem fetal, mas adotam filosofias profundamente diferentes: a Samsung aposta em IA continua e automatizacao radical do workflow, enquanto a GE investe em arquitetura de beamforming por GPU e o maior ecossistema de ferramentas quantitativas para ecocardiografia fetal. Ambos os aparelhos foram testados pessoalmente pelo autor durante o congresso internacional <strong>"This Is Us" 2026</strong> da Escola NEXUS em Brasilia. Este comparativo destina-se ao grupo de medicos ultrassonografistas que pretendem ingressar em um curso de inteligencia artificial medica: profissionais que dominam knobologia e precisam de dados concretos para avaliar as duas plataformas mais avancadas do mundo.
          </div>

          {/* NEXUS */}
          <div className="nexus-box">
            <strong>Sobre o congresso:</strong> O "This Is Us — Congresso Internacional de Ultrassonografia" e organizado pela <a href="https://nexusultrassonografia.com.br/" target="_blank" rel="noopener noreferrer">Escola NEXUS</a> (Nucleo de Excelencia em Ultrassonografia e Ensino Medico), fundada em 2017 em Brasilia pelo Dr. Evaldo Trajano de Souza Silva Filho — especialista em medicina fetal, presidente regional da SBUS-DF e diretor da Ian Donald School of Medical Ultrasound no Brasil. A escola carrega o Selo de Qualidade da SBUS e parceria internacional com a Fetal Medicine Barcelona. Segunda edicao: 26 a 28 de marco de 2026.
            <br /><br />
            <strong>Nota de reconhecimento:</strong> A <a href="https://nexusultrassonografia.com.br/" target="_blank" rel="noopener noreferrer">Escola NEXUS</a> nao e apenas o palco deste review — e uma instituicao de referencia nacional em formacao medica especializada em ultrassonografia, da qual o autor e ex-aluno. Fundada em 2017 em Brasilia, a NEXUS reune um corpo docente de mestres e doutores que sao referencia nos principais congressos do pais, com metodologia baseada em pratica clinica real com pacientes. O agradecimento especial vai ao <strong>Dr. Jose Paulo da Silva Netto</strong>, ginecologista, socio-fundador e coordenador academico da escola, cuja acolhida generosa no congresso This Is Us 2026 tornou possivel o acesso irrestrito aos equipamentos para a elaboracao deste comparativo. Igualmente, ao <strong>Dr. Evaldo Trajano de Souza Silva Filho</strong>, co-fundador e diretor medico, pela construcao de um espaco que genuinamente respeita o especialista experiente.
          </div>

          {/* ══════════════════════════════════════ */}
          <h2>1. Hardware: o que esta dentro da caixa</h2>

          <h3>Samsung HERA Z20 — Crystal Architecture 2a geracao</h3>
          <p>O HERA Z20 opera sobre a <strong>Crystal Architecture 2nd Generation</strong>, combinando tres pilares: <strong>CrystalBeam</strong> (beamforming por software avancado), <strong>CrystalLive</strong> (engine de processamento 2D/3D) e transdutores <strong>S-Vue</strong> (cristal unico de banda larga) [3,4]. O sistema incorpora processamento baseado em software que substitui beamformers de hardware dedicado [1].</p>
          <p>Os dados abaixo foram verificados e confirmados junto a Samsung, obtidos antes da autorizacao oficial de divulgacao. A fonte nao e identificada nesta publicacao.</p>

          <figure style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <img src={IMG_HERA} alt="Samsung HERA Z20 — aparelho exposto no congresso This Is Us 2026" style={{ maxWidth: 300, width: '100%', display: 'block', margin: '0 auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }} />
            <figcaption style={{ fontSize: '.8rem', color: 'var(--text3)', marginTop: 8 }}>Samsung HERA Z20 — specs de hardware verificados e confirmados junto a Samsung</figcaption>
          </figure>

          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Componente</th><th className="s-col">Samsung HERA Z20</th></tr>
              <tr><td>CPU</td><td className="win">11th Gen Intel Core i5-11500HE @ 2.60 GHz (Tiger Lake) <span className="badge bw">Mais novo</span></td></tr>
              <tr><td><strong>GPU_0</strong></td><td className="win">NVIDIA RTX A4000</td></tr>
              <tr><td><strong>GPU_1</strong></td><td className="win">NVIDIA Quadro T1000</td></tr>
              <tr><td><strong>GPU_2</strong></td><td>Intel UHD Graphics (integrada)</td></tr>
              <tr><td>RAM</td><td className="win">32 GB — o dobro da GE <span className="badge bw">Vantagem</span></td></tr>
              <tr><td>Storage</td><td className="win">M.2 NVMe SSD 2 TB</td></tr>
              <tr><td>3D Function</td><td>Motor Board: PRESENT (confirma STIC mecanico)</td></tr>
              <tr><td>Touchscreen auxiliar</td><td className="win">15,6" com controle de inclinacao <span className="badge bw">Confirmado</span></td></tr>
              <tr><td>Garantia</td><td className="win">5 anos no console <span className="badge bw">Confirmado</span></td></tr>
            </tbody>
          </table>

          <h3>GE Voluson Expert 22 — Lyric Architecture com dual-GPU confirmada onsite</h3>
          <p>O Expert 22 introduziu a <strong>Lyric Architecture</strong>, substituindo a Radiance System Architecture do Voluson E10 [7,14]. O diferencial e o <strong>Graphic-Based Beamforming</strong> — o beamformer convencional foi substituido por processamento baseado em GPU, com flexibilidade computacional e capacidade de atualizacao por software [7,8].</p>
          <p>Os dados abaixo foram coletados <strong>diretamente da tela System Info do aparelho exposto no congresso</strong>. Esta e informacao inedita — nao disponivel em nenhuma outra publicacao:</p>

          <figure style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <img src={IMG_VOLUSON} alt="GE Voluson Expert 22 — aparelho exposto no congresso This Is Us 2026" style={{ maxWidth: 300, width: '100%', display: 'block', margin: '0 auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }} />
            <figcaption style={{ fontSize: '.8rem', color: 'var(--text3)', marginTop: 8 }}>GE Voluson Expert 22 — dados de hardware coletados diretamente da tela System Info do aparelho onsite</figcaption>
          </figure>

          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Componente</th><th className="g-col">GE Voluson Expert 22 BT25 — confirmado onsite</th></tr>
              <tr><td>CPU</td><td>Intel64 Family 6 Model 158 @ 2.496 MHz (Comet Lake — equiv. i7-10700)</td></tr>
              <tr><td><strong>GPU Beamforming</strong></td><td className="win">NVIDIA RTX A4000H — GPU profissional dedicada <span className="badge bw">Confirmado</span></td></tr>
              <tr><td><strong>GPU Interface/UI</strong></td><td className="win">NVIDIA T1000 8GB GDDR6 — GPU dedicada ao display <span className="badge bw">Confirmado</span></td></tr>
              <tr><td>RAM</td><td className="win">16.384 MB (16 GB)</td></tr>
              <tr><td>Storage</td><td>NVMe — 123h de uso (fabricado 21/Out/2025)</td></tr>
              <tr><td>OS</td><td>Windows 10 IoT Enterprise 2021 LTSC (Build 19044.6332, versao 21H2)</td></tr>
              <tr><td>DICOM</td><td>MergeCom3 – 5.18.0.0</td></tr>
              <tr><td>Telemetria remota</td><td>PTC Axeda Agent 6.9.1-1046 (GE InSite)</td></tr>
            </tbody>
          </table>

          <p>O dado mais revelador e a <strong>arquitetura dual-GPU</strong>: a RTX A4000H processa exclusivamente o beamforming grafico, enquanto a T1000 gerencia exclusivamente a interface e o display. As duas pipelines tem GPU propria — nenhuma compete por recursos com a outra, o que e critico em processamento 4D em tempo real [7].</p>

          <h3>O que as GPUs do Expert 22 custam no varejo brasileiro</h3>

          <div className="stats" ref={statsRef}>
            <div className="stat">
              <div className="stat-n">{'R$ ' + Math.round(counterValues.c1).toLocaleString('pt-BR')}</div>
              <div className="stat-l">RTX A4000H (beamforming)</div>
            </div>
            <div className="stat">
              <div className="stat-n">{'R$ ' + Math.round(counterValues.c2).toLocaleString('pt-BR')}</div>
              <div className="stat-l">T1000 8GB (interface)</div>
            </div>
            <div className="stat">
              <div className="stat-n">{'R$ ' + Math.round(counterValues.c3).toLocaleString('pt-BR')}</div>
              <div className="stat-l">Soma das 2 GPUs</div>
            </div>
            <div className="stat">
              <div className="stat-n">{counterValues.c4.toFixed(1).replace('.', ',') + '%'}</div>
              <div className="stat-l">do custo total do aparelho</div>
            </div>
          </div>

          <p>O preco premium de um aparelho de ultrassom de alto nivel <strong>nao esta no hardware de prateleira</strong>: esta nas certificacoes regulatorias (ANVISA, FDA), no firmware proprietario de beamforming, nos transdutores de engenharia exclusiva, na validacao clinica e na infraestrutura de suporte. O hardware e o veiculo; o valor esta no software e no conhecimento embarcado.</p>

          <h3>Comparativo de especificacoes</h3>
          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Especificacao</th><th className="s-col">Samsung HERA Z20</th><th className="g-col">GE Voluson Expert 22</th></tr>
              <tr><td>Arquitetura</td><td>Crystal Architecture 2a Gen</td><td>Lyric Architecture</td></tr>
              <tr><td>GPU principal</td><td className="win">NVIDIA RTX A4000 <span className="badge bw">&#10003;</span></td><td>NVIDIA RTX A4000H</td></tr>
              <tr><td>GPU secundaria</td><td className="win">NVIDIA Quadro T1000 <span className="badge bw">&#10003;</span></td><td>T1000 8GB GDDR6</td></tr>
              <tr><td>GPU adicional</td><td>Intel UHD (integrada)</td><td>—</td></tr>
              <tr><td>CPU</td><td className="win">Intel i5-11500HE @ 2.60 GHz (Tiger Lake — 11a Gen) <span className="badge bw">Mais novo</span></td><td>Intel Comet Lake @ 2.496 MHz (10a Gen)</td></tr>
              <tr><td>RAM</td><td className="win">32 GB <span className="badge bw">2x maior</span></td><td>16 GB</td></tr>
              <tr><td>Storage</td><td className="win">M.2 NVMe SSD 2 TB</td><td>NVMe 2 TB HDD</td></tr>
              <tr><td>Frame rate B-mode</td><td className="nd">Nao publicado</td><td className="win">&gt;3.000 fps <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Dynamic Range</td><td className="nd">Nao publicado</td><td className="win">ate 418 dB <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Monitor</td><td className="win">OLED 27" WQHD (2560x1440) <span className="badge bw">&#10003;</span></td><td>LCD 23,8" Full HD (1920x1080)</td></tr>
              <tr><td>Touchscreen auxiliar</td><td className="win">15,6" com inclinacao <span className="badge bw">&#10003;</span></td><td>15,6" sem inclinacao</td></tr>
              <tr><td>Garantia</td><td className="win">5 anos <span className="badge bw">&#10003;</span></td><td>2 anos</td></tr>
              <tr><td>Preco Brasil</td><td>~R$ 500.000</td><td>~R$ 600.000</td></tr>
            </tbody>
          </table>

          {/* ══════════════════════════════════════ */}
          <h2>2. Software e processamento de imagem</h2>
          <p>A fronteira entre hardware e software em ultrassom de alta gama e cada vez mais tenue — e o Samsung HERA Z20 e o exemplo mais evidente disso. Muitas das funcionalidades que o usuario percebe como "qualidade de imagem" sao, na pratica, algoritmos de processamento de sinal rodando sobre o hardware. E o caso da <strong>terceira harmonica</strong> — talvez o achado mais surpreendente do Z20 neste review.</p>

          <h3>O que sao os harmonicos em ultrassom</h3>
          <p>Quando o transdutor emite uma frequencia fundamental — digamos, 5 MHz — o tecido nao responde apenas nessa frequencia. Ele gera harmonicos: multiplos da frequencia original (10 MHz, 15 MHz, etc.). O ultrassom convencional usava apenas o sinal fundamental. A segunda geracao trouxe a <strong>2a harmonica (THI — Tissue Harmonic Imaging)</strong>, hoje padrao em qualquer aparelho moderno: menos artefatos, mais contraste, melhor definicao de bordas. A <strong>3a harmonica</strong> (tres vezes a frequencia fundamental) vai alem: feixe ainda mais estreito, resolucao lateral superior e praticamente zero de sidelobe artifacts — mas o sinal e tao fraco que, ate recentemente, era impraticavel extrai-lo do ruido de fundo.</p>

          <h3>Terceira harmonica no Samsung HERA Z20 — observacao exclusiva onsite</h3>
          <p>O Samsung HERA Z20 possui processamento capaz de detectar e utilizar o componente de 3a harmonica quando o sinal tem intensidade suficiente. Nao ha um botao dedicado — o sistema ativa automaticamente quando a condicao fisica esta presente, exibindo um indicador discreto no HUD confirmando que a 3a harmonica esta ativa. Quando ativa, a melhoria de imagem e perceptivel principalmente na <strong>definicao de estruturas de alta frequencia em campo proximo</strong> — exatamente o cenario da neurossonografia fetal com transdutor endocavitario, em que o encefalo fetal esta proximo e a frequencia mais alta e sustentavel.</p>
          <p>Na pratica onsite, comparativos de neurossonografia fetal mostraram nitidez superior no cortex cerebral com a 3a harmonica ativa — uma diferenca real, mais sutil do que a ativacao da harmonica convencional, mas clinicamente perceptivel para quem conhece a anatomia. A fisica impoe o limite: frequencias mais altas atenuam mais rapidamente, tornando o recurso menos eficaz em campo distante ou em pacientes com IMC elevado. Para neurossonografia fetal com transdutor endocavitario e feto em apresentacao cefalica, o encefalo fica suficientemente proximo para que a 3a harmonica seja sustentada.</p>
          <p>Estudos publicados documentam que a 3a harmonica proporciona melhoria de ate <strong>46% na resolucao lateral</strong> em relacao ao fundamental e <strong>28% em relacao a 2a harmonica</strong> [IEEE Xplore, 2012]. A Canon Medical (linha Aplio) foi a primeira a formalizar a tecnologia como produto comercial usando um filtro de deep learning para extrair o sinal. O Z20 implementa solucao propria com comportamento similar — dado observado exclusivamente neste review, durante o congresso This Is Us 2026.</p>

          {/* ══════════════════════════════════════ */}
          <h2>3. Transdutores volumetricos: CMV1-10 versus eM6C G3</h2>
          <p>O transdutor volumetrico e o coracao de qualquer aparelho de ultrassom obstetrico premium. Aqui, a competicao e feroz.</p>

          <h3>Samsung CMV1-10 — matrix array de cristal unico</h3>
          <p>O <strong>CMV1-10</strong> e o novo transdutor flagship do Z20: um convex volume matrix array com tecnologia S-Vue (cristal unico), cobrindo <strong>1–10 MHz</strong> de banda [2,3,4]. Essa largura de banda e notavel — permite desde penetracao profunda em pacientes com IMC elevado ate resolucao fina para detalhes anatomicos fetais. A Samsung nao publica o numero de elementos, o que e uma lacuna significativa para comparacao tecnica.</p>

          <h3>GE eM6C G3 — 8.192 elementos eletronicos</h3>
          <p>O <strong>eM6C G3</strong> e a terceira geracao do probe eletronico matrix da GE, com <strong>8.192 elementos</strong> em arranjo matrix 2D ativo, operando em <strong>2–6 MHz</strong> [7,8]. A principal vantagem: por ser array eletronico puro (sem motor mecanico), permite <strong>eSTIC</strong> — captura instantanea de STIC em ~3 segundos (versus 7–15 segundos em probes mecanicos) [8,9,21]. Volumes 4D com Color Doppler em tempo real, <strong>Bi-Plane</strong> e Bi-Plane CRI sao exclusivos do eM6C G3.</p>

          <h3>Comparativo — transdutores</h3>
          <div className="bars" ref={barsTransRef}>
            <div className="bar-row">
              <div className="bar-lbl"><span>Banda de frequencia (MHz)</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung CMV1-10</div><div className="bar-track"><div className="bar-fill bf-s" data-w="83">10 MHz</div></div></div>
                <div><div className="bar-name">GE eM6C G3</div><div className="bar-track"><div className="bar-fill bf-g" data-w="50">6 MHz</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Elementos do array</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung CMV1-10</div><div className="bar-track"><div className="bar-fill bf-s" data-w="2">N/D</div></div></div>
                <div><div className="bar-name">GE eM6C G3</div><div className="bar-track"><div className="bar-fill bf-g" data-w="100">8.192 elementos</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Tempo de captura STIC — menor e melhor (s)</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — mecanico (~11s)</div><div className="bar-track"><div className="bar-fill bf-s" data-w="75">~11s</div></div></div>
                <div><div className="bar-name">GE — eSTIC eletronico (~3s)</div><div className="bar-track"><div className="bar-fill bf-g" data-w="20">~3s</div></div></div>
              </div>
            </div>
          </div>

          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Caracteristica</th><th className="s-col">Samsung CMV1-10</th><th className="g-col">GE eM6C G3</th></tr>
              <tr><td>Tipo</td><td>Convex Volume Matrix Array</td><td>Electronic Matrix Array 2D</td></tr>
              <tr><td>Elementos</td><td className="nd">Nao divulgado <span className="badge bn">?</span></td><td className="win">8.192 <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Frequencia</td><td className="win">1–10 MHz <span className="badge bw">Maior banda</span></td><td>2–6 MHz</td></tr>
              <tr><td>Cristal unico (S-Vue)</td><td className="win">Sim</td><td>—</td></tr>
              <tr><td>STIC</td><td>Mecanico (7–15s)</td><td className="win">eSTIC eletronico (~3s) <span className="badge bw">3x mais rapido</span></td></tr>
              <tr><td>Bi-Plane</td><td className="nd">Nao disponivel</td><td className="win">Sim <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Color 4D em tempo real</td><td>Sim</td><td className="win">Sim (com eSTIC)</td></tr>
            </tbody>
          </table>

          <p><strong>Opiniao tecnica:</strong> O eM6C G3 e superior em ecocardiografia fetal gracas ao eSTIC e Bi-Plane — a captura cardiaca instantanea sem artefato de movimento e transformadora [8,9,21]. A largura de banda maior do CMV1-10 (1–10 MHz vs. 2–6 MHz) favorece a Samsung em versatilidade clinica e penetracao em pacientes com IMC elevado [2,3]. Para morfologia fetal de rotina, ambos sao excelentes.</p>

          {/* ══════════════════════════════════════ */}
          <h2>4. Inteligencia artificial embarcada: duas filosofias opostas</h2>

          <h3>Comparativo visual — Radar de capacidades</h3>
          <div className="tab-row">
            <button className={`tab-btn${radarTab === 'ia' ? ' active' : ''}`} onClick={() => switchRadarTab('ia')}>Capacidades de IA</button>
            <button className={`tab-btn${radarTab === 'perf' ? ' active' : ''}`} onClick={() => switchRadarTab('perf')}>Perfil clinico ideal</button>
          </div>
          <div className="chart-card">
            <div className="chart-lbl">
              {radarTab === 'ia'
                ? 'Radar — capacidades de IA embarcada (escala 0–10)'
                : 'Radar — perfil clinico ideal por categoria (escala 0–10)'}
            </div>
            <div style={{ position: 'relative', width: '100%', height: 360 }}>
              <canvas ref={radarRef}></canvas>
            </div>
          </div>

          <h3>Samsung HERA Z20 — IA continua e automatizacao radical</h3>
          <p>O recurso central e o <strong>Live ViewAssist</strong>: IA baseada em deep learning que opera <em>continuamente durante o exame</em>, sem interacao do operador [1,5,6]. Identifica e captura automaticamente <strong>39 planos padrao</strong>, anota <strong>47 estruturas anatomicas</strong> e realiza <strong>46 medidas essenciais</strong> em tempo real [5,6]. A Samsung declara reducao de ate <strong>94% nos keystrokes</strong> em exame detalhado de 2o trimestre — dado poderoso, mas baseado em dados internos (data on file), nao em estudo revisado por pares [5,6].</p>
          <p>A validacao FDA (510(k) K241971, outubro 2024) documentou <strong>Dice scores &gt;0,87</strong> para segmentacao e <strong>acuracia de reconhecimento &gt;94%</strong> em datasets diversos [17].</p>

          <ul>
            <li><strong>BiometryAssist</strong> (base): &gt;30 parametros biometricos automatizados — BPD, OFD, HC, AC, FL e mais [2,4]</li>
            <li><strong>HeartAssist</strong> (base): classificacao automatica de planos cardiacos fetais, medidas e Z-Scores [2,3,4]</li>
            <li><strong>Live ViewAssist</strong> (opcional): 39 planos continuos, 47 estruturas, 46 medidas em tempo real [5,6]</li>
            <li><strong>5D CNS+</strong> (opcional): 6 medidas em 3 cortes transversais do cerebro fetal [3,4]</li>
            <li><strong>5D NT</strong> (opcional): translucencia nucal automatica [4]</li>
            <li><strong>EzVolume</strong> (opcional): segmentacao 3D de placenta, liquido amniotico, face fetal com codigo de cores [3,4]</li>
            <li><strong>EzCheck</strong>: checklist ISUOG em tempo real — rastreia planos nao adquiridos [2,4]</li>
            <li><strong>Sonio</strong> (cloud, FDA-cleared): laudos IA para medicina fetal — parceria desde 2024 [5,6]</li>
          </ul>

          {/* BLOCO EXCLUSIVO */}
          <div className="excl">
            <span className="excl-badge">Observacao exclusiva — onsite This Is Us 2026</span>
            <div className="excl-t">STIC 5D — analise cardiaca fetal segmentada — sem liberacao ANVISA no Brasil</div>
            <p className="excl-p">Durante o congresso, foi demonstrada ao autor uma evolucao do STIC para analise cardiaca fetal — denominada internamente <strong>STIC 5D</strong> — ainda <strong>nao documentada publicamente</strong>. A partir do volume STIC, o sistema organiza a analise cardiaca fetal em <strong>4 dimensoes separadas e independentes</strong>:</p>
            <div className="dim-grid">
              <div className="dim-card"><div className="dim-t">1 · Sistole</div><div className="dim-d">analise do ciclo em fase sistolica</div></div>
              <div className="dim-card"><div className="dim-t">2 · Diastole</div><div className="dim-d">analise do ciclo em fase diastolica</div></div>
              <div className="dim-card"><div className="dim-t">3 · 4 camaras</div><div className="dim-d">camaras cardiacas — modulo autonomo</div></div>
              <div className="dim-card"><div className="dim-t">4 · Vasos da base</div><div className="dim-d">grandes vasos separados das camaras</div></div>
            </div>
            <p className="excl-p">O <strong>"5D"</strong> e exatamente isso: a <strong>quinta dimensao e o tempo</strong> — toda a estrutura e segmentada ao longo do ciclo cardiaco, permitindo analise independente de cada modulo em qualquer ponto temporal. Diferente do template unificado de 9 planos do 5D Heart Color convencional, no STIC 5D cada dimensao e um modulo autonomo de analise. O recurso esta sendo explorado por especialistas em ecocardiografia fetal e cardiologistas pediatricos.</p>
            <div className="anvisa">Segundo o representante Samsung presente no congresso, esta funcionalidade <strong>nao esta liberada para comercializacao no Brasil</strong> (pendente ANVISA) ao momento desta publicacao. Acompanhe atualizacoes em www.drmassuca.com.br/ia-medica</div>
          </div>

          <h3>GE Voluson Expert 22 — ecossistema quantitativo e ecocardiografia avancada</h3>
          <p>A GE adota uma abordagem modular com ferramentas especializadas por area anatomica, com enfase em quantificacao rigorosa e validacao cientifica publicada:</p>
          <ul>
            <li><strong>SonoLyst</strong> (Intelligent Ultrasound, UK): reconhecimento automatico de 21 planos ISUOG — melhoria de ate 65% na eficiencia [11]</li>
            <li><strong>SonoCNS</strong>: cerebro fetal automatico a partir de um volume 3D — reducao de 81% no tempo de exame [10,11]</li>
            <li><strong>fetalHQ / fetalHQ2</strong>: speckle-tracking cardiaco fetal, strain global (GSI), 24 segmentos — validado em multiplos estudos publicados [18,19,20]</li>
            <li><strong>fetalHS</strong>: screening cardiaco guiado por IA — 4 camaras, 3 vasos/traqueia e eixo cardiaco automaticos [21]</li>
            <li><strong>SonoNT / SonoIT</strong>: translucencia nucal e intracraniana semi-automaticas [10,11]</li>
            <li><strong>SonoVCADheart</strong>: 3 cliques para vistas cardiacas padronizadas a partir de STIC/eSTIC [9,21]</li>
            <li><strong>Graphicflow</strong>: trajetorias de celulas sanguineas em tempo real — sem equivalente no Z20 [8,9]</li>
          </ul>

          <h3>Comparativo — inteligencia artificial</h3>
          <div className="bars" ref={barsIaRef}>
            <div className="bar-row">
              <div className="bar-lbl"><span>Planos capturados automaticamente</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — Live ViewAssist (39 planos, continuo)</div><div className="bar-track"><div className="bar-fill bf-s" data-w="100">39 planos</div></div></div>
                <div><div className="bar-name">GE — SonoLyst (21 planos ISUOG)</div><div className="bar-track"><div className="bar-fill bf-g" data-w="54">21 planos</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Reducao de keystrokes (%)</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — 94% (data on file)</div><div className="bar-track"><div className="bar-fill bf-s" data-w="94">94%</div></div></div>
                <div><div className="bar-name">GE — 82% SonoCNS (peer-reviewed)</div><div className="bar-track"><div className="bar-fill bf-g" data-w="82">82%</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Estudos cientificos publicados validando IA — peer-reviewed</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — FDA data on file (K241971)</div><div className="bar-track"><div className="bar-fill bf-s" data-w="25">1 clearance FDA</div></div></div>
                <div><div className="bar-name">GE — PMC / MDPI / BMC / Springer</div><div className="bar-track"><div className="bar-fill bf-g" data-w="100">multiplos estudos</div></div></div>
              </div>
            </div>
          </div>

          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Recurso de IA</th><th className="s-col">Samsung HERA Z20</th><th className="g-col">GE Voluson Expert 22</th></tr>
              <tr><td>Planos automaticos</td><td className="win">39 planos (continuo) <span className="badge bw">&#10003;</span></td><td>21 planos ISUOG</td></tr>
              <tr><td>Reducao de keystrokes</td><td className="win">Ate 94% (data on file)</td><td>Ate 82% (SonoCNS validado)</td></tr>
              <tr><td>Eco fetal quantitativo</td><td>HeartAssist (medidas + Z-Scores)</td><td className="win">fetalHQ2: speckle-tracking, strain, GSI <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Validacao publicada</td><td>FDA K241971 (data on file)</td><td className="win">PMC / MDPI / BMC (peer-reviewed) <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Neurossonografia</td><td>5D CNS+ (6 medidas)</td><td className="win">SonoCNS: -81% tempo de exame <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Fluxo vascular 3D</td><td>MV-Flow, LumiFlow</td><td className="win">Graphicflow (trajetorias celulares) <span className="badge bw">&#10003;</span></td></tr>
              <tr><td>Cloud AI / laudos</td><td className="win">Sonio (FDA-cleared) <span className="badge bw">&#10003;</span></td><td>—</td></tr>
              <tr><td>STIC cardiaco</td><td>Mecanico</td><td className="win">eSTIC eletronico (~3s) <span className="badge bw">&#10003;</span></td></tr>
            </tbody>
          </table>

          {/* ══════════════════════════════════════ */}
          <h2>5. Display, ergonomia e experiencia de uso</h2>
          <p>O display e uma diferenca visivel e imediata. O Samsung Z20 oferece um <strong>monitor OLED de 27 polegadas com resolucao WQHD (2560x1440)</strong> — 57% maior que o HERA W10. O OLED proporciona pretos absolutos e contraste infinito, particularmente valioso para ecocardiografia fetal e renderizacao 3D/4D [1,4,36]. O GE Expert 22 utiliza um <strong>monitor LCD HDU de 23,8 polegadas em Full HD (1920x1080)</strong> — curiosamente um retrocesso em relacao ao E10, que tinha OLED [7,12,13].</p>
          <table className="ht">
            <tbody>
              <tr><th className="spec-col">Item</th><th className="s-col">Samsung HERA Z20</th><th className="g-col">GE Voluson Expert 22</th></tr>
              <tr><td>Monitor principal</td><td className="win">OLED 27" WQHD (2560x1440) <span className="badge bw">&#10003;</span></td><td>LCD 23,8" Full HD (1920x1080)</td></tr>
              <tr><td>Tipo de painel</td><td className="win">OLED — pretos absolutos</td><td>LCD HDU — 340 cd/m2, 1000:1</td></tr>
              <tr><td>Touchscreen</td><td className="win">15,6" com inclinacao <span className="badge bw">&#10003;</span></td><td>15,6" sem inclinacao</td></tr>
              <tr><td>Peso</td><td>Nao publicado</td><td>100 kg</td></tr>
              <tr><td>Perfis de usuario</td><td className="win">MyHERA™ — por usuario</td><td>Customizavel</td></tr>
              <tr><td>Teclado</td><td>Fixo</td><td className="win">Flutuante ±38°</td></tr>
            </tbody>
          </table>

          {/* ══════════════════════════════════════ */}
          <h2>6. Suporte e infraestrutura no Brasil</h2>

          <div className="bars" ref={barsSuporteRef}>
            <div className="bar-row">
              <div className="bar-lbl"><span>Garantia do equipamento</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — 5 anos</div><div className="bar-track"><div className="bar-fill bf-s" data-w="100">5 anos</div></div></div>
                <div><div className="bar-name">GE — 2 anos</div><div className="bar-track"><div className="bar-fill bf-g" data-w="40">2 anos</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Qualidade percebida do suporte tecnico no Brasil</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — feedback de campo</div><div className="bar-track"><div className="bar-fill bf-s" data-w="55">satisfatorio</div></div></div>
                <div><div className="bar-name">GE — feedback de campo</div><div className="bar-track"><div className="bar-fill bf-g" data-w="50">satisfatorio</div></div></div>
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-lbl"><span>Presenca historica e base instalada no Brasil</span></div>
              <div className="bar-group">
                <div><div className="bar-name">Samsung — crescente</div><div className="bar-track"><div className="bar-fill bf-s" data-w="40">em expansao</div></div></div>
                <div><div className="bar-name">GE — decadas de presenca</div><div className="bar-track"><div className="bar-fill bf-g" data-w="95">fabrica Contagem-MG desde 2010</div></div></div>
              </div>
            </div>
          </div>

          <p>A <strong>GE Healthcare</strong> tem vantagem historica inegavel em infraestrutura brasileira — fabrica em Contagem-MG (desde 2010), suporte 24/7 e decadas de relacionamento com o mercado [24]. A <strong>Samsung Healthcare</strong> opera via distribuidores autorizados: SonoImagem (SP) e JA Tecnologia Medica (GO) [22,23].</p>
          <p>No entanto, e necessario ser honesto sobre a realidade de campo: <strong>o suporte tecnico de ambas as empresas no Brasil e mediocre</strong> — e os dois estao proximos nesse quesito. O diferencial concreto que coloca a Samsung ligeiramente a frente neste criterio e a <strong>garantia de 5 anos</strong> contra os <strong>2 anos da GE</strong>. Para um investimento da ordem de R$ 500–600 mil, essa diferenca e economicamente relevante e nao pode ser ignorada na analise de custo total de ownership.</p>

          {/* ══════════════════════════════════════ */}
          <h2>7. O congresso This Is Us e a Escola NEXUS</h2>
          <p>O <strong>"This Is Us — Congresso Internacional de Ultrassonografia"</strong> e organizado pela Escola NEXUS, fundada em 2017 em Brasilia pelo Dr. Evaldo Trajano de Souza Silva Filho [27,28]. A escola carrega o Selo de Qualidade da SBUS [29] e mantem parceria internacional com a Fetal Medicine Barcelona para pos-graduacao em medicina fetal (800 horas, certificacao internacional e diploma reconhecido pelo MEC) [26]. Com mais de 2.600 profissionais formados, e um dos mais respeitados centros de formacao em ultrassonografia da America Latina.</p>

          {/* ══════════════════════════════════════ */}
          <h2>8. Calculadora de ROI — simule seu cenario</h2>
          <p>Ajuste os parametros abaixo com os numeros da sua clinica e veja quanto tempo cada aparelho leva para se pagar — e qual o retorno real ao longo de 5 e 10 anos.</p>

          <div style={{ margin: '1.5rem 0' }}>
            {/* SLIDERS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '.78rem', color: 'var(--text3)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Receita bruta por dia</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <input type="range" min="1500" max="6000" step="100" value={receitaDia} onChange={(e) => setReceitaDia(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '.88rem', fontWeight: 600, minWidth: 88, color: 'var(--text)' }}>{fmt(receitaDia)}</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '.78rem', color: 'var(--text3)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Dias uteis por mes</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <input type="range" min="15" max="25" step="1" value={diasUteis} onChange={(e) => setDiasUteis(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '.88rem', fontWeight: 600, minWidth: 88, color: 'var(--text)' }}>{diasUteis} dias</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '.78rem', color: 'var(--text3)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Custo operacional mensal</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <input type="range" min="5000" max="30000" step="1000" value={custoOp} onChange={(e) => setCustoOp(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '.88rem', fontWeight: 600, minWidth: 88, color: 'var(--text)' }}>{fmt(custoOp)}</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '.78rem', color: 'var(--text3)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Pro-labore do medico (mensal)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <input type="range" min="0" max="50000" step="500" value={proLabore} onChange={(e) => setProLabore(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '.88rem', fontWeight: 600, minWidth: 88, color: 'var(--text)' }}>{fmt(proLabore)}</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '.78rem', color: 'var(--text3)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Manutencao / seguro anual (% do aparelho)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <input type="range" min="0" max="4" step="0.1" value={manutPct} onChange={(e) => setManutPct(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '.88rem', fontWeight: 600, minWidth: 88, color: 'var(--text)' }}>{manutPct.toFixed(1).replace('.', ',')}%</span>
                </div>
              </div>
            </div>

            {/* CARDS GERAIS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: '1.5rem' }}>
              <div className="stat"><div className="stat-n" style={{ fontSize: '1.1rem' }}>{fmt(recMes)}</div><div className="stat-l">Receita mensal bruta</div></div>
              <div className="stat"><div className="stat-n" style={{ fontSize: '1.1rem' }}>{fmt(recAno)}</div><div className="stat-l">Receita anual bruta</div></div>
              <div className="stat"><div className="stat-n" style={{ fontSize: '1.1rem' }}>{fmtPct(margem)}</div><div className="stat-l">Margem liquida media</div></div>
            </div>

            {/* CARDS POR APARELHO */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1.5rem' }}>
              {/* SAMSUNG */}
              <div style={{ border: '1.5px solid #185FA5', borderRadius: 'var(--radius-lg)', padding: 16, background: '#E6F1FB' }}>
                <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#0C447C', marginBottom: 12, letterSpacing: '.02em' }}>Samsung HERA Z20 — R$ 500.000</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div><div style={{ fontSize: '.68rem', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '.04em' }}>Manutencao/mes</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#0C447C' }}>{fmt(manS)}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '.04em' }}>Lucro liq./mes</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#0C447C' }}>{fmt(lucS)}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '.04em' }}>Payback</div><div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#185FA5' }}>{payS ? payS + ' meses' : '—'}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '.04em' }}>ROI 5 anos</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#0C447C' }}>{roi5S !== null ? fmtPct(roi5S) : '—'}</div></div>
                  <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: '.68rem', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '.04em' }}>ROI 10 anos</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#0C447C' }}>{roi10S !== null ? fmtPct(roi10S) : '—'}</div></div>
                </div>
              </div>
              {/* GE */}
              <div style={{ border: '1.5px solid #534AB7', borderRadius: 'var(--radius-lg)', padding: 16, background: '#EEEDFE' }}>
                <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#26215C', marginBottom: 12, letterSpacing: '.02em' }}>GE Voluson Expert 22 — R$ 650.000</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div><div style={{ fontSize: '.68rem', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '.04em' }}>Manutencao/mes</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#26215C' }}>{fmt(manG)}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '.04em' }}>Lucro liq./mes</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#26215C' }}>{fmt(lucG)}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '.04em' }}>Payback</div><div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#534AB7' }}>{payG ? payG + ' meses' : '—'}</div></div>
                  <div><div style={{ fontSize: '.68rem', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '.04em' }}>ROI 5 anos</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#26215C' }}>{roi5G !== null ? fmtPct(roi5G) : '—'}</div></div>
                  <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: '.68rem', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '.04em' }}>ROI 10 anos</div><div style={{ fontWeight: 600, fontSize: '.92rem', color: '#26215C' }}>{roi10G !== null ? fmtPct(roi10G) : '—'}</div></div>
                </div>
              </div>
            </div>

            {/* LEGENDA */}
            <div style={{ display: 'flex', gap: 20, fontSize: '.78rem', marginBottom: '.8rem', color: 'var(--text3)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: '#378ADD', display: 'inline-block' }}></span>Samsung HERA Z20</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: '#7F77DD', display: 'inline-block' }}></span>GE Voluson Expert 22</span>
            </div>

            {/* GRAFICO BARRAS */}
            <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 8 }}>Comparativo financeiro em 5 anos</div>
            <div style={{ position: 'relative', width: '100%', height: 280, marginBottom: '1.5rem' }}>
              <canvas ref={roiBarRef}></canvas>
            </div>

            {/* GRAFICO LINHA */}
            <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 8 }}>Lucro acumulado vs. investimento — 60 meses</div>
            <div style={{ position: 'relative', width: '100%', height: 280 }}>
              <canvas ref={roiLineRef}></canvas>
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          <h2>9. Veredicto</h2>

          <p>Estes dois aparelhos nao sao intercambiaveis — eles servem perfis clinicos diferentes.</p>

          <div className="verd">
            <div className="vc vc-s">
              <div className="vc-t">Samsung HERA Z20</div>
              <div className="vc-sub">Ideal para: alto volume de morfologia fetal, reducao de fadiga, quem busca IA continua sem interacao.</div>
              <ul>
                <li>&#10003; Live ViewAssist — IA mais ambiciosa do mercado</li>
                <li>&#10003; OLED 27" WQHD — melhor display do segmento</li>
                <li>&#10003; CPU Tiger Lake 11a Gen — mais moderna que a GE</li>
                <li>&#10003; RAM 32 GB — o dobro da GE (16 GB)</li>
                <li>&#10003; Touchscreen com inclinacao</li>
                <li>&#10003; Garantia 5 anos — 2,5x maior que a GE</li>
                <li>&#10003; Banda 1–10 MHz — maior versatilidade clinica</li>
                <li>&#10003; Integracao Sonio cloud (FDA-cleared)</li>
                <li>&#10007; Recursos-chave sao opcionais (custo adicional)</li>
                <li>&#10007; STIC mecanico (nao eletronico)</li>
                <li>&#10007; Specs nao publicados oficialmente</li>
              </ul>
            </div>
            <div className="vc vc-g">
              <div className="vc-t">GE Voluson Expert 22</div>
              <div className="vc-sub">Ideal para: ecocardiografia fetal avancada, medicina fetal de alto risco, quantificacao rigorosa.</div>
              <ul>
                <li>&#10003; fetalHQ2: speckle-tracking unico no mercado</li>
                <li>&#10003; eSTIC eletronico (~3s) — padrao-ouro em eco fetal</li>
                <li>&#10003; Graphicflow — hemodinamica fetal inedita</li>
                <li>&#10003; Rede de suporte Brasil consolidada (fabrica MG)</li>
                <li>&#10003; Specs publicados e auditaveis</li>
                <li>&#10007; Monitor LCD (retrocesso vs E10 com OLED)</li>
                <li>&#10007; 100 kg — o mais pesado do segmento</li>
                <li>&#10007; IA exige mais interacao do operador</li>
              </ul>
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* SECAO DE OPINIAO DO DR. MASSUCA */}
          <div className="opinion">
            <span className="op-badge">Opiniao do autor — Dr. Massuca</span>
            <div className="op-t">Minha experiencia hands-on com os dois aparelhos</div>

            <div style={{ background: '#fff3cd', borderLeft: '4px solid #BA7517', borderRadius: '0 8px 8px 0', padding: '14px 18px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#633806', fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Declaracao de vies</strong>
              <p style={{ margin: '.6rem 0 0', fontSize: '.9rem', color: '#4a3800' }}>Sou usuario GE ha mais de 20 anos. Trabalho com aparelhos GE ha muito tempo e tenho profunda familiaridade com a plataforma Voluson. Isso inevitavelmente cria um vies de experiencia — especialmente em knobologia e workflow. Este review foi construido com o compromisso de honestidade tecnica, mas o leitor deve ter esse contexto em mente ao ponderar minhas impressoes.</p>
            </div>

            <h3 style={{ marginTop: '1rem' }}>Imagem B-mode</h3>
            <p>Em modo B, ambos os aparelhos sao muito parecidos entre si — e nao apresentam uma evolucao expressiva em relacao as versoes intermediarias anteriores, como o Voluson S10. A qualidade de imagem B-mode pura nao e onde esses equipamentos se diferenciam de forma marcante.</p>
            <p>A tela maior do GE faz diferenca real na pratica clinica. Mas o OLED do Samsung entrega algo que o LCD nao consegue replicar: contraste superior, com realces de brilho que tornam a experiencia visualmente mais confortavel — desde que o operador tenha o cuidado de calibrar adequadamente o brilho. Para quem passa 10 horas por dia na frente de um monitor de ultrassom, isso nao e detalhe.</p>

            <h3 style={{ marginTop: '1.5rem' }}>Knobologia e ergonomia</h3>
            <p>Aqui meu vies fica mais evidente — e preciso ser honesto sobre isso. No GE, a experiencia e surreal: minhas maos vao diretamente para os controles como memoria muscular, sem qualquer esforco cognitivo. O workflow acelera de forma expressiva justamente por esse fato. Nao e que o Samsung seja ruim — e que o GE, para mim, e invisivel.</p>
            <p>Em relacao ao controle motorizado de altura e lateralidade, ambos os aparelhos sao excelentes. O unico ponto negativo que identifiquei no GE foi o touchscreen auxiliar sem controle de inclinacao — o Samsung, ao contrario, <strong>tem inclinacao no touchscreen de 15,6"</strong>, o que representa um ponto a favor da ergonomia. Isso foi confirmado pelo representante Samsung apos o congresso.</p>
            <p>Sobre os transdutores: o eM6C G3 do GE tem o mesmo peso do probe mecanico anterior — sem regressao. O CMV1-10 do Samsung me pareceu ligeiramente mais leve. Em ambos, o grip e bom e nao gerou desconforto durante o manuseio.</p>

            <h3 style={{ marginTop: '1.5rem' }}>Inteligencia artificial na pratica — o que realmente importa</h3>
            <p>Em termos de velocidade e processamento, incluindo as funcoes de IA, os dois aparelhos sao surpreendentemente proximos na experiencia subjetiva. Nao percebi diferenca expressiva de performance entre eles.</p>
            <p>O que mais me impressionou em ambos os aparelhos — e que considero o avanco mais relevante da IA aplicada ao ultrassom ate agora — nao foram as medidas automaticas, nem a renderizacao, nem os ajustes finos. Foi o <strong>checklist com validacao de imagem em tempo real</strong>: o sistema avisa quando um plano obrigatorio ainda nao foi adquirido e, ao adquiri-lo, avalia se a imagem esta tecnicamente correta — se a janela de 4 camaras, por exemplo, contem todos os elementos que deveria conter. Isso existe nos dois aparelhos. E e o tipo de ferramenta que muda o padrao de qualidade diagnostica de forma silenciosa e consistente.</p>
            <p>O auto ajuste automatico funciona razoavelmente. Mas o ultrassonografista experiente vai sempre se sentir impelido a fazer micro ajustes de knobologia — e esta certo em faze-lo. A IA vai melhorar muito com o tempo, mas nao dispensa o especialista. Pelo contrario, amplifica o que ele ja faz bem.</p>
            <p>O Samsung tem um diferencial que nao consegui explorar com profundidade por falta de tempo com o aparelho: a possibilidade de <strong>criar e customizar seus proprios checklists e workflows</strong>. Para quem tiver acesso prolongado ao equipamento, isso pode ser um diferenciador real. Fica o registro.</p>

            <h3 style={{ marginTop: '1.5rem' }}>Renderizacao 3D/4D</h3>
            <p>Sem diferenca visual expressiva entre os dois — e digo isso com franqueza. A evolucao nessa area tem sido, em grande parte, de marketing. O Samsung entrega uma melhoria de textura em imagens 3D processada no proprio aparelho via IA — algo conceitualmente similar ao que modelos como o Stable Diffusion fazem com imagens estaticas (tenho inclusive uma secao dedicada a isso em <a href="https://www.drmassuca.com.br/ia-medica/stable-diffusion-3d-fetal" target="_blank" rel="noopener noreferrer">drmassuca.com.br</a>). E um incremento real, mas nao um salto.</p>
            <p>O compartilhamento de imagens com a paciente via celular existe nos dois aparelhos. E uma funcionalidade simpatica, mas nao e o que vai definir o futuro da IA em ultrassom.</p>

            <h3 style={{ marginTop: '1.5rem' }}>O STIC 5D do Samsung</h3>
            <p>Muito nova para opinar com profundidade. Aguardo resposta da Samsung com informacoes adicionais antes de emitir um parecer tecnico. O que vi no congresso foi instigante — mas preciso de mais dados.</p>

            <div style={{ background: '#EAF3DE', borderLeft: '4px solid #3B6D11', borderRadius: '0 8px 8px 0', padding: '14px 18px', marginTop: '1.5rem' }}>
              <strong style={{ color: '#27500A', fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Nota de transparencia editorial</strong>
              <p style={{ margin: '.6rem 0 0', fontSize: '.88rem', color: '#2a4a10' }}>Este review sera enviado a ambas as empresas — GE Healthcare e Samsung Medison — antes da publicacao definitiva. A GE abriu completamente o acesso ao hardware do aparelho exposto no congresso. Os specs do Samsung foram verificados e confirmados junto a empresa antes da autorizacao oficial de divulgacao — a fonte nao e identificada nesta publicacao. Em ambos os casos, os dados foram checados diretamente nas telas dos aparelhos.</p>
              <p style={{ margin: '.6rem 0 0', fontSize: '.88rem', color: '#2a4a10' }}>Fator determinante na avaliacao final: <strong>garantia Samsung de 5 anos</strong> vs. <strong>garantia GE de 2 anos</strong> — para um investimento de R$ 500–600 mil, essa diferenca representa economia real em custo total de ownership. A conclusao final sobre qual aparelho o autor escolheria sera publicada apos o retorno formal das empresas.</p>
              <p style={{ margin: '.6rem 0 0', fontSize: '.88rem', color: '#2a4a10' }}>Identificou algum erro tecnico? Entre em contato: <a href="https://www.drmassuca.com.br" target="_blank" rel="noopener noreferrer" style={{ color: '#3B6D11' }}>drmassuca.com.br</a></p>
            </div>
          </div>

          {/* REFERENCIAS */}
          <div className="ref-sec">
            <h2>Referencias (Vancouver)</h2>
            <ol className="ref-list">
              <li>Samsung Medison. Samsung Unveils Premium OB/GYN Ultrasound System 'HERA Z20' in ISUOG World Congress 2024. <a href="https://news.samsung.com/global/samsung-unveils-premium-ob-gyn-ultrasound-system-hera-z20-in-isuog-world-congress-2024" target="_blank" rel="noopener noreferrer">Samsung Global Newsroom, 2024.</a></li>
              <li>Samsung Healthcare USA. Z20 Women's Health Ultrasound. <a href="https://usa.samsunghealthcare.com/ultrasound/womens-health/z20" target="_blank" rel="noopener noreferrer">usa.samsunghealthcare.com</a></li>
              <li>Samsung Healthcare. HERA Z20 – Features. <a href="http://previous.samsunghealthcare.com/en/ultrasound/womens-health/hera-z20/features" target="_blank" rel="noopener noreferrer">samsunghealthcare.com</a></li>
              <li>Samsung Healthcare. HERA Z20 – Overview. <a href="https://previous.samsunghealthcare.com/en/ultrasound/womens-health/hera-z20/overview" target="_blank" rel="noopener noreferrer">samsunghealthcare.com</a></li>
              <li>AI Insider. Samsung Introduces AI-Powered Ob-Gyn Ultrasound. 2025. <a href="https://theaiinsider.tech/2025/01/29/samsung-introduces-ai-powered-ob-gyn-ultrasound-for-tough-clinical-challenges/" target="_blank" rel="noopener noreferrer">theaiinsider.tech</a></li>
              <li>Samsung Healthcare USA. Z20: A Revolutionary Leap at SMFM 2025. <a href="https://usa.samsunghealthcare.com/news-center/ultrasound/womens-health/introducing-the-z20" target="_blank" rel="noopener noreferrer">samsunghealthcare.com</a></li>
              <li>GE HealthCare. Voluson Expert 22 – Datasheet DOC2668404. 2022. <a href="https://let.web-sme-csp.com/wp-content/uploads/2022/09/Voluson-Expert-22-Datasheet__DOC2668404_JB19599XX.pdf" target="_blank" rel="noopener noreferrer">PDF oficial GE HealthCare</a></li>
              <li>GE HealthCare. Voluson Expert 22 Ultrasound System. <a href="https://gehealthcare-ultrasound.com/en/voluson-family/voluson-expert-22/" target="_blank" rel="noopener noreferrer">gehealthcare-ultrasound.com</a></li>
              <li>GE HealthCare. Voluson Expert 22 – Imaging Capabilities. <a href="https://www.gehealthcare.com/products/ultrasound/voluson/voluson-expert22/imaging-capabilities" target="_blank" rel="noopener noreferrer">gehealthcare.com</a></li>
              <li>GE HealthCare. Voluson Expert 22 – Workflow Efficiency. <a href="https://www.gehealthcare.com/products/ultrasound/voluson/voluson-expert22/workflow-efficiency" target="_blank" rel="noopener noreferrer">gehealthcare.com</a></li>
              <li>GE Voluson Club. AI Innovations. <a href="https://www.volusonclub.net/us/ai-innovations" target="_blank" rel="noopener noreferrer">volusonclub.net</a></li>
              <li>Heart Medical LLC. GE Voluson Expert 22 Review. <a href="https://www.heartmedical.com/blogs/news/ge-voluson-expert-22-review-features-probes-and-clinical-value" target="_blank" rel="noopener noreferrer">heartmedical.com</a></li>
              <li>ICE Community. GE Healthcare Voluson Expert 22. <a href="https://theicecommunity.com/ge-healthcare-voluson-expert-22/" target="_blank" rel="noopener noreferrer">theicecommunity.com</a></li>
              <li>AuntMinnie. GE introduces Voluson Expert 22. <a href="https://www.auntminnie.com/clinical-news/ultrasound/article/15631487/ge-introduces-voluson-expert-22-ultrasound-scanner" target="_blank" rel="noopener noreferrer">auntminnie.com</a></li>
              <li>Diagnostic Imaging. GE Healthcare Launches Voluson Expert 22. <a href="https://www.diagnosticimaging.com/view/ge-healthcare-launches-premium-ultrasound-device-with-voluson-expert-22" target="_blank" rel="noopener noreferrer">diagnosticimaging.com</a></li>
              <li>Medical Device Network. GE Healthcare introduces Voluson Expert 22. <a href="https://www.medicaldevice-network.com/news/ge-healthcare-voluson-expert-22-ultrasound/" target="_blank" rel="noopener noreferrer">medicaldevice-network.com</a></li>
              <li>RadAI Slice. HERA Z20 – FDA 510(k) K241971. <a href="https://xrayinterpreter.com/fda/K241971" target="_blank" rel="noopener noreferrer">xrayinterpreter.com</a></li>
              <li>Makikallio K et al. Reproducibility in Fetal Cardiac Analysis with FetalHQ. PMC. 2025. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12112619/" target="_blank" rel="noopener noreferrer">PMC12112619</a></li>
              <li>Merz E et al. Midtrimester Fetal Heart with FetalHQ. J Clin Med. 2026;15(4):1352. <a href="https://www.mdpi.com/2077-0383/15/4/1352" target="_blank" rel="noopener noreferrer">mdpi.com</a></li>
              <li>Zhang Y et al. Fetal heart in growth restriction using fetal HQ. BMC Pregnancy Childbirth. 2024. <a href="https://link.springer.com/article/10.1186/s12884-024-06966-2" target="_blank" rel="noopener noreferrer">springer.com</a></li>
              <li>GE Voluson Club. Fetal Heart. <a href="https://www.volusonclub.net/emea/fetal-heart" target="_blank" rel="noopener noreferrer">volusonclub.net</a></li>
              <li>Samsung Newsroom Brasil. Novo sistema Samsung chega ao Brasil. <a href="https://news.samsung.com/br/com-foco-em-ginecologia-e-obstetricia-novo-sistema-de-ultrassom-da-samsung-chega-ao-brasil" target="_blank" rel="noopener noreferrer">samsung.com/br</a></li>
              <li>SonoImagem Sistemas Medicos. Ultrassom Samsung. <a href="https://www.sonoimagem.com/ultrassom-samsung" target="_blank" rel="noopener noreferrer">sonoimagem.com</a></li>
              <li>GE HealthCare Brasil. Sobre a GE Healthcare. <a href="https://loja.gehealthcare.com.br/pt-br/suporte/sobre-nos" target="_blank" rel="noopener noreferrer">gehealthcare.com.br</a></li>
              <li>Siemens Healthineers Brasil. Parceria Escola Nexus. <a href="https://www.siemens-healthineers.com/br/news/parceria-escola-nexus" target="_blank" rel="noopener noreferrer">siemens-healthineers.com</a></li>
              <li>Escola NEXUS. Curso Medicina Fetal Barcelona. <a href="https://conteudo.nexusultrassonografia.com.br/curso-medicina-fetal" target="_blank" rel="noopener noreferrer">nexusultrassonografia.com.br</a></li>
              <li>Escola NEXUS. Conheca a Nexus. <a href="https://nexusultrassonografia.com.br/conheca-a-nexus/" target="_blank" rel="noopener noreferrer">nexusultrassonografia.com.br</a></li>
              <li>CICB. This Is Us – Congresso Internacional de Ultrassonografia. 2023. <a href="https://cicb.com.br/2023/03/21/this-is-us-congresso-internacional-de-ultrassonografia/" target="_blank" rel="noopener noreferrer">cicb.com.br</a></li>
              <li>SBUS. Selo de Qualidade para Escolas de US. <a href="https://sbus.org.br/selo-de-qualidade-para-escolas-de-us/" target="_blank" rel="noopener noreferrer">sbus.org.br</a></li>
              <li>MedicalExpo. HERA Z20 – Samsung Healthcare Germany. <a href="https://www.medicalexpo.com/prod/samsung-healthcare-germany/product-70129-1172903.html" target="_blank" rel="noopener noreferrer">medicalexpo.com</a></li>
              <li>Bimedis. GE Voluson Expert 22. <a href="https://bimedis.com/ge-voluson-expert-22-m586509" target="_blank" rel="noopener noreferrer">bimedis.com</a></li>
              <li>Korea Biomed. Samsung Medison at KSUOG. <a href="https://www.koreabiomed.com/news/articleView.html?idxno=25388" target="_blank" rel="noopener noreferrer">koreabiomed.com</a></li>
              <li>Samsung Medison. Leads Women's Health at ISUOG 2025. <a href="https://news.samsung.com/global/samsung-medison-leads-womens-health-with-life-cycle-ultrasound-solutions-at-isuog-2025" target="_blank" rel="noopener noreferrer">samsung.com/global</a></li>
              <li>Medical Device Developments. Samsung unveils HERA Z20. <a href="https://www.medicaldevice-developments.com/news/samsung-unveils-hera-z20-premium-ultrasound-system/" target="_blank" rel="noopener noreferrer">medicaldevice-developments.com</a></li>
              <li>Boston Imaging. Samsung Z20 at SMFM 2025. <a href="https://www.bostonimaging.com/press-releases/womens-health/z20" target="_blank" rel="noopener noreferrer">bostonimaging.com</a></li>
              <li>Samsung Medison. Samsung Showcases Enhanced Portfolio at RSNA 2024. <a href="https://news.samsung.com/global/samsung-showcases-enhanced-portfolio-at-rsna-2024" target="_blank" rel="noopener noreferrer">samsung.com/global, 2024.</a></li>
            </ol>
          </div>

          <footer className="art-footer">
            <span>Dr. Massuca — drmassuca.com.br/ia-medica</span>
            <span>Ultima atualizacao: 30 mar 2026</span>
          </footer>

        </div>{/* /art-body */}
      </div>{/* /wrap */}
    </div>
  );
}
