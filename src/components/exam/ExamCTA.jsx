import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { whatsappMessages } from './examData';

const WHATSAPP_NUMBER = '5562996602117';

/**
 * Botões de ação com mensagem pré-preenchida no WhatsApp,
 * no padrão de botões do sistema editorial (ed-btn).
 */
export default function ExamCTA({ slug, ctaLabel = 'Agendar exame' }) {
  const message = whatsappMessages[slug] || 'Olá, gostaria de agendar um exame.';
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="ed-ctas ed-ctas--centro">
      <a
        className="ed-btn ed-btn--cheio"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel}
      </a>
      <RouterLink className="ed-btn ed-btn--contorno" to="/exames">
        Voltar aos exames
      </RouterLink>
    </div>
  );
}

ExamCTA.propTypes = {
  slug: PropTypes.string.isRequired,
  ctaLabel: PropTypes.string,
};
