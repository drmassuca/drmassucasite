/**
 * Memo3D — paciente lê seu saldo de créditos + histórico.
 *
 * GET /api/memo3d/paciente/credits
 * Retorna { balance, ledger: [...] } da paciente logada.
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { getCreditsState } from '../_lib/credits.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { patient } = await requirePatient(req);
    const state = await getCreditsState(patient.id, 20);
    return res.status(200).json(state);
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d credits]', err);
    return res
      .status(500)
      .json({ error: `Erro ao ler créditos: ${err?.message || 'desconhecido'}` });
  }
}
