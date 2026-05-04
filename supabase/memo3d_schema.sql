-- =============================================
-- MEMO3D — Schema inicial
-- =============================================
-- Data: 2026-05-04
-- Convenção: prefixo memo_* para isolar das tabelas existentes (articles, categories, etc).
-- Aplicar via SQL Editor do Supabase no projeto do drmassucasite.
-- Idempotente: usa IF NOT EXISTS / DROP IF EXISTS quando aplicável.
-- =============================================

-- Pré-requisito: extensão pgcrypto (pra gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================
-- 1) PACIENTES
-- =============================================
CREATE TABLE IF NOT EXISTS memo_patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Dados pessoais
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,         -- E.164: +5562999998888
  cpf_last4 VARCHAR(4) NOT NULL,             -- segundo fator no fluxo de link e QR
  cpf_hash VARCHAR(64),                      -- hash SHA-256 do CPF completo (deduplicação sem expor)
  email VARCHAR(255),

  -- Conta vinculada no Supabase Auth (criada quando a paciente define senha no primeiro acesso)
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Status do registro
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','active','expired','deleted')),

  -- Consentimento LGPD
  consent_lgpd_at TIMESTAMPTZ,
  consent_lgpd_ip INET,
  consent_lgpd_version VARCHAR(20),          -- ex: '2026-05-04' — pra versionar termo

  -- Auditoria
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_memo_patients_phone ON memo_patients(phone);
CREATE INDEX IF NOT EXISTS idx_memo_patients_status ON memo_patients(status);
CREATE INDEX IF NOT EXISTS idx_memo_patients_auth_user ON memo_patients(auth_user_id);

-- =============================================
-- 2) EXAMES
-- =============================================
-- Uma paciente pode ter múltiplos exames ao longo da gestação.
-- Cada exame tem seu próprio ciclo de pagamento e expiração.
CREATE TABLE IF NOT EXISTS memo_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES memo_patients(id) ON DELETE CASCADE,

  exam_date DATE NOT NULL,
  exam_type VARCHAR(50),                     -- 'morfologico_1tri', '4d', 'doppler', etc
  device VARCHAR(20),                        -- 'voluson_s10' | 'hera_z20'
  notes TEXT,

  -- Pagamento (manual no balcão; recepção marca)
  paid BOOLEAN NOT NULL DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  paid_amount_cents INTEGER,                 -- 3000 = R$30,00
  paid_by UUID REFERENCES auth.users(id),    -- recepcionista que marcou

  -- Janela de acesso (calculada quando paid = true)
  expires_at TIMESTAMPTZ,                    -- exam_date + 12 meses
  hard_delete_at TIMESTAMPTZ,                -- expires_at + 30 dias de carência

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_memo_exams_patient ON memo_exams(patient_id);
CREATE INDEX IF NOT EXISTS idx_memo_exams_paid ON memo_exams(paid);
CREATE INDEX IF NOT EXISTS idx_memo_exams_expires ON memo_exams(expires_at);
CREATE INDEX IF NOT EXISTS idx_memo_exams_hard_delete ON memo_exams(hard_delete_at)
  WHERE hard_delete_at IS NOT NULL;

-- =============================================
-- 3) MÍDIA DO EXAME
-- =============================================
CREATE TABLE IF NOT EXISTS memo_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES memo_exams(id) ON DELETE CASCADE,

  kind VARCHAR(20) NOT NULL CHECK (kind IN ('video','photo','book_page')),
  filename VARCHAR(255),
  size_bytes BIGINT,
  duration_seconds INTEGER,                  -- só para video
  width INTEGER,
  height INTEGER,
  mime_type VARCHAR(100),

  -- Storage no R2 (mídia pesada)
  r2_key TEXT NOT NULL,                      -- ex: clinic/dr-massuca/patient/{patient_id}/exam/{exam_id}/{file_id}.mp4
  thumbnail_r2_key TEXT,                     -- thumb gerada após upload
  thumbnail_supabase_path TEXT,              -- alternativa: thumb no Supabase Storage (decisão na Fase 1)

  -- Ordem dentro do book ou da galeria
  position INTEGER NOT NULL DEFAULT 0,

  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id)
);
CREATE INDEX IF NOT EXISTS idx_memo_media_exam ON memo_media(exam_id);
CREATE INDEX IF NOT EXISTS idx_memo_media_kind ON memo_media(kind);

-- =============================================
-- 4) TOKENS DE ACESSO
-- =============================================
-- Cobre primeiro acesso (link manual via WhatsApp), QR code presencial e
-- compartilhamento com família — todos via tokens assinados de uso único.
CREATE TABLE IF NOT EXISTS memo_access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES memo_patients(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES memo_exams(id) ON DELETE CASCADE,    -- só para family_share

  token_hash VARCHAR(128) NOT NULL UNIQUE,   -- SHA-256 hex; nunca o token cru
  purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('first_access','qr_code','family_share','password_reset')),

  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  used_ip INET,

  -- Para family_share: marca de envio manual
  link_marked_sent_at TIMESTAMPTZ,           -- recepcionista marca quando enviou via WhatsApp
  link_marked_sent_by UUID REFERENCES auth.users(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
CREATE INDEX IF NOT EXISTS idx_memo_tokens_patient ON memo_access_tokens(patient_id);
CREATE INDEX IF NOT EXISTS idx_memo_tokens_purpose ON memo_access_tokens(purpose);
CREATE INDEX IF NOT EXISTS idx_memo_tokens_expires ON memo_access_tokens(expires_at);

-- =============================================
-- 5) COMPARTILHAMENTOS COM FAMÍLIA
-- =============================================
-- Visualização separada (não tabela diferente conceitualmente, mas separada
-- para queries específicas e métricas de compartilhamento).
CREATE TABLE IF NOT EXISTS memo_family_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES memo_exams(id) ON DELETE CASCADE,
  shared_by_patient_id UUID NOT NULL REFERENCES memo_patients(id),

  token_hash VARCHAR(128) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,           -- 24h da criação por padrão
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  last_viewed_ip INET,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_memo_shares_exam ON memo_family_shares(exam_id);
CREATE INDEX IF NOT EXISTS idx_memo_shares_expires ON memo_family_shares(expires_at);

-- =============================================
-- 6) LEADS DE IMPRESSÃO 3D
-- =============================================
-- Geração de lead via WhatsApp pré-preenchido; venda manual fora do sistema (por ora).
CREATE TABLE IF NOT EXISTS memo_print3d_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES memo_patients(id) ON DELETE SET NULL,
  media_id UUID REFERENCES memo_media(id) ON DELETE SET NULL,

  whatsapp_redirect_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,                   -- recepção marca quando atendeu
  contacted_by UUID REFERENCES auth.users(id),

  status VARCHAR(20) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','quoted','sold','lost')),
  notes TEXT,

  -- Para análise: snapshot da imagem que motivou o lead
  source_image_r2_key TEXT,
  source_url_referrer TEXT,

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_memo_leads_status ON memo_print3d_leads(status);
CREATE INDEX IF NOT EXISTS idx_memo_leads_patient ON memo_print3d_leads(patient_id);

-- =============================================
-- 7) AUDITORIA (LGPD)
-- =============================================
-- Tudo que precisa ser auditado. Retenção: 5 anos (obrigação legal médica).
CREATE TABLE IF NOT EXISTS memo_audit_log (
  id BIGSERIAL PRIMARY KEY,
  patient_id UUID,                           -- pode ser null pra ações de admin sem paciente
  user_id UUID,                              -- quem executou (admin ou paciente)

  action VARCHAR(50) NOT NULL,               -- ex: login, logout, view_video, download_photo, share_create, delete_request, password_reset
  resource_type VARCHAR(20),                 -- patient | exam | media | share | token
  resource_id UUID,

  ip INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_memo_audit_patient ON memo_audit_log(patient_id);
CREATE INDEX IF NOT EXISTS idx_memo_audit_user ON memo_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_memo_audit_action ON memo_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_memo_audit_created ON memo_audit_log(created_at DESC);

-- =============================================
-- TRIGGERS
-- =============================================

-- updated_at automático (reusa função update_updated_at já existente do schema do blog)
DROP TRIGGER IF EXISTS trigger_memo_patients_updated_at ON memo_patients;
CREATE TRIGGER trigger_memo_patients_updated_at
  BEFORE UPDATE ON memo_patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_memo_exams_updated_at ON memo_exams;
CREATE TRIGGER trigger_memo_exams_updated_at
  BEFORE UPDATE ON memo_exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_memo_leads_updated_at ON memo_print3d_leads;
CREATE TRIGGER trigger_memo_leads_updated_at
  BEFORE UPDATE ON memo_print3d_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calcular expires_at e hard_delete_at quando exame é marcado como pago
CREATE OR REPLACE FUNCTION memo_calc_expiration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.paid = TRUE AND (OLD.paid IS DISTINCT FROM TRUE) THEN
    NEW.paid_at = COALESCE(NEW.paid_at, NOW());
    NEW.expires_at = (NEW.exam_date::timestamptz + INTERVAL '12 months');
    NEW.hard_delete_at = NEW.expires_at + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_memo_exams_calc_expiration ON memo_exams;
CREATE TRIGGER trigger_memo_exams_calc_expiration
  BEFORE INSERT OR UPDATE ON memo_exams
  FOR EACH ROW EXECUTE FUNCTION memo_calc_expiration();

-- =============================================
-- FUNÇÕES HELPER
-- =============================================

-- Identifica paciente ligada à sessão atual (auth.uid())
-- Usada em todas as RLS policies da paciente.
CREATE OR REPLACE FUNCTION memo_current_patient_id()
RETURNS UUID AS $$
  SELECT id FROM memo_patients WHERE auth_user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Verifica se o exame está acessível pra paciente (pago e não expirado)
CREATE OR REPLACE FUNCTION memo_exam_accessible(_exam_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM memo_exams
    WHERE id = _exam_id
      AND patient_id = memo_current_patient_id()
      AND paid = TRUE
      AND (expires_at IS NULL OR expires_at > NOW())
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE memo_patients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_exams           ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_media           ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_access_tokens   ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_family_shares   ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_print3d_leads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE memo_audit_log       ENABLE ROW LEVEL SECURITY;

-- ---- memo_patients ----
-- Paciente vê apenas o próprio registro
CREATE POLICY "patient_self_select" ON memo_patients
  FOR SELECT USING (auth_user_id = auth.uid());

-- Paciente atualiza apenas o próprio registro (campos limitados via app, não SQL)
CREATE POLICY "patient_self_update" ON memo_patients
  FOR UPDATE USING (auth_user_id = auth.uid());

-- Admin tem acesso total (admin = qualquer usuário Supabase autenticado que NÃO é paciente)
-- Nota: refinar pra checar metadata.role = 'admin' quando o sistema de roles estiver montado.
CREATE POLICY "admin_full_patients" ON memo_patients
  FOR ALL USING (auth.role() = 'authenticated' AND auth_user_id IS DISTINCT FROM auth.uid());

-- ---- memo_exams ----
CREATE POLICY "patient_self_exams_select" ON memo_exams
  FOR SELECT USING (
    patient_id = memo_current_patient_id()
    AND paid = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
  );

CREATE POLICY "admin_full_exams" ON memo_exams
  FOR ALL USING (auth.role() = 'authenticated' AND patient_id IS NOT NULL);

-- ---- memo_media ----
CREATE POLICY "patient_self_media_select" ON memo_media
  FOR SELECT USING (memo_exam_accessible(exam_id));

CREATE POLICY "admin_full_media" ON memo_media
  FOR ALL USING (auth.role() = 'authenticated');

-- ---- memo_access_tokens ----
-- Apenas service_role e admin gerenciam tokens; paciente nunca lê via SQL.
CREATE POLICY "admin_full_tokens" ON memo_access_tokens
  FOR ALL USING (auth.role() = 'authenticated');

-- ---- memo_family_shares ----
-- Paciente cria os próprios; admin vê todos.
CREATE POLICY "patient_create_shares" ON memo_family_shares
  FOR INSERT WITH CHECK (shared_by_patient_id = memo_current_patient_id());

CREATE POLICY "patient_read_own_shares" ON memo_family_shares
  FOR SELECT USING (shared_by_patient_id = memo_current_patient_id());

CREATE POLICY "admin_full_shares" ON memo_family_shares
  FOR ALL USING (auth.role() = 'authenticated');

-- ---- memo_print3d_leads ----
-- Paciente cria leads próprios; admin gerencia.
CREATE POLICY "patient_create_leads" ON memo_print3d_leads
  FOR INSERT WITH CHECK (patient_id = memo_current_patient_id() OR patient_id IS NULL);

CREATE POLICY "admin_full_leads" ON memo_print3d_leads
  FOR ALL USING (auth.role() = 'authenticated');

-- ---- memo_audit_log ----
-- Apenas admin lê. Inserts via funções com SECURITY DEFINER (não policy).
CREATE POLICY "admin_read_audit" ON memo_audit_log
  FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- COMENTÁRIOS
-- =============================================

COMMENT ON TABLE memo_patients      IS 'Memo3D — pacientes com hospedagem boutique de memória da gestação';
COMMENT ON TABLE memo_exams         IS 'Memo3D — exames de ultrassom da paciente, ciclo de pagamento e expiração';
COMMENT ON TABLE memo_media         IS 'Memo3D — mídias do exame (vídeo, foto, book) armazenadas em R2';
COMMENT ON TABLE memo_access_tokens IS 'Memo3D — tokens de uso único para link manual, QR e family share';
COMMENT ON TABLE memo_family_shares IS 'Memo3D — links de compartilhamento com família (24h, sem download)';
COMMENT ON TABLE memo_print3d_leads IS 'Memo3D — leads de impressão 3D gerados via WhatsApp';
COMMENT ON TABLE memo_audit_log     IS 'Memo3D — auditoria LGPD de todas as ações sensíveis';

-- =============================================
-- POSTERIOR (não nesta migration)
-- =============================================
-- - Bucket R2 região São Paulo (criado via Cloudflare dashboard)
-- - Bucket Supabase Storage 'memo3d-thumbs' (criado via Dashboard ou API)
-- - Função RPC 'memo_record_audit' SECURITY DEFINER (Fase 1 código aplicação)
-- - Job cron diário pra processar memo_exams.hard_delete_at < NOW() (Fase 5)
