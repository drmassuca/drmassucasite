# ADR-004: Bucket R2 com região "Automatic" (sem hint para Brasil/SAM)

**Data:** 2026-05-04
**Status:** Aceito (com mitigação contratual via termo de consentimento)
**Decisores:** Dr. Antonio Massucatti

---

## Contexto

LGPD para dado pessoal sensível (saúde) recomenda fortemente armazenamento em servidor nacional ou em país com adequação reconhecida pela ANPD.

Cloudflare R2 oferece "location hints" para influenciar onde o storage primário fica (`wnam`, `enam`, `weur`, `eeur`, `apac`, `oc`). **Não há hint para América do Sul / Brasil** até a data desta decisão.

A opção `Automatic` deixa o R2 escolher o local conforme padrões de acesso. Para acessos vindos do Brasil, o R2 pode optar por NAM (Norte Américas) ou outra região disponível.

Alternativas avaliadas:
- **Plano B1**: descartar R2 e usar Supabase Storage (que herda a região do projeto Supabase, BR confirmado).
- **Plano B2**: criar projeto Supabase novo em SP só para o Memo3D (mas o projeto principal do drmassucasite já está numa região fixa, não dá pra mudar).
- **Plano B3**: aguardar Cloudflare lançar hint para SAM/BR.

Decisão do controlador (Dr. Antonio Massucatti, CRM-GO 17475):
- Conteúdo armazenado é **foto/vídeo do feto e da gestação** — memória pessoal/familiar com qualidade técnica de imagem médica, mas **não substitui laudo nem é prontuário clínico**.
- O laudo médico continua sendo entregue separadamente e armazenado em sistema próprio do consultório.
- A natureza do dado, embora sensível, é distinta de "dado clínico estruturado".

## Decisão

Manter o bucket R2 `memo3d` com region `Automatic`.

## Consequências

### Positivas

- Sem complexidade adicional de infra.
- Custo zero adicional (R2 free tier confortável).
- Mesma conta Cloudflare unificada com Stream, simplifica operação.

### Negativas

- Dado de paciente brasileiro pode ficar fisicamente em servidor fora do Brasil.
- LGPD exige tratamento como **transferência internacional** de dados pessoais (art. 33 e seguintes).
- Caso a ANPD venha a publicar regulamentação mais restritiva sobre dados de saúde, esta decisão precisa ser revisitada.

### Riscos

- Reclamação de paciente / fiscalização ANPD apontar inadequação. Mitigação contratual:
  - Termo de consentimento explícito da paciente sobre transferência internacional.
  - Cloudflare é signatária dos Standard Contractual Clauses (SCCs) — vale como base contratual de proteção.
  - Criptografia em trânsito (TLS) e em repouso (R2 nativo).
  - Apagamento real ao expirar (12 meses + 30 dias de carência).

## Mitigação obrigatória — termo de consentimento Memo3D

Antes do go-live em produção, o termo de consentimento deve cobrir:

1. **Identificação clara do tratamento**: hospedagem boutique de imagens/vídeos da gestação, NÃO laudo médico.
2. **Finalidade**: permitir à paciente revisitar e compartilhar com família a memória da gestação.
3. **Retenção**: 12 meses contados da data do exame, + 30 dias de carência, depois apagamento real.
4. **Transferência internacional**: explícita, com nome dos terceiros (Cloudflare R2 e Cloudflare Stream).
5. **Justificativa**: qualidade técnica do serviço, criptografia em trânsito e em repouso, SCCs aplicáveis.
6. **Direitos do titular**: acesso, correção, exclusão a qualquer momento, portabilidade.
7. **Versionamento**: registro em `memo_patients.consent_lgpd_version` para rastrear qual versão a paciente aceitou.

Sem esse termo aceito, a paciente **não tem acesso liberado à galeria** mesmo com `paid = true`.

## Critérios para revisitar

Esta decisão deve ser reaberta se:
- Cloudflare anunciar location hint para SAM/BR.
- ANPD publicar diretriz mais restritiva sobre transferência de dados de saúde.
- Mudança no perfil de produto (se passar a hospedar laudo, decisão precisa ser revisitada).
- Reclamação formal de paciente sobre localização dos dados.
