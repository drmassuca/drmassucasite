/**
 * Memo3D — paciente lista os pacotes de créditos disponíveis.
 *
 * GET /api/memo3d/paciente/credits-packs
 * Retorna { packs: [...] } a partir do catálogo central.
 *
 * Requer auth de paciente — evita expor o catálogo publicamente sem necessidade
 * (e mantém consistência com os outros endpoints do mesmo prefixo).
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { listPacks } from '../_lib/credit-packs.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requirePatient(req);
    return res.status(200).json({ packs: listPacks() });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d credits-packs]', err);
    return res
      .status(500)
      .json({ error: `Erro ao listar pacotes: ${err?.message || 'desconhecido'}` });
  }
}
