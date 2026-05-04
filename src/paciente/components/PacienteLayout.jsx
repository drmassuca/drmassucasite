import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../paciente.css';

/**
 * Layout boutique pra paciente. Header com logo Dr. Massuca + sair.
 * Sem sidebar — paciente só tem uma página principal.
 */
export default function PacienteLayout() {
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
        <button type="button" onClick={handleLogout} className="paciente-logout">
          <LogOut size={16} /> Sair
        </button>
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
