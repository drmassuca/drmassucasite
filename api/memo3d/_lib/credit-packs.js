/**
 * Memo3D — catálogo de pacotes de créditos de IA.
 *
 * Fonte da verdade pros preços e quantidades. Usado pelo endpoint de checkout
 * (validar packId, montar item da Preference) e pelo webhook (validar valor pago).
 *
 * Coerência com COST_PHOTO_ENHANCE = 40 do _lib/credits.js:
 *   lembranca: 200 / 40 = 5 fotos
 *   album:     500 / 40 = 12 fotos (12.5 → arredonda pra baixo na UI)
 *   memoria:   1200 / 40 = 30 fotos
 */

export const CREDIT_PACKS = Object.freeze({
  lembranca: { id: 'lembranca', name: 'Lembrança', credits: 200, photos: 5, priceBrl: 9.9 },
  album: { id: 'album', name: 'Álbum', credits: 500, photos: 12, priceBrl: 19.9 },
  memoria: { id: 'memoria', name: 'Memória', credits: 1200, photos: 30, priceBrl: 39.9 },
});

export function getPack(id) {
  if (!id || typeof id !== 'string') return null;
  return CREDIT_PACKS[id] || null;
}

export function listPacks() {
  return Object.values(CREDIT_PACKS);
}
