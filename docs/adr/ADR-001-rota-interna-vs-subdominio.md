# ADR-001: Memo3D fica em rota interna `drmassuca.com.br/memo3d`, não em subdomínio

**Data:** 2026-05-04
**Status:** Aceito
**Decisores:** Dr. Antonio Massucatti

---

## Contexto

Memo3D é um módulo novo dentro do ecossistema do Dr. Massuca, oferecendo:
1. Hospedagem boutique da memória da gestação (galeria privada, 12 meses).
2. Impressão 3D do feto.

Precisa de uma URL pública. Três caminhos foram considerados:

- **(a)** Rota interna no domínio principal: `drmassuca.com.br/memo3d`.
- **(b)** Subdomínio com mesmo código: `memorias.drmassuca.com.br`.
- **(c)** Subdomínio com código separado (app Next.js própria, repo dedicado).

O domínio principal `drmassuca.com.br` já tem investimento significativo em SEO (Site Vivo, Vitals Vivo, FAQ Vivo, SEO Vivo), schema markup `MedicalBusiness`, idade, backlinks e sinais E-E-A-T (CRM divulgado, conteúdo médico autoral).

Itaberaí é cidade pequena (~40k habitantes). Autoridade local concentrada vence autoridade fragmentada.

LLMs generativos (ChatGPT, Perplexity, Gemini) são canal crescente de descoberta de profissionais de saúde — citam fontes consolidadas com histórico, não subdomínios novos sem reputação.

## Decisão

Adotar **(a) rota interna** `drmassuca.com.br/memo3d`.

## Consequências

### Positivas

- **Autoridade herdada na hora.** Toda a credibilidade do domínio principal passa para o módulo Memo3D imediatamente.
- **GEO/local SEO concentrado.** Schema `MedicalClinic` + `Service` + `Product` num único domínio = uma entidade forte para Itaberaí. Subdomínios fragmentariam o sinal.
- **AEO (resposta gerativa) maximizado.** LLMs aprendem padrões de citação por domínio canônico. Manter um único domínio = uma única entidade que acumula menções ao longo do tempo.
- **Reuso completo da infra existente.** Mesmo Supabase, mesmo Vercel, mesmo deploy, mesmas Vercel functions, mesmo Header/Footer, mesma lib utilitária, mesmo painel admin.
- **Investimento já feito é preservado.** Site Vivo / Vitals Vivo / FAQ Vivo / SEO Vivo continuam medindo o domínio inteiro, incluindo Memo3D. Não precisa duplicar instrumentação.
- **Cookies e sessão compartilhados.** Login admin no `/admin` e login paciente no `/memo3d/conta` usam o mesmo Supabase Auth no mesmo domínio (sem CORS, sem cookies cross-site).

### Negativas

- **Tema visual precisa coexistir.** O site principal tem identidade clínica (verde Massuca + dourado, system fonts). O Memo3D quer vibe boutique premium (mesmas cores + serif Playfair Display, espaçamento maior). Resolvido aplicando um `memo3dTheme` (Chakra) só dentro do escopo `/memo3d/*`, com Header/Footer compartilhados ajustados via prop `variant` quando necessário.
- **Migração futura não-trivial.** Se um dia Memo3D crescer e quiser brand independente (próprio domínio, próprio site), migrar de `/memo3d/*` para `memo3d.com.br` exige redirects 301 caso a caso, possível perda temporária de ranking, perda de cookies/sessões. Aceitamos esse custo: improvável a curto/médio prazo.
- **Bundle do site cresce.** Páginas Memo3D entram no mesmo bundle do site principal, mesmo já tendo lazy loading. Mitigado pelo padrão `lazy(() => import(...))` que o projeto já usa em todas as rotas.

### Riscos

- **Conflito de namespace de rotas.** Se algum dia o site principal quiser usar `/memo`, `/memo3d`, `/memorias` para outra coisa, tem conflito. Mitigado: prefixo `memo3d` é específico e improvável de colidir.
- **Confusão visual entre site clínico e boutique.** Se o tema secundário não for diferenciado o suficiente, paciente pode não perceber que entrou num "ambiente especial". Mitigado: hero diferenciado, tipografia distinta, paleta com mais dourado.

## Alternativas consideradas e descartadas

### (b) Subdomínio com mesmo código

- Google trata subdomínio como entidade quase separada. Herança de autoridade é parcial e demorada (meses a um ano).
- Para SEO local em cidade pequena, fragmentar autoridade é literalmente prejudicial.
- Schema markup precisaria ser duplicado e os crawlers veriam duas entidades MedicalBusiness — confuso.
- Único ganho real seria isolamento visual, que conseguimos com tema secundário sem o custo SEO.

### (c) Subdomínio com código separado

- Tudo do (b) somado ao custo de manter dois deploys, duas pipelines, duas instâncias de instrumentação.
- Faz sentido só se o produto fosse arquiteturalmente diferente o suficiente pra justificar (ex: app móvel separado, framework totalmente distinto, equipe diferente). Não é o caso.
