import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { injetaFontesEditoriais } from '../../lib/fontesEditoriais';
import '../../styles/editorial.css';

const WHATSAPP = 'https://wa.me/5562996602117';
const INSTAGRAM = 'https://instagram.com/drmassuca';

const NAV = [
  ['Início', '/'],
  ['Sobre', '/sobre'],
  ['Ultrassonografias', '/exames'],
  ['Área do Paciente', '/area-do-paciente'],
  ['IA Médica', '/ia-medica'],
  ['Depoimentos', '/depoimentos'],
  ['FAQ', '/faq'],
  ['Contato', '/contato'],
];

/**
 * Shell do sistema editorial: cabeçalho de jornal + colofão.
 * Aplicado pelo App.jsx às rotas em EDITORIAL_PATHS (a home atual,
 * o /admin e a IA Médica ficam fora — a IA Médica tem pele própria).
 */
export default function EditorialShell({ children }) {
  const { pathname } = useLocation();
  const ehDemo = pathname === '/v1' || pathname === '/v1/';

  // Fontes editoriais (Cormorant Garamond + Inter), injeção direta.
  useEffect(() => {
    injetaFontesEditoriais();
  }, []);

  const dataEdicao = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="editorial">
      <header className="ed-masthead">
        <div className="ed-masthead__alta">
          <span>Itaberaí-GO · Goiás</span>
          <span className="ed-masthead__edicao">
            {ehDemo ? 'Edição de demonstração · conceito editorial' : dataEdicao}
          </span>
          <span className="ed-masthead__sociais">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
          </span>
        </div>
        <RouterLink to="/" className="ed-masthead__marca">
          <img src="/logo.webp" alt="" width="54" height="54" />
          <span className="ed-masthead__nome">Dr. Massuca</span>
          <span className="ed-masthead__sub">
            Antonio Massucatti Neto · CRM-GO 17475 · médico pós-graduado
          </span>
        </RouterLink>
        <nav className="ed-masthead__nav" aria-label="Navegação principal">
          {NAV.map(([rotulo, rota]) => (
            <NavLink key={rota} to={rota} end={rota === '/'}>
              {rotulo}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="ed-conteudo">{children}</div>

      <footer className="ed-colofao">
        <p className="ed-colofao__marca">Dr. Massuca</p>
        <p className="ed-colofao__credencial">
          Dr. Antonio Massucatti Neto · CRM-GO 17475
          <br />
          Pós-graduação em Ultrassonografia Geral e Ecocardiografia Fetal
        </p>
        <nav className="ed-colofao__nav" aria-label="Navegação do rodapé">
          {NAV.map(([rotulo, rota]) => (
            <RouterLink key={rota} to={rota}>
              {rotulo}
            </RouterLink>
          ))}
        </nav>
        <p className="ed-colofao__links">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          {' · '}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          {' · '}
          <a href="https://x.com/massucas" target="_blank" rel="noopener noreferrer">
            X
          </a>
          {' · '}
          <RouterLink to="/privacy-policy">Política de Privacidade</RouterLink>
        </p>
        <p className="ed-colofao__nota">
          © 2026{' '}
          <a href="https://xdiag.com.br" target="_blank" rel="noopener noreferrer">
            Xdiag Tecnologias Ltda.
          </a>
          {' · '}
          (62) 99660-2117 · drmassucatti@gmail.com · Rua 19, Qd. 33, Lt. 01 – Vila Leonor,
          Itaberaí-GO
          {ehDemo &&
            ' · Página de demonstração (/v1) — a home oficial continua no endereço principal.'}
        </p>
      </footer>
    </div>
  );
}

EditorialShell.propTypes = {
  children: PropTypes.node,
};
