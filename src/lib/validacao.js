/**
 * Sistema "Conteúdo Validado" — decisão central de exibição do selo.
 *
 * REGRA DO SISTEMA: nenhum componente decide a exibição do selo por conta
 * própria. Todos chamam liberaConteudoValidado(). A função é fail-closed:
 * na dúvida (dado ausente, malformado ou erro), o selo NÃO aparece.
 *
 * O lastro no banco vem da migration supabase/migrations/0002_conteudo_validado.sql:
 * colunas selo_assinado, assinada_em, revisado_por e data_revisao na tabela
 * articles, com trigger que derruba o selo quando o conteúdo muda.
 */

/** Credencial fixa do revisor titular do site. */
export const CREDENCIAL_PADRAO = 'Dr. Antonio Massucatti Neto, CRM-GO 17475';

/** Descrição de formação usada junto à credencial (regra de compliance do site:
 * nunca "especialista em ultrassonografia", sempre "médico pós-graduado"). */
export const FORMACAO_PADRAO =
  'Médico pós-graduado em ultrassonografia geral e ecocardiografia fetal';

/* Registro profissional dentro do texto do revisor, ex.: "CRM-GO 17475". */
const PADRAO_REGISTRO = /(CRM|CRO|CRP|CRN|COREN|CRF|CREFITO|RQE)[-\s.]?[A-Z]{0,2}[\s.]*\d{3,}/i;

const dataValida = valor => {
  if (!valor) return false;
  const d = new Date(valor);
  return !Number.isNaN(d.getTime());
};

const listaFontes = artigo => {
  const fontes = artigo.sources ?? artigo.fontes;
  return Array.isArray(fontes) ? fontes : [];
};

/**
 * Decide se o selo "Conteúdo Validado" pode ser exibido para um artigo.
 *
 * Exige QUATRO coisas juntas:
 *  1. assinatura ativa (selo_assinado = true com assinada_em preenchida);
 *  2. revisor identificado com registro profissional;
 *  3. data de revisão;
 *  4. ao menos uma fonte citada.
 *
 * @param {object} artigo — registro da tabela articles (snake_case) ou já
 *   transformado pelo frontend (transformArticle mantém os campos do selo).
 * @returns {{ liberado: boolean, faltas: string[] }} — `faltas` lista o que
 *   está pendente, para o admin mostrar o motivo.
 */
export function liberaConteudoValidado(artigo) {
  try {
    if (!artigo || typeof artigo !== 'object') {
      return { liberado: false, faltas: ['Artigo inexistente ou inválido'] };
    }

    const faltas = [];

    const assinado = artigo.selo_assinado === true;
    const assinadaEm = artigo.assinada_em ?? null;
    if (!assinado || !dataValida(assinadaEm)) {
      faltas.push('Assinatura ativa (usar o botão "Assinar e validar")');
    }

    const revisor = typeof artigo.revisado_por === 'string' ? artigo.revisado_por.trim() : '';
    if (!revisor) {
      faltas.push('Revisor identificado');
    } else if (!PADRAO_REGISTRO.test(revisor)) {
      faltas.push('Registro profissional no nome do revisor (ex.: "CRM-GO 17475")');
    }

    if (!dataValida(artigo.data_revisao)) {
      faltas.push('Data de revisão');
    }

    if (listaFontes(artigo).length < 1) {
      faltas.push('Ao menos uma fonte citada');
    }

    return { liberado: faltas.length === 0, faltas };
  } catch {
    // Fail-closed: qualquer erro inesperado significa "sem selo".
    return { liberado: false, faltas: ['Erro ao validar o artigo'] };
  }
}

/**
 * SOMENTE para a página de demonstração /v1: prévia visual do selo
 * alimentada pelo que já existe (fontes citadas + published_at/updated_at
 * + credencial fixa), enquanto a migration 0002 não é aplicada e os
 * artigos não são assinados de fato. NÃO usar em páginas públicas reais —
 * lá a decisão é exclusivamente de liberaConteudoValidado().
 */
export function previaSeloDemonstracao(artigo) {
  try {
    return listaFontes(artigo || {}).length >= 1;
  } catch {
    return false;
  }
}
