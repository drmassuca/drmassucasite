import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../admin/contexts/AuthContext';
import { getUserRole } from '../lib/memo3d/role';
import LoginPaciente from './pages/LoginPaciente';
import TrocarSenha from './pages/TrocarSenha';
import Conta from './pages/Conta';
import Familia from './pages/Familia';
import MelhorarIA from './pages/MelhorarIA';
import PacienteLayout from './components/PacienteLayout';

/**
 * Rotas do "ambiente paciente" — Memo3D-só, sem nenhuma conexão com /admin.
 *
 * Estrutura:
 *  /memo3d/login        → login da paciente (público)
 *  /memo3d/familia      → visualização compartilhada (público, via token)
 *  /memo3d/trocar-senha → forçada quando must_change_password = true
 *  /memo3d/conta        → galeria principal (protegida, role=patient)
 */
const PacienteRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/memo3d/login" element={<LoginPaciente />} />
      <Route path="/memo3d/familia" element={<Familia />} />
      <Route
        path="/memo3d/trocar-senha"
        element={
          <PatientGuard>
            <TrocarSenha />
          </PatientGuard>
        }
      />
      <Route
        path="/memo3d"
        element={
          <PatientGuard>
            <PacienteLayout />
          </PatientGuard>
        }
      >
        <Route index element={<Navigate to="/memo3d/conta" replace />} />
        <Route path="conta" element={<Conta />} />
        <Route path="melhorar/:mediaId" element={<MelhorarIA />} />
      </Route>
      <Route path="/memo3d/*" element={<Navigate to="/memo3d/login" replace />} />
    </Routes>
  </AuthProvider>
);

/**
 * Guard simples que aceita só patient (ou owner pra debug). Sem login → vai pra login.
 */
function PatientGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/memo3d/login" replace />;
  const role = getUserRole(user);
  if (role !== 'patient' && role !== 'owner') {
    return <Navigate to="/memo3d/login" replace />;
  }
  return children;
}

export default PacienteRoutes;
