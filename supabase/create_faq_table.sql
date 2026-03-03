-- Tabela FAQ para o site drmassuca.com.br
-- Execute no SQL Editor do Supabase: https://supabase.com/dashboard/project/auvyolzrjoyzsribmapa/sql

CREATE TABLE IF NOT EXISTS public.faq_items (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question     text NOT NULL,
  answer       text,
  short_answer text,
  slug         text UNIQUE NOT NULL,
  section      text,
  ai_generated boolean DEFAULT false,
  approved     boolean DEFAULT true,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

-- Leitura pública dos itens aprovados
CREATE POLICY "select_approved" ON public.faq_items
  FOR SELECT TO anon USING (approved = true);

-- Service role tem acesso total
CREATE POLICY "service_role_all" ON public.faq_items
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Índices
CREATE INDEX IF NOT EXISTS idx_faq_slug    ON public.faq_items (slug);
CREATE INDEX IF NOT EXISTS idx_faq_section ON public.faq_items (section);
CREATE INDEX IF NOT EXISTS idx_faq_approved ON public.faq_items (approved);
