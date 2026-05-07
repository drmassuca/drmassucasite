import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LogOut, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CreditsProvider, useCredits } from '../contexts/CreditsContext';
import '../paciente.css';

/**
 * Layout boutique pra paciente. Header com logo Dr. Massuca + badge de
 * créditos IA + sair. Sem sidebar — paciente só tem uma página principal.
 */
export default function PacienteLayout() {
  return (
    <CreditsProvider>
      <PacienteLayoutInner />
    </CreditsProvider>
  );
}

function PacienteLayoutInner() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/memo3d/login');
  };

  return (
    <div className="paciente-layout">
      <header className="paciente-header">
        <Link to="/memo3d/conta" className="paciente-brand">
          <img src="/logo.webp" alt="Dr. Massuca" className="paciente-brand-logo" />
          <div>
            <strong>Memo3D</strong>
            <span>memórias da gestação · Dr. Massuca</span>
          </div>
        </Link>
        <div className="paciente-header-actions">
          <CreditsBadge />
          <button type="button" onClick={handleLogout} className="paciente-logout">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>
      <main className="paciente-main">
        <Outlet />
      </main>
      <footer className="paciente-footer">
        <div className="paciente-footer-rule" />
        <div className="paciente-footer-content">
          <div>
            <strong>Dr. Massuca</strong>
            <span>Antonio Massucatti Neto · CRM-GO 17475</span>
          </div>
          <div>
            <strong>Localização</strong>
            <span>Itaberaí · Goiás</span>
          </div>
          <div>
            <strong>Contato</strong>
            <span>
              <a href="https://wa.me/5562996602117" target="_blank" rel="noopener noreferrer">
                WhatsApp · (62) 99660-2117
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CreditsBadge() {
  const { balance, loading, photosRemaining } = useCredits();
  if (loading && balance == null) {
    return (
      <span className="paciente-credits-badge is-loading" aria-label="Carregando créditos">
        <Loader2 size={14} className="spin" />
      </span>
    );
  }
  if (balance == null) return null;
  return (
    <span
      className={`paciente-credits-badge${balance === 0 ? ' is-empty' : ''}`}
      title={`Você tem ${balance} créditos · ~${photosRemaining} foto${photosRemaining === 1 ? '' : 's'} de IA`}
    >
      <Sparkles size={14} />
      <strong>{balance}</strong>
      <span className="paciente-credits-label">créditos IA</span>
    </span>
  );
}
