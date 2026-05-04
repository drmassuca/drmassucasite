# INTEGRATION_PLAN.md — Memo3D dentro do drmassuca.com.br

> Plano vivo. Atualizado a cada decisão. **Nada disso vira código sem aprovação fase a fase.**

**Data inicial:** 2026-05-04
**Autor das decisões:** Dr. Antonio Massucatti Neto (CRM-GO 17475)
**Nome provisório do módulo:** Memo3D
**Localização:** `drmassuca.com.br/memo3d` (rota interna)

---

## 1. Sumário executivo

Memo3D é um **módulo novo dentro do site do Dr. Massuca**, não um produto separado. Ele oferece duas ofertas integradas, ambas com a marca do Dr. Massuca:

1. **Hospedagem boutique da memória da gestação** — galeria privada com vídeos, fotos e book 3D do feto, acesso por 12 meses, R$30 cobrados como add-on no balcão.
2. **Impressão 3D do feto** — produto físico premium baseado na imagem do ultrassom. Por enquanto, contato via WhatsApp; pagamento online é roadmap futuro.

O foco é experiência boutique para a gestante, com argumento de credibilidade nos dois aparelhos premium (Voluson S10 + Samsung HERA Z20) que viram inclusive página de SEO.

O repo `Xdiag-IA/eternize3d` (e-commerce de quadros físicos com Next.js) é **descontinuado**. Conteúdo aproveitável (textos, imagens, ideias) é portado para o Memo3D em Vite/Chakra dentro do drmassucasite. A ideia de "quadro shadow box" foi descartada pelo médico — produto vai ser impressão 3D pura.

---

## 2. Estado atual

### 2.1 `drmassucasite` (este repo, ativo, em produção)

**Stack:**
- Vite 7 + React 18 + Chakra UI 2 + framer-motion
- React Router 6 com lazy loading agressivo
- Supabase (auth + DB + Storage)
- Vercel deploy + serverless functions em `/api`
- Prerender estático no build (SEO)

**Já existe e é reaproveitável:**
- Painel admin maduro em `/admin` com `AuthProvider`, `ProtectedRoute`, `AdminLayout` (`src/admin/AdminRoutes.jsx`) — base para o painel da recepção.
- Página `/ultrassom-3d` (`src/pages/ultrassom-3d.jsx`) já com schema.org `MedicalTest` — vira **CTA natural pro Memo3D** ("Veja a memória 3D da sua gestação aqui").
- Página `/area-do-paciente` é informativa (preparo, FAQ); o naming não conflita com a área autenticada do Memo3D porque essa fica em `/memo3d/conta`.
- Sistema de FAQ dinâmico no Supabase + 48 subpáginas estáticas.
- Programa Site Vivo (FAQ Vivo, Vitals Vivo, SEO Vivo) com painel admin já operando — Memo3D pode ganhar um painel novo no mesmo padrão (`/admin/memo3d`).
- Schema atual no Supabase: `articles`, `categories`, `article_templates`, `article_revisions`, `media`, `blog_settings`, `ai_logs` — nada relacionado a paciente.
- Cores marca confirmadas no `App.jsx`: verde escuro `#0f3d2e`, dourado `#d4af37` — paleta perfeita pra identidade boutique.
- Lib utilitária: `src/lib/{ai,articles,storage,supabase}.js`.

**Não existe ainda (precisa ser construído):**
- Schema de pacientes, exames, mídias do exame, sessões.
- Fluxo de auth da paciente (Phone OTP). O auth atual é só admin (`auth.role() = 'authenticated'`).
- Integração com R2 (hoje só Supabase Storage para `article-images`).
- Provedor de SMS (Zenvia ou Twilio).
- Painel da recepção.

### 2.2 `eternize3d` (separado, será descontinuado)

**Stack atual:** Next.js 16 + React 19 + TS + Tailwind 4 (incompatível direto com drmassucasite).

**Conteúdo aproveitável (vai ser portado para Vite/Chakra):**
- Textos de Hero, About, HowItWorks, Heartbeat, Testimonials, FAQ — adaptados para impressão 3D pura (sem shadow box / quadro / LED).
- Catálogo de produtos: vai ser **simplificado e renomeado** para impressão 3D do feto, com 2-3 SKUs no máximo (decisão de produto pendente).
- Imagens AI-generated nas pastas `web/public/images/` (decidir caso a caso o que se aproveita; muitas mostram "quadro" e não servem).
- Estrutura de páginas legais (privacy, termos) já existe; refazer adaptado pro Memo3D.

**Conteúdo descartado:**
- Toda menção a "quadro shadow box" / "LED" / "som de batimento" — o Dr. descartou essa ideia.
- Nome "Eternize" — porque a description do GitHub está como "memorial 3D para pets", e qualquer associação com pet é prejudicial à marca médica.
- Stack Next.js — não casa com Vite/Chakra do site principal.
- Componentes JSX/TSX — reescritos do zero em Chakra para casar com o sistema visual do Massuca.

### 2.3 O que NÃO existe nem em um nem outro

Tudo que está no briefing original de SaaS:
- Schema de paciente / exame / mídia / sessão.
- Auth Phone OTP da paciente.
- Sistema de QR code para acesso na clínica.
- Integração R2.
- Painel admin da recepção (cadastrar paciente, marcar pago, gerar QR).
- Galeria privada da paciente.
- Compartilhamento com família (link expirável 24h).
- Política de retenção 12 meses + apagamento real.
- Logs de auditoria.

Tudo isso é construído do zero. **Não é "quase pronto, falta integrar"** — é projeto novo.

---

## 3. Decisão arquitetural

### 3.1 Por que rota interna vence subdomínio (SEO/GEO)

Decisão fechada com o Dr.: **Memo3D fica em `drmassuca.com.br/memo3d`**, não em subdomínio.

Motivos:
1. **Autoridade herdada na hora.** O domínio principal já tem idade, backlinks e sinais de E-E-A-T médico (CRM, schema MedicalBusiness, conteúdo do blog). Subdomínio é tratado pelo Google como entidade quase separada — herança parcial e demorada.
2. **GEO Itaberaí.** Cidade pequena, autoridade local fragmentada em dois subdomínios é pior que concentrada em um. Schema `MedicalClinic` + `Service` + `Product` no mesmo domínio = uma entidade forte na busca local.
3. **AEO/GEO generativo.** ChatGPT/Perplexity/Gemini citam fontes consolidadas. Um domínio = uma citação acumulada. Dois subdomínios = risco de nenhum ganhar tração.
4. **Coerência semântica.** Ultrassom + memórias 3D + impressão 3D são serviços do MESMO médico, no MESMO consultório. Sinal que o Google quer ver consolidado.
5. **Investimento já feito.** Site Vivo, Vitals Vivo, FAQ Vivo, SEO Vivo já operam no domínio principal. Subdomínio começa do zero.

Custo aceito: header/footer/menu compartilhados com o site principal. Resolvido com **tema Chakra secundário** (`memo3dTheme`) aplicado só no escopo `/memo3d/*` — vibe boutique premium, mas dentro do mesmo shell visual.

### 3.2 Stack consolidada

| Camada | Decisão | Motivo |
|---|---|---|
| Frontend | Vite + React 18 + Chakra UI (mesmo do site) | Casa com o existente. Reuso de Header, Footer, lib, theme. |
| Backend público | Vercel functions em `/api/memo3d/*` | Já há padrão `/api` no projeto. |
| Auth admin | Supabase Auth (já em uso) | Reaproveita `AuthProvider`, `ProtectedRoute`. |
| Auth paciente | Supabase Email Auth (com email derivado do telefone) + token de primeiro acesso + CPF 4 últimos dígitos | Sem provider SMS na entrega inicial. Recepção envia link via WhatsApp manualmente. SMS automático fica como roadmap futuro. |
| Banco | Supabase Postgres com RLS | Já em uso no site. RLS isola dados por paciente. |
| Storage mídia leve (thumbs) | Supabase Storage | Já em uso. Bom para arquivos pequenos. |
| Storage mídia pesada (vídeo/foto exame) | CloudFlare R2 (região São Paulo) | Custo de egress zero, conformidade LGPD com região BR, suporta 500MB+ por arquivo. |
| Geração thumbs | Vercel Function (serverless ffmpeg/sharp) | Sob demanda no upload. |
| QR code | Geração via biblioteca leve (`qrcode`) no painel admin | Imprime e entrega no balcão. |

**Repo:** continua só `drmassucasite`. Repo `eternize3d` é arquivado no GitHub como referência histórica após a migração de conteúdo.

---

## 4. Modelo de dados (Supabase)

Tabelas novas no schema atual. Convenção: prefixo `memo_` para isolar do que já existe.

```sql
-- Paciente (usuária final)
memo_patients (
  id UUID PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,        -- E.164: +5562999999999
  cpf_last4 VARCHAR(4) NOT NULL,             -- só os 4 últimos para validação QR
  cpf_hash VARCHAR(64),                      -- hash do CPF completo (para deduplicação sem expor)
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id), -- recepcionista que cadastrou
  consent_lgpd_at TIMESTAMPTZ,               -- quando aceitou termo
  consent_lgpd_ip INET,                      -- IP de onde aceitou
  status VARCHAR(20) DEFAULT 'pending'       -- pending | active | expired | deleted
)

-- Exame (uma paciente pode ter vários ao longo da gestação)
memo_exams (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES memo_patients(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  exam_type VARCHAR(50),                     -- morfo 1tri, morfo 2tri, 4D, etc
  device VARCHAR(20),                        -- 'voluson_s10' | 'hera_z20'
  paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  paid_amount_cents INTEGER,                 -- 3000 = R$30,00
  expires_at TIMESTAMPTZ,                    -- exam_date + 12 meses (calculado no momento do pagamento)
  hard_delete_at TIMESTAMPTZ,                -- expires_at + 30 dias de carência
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
)

-- Mídia (vídeo, foto, book) ligada a um exame
memo_media (
  id UUID PRIMARY KEY,
  exam_id UUID REFERENCES memo_exams(id) ON DELETE CASCADE,
  kind VARCHAR(20) NOT NULL,                 -- 'video' | 'photo' | 'book_page'
  filename VARCHAR(255),
  size_bytes BIGINT,
  duration_seconds INTEGER,                  -- só para vídeo
  r2_key TEXT NOT NULL,                      -- caminho no R2
  thumbnail_r2_key TEXT,                     -- thumb gerada
  width INTEGER,
  height INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id),
  position INTEGER DEFAULT 0                 -- ordem dentro do book
)

-- Token de primeiro acesso (link único enviado por SMS)
memo_access_tokens (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES memo_patients(id) ON DELETE CASCADE,
  token_hash VARCHAR(64) NOT NULL UNIQUE,    -- hash do token, nunca o token cru
  purpose VARCHAR(20),                       -- 'first_access' | 'qr_code' | 'family_share'
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  exam_id UUID REFERENCES memo_exams(id),    -- só para family_share: qual exame compartilhar
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Compartilhamento com família (link com expiração curta)
memo_family_shares (
  id UUID PRIMARY KEY,
  exam_id UUID REFERENCES memo_exams(id) ON DELETE CASCADE,
  shared_by_patient_id UUID REFERENCES memo_patients(id),
  token_hash VARCHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,           -- 24h da criação
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Lead de impressão 3D (geração de pedido via WhatsApp)
memo_print3d_leads (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES memo_patients(id),  -- pode ser null se for visitante anônimo
  media_id UUID REFERENCES memo_media(id),       -- a foto que motivou
  whatsapp_redirect_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,                       -- recepção marca quando atendeu
  status VARCHAR(20) DEFAULT 'new',               -- new | contacted | quoted | sold | lost
  notes TEXT
)

-- Auditoria — TUDO que precisa ser auditado pra LGPD
memo_audit_log (
  id BIGSERIAL PRIMARY KEY,
  patient_id UUID,
  user_id UUID,                              -- quem fez (admin ou paciente)
  action VARCHAR(50) NOT NULL,               -- login, view_video, download_photo, share_create, delete_request, etc
  resource_type VARCHAR(20),                 -- patient | exam | media | share
  resource_id UUID,
  ip INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Row Level Security (RLS)

- `memo_patients`: a paciente vê só o próprio registro (`auth.uid() = id`); admin vê todos.
- `memo_exams`: a paciente vê só os exames com `patient_id = auth.uid() AND paid = true`; admin vê todos.
- `memo_media`: idem, via join com exames.
- `memo_audit_log`: só admin lê; inserts via funções com `SECURITY DEFINER`.
- `memo_print3d_leads`: paciente cria os próprios; admin vê todos.

Detalhamento das policies fica nos ADRs.

---

## 5. Fluxos

### 5.1 Cadastro pela recepção

1. Recepcionista loga em `/admin` (Supabase Auth, já existe).
2. Acessa `/admin/memo3d/pacientes/nova`.
3. Preenche: nome, celular E.164, 4 últimos dígitos do CPF, data e tipo do exame, aparelho usado, observações.
4. Faz upload dos arquivos do exame (drag-and-drop). Arquivos vão direto pro R2 via URL pré-assinada (não passam pelo backend).
5. Recepcionista marca "Pago R$30" se a paciente pagou no balcão. Sem isso, o registro fica `paid = false` e o acesso da paciente fica bloqueado.
6. Sistema:
   - Calcula `expires_at = exam_date + 12 meses` e `hard_delete_at = expires_at + 30 dias`.
   - Gera QR code com token assinado (rota `/memo3d/qr/{token}`) e abre dialog "Imprimir QR".
   - Gera link de primeiro acesso (token assinado, expira em 7 dias) e mostra na tela botões **"Copiar link"** + **"Abrir WhatsApp da paciente"** (`wa.me/<celular>` com texto pronto). A recepção envia o link manualmente via WhatsApp.
   - Registra evento no `memo_audit_log`.

### 5.2 Acesso da paciente

**Caminho A — primeiro acesso via link manual da recepção:**
1. Recepção envia link manualmente via WhatsApp: "Olá Maria, suas memórias 3D estão prontas. Acesse: drmassuca.com.br/memo3d/ativar/{token}".
2. Paciente clica → tela "Confirme com os 4 últimos dígitos do CPF" (mesmo fator que o QR usa; protege caso o link caia em mãos erradas).
3. Acerta → tela "Defina sua senha" (mín 8 chars).
4. Aceita termo LGPD (registra consentimento + IP).
5. Entra na conta. Token marcado como usado.

**Caminho B — QR code na clínica:**
1. Recepcionista entrega papel com QR.
2. Paciente escaneia → tela "Confirme com 4 últimos dígitos do CPF".
3. Acerta → entra direto. Sistema marca QR como usado.
4. Sistema sugere "Quer definir uma senha pra acessar de casa também?" (opcional).

**Sessões subsequentes:**
- Login via celular + senha.
- Sessão dura 30 dias (refresh token Supabase).
- Logout fecha sessão mas conta permanece.

### 5.3 Galeria

Tela em `/memo3d/conta`:
- Header com identidade Memo3D (verde Massuca + dourado, vibe boutique).
- Aviso de expiração: "Suas memórias ficam disponíveis até [data]".
- Tabs: **Vídeos** | **Fotos** | **Book 3D**.
- Vídeos: player nativo HTML5, sem botão de download, com `controlsList="nodownload"` e backend não serve URL direta — apenas URL assinada de curta duração regerada a cada play.
- Fotos: grid responsivo, baixar permitido (botão por foto).
- Book 3D: galeria sequencial das imagens 3D do feto.
- Botão "Quero impressão 3D dessa imagem" → abre WhatsApp pré-preenchido com a imagem em anexo (via texto + URL temporária assinada da imagem).
- Botão "Compartilhar com família" → gera link `/memo3d/familia/{token}` com expiração 24h, sem download.

### 5.4 Upsell impressão 3D (WhatsApp)

Por enquanto **simples e direto**:
1. Paciente clica "Quero 3D dessa imagem" na galeria.
2. Sistema:
   - Cria registro em `memo_print3d_leads` com `media_id` da imagem.
   - Gera URL assinada temporária (24h) da imagem em alta resolução.
   - Monta `wa.me/55..?text=Olá%2C+gostaria+de+um+3D+dessa+imagem%3A+{url}`.
3. WhatsApp abre, paciente envia mensagem.
4. Recepção atende manualmente, marca `contacted_at` no painel admin.

Roadmap futuro (não entra agora): catálogo de SKUs, preços, link de pagamento, integração com sistema de impressão.

---

## 6. Painel admin

Rotas novas dentro do `/admin` existente, seguindo o padrão atual:

```
/admin/memo3d                 → Dashboard (KPIs)
/admin/memo3d/pacientes       → Lista
/admin/memo3d/pacientes/nova  → Cadastro
/admin/memo3d/pacientes/:id   → Detalhe + upload mídia + marcar pago + reenviar SMS + reimprimir QR
/admin/memo3d/exames          → Lista de exames (filtro por status, expiração)
/admin/memo3d/leads-3d        → Leads de impressão 3D (kanban: new → contacted → quoted → sold)
/admin/memo3d/configuracoes   → Mensagens SMS, política de retenção, etc
```

KPIs no dashboard:
- Pacientes ativas total.
- Expirando nos próximos 30 dias.
- Receita do mês (R$30 × pagas).
- Conversão add-on: % das pacientes do mês que aceitaram o R$30.
- Leads 3D pendentes de atendimento.

---

## 7. Integração visual

### 7.1 Tema boutique

Theme secundário em `src/memo3d/theme.js`, estendendo o `theme.js` global:
- Verde escuro Massuca `#0f3d2e` como primary.
- Dourado `#d4af37` como accent.
- Tipografia heading com fonte serif premium (sugestão: Playfair Display via Google Fonts) para reforçar vibe boutique.
- Espaçamento generoso, cards com bordas arredondadas grandes (2xl), sombras suaves.
- Aplicado via `<ChakraProvider theme={memo3dTheme}>` só dentro do escopo `/memo3d/*`.

### 7.2 Pontos de entrada

1. **Header global**: link "Memo3D" visível na barra superior (decisão do Dr. — destaque no menu).
2. **Home (`/`)**: seção dedicada na página inicial do site, com CTA "Conheça o Memo3D".
3. **Página `/ultrassom-3d` existente**: CTA "Veja como guardar essas memórias por 12 meses".
4. **Schema.org**: marcar Memo3D como `Service` filho do `MedicalBusiness` Dr. Massuca.

### 7.3 Aparelhos como argumento

Página `/memo3d/equipamentos` (ou seção dentro de `/memo3d`):
- Voluson S10 — descrição técnica + foto.
- Samsung HERA Z20 — "o aparelho mais avançado do mundo para ultrassonografia obstétrica" + foto.
- Vira **página de SEO** otimizada pra "ultrassom HERA Z20 Itaberaí" e similares.

---

## 8. Conformidade LGPD

Dado de saúde é dado pessoal sensível (LGPD art. 5º, II). Compromissos:

1. **Storage no Brasil.** R2 região São Paulo. Confirmar nas credenciais quando o Dr. passar.
2. **Sem terceiros no caminho do conteúdo.** Sem Vimeo/YouTube/Drive. R2 + nosso backend, fim.
3. **Termo de consentimento específico** para hospedagem da imagem por 12 meses, base legal "consentimento" (art. 7º, I). Texto separado do termo do site principal.
4. **Política de privacidade da galeria** distinta da política do site (`/memo3d/privacidade`).
5. **Termos de uso** específicos (`/memo3d/termos`).
6. **Auditoria** completa em `memo_audit_log`: quem acessou o quê, quando, IP, user agent.
7. **Direitos do titular** acessíveis dentro da conta:
   - Ver dados.
   - Exportar (download de tudo).
   - Solicitar correção.
   - Solicitar exclusão imediata ("deletar minha conta") — apaga registro + mídias R2 + log de exclusão preservado.
8. **CPF nunca é senha.** Apenas 4 últimos dígitos como segundo fator no fluxo QR.
9. **Apagamento real ao expirar.** Job diário (cron Vercel ou Supabase scheduled function) que verifica `hard_delete_at < NOW()` e:
   - Deleta arquivos no R2.
   - Soft delete em `memo_media`, `memo_exams`.
   - Mantém registro de auditoria por 5 anos (obrigação legal médica).

---

## 9. Roadmap em fases

Cada fase termina com PR aberto, revisão pelo Dr., aprovação, merge. **Nenhum rebase em main sem ok.**

### Fase 0 — Fundação (esta fase, sem código ainda)
- [x] Mapear estado atual de drmassucasite e eternize3d.
- [x] Decidir arquitetura (rota interna, stack consolidada, Supabase + R2).
- [x] Confirmar nome provisório (Memo3D).
- [x] Escrever este `INTEGRATION_PLAN.md`.
- [ ] **Aprovação do Dr. para iniciar Fase 1.** ⬅️ aguardando aqui.

### Fase 1 — Schema, Auth e Storage
- [x] ADR-001: por que rota interna em vez de subdomínio.
- [x] ADR-002: Supabase + R2 vs backend separado.
- [x] ADR-003: Auth da paciente com link manual via WhatsApp em vez de SMS automático.
- [x] Migration SQL com tabelas `memo_*` e RLS (`supabase/memo3d_schema.sql`).
- [ ] Aplicar migration no projeto Supabase do Dr. (ele executa via SQL Editor).
- [ ] Configurar bucket R2 (Dr. passa credenciais).
- [ ] Funções utilitárias em `src/lib/memo3d/`: `r2.js`, `tokens.js`, `audit.js`.
- [ ] Sem UI ainda. Smoke test via script.

### Fase 2 — Painel admin da recepção
- [ ] Rotas `/admin/memo3d/*`.
- [ ] CRUD de paciente, exame, mídia.
- [ ] Upload direto pro R2 via URL pré-assinada.
- [ ] Geração de QR + PDF imprimível.
- [ ] Disparo de SMS de boas-vindas.
- [ ] Marcar pago / desmarcar.
- [ ] Documentação de operação (`docs/recepcao-memo3d.md`).

### Fase 3 — Galeria da paciente
- [ ] Auth fluxo SMS+senha + fluxo QR.
- [ ] Termo LGPD + registro de consentimento.
- [ ] Tela `/memo3d/conta` com tabs vídeos/fotos/book.
- [ ] Player de vídeo seguro (URL assinada efêmera).
- [ ] Compartilhamento família (link 24h).
- [ ] Botão "Quero 3D" → WhatsApp.

### Fase 4 — Conteúdo portado do eternize3d
- [ ] Página de marketing `/memo3d` (landing pública).
- [ ] Seções: Hero, Como Funciona, Aparelhos (Voluson + HERA Z20), Impressão 3D, FAQ, Depoimentos.
- [ ] Textos adaptados (sem "quadro shadow box").
- [ ] Imagens reaproveitadas onde fizer sentido + novas (Dr. tira fotos reais dos exames + impressão).
- [ ] Schema.org Service + Product.

### Fase 5 — Apagamento, auditoria e conformidade
- [ ] Job de hard delete diário.
- [ ] Telas de direitos do titular dentro da conta.
- [ ] Política e termos.
- [ ] Auditoria completa em todas as ações sensíveis.

### Fase 6 — Testes e lançamento
- [ ] E2E: recepção cadastra → marca pago → SMS chega → paciente acessa → vê vídeos → compartilha com família → solicita 3D.
- [ ] Teste real do QR físico (gerar, imprimir, escanear).
- [ ] Teste em 3 navegadores + iOS Safari + Android Chrome.
- [ ] Treinamento da recepção.
- [ ] Soft launch com 5 pacientes piloto.
- [ ] Lançamento aberto.

### Roadmap futuro (não entra na entrega inicial)
- Catálogo de SKUs de impressão 3D + checkout online.
- Integração com sistema de impressão (envia automaticamente pra fila).
- Renovação automática de hospedagem (paciente paga +12 meses).
- App mobile.

---

## 10. ADRs (Architecture Decision Records)

Pasta `/docs/adr/` será criada na Fase 1. Cada ADR é Markdown numerado, formato Michael Nygard (Context, Decision, Status, Consequences).

ADRs:
- **ADR-001**: Rota interna em vez de subdomínio. ✅ escrito (`docs/adr/ADR-001-rota-interna-vs-subdominio.md`)
- **ADR-002**: Supabase + R2 em vez de backend separado. ✅ escrito
- **ADR-003**: Auth da paciente com link manual via WhatsApp em vez de SMS automático. ✅ escrito
- ADR-004: Schema com prefixo `memo_` no banco existente em vez de schema separado. (escrever na Fase 1 final)
- ADR-005: Tema secundário Chakra em vez de framework de UI separado. (escrever na Fase 4)
- ADR-006: WhatsApp pré-preenchido para upsell 3D em vez de checkout próprio. (escrever na Fase 3)

---

## 11. Riscos e premissas

| Risco | Impacto | Mitigação |
|---|---|---|
| R2 região São Paulo não disponível | Alto (LGPD) | Confirmar antes da Fase 1. Plano B: Supabase Storage (mais caro mas BR). |
| Recepção esquecer de enviar link manual | Médio | Painel destaca status "link gerado mas não enviado" + checklist visual. |
| Vídeo grande (500MB) estourando upload | Médio | Upload multipart direto pro R2, não passa pelo backend. |
| Recepção não usar o sistema | Alto | Treinamento + UI muito enxuta + documentação visual. |
| Paciente perder o celular cadastrado | Médio | Recepção pode resetar telefone via painel. |
| LGPD: vazamento de imagem | Crítico | URLs assinadas curtas, RLS estrita, auditoria, sem CDN público. |
| Branding "Memo3D" não convencer | Baixo | Nome provisório. Trocar é só `find/replace`. |
| eternize3d ainda em desenvolvimento ativo (último commit hoje) | Médio | Confirmar com Dr. que pode arquivar. Aproveitar conteúdo antes. |

Premissas:
- Dr. tem conta Cloudflare e vai criar bucket R2 quando chegar a Fase 1.
- Recepção opera com WhatsApp Web/Desktop no balcão (já é a prática atual).
- Site segue rodando em Vercel + Supabase com plan atual; Memo3D não estoura limite.

---

## 12. Próximos passos imediatos

1. Dr. lê este plano.
2. Dr. aprova ou pede ajustes.
3. Se aprovado: criar branch `feat/memo3d-fase-1`, abrir PR vazio com referência a este plano, começar pela migration SQL + ADR-001.
4. Se ajustes: atualizar este documento, repetir aprovação.

**Não vou tocar em código até aprovação explícita.**
