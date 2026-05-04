import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Heart, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../paciente.css';

/**
 * Layout boutique pra paciente. Header com brand + sair.
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
          <Heart className="paciente-brand-icon" />
          <div>
            <strong>Memo3D</strong>
            <span>memórias da gestação · Dr. Massucatti</span>
          </div>
        </Link>
        <button type="button" onClick={handleLogout} className="paciente-logout">
          <LogOut size={16} /> Sair
        </button>
      </header>
      <main className="paciente-main">
        <Outlet />
      </main>
    </div>
  );
}
