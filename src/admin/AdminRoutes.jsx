import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import AdminLayout from './components/AdminLayout';
import { Memo3dPathContext } from '../lib/memo3d/path-context';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostsList from './pages/PostsList';
import PostEditor from './pages/PostEditor';
import Categories from './pages/Categories';
import Media from './pages/Media';
import AIAssistant from './pages/AIAssistant';
import FaqAdmin from './pages/FaqAdmin';
import SiteVivoOverview from './pages/SiteVivoOverview';
import VitalsAdmin from './pages/VitalsAdmin';
import SeoAdmin from './pages/SeoAdmin';
import Memo3dDashboard from './pages/memo3d/Dashboard';
import Memo3dPacientesList from './pages/memo3d/PacientesList';
import Memo3dPacienteNova from './pages/memo3d/PacienteNova';
import Memo3dPacienteDetalhe from './pages/memo3d/PacienteDetalhe';
import Memo3dLabIA from './pages/memo3d/LabIA';
import Memo3dAtividade from './pages/memo3d/Atividade';

// Importar estilos globais do admin
import './admin-global.css';

// Placeholder pages
const SettingsPage = () => (
  <div className="page-header">
    <h1 className="page-title">Configurações</h1>
    <p>Em desenvolvimento...</p>
  </div>
);

// Redirect authenticated users away from login
const LoginRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Login />;
};

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Login - rota pública */}
        <Route path="/admin/login" element={<LoginRoute />} />

        {/* Rotas protegidas com layout — apenas owner; reception é redirecionada pra /recepcao */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard allow={['owner']}>
                <Memo3dPathContext.Provider value="/admin/memo3d">
                  <AdminLayout />
                </Memo3dPathContext.Provider>
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/:id" element={<PostEditor />} />
          <Route path="categories" element={<Categories />} />
          <Route path="media" element={<Media />} />
          <Route path="faq" element={<FaqAdmin />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="site-vivo" element={<SiteVivoOverview />} />
          <Route path="site-vivo/vitals" element={<VitalsAdmin />} />
          <Route path="site-vivo/seo" element={<SeoAdmin />} />
          <Route path="memo3d" element={<Memo3dDashboard />} />
          <Route path="memo3d/pacientes" element={<Memo3dPacientesList />} />
          <Route path="memo3d/pacientes/nova" element={<Memo3dPacienteNova />} />
          <Route path="memo3d/pacientes/detail" element={<Memo3dPacienteDetalhe />} />
          <Route path="memo3d/lab-ia" element={<Memo3dLabIA />} />
          <Route path="memo3d/atividade" element={<Memo3dAtividade />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutes;
