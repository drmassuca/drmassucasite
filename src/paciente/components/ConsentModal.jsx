import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { acceptConsent } from '../../lib/memo3d/api';
import { CONSENT_VERSION } from '../consent-version';
import '../paciente.css';

/**
 * Termo de uso e consentimento Memo3D.
 *
 * Versão fica em ../consent-version.js — bumpar lá força re-aceite.
 * Conta.jsx checa se consent_lgpd_version === CONSENT_VERSION; se não, exibe
 * este modal de novo mesmo que a paciente já tenha aceitado uma versão antiga.
 */
export default function ConsentModal({ onAccepted }) {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleAccept() {
    if (!agreed) return;
    setSubmitting(true);
    setError(null);
    try {
      await acceptConsent(CONSENT_VERSION);
      onAccepted?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="consent-modal">
      <div className="consent-card">
        <h2>
          <ShieldCheck
            size={22}
            style={{ verticalAlign: 'middle', marginRight: 8, color: '#d4af37' }}
          />
          Termo de uso e consentimento
        </h2>
        <p>
          Antes de visualizar suas memórias, leia e aceite o termo abaixo (LGPD — Lei nº
          13.709/2018):
        </p>

        <div className="consent-text">
          <p>
            <strong>Finalidade.</strong> Este serviço hospeda imagens e vídeos do seu exame de
            ultrassom para sua visualização e compartilhamento com sua família, durante o período da
            sua assinatura.
          </p>
          <p>
            <strong>Natureza dos dados — caráter recreativo.</strong> As mídias hospedadas no Memo3D
            são memórias estéticas da gestação, oferecidas como recordação e recreação. Não
            constituem laudo médico, diagnóstico, nem qualquer documento de natureza clínica — o
            laudo do seu exame é entregue separadamente pelo médico.
          </p>
          <p>
            <strong>Armazenamento.</strong> Os arquivos ficam em servidores da Cloudflare (R2 e
            Stream), com criptografia em trânsito (TLS) e em repouso. Você consente que esses dados
            podem ser armazenados internacionalmente sob garantias contratuais (Standard Contractual
            Clauses).
          </p>
          <p>
            <strong>Acesso.</strong> Apenas você e quem você compartilhar pelo botão
            &ldquo;Compartilhar com família&rdquo; (com link expirando em 24h) pode visualizar.
          </p>
          <p>
            <strong>Retenção e renovação.</strong> A assinatura tem duração de{' '}
            <strong>12 meses</strong>, podendo ser renovada por sua iniciativa. Encerrado o período
            sem renovação, com 30 dias de carência, os arquivos são apagados em definitivo.
          </p>
          <p>
            <strong>Seus direitos.</strong> Você pode pedir acesso, correção ou exclusão a qualquer
            momento via WhatsApp da clínica.
          </p>

          <h3 className="consent-section-title">
            Recursos de Inteligência Artificial — uso opcional e estético
          </h3>
          <p>
            O Memo3D oferece, como opção, uma ferramenta de melhoria de imagens com inteligência
            artificial. Ao optar por usar essa função, você compreende e aceita o seguinte:
          </p>
          <p>
            <strong>Caráter estético, não médico.</strong> As imagens geradas pela IA têm finalidade
            exclusivamente estética e recreativa — funcionam como uma reinterpretação artística da
            imagem original, semelhante a um filtro fotográfico. Não constituem retrato fiel da
            identidade do seu bebê, nem documento médico, e não devem ser usadas para qualquer
            finalidade clínica, diagnóstica ou de identificação.
          </p>
          <p>
            <strong>Subprocessador de IA.</strong> O processamento das imagens pela inteligência
            artificial é realizado pela <strong>xAI</strong> (Estados Unidos), atuando como
            subprocessadora sob garantias contratuais (SCC). Sua foto original é enviada
            temporariamente a esses servidores e a imagem resultante retorna e é armazenada nos
            servidores Cloudflare onde está sua galeria.
          </p>
          <p>
            <strong>Reinterpretação e variações.</strong> Sistemas de IA podem reinterpretar a
            imagem original — adicionar, remover ou modificar detalhes como traços anatômicos,
            posição, iluminação, cor de pele e composição. O resultado é uma criação artística
            inspirada na sua foto, e pode divergir significativamente da aparência real.
          </p>
          <p>
            <strong>Marca de identificação.</strong> Toda imagem gerada pela IA é marcada nos cantos
            com os rótulos &ldquo;AI enhanced&rdquo; e &ldquo;Dr. Massuca&rdquo;, identificando
            publicamente que aquela imagem foi gerada por inteligência artificial.
          </p>
          <p>
            <strong>Decisão e responsabilidade da paciente.</strong> O uso da ferramenta é opcional.
            A escolha de usá-la, os parâmetros selecionados, o destino dado às imagens geradas e a
            forma como serão compartilhadas são decisões exclusivas da paciente. A clínica
            disponibiliza o recurso, mas não revisa previamente cada geração nem o uso posterior das
            imagens. Imagens geradas pela IA, ao serem compartilhadas com terceiros, devem preservar
            sua natureza de imagens estéticas processadas por inteligência artificial.
          </p>

          <p className="consent-version">Versão: {CONSENT_VERSION}</p>
        </div>

        <label className="consent-checkbox">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
          <span>Li e concordo com o termo acima.</span>
        </label>

        {error && <div className="error-banner">{error}</div>}

        <div className="consent-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!agreed || submitting}
            onClick={handleAccept}
          >
            {submitting ? 'Registrando…' : 'Aceitar e continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
