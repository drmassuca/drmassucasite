import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { acceptConsent } from '../../lib/memo3d/api';
import '../paciente.css';

/**
 * Versão DRAFT do termo de consentimento Memo3D.
 *
 * IMPORTANTE: o Dr. Massucatti vai revisar o texto antes de produção real
 * (ele declarou explicitamente: "antes de colocar em produção eu faço isso").
 * A versão registrada no banco é CONSENT_VERSION abaixo — quando o termo for
 * atualizado, incrementar a versão (ex: '2026-06-01') força novo aceite.
 */
const CONSENT_VERSION = 'draft-2026-05-04';

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
            ultrassom para sua visualização e compartilhamento com sua família por{' '}
            <strong>12 meses</strong> a partir da data do exame.
          </p>
          <p>
            <strong>Natureza dos dados.</strong> As mídias são memórias da gestação, distintas do
            laudo médico (que é entregue separadamente).
          </p>
          <p>
            <strong>Armazenamento.</strong> Os arquivos ficam em servidores da Cloudflare (R2 e
            Stream), com criptografia em trânsito (TLS) e em repouso. Você consente que esses dados
            podem ser armazenados internacionalmente sob garantias contratuais (Standard Contractual
            Clauses).
          </p>
          <p>
            <strong>Acesso.</strong> Apenas você (e quem você compartilhar pelo botão “Compartilhar
            com família”, com link expirando em 24h) pode visualizar.
          </p>
          <p>
            <strong>Retenção.</strong> Após 12 meses + 30 dias de carência, os arquivos são apagados
            em definitivo.
          </p>
          <p>
            <strong>Seus direitos.</strong> Você pode pedir acesso, correção ou exclusão a qualquer
            momento via WhatsApp da clínica.
          </p>
          <p className="consent-version">
            Versão: {CONSENT_VERSION} (rascunho — versão final será publicada antes do lançamento
            público)
          </p>
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
