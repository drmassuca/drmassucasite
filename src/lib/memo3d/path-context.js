/**
 * Memo3D — contexto de path base para os componentes Memo3D.
 *
 * Os componentes (Dashboard, PacientesList, PacienteDetalhe etc) precisam
 * montar links absolutos. Hoje há duas raízes possíveis:
 *
 *  - '/admin/memo3d'  → quando renderizado dentro do AdminLayout (Dr. Massuca)
 *  - '/recepcao'      → quando renderizado dentro do RecepcaoLayout (recepção)
 *
 * O componente raiz envolve seus filhos com `<Memo3dPathContext.Provider value={...}>`
 * passando o prefixo apropriado. Os filhos chamam `useMemo3dPath()` para obter o path.
 */
import { createContext, useContext } from 'react';

export const Memo3dPathContext = createContext('/admin/memo3d');

export function useMemo3dPath() {
  return useContext(Memo3dPathContext);
}
