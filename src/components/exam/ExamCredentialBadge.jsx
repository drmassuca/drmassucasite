import PropTypes from 'prop-types';
import '../selo/selo.css';

/**
 * Credencial do exame no padrão visual do distintivo "Conteúdo Validado"
 * (logo do site em medalha com anel dourado — ver selo.css).
 * - variant "obstetric": inclui logo/link ISUOG (dimensões preservadas do
 *   fix de SEO aee4e89: 200x60 + aspect-ratio, zero CLS)
 * - variant "general": credencial CRM
 */
export default function ExamCredentialBadge({ variant = 'general' }) {
  return (
    <aside className="selo-validado selo-credencial" aria-label="Credenciais do exame">
      <div className="selo-validado__medalha">
        <img src="/logo.webp" alt="Logotipo Dr. Massuca" width="58" height="58" />
      </div>
      <div className="selo-validado__corpo">
        <p className="selo-validado__titulo">Credencial do exame</p>
        <p className="selo-validado__revisor">
          CRM-GO 17475 · Referência em ultrassonografia há mais de 20 anos
        </p>
        {variant === 'obstetric' && (
          <p className="selo-validado__datas">
            <strong>Protocolo ISUOG</strong> · International Society of Ultrasound in Obstetrics and
            Gynecology
          </p>
        )}
      </div>
      {variant === 'obstetric' && (
        <a
          className="selo-credencial__isuog"
          href="https://www.isuog.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/isuog-logo.png"
            alt="ISUOG – International Society of Ultrasound in Obstetrics and Gynecology"
            width="200"
            height="60"
            style={{ aspectRatio: '10 / 3' }}
            loading="lazy"
          />
        </a>
      )}
    </aside>
  );
}

ExamCredentialBadge.propTypes = {
  variant: PropTypes.oneOf(['obstetric', 'general']),
};
