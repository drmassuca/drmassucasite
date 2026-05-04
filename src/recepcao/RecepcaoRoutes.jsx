import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../admin/contexts/AuthContext';
import RoleGuard from '../admin/components/RoleGuard';
import { Memo3dPathContext } from '../lib/memo3d/path-context';
import RecepcaoLayout from './components/RecepcaoLayout';
import PacientesList from '../admin/pages/memo3d/PacientesList';
import PacienteNova from '../admin/pages/memo3d/PacienteNova';
import PacienteDetalhe from '../admin/pages/memo3d/PacienteDetalhe';

/**
 * Rotas exclusivas da recepção. Reusa os componentes Memo3D do /admin
 * trocando apenas o basePath via Memo3dPathContext (links viram /recepcao/...).
 *
 * Quem entra aqui precisa ter role 'reception' ou 'owner'. Outros são
 * redirecionados pelo RoleGuard.
 */
const RecepcaoRoutes = () => (
  <AuthProvider>
    <Memo3dPathContext.Provider value="/recepcao">
      <Routes>
        {/* Login da recepção compartilha com /admin/login (que faz role-redirect) */}
        <Route path="/recepcao/login" element={<Navigate to="/admin/login" replace />} />

        <Route
          path="/recepcao"
          element={
            <RoleGuard allow={['reception', 'owner']}>
              <RecepcaoLayout />
            </RoleGuard>
          }
        >
          <Route index element={<PacientesList />} />
          <Route path="pacientes" element={<PacientesList />} />
          <Route path="pacientes/nova" element={<PacienteNova />} />
          <Route path="pacientes/detail" element={<PacienteDetalhe />} />
        </Route>

        <Route path="/recepcao/*" element={<Navigate to="/recepcao" replace />} />
      </Routes>
    </Memo3dPathContext.Provider>
  </AuthProvider>
);

export default RecepcaoRoutes;
