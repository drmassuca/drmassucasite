import { useEffect, lazy, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import Header from './components/header';
import Footer from './components/footer';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import LinkOptimizer from './components/LinkOptimizer';
// import PerformanceMonitoring from './components/PerformanceMonitoring';

// Lazy load para TODAS as páginas (incluindo as antes estáticas)
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const ExamTemplate = lazy(() => import('./pages/exam-template'));

/* Lazy load das páginas principais */
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Exams = lazy(() => import('./pages/exams'));
const PatientArea = lazy(() => import('./pages/patient-area'));
const ForDoctors = lazy(() => import('./pages/for-doctors'));
const Testimonials = lazy(() => import('./pages/testimonials'));
const Contact = lazy(() => import('./pages/contact'));
const Ultrassom3D = lazy(() => import('./pages/ultrassom-3d'));

/* >>> NOVO: página-mestra do FAQ em lazy load (resolve para src/pages/faq/index.jsx) */
const FaqIndex = lazy(() => import('./pages/faq'));

/* >>> NOVO: rotas das 48 subpáginas do FAQ (geradas no pacote) */
import { faqRouteObjects } from './routes/faqRoutes.jsx';

/* >>> IA MÉDICA: Lazy load das páginas de IA */
const IAMedica = lazy(() => import('./pages/ia-medica'));
const StableDiffusion3DFetal = lazy(() => import('./pages/ia-medica/stable-diffusion-3d-fetal'));
const SDInstalacao = lazy(() => import('./pages/ia-medica/stable-diffusion-3d-fetal/instalacao'));
const SDConfiguracao = lazy(() => import('./pages/ia-medica/stable-diffusion-3d-fetal/configuracao'));
const SDExemplos = lazy(() => import('./pages/ia-medica/stable-diffusion-3d-fetal/exemplos'));
const SDProblemas = lazy(() => import('./pages/ia-medica/stable-diffusion-3d-fetal/problemas'));

/* Lazy load para TODOS os exames - reduz bundle inicial */
const ObstetricoDeRotina = lazy(() => import('./pages/exam-details/obstetrico-de-rotina'));
const MorfologicoPrimeiroTrimestre = lazy(
  () => import('./pages/exam-details/morfologico-primeiro-trimestre')
);
const MorfologicoSegundoTrimestre = lazy(
  () => import('./pages/exam-details/morfologico-segundo-trimestre')
);
const DopplerObstetrico = lazy(() => import('./pages/exam-details/doppler-obstetrico'));
const EcocardiografiaFetal = lazy(() => import('./pages/exam-details/ecocardiografia-fetal'));
const Endovaginal = lazy(() => import('./pages/exam-details/endovaginal'));
const Mamas = lazy(() => import('./pages/exam-details/mamas'));
const PelvicoViaAbdominal = lazy(() => import('./pages/exam-details/pelvico-via-abdominal'));
const PesquisaDeEndometrioseComPreparo = lazy(
  () => import('./pages/exam-details/pesquisa-de-endometriose-com-preparo')
);
const MonitorizacaoDaOvulacao = lazy(
  () => import('./pages/exam-details/monitorizacao-da-ovulacao')
);
const Total = lazy(() => import('./pages/exam-details/total'));
const Superior = lazy(() => import('./pages/exam-details/superior'));
const Inferior = lazy(() => import('./pages/exam-details/inferior'));
const ParedeAbdominal = lazy(() => import('./pages/exam-details/parede-abdominal'));
const ViaAbdominal = lazy(() => import('./pages/exam-details/via-abdominal'));
const ViaTransretal = lazy(() => import('./pages/exam-details/via-transretal'));
const PesquisaDePuberdadePrecoce = lazy(
  () => import('./pages/exam-details/pesquisa-de-puberdade-precoce')
);
const Transfontanela = lazy(() => import('./pages/exam-details/transfontanela'));
const UltrassonografiaDeTireoideComOuSemDoppler = lazy(
  () => import('./pages/exam-details/ultrassonografia-de-tireoide-com-ou-sem-doppler')
);
const UltrassonografiaCervicalComOuSemDoppler = lazy(
  () => import('./pages/exam-details/ultrassonografia-cervical-com-ou-sem-doppler')
);
const UltrassonografiaBolsaEscrotalETesticulos = lazy(
  () => import('./pages/exam-details/ultrassonografia-bolsa-escrotal-e-testiculos')
);
const UltrassonografiaRinsEViasUrinarias = lazy(
  () => import('./pages/exam-details/ultrassonografia-rins-e-vias-urinarias')
);
const UltrassonografiaPartesMoles = lazy(
  () => import('./pages/exam-details/ultrassonografia-partes-moles')
);
const UltrassonografiaAvaliacaoPreCirurgiaPlastica = lazy(
  () => import('./pages/exam-details/ultrassonografia-avaliacao-pre-cirurgia-plastica')
);

/* ────────────────────────── GA page-view helper ────────────────────────── */
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-T14CXNTC7V', { page_path: location.pathname });
    }
  }, [location]);
}

function App() {
  usePageTracking();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bgImage="url('/assets/texture_olive_dark_seamless.webp')"
      bgRepeat="repeat"
      bgSize="auto"
      bgAttachment="fixed"
    >
      <Header />

      <Box flex="1" p={4}>
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
              color="white"
            >
              <Box
                w="40px"
                h="40px"
                border="3px solid rgba(255,255,255,0.3)"
                borderTopColor="white"
                borderRadius="50%"
                animation="spin 1s linear infinite"
              />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/exames" element={<Exams />} />
            <Route path="/area-do-paciente" element={<PatientArea />} />
            <Route path="/para-medicos" element={<ForDoctors />} />
            <Route path="/depoimentos" element={<Testimonials />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/ultrassom-3d" element={<Ultrassom3D />} />

            {/* >>> NOVAS ROTAS DO FAQ */}
            <Route path="/faq" element={<FaqIndex />} />
            {faqRouteObjects.map(r => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            {/* >>> ROTAS DA IA MÉDICA */}
            <Route path="/ia-medica" element={<IAMedica />} />
            <Route path="/ia-medica/stable-diffusion-3d-fetal" element={<StableDiffusion3DFetal />} />
            <Route path="/ia-medica/stable-diffusion-3d-fetal/instalacao" element={<SDInstalacao />} />
            <Route path="/ia-medica/stable-diffusion-3d-fetal/configuracao" element={<SDConfiguracao />} />
            <Route path="/ia-medica/stable-diffusion-3d-fetal/exemplos" element={<SDExemplos />} />
            <Route path="/ia-medica/stable-diffusion-3d-fetal/problemas" element={<SDProblemas />} />

            {/* Rotas estáticas antigas (podem ser eliminadas futuramente) */}
            <Route path="/exames/obstetrico-de-rotina" element={<ObstetricoDeRotina />} />
            <Route
              path="/exames/morfologico-primeiro-trimestre"
              element={<MorfologicoPrimeiroTrimestre />}
            />
            <Route
              path="/exames/morfologico-segundo-trimestre"
              element={<MorfologicoSegundoTrimestre />}
            />
            <Route path="/exames/doppler-obstetrico" element={<DopplerObstetrico />} />
            <Route path="/exames/ecocardiografia-fetal" element={<EcocardiografiaFetal />} />
            <Route path="/exames/endovaginal" element={<Endovaginal />} />
            <Route path="/exames/mamas" element={<Mamas />} />
            <Route path="/exames/pelvico-via-abdominal" element={<PelvicoViaAbdominal />} />
            <Route
              path="/exames/pesquisa-de-endometriose-com-preparo"
              element={<PesquisaDeEndometrioseComPreparo />}
            />
            <Route path="/exames/monitorizacao-da-ovulacao" element={<MonitorizacaoDaOvulacao />} />
            <Route path="/exames/total" element={<Total />} />
            <Route path="/exames/superior" element={<Superior />} />
            <Route path="/exames/inferior" element={<Inferior />} />
            <Route path="/exames/parede-abdominal" element={<ParedeAbdominal />} />
            <Route path="/exames/via-abdominal" element={<ViaAbdominal />} />
            <Route path="/exames/via-transretal" element={<ViaTransretal />} />
            <Route
              path="/exames/pesquisa-de-puberdade-precoce"
              element={<PesquisaDePuberdadePrecoce />}
            />
            <Route path="/exames/transfontanela" element={<Transfontanela />} />
            <Route
              path="/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler"
              element={<UltrassonografiaDeTireoideComOuSemDoppler />}
            />
            <Route
              path="/exames/ultrassonografia-cervical-com-ou-sem-doppler"
              element={<UltrassonografiaCervicalComOuSemDoppler />}
            />
            <Route
              path="/exames/bolsa-escrotal-e-testiculos"
              element={<UltrassonografiaBolsaEscrotalETesticulos />}
            />
            <Route
              path="/exames/rins-e-vias-urinarias"
              element={<UltrassonografiaRinsEViasUrinarias />}
            />
            <Route path="/exames/partes-moles" element={<UltrassonografiaPartesMoles />} />
            <Route
              path="/exames/avaliacao-pre-cirurgia-plastica"
              element={<UltrassonografiaAvaliacaoPreCirurgiaPlastica />}
            />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Nova rota dinâmica */}
            <Route path="exams/:slug" element={<ExamTemplate />} />
          </Routes>
        </Suspense>
      </Box>

      {/* ───────────── Banner de cookies com contraste AA ───────────── */}
      <CookieConsent
        location="bottom"
        cookieName="drmassuca_consent"
        buttonText="Aceitar"
        declineButtonText="Recusar"
        enableDeclineButton
        overlay
        style={{
          background: '#0f3d2e', // verde escuro Massuca
          color: '#ffffff',
          boxShadow: '0 -2px 12px rgba(0,0,0,.25)',
          fontSize: 14,
          lineHeight: 1.4,
          padding: '14px 18px',
        }}
        contentStyle={{
          margin: '0 auto',
          maxWidth: 1200,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        buttonStyle={{
          background: '#d4af37', // dourado Massuca
          color: '#0f3d2e',
          borderRadius: 10,
          padding: '10px 16px',
          fontWeight: 700,
          border: 'none',
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#ffffff',
          borderRadius: 10,
          padding: '10px 16px',
          border: '1px solid rgba(255,255,255,.5)',
          fontWeight: 600,
        }}
        onAccept={() => {
          window.__acceptAnalytics?.();
        }}
        onDecline={() => {
          window.__denyAnalytics?.();
        }}
        expires={180}
      >
        <span style={{ fontWeight: 700 }}>Usamos cookies</span>&nbsp; para melhorar sua experiência,
        medir estatísticas e otimizar nossos serviços. Você pode aceitar ou recusar.
        <a
          href="/politica-de-privacidade"
          style={{ color: '#d4af37', textDecoration: 'underline', marginLeft: 8 }}
        >
          Saiba mais
        </a>
      </CookieConsent>

      <Footer />
      <AdvancedAnalytics />
      <LinkOptimizer />
    </Box>
  );
}

export default App;
