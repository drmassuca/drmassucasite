/**
 * Memo3D — paciente cria checkout de pacote de créditos.
 *
 * POST /api/memo3d/paciente/credits-checkout
 * body: { packId: 'lembranca' | 'album' | 'memoria' }
 *
 * Fluxo:
 *  1. Valida paciente e packId.
 *  2. Cria Preference no Mercado Pago com external_reference único
 *     (pix_{patientId}_{packId}_{ts}) e notification_url do nosso webhook.
 *  3. Cria row em memo_pix_purchases com status='pending'.
 *  4. Retorna { initPoint } pra UI redirecionar ao checkout do MP.
 *
 * O webhook do MP (api/memo3d/webhooks/mercadopago) é a fonte da verdade —
 * só ele credita ai_credits e marca a compra como 'approved'.
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { getPack } from '../_lib/credit-packs.js';
import { getMpClient, Preference, detectBaseUrl } from '../_lib/mercadopago.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    const { packId } = req.body || {};

    const pack = getPack(packId);
    if (!pack) {
      return res.status(400).json({ error: 'Pacote inválido' });
    }

    const baseUrl = detectBaseUrl(req);
    const externalReference = `pix_${patient.id}_${pack.id}_${Date.now()}`;

    const client = getMpClient();
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: pack.id,
            title: `Memo3D — Pacote ${pack.name}`,
            description: `${pack.credits} créditos · ${pack.photos} fotos com IA`,
            quantity: 1,
            unit_price: Number(pack.priceBrl),
            currency_id: 'BRL',
            category_id: 'services',
          },
        ],
        payer: user.email ? { email: user.email } : undefined,
        external_reference: externalReference,
        statement_descriptor: 'MEMO3D',
        back_urls: {
          success: `${baseUrl}/memo3d/conta?pix=success`,
          failure: `${baseUrl}/memo3d/conta?pix=failure`,
          pending: `${baseUrl}/memo3d/conta?pix=pending`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/memo3d/webhooks/mercadopago`,
        metadata: {
          patient_id: patient.id,
          pack_id: pack.id,
          credits: pack.credits,
        },
      },
    });

    // Registra a intent no banco (status pending — webhook vai aprovar)
    const supabase = getAdminClient();
    const { data: purchase, error } = await supabase
      .from('memo_pix_purchases')
      .insert({
        patient_id: patient.id,
        pack_id: pack.id,
        credits: pack.credits,
        amount_brl: pack.priceBrl,
        status: 'pending',
        external_reference: externalReference,
        mp_preference_id: preference.id,
      })
      .select('id')
      .single();
    if (error) throw error;

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.credits.checkout_created',
      resourceType: 'memo_pix_purchases',
      resourceId: purchase.id,
      metadata: {
        pack_id: pack.id,
        credits: pack.credits,
        amount_brl: pack.priceBrl,
        mp_preference_id: preference.id,
      },
    }).catch(err => console.error('[memo3d audit]', err));

    return res.status(200).json({
      purchaseId: purchase.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
      pack,
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error('[memo3d credits-checkout]', err);
    return res
      .status(500)
      .json({ error: `Erro ao criar checkout: ${err?.message || 'desconhecido'}` });
  }
}
