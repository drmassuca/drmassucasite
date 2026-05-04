import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Users, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../admin/contexts/AuthContext';
import './RecepcaoLayout.css';

/**
 * Layout dedicado pra recepção.
 *
 * Ambiente isolado, **só** com acesso a Memo3D. Sem sidebar do /admin
 * (Posts, Categorias, IA, Site-Vivo etc). Pessoa da recepção visualmente
 * não sabe nem que existe outras áreas do site.
 */
const RecepcaoLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <div className="recepcao-layout">
      <aside className={`recepcao-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="recepcao-sidebar-header">
          <div className="recepcao-logo">
            <Heart className="recepcao-logo-icon" />
            {sidebarOpen && <span>Memo3D</span>}
          </div>
          <button
            type="button"
            className="recepcao-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="recepcao-sidebar-nav">
          <NavLink
            to="/recepcao"
            end
            className={({ isActive }) => `recepcao-nav-item ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            {sidebarOpen && <span>Pacientes</span>}
          </NavLink>
        </nav>

        <div className="recepcao-sidebar-footer">
          <button type="button" onClick={handleLogout} className="recepcao-logout-btn">
            <LogOut size={18} />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      <div className={`recepcao-main ${sidebarOpen ? '' : 'expanded'}`}>
        <header className="recepcao-header">
          <div className="recepcao-header-brand">
            <span className="recepcao-clinic-name">Premium Centro Clínico</span>
            <span className="recepcao-doctor-name">Dr. Massucatti — CRM-GO 17475</span>
          </div>
          <div className="recepcao-header-user">
            <User size={16} />
            <span>{user?.email}</span>
          </div>
        </header>

        <main className="recepcao-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecepcaoLayout;
