-- ============================================================
-- 0002_conteudo_validado.sql
-- Sistema "Conteúdo Validado": lastro do selo na tabela articles.
-- Execute no SQL Editor do Supabase (mesmo fluxo do 0001).
-- IMPORTANTE: execute ANTES do deploy do front — o admin passa a enviar
-- revisado_por/data_revisao em todo save e falha (PGRST204) sem as colunas.
--
-- Regras implementadas AQUI, no banco, de propósito — assim pegam
-- qualquer caminho de escrita (admin, script, SQL direto), não só a UI:
--   1. Artigo nasce sem selo, sempre (BEFORE INSERT zera os campos).
--   2. Se title, subtitle, excerpt, content ou sources mudarem,
--      o selo cai automaticamente (BEFORE UPDATE zera).
--   3. Assinar (selo_assinado false -> true) exige revisor identificado,
--      data de revisão e ao menos uma fonte — senão a assinatura é
--      rejeitada com erro explícito.
--   4. assinada_em é carimbada pelo próprio banco no ato da assinatura.
--
-- Reassinar é sempre ato manual e explícito: um UPDATE que apenas liga
-- o selo, sem mudar conteúdo no mesmo comando (se mudar, o selo cai).
-- A decisão de EXIBIÇÃO do selo fica em src/lib/validacao.js
-- (liberaConteudoValidado) — fail-closed, nenhum componente decide sozinho.
-- ============================================================

-- 1) Colunas do selo ------------------------------------------
ALTER TABLE articles ADD COLUMN IF NOT EXISTS selo_assinado BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS assinada_em TIMESTAMPTZ;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS revisado_por TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS data_revisao DATE;

-- 2) Função de invalidação na escrita -------------------------
CREATE OR REPLACE FUNCTION valida_selo_conteudo()
RETURNS TRIGGER AS $$
BEGIN
  -- Artigo nasce sem selo, sempre.
  IF TG_OP = 'INSERT' THEN
    NEW.selo_assinado := FALSE;
    NEW.assinada_em := NULL;
    RETURN NEW;
  END IF;

  -- Conteúdo OU lastro mudou? O selo cai — mesmo que o UPDATE tente
  -- ligá-lo no mesmo comando (assinar é sempre um ato separado do editar).
  -- revisado_por/data_revisao entram na lista: trocar o revisor ou a data
  -- de um artigo assinado exige nova assinatura.
  IF NEW.title IS DISTINCT FROM OLD.title
     OR NEW.subtitle IS DISTINCT FROM OLD.subtitle
     OR NEW.excerpt IS DISTINCT FROM OLD.excerpt
     OR NEW.content IS DISTINCT FROM OLD.content
     OR NEW.sources IS DISTINCT FROM OLD.sources
     OR NEW.revisado_por IS DISTINCT FROM OLD.revisado_por
     OR NEW.data_revisao IS DISTINCT FROM OLD.data_revisao THEN
    NEW.selo_assinado := FALSE;
    NEW.assinada_em := NULL;
    RETURN NEW;
  END IF;

  -- Assinatura nova (false -> true): valida o lastro e carimba a data.
  IF NEW.selo_assinado AND NOT OLD.selo_assinado THEN
    IF COALESCE(BTRIM(NEW.revisado_por), '') = '' THEN
      RAISE EXCEPTION 'Assinatura rejeitada: revisor não identificado (revisado_por).';
    END IF;
    IF NEW.data_revisao IS NULL THEN
      RAISE EXCEPTION 'Assinatura rejeitada: data de revisão ausente (data_revisao).';
    END IF;
    IF NEW.sources IS NULL
       OR jsonb_typeof(NEW.sources) <> 'array'
       OR jsonb_array_length(NEW.sources) < 1 THEN
      RAISE EXCEPTION 'Assinatura rejeitada: cite ao menos uma fonte (sources).';
    END IF;
    NEW.assinada_em := NOW();
  END IF;

  -- Selo permanece ativo (true -> true): o carimbo original é imutável —
  -- ninguém forja assinada_em por UPDATE direto.
  IF NEW.selo_assinado AND OLD.selo_assinado THEN
    NEW.assinada_em := OLD.assinada_em;
  END IF;

  -- Selo desligado (manual ou por queda): nunca fica data de assinatura.
  IF NOT NEW.selo_assinado THEN
    NEW.assinada_em := NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3) Trigger --------------------------------------------------
DROP TRIGGER IF EXISTS trg_articles_selo_conteudo ON articles;
CREATE TRIGGER trg_articles_selo_conteudo
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION valida_selo_conteudo();

-- 4) Documentação ---------------------------------------------
COMMENT ON COLUMN articles.selo_assinado IS
  'Selo Conteúdo Validado ativo (cai automaticamente se o conteúdo mudar)';
COMMENT ON COLUMN articles.assinada_em IS
  'Carimbo do banco no ato da assinatura (NULL = sem selo)';
COMMENT ON COLUMN articles.revisado_por IS
  'Nome e registro do revisor, ex.: Dr. Antonio Massucatti Neto, CRM-GO 17475';
COMMENT ON COLUMN articles.data_revisao IS
  'Data da última revisão do conteúdo pelo revisor';
COMMENT ON FUNCTION valida_selo_conteudo() IS
  'Invalidação na escrita do selo Conteúdo Validado (exibição: src/lib/validacao.js)';
