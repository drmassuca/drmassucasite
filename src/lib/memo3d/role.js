/**
 * Memo3D — helpers de role (browser).
 *
 * Roles:
 *  - 'owner'     → Dr. Massucatti, vê /admin completo
 *  - 'reception' → recepção, vê só /recepcao com Memo3D
 *  - 'patient'   → paciente, vê /memo3d/conta (Fase 3)
 *
 * Role fica em `auth.users.user_metadata.role`. Usuários sem role
 * definido (legado, antes da Fase 2.3) são tratados como 'owner' por
 * compatibilidade.
 */

export const ROLES = {
  OWNER: 'owner',
  RECEPTION: 'reception',
  PATIENT: 'patient',
};

/** Lê o role de um Supabase user (ou null). */
export function getUserRole(user) {
  if (!user) return null;
  return user.user_metadata?.role || ROLES.OWNER;
}

export function isOwner(user) {
  return getUserRole(user) === ROLES.OWNER;
}

export function isReception(user) {
  return getUserRole(user) === ROLES.RECEPTION;
}

export function isPatient(user) {
  return getUserRole(user) === ROLES.PATIENT;
}

/** Caminho padrão pós-login conforme role. */
export function defaultPathForRole(user) {
  const role = getUserRole(user);
  if (role === ROLES.RECEPTION) return '/recepcao';
  if (role === ROLES.PATIENT) return '/memo3d/conta';
  return '/admin';
}
