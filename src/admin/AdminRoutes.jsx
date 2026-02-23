import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostsList from './pages/PostsList';
import PostEditor from './pages/PostEditor';
import Categories from './pages/Categories';
import Media from './pages/Media';
import AIAssistant from './pages/AIAssistant';

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

        {/* Rotas protegidas com layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/:id" element={<PostEditor />} />
          <Route path="categories" element={<Categories />} />
          <Route path="media" element={<Media />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutes;
