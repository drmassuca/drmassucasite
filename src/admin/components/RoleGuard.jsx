import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { defaultPathForRole, getUserRole } from '../../lib/memo3d/role';

/**
 * Bloqueia acesso à rota se o role do user logado não estiver na lista permitida.
 * Redireciona pro path padrão do role atual.
 *
 * Exemplo:
 *   <RoleGuard allow={['owner']}>
 *     <AdminLayout />
 *   </RoleGuard>
 */
const RoleGuard = ({ allow, children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/admin/login" replace />;

  const role = getUserRole(user);
  if (!allow.includes(role)) {
    return <Navigate to={defaultPathForRole(user)} replace />;
  }

  return children;
};

RoleGuard.propTypes = {
  allow: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleGuard;
