# ADR-002: Supabase existente + R2 para mídia, em vez de backend separado (FastAPI/Hono)

**Data:** 2026-05-04
**Status:** Aceito
**Decisores:** Dr. Antonio Massucatti

---

## Contexto

O briefing inicial do Dr. sugeriu como stack preferida:
- Backend: Python (FastAPI) ou Node (Hono/Express).
- Banco: PostgreSQL (Supabase ok).
- Storage: CloudFlare R2.

Mas com a decisão de mover Memo3D para dentro do `drmassucasite` (ADR-001), aparece uma alternativa que o briefing não considerava: **reusar a infra que o site já tem**.

O `drmassucasite` em produção hoje:
- Supabase Auth + Postgres com RLS (login admin, blog `articles`, FAQ dinâmico).
- Vercel Functions em `/api/*` (geração FAQ, OG images).
- Supabase Storage com bucket `article-images`.

Construir um backend FastAPI separado significaria:
- Novo serviço pra hospedar (Render/Railway/VPS) — custo recorrente, novo ponto de falha.
- Novo deploy pipeline.
- Auth em dois lugares (Supabase pro site, FastAPI pro Memo3D) — ou complicação JWT compartilhado.
- Duplicar conexão DB, duplicar config, duplicar observabilidade.
- Stack diferente do resto do projeto (Python no time JS).

R2 entra como única peça realmente externa, e exclusivamente para mídia pesada (vídeo de ultrassom pode ter 500MB+, foto de exame em alta resolução).

## Decisão

**Stack consolidada:**

- **Auth admin:** Supabase Auth (já em uso, sem mudança).
- **Auth paciente:** Supabase Email Auth (com email derivado do telefone) — ver ADR-003.
- **Banco:** Supabase Postgres com RLS, mesmo schema, tabelas com prefixo `memo_*`.
- **API pública:** Vercel Functions em `/api/memo3d/*`. Padrão já existente no projeto.
- **Storage mídia leve (thumbs):** Supabase Storage.
- **Storage mídia pesada (vídeo, foto exame):** CloudFlare R2 região São Paulo. Upload direto do navegador via URL pré-assinada.
- **Geração de thumbnail:** Vercel Function disparada após upload (sharp pra imagem; vídeo gera thumb no upload com `<video>` API no client OU ffmpeg via função separada — decisão na Fase 1 dependendo de performance).

**Não usar:**
- FastAPI, Express, Hono, ou qualquer backend dedicado.
- Storage não-brasileiro (LGPD para dado de saúde).

## Consequências

### Positivas

- **Zero novo serviço pra manter.** Tudo roda na infra que já tem.
- **Custo extra mínimo.** R2 grátis até 10GB de storage e 1M de classe B operations/mês. Vercel Functions e Supabase já no plano atual.
- **Auth unificada.** Admin e paciente vivem no mesmo `auth.users` do Supabase, com perfis distintos via `raw_user_meta_data`. RLS funciona naturalmente com `auth.uid()`.
- **Dev velocity.** Mesma stack, mesma lib, mesmo padrão de código que o resto do `drmassucasite`. Onboarding zero pra qualquer um que mexa no projeto.
- **Conformidade LGPD direta.** Dados sensíveis no Supabase (BR) + R2 SP. Sem trânsito internacional desnecessário.
- **RLS ao invés de lógica de autorização em código.** Banco é a fonte da verdade — é mais difícil escapar.

### Negativas

- **Lock-in com Supabase aumenta.** Sair do Supabase no futuro é progressivamente mais caro. Aceitamos: o custo de migrar é menor que o custo de duplicar infra agora.
- **Vercel Functions têm limites.** Timeout de 10s no plano Hobby, 60s no Pro, 300s no Enterprise. Memória 1024MB no Pro. Suficiente pra 99% das operações Memo3D (gerar URL pré-assinada, gravar audit log, enviar query). **Exceção:** transcoding de vídeo, se necessário, vai estourar — plano B é Cloudflare Workers ou um Worker dedicado em separado. Por ora, NÃO transcoding — mantemos arquivo original.
- **Upload pesado não passa pelo nosso backend.** Bom pra performance e custo, mas perdemos o ponto natural pra validar conteúdo (antivírus, dimensões). Mitigado: validar no client (mime, tamanho), e fazer pós-checagem assíncrona via função.

### Riscos

- **Supabase storage row count limit.** Tier free aceita até X rows na tabela `storage.objects`. Como vamos usar R2 pra mídia pesada, baixo risco. Thumbs leves no Supabase storage (~uns kb cada) toleram volume grande.
- **R2 latência de upload pra usuários distantes da SP region.** Aceitável, paciente faz upload uma vez na vida; recepção sobe arquivo do balcão da clínica em GO (próximo de SP).
- **R2 indisponibilidade de uma região.** R2 não tem multi-região nativa. Plano B: replicação manual mensal pro Backblaze B2 ou outro (decidir antes do lançamento).

## Alternativas consideradas e descartadas

### FastAPI dedicado em VPS

- Mais flexível, mas custo recorrente, ponto de falha extra, stack alheia ao projeto.
- Útil quando há lógica server-side pesada (transcoding, ML, queue de processamento). Não é o caso do Memo3D na entrega inicial.

### Hono/Express em Vercel Edge

- Hono no Vercel Edge ou Cloudflare Workers seria uma forma de "fazer backend" sem servidor dedicado. Mais leve que FastAPI.
- Decidimos não adotar agora porque Vercel Functions tradicionais já cobrem o caso, e Hono adicionaria conceito novo (Edge Runtime) sem necessidade.
- Reabrir essa decisão **se** uma operação específica precisar de baixa latência global (não é o caso para clínica em Itaberaí com pacientes locais).

### Supabase Edge Functions (Deno)

- Alternativa razoável pra rodar lógica server-side dentro do ecossistema Supabase.
- Decidimos não adotar agora pra manter consistência com o padrão `/api/*` (Vercel Functions) já presente no projeto. Reabrir se algum endpoint precisar acesso especialmente próximo do Postgres (latência menor que Vercel↔Supabase).
