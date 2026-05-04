# ADR-003: Auth da paciente com link manual via WhatsApp em vez de SMS automático

**Data:** 2026-05-04
**Status:** Aceito (entrega inicial; revisitar quando volume escalar)
**Decisores:** Dr. Antonio Massucatti

---

## Contexto

Briefing original previa para o primeiro acesso da paciente:
- SMS automático com link único e token assinado.
- OTP de 6 dígitos por SMS para validação.
- Definição de senha pessoal.
- Login subsequente: celular + senha.

Implicações dessa abordagem:
- Conta nova em provider SMS (Zenvia ou Twilio).
- Custo recorrente (R$0,08–0,12 por SMS no Brasil).
- Dependência externa adicional.
- Configuração técnica: Supabase Phone Auth ou disparo via Vercel Function.

Realidade operacional da clínica:
- Recepção já fala com pacientes via WhatsApp diariamente (confirmação de consulta, envio de exame, dúvidas). É o canal natural.
- WhatsApp Web/Desktop está aberto no balcão.
- Volume inicial é baixo (lançamento, depois crescimento gradual).
- Dr. expressou explicitamente: "vamos fazer as coisas manualmente mesmo".

Pergunta: precisamos automatizar SMS desde o início, ou começamos manual e automatizamos depois?

## Decisão

**Entrega inicial: link de primeiro acesso enviado manualmente pela recepção via WhatsApp.**

Fluxo:
1. Recepção cadastra paciente no painel `/admin/memo3d`.
2. Sistema gera token assinado de primeiro acesso (7 dias de validade) e exibe na tela:
   - Botão **"Copiar link"** (copia URL completa pro clipboard).
   - Botão **"Abrir WhatsApp da paciente"** (abre `wa.me/<celular>` com texto pré-formatado: "Olá [Nome], suas memórias 3D estão prontas. Acesse: [link]").
3. Recepção clica no botão de WhatsApp ou cola o link na conversa que já tem com a paciente.
4. Paciente clica → cai em `/memo3d/ativar/{token}`.
5. Tela "Confirme com os 4 últimos dígitos do CPF" (mesmo segundo fator que o QR code presencial usa — protege caso o link vaze ou seja interceptado).
6. Paciente acerta → tela "Defina sua senha" (mín 8 chars).
7. Aceita termo LGPD (registra consentimento + IP).
8. Token marcado como usado, paciente entra na conta.

Logins subsequentes: celular + senha.

Recuperação de senha: recepção clica "Reenviar acesso" no painel, gera novo token, manda manualmente via WhatsApp de novo.

**Auth interna técnica:** Supabase Email Auth com email derivado do telefone (ex: `+5562999998888@memo3d.local`). Paciente vê "celular + senha" mas internamente é Email Auth do Supabase, o que dá acesso a todas as features nativas (sessão, refresh token, RLS via `auth.uid()`).

**SMS automático fica como roadmap futuro**, ativável quando o volume justificar custo + complexidade. Migração será simples: trocar o passo manual por uma chamada à API do Zenvia/Twilio, sem mexer no resto do fluxo.

## Consequências

### Positivas

- **Zero custo recorrente.** Sem fatura mensal de SMS.
- **Zero dependência externa.** Sem provider, sem conta, sem API key, sem rate limits.
- **Encaixa no fluxo existente.** Recepção já manda mensagens por WhatsApp — adicionar um link a mais é treinamento mínimo.
- **Pessoalidade premium.** Recepção pode personalizar a mensagem ("Olá Maria, parabéns pelo bebê! Suas memórias 3D já estão prontas..."). Combina com a vibe boutique.
- **Migração futura sem dor.** Quando ativarmos SMS automático, é um botão a menos no painel — fluxo da paciente não muda.

### Negativas

- **Depende da recepção.** Se a recepção esquecer de enviar, o link fica parado. Mitigado: o painel destaca em vermelho "Link gerado mas não enviado" até alguém marcar como enviado.
- **Rastro de envio fica no WhatsApp da recepção.** Não temos comprovante automático de "SMS enviado às 14h32". Se houver disputa LGPD ("eu nunca recebi"), evidência depende da conversa do WhatsApp da recepção. Aceitamos: registramos `link_generated_at` e `link_marked_sent_at` (recepcionista marca quando enviou); auditoria ainda mostra "link emitido tal dia".
- **Não escala 100% lineares.** 50 pacientes por mês: tranquilo. 500 por mês: a recepção sente. Marca limite natural pra ativar SMS automático.

### Riscos

- **Recepção envia link errado pra paciente errada.** Mitigado: botão "Abrir WhatsApp da paciente" usa o `wa.me/<celular>` cadastrado da PRÓPRIA paciente. Se a recepção copiar o link e colar manualmente na conversa errada, é erro humano — mesmo risco de qualquer outra info enviada por WhatsApp.
- **Link interceptado.** Mitigado pelo segundo fator (4 últimos dígitos do CPF) e pela validade curta (7 dias). Quem só tem o link mas não tem o CPF não entra.
- **CPF 4 dígitos é fraco.** Verdade — só 10000 combinações. Mitigado: rate limit (5 tentativas, depois bloqueia 24h e dispara alerta no admin). Considerar aumentar pra 6 dígitos do CPF se houver paranoia maior.

## Alternativas consideradas e descartadas

### Supabase Phone Auth + Twilio (default Supabase)

- Mais caro que Zenvia no Brasil.
- Fluxo OTP funciona, mas adiciona um passo extra (digitar código de 6 dígitos) que o link manual elimina.
- Razoável quando volume justificar.

### Supabase Phone Auth + Zenvia

- Provider mais barato pra Brasil.
- Mesmas críticas do anterior + dependência operacional adicional.
- Volta como roadmap futuro.

### Magic link só por email

- Paciente nem sempre tem email confiável; celular sim.
- Email tem mais risco de phishing/spoofing.
- Descartado.

### Auth próprio com bcrypt + JWT custom

- Mais código pra manter, sem benefício real sobre Supabase Auth.
- Reinventaria roda madura.
- Descartado.

## Critérios para revisitar esta decisão

Migrar pra SMS automático quando QUALQUER um dos itens abaixo for verdade:
- Volume passar de ~80 pacientes/mês (ponto onde a recepção começa a sentir).
- Reclamação recorrente de paciente "não recebi o link" (sinaliza falha do canal manual).
- Lançamento de feature que exija notificações automáticas (ex: alerta de expiração próxima).
- Custo de SMS cair 50%+ (ex: integração nativa de WhatsApp Business API saindo barata).
